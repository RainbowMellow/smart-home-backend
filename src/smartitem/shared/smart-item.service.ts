import { Injectable } from '@nestjs/common';
import { SmartItem } from './smart-item.model';
import { Category } from '../../category/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartItemEntity } from '../../infrastructure/data-source/entities/smartItem.entity';
import { Repository } from 'typeorm';
import { CreateSmartItemDto } from '../../infrastructure/data-source/dtos/createSmartItem.dto';
import { EditSmartItemDto } from '../../infrastructure/data-source/dtos/editSmartItem.dto';
import { ToggleDto } from '../../infrastructure/data-source/dtos/toggle.dto';

@Injectable()
export class SmartItemService {
  constructor(
    @InjectRepository(SmartItemEntity)
    private smartItemRepo: Repository<SmartItemEntity>,
  ) {}

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

  async toggleSmartItem(toggleDto: ToggleDto): Promise<ToggleDto> {
    await this.smartItemRepo.update(toggleDto.id, {
      on: toggleDto.on,
    });
    return toggleDto;
  }
}
