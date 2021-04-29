import { Injectable } from '@nestjs/common';
import { SmartItem } from './smart-item.model';
import { Category } from './category.model';

@Injectable()
export class SmartItemService {
  smartItems: SmartItem[] = [];

  constructor() {
    this.seedData();
  }

  seedData(): void {
    const cat1: Category = {
      id: 1,
      name: 'Lamp',
    };
    const cat2: Category = {
      id: 2,
      name: 'Oven',
    };
    const cat3: Category = {
      id: 3,
      name: 'Thermostat',
    };

    const item1: SmartItem = {
      id: 1,
      name: 'Bedroom lamp',
      category: cat1,
      xPos: 1,
      yPos: 1,
      on: false,
    };
    const item2: SmartItem = {
      id: 2,
      name: 'Kitchen oven',
      category: cat2,
      xPos: 2,
      yPos: 2,
      on: true,
    };
    const item3: SmartItem = {
      id: 3,
      name: 'Living room thermostat',
      category: cat3,
      xPos: 3,
      yPos: 3,
      on: false,
    };
    this.smartItems.push(item1);
    this.smartItems.push(item2);
    this.smartItems.push(item3);
  }

  getAllSmartItems(): SmartItem[] {
    return this.smartItems;
  }
}
