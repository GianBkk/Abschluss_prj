import { Controller, Get, Param} from '@nestjs/common';
import { Data } from 'src/models/data.entity';
import { DataService } from './data.service';


@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Get('/desc/:id')
    async getAllByPrinterDESC(@Param('id') printerId : string): Promise<Data[]> {
        return await this.dataService.getAllByPrinterDESC(printerId);
    }

    @Get('/all/:id')
    async getAllByPrinterASC(@Param('id') printerId : string): Promise<Data[]> {
        return await this.dataService.getAllByPrinterASC(printerId);
    }

    @Get(':id')
    async getOneByPrinter(@Param('id') printerId : string): Promise<Data> {
        return await this.dataService.getOneByPrinter(printerId);
    }

    @Get()
    async getAll(): Promise<Data[]> {
        return await this.dataService.getAllData();
    }

}