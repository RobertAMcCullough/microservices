// special file name - overriding the App wrapper that Next already does
// this is the only component that will always be loaded, so global css imports need to happen here
import 'bootstrap/dist/css/bootstrap.css'; // after npm i bootstrap

import buildClient from '../api/build-client';
import Header from '../components/header';

// Component is the component being rendered (the page)
// pageProps will automatically receive what is returned from Component's getInitialProps if
// there is no getInitialProps in this _app component
const AppComponent = ({ Component, pageProps, userLoggedIn }) => {
  return (
    <div>
      <Header isSignedIn={userLoggedIn} />
      <Component {...pageProps} />
    </div>
  )
};

// Note that inside the _app wrapper, the arg passed to getInitialProps is different
// i.e. ctx is not a property on arg instead of the full arg passed to regular components
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx); // <- different than regular component
  const { data } = await client
    .get('/api/users/currentuser')
    .catch((e) => console.log(e.message));

  const userLoggedIn = !!data?.currentUser;

  let pageProps = {}; // will be passed to Component as props - so goes through this component
  // call Component's getInitialProps if it exists
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, userLoggedIn };
};

export default AppComponent;
