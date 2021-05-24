import { Module } from '@nestjs/common';
import { CategoryGateway } from './category.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../infrastructure/data-source/entities/category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryGateway],
})
export class CategoryModule {}
