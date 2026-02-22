import vscode from 'vscode';
import { LoadedConfigsTreeView } from './loadedConfigs';

export function initViews() {
    LoadedConfigsTreeView.instance.register(vscode.window);
}
