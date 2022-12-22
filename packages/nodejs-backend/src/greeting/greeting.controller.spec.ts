import { Test, TestingModule } from '@nestjs/testing';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';

describe('GreetingController', () => {
  let controller: GreetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingController],
      providers: [GreetingService],
    }).compile();

    controller = module.get<GreetingController>(GreetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
