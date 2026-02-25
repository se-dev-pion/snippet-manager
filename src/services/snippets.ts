import vscode from 'vscode';
import { loadedConfigsDataProvider } from '../logics/config';
import { buildCompletionItem } from '../logics/snippets';

export async function mountSnippetConfigs(context: vscode.ExtensionContext) {
    const provider: vscode.CompletionItemProvider = {
        async provideCompletionItems(document, _position, _token, _context) {
            const snippets = new Array<vscode.CompletionItem>();
            for (const item of loadedConfigsDataProvider.getChildren()) {
                try {
                    const rawItem = item.data?.root.item ?? [];
                    const items = rawItem instanceof Array ? rawItem : [rawItem];
                    for (const config of items) {
                        const snippet = buildCompletionItem(config, document.languageId);
                        if (snippet) {
                            snippets.push(snippet);
                        }
                    }
                } catch (err) {
                    console.log((err as Error).message);
                }
            }
            return snippets;
        }
    };
    const languages = await vscode.languages.getLanguages();
    const selectors = languages.map(language => ({
        scheme: 'file',
        language
    }));
    const disposables = selectors.map(selector =>
        vscode.languages.registerCompletionItemProvider(selector, provider)
    );
    context.subscriptions.push(...disposables);
}

enum PlaceHolders {
    Key = '${1:<!-- prefix -->}',
    Language = '${2:<!-- scope -->}',
    Tip = '${3:<!-- description -->}',
    Content = '${4:<!-- body -->}',
    Name = '${1:<!-- name -->}',
    Items = '${2:<!-- items -->}'
}

const snippetConfigItemSnippet = /*xml*/ `<item>
  <key>${PlaceHolders.Key}</key>
  <tip>${PlaceHolders.Tip}</tip>
  <main language="${PlaceHolders.Language}"><![CDATA[
    ${PlaceHolders.Content}
  ]]></main>
</item>`;

const snippetConfigFileTemplate = /*xml*/ `<root>
  <name>${PlaceHolders.Name}</name>
  ${PlaceHolders.Items}
</root>`;

const builtInSnippets = [
    {
        label: 'item',
        insertText: snippetConfigItemSnippet,
        detail: 'Add a snippet config item',
        kind: vscode.CompletionItemKind.Snippet
    },
    {
        label: 'init',
        insertText: snippetConfigFileTemplate,
        detail: 'Init the snippet config file',
        kind: vscode.CompletionItemKind.File
    }
];

export function registerBuiltInSnippets(context: vscode.ExtensionContext) {
    const provider: vscode.CompletionItemProvider = {
        provideCompletionItems(_document, _position, _token, _context) {
            return builtInSnippets.map(snippet => {
                const { label, insertText, detail, kind } = snippet;
                const item = new vscode.CompletionItem(label, kind);
                item.insertText = new vscode.SnippetString(insertText);
                item.detail = detail;
                return item;
            });
        }
    };
    const disposable = vscode.languages.registerCompletionItemProvider('snippet', provider);
    context.subscriptions.push(disposable);
}
