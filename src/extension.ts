import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Copy selected text as markdown code block
    let copySelection = vscode.commands.registerCommand('extension.copySelectionAsMarkdown', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            const filePath = editor.document.uri.fsPath;
            const fileName = vscode.workspace.asRelativePath(filePath);
            const fileExtension = path.extname(filePath).substring(1);

            const codeBlock = `*${fileName}*\n\`\`\`${fileExtension}\n${text}\n\`\`\``;
            vscode.env.clipboard.writeText(codeBlock).then(() => {
                vscode.window.showInformationMessage('Selection copied to clipboard as markdown code block');
            }, (err) => {
                vscode.window.showErrorMessage('Failed to copy to clipboard');
            });
        } else {
            vscode.window.showErrorMessage('No active editor found');
        }
    });

    // Copy all file contents as markdown code block (from both editor and sidebar)
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
                vscode.window.showErrorMessage('No active editor found');
                return;
            }
        }

        const fileName = vscode.workspace.asRelativePath(filePath);
        const fileExtension = path.extname(filePath).substring(1);

        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            const codeBlock = `*${fileName}*\n\`\`\`${fileExtension}\n${data}\n\`\`\``;
            await vscode.env.clipboard.writeText(codeBlock);
            vscode.window.showInformationMessage('File contents copied to clipboard as markdown code block');
        } catch (err) {
            vscode.window.showErrorMessage('Failed to read file contents');
        }
    });

    context.subscriptions.push(copySelection, copyFileContents);
}

export function deactivate() {}
