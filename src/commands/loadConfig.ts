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
                    'Snippet Configs': ['snippet.xml']
                }
            })
        )?.at(0);
        if (file) {
            await Promise.all(LoadConfigCommand._callbacks.map(f => f(file)));
        }
    }
    public static _callbacks = new Array<(file: vscode.Uri) => Promise<void>>();
    public static addCallback(f: (file: vscode.Uri) => Promise<void>) {
        LoadConfigCommand._callbacks.push(f);
    }
}
