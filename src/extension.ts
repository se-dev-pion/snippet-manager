import * as vscode from 'vscode';
import { initCommands } from './commands';
import { updateDataProviderOnCommand } from './services/sidebar';
import { mountSnippetConfigs, registerBuiltInSnippets } from './services/snippets';
import { initViews } from './views';

export function activate(context: vscode.ExtensionContext) {
    initCommands(context);
    initViews();
    mountSnippetConfigs(context);
    updateDataProviderOnCommand();
    registerBuiltInSnippets(context);
}
