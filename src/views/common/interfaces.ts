import vscode from 'vscode';

export interface TreeView {
    register(window: typeof vscode.window): void;
}
