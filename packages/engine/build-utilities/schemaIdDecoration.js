/* eslint-disable */
import fs from 'fs';
import path from 'path';

// Add rule IDs to all rules in a schema
// For use on old schema versions

const filePath = path.join(import.meta.dirname, '../src/boards/zelda/schema.json');

const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const decorateRuleIds = (rule, baseId) => {
  rule.id = baseId;
  // rulesById.set(baseId, rule);

  const childRules = [
    ...(rule.choices?.map(c => c.rule) || []),
    ...(rule.diceRolls?.outcomes?.map(o => o.rule) || []),
  ];
  childRules.forEach((childRule, i) => {
    decorateRuleIds(childRule, `${baseId}_outcome_${i}`);
  });
};

schema.tiles.forEach((t, i) => {
  console.log(i, t.rule);
  decorateRuleIds(t.rule, `rule_${i}`);
});
schema.zones.forEach((z, i) => {
  decorateRuleIds(z.rule, `zone_rule_${i}`);
});

console.log('updated', JSON.stringify(schema));
