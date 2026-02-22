import vscode from 'vscode';
import { Command } from './interfaces';
import { configKey } from '../../common/constants';
export abstract class CommandTemplate implements Command {
    protected constructor() {}
    public register(context: vscode.ExtensionContext) {
        const disposable = vscode.commands.registerCommand(this.fullID, this.call);
        context.subscriptions.push(disposable);
    }
    private get fullID() {
        return `${configKey}.${this.id}`;
    }
    protected abstract id: string;
    protected abstract call(...args: any[]): any;
    public uriWithArgs(...args: any[]) {
        return `command:${this.fullID}?${encodeURIComponent(JSON.stringify(args))}`;
    }
}
