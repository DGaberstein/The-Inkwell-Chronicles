import { NavigatedData, Page } from '@nativescript/core';
import { MainGameViewModel } from '../viewmodels/main-game-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MainGameViewModel();
}
