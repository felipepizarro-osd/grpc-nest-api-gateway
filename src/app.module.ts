import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { ListgamesModule } from './listgames/listgames.module';

@Module({
  imports: [AuthModule, GamesModule, ListgamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
