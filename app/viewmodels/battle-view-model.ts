import { Observable, Frame, EventData } from '@nativescript/core';
import { BattleSystem, BattleState } from '../models/battle-system';
import { GameState } from '../models/game-state';
import { InkwellBeingImpl } from '../models/inkwell-being';
import { StatusEffectImpl, StatusEffectType } from '../models/status-effect';

export class BattleViewModel extends Observable {
    private battleSystem: BattleSystem;
    private gameState: GameState;

    constructor() {
        super();

        this.gameState = GameState.getInstance();
        
        const poisonEffect = new StatusEffectImpl(
            StatusEffectType.POISON,
            3,
            5,
            'Poison',
            'Deals damage over time'
        );

        const defenseUpEffect = new StatusEffectImpl(
            StatusEffectType.DEFENSE_UP,
            2,
            10,
            'Defense Up',
            'Increases defense'
        );

        // Create sample battle for testing
        const playerTeam = [
            new InkwellBeingImpl('p1', 'Ink Knight', 1, 100, 100, [
                { 
                    name: 'Ink Slash', 
                    damage: 25, 
                    description: 'A powerful slash', 
                    cooldown: 0 
                },
                { 
                    name: 'Poison Strike', 
                    damage: 15, 
                    description: 'Poisons the target', 
                    cooldown: 3,
                    statusEffect: poisonEffect
                },
                { 
                    name: 'Defensive Stance', 
                    damage: 0, 
                    description: 'Increases defense', 
                    cooldown: 2,
                    statusEffect: defenseUpEffect
                }
            ])
        ];

        const enemyTeam = [
            new InkwellBeingImpl('e1', 'Ink Blob', 1, 80, 80, [
                { 
                    name: 'Ink Splash', 
                    damage: 15, 
                    description: 'Splashes ink', 
                    cooldown: 0 
                }
            ])
        ];

        this.battleSystem = new BattleSystem(playerTeam, enemyTeam);
        this.battleSystem.on(Observable.propertyChangeEvent, (data: EventData & { propertyName: string, value: any }) => {
            this.notifyPropertyChange(data.propertyName, data.value);
        });
    }

    get playerTeam() {
        return this.battleSystem.playerTeam;
    }

    get enemyTeam() {
        return this.battleSystem.enemyTeam;
    }

    get state() {
        return BattleState[this.battleSystem.state];
    }

    get battleStatus() {
        switch (this.battleSystem.state) {
            case BattleState.PLAYER_TURN:
                return "Your turn!";
            case BattleState.ENEMY_TURN:
                return "Enemy turn...";
            case BattleState.VICTORY:
                return "Victory!";
            case BattleState.DEFEAT:
                return "Defeat...";
            default:
                return "Battle Start!";
        }
    }

    onAbilityTap(args: EventData) {
        if (this.battleSystem.state === BattleState.PLAYER_TURN) {
            const button = args.object as any;
            const abilityIndex = button.get('abilityIndex');
            this.battleSystem.selectAbility(abilityIndex);
            this.battleSystem.executePlayerTurn(0);
        }
    }
}
