import checklist from "./pr-checklist.js";

async function validateChecklist() {
  console.log("🔍 Validating PR checklist…\n");

  for (const item of checklist) {
    process.stdout.write(`➡️  Checking: ${item.description}… `);
    try {
      const result = await item.validate();
      if (!result) {
        console.log("❌ FAILED\n");
        process.exit(1);
      } else {
        console.log("✅ OK");
      }
    } catch (err) {
      console.log("❌ CRASHED\n");
      console.error("🛠 Debug info:", err.message || err);
      process.exit(1);
    }
  }

  console.log("\n🎉 All checklist items passed.");
}

validateChecklist();
