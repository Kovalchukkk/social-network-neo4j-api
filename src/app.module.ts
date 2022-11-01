import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserModule } from './domain/nodes/user/user.module';
import { FriendRelationModule } from './domain/relations/friend-relation/friend-relation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    Neo4jModule.forRoot(),
    UserModule,
    FriendRelationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
