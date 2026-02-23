import * as vscode from 'vscode';
import { initCommands } from './commands';
import { updateDataProviderOnCommand } from './services/sidebar';
import { mountSnippetConfigs, registerBuiltInSnippets } from './services/snippets';
import { initViews } from './views';

export async function activate(context: vscode.ExtensionContext) {
    initCommands(context);
    initViews();
    updateDataProviderOnCommand();
    await mountSnippetConfigs(context);
    registerBuiltInSnippets(context);
}
