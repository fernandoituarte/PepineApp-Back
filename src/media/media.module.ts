import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Media]), ConfigModule, AuthModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [TypeOrmModule],
})
export class MediaModule {}
