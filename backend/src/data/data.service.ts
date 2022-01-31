// data.service.ts 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from '../models/data.entity';
import { Printer } from '../models/printer.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { Mib, SwitchMib } from './dtos/mib';
var snmp = require('snmp-native');
const merge = require('deepmerge')

@Injectable()
export class DataService {
    constructor(@InjectRepository(Printer) private printerRepo: Repository<Printer>, 
                @InjectRepository(Data) private dataRepo: Repository<Data>) {}


    async getAllByPrinterDESC(printerId: string): Promise<Data[]> {
        try {
            return await this.dataRepo.createQueryBuilder("data").where("data.printerid = :id", { id :printerId }).orderBy("data.created_at", "DESC").getMany();
        } catch (error) {
            return error;
        }
    }

    async getAllWithPrinter(): Promise<Data[]> {
        try {
            let data = []
            let printer = await this.printerRepo.find();
            for (let index = 0; index < printer.length; index++) {
                let obj = printer[index];
                let infoObj = await this.getOneByPrinter(printer[index].id);
                if(infoObj){
                    const output = merge(obj, infoObj);
                    data.push(output)
                } 
            }
            return data
        } catch (error) {
            return error;
        }
    }

    async getOneByPrinter(printerId: string) : Promise<Data> {
        try {
            return await this.dataRepo.createQueryBuilder("data")
                .where("data.printerid = :id", { id : printerId })
                .orderBy("data.created_at", "DESC")
                .getOne();
        } catch (error) {
            return error;
        }
    }

    async getAllData() : Promise<Data[]> {
        try {
            let data = []
            let printer = await this.printerRepo.find();
            for (let index = 0; index < printer.length; index++) {
                let info = await this.getOneByPrinter(printer[index].id);
                data.push(info)
            }
            return data
        } catch (error) {
            return error;
        }
    }




    // */10 6-19 * * 1-5
    @Cron('*/5 6-19 * * *')
    async handleCron() {
        let printer = await this.printerRepo.find();
        for (let index = 0; index < printer.length; index++) {
            const element = printer[index];
            console.log(`Get data from ${element.model} with IP:${element.ip}`)
            var upload = this.dataRepo

            let session = new snmp.Session({ host: element.ip, port: 161, community: 'public' });
        
            session.getAll({oids : SwitchMib} , function(error, varbinds,) {
                let drawer1 = varbinds[0].value;
                let drawer2 = varbinds[1].value;
                let lcf1 = varbinds[2].value;
                let lcf2 = varbinds[3].value;
            
                let data = upload.create([{drawer1: drawer1, drawer2: drawer2, lcf1: lcf1, lcf2: lcf2, printerid: element.id}])
                upload.save(data)
            })
        }
  }
  //0 19 * * 7
  @Cron('*/30 * * * *')
    async deleteData() : Promise<Data[]>{
        try {
            const data = await this.dataRepo.find();
            return this.dataRepo.remove(data);
        } catch (error) {
            return error
        }
        
  }





}