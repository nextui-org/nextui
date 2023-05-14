import {FileCode} from "./types";
import {scope} from "./react-live-demo";
import {transformCode, joinCode, getFileName} from "./utils";

import {SandpackProps} from "@/components/sandpack";

export interface UseCodeDemoProps extends SandpackProps {
  code?: string;
}

export const useCodeDemo = ({code: inputCode, files: filesProp}: UseCodeDemoProps) => {
  let code = inputCode?.trim();
  let noInline = false;
  const files = (filesProp || {}) as object;
  let filesCode: FileCode[] = [];

  //transform scope to key text value
  const scopeKeys = Object.keys(scope);
  // convert scopeKeys to string values
  const scopeValues = scopeKeys.map((key) => {
    return {[key]: `${key}`};
  });

  // add 'React' to scopeValues
  scopeValues.push({React: "React"});
  // convert scopeValues to object
  const imports = Object.assign({}, ...scopeValues);

  // if single file
  if (Object.keys(files).length === 1) {
    // get first item from files
    const file = Object.values(files)[0] as string;

    code = transformCode(file, imports);
  }
  // else if multiple files
  else {
    // get files with its code
    Object.entries(files).forEach(([fileName, fileCode]) => {
      //only files with .js can processes by react-live
      if (!fileName.includes(".js")) {
        return;
      }

      const componentName = getFileName(fileName);
      const transformedCode = transformCode(fileCode as string, imports, componentName);

      // add to filesCode
      filesCode.push({
        fileName,
        code: transformedCode,
      });
    });

    // sort code by dependency
    filesCode = filesCode.sort((a, b) => {
      if (a.code.includes(getFileName(b.fileName))) {
        return 1;
      }
      if (b.code.includes(getFileName(a.fileName))) {
        return -1;
      }

      return 0;
    });

    code = joinCode(filesCode);
  }

  noInline = code.includes("render");

  return {
    code,
    noInline,
  };
};
