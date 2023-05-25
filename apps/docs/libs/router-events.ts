import mitt from "mitt";
import Router from "next/router";

const emitter = mitt();

export default emitter;

Router.events.on("routeChangeStart", (url) => {
  emitter.emit("routeChangeStart", url);
});

Router.events.on("routeChangeComplete", (url) => {
  // eslint-disable-next-line no-console
  console.log(`Changed to URL: ${url}`);
  emitter.emit("routeChangeComplete", url);
});

Router.events.on("routeChangeError", (err) => {
  emitter.emit("routeChangeError", err);
});
