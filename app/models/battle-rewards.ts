import { InkwellBeing } from './inkwell-being';

export interface BattleRewards {
    experience: number;
    inkwellEssence: number;
}

export class BattleRewardsCalculator {
    static calculateRewards(playerTeam: InkwellBeing[], enemyTeam: InkwellBeing[]): BattleRewards {
        const baseExperience = enemyTeam.reduce((sum, enemy) => sum + enemy.level * 10, 0);
        const baseEssence = enemyTeam.reduce((sum, enemy) => sum + enemy.level * 5, 0);

        return {
            experience: baseExperience,
            inkwellEssence: baseEssence
        };
    }
}
