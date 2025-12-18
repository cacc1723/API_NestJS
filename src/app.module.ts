import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'blog_user',
      password: 'blog_password',
      database: 'my_blog_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
