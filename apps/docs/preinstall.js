const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

// Get the root and local tsconfig files
const rootTsConfigPath = path.resolve(process.cwd(), "../../tsconfig.json");
const localTsConfigPath = path.resolve(process.cwd(), "./tsconfig.json");

// Check the environment variable
if (process.env.IS_VERCEL_ENV !== "true") {
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

// Modify local tsconfig.json file to extend the root tsconfig.json file
fs.readFile(rootTsConfigPath, "utf8", function (err, rootData) {
  if (err) {
    console.log("Error reading root tsconfig.json file:", err);
    return;
  }

  fs.readFile(localTsConfigPath, "utf8", function (err, localData) {
    if (err) {
      console.log("Error reading local tsconfig.json file:", err);
      return;
    }

    // Parse the tsconfig files and merge them
    let rootTsConfig = JSON.parse(rootData);
    let localTsConfig = JSON.parse(localData);

    // Remove "extends" from the local config
    delete localTsConfig.extends;

    // Merge "compilerOptions", "include", and "exclude"
    let mergedTsConfig = {
      ...rootTsConfig,
      ...localTsConfig,
      compilerOptions: {
        ...rootTsConfig.compilerOptions,
        ...localTsConfig.compilerOptions,
      },
      include: [...(rootTsConfig.include || []), ...(localTsConfig.include || [])],
      exclude: [...(rootTsConfig.exclude || []), ...(localTsConfig.exclude || [])],
    };

    // Write the changes back to the local tsconfig.json file
    fs.writeFile(
      localTsConfigPath,
      JSON.stringify(mergedTsConfig, null, 2),
      "utf8",
      function (err) {
        if (err) {
          console.log("Error writing file:", err);
        }
      },
    );
  });
});
