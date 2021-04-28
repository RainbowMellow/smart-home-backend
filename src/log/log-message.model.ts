import { SmartItem } from '../smartitem/shared/smart-item.model';

export interface LogMessage {
  id?: number;
  message: string;
  item: SmartItem;
  user?: string;
  timeStamp: Date;
}
