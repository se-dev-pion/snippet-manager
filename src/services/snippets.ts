import vscode from 'vscode';
import { loadedConfigsDataProvider, loadSnippetConfig } from '../logics/config';

export function mountSnippetConfigs(context: vscode.ExtensionContext) {
    const provider: vscode.CompletionItemProvider = {
        async provideCompletionItems(document, _position, _token, _context) {
            const snippets = new Array<vscode.CompletionItem>();
            for (const item of loadedConfigsDataProvider.getChildren()) {
                try {
                    const data = await loadSnippetConfig(item.resourceUri);
                    for (const config of data.root.item) {
                        if (![document.languageId, '*'].includes(config.scope)) {
                            continue;
                        }
                        const snippet = new vscode.CompletionItem(
                            config.key,
                            vscode.CompletionItemKind.Snippet
                        );
                        snippet.insertText = new vscode.SnippetString(config.main);
                        snippet.detail = config.tip;
                        snippets.push(snippet);
                    }
                } catch (err) {
                    console.log((err as Error).message);
                }
            }
            return snippets;
        }
    };
    const disposable = vscode.languages.registerCompletionItemProvider('*', provider);
    context.subscriptions.push(disposable);
}
