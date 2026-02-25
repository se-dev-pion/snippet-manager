import vscode from 'vscode';
import { configKey } from '../common/constants';
import { ObservableTreeDataProviderTemplate } from './common/templates';
import { extensionConfigState, snippetConfigState } from './state';
import { SnippetConfig } from './schema';

export class SnippetConfigItem extends vscode.TreeItem {
    public constructor(
        _context: vscode.ExtensionContext, // for open and edit config
        public readonly data: SnippetConfig,
        public readonly label: string = data.root.name
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.contextValue = `${configKey}.config-item`;
        // TODO implement editing view
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
        this.persist(context, item.label, false);
        this.sync(context);
    }
    public delete(context: vscode.ExtensionContext, label: string) {
        delete this.data[label];
        this.refresh();
        this.persist(context, label, true);
    }
    public load(context: vscode.ExtensionContext) {
        const labels = extensionConfigState.get(context);
        const data = labels.map(label => snippetConfigState.get(context, label));
        this.data = Object.fromEntries(
            Object.entries(data).map((value: [string, SnippetConfig]) => [
                value[0],
                new SnippetConfigItem(context, value[1])
            ])
        );
        this.refresh();
        this.sync(context);
    }
    private persist(context: vscode.ExtensionContext, label: string, forDelete: boolean) {
        extensionConfigState.set(context, Object.keys(this.data));
        if (forDelete) {
            snippetConfigState.del(context, label);
        } else {
            snippetConfigState.set(context, label, this.data[label].data);
        }
    }
    private sync(context: vscode.ExtensionContext) {
        const extensionConfigStateKey = extensionConfigState.key(context);
        const snippetConfigStateKeys = Object.keys(this.data).map(key =>
            snippetConfigState.key(context, key)
        );
        context.globalState.setKeysForSync(
            [extensionConfigStateKey].concat(snippetConfigStateKeys)
        );
    }
}

export const loadedConfigsDataProvider = new LoadedConfigsDataProvider();
