import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateGameRequest,
  CreateGameResponse,
  GAMES_SERVICE_NAME,
  GamesServiceClient,
  GetGameResponse,
} from './games.pb';

@Controller('games')
export class GamesController implements OnModuleInit {
  private svc: GamesServiceClient;
  @Inject(GAMES_SERVICE_NAME)
  private readonly client: ClientGrpc;
  public onModuleInit(): void {
    this.svc = this.client.getService<GamesServiceClient>(GAMES_SERVICE_NAME);
  }
  @Post()
  //@UseGuards(AuthGuard)
  private async createGame(
    @Body() body: CreateGameRequest,
  ): Promise<Observable<CreateGameResponse>> {
    return this.svc.createGame(body);
  }
  @Get(':id')
  //@UseGuards(AuthGuard)
  private async getGame(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<GetGameResponse>> {
    return this.svc.getGame({ id });
  }
}
