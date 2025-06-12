const vscode = require("vscode");
async function reviewChanges() {
  // Get all changed files
  const gitExtension = vscode.extensions.getExtension("vscode.git").exports;
  const repo = gitExtension.getAPI(1).repositories[0];
  const changes = await repo.diff(true);
  for (const change of changes) {
    const uri = change.uri;
    const document = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(document);
    // Trigger Copilot suggestions
    await vscode.commands.executeCommand("editor.action.triggerSuggest");
    // Wait for user to review and accept/reject suggestions
    await vscode.window.showInformationMessage(
      "Review Copilot suggestions and press Enter when done",
      "Done"
    );
  }
}
module.exports = { reviewChanges };
