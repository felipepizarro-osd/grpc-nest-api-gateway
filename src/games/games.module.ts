import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GAMES_PACKAGE_NAME, GAMES_SERVICE_NAME } from './games.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GAMES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: GAMES_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/games.proto',
        },
      },
    ]),
  ],
  controllers: [GamesController],
})
export class GamesModule {}
