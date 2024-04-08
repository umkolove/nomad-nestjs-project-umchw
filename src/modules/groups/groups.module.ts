import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, UsersService]
})
export class GroupsModule {}
