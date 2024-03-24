import { useEffect } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: () => Router.push('/auth/signin'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div className='container'>Signing out...</div>
};
