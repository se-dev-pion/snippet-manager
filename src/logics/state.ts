import vscode from 'vscode';
import { SnippetConfig } from './schema';
import { UUID } from 'crypto';

export const extensionConfigState = {
    key(context: vscode.ExtensionContext) {
        return context.extension.id;
    },
    set(context: vscode.ExtensionContext, value: Record<UUID, number>) {
        context.globalState.update(this.key(context), value);
    },
    get(context: vscode.ExtensionContext) {
        return context.globalState.get<Record<UUID, number>>(this.key(context)) ?? {};
    }
};

export const snippetConfigState = {
    key(context: vscode.ExtensionContext, key: number) {
        return `${extensionConfigState.key(context)}.${key}`;
    },
    set(context: vscode.ExtensionContext, key: number, value: SnippetConfig) {
        return context.globalState.update(this.key(context, key), value);
    },
    get(context: vscode.ExtensionContext, key: number) {
        return (
            context.globalState.get<SnippetConfig>(this.key(context, key)) ?? {
                root: {
                    name: ''
                }
            }
        );
    },
    del(context: vscode.ExtensionContext, key: number) {
        return context.globalState.update(this.key(context, key), undefined);
    }
};
