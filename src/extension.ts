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
            const fileExtension = path.extname(editor.document.uri.fsPath).substring(1);

            const codeBlock = `\`\`\`${fileExtension}\n${text}\n\`\`\``;
            vscode.env.clipboard.writeText(codeBlock).then(() => {
                vscode.window.showInformationMessage('Selection copied to clipboard as markdown');
            }, (err) => {
                vscode.window.showErrorMessage('Failed to copy to clipboard');
            });
        } else {
            vscode.window.showErrorMessage('No active editor found');
        }
    });

    // Copy all file contents as markdown code block
    let copyFileContents = vscode.commands.registerCommand('extension.copyFileContentsAsMarkdown', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = editor.document.getText();
            const filePath = editor.document.uri.fsPath;
            const fileExtension = path.extname(filePath).substring(1);
            const fileName = vscode.workspace.asRelativePath(filePath);

            const codeBlock = `*${fileName}*\n\`\`\`${fileExtension}\n${text}\n\`\`\``;
            vscode.env.clipboard.writeText(codeBlock).then(() => {
                vscode.window.showInformationMessage('File contents copied to clipboard as markdown code block');
            }, (err) => {
                vscode.window.showErrorMessage('Failed to copy to clipboard');
            });
        } else {
            vscode.window.showErrorMessage('No active editor found');
        }
    });

    // Copy file contents from sidebar as markdown code block
    let copyFileFromSidebar = vscode.commands.registerCommand('extension.copyFileFromSidebarAsMarkdown', async (uri: vscode.Uri) => {
        const filePath = uri.fsPath;
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

    context.subscriptions.push(copySelection, copyFileContents, copyFileFromSidebar);
}

export function deactivate() {}
