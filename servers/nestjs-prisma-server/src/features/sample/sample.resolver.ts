import { Args, Context, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SampleService } from "./sample.service";

@Resolver()
export class SampleResolver {

  constructor(private readonly service: SampleService) {}

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }

}

