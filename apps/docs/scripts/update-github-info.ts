/* eslint-disable no-console */
import path from "path";
import fs from 'fs';

import prettier from 'prettier';
import fetch from 'node-fetch';

import { formatCompactNumber } from '../utils/number';

const configFolder = "config";

interface GithubInfo {
  stars: {
    raw: number;
    formatted: string;
  };
  forks: number;
  subscribers: number;
  openIssues: number;
}

async function getGithubInfo() {
  try {
    const response = await fetch('https://api.github.com/repos/heroui-inc/heroui');
    const data = await response.json() as any;

    const githubInfo: GithubInfo = {
      stars: {
        raw: data.stargazers_count,
        formatted: formatCompactNumber(data.stargazers_count)
      },
      forks: data.forks_count,
      subscribers: data.subscribers_count,
      openIssues: data.open_issues_count,
    };

    // Format JSON with prettier
    const formattedJson = prettier.format(JSON.stringify(githubInfo), {
      parser: 'json',
      printWidth: 80,
      tabWidth: 2,
      semi: true,
    });

    // Create config folder if it doesn't exist
    if (!fs.existsSync(configFolder)) {
      fs.mkdirSync(configFolder);
    }

    // Write to github-info.json
    const outPath = path.join(process.cwd(), configFolder, 'github-info.json');

    fs.writeFileSync(outPath, formattedJson);

    console.log("[HeroUI] GitHub info updated successfully ✅");
  } catch (error) {
    console.error("[ERROR 🔥]:", error);
  }
}

getGithubInfo();
