import vscode from 'vscode';
import { LoadConfigCommand } from '../commands/loadConfig';
import { loadedConfigsDataProvider, SnippetConfigItem } from '../logics/config';
import { UnloadConfigCommand } from '../commands/unloadConfig';
import { loadSnippetConfig } from '../logics/parser';

export function updateDataProviderOnCommand() {
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
}
