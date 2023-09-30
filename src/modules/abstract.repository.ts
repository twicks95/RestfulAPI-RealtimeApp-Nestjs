import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AbstractRepository {
  constructor(private provider: any, private table: string) {}

  private mapDataObjectValues(dataObject: object): object {
    let columns: any[] = [];
    let insertClauses: any[] = [];
    let insertedValue: any[] = [];
    let setClauses: any[] = [];

    let index: number = 1;
    for (const property in dataObject) {
      columns.push(property);
      insertClauses.push(`$${index}`);
      setClauses.push(`${property} = $${index}`);
      insertedValue.push(dataObject[property]);
      index++;
    }

    return {
      columns,
      insertClauses,
      insertedValue,
      setClauses,
    };
  }

  async getAll(): Promise<any> {
    const query: string = 'SELECT * FROM ' + this.table;
    const result: any = await this.provider.query(query);
    return result.rows;
  }

  async getById(id: number): Promise<any> {
    try {
      const query: string = `SELECT * FROM ${this.table} WHERE id=$1`;
      const result: any = await this.provider.query(query, [id]);
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

  async create(data: any): Promise<any> {
    try {
      const mapObject: any = this.mapDataObjectValues(data);
      const query: string = `INSERT INTO ${this.table} (${mapObject.columns.join(', ')}) VALUES (${mapObject.insertClauses.join(', ')})`;
      const result: any = await this.provider.query(query, mapObject.insertedValue);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateById(id: number, data: any): Promise<any> {
    try {
      const mapObject: any = this.mapDataObjectValues(data);
      const query: string = `UPDATE ${this.table} SET ${mapObject.setClauses.join(', ')} WHERE id=${id}`;
      const result: any = await this.provider.query(query, mapObject.insertedValue);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id: number): Promise<any> {
    try {
      const query: string = `DELETE from ${this.table} WHERE id=${id}`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
