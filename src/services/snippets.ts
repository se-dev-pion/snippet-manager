import vscode from 'vscode';
import { loadedConfigsDataProvider } from '../logics/config';
import { loadSnippetConfig } from '../logics/parse';

export function mountSnippetConfigs(context: vscode.ExtensionContext) {
    const provider: vscode.CompletionItemProvider = {
        async provideCompletionItems(document, _position, _token, _context) {
            const snippets = new Array<vscode.CompletionItem>();
            for (const item of loadedConfigsDataProvider.getChildren()) {
                try {
                    const data = await loadSnippetConfig(item.resourceUri);
                    for (const config of data.root.item) {
                        if (![document.languageId, '*'].includes(config.main['@_language'])) {
                            continue;
                        }
                        const snippet = new vscode.CompletionItem(
                            config.key,
                            vscode.CompletionItemKind.Snippet
                        );
                        snippet.insertText = new vscode.SnippetString(config.main['#text']);
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

enum PlaceHolders {
    Key = '${1:prefix}',
    Language = '${2:scope}',
    Tip = '${3:description}',
    Content = '${4:body}'
}
const snippetConfigItemSnippet = /*xml*/ `
  <item>
    <key>${PlaceHolders.Key}</key>
    <tip>${PlaceHolders.Tip}</tip>
    <main language="${PlaceHolders.Language}"><![CDATA[
      ${PlaceHolders.Content}
    ]]></main>
  </item>
`;
export function registerBuiltInSnippets(context: vscode.ExtensionContext) {
    const provider: vscode.CompletionItemProvider = {
        provideCompletionItems(_document, _position, _token, _context) {
            const snippet = new vscode.CompletionItem('item', vscode.CompletionItemKind.Unit);
            snippet.insertText = new vscode.SnippetString(snippetConfigItemSnippet);
            snippet.detail = 'Add a new snippet config item';
            return [snippet];
        }
    };
    const disposable = vscode.languages.registerCompletionItemProvider('snippet', provider);
    context.subscriptions.push(disposable);
}
