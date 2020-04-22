import { Test, TestingModule } from '@nestjs/testing';
import { GmoneyService } from './gmoney.service';

describe('GmoneyService', () => {
  let service: GmoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GmoneyService],
    }).compile();

    service = module.get<GmoneyService>(GmoneyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
