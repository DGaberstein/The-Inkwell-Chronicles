import { EventData, Page } from '@nativescript/core';
import { MainGameViewModel } from './viewmodels/main-game-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MainGameViewModel();
}
