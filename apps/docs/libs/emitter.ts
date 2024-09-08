import mitt from "mitt";

type Events = {
  proBannerVisibilityChange: "hidden" | "visible";
};

const emitter = mitt<Events>();

export default emitter;
