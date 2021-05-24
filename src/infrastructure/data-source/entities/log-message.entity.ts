import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SmartItemEntity } from './smartItem.entity';
import { SmartItem } from '../../../smartitem/shared/smart-item.model';

@Entity()
export class LogMessageEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public message: string;

  @ManyToOne(() => SmartItemEntity)
  @JoinColumn()
  public item?: SmartItem;

  @Column()
  public userString: string;

  @Column()
  public timeStamp: Date;
}
