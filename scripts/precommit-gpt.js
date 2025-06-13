import { execSync } from "child_process";
import readline from "readline";
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: "AIzaSyDux8PRwAtorgLGnWgkObE4DacaVMDWKyU",
});

async function main() {
  try {
    const diff = execSync("git diff --cached").toString();

    if (!diff) {
      console.log("No staged changes detected.");
      process.exit(0);
    }

    const prompt = `
You are a senior developer and code reviewer.
Review the following git diff and:
1) List any bugs or improvements you notice.
2) Suggest a concise, clear git commit message summarizing the changes.

Git diff:
${diff}

Please provide your answer in this format:

Review:
- bug/improvement 1
- bug/improvement 2
...

Commit message:
<your suggested commit message>
`;

    // Call Gemini AI generateContent API with the prompt
    const completion = await gemini.models.generateContent({
      model: "gemini-2.0-flash", // Adjust model name as needed
      contents: prompt,
    });

    console.log("completion: ", completion);

    // Extract review and commit message from response using regex
    const commitMsgMatch = completion.match(/Commit message:\s*([\s\S]*)$/i);
    const reviewMatch = completion.match(
      /Review:\s*([\s\S]*?)Commit message:/i
    );

    const reviewText = reviewMatch ? reviewMatch[1].trim() : "";
    const commitMsg = commitMsgMatch ? commitMsgMatch[1].trim() : "";

    console.log("\n=== Gemini AI Review Suggestions ===");
    console.log(reviewText || "(No suggestions)");
    console.log("\n=== Gemini AI Suggested Commit Message ===");
    console.log(commitMsg || "(No commit message suggested)");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("\nUse this commit message? (y/n): ", (answer) => {
      rl.close();

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, {
            stdio: "inherit",
          });
          console.log("✅ Commit created with Gemini AI message.");
          process.exit(0);
        } catch (e) {
          console.error("❌ Commit failed.", e);
          process.exit(1);
        }
      } else {
        console.log("Commit aborted by user.");
        process.exit(1);
      }
    });
  } catch (err) {
    console.error("Error running pre-commit Gemini AI script:", err);
    process.exit(1);
  }
}

main();
