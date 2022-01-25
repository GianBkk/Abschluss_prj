import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeOrmConfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config'
import { PrinterModule } from './printers/printer.module';
import { DataModule } from './data/data.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    PrinterModule,
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
