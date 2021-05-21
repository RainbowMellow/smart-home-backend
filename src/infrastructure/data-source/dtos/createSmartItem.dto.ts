import { Category } from '../../../category/category.model';

export interface CreateSmartItemDto {
  name: string;
  category?: Category;
  xPos: number;
  yPos: number;
  on: boolean;
}
