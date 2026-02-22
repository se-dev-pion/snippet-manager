import vscode from 'vscode';
import { LoadConfigCommand } from './loadConfig';
import { UnloadConfigCommand } from './unloadConfig';

export function initCommands(context: vscode.ExtensionContext) {
    LoadConfigCommand.instance.register(context);
    UnloadConfigCommand.instance.register(context);
}
