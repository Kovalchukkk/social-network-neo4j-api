import { ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j-config.interface';

export const createDatabaseConfig = (
  configService: ConfigService,
  config?: Neo4jConfig,
): Neo4jConfig =>
  config || {
    host: configService.get('DATABASE_HOST'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_PORT'),
    scheme: configService.get('DATABASE_SCHEME'),
    username: configService.get('DATABASE_USERNAME'),
  };

export class ConnectionError extends Error {
  public details: string;
  constructor(oldError: Error) {
    super();
    this.message = 'Connection with Neo4j database was not established';
    this.name = 'Connection Error';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
