import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PostgresModule,
  ],
})
export class InfrastructureModule {}
