import { Category } from '../../category/category.model';

export interface SmartItem {
  id?: number;
  name: string;
  category: Category;
  xPos: number;
  yPos: number;
  on: boolean;
}
