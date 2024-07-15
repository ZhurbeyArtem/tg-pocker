import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UploadFilesService } from '@lib/upload-files';
import { Access, RolesGuard, AuthGuard } from '@lib/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateClubDto } from './dtos/CreateClub.dto';
import { GetAllClubsDto } from './dtos/GetAllClubs.dto';
import { lastValueFrom } from 'rxjs';
import {
  JoinToClubBodyDto,
  JoinToClubByLinkDto,
  JoinToClubParamDto,
} from './dtos/JoinToClub.dto';
import { BanOrKickDto } from './dtos/BanOrKick.dto';
import { ChangeClubSettingsDto } from './dtos/ChangeClubSettings.dto';
import { GenerateLinkDto } from './dtos/GenerateLink.dto';

@Controller('club')
export class ClubController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private fileService: UploadFilesService,
  ) { }
  c;
  @Access({ roles: ['admin'], lvl: 2, rank: 1 })
  @UseGuards(RolesGuard, AuthGuard)
  @Delete('/:id')
  delete(@Param() id: string) {
    return this.natsClient.send('deleteClub', id);
  }

  @Get('/all')
  getAllClubs(@Query() query: GetAllClubsDto) {
    return this.natsClient.send('getAllClubs', query);
  }

  @Get('/:id')
  getClub(@Param() id: string) {
    return this.natsClient.send('getClub', id);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createClubDto: CreateClubDto,
    @UploadedFile() file,
    @Request() req,
  ) {
    try {
      const observable = this.natsClient.send('getClub', {
        name: createClubDto.name,
        type: 'create',
      });
      const club = await lastValueFrom(observable);
      if (club) {
        throw new ConflictException('Club with this name already exists');
      }
      if (file) {
        const fileUrl = await this.fileService.uploadFile(
          `club-${createClubDto.name}.${file.originalname.split('.')[1]}`,
          file.buffer,
          file.mimetype,
        );
        createClubDto.img = fileUrl;
      }
      return this.natsClient.send('createClub', {
        createClubDto,
        user: req.user,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/join/:club')
  joinClub(
    @Param() param: JoinToClubParamDto,
    @Request() req,
    @Body() body: JoinToClubBodyDto,
  ) {
    return this.natsClient.send('joinClub', {
      ...param,
      user: req.user.userId,
      ...body,
    });
  }

  @Access({
    roles: ['clubAdmin', ' admin', 'clubModer'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Get('/list/:id')
  getList(@Param() id, @Query() query) {
    return this.natsClient.send('getBanOrKickList', {
      clubId: id.id,
      ...query,
    });
  }

  @Access({
    roles: ['clubAdmin', 'clubModer', 'admin'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Post('/list/:id')
  banOrKick(@Param() id, @Body() body: BanOrKickDto, @Request() req) {
    body.club = id.id;
    body.bannedBy = req.user.userId;
    return this.natsClient.send('banOrKick', body);
  }

  @Access({
    roles: ['clubAdmin', 'clubModer', 'admin'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Get('/settings/:id')
  getClubSettings(@Param() id) {
    return this.natsClient.send('getClubSettings', id);
  }

  @Access({
    roles: ['clubAdmin', 'clubModer', 'admin'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Put('/settings/:id')
  changeClubSettings(@Param() id, @Body() body: ChangeClubSettingsDto) {
    return this.natsClient.send('changeClubSettings', { ...id, ...body });
  }

  @Access({
    roles: ['clubAdmin', 'clubModer', 'admin'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Get('/members/:id')
  getAllClubMembers(@Param() id) {
    return this.natsClient.send('getAllClubMembers', id);
  }

  @Access({
    roles: ['clubAdmin', 'clubModer', 'admin'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Post('/link')
  clubGenerateInvitationLink(@Body() body: GenerateLinkDto, @Request() req) {
    return this.natsClient.send('clubGenerateInvitationLink', {
      ...body,
      createdBy: req.user.userId,
    });
  }


  @UseGuards(AuthGuard)
  @Get('/link/:token')
  clubJoinByLink(@Param() token: JoinToClubByLinkDto, @Request() req) {
    return this.natsClient.send('clubJoinByLink', {
      ...token,
      user: req.user.userId,
    });
  }

  @Access({
    roles: ['clubAdmin', 'clubModer', 'admin'],
    lvl: 1,
    rank: 1,
  })
  @UseGuards(RolesGuard, AuthGuard)
  @Delete('/link/:code')
  clubRemoveLink(@Param() code) {
    return this.natsClient.send('clubRemoveLink', code);
  }
}
