import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
// import { applyMiddleware } from 'graphql-middleware';
// import { Context } from "graphql-ws";
// import { ApolloServerPluginInlineTrace, Context, PluginDefinition } from 'apollo-server-core';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
// import { GraphQLUpload } from 'graphql-upload';
import { GraphQLError, GraphQLFormattedError, print } from 'graphql';
import { join } from 'path';
import { GraphqlConfig, NestConfig } from "../config";


@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {

  constructor(
      private configService: ConfigService,
      // private prisma: PrismaService
  ) {}

  createGqlOptions(): ApolloDriverConfig {

    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    const nestjsConfig = this.configService.get<NestConfig>('nest');

    const schemaFilePath = nestjsConfig.isDevelopment ?
      graphqlConfig.schemaDestination :
      true
    ;

    return {
      cache: 'bounded',
      cors: true,
      introspection: nestjsConfig.isDevelopment,
      debug: graphqlConfig.debug, // !nestjsConfig.isDevelopment,
      playground: graphqlConfig.playgroundEnabled,
      // See: https://stackoverflow.com/a/61048144/122441
      autoSchemaFile: schemaFilePath,
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp'
      },
      context: ({ req }) => ({ req }),
      // subscriptions
      installSubscriptionHandlers: true,
      subscriptions: {
        // https://docs.nestjs.com/graphql/subscriptions#authentication-over-websockets
        // 'subscriptions-transport-ws': true,
        /*
        'graphql-ws': {
          onConnect: (context: Context<any>) => {
            const { connectionParams, extra } = context;
            extra.token = connectionParams.token;
          },
        },
        */
        'graphql-ws': true,
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          locations: error.locations,
          path: error.path,
          extensions: {
            code: error.extensions?.code,
            exception: {
              name:
                error.extensions?.exception?.name ||
                error.extensions?.exception?.type
            }
          }
        };
        return graphQLFormattedError;
      }
    };
  }
}
