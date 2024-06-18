import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This function is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Command to copy selected text as a markdown code block
    let copySelection = vscode.commands.registerCommand('extension.copySelectionAsMarkdown', () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the selected text
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            // Get the file path and name
            const filePath = editor.document.uri.fsPath;
            const fileName = vscode.workspace.asRelativePath(filePath);
            // Get the file extension without the dot
            const fileExtension = path.extname(filePath).substring(1);

            // Create the markdown code block
            const codeBlock = `*${fileName}*\n\`\`\`${fileExtension}\n${text}\n\`\`\``;
            // Copy the markdown code block to the clipboard
            vscode.env.clipboard.writeText(codeBlock).then(() => {
                // Show a success message
                vscode.window.showInformationMessage('Selection copied to clipboard as markdown code block');
            }, (err) => {
                // Show an error message if copying fails
                vscode.window.showErrorMessage('Failed to copy to clipboard');
            });
        } else {
            // Show an error message if no active editor is found
            vscode.window.showErrorMessage('No active editor found');
        }
    });

    // Command to copy all file contents as a markdown code block (from both editor and sidebar)
    let copyFileContents = vscode.commands.registerCommand('extension.copyFileContentsAsMarkdown', async (uri?: vscode.Uri) => {
        let filePath: string;

        if (uri && uri.fsPath) {
            // Command invoked from the sidebar
            filePath = uri.fsPath;
        } else {
            // Command invoked from the editor
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                filePath = editor.document.uri.fsPath;
            } else {
                // Show an error message if no active editor is found
                vscode.window.showErrorMessage('No active editor found');
                return;
            }
        }

        // Get the file name and extension
        const fileName = vscode.workspace.asRelativePath(filePath);
        const fileExtension = path.extname(filePath).substring(1);

        try {
            // Read the file contents
            const data = await fs.promises.readFile(filePath, 'utf8');
            // Create the markdown code block
            const codeBlock = `*${fileName}*\n\`\`\`${fileExtension}\n${data}\n\`\`\``;
            // Copy the markdown code block to the clipboard
            await vscode.env.clipboard.writeText(codeBlock);
            // Show a success message
            vscode.window.showInformationMessage('File contents copied to clipboard as markdown code block');
        } catch (err) {
            // Show an error message if reading the file fails
            vscode.window.showErrorMessage('Failed to read file contents');
        }
    });

    // Add the commands to the extension's subscription list
    context.subscriptions.push(copySelection, copyFileContents);
}

// This method is called when your extension is deactivated
export function deactivate() {}
