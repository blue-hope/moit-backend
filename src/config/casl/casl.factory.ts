import { User } from '@app/user/user.entity';
import { Ability, AbilityBuilder } from '@casl/ability';
import { Action } from './casl.enum';

export function buildUserRules(user: User) {
  const { can, rules } = new AbilityBuilder(Ability);
  can(Action.READ, 'Plan', { user_id: user.id });
  can(Action.READ, 'Plan', {
    group_id: {
      $in: user.usergroups.map((user_group) => user_group.id),
    },
  });
  return rules;
}
