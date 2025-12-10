import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';

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
      return {
        message: 'User not found',
      };
  };
     return user;
  }

  @Post()
  createUser(@Body() newUserData: { name: string; email: string }) {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: newUserData.name,
      email: newUserData.email,
    };
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return {
        message: 'User not found',
      };
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return { message: 'User deleted successfully', user: deletedUser };
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedUserData: { name?: string; email?: string },
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return {
        message: 'User not found',
      };
    }
    const user = this.users[userIndex];
    this.users[userIndex] = {
      ...user,
      ...updatedUserData,
    };
    return this.users[userIndex];
  }
}
