import { IOptions } from "thrift-format-ts";
import * as vscode from "vscode";

export function getOptions(): IOptions {
  const vsConfig = vscode.workspace.getConfiguration("thirftFormatter");
  const indent = vsConfig.get<number>("indent");

  const options: IOptions = {};

  if (indent) {
    options.indent = indent;
  }

  return options;
}
