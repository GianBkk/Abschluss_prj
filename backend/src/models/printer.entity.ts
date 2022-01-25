// item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Data } from './data.entity';


@Entity({ name: 'printer' })
export class Printer {
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column({ type: 'varchar', length: 300, default: 'Printer' })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  ip: string;

  @Column({ type: 'varchar', length: 300, default: 'toshiba' })
  model: string;

  @CreateDateColumn()
  created_at: Date;
    
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Data, info => info.printer)
  data : Data[];


}