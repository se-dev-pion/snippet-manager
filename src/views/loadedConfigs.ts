import { TreeViewTemplate } from './common/templates';
import { ViewID } from '../common/enums';
import { SnippetConfigItem } from '../logics/config';

export class LoadedConfigsTreeView extends TreeViewTemplate<SnippetConfigItem> {
    private static _view = new LoadedConfigsTreeView();
    public static get instance() {
        return LoadedConfigsTreeView._view;
    }
    override id = ViewID.LoadedConfigs;
}
