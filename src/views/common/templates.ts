import vscode from 'vscode';
import { TreeView } from './interfaces';
import { configKey } from '../../common/constants';

export abstract class TreeViewTemplate<T> implements TreeView<vscode.TreeDataProvider<T>> {
    public register(provider: vscode.TreeDataProvider<T>) {
        vscode.window.registerTreeDataProvider(this.fullID, provider);
    }
    private get fullID() {
        return `${configKey}.${this.id}`;
    }
    protected abstract id: string;
}
