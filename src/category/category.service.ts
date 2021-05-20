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

  async readAllCategories() {
    const categoryList = await this.categoryRepo.find();
    const categories: Category[] = JSON.parse(JSON.stringify(categoryList));

    return categories;
  }
}
