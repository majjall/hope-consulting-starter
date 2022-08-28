export interface Config {
  nest: NestConfig;
  graphql?: GraphqlConfig;
  [key: string]: any;
}

export interface NestConfig {
  port?: number;
  isDevelopment?: boolean;
  apiPath: string;
  [key: string]: string|number|boolean;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  tag?: string;
}

export interface GraphqlConfig { // GqlModuleOptions
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

