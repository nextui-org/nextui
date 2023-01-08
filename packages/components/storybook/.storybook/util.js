const fs = require("fs");

function getStories(pkg) {
  const scope = pkg ? [pkg] : fs.readdirSync("../../../components");

  const map = scope
    .map((package) => `../../../components/${package}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`);

  console.log(map);
}

getStories();
