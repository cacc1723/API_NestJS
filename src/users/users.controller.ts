import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  FindUsers(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() newUserData: CreateUserDto) {
    return this.usersService.create(newUserData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUserData: UpdateUserDto) {
    return this.usersService.update(id, updatedUserData);
  }
}
