const checklist = require("./pr-checklist");
async function validateChecklist() {
  console.log("Validating PR checklist…");
  for (const item of checklist) {
    process.stdout.write(`Checking: ${item.description}… `);
    const result = await item.validate();
    if (result) {
      console.log("PASSED");
    } else {
      console.log("FAILED");
      process.exit(1);
    }
  }
  console.log("All checklist items passed!");
}
validateChecklist().catch((error) => {
  console.error("Error during checklist validation:", error);
  process.exit(1);
});
