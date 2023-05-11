import {__PREVIEW__} from "@/utils";

export const GITHUB_URL = "https://github.com";

export const GITHUB_API_URL = "https://api.github.com";

export const RAW_GITHUB_URL = "https://raw.githubusercontent.com";

export const REPO_NAME = "nextui-org/nextui";

export const ISSUE_REPORT_URL = `${GITHUB_URL}/${REPO_NAME}/issues/new?assignees=&labels=bug&template=bug_report.yml&title=%5BBUG%5D+-+`;

export const COMPONENT_PATH = __PREVIEW__
  ? `${GITHUB_URL}/${REPO_NAME}/tree/feat/v2/packages/components`
  : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/components`;

export const COMPONENT_THEME_PATH = __PREVIEW__
  ? `${GITHUB_URL}/${REPO_NAME}/tree/feat/v2/packages/core/theme/src/components`
  : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/core/theme/src/components`;
