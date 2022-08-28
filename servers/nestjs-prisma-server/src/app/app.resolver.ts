import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { Inject } from '@nestjs/common';
// import { PubSubEngine } from 'graphql-subscriptions';

@Resolver()
export class AppResolver {

  // TODO: Use AppService...
  // constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!';
  }
  @Query(() => String)
  sayHello(@Args('name') name: string): string {
    return `Hello ${name}!`;
  }
}
