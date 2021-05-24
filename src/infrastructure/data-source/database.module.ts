import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryEntity } from './entities/category.entity';
import { LogMessageEntity } from './entities/log-message.entity';
import { UserEntity } from './entities/user.entity';
import { SmartItemEntity } from './entities/smartItem.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        url: configService.get('DATABASE_URL'),
        entities: [
          CategoryEntity,
          LogMessageEntity,
          UserEntity,
          SmartItemEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
