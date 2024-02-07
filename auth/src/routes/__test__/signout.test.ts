import request from 'supertest';
import { app } from '../../app';

describe('Sign Out Route Handler', () => {
  it('Removes cookie on signout', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password123',
      })
      .expect(201);

    const signInRes = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password123',
      })
      .expect(200);

    expect(signInRes.get('Set-Cookie')).toBeDefined();

    const signOutRes = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);

    expect(signOutRes.get('Set-Cookie')[0]).toContain('session=;');
  });
});
