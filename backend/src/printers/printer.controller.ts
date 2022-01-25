import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Printer } from '../models/printer.entity';
import { CreatePrinterDto } from './dtos/createPrinter.dto';
import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {

    constructor(private printerService : PrinterService) {}

    @Get()
    async getAll() : Promise<Printer[]> {
        return await this.printerService.getAll();
    }

    @Get(':id')
    async getOneById(@Param('id') id: string) : Promise<Printer> {
        return await this.printerService.getOneById(id);
    }

    @Post()
    async createPrinter(@Body() dto : CreatePrinterDto) : Promise<Printer> {
        return await this.printerService.addPrinter(dto);
    }

    @Put(':id')
    async updatePrinter(@Param('id') id : string, @Body() dto : CreatePrinterDto) : Promise<Printer> {
        return await this.printerService.updatePrinter(id, dto);
    }

    @Delete(':id')
    async deletePrinter(@Param('id') id : string) : Promise<Printer> {
        return await this.printerService.deletePrinter(id);
    }
}