import * as vscode from "vscode";

import { getOptions } from "./utility";
import { formatThrift } from "./format";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "thirft-formatter" is now active in the web extension host!',
  );

  // register formatThriftFile command
  const disposable = vscode.commands.registerCommand(
    "thirft-formatter.formatThriftFile",
    async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }

      const options = getOptions();

      const { document } = vscode.window.activeTextEditor;
      const content = document.getText();
      if (content === "") {
        vscode.window.showInformationMessage("No content to format.");
        return;
      }

      const [fmtContent, needUpdate] = formatThrift(content, options);

      if (needUpdate) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
          editBuilder.replace(
            new vscode.Range(0, 0, document.lineCount, 0),
            fmtContent,
          );
        });

        vscode.window.showInformationMessage("Thrift file has been formatted");
      }
    },
  );

  // register thrift language formatter
  vscode.languages.registerDocumentFormattingEditProvider("thrift", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument,
    ): vscode.TextEdit[] {
      const options = getOptions();

      const content = document.getText();
      if (content === "") {
        vscode.window.showInformationMessage("No content to format.");
        return [];
      }

      const [fmtContent, needUpdate] = formatThrift(content, options);

      if (needUpdate) {
        return [
          vscode.TextEdit.replace(
            new vscode.Range(0, 0, document.lineCount, 0),
            fmtContent,
          ),
        ];
      }

      return [];
    },
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('your extension "thirft-formatter" is now DeActive');
}