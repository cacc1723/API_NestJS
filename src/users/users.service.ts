import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {

private users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' },
];

  findAll() {
    return this.users;
  }

  findById(id: string) {
    const userIndex = this.findone(id);
    return this.users[userIndex];
  }

  create(userData: CreateUserDto) {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: string) {
    const userIndex = this.findone(id);
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }

  update(id: string, updatedData: UpdateUserDto) {
    const userIndex = this.findone(id);
    const user = this.users[userIndex];

    if (updatedData.email) {
      const emailExists = this.users.some(
        (u) => u.email === updatedData.email && u.id !== id,
      );
      if (emailExists) {
        return {
          message: 'Email already in use',
        };
      }
    }
    const updatedUser = { ...user, ...updatedData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  private findone(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return userIndex;
  }
}
