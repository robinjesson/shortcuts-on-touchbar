// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let squareBrackets = vscode.commands.registerCommand('extension.squareBrackets', () => {
		addCharacter('[', ']');
	});

	let curlyBrackets = vscode.commands.registerCommand('extension.curlyBrackets', () => {
		addCharacter('{', '}');
	});

	let stringInterpolation = vscode.commands.registerCommand('extension.stringInterpolation', () => {
		addCharacter('\`', '\`');
	});

	

	context.subscriptions.push(
		squareBrackets,
		curlyBrackets);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function addCharacter(start: string, end?: string): void {
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		if(end) {
			let selection = editor.selection;
			
			
			let text = editor.document.getText(selection);
			
			editor.edit(editBuilder => {
				editBuilder.replace(selection, start + text + end);
			});

			if(selection.isEmpty) {
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
	}
	else {
		vscode.window.showInformationMessage('There is no active text editor');
	}
}

 
