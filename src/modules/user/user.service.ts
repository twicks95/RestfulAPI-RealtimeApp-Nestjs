import { Injectable, NotFoundException } from '@nestjs/common';
import { PostgresProvider } from '../../database/postgres.provider'

@Injectable()
export class UserService {
    constructor(private readonly postgresProvider: PostgresProvider) { }

    async getAll() {
        const query = 'SELECT * FROM users'
        return await this.postgresProvider.query(query);
    }

    // async findUserById(id: number): Promise<User | undefined> {
    //     const options: FindOneOptions<User> = {
    //         where: { id }, // Specify conditions to filter the record you want to retrieve
    //         // select: ['id', 'username', 'email'], // Specify which columns to select
    //         // relations: ['profile'], // Specify relations to eager load
    //         order: {
    //             created_at: 'DESC', // Order the result by the 'createdAt' column in descending order
    //         },
    //     }
    //     return await this.userRepository.findOne(options);
    // }

    // async createUser(user: User): Promise<User> {
    //     return await this.userRepository.save(user);
    // }

    // async updateUser(id: number, user: User): Promise<User> {
    //     const userData = await this.findUserById(id)
    //     if (!userData) {
    //         throw new NotFoundException('User not found')
    //     } else {
    //         // Update user properties
    //         return await this.userRepository.save(user);
    //     }
    // }

    // async deleteUser(id: number): Promise<User> {
    //     const userData = await this.findUserById(id)
    //     if (!userData) {
    //         throw new NotFoundException('User not found')
    //     } else {
    //         return await this.userRepository.remove(userData);
    //     }
    // }

    // async findUserById(id: number): Promise<User | undefined> {
    //     return await this.userRepository.findOne(id);
    // }

    // Add more database operations as needed
}