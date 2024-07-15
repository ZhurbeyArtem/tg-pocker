import { Controller, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '@lib/exception';
import { ClubService } from './club.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GenerateLinkDto } from './dtos/GenerateLink.dto';

@Controller()
@UseFilters(AllExceptionsFilter)
export class ClubController {
  constructor(private clubService: ClubService) { }

  @MessagePattern('createClub')
  async create(@Payload() data) {
    return this.clubService.createClub(data);
  }

  @MessagePattern('getAllClubs')
  async getAll(@Payload() data) {
    return this.clubService.getClubs(data);
  }

  @MessagePattern('getClub')
  async getOne(@Payload() param) {
    return this.clubService.getClubParam(param);
  }

  @MessagePattern('joinClub')
  async joinClub(@Payload() param) {
    return this.clubService.joinClub(param);
  }

  @MessagePattern('getBanOrKickList')
  async getList(@Payload() param) {
    return this.clubService.getBanOrKickList(param);
  }

  @MessagePattern('banOrKick')
  async banOrKickUser(@Payload() param) {
    return this.clubService.banOrKick(param);
  }

  @MessagePattern('getClubSettings')
  async getClubSettings(@Payload() param) {
    return this.clubService.getClubSettings(param);
  }

  @MessagePattern('changeClubSettings')
  async changeClubSettings(@Payload() data) {
    return this.clubService.changeClubSettings(data);
  }

  @MessagePattern('getAllClubMembers')
  async getAllClubMembers(@Payload() data) {
    return this.clubService.getAllClubMembers(data);
  }

  @MessagePattern('clubGenerateInvitationLink')
  async generateInviteLink(@Payload() data: GenerateLinkDto) {
    return this.clubService.generateInviteLink(data);
  }

  @MessagePattern('clubJoinByLink')
  async joinByLink(@Payload() data) {
    return this.clubService.joinByLink(data);
  }

  @MessagePattern('clubRemoveLink')
  async removeLink(@Payload() data) {
    return this.clubService.removeLink(data);
  }
}
