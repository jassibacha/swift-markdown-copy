# Swift Markdown Copy

Quickly copy entire file contents or a selection of code to markdown for easy pasting to LLMs or anywhere else. Right click file in sidebar, right click in code or use VS Code commands.

## Features

- **Copy Entire File as Markdown**: Right-click on a file in the sidebar to copy the entire file as a markdown code block.
- **Copy Selection as Markdown**: Right-click in the editor to copy the selected text as a markdown code block.
- **Copy Entire File from Editor**: Right-click in the editor to copy the entire file as a markdown code block.
- **VS Code Commands**: Use commands to copy selected text or the entire file as a markdown code block.

## Settings

You can customize the extension's behavior through VS Code settings:

- **Show Filename**: Show/hide the filename above the code block when copying (default: true)
- **Add Newline**: Add/remove a newline after the code block when copying (default: true)

To access these settings:
1. Open VS Code Settings (Ctrl+,)
2. Search for "Swift Markdown Copy"
3. Or directly edit your settings.json:
```json
{
    "swiftMarkdownCopy.output.showFilename": true,
    "swiftMarkdownCopy.output.addNewline": true
}
```

### Markdown Output

When you use this extension, the copied content will be formatted with the full path and filename, followed by the file extension in the markdown code block.

For example, if you copy the contents of a file located at `src/app/user/page.tsx`, the output will look like this:

````markdown
*src/app/user/page.tsx*
```tsx
import React from 'react';

const UserPage = () => {
  return <div>User Page</div>;
};

export default UserPage;
```
````

## Usage

### Right Click Context Menu Options

1. **Copy Entire File (Sidebar)**:
   - Right-click on a file in the sidebar and select `Swift Markdown: Copy Entire File as Markdown`.

2. **Copy Selection (Editor)**:
   - Select text in the editor, right-click, and select `Swift Markdown: Copy Selection as Markdown`.

3. **Copy Entire File (Editor)**:
   - Right-click in the editor text and select `Swift Markdown: Copy Entire File as Markdown`.

### Commands

- **Copy Selection as Markdown**:
  - Command: `Swift Markdown: Copy Selection as Markdown`
  - Usage: Open the command palette (`Ctrl+Shift+P`), type and select `Swift Markdown: Copy Selection as Markdown`.

- **Copy Entire File as Markdown**:
  - Command: `Swift Markdown: Copy Entire File as Markdown`
  - Usage: Open the command palette (`Ctrl+Shift+P`), type and select `Swift Markdown: Copy Entire File as Markdown`.

## Installation

1. Open VS Code.
2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `Swift Markdown Copy` and install the extension.
4. Reload VS Code.

## Known Issues

- No known issues at this time.

## Change Log

### [1.0.4] - 2025-01-21

- Added configurable settings for showing/hiding filename
- Added configurable settings for adding newline after code block

### [1.0.3] - 2024-06-19

- Added support for VS Code v1.80.1 and up.

### [1.0.2] - 2024-06-18

- Add Markdown Output to Readme, move Change Log into Readme.

### [1.0.1] - 2024-06-18

- Extension icon.

### [1.0.0] - 2024-06-18

- Initial release of Swift Markdown Copy.
- Added the ability to copy the entire file contents as a markdown code block by right-clicking a file in the sidebar.
- Added the ability to copy selected text as a markdown code block by right-clicking in the editor.
- Added the ability to copy the entire file contents as a markdown code block by right-clicking in the editor without any text selection.
- Added VS Code commands to copy selected text or the entire file contents as a markdown code block.

## Contributing

If you have any suggestions or find a bug, please open an issue or submit a pull request.

## License

[MIT](LICENSE)
