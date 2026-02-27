import vscode from 'vscode';
import { SnippetConfigItem } from './schema';

export function buildCompletionItem(config: SnippetConfigItem, language: string) {
    if (![language, '*'].includes(config.main['@_language'])) {
        return;
    }

    const rawText = config.main['#text'].trimEnd().split('\n');
    while (rawText.length > 0 && !rawText[0]) {
        rawText.shift();
    }
    if (rawText.length === 0) {
        return;
    }
    const leadSpace = rawText[0].length - rawText[0].trimStart().length;
    var text = rawText
        .map(line => {
            const a = line.trimStart();
            const b = line.slice(leadSpace);
            return a.length >= b.length ? a : b;
        })
        .join('\n');

    const snippet = new vscode.CompletionItem(config.key, vscode.CompletionItemKind.Snippet);
    text = text.replace(/\$/g, "\\$").replace(/\^/g, "$");
    snippet.insertText = new vscode.SnippetString(text);
    snippet.detail = config.tip;
    return snippet;
}
