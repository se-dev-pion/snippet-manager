import vscode from 'vscode';
import { TreeView } from './interfaces';
import { configKey } from '../../common/constants';

export abstract class TreeViewTemplate<
    T,
    P extends vscode.TreeDataProvider<T>
> implements TreeView {
    protected constructor(protected readonly provider: P) {}
    public register(window: typeof vscode.window) {
        window.registerTreeDataProvider(this.fullID, this.provider);
    }
    private get fullID() {
        return `${configKey}.${this.id}`;
    }
    protected abstract id: string;
}

export abstract class ObservableTreeDataProviderTemplate<T> implements vscode.TreeDataProvider<T> {
    private _onDidChangeTreeData: vscode.EventEmitter<T | undefined | null | void>;
    public constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter<T | undefined | null | void>();
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
