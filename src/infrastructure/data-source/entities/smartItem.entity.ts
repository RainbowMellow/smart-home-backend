import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { Category } from '../../../category/category.model';
import { CategoryEntity } from './category.entity';

@Entity()
export class SmartItemEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn()
  public category: Category;

  @Column()
  public xPos: number;

  @Column()
  public yPos: number;

  @Column()
  public on: boolean;
}
