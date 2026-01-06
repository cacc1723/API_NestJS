import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
     private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.findone(id);
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.save(userData);
    return newUser;
  }

  async delete(id: number) {
    const user = await this.findone(id);
    await this.usersRepository.remove(user);
    return { message: `User with id ${id} has been deleted` };
  }

  async update(id: number, updatedData: UpdateUserDto) {
    const user = await this.findone(id);
    const updatedUser = this.usersRepository.merge(user, updatedData);
    return this.usersRepository.save(updatedUser);
  }

  private async findone(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
