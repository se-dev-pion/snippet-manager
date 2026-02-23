import vscode from 'vscode';
import { LoadConfigCommand } from '../commands/loadConfig';
import { LoadedConfigsTreeView } from '../views/loadedConfigs';
import { loadedConfigsDataProvider, SnippetConfigItem } from '../logics/config';
import { UnloadConfigCommand } from '../commands/unloadConfig';
import { loadSnippetConfig } from '../logics/parse';

export function provideTreeView() {
    const treeView = new LoadedConfigsTreeView();
    LoadConfigCommand.addCallback(async (file: vscode.Uri) => {
        try {
            const data = await loadSnippetConfig(file);
            const item = new SnippetConfigItem(data.root.name, file);
            loadedConfigsDataProvider.add(item);
        } catch (err) {
            vscode.window.showErrorMessage((err as Error).message);
        }
    });
    UnloadConfigCommand.addCallback((id: string) => {
        loadedConfigsDataProvider.delete(id);
    });
    treeView.register(loadedConfigsDataProvider);
}
