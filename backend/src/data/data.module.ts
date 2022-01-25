import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from '../models/data.entity';
import { Printer } from '../models/printer.entity';
import { DataController } from './data.controller';
import { DataService } from './data.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Data, Printer])
  ],
  providers: [DataService],
  controllers: [DataController],
  exports: []
})
export class DataModule { }