import { Test, TestingModule } from '@nestjs/testing';
import { {nomDuControleurController } from './{nom-du-controleur.controller';

describe('{nomDuControleurController', () => {
  let controller: {nomDuControleurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [{nomDuControleurController],
    }).compile();

    controller = module.get<{nomDuControleurController>({nomDuControleurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
