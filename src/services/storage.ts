import vscode from 'vscode';
import { loadedConfigsDataProvider } from '../logics/config';
export function loadLocalData(context: vscode.ExtensionContext) {
    loadedConfigsDataProvider.load(context);
}
