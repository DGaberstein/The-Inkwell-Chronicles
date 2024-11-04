import { Observable } from '@nativescript/core';
import { InkwellBeing } from './inkwell-being';

export class GameState extends Observable {
    private static instance: GameState;
    private _inkwellEssence: number = 0;
    private _collection: InkwellBeing[] = [];
    
    private constructor() {
        super();
    }

    static getInstance(): GameState {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }

    get inkwellEssence(): number {
        return this._inkwellEssence;
    }

    set inkwellEssence(value: number) {
        if (this._inkwellEssence !== value) {
            this._inkwellEssence = value;
            this.notifyPropertyChange('inkwellEssence', value);
        }
    }

    get collection(): InkwellBeing[] {
        return this._collection;
    }

    addInkwellBeing(being: InkwellBeing): void {
        this._collection.push(being);
        this.notifyPropertyChange('collection', this._collection);
    }
}
