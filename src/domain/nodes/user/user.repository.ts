import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { User, UserInput } from 'src/schema/graphql';

@Injectable()
export class UserRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createUser(userInput: UserInput): Promise<User> {
    const { name, age } = userInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `CREATE (user:User {name: "${name}", age: "${age}"}) 
    RETURN user`,
      )
      .run();

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

  async deleteUser(id: number): Promise<Boolean> {
    await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user:User) 
    WHERE ID(user) = ${id}
    DELETE user`,
      )
      .run();

    return true;
  }

  async getUser(id: number): Promise<User> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user:User) 
      WHERE ID(user) = ${id}
      RETURN user`,
      )
      .run();

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

  async updateUser(id: number, userInput: UserInput): Promise<User> {
    const { name, age } = userInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (user:User) 
      WHERE ID(user) = ${id}
      SET user.name = "${name}", user.age = "${age}"
      RETURN user`,
      )
      .run();

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
