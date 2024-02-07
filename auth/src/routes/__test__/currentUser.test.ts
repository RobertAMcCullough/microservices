import request from 'supertest';
import { app } from '../../app';

describe('current User Route Handler', () => {
  it('Returns data on current user', async () => {
    // const signInRes = await request(app)
    //   .post('/api/users/signup')
    //   .send({
    //     email: 'test@test.com',
    //     password: 'password123',
    //   })
    //   .expect(201);

    // const cookie = signInRes.get('Set-Cookie');

    // set the above code to a function on global object in setup.ts

    const cookie = await signin();

    const currentUserRes = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(currentUserRes.body.currentUser.email).toBe('test@test.com');
    expect(currentUserRes.body.currentUser.id).toBeDefined;
  });

  it('Returns currentUser of null when not signed in', async () => {
    const currentUserRes = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);

    expect(currentUserRes.body.currentUser).toBeNull();
  });
});
