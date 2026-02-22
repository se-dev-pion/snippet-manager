import vscode from 'vscode';
import { configKey } from '../common/constants';

export class SnippetConfigItem extends vscode.TreeItem {
    public constructor(
        public readonly label: string,
        uri: vscode.Uri
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.description = uri.fsPath;
        this.contextValue = `${configKey}.config-item`;
        this.command = {
            command: 'vscode.open',
            title: 'Open this Snippet Config',
            arguments: [uri]
        };
    }
}
