import { Module } from '@nestjs/common';
import { SmartItemModule } from './smartitem/smart-item.module';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './infrastructure/data-source/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    SmartItemModule,
    LogModule,
    UserModule,
    CategoryModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
