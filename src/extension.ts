// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { isWritable } from "./utils/fileSystemUtils";
import * as fs from "fs";
import * as path from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("mediatrgen is now active!");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "mediatrgen.generate",
    async (uri: vscode.Uri) => {
      const folderPath = uri.fsPath;

      // Ask the user for the file name
      const fileName = await vscode.window.showInputBox({
        prompt: "Enter the name of the C# file (without extension)",
        placeHolder: "MyClass",
      });

      if (fileName) {
        // Create the full file path
        const filePath = path.join(folderPath, `${fileName}.cs`);

        // Check if the file already exists
        if (fs.existsSync(filePath)) {
          vscode.window.showErrorMessage(
            `A file with the name ${fileName}.cs already exists.`
          );
          return;
        }

        // Create the file with a basic C# class template
        const content = `using System;
namespace ${fileName}
{
    public class ${fileName}
    {
        public ${fileName}()
        {
            // Constructor
        }
    }
}`;

        // Write the file
        fs.writeFileSync(filePath, content, "utf8");

        // Open the newly created file in the editor
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
