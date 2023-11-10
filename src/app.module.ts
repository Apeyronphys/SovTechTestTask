import { Module } from '@nestjs/common';
import { InfrastructureModule } from './config/infrastructure.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    InfrastructureModule,
    CategoriesModule
  ],
})
export class AppModule {}
