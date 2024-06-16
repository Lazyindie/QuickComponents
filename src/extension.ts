import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const infolder = vscode.commands.registerCommand('quick-components.infolder', async (node: any) => {
		await createComponent(node, true);
	});
	const andfolder = vscode.commands.registerCommand('quick-components.andfolder', async (node: any) => {
		await createComponent(node, false);
	});

	context.subscriptions.push(infolder, andfolder);
}

const createComponent = async (node: any, infolder: boolean) => {
	const { exec } = require('child_process');
	const path = node._fsPath ?? node.path?.slice(1);
	if (path == null || path.length == 0) {
		vscode.window.showErrorMessage(`Cannot find valid path.`);
		return;
	}

	let uri: string = path;
	if (uri == null) {
		vscode.window.showErrorMessage(`Cannot validate path.`);
		return;
	}

	const validatePathCommand = `Test-Path ${path} -PathType Leaf`;
	exec(validatePathCommand, {'shell':'powershell.exe'}, (error: string, stdout: string, stderr: string) => {
		if (stdout.includes('True')) {
			const filteredPath: string[] = uri.split("\\");
			filteredPath.pop();
			uri = filteredPath.join("\\");
			console.log("new uri", uri);
		}
	});

	const userResponse = await vscode.window.showInputBox({
		title: 'Create new component ' + infolder ? 'and folder called:' : 'called:',
		placeHolder: 'new-component-name',
		prompt: `Don't include ".component" or any extensions.`
	});

	if (userResponse == null || userResponse.length == 0) {
		vscode.window.showErrorMessage(`Name is invalid.`);
		return;
	}
	vscode.window.showInformationMessage(`Creating new angular component ${userResponse}`);

	const createComponentCommand = `cd ${uri}; ng g c "${userResponse}" ${infolder ? '--flat' : ''} --skip-import true --standalone true --interactive false`;
	exec(createComponentCommand, {'shell':'powershell.exe'}, (error: any, stdout: any, stderr: any)=> {
		if (stderr != null) vscode.window.showErrorMessage(stderr);
	});

	// vscode.window.showInformationMessage(`Creating new angular component ${userResponse}`);
	vscode.window.showInformationMessage(`Created ${uri}/${userResponse}`);
};

// This method is called when your extension is deactivated
export function deactivate() {}
