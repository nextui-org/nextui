export interface GithubError extends Error {
  url: string;
  status: number;
  headers: Response["headers"];
}

function getErrorText(res: Response) {
  try {
    return res.text();
  } catch (err) {
    return res.statusText;
  }
}

export async function getError(msg: string, res: Response) {
  const errorText = await getErrorText(res);
  const error = new Error(`${msg} (${res.status}): ${errorText}`) as GithubError;

  error.url = res.url;
  error.status = res.status;
  error.headers = res.headers;

  return error;
}
