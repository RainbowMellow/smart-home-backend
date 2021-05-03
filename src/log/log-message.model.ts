import { SmartItem } from '../smartitem/shared/smart-item.model';
import { User } from '../user/user.model';

export interface LogMessage {
  id?: number;
  message: string;
  item?: SmartItem;
  user?: User;
  timeStamp: Date;
}
