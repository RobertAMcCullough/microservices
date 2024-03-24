import axios from 'axios';

// this will be used to make any requests from inside a getInitialProps call
export default ({ req }) => {
  // server side request
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // browser request (baseURL will be '/' and headers included automatically)
    return axios.create({});
  }
};
