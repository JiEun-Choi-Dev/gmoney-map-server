import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ISearchParams } from './shop-api.dto';
import { ShopService } from './shop.service';
import { Request } from 'express';

@Controller('v')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @ApiOperation({
    summary: '키워드 근처 의 상점을 찾습니다.',
  })
  @ApiQuery({
    name: 'lat',
    type: 'number',
    description: '위도',
    example: 37.5184989,
  })
  @ApiQuery({
    name: 'lng',
    type: 'number',
    description: '경도',
    example: 126.798372,
  })
  @ApiQuery({
    name: 'distance',
    type: 'number',
    description: '검색 할 범위 (단위 m)',
    example: 500,
  })
  @Get('search')
  search(@Req() req: Request) {
    const { lat, lng, distance }: any = req.query;
    const search: ISearchParams = {
      lat: Number(lat),
      lng: Number(lng),
      distance: Number(distance),
    };

    return this.shopService.findAll(search);
  }
}
