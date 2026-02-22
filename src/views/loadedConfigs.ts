import vscode from 'vscode';
import { ObservableTreeDataProviderTemplate, TreeViewTemplate } from './common/templates';
import { ViewID } from '../common/enums';
import { SnippetConfigItem } from '../logics/config';

class LoadedConfigsDataProvider extends ObservableTreeDataProviderTemplate<SnippetConfigItem> {
    public constructor(private data = {} as Record<string, SnippetConfigItem>) {
        super();
    }
    override getTreeItem(element: SnippetConfigItem): vscode.TreeItem {
        return element;
    }
    override getChildren(): vscode.ProviderResult<SnippetConfigItem[]> {
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

export class LoadedConfigsTreeView extends TreeViewTemplate<
    SnippetConfigItem,
    LoadedConfigsDataProvider
> {
    private static _view = new LoadedConfigsTreeView(new LoadedConfigsDataProvider());
    public static get instance() {
        return LoadedConfigsTreeView._view;
    }
    override id = ViewID.LoadedConfigs;
    public load(item: SnippetConfigItem) {
        this.provider.add(item);
    }
    public unload(label: string) {
        this.provider.delete(label);
    }
}
