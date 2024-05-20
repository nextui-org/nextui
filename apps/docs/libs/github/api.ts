import {GITHUB_API_URL, REPO_NAME} from "./constants";
import {getError} from "./utils";

export async function getLatestTag() {
  let latestTag: string;
  const res = await fetch(`${GITHUB_API_URL}/repos/${REPO_NAME}/releases/latest`);

  if (res.ok) {
    const data = await res.json();

    latestTag = data.tag_name;
  } else {
    throw await getError("GitHub latest tag fetch failed", res);
  }

  return latestTag;
}
