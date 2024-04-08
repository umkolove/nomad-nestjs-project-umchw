import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subjects.service';
import { CreateSubjectDto } from './dto';
import { SubjectDocument } from '../database/models/subject.model';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Создать предмет' })
  @Post('create')
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectService.createSubject(createSubjectDto);
  }

  @ApiOperation({ summary: 'Удалить предмет по айди' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteSubjectById(
    @Param('id') subject_id,
  ): Promise<SubjectDocument | string> {
    return await this.subjectService.deleteSubjectById(subject_id);
  }
}
