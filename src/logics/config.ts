import vscode from 'vscode';
import { configKey } from '../common/constants';
import { ObservableTreeDataProviderTemplate } from './common/templates';

export class SnippetConfigItem extends vscode.TreeItem {
    public constructor(
        public readonly label: string,
        public readonly resourceUri: vscode.Uri
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.contextValue = `${configKey}.config-item`;
        this.description = resourceUri.fsPath;
        this.command = {
            command: 'vscode.open',
            title: 'Open this Snippet Config',
            arguments: [resourceUri]
        };
    }
}

class LoadedConfigsDataProvider extends ObservableTreeDataProviderTemplate<SnippetConfigItem> {
    public constructor(private data = {} as Record<string, SnippetConfigItem>) {
        super();
    }
    override getTreeItem(element: SnippetConfigItem) {
        return element;
    }
    override getChildren() {
        return Object.values(this.data);
    }
    public add(item: SnippetConfigItem) {
        this.data[item.label] = item;
        this.refresh();
    }
    public delete(label: string) {
        delete this.data[label];
        this.refresh();
    }
}

export const loadedConfigsDataProvider = new LoadedConfigsDataProvider();
