import { Test, TestingModule } from '@nestjs/testing';
import { GreetingService } from './greeting.service';

describe('GreetingService', () => {
  let service: GreetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreetingService],
    }).compile();

    service = module.get<GreetingService>(GreetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
