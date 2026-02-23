import * as vscode from 'vscode';
import { initCommands } from './commands';
import { provideTreeView } from './services/sidebar';
import { mountSnippetConfigs, registerBuiltInSnippets } from './services/snippets';

export function activate(context: vscode.ExtensionContext) {
    initCommands(context);
    mountSnippetConfigs(context);
    provideTreeView();
    registerBuiltInSnippets(context);
}
