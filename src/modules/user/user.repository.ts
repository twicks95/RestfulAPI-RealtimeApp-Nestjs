import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';

@Injectable()
export class UserRepository extends AbstractRepository {
  async getById(userId: number): Promise<any> {
    try {
      const query: string = `SELECT * FROM ${this.table} WHERE user_id=$1`;
      const result: any = await this.provider.query(query, [userId]);
      return result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const query: string = `SELECT * FROM ${this.table} WHERE email=$1`;
      const result: any = await this.provider.query(query, [email]);
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateById(userId: number, data: any): Promise<any> {
    try {
      const mapObject: any = this.mapDataObjectValues(data);
      const query: string = `UPDATE ${super.table} SET ${mapObject.setClauses.join(', ')} WHERE user_id=${userId} RETURNING *`;
      const result: any = await this.provider.query(query, mapObject.insertedValue);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(userId: number): Promise<any> {
    try {
      const query: string = `DELETE from ${this.table} WHERE user_id=${userId}`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
