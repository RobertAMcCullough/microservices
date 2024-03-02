import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form className="container mt-4" onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary mt-2">Sign Up</button>
    </form>
  );
};
