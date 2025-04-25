/* eslint-disable */
import fs from 'fs';
import path from 'path';

// Add rule IDs to all rules in a schema
// For use on old schema versions

const filePath = path.join(import.meta.dirname, '../src/boards/pokemon-gen1/schema.json');

const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const allRules = [];

const addRuleAndChildren = (rule, baseId) => {
  allRules.push(rule);

  const childRules = [
    ...(rule.choices?.map((c) => c.rule) || []),
    ...(rule.conditions?.map((c) => c[2]) || []),
    ...(rule.diceRolls?.outcomes?.map((o) => o.rule) || []),
  ];
  childRules.forEach((childRule, i) => {
    addRuleAndChildren(childRule);
  });
};

// First, collect all rules
schema.tiles.forEach((t, i) => {
  console.log(i, t.rule);
  addRuleAndChildren(t.rule);
});
schema.zones.forEach((z, i) => {
  addRuleAndChildren(z.rule);
});

// Remove each of their displayTexts and push into i18n
allRules.forEach((r) => {
  schema.i18n.en[r.id] = r.displayText;
  delete r.displayText;
});

console.log('updated', JSON.stringify(schema));
