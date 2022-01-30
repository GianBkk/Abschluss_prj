// printer.service.ts 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Printer } from '../models/printer.entity';
import { Repository } from 'typeorm';
import { CreatePrinterDto } from './dtos/createPrinter.dto';
import { DataService } from '../data/data.service';


@Injectable()
export class PrinterService {
    constructor(@InjectRepository(Printer) private printerRepo: Repository<Printer>,
        private dataservice: DataService) {}

    async getAll(): Promise<Printer[]> {
        return await this.printerRepo.find();
    }

    async getOneById(id : string) : Promise<Printer> {
        try {
            return await this.printerRepo.findOneOrFail(id);
        } catch (error) {
            return error;
        }
    }


    async addPrinter(dto: CreatePrinterDto) : Promise<Printer> {
        try {
            const newPrinter = await this.printerRepo.create(dto);
            const prt = await this.printerRepo.save(newPrinter);
            this.dataservice.handleCron();
            return prt
        } catch (error) {
            return error;
        }  
    }

    async updatePrinter(id: string, dto : CreatePrinterDto) : Promise<Printer> {
        try {
            const updatePrinter = await this.getOneById(id);
            updatePrinter.name = dto.name;
            updatePrinter.ip = dto.ip;
            updatePrinter.model = dto.model;
            return this.printerRepo.save(updatePrinter);
        } catch (error) {
           return error ;
        }
    }

    async deletePrinter(id: string): Promise<Printer> {
        try {
            const removePrinter = await this.getOneById(id)
            return this.printerRepo.remove(removePrinter);
        } catch (error) {
            return error;
        }
    }



}