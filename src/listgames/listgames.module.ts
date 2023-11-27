import { Module } from '@nestjs/common';
import { ListgamesController } from './listgames.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  LISTGAMES_PACKAGE_NAME,
  LIST_GAMES_SERVICE_NAME,
} from './listgames.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: LIST_GAMES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: LISTGAMES_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/listgames.proto',
        },
      },
    ]),
  ],
  controllers: [ListgamesController],
})
export class ListgamesModule {}
