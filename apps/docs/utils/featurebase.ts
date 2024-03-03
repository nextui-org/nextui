export const openFeedbackWidget = () => {
  window.postMessage({
    target: "FeaturebaseWidget",
    data: {action: "openFeedbackWidget"},
  });
};
