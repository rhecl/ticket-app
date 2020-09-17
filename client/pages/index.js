import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

// Execute during server side rendering with nextjs
// Whatever is returned is sent to the component as props
LandingPage.getInitialProps = async ({ req }) => {
  // request from getInitialProps can be executed on the server OR client
  // depending on how the page was loaded
  // refresh, URL reload => on the server
  // navigating inside the app => on the client

  // on the server
  if (typeof window === 'undefined') {
    // access ingress nginx from inside the cluster
    // SERVICE-NAME.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        // headers: {
        //  host: 'tickets.dev',
        //},
        headers: req.headers, // include all initial headers, including the jwt cookie
      }
    );

    return data;
  }

  const { data } = await axios.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
