import { ApiProperty } from '@nestjs/swagger';

export class ISearchParams {
  @ApiProperty({ name: '위도', readOnly: false })
  lat: number;

  @ApiProperty({ name: '경도', readOnly: false })
  lng: number;

  @ApiProperty({ name: '검색할 범위 (단위: m)', readOnly: false })
  distance: number;
}
