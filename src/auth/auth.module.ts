import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './../user/services/user.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserEntity } from './../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, AuthResolver],
})
export class AuthModule {}
