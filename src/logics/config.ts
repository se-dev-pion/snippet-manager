import vscode from 'vscode';
import { configKey } from '../common/constants';
import { ObservableTreeDataProviderTemplate } from './common/templates';

type SnippetConfigItemData = {
    label: string;
    resourceUri: string;
};

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
    public toJSON(): SnippetConfigItemData {
        return {
            label: this.label,
            resourceUri: this.resourceUri.toString()
        };
    }
    public static fromJSON(data: SnippetConfigItemData) {
        return new SnippetConfigItem(data.label, vscode.Uri.parse(data.resourceUri));
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
    public add(context: vscode.ExtensionContext, item: SnippetConfigItem) {
        this.data[item.label] = item;
        this.refresh();
        this.persist(context);
    }
    public delete(context: vscode.ExtensionContext, label: string) {
        delete this.data[label];
        this.refresh();
        this.persist(context);
    }
    public load(data: string) {
        if (data.length === 0) {
            return;
        }
        this.data = Object.fromEntries(
            Object.entries(JSON.parse(data) as Record<string, SnippetConfigItemData>).map(
                (value: [string, SnippetConfigItemData]) => {
                    return [value[0], SnippetConfigItem.fromJSON(value[1])];
                }
            )
        );
        this.refresh();
    }
    private persist(context: vscode.ExtensionContext) {
        context.globalState.update(context.extension.id, JSON.stringify(this.data));
    }
}

export const loadedConfigsDataProvider = new LoadedConfigsDataProvider();
