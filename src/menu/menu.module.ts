import { MenuSchema } from './schemas/menu.schema';
import { Module } from '@nestjs/common';
import { MenuService } from './services/menu.service';
import { MenuResolver } from './resolvers/menu.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }])],
  providers: [MenuService, MenuResolver],
})
export class MenuModule {}
