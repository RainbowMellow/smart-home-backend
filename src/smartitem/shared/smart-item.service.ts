import { Injectable } from '@nestjs/common';
import { SmartItem } from './smart-item.model';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartItemEntity } from '../../infrastructure/data-source/entities/smartItem.entity';
import { Repository } from 'typeorm';
import { CreateSmartItemDto } from '../../infrastructure/data-source/dtos/createSmartItem.dto';
import { EditSmartItemDto } from '../../infrastructure/data-source/dtos/editSmartItem.dto';
import { ToggleSmartItemDto } from '../../infrastructure/data-source/dtos/toggleSmartItem.dto';

@Injectable()
export class SmartItemService {
  constructor(
    @InjectRepository(SmartItemEntity)
    private smartItemRepo: Repository<SmartItemEntity>,
  ) {}

  async getAllSmartItems(): Promise<SmartItem[]> {
    return await this.smartItemRepo.find({
      where: { active: true },
      relations: ['category'],
    });
  }

  async deleteSmartItem(id: number): Promise<void> {
    await this.smartItemRepo.update(id, {
      active: false,
    });
  }

  async editSmartItem(smartItemDTO: EditSmartItemDto): Promise<SmartItem> {
    await this.smartItemRepo.update(smartItemDTO.id, {
      name: smartItemDTO.name,
      category: smartItemDTO.category,
      xPos: smartItemDTO.xPos,
      yPos: smartItemDTO.yPos,
    });

    return await this.smartItemRepo.findOne(smartItemDTO.id, {
      relations: ['category'],
    });
  }

  async createSmartItem(smartItemDTO: CreateSmartItemDto): Promise<SmartItem> {
    let newSmartItem = this.smartItemRepo.create();
    newSmartItem.name = smartItemDTO.name;
    newSmartItem.category = smartItemDTO.category;
    newSmartItem.on = false;
    newSmartItem.xPos = smartItemDTO.xPos;
    newSmartItem.yPos = smartItemDTO.yPos;
    newSmartItem.active = true;
    newSmartItem = await this.smartItemRepo.save(newSmartItem);

    return newSmartItem;
  }

  async toggleSmartItem(
    toggleSmartItemDTO: ToggleSmartItemDto,
  ): Promise<ToggleSmartItemDto> {
    await this.smartItemRepo.update(toggleSmartItemDTO.id, {
      on: toggleSmartItemDTO.on,
    });

    return toggleSmartItemDTO;
  }
}
