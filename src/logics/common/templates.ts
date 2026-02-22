import vscode from 'vscode';

export abstract class ObservableTreeDataProviderTemplate<T> implements vscode.TreeDataProvider<T> {
    private _onDidChangeTreeData: vscode.EventEmitter<T | undefined | null | void>;
    public constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
    }
    public get onDidChangeTreeData() {
        return this._onDidChangeTreeData.event;
    }
    protected refresh() {
        this._onDidChangeTreeData.fire();
    }
    public abstract getTreeItem(element: T): vscode.TreeItem;
    public abstract getChildren(element?: T): vscode.ProviderResult<T[]>;
}
