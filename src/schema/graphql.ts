
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class User {
    id: number;
    name: string;
    age?: Nullable<number>;
}

export abstract class IQuery {
    abstract helloWorld(): Nullable<string> | Promise<Nullable<string>>;

    abstract getUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(userInput: UserInput): User | Promise<User>;

    abstract updateUser(id: number, UserInput: UserInput): User | Promise<User>;

    abstract deleteUser(id: number): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
