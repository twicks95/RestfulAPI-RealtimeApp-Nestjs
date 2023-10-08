import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PostgresProvider } from 'src/database/postgres/postgres.provider';

@Injectable()
export class UserService {
  private userRepository: any;
  constructor(private readonly postgresProvider: PostgresProvider) {
    this.userRepository = new UserRepository(this.postgresProvider, 'users');
  }

  async getAll(): Promise<any> {
    const result = await this.userRepository.getAll();
    return result.rows;
  }

  async findById(id: number): Promise<any> {
    const result = await this.userRepository.getById(id);
    return result;
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const result: any = await this.userRepository.getByEmail(email);
      console.log({blok: result})
      if (result.length === 0) {
        throw new NotFoundException('User not found or unregistered!');
      }

      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(userData: any): Promise<any> {
    try {
      const result: any = await this.userRepository.create({
        ...userData,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: number, data: any): Promise<any> {
    try {
      await this.userRepository.updateById(id, {
        ...data,
        updated_at: new Date(Date.now()),
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUserLoginTime(id: number, loginTime: Date): Promise<any> {
    try {
      await this.userRepository.updateById(id, {
        logged_in: loginTime,
      });

      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: number): Promise<any> {
    const userData = await this.userRepository.getById(id);
    if (!userData) {
      throw new NotFoundException(`User id not found`);
    } else {
      try {
        await this.userRepository.deleteById(id);
        return userData;
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // async findUserById(id: number): Promise<User | undefined> {
  //     return await this.userRepository.findOne(id);
  // }

  // Add more database operations as needed
}
