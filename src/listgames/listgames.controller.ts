import {
  Controller,
  OnModuleInit,
  Post,
  UseGuards,
  Inject,
} from '@nestjs/common';
import {
  CreateListGamesRequest,
  CreateListGamesResponse,
  LIST_GAMES_SERVICE_NAME,
  ListGamesClient,
} from './listgames.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '../auth/auth.guard';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Controller('listgames')
export class ListgamesController implements OnModuleInit {
  private svc: ListGamesClient;

  constructor(
    @Inject(LIST_GAMES_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  public onModuleInit() {
    this.svc = this.client.getService<ListGamesClient>(LIST_GAMES_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async CreateListGames(
    @Req() req: Request,
  ): Promise<Observable<CreateListGamesResponse>> {
    const body: CreateListGamesRequest = req.body;
    body.userId = req['userId'];
    return this.svc.createListGames(body);
  }
}
