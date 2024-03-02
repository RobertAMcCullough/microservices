import useRequest from '../hooks/use-request';
import axios from 'axios';

const LandingPage = ({currentUser}) => {

  console.log(currentUser)
  // axios.get('/api/users/currentuser').catch((err) => console.log(err.message))

  return (
    <>
      <h1>Landing Page</h1>
      <p>
        {currentUser
          ? `You are signed ins as ${currentUser.email}`
          : 'You are not signed in :('}
      </p>
    </>
  );
};

// getInitialProps is Next specific - could use useEffect, but getInitialProps
// is run before the page is even created on the server side the first time
// vs having useEffect make those calls from the client side
LandingPage.getInitialProps = async () => {
  console.log('I am only running on the server, this is before rendering componenta')

  const response = await axios.get('http://10.106.204.202:3000/api/users/currentuser').catch((err) => console.log(err))

  console.log(response.data)

  return response.data
}

export default LandingPage;