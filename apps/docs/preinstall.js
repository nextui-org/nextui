const fs = require("fs");
const execSync = require("child_process").execSync;

const {loadEnvConfig} = require("@next/env");

// Load the environment variables
const {combinedEnv} = loadEnvConfig(process.cwd());

// Check the environment variable
if (combinedEnv.IS_VERCEL_ENV !== "true") {
  console.log("Skipping preinstall script because IS_VERCEL_ENV is not set to 'true'.");
  process.exit(0);
}

// Read the package.json file
fs.readFile("./package.json", "utf8", function (err, data) {
  if (err) {
    console.log("Error reading file:", err);

    return;
  }

  let packageJson = JSON.parse(data);

  Object.keys(packageJson.dependencies).forEach((pkg) => {
    // Check if the package is in the @nextui-org namespace and has "workspace:*" as its version
    if (pkg.startsWith("@nextui-org/") && packageJson.dependencies[pkg] === "workspace:*") {
      // Get the latest version of the package under the specified tag
      const latestVersion = execSync(`npm show ${pkg}@dev-v2 version`, {encoding: "utf8"}).trim();

      // Replace the version in the package.json file
      packageJson.dependencies[pkg] = latestVersion;
    }
  });

  // // Write the changes back to the package.json file
  fs.writeFile("./package.json", JSON.stringify(packageJson, null, 2), "utf8", function (err) {
    if (err) {
      console.log("Error writing file:", err);
    }
  });
});
