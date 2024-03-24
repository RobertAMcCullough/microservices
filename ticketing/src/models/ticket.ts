import mongoose from 'mongoose';

// INTERFACES

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// tell TS to expect build() method on Ticket model
// this is collection of documents
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// define Ticket instance for TS
// this is one document
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// ****************

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { // define what we want returned and in what format
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

// Mongoose Ticket Document
// 1. But this doesn't have type checking
// const ticket1 = new Ticket({title: 'test@a.com', price: 'asdfasdf'})

// 2. Put inside a new function to include TS
const buildTicket = (attrs: TicketAttrs): TicketDoc => {
  return new Ticket({ title: attrs.title, price: attrs.price, userId: attrs.userId });
};

// 3. Add it as a static method via schema so it's attached to Ticket model
ticketSchema.statics.build = buildTicket;

// Mongoose Ticket Model
const Ticket = mongoose.model<TicketDoc, TicketModel>('tickets', ticketSchema);

// now always use Ticket.build() instead of new Ticket()
// const u1 = Ticket.build({: 'asdf', price: 'asdf123123'});

export { Ticket };
