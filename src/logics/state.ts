import vscode from 'vscode';
import { SnippetConfig } from './schema';

export const extensionConfigState = {
    key(context: vscode.ExtensionContext) {
        return context.extension.id;
    },
    set(context: vscode.ExtensionContext, value: string[]) {
        context.globalState.update(this.key(context), value);
    },
    get(context: vscode.ExtensionContext) {
        return context.globalState.get<string[]>(this.key(context)) ?? [];
    }
};

export const snippetConfigState = {
    key(context: vscode.ExtensionContext, key: string) {
        return `${extensionConfigState.key(context)}.${key}`;
    },
    set(context: vscode.ExtensionContext, key: string, value: SnippetConfig) {
        return context.globalState.update(this.key(context, key), value);
    },
    get(context: vscode.ExtensionContext, key: string) {
        return (
            context.globalState.get<SnippetConfig>(this.key(context, key)) ?? {
                root: {
                    name: key,
                    item: []
                }
            }
        );
    },
    del(context: vscode.ExtensionContext, key: string) {
        return context.globalState.update(this.key(context, key), undefined);
    }
};
