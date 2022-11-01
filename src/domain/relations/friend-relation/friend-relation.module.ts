import { Module } from '@nestjs/common';
import { FriendRelationService } from './friend-relation.service';

@Module({
  providers: [FriendRelationService]
})
export class FriendRelationModule {}
