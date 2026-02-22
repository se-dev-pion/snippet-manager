import vscode from 'vscode';
import { LoadConfigCommand } from '../commands/loadConfig';
import { LoadedConfigsTreeView } from '../views/loadedConfigs';
import { xmlParser } from '../common/utils';
import { SnippetConfigItem } from '../logics/config';
import { UnloadConfigCommand } from '../commands/unloadConfig';

export function autoUpdateTreeView() {
    LoadConfigCommand.callback = async (file: vscode.Uri) => {
        const content = await vscode.workspace.fs.readFile(file);
        const result = xmlParser.parse(content);
        const root = result?.root;
        if (!root?.name || !root?.item) {
            vscode.window.showErrorMessage('Invalid Snippet config file');
            return;
        }
        const item = new SnippetConfigItem(root.name, file);
        LoadedConfigsTreeView.instance.load(item);
    };
    UnloadConfigCommand.callback = (id: string) => {
        LoadedConfigsTreeView.instance.unload(id);
    };
}
