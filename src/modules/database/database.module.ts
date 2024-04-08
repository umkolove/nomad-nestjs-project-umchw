import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { GroupSchema } from './models/group.model';
import { GroupRepository } from './repositories/group.repository';
import { SubjectSchema } from './models/subject.model';
import { SubjectRepository } from './repositories/subject.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
      {
        name: 'Groups',
        schema: GroupSchema,
      },
      {
        name: 'Subjects',
        schema: SubjectSchema,
      },
    ]),
  ],
  providers: [UserRepository, GroupRepository, SubjectRepository],
  exports: [UserRepository, GroupRepository, SubjectRepository],
})
export class DatabaseModule {}
