// import axios from 'axios';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return (
    <div className='container'>
      <h1>Landing Page</h1>
      <p>
        {currentUser
          ? `You are signed in as ${currentUser.email}`
          : 'You are not signed in :('}
      </p>
    </div>
  )
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client
    .get('/api/users/currentuser')
    .catch((e) => console.log(e.message));

  return data;
};

// ORIGINAL BEFORE MOVING TO BUILD CLIENT
// // Most of this will actually be moved to buildClient which returns an axios.create({...})
// // getInitialProps is Next specific - could use useEffect, but getInitialProps
// // is run before the page is even created on the server side the first time
// // vs having useEffect make those calls from the client side
// // BUT this will run on client side when navigating from inside app (Router.push)
// LandingPage.getInitialProps = async ({ req }) => {
//   // need to see if running on server or client
//   // can also just check if there is a req that was destructured from first arg
//   // req will have properties of original get request from client that started the SSR
//   if (typeof window === 'undefined') {
//     // SERVER SIDE
//     // option 1:
//     // this works but hardcoding is not great.
//     // this is client service reaching to auth service in same namespace (default)
//     // const response = await axios
//     //   .get('http://auth-srv:3000/api/users/currentuser')
//     //   .catch((err) => console.log(err));

//     // option 2:
//     // this url reaches back out to the ingress-nginx load balancer to get routed back into cluster
//     // url is http://<service name>.<namespace>.svc.cluster.local
//     const { data } = await axios
//       .get(
//         'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//         {
//           headers: req.headers, // specifically host and cookie are needed
//         }
//       )
//       .catch((err) => console.log(err.message));

//     return data;
//   } else {
//     // CLIENT SIDE - make request normally as you would in component
//     const { data } = await axios
//       .get('/api/users/currentuser')
//       .catch((err) => console.log(err));

//     return data;
//   }
// };

export default LandingPage;
