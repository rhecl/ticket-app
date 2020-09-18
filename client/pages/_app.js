import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// Execute during server side rendering with nextjs
// Whatever is returned is sent to the component as props
// First param of getInitialProps is different in the root (_app) component
// req, res is nested in the ctx property of the object
AppComponent.getInitialProps = async (appContext) => {
  // request from getInitialProps can be executed on the server OR client
  // depending on how the page was loaded
  // refresh, URL reload => on the server
  // navigating inside the app => on the client
  const client = buildClient(appContext.ctx);

  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    // if we set getInitialProps on the custom root component, any other
    // getInitialProps defined on other components are not invoked automatically
    // We have to invoke them manually
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
