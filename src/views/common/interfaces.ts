import vscode from 'vscode';

export interface TreeView<T> {
    register(provider: T): void;
}
