import * as vscode from "vscode";

import { formatThrift } from "thrift-format-ts";

import { getOptions } from "./utility";

const NAME = "Thrift Formatter";
const outputChannel = vscode.window.createOutputChannel(NAME);

export function activate(context: vscode.ExtensionContext) {
  outputChannel.appendLine(
    "Congratulations, your extension thirft-formatter is now active in the web extension host.",
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
        outputChannel.appendLine("No content to format.");
        return;
      }

      try {
        const fmtContent = formatThrift(content, options);

        vscode.window.activeTextEditor.edit((editBuilder) => {
          editBuilder.replace(
            new vscode.Range(0, 0, document.lineCount, 0),
            fmtContent,
          );
        });

        outputChannel.appendLine("Thrift file has been formatted.");
      } catch (e) {
        console.error(e);
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
        outputChannel.appendLine("No content to format.");
        return [];
      }

      try {
        const fmtContent = formatThrift(content, options);

        return [
          vscode.TextEdit.replace(
            new vscode.Range(0, 0, document.lineCount, 0),
            fmtContent,
          ),
        ];
      } catch (e) {
        console.error(e);
      }

      return [
        vscode.TextEdit.replace(
          new vscode.Range(0, 0, document.lineCount, 0),
          content,
        ),
      ];
    },
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  outputChannel.appendLine("your extension thirft-formatter is now DeActive");
}
