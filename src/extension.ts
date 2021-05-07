// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		registerShortcut('extension.parentheses', '(', ')'),
		registerShortcut('extension.curlyBrackets', '{', '}'),
		registerShortcut('extension.stringInterpolation', '\`'),
		registerShortcut('extension.squareBrackets', '[', ']')
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

/**
 * Registers a command.
 * @param name Name of the command
 * @param first First character added to the selection. 
 * @param last Last character added to the selection. If the ```last``` character is not specified, then the ```start``` chararcter will be used.
 * @returns A registered command (Disposable)
 */
function registerShortcut(name: string, first: string, last: string = first): vscode.Disposable {
	return vscode.commands.registerCommand(name, () => {
		wrapSelection(first, last);
	});
}

/**
 * Wraps specific characters arount selected text.
 * @param first First character added to the selection. 
 * @param last Last character added to the selection.
 */
function wrapSelection(first: string, last: string): void {
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let selection = editor.selection;


		let text = editor.document.getText(selection);

		editor.edit(editBuilder => {
			editBuilder.replace(selection, first + text + last);
		});

		if (selection.isEmpty) {
			// if there is nothing selected, replace the cursor between the two added characters
			const position = editor.selection.end;
			var newPosition = position.with(position.line, position.character + 1);
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;
		}
		else {
			const position = editor.selection.end;
			var newPosition = position.with(position.line, position.character + 2);
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;
		}
	}
	else {
		vscode.window.showInformationMessage('There is no active text editor.');
	}
}


