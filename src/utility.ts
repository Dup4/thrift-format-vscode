import { IOptions } from "./types";
import * as vscode from "vscode";

export function getOptions(): IOptions {
  const vsConfig = vscode.workspace.getConfiguration("thirftFormatter");
  const indent = vsConfig.get<number>("indent");

  return {
    indent,
  };
}
