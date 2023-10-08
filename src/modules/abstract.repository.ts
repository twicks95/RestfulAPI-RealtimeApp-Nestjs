import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AbstractRepository {
  constructor(protected provider: any, protected table: string) {}

  protected mapDataObjectValues(dataObject: object): object {
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

  async create(data: object): Promise<any> {
    try {
      const mapObject: any = this.mapDataObjectValues(data);
      const query: string = `INSERT INTO ${this.table} (${mapObject.columns.join(', ')}) VALUES (${mapObject.insertClauses.join(
        ', ',
      )}) RETURNING *`;
      const result: any = await this.provider.query(query, mapObject.insertedValue);
      return result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
