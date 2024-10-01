import va from "@vercel/analytics";

export function getUniqueID(prefix: string) {
  return `${prefix}-${new Date().getTime()}`;
}

export type TrackEvent = {
  category: string;
  action: string;
  name?: string;
  data?: any;
};

const getSessionId = () => {
  let sessionId = getUniqueID("session");

  // save session id in local storage if it doesn't exist
  if (!localStorage.getItem("sessionId")) {
    localStorage.setItem("sessionId", sessionId);

    return sessionId;
  } else {
    return localStorage.getItem("sessionId") ?? sessionId;
  }
};

export const trackEvent = (label: string, event: TrackEvent) => {
  const sessionId = getSessionId();

  va.track(label, {
    ...event,
    sessionId,
  });
};
