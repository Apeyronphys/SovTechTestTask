import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config' 
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): PostgresConnectionOptions => {
            const database = configService.get('DB_NAME')
            if (!database) {
                throw new Error('Enviroment varible cannot be defiened') 
            }

            return {
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database,
                entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
                synchronize: true,
            }
        }
    })],
})
export class PostgresModule {}