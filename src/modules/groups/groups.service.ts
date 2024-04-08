import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../database/repositories/group.repository';
import { CrudService } from '../../helpers/crud.service';
import { GroupDocument } from '../database/models/group.model';
import { CreateGroupDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService extends CrudService<GroupDocument> {
  constructor(
    readonly groupRepository: GroupRepository,
    readonly userRepository: UserRepository,
    readonly userService: UsersService
  ) {
    super(groupRepository);
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      return await this.groupRepository.create(createGroupDto);
    } catch (error) {
      return error.message;
    }
  }

  async findGroupById(group_id: ObjectId): Promise<GroupDocument> {
    try {
      return await this.groupRepository.findById(group_id);
    } catch (error) {
      return error.message;
    }
  }

  async deleteGroupById(group_id: ObjectId): Promise<GroupDocument | string> {
    try {
      const group = await this.groupRepository.findById(group_id);
      return group
        ? await this.groupRepository.deleteOne({ _id: group_id })
        : 'Такой группы нет. Не получилось удалить';
    } catch (error) {
      return error.message;
    }
  }

  async addStudentToGroup(
    student_id: ObjectId,
    group_id: ObjectId,
  ): Promise<UserDocument | string> {
    try {
      const student = await this.userService.findUserById(student_id);

      if (!student.group_id) {
        const group = await this.groupRepository.findById(group_id);
        group.student_count += 1;
        await group.save();
      }

      if (student.group_id.toString() === group_id.toString()) {
        return `Студент ${student.full_name} уже состоит в этой группе`;
      }

      const oldGroup = await this.groupRepository.findById(student.group_id);
      const newGroup = await this.groupRepository.findById(group_id);

      oldGroup.student_count -= 1;
      newGroup.student_count += 1;

      await oldGroup.save();
      await newGroup.save();

      return await this.userRepository.updateOne(
        { _id: student_id },
        { group_id },
      );
    } catch (error) {
      return error.message;
    }
  }
}
