import { loadedConfigsDataProvider } from '../logics/config';
import { LoadedConfigsTreeView } from './loadedConfigs';

export function initViews() {
    LoadedConfigsTreeView.instance.register(loadedConfigsDataProvider);
}
