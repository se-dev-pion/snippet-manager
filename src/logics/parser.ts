import vscode from 'vscode';
import { parseWithSchema, xmlParser } from '../common/utils';
import { snippetConfigSchema } from './schema';

export async function loadSnippetConfig(file: vscode.Uri) {
    const content = await vscode.workspace.fs.readFile(file);
    return parseWithSchema(content, xmlParser, snippetConfigSchema);
}
