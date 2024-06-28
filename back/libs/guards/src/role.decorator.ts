import { SetMetadata } from '@nestjs/common'

export const ACCESS_KEY = {
  ROLES_KEY: 'roles',
  LVL_KEY: 'lvl',
  RANK_KEY: 'rank'
};

export const Access = (access: {
  role: string,
  lvl: number,
  rank: number
}) => SetMetadata(ACCESS_KEY, access)