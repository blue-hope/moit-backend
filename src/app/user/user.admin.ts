import { AdminEntity } from 'nestjs-admin';
import { User } from '@app/user/user.entity';

export class UserAdmin extends AdminEntity {
  entity = User;
  fields = ['id', 'email', 'name'];
  listDisplay = ['id', 'email', 'name'];
  searchFields = ['email', 'name'];
}
