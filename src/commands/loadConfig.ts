import vscode from 'vscode';
import { CommandID } from '../common/enums';
import { Command } from './common/interfaces';
import { CommandTemplate } from './common/templates';

export class LoadConfigCommand extends CommandTemplate {
    private static _command = new LoadConfigCommand();
    public static get instance(): Command {
        return LoadConfigCommand._command;
    }
    override id = CommandID.LoadConfig;
    override async call() {
        const file = (
            await vscode.window.showOpenDialog({
                title: 'Choose a snippet config file',
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    'Snippet Configs': ['xml']
                }
            })
        )?.at(0);
        if (file) {
            await LoadConfigCommand._callback(file);
        }
    }
    private static _callback: (file: vscode.Uri) => Promise<void> = async () => {};
    public static set callback(f: (file: vscode.Uri) => Promise<void>) {
        LoadConfigCommand._callback = f;
    }
}
