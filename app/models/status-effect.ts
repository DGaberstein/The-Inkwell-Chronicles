export enum StatusEffectType {
    POISON,
    DEFENSE_UP,
    ATTACK_UP,
    HEAL_OVER_TIME
}

export interface StatusEffect {
    type: StatusEffectType;
    duration: number;
    value: number;
    name: string;
    description: string;
}

export class StatusEffectImpl implements StatusEffect {
    constructor(
        public type: StatusEffectType,
        public duration: number,
        public value: number,
        public name: string,
        public description: string
    ) {}
}
