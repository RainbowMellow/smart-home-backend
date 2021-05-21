import { Injectable } from '@nestjs/common';
import { SmartItem } from './smart-item.model';
import { Category } from '../../category/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartItemEntity } from '../../infrastructure/data-source/entities/smartItem.entity';
import { Repository } from 'typeorm';
import { CreateSmartItemDto } from '../../infrastructure/data-source/dtos/createSmartItem.dto';
import { EditSmartItemDto } from '../../infrastructure/data-source/dtos/editSmartItem.dto';

@Injectable()
export class SmartItemService {
  constructor(
    @InjectRepository(SmartItemEntity)
    private smartItemRepo: Repository<SmartItemEntity>,
  ) {
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

    this.smartItemRepo.create(item1);
    this.smartItemRepo.create(item2);
    this.smartItemRepo.create(item3);
    this.smartItemRepo.create(item4);
  }

  async getAllSmartItems() {
    const smartItems = await this.smartItemRepo.find();
    return smartItems;
  }

  async deleteSmartItem(smartItem: SmartItem) {
    const deletedSmartItem = await this.smartItemRepo.delete(smartItem);
    return deletedSmartItem;
  }

  async editSmartItem(smartItemDTO: EditSmartItemDto) {
    const updatedSmartItem = await this.smartItemRepo.update(smartItemDTO.id, {
      name: smartItemDTO.name,
      category: smartItemDTO.category,
      xPos: smartItemDTO.xPos,
      yPos: smartItemDTO.yPos,
    });

    return updatedSmartItem;
  }

  async createSmartItem(smartItemDTO: CreateSmartItemDto) {
    let newSmartItem = this.smartItemRepo.create();
    newSmartItem.name = smartItemDTO.name;
    newSmartItem.category = smartItemDTO.category;
    newSmartItem.on = smartItemDTO.on;
    newSmartItem.xPos = smartItemDTO.xPos;
    newSmartItem.yPos = smartItemDTO.yPos;
    newSmartItem = await this.smartItemRepo.save(newSmartItem);

    return newSmartItem;
  }
}
