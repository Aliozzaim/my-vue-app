import { execSync } from "child_process";

const checklist = [
  {
    description: "Code follows the project's style guidelines",
    validate: async () => {
      try {
        execSync("npx eslint .", { stdio: "inherit" }); // inherit to see output in console
        return true;
      } catch (error) {
        console.error("🧹 ESLint failed with details:\n", error.message);
        return false;
      }
    },
  },
  {
    description: "Changes have been tested locally",
    validate: async () => {
      try {
        execSync("npm test", { stdio: "inherit" });
        return true;
      } catch (error) {
        console.error("🧪 Tests failed with details:\n", error.message);
        return false;
      }
    },
  },
];

export default checklist;
