import * as vscode from "vscode";

export const isWritable = (scheme: "file" | "git" = "file"): boolean => {
  try {
    return !!vscode.workspace.fs.isWritableFileSystem(scheme);
  } catch {
    return false;
  }
};
