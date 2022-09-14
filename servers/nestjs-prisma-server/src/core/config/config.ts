import type { Config } from './config.interface';

// export default (): Config => config;
// export const configuration = (): Config => ({});
// export const configuration = (): Config => (config);
export const configuration = (): Config => {
  const config: Config = {
    NODE_ENV: process.env.NODE_ENV,
    nest: {
      port: Number(process.env.PORT) || 3000, // parseInt(process.env.PORT, 10),
      isDevelopment: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === '',
      apiPath: process.env.API_PATH || 'api',
      // prefix: 'api',
      // host: process.env.HOST,
    },
    cors: {
      enabled: Boolean(process.env.CORS_ENABLED),
    },
    swagger: {
      enabled: Boolean(process.env.SWAGGER_ENABLED),
      title: process.env.SWAGGER_TITLE || 'Nestjs API Documentation',
      description: process.env.SWAGGER_DESCRIPTION || 'The NestJs API description',
      version: process.env.SWAGGER_VERSION || '1.0.0',
      path: process.env.SWAGGER_PATH || 'api/docs',
      tag: 'REST api',
    },

    // Graphql
    graphql: {
      playgroundEnabled: Boolean(process.env.GRAPHQL_PLAYGROUND),
      debug: Boolean(process.env.GRAPHQL_DEBUG),
      schemaDestination: process.env.GRAPHQL_CODE_FIRST_SCHEMA_DESTINATION,
      sortSchema: Boolean(process.env.GRAPHQL_SORT_SCHEMA),
      // uploads: {
      //   maxFileSize: 20_000_000, // 20 MB
      //   maxFiles: 5
      // },
      // tracing: false,
    },

    security: {
      access_secret: process.env.JWT_ACCESS_SECRET || 'nestjsPrismaAccessSecret',
      refresh_secret: process.env.JWT_REFRESH_SECRET || 'nestjsPrismaRefreshSecret',
      expiresIn: process.env.JWT_EXPIRE_IN || '2m',
      refreshIn: process.env.JWT_REFRESH_IN || '7d',
      bcryptSaltOrRound: process.env.JWT_SALT || 10,
    },
  };
  // console.log(JSON.stringify(config));
  return config;
};

