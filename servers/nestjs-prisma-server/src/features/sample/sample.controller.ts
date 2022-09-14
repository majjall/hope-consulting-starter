import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { SampleService } from "./sample.service";

@Controller()
export class SampleController {

  constructor(private readonly service: SampleService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }

}

