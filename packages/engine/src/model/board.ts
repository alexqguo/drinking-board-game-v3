import { BaseModel } from './base.js';

export class BoardModel extends BaseModel<BoardSchema> {
  // todo- can this be done once upon instantiation?
  get rulesById() {
    const rulesById: Map<string, RuleSchema> = new Map();

    const decorateRuleIds = (rule: RuleSchema, baseId: string) => {
      rule.id = baseId;
      rulesById.set(baseId, rule);

      const childRules = [
        ...rule.choices?.map(c => c.rule) || [],
        ...rule.diceRolls?.outcomes?.map(o => o.rule) || [],
      ];
      childRules.forEach((childRule, i) => {
        decorateRuleIds(childRule, `${baseId}_${i}`);
      });
    };

    this.data.tiles.forEach((t: TileSchema, i: number) => {
      decorateRuleIds(t.rule, `rule_${i}`);
    });
    this.data.zones.forEach((z: ZoneSchema, i: number) => {
      decorateRuleIds(z.rule, `zone_rule_${i}`);
    });

    return rulesById;
  }
}