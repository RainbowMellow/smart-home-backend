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
    const cat4: Category = {
      id: 4,
      name: 'Switch',
    };

    const item1: SmartItem = {
      id: 1,
      name: 'Bedroom lamp',
      category: cat1,
      xPos: 10,
      yPos: 10,
      on: false,
    };
    const item2: SmartItem = {
      id: 2,
      name: 'Kitchen oven',
      category: cat2,
      xPos: 100,
      yPos: 100,
      on: true,
    };
    const item3: SmartItem = {
      id: 3,
      name: 'Living room thermostat',
      category: cat3,
      xPos: 200,
      yPos: 150,
      on: false,
    };
    const item4: SmartItem = {
      id: 3,
      name: 'Switch',
      category: cat4,
      xPos: 250,
      yPos: 100,
      on: false,
    };
    this.smartItems.push(item1);
    this.smartItems.push(item2);
    this.smartItems.push(item3);
    this.smartItems.push(item4);
  }

  getAllSmartItems(): SmartItem[] {
    return this.smartItems;
  }

  deleteSmartItem(smartItem: SmartItem): SmartItem {
    this.smartItems.filter((s) => s.id !== smartItem.id);
    return smartItem;
  }

  editSmartItem(smartItem: SmartItem): SmartItem {
    const index = this.smartItems.findIndex((s) => s.id === smartItem.id);
    this.smartItems[index] = smartItem;
    return smartItem;
  }
}
