import { Injectable } from '@nestjs/common';
import { SubjectDocument } from '../database/models/subject.model';
import { CrudService } from '../../helpers/crud.service';
import { SubjectRepository } from '../database/repositories/subject.repository';
import { CreateSubjectDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';


@Injectable()
export class SubjectService extends CrudService<SubjectDocument> {
  
  constructor(
    readonly subjectRepository: SubjectRepository,
  ) {
    super (subjectRepository);
  }

  async createSubject(subjectCreateDto: CreateSubjectDto) {
    try {
        return await this.subjectRepository.create(subjectCreateDto)
    } catch(error) {
        return error.message
    }
    
  }

  async deleteSubjectById(subject_id: ObjectId): Promise<SubjectDocument | string> {
    try {
      const subject = await this.subjectRepository.findById(subject_id);
      return subject
        ? await this.subjectRepository.deleteOne({ _id: subject_id })
        : 'Такого предмета нет. Не получилось удалить';
    } catch (error) {
      return error.message;
    }
  }
}
