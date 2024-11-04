import { Observable, Frame } from '@nativescript/core';
import { GameState } from '../models/game-state';

export class MainGameViewModel extends Observable {
    private gameState: GameState;

    constructor() {
        super();
        this.gameState = GameState.getInstance();
    }

    get inkwellEssence(): number {
        return this.gameState.inkwellEssence;
    }

    startAdventure() {
        console.log('Starting adventure...');
        // TODO: Implement adventure mode
    }

    showCollection() {
        console.log('Showing collection...');
        // TODO: Navigate to collection view
    }

    startBattle() {
        Frame.topmost().navigate({
            moduleName: 'views/battle-view',
            clearHistory: false
        });
    }

    openShop() {
        console.log('Opening shop...');
        // TODO: Implement shop system
    }
}