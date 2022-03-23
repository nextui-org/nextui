import mitt from 'mitt';
import Router from 'next/router';

const emitter = mitt();
export default emitter;

Router.onRouteChangeStart = (url) => {
  emitter.emit('routeChangeStart', url);
};

Router.onRouteChangeComplete = (...args) => {
  emitter.emit('routeChangeComplete', ...args);
};

Router.onRouteChangeError = (...args) => {
  emitter.emit('routeChangeError', ...args);
};
