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
  ) {}

  async getAllSmartItems(): Promise<SmartItem[]> {
    const smartItems = await this.smartItemRepo.find();
    return smartItems;
  }

  async deleteSmartItem(smartItem: SmartItem): Promise<SmartItem> {
    await this.smartItemRepo.delete(smartItem);

    return await this.smartItemRepo.findOne(smartItem.id);
  }

  async editSmartItem(smartItemDTO: EditSmartItemDto): Promise<SmartItem> {
    await this.smartItemRepo.update(smartItemDTO.id, {
      name: smartItemDTO.name,
      category: smartItemDTO.category,
      xPos: smartItemDTO.xPos,
      yPos: smartItemDTO.yPos,
    });

    return await this.smartItemRepo.findOne(smartItemDTO.id);
  }

  async createSmartItem(smartItemDTO: CreateSmartItemDto): Promise<SmartItem> {
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
