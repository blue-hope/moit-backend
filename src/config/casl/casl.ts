import { Group } from '@app/group/group.entity';
import { User } from '@app/user/user.entity';
import { Ability } from '@casl/ability';
import { Action } from '@config/casl/casl.enum';
import { UnauthorizedException } from '@nestjs/common';
import { buildUserRules } from './casl.factory';

type subjectType = User | Group;
type objectType = Group;

export class CaslManager {
  private static defineRules(ability: Ability, subject: subjectType) {
    switch (typeof subject) {
      case typeof User:
        ability.update(buildUserRules(subject as User));
    }
    return;
  }
  private static async check(
    action: Action,
    subject: subjectType,
    object: objectType,
  ) {
    const ability = new Ability([]);
    this.defineRules(ability, subject);
    if (!ability.can(action, object)) {
      throw new UnauthorizedException();
    }
  }
  // can just call these functions, no return
  static async canCreate(subject: subjectType, object: objectType) {
    await this.check(Action.CREATE, subject, object);
  }
  static async canRead(subject: subjectType, object: objectType) {
    await this.check(Action.READ, subject, object);
  }
  static async canUpdate(subject: subjectType, object: objectType) {
    await this.check(Action.UPDATE, subject, object);
  }
  static async canDelete(subject: subjectType, object: objectType) {
    await this.check(Action.DELETE, subject, object);
  }
}
