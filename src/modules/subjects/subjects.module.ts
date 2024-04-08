import { Module } from '@nestjs/common';
import { SubjectService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectService]
})
export class SubjectsModule {}
