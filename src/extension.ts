import * as vscode from 'vscode';
import { initCommands } from './commands';
import { initViews } from './views';
import { autoUpdateTreeView } from './services/sidebar';

export function activate(context: vscode.ExtensionContext) {
    initCommands(context);
    initViews();
    autoUpdateTreeView();
}
