import vscode from 'vscode';

export interface Command {
    register(context: vscode.ExtensionContext): void;
    uriWithArgs(...args: any[]): string;
}
