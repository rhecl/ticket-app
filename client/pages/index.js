import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// Execute during server side rendering with nextjs
// Whatever is returned is sent to the component as props
LandingPage.getInitialProps = async (context) => {
  // request from getInitialProps can be executed on the server OR client
  // depending on how the page was loaded
  // refresh, URL reload => on the server
  // navigating inside the app => on the client
  const client = buildClient(context);

  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
