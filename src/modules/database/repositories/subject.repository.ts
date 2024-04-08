import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudRepository } from './crud.repository';
import { GroupDocument } from '../models/group.model';
import { SubjectDocument } from '../models/subject.model';

@Injectable()
export class SubjectRepository extends CrudRepository<SubjectDocument> {
  constructor(@InjectModel('Subjects') readonly model: Model<SubjectDocument>) {
    super(model);
  }
}
