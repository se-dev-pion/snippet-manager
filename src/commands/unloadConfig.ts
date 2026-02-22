import { CommandID } from '../common/enums';
import { SnippetConfigItem } from '../logics/config';
import { Command } from './common/interfaces';
import { CommandTemplate } from './common/templates';

export class UnloadConfigCommand extends CommandTemplate {
    private static _command = new UnloadConfigCommand();
    public static get instance(): Command {
        return UnloadConfigCommand._command;
    }
    override id = CommandID.UnloadConfig;
    override call(item: SnippetConfigItem) {
        UnloadConfigCommand._callback(item.label);
    }
    private static _callback: (id: string) => void = () => {};
    public static set callback(f: (id: string) => void) {
        UnloadConfigCommand._callback = f;
    }
}
