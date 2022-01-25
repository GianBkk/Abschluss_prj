// item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Printer } from './printer.entity';

@Entity({ name: 'data' })
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column({ type: 'varchar', length: 300 })
  drawer1: string;

  @Column({ type: 'varchar', length: 300 })
  drawer2: string;

  @Column({ type: 'varchar', length: 300 })
  lcf1: string;

  @Column({ type: 'varchar', length: 300 })
  lcf2: string;

  @CreateDateColumn()
  created_at: Date;
    
  @UpdateDateColumn()
  updated_at: Date;

  @Column({})
  printerid: string;

  @ManyToOne(() => Printer, printer => printer.data, {onDelete: 'CASCADE'})
  printer : Printer;
}