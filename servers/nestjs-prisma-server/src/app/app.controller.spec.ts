import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Chance } from "chance";

const chance = new Chance();

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  //beforeEach(async () => {
  beforeAll(async () => {
      // const app: TestingModule
      app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
      // expect(appController.getData()).toEqual({ message: "Welcome to nestjs-graphql!" });
    });
  });

  describe('hello/:name', () => {
    it('should return "Hello ${name}!"', () => {
      const name = chance.name();
      expect(appController.sayHelloName(name)).toBe(`Hello ${name}!`);
    });
  });
});
