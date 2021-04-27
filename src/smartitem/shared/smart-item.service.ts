import { Injectable } from '@nestjs/common';
import { SmartItem } from './smart-item.model';

@Injectable()
export class SmartItemService {
  smartItems: SmartItem[] = [];

  constructor() {
    this.seedData();
  }

  seedData(): void {
    const item1: SmartItem = {
      id: 1,
      name: 'HP Lamp',
      xPos: 1,
      yPos: 1,
      on: false,
    };
    const item2: SmartItem = {
      id: 2,
      name: 'Bedroom Lamp',
      xPos: 2,
      yPos: 2,
      on: true,
    };
    const item3: SmartItem = {
      id: 3,
      name: 'Dining Room Lamp',
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
