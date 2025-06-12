const { execSync } = require("child_process");
module.exports = [
  {
    description: "Code follows the project's style guidelines",
    validate: async () => {
      try {
        execSync("npx eslint .", { stdio: "pipe" });
        return true;
      } catch (error) {
        console.error("ESLint errors found");
        return false;
      }
    },
  },
  {
    description: "Changes have been tested locally",
    validate: async () => {
      try {
        execSync("npm test", { stdio: "pipe" });
        return true;
      } catch (error) {
        console.error("Tests failed");
        return false;
      }
    },
  },
  // Add more items with their respective validation functions
];
