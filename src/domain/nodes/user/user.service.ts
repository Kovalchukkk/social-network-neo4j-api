import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/neo4j.service';
import { User } from 'src/schema/graphql';

@Injectable()
export class UserService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async getUser(name: string): Promise<User> {
    const query = await this.queryRepository
      .initQuery()
      .raw(`MATCH (user: User) WHERE user.name = "${name}" RETURN user`)
      .run();
    console.log(query);
    if (query?.length > 0) {
      const {
        user: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }
}
