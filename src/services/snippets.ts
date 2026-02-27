import vscode from 'vscode';
import { loadedConfigsDataProvider } from '../logics/config';
import { loadSnippetConfig } from '../logics/parser';
import { buildCompletionItem } from '../logics/snippets';

export async function mountSnippetConfigs(context: vscode.ExtensionContext) {
    const provider: vscode.CompletionItemProvider = {
        async provideCompletionItems(document, _position, _token, _context) {
            const snippets = new Array<vscode.CompletionItem>();
            for (const item of loadedConfigsDataProvider.getChildren()) {
                try {
                    const data = await loadSnippetConfig(item.resourceUri);
                    const rawItem = data.root.item ?? [];
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
    Items = '${2:<!-- items -->}',
    Placeholder = '${0:<!-- placeholder -->}'
}

const builtInSnippetsText = [

    /*xml*/ `<item>
  <key>${PlaceHolders.Key}</key>
  <tip>${PlaceHolders.Tip}</tip>
  <main language="${PlaceHolders.Language}"><![CDATA[
    ${PlaceHolders.Content}
  ]]></main>
</item>`,
    
    /*xml*/ `<root>
  <name>${PlaceHolders.Name}</name>
  ${PlaceHolders.Items}
</root>`,
    
    /*xml*/ `<![CDATA[$0]]>`,

    /*xml*/ `^{${PlaceHolders.Placeholder}}`
    
];

const builtInSnippets = [
    {
        label: 'item',
        insertText: builtInSnippetsText[0],
        detail: 'Add a snippet config item',
        kind: vscode.CompletionItemKind.Issue
    },
    {
        label: 'init',
        insertText: builtInSnippetsText[1],
        detail: 'Init the snippet config file',
        kind: vscode.CompletionItemKind.File
    },
    {
        label: 'cdata',
        insertText: builtInSnippetsText[2],
        detail: 'Add a new CDATA',
        kind: vscode.CompletionItemKind.Text
    },
    {
        label: 'placeholder',
        insertText: builtInSnippetsText[3],
        detail: 'Except for the symbol change ($ => ^), The rest still follows the original grammar.',
        kind: vscode.CompletionItemKind.Snippet
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
