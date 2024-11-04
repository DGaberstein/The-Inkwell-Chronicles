import { StatusEffect, StatusEffectType } from './status-effect';

export interface Ability {
    name: string;
    damage: number;
    description: string;
    cooldown: number;
    currentCooldown?: number;
    statusEffect?: StatusEffect;
}

export interface InkwellBeing {
    id: string;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    abilities: Ability[];
    experience: number;
    statusEffects: StatusEffect[];
    takeDamage(amount: number): void;
    heal(amount: number): void;
    addStatusEffect(effect: StatusEffect): void;
    removeStatusEffect(effectType: StatusEffect): void;
    updateStatusEffects(): void;
}

export class InkwellBeingImpl implements InkwellBeing {
    public statusEffects: StatusEffect[] = [];

    constructor(
        public id: string,
        public name: string,
        public level: number = 1,
        public health: number = 100,
        public maxHealth: number = 100,
        public abilities: Ability[] = [],
        public experience: number = 0
    ) {}

    takeDamage(amount: number): void {
        const defenseUp = this.statusEffects.find(effect => effect.type === StatusEffectType.DEFENSE_UP);
        const damageReduction = defenseUp ? defenseUp.value : 0;
        const finalDamage = Math.max(1, amount - damageReduction);
        this.health = Math.max(0, this.health - finalDamage);
    }

    heal(amount: number): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    addStatusEffect(effect: StatusEffect): void {
        this.statusEffects.push(effect);
    }

    removeStatusEffect(effect: StatusEffect): void {
        const index = this.statusEffects.indexOf(effect);
        if (index > -1) {
            this.statusEffects.splice(index, 1);
        }
    }

    updateStatusEffects(): void {
        for (const effect of [...this.statusEffects]) {
            effect.duration--;
            if (effect.duration <= 0) {
                this.removeStatusEffect(effect);
                continue;
            }

            switch (effect.type) {
                case StatusEffectType.POISON:
                    this.takeDamage(effect.value);
                    break;
                case StatusEffectType.HEAL_OVER_TIME:
                    this.heal(effect.value);
                    break;
            }
        }
    }

    levelUp(): void {
        this.level++;
        this.maxHealth += 20;
        this.health = this.maxHealth;
    }
}
