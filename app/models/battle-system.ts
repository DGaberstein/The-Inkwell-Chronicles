import { Observable } from '@nativescript/core';
import { InkwellBeing } from './inkwell-being';

export enum BattleState {
    WAITING,
    PLAYER_TURN,
    ENEMY_TURN,
    VICTORY,
    DEFEAT
}

export class BattleSystem extends Observable {
    private _state: BattleState = BattleState.WAITING;
    private _playerTeam: InkwellBeing[] = [];
    private _enemyTeam: InkwellBeing[] = [];
    private _currentTurn: number = 0;
    private _selectedAbility: number | null = null;

    constructor(playerTeam: InkwellBeing[], enemyTeam: InkwellBeing[]) {
        super();
        this._playerTeam = playerTeam;
        this._enemyTeam = enemyTeam;
        this._state = BattleState.PLAYER_TURN;
    }

    get state(): BattleState {
        return this._state;
    }

    get currentTurn(): number {
        return this._currentTurn;
    }

    get playerTeam(): InkwellBeing[] {
        return this._playerTeam;
    }

    get enemyTeam(): InkwellBeing[] {
        return this._enemyTeam;
    }

    selectAbility(index: number): void {
        this._selectedAbility = index;
        this.notifyPropertyChange('selectedAbility', index);
    }

    executePlayerTurn(targetIndex: number): void {
        if (this._state !== BattleState.PLAYER_TURN || this._selectedAbility === null) return;

        const attacker = this._playerTeam[this._currentTurn];
        const ability = attacker.abilities[this._selectedAbility];
        const target = this._enemyTeam[targetIndex];

        target.takeDamage(ability.damage);
        this._selectedAbility = null;

        if (this.checkBattleEnd()) return;
        
        this._state = BattleState.ENEMY_TURN;
        this.executeEnemyTurn();
    }

    private executeEnemyTurn(): void {
        if (this._state !== BattleState.ENEMY_TURN) return;

        for (const enemy of this._enemyTeam) {
            if (enemy.health <= 0) continue;

            const randomAbility = Math.floor(Math.random() * enemy.abilities.length);
            const randomTarget = Math.floor(Math.random() * this._playerTeam.length);
            
            const ability = enemy.abilities[randomAbility];
            const target = this._playerTeam[randomTarget];
            
            target.takeDamage(ability.damage);

            if (this.checkBattleEnd()) return;
        }

        this._currentTurn = (this._currentTurn + 1) % this._playerTeam.length;
        this._state = BattleState.PLAYER_TURN;
        this.notifyPropertyChange('state', this._state);
    }

    private checkBattleEnd(): boolean {
        if (this._enemyTeam.every(enemy => enemy.health <= 0)) {
            this._state = BattleState.VICTORY;
            this.notifyPropertyChange('state', this._state);
            return true;
        }

        if (this._playerTeam.every(player => player.health <= 0)) {
            this._state = BattleState.DEFEAT;
            this.notifyPropertyChange('state', this._state);
            return true;
        }

        return false;
    }
}
