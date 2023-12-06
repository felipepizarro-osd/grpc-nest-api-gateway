import {
  Controller,
  OnModuleInit,
  Post,
  UseGuards,
  Inject,
  Delete,
  Get,
} from '@nestjs/common';
import {
  AddGamesToListRequest,
  CreateListGamesRequest,
  CreateListGamesResponse,
  LIST_GAMES_SERVICE_NAME,
  ListGamesClient,
  AddGamesToListResponse,
  GetGamesInListResponse,
  GetGamesInListRequest,
  DeleteGameFromListResponse,
  DeleteGameFromListRequest,
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

  @Post('Create')
  //@UseGuards(AuthGuard)
  private async CreateListGames(
    @Req() req: Request,
  ): Promise<Observable<CreateListGamesResponse>> {
    const body: CreateListGamesRequest = req.body;
    console.log(req.body);
    return this.svc.createListGames(body);
  }

  @Post('AddGame')
  //@UseGuards(AuthGuard)
  private async AddGameToList(
    @Req() req: Request,
  ): Promise<Observable<AddGamesToListResponse>> {
    const body: AddGamesToListRequest = req.body;
    console.log(body);
    return this.svc.addGamesToList(body);
  }
  @Delete('DeletelistGame')
  //@UseGuards(AuthGuard)
  private async DeleteGameFromList(
    @Req() req: Request,
  ): Promise<Observable<DeleteGameFromListResponse>> {
    const body: DeleteGameFromListRequest = req.body;
    console.log(body);
    return this.svc.deleteGameFromList(body);
  }
  @Get('GetGames')
  //@UseGuards(AuthGuard)
  private async GetGamesInList(
    @Req() req: Request,
  ): Promise<Observable<GetGamesInListResponse>> {
    const body: GetGamesInListRequest = req.body;
    console.log(body);
    return this.svc.getGamesInList(body);
  }
}
