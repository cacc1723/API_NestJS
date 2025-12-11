import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' },
  ];

  @Get()
  getAllUsers() {
    return this.users;
  }

  @Get(':id')
  FindUsers(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() newUserData: CreateUserDto) {
    const newUser = {
      ...newUserData,
      id: (this.users.length + 1).toString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return { message: 'User deleted successfully', user: deletedUser };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUserData: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = this.users[userIndex];
    if (updatedUserData.email) {
      const emailExists = this.users.some(
        (u) => u.email === updatedUserData.email && u.id !== id,
      );
      if (emailExists) {
        return {
          message: 'Email already in use',
        };
      }
    }

    this.users[userIndex] = {
      ...user,
      ...updatedUserData,
    };
    return this.users[userIndex];
  }


}
