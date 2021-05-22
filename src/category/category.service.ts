import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../infrastructure/data-source/entities/category.entity';
import { Repository } from 'typeorm';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }
}
