import { Injectable } from '@nestjs/common'
import { Pool } from 'pg';

@Injectable()
export class PostgresProvider {
  private readonly pool: Pool;
  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost', // Change to your PostgreSQL server host
      database: 'db_chat',
      password: 'SQL123!',
      port: 5432, // Change to your PostgreSQL server port if necessary
    });
  }

  async query(queryText: string, params?: any[]) {
    return this.pool.query(queryText, params);
  }
}