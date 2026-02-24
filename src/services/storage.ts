import vscode from 'vscode';
import { loadedConfigsDataProvider } from '../logics/config';

export function loadLocalData(context: vscode.ExtensionContext) {
    const data = context.globalState.get<string>(context.extension.id) ?? '';
    loadedConfigsDataProvider.load(data);
}
