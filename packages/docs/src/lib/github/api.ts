import path from 'path';
import { readFile, writeFile } from '@utils/fs';
import { GITHUB_API_URL, REPO_NAME } from './constants';
import { getError } from './utils';

const USE_CACHE = process.env.USE_CACHE === 'true';
const TAG_CACHE_PATH = path.resolve('.github-latest-tag');

export async function getLatestTag() {
  let cachedTag;

  if (USE_CACHE) {
    try {
      cachedTag = await readFile(TAG_CACHE_PATH, 'utf8');
    } catch (error) {
      // A cached file is not required
    }
  }
  if (!cachedTag) {
    const res = await fetch(
      `${GITHUB_API_URL}/repos/${REPO_NAME}/releases/latest`
    );
    if (res.ok) {
      const data = await res.json();
      const tag = data.tag_name;

      if (USE_CACHE) {
        try {
          await writeFile(TAG_CACHE_PATH, tag, 'utf8');
        } catch (error) {
          // A cached file is not required
        }
      }
      cachedTag = tag;
    } else {
      throw await getError('GitHub latest tag fetch failed', res);
    }
  }

  return cachedTag;
}
