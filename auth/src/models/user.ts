import mongoose from 'mongoose';

import { Password } from '../services/password';

// INTERFACES

interface UserAttrs {
  email: string;
  password: string;
}

// tell TS to expect build() method on User model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// define User instance for TS
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// ****************

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { // define what we want returned and in what format
      transform(doc, ret) {
        delete ret.password; // delete is normal js code - removes property from object
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

// Mongoose User Document
// 1. But this doesn't have type checking
// const user1 = new User({email: 'test@a.com', password: 'asdfasdf'})

// 2. Put inside a new function to include TS
const buildUser = (attrs: UserAttrs): UserDoc => {
  return new User({ email: attrs.email, password: attrs.password });
};

// 3. Add it as a static method via schema so it's attached to User model
userSchema.statics.build = buildUser;

// .pre() is mongoose middleware that will execute something before performing action
// can't use arrow function since that will change value of "this" to User Model instead of Doc
// need to execute done() at end, since mongoose old school with async
userSchema.pre('save', async function (done) {
  // this is the document we're about to save - properties accessed through get/set
  const hashed = await Password.toHash(this.get('password'));
  this.set('password', hashed);
  done();
});

// Mongoose User Model
const User = mongoose.model<UserDoc, UserModel>('users', userSchema);

// now always use User.build() instead of new User()
// const u1 = User.build({email: 'asdf', password: 'asdf123123'});

export { User };
