import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'cypher-query-builder';
import { Driver } from 'neo4j-driver';
import {
  ConnectionWithDriver,
  Neo4jConfig,
} from 'src/neo4j/neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';
import { QueryRepository } from './neo4j.service';
import { ConnectionError, createDatabaseConfig } from './neo4j.util';

@Module({})
export class Neo4jModule {
  static forRoot(config?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        QueryRepository,
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            createDatabaseConfig(configService, config),
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            try {
              const { host, scheme, port, username, password } = config;
              const connection = new Connection(`${scheme}://${host}:${port}`, {
                username,
                password,
              }) as ConnectionWithDriver;

              await (connection.driver as Driver).verifyConnectivity();
              console.log('Success');
              return connection;
            } catch (error) {
              throw new ConnectionError(error);
            }
          },
        },
      ],
      exports: [QueryRepository],
    };
  }
}
