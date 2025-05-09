import { Pool } from 'pg';

export const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'ucenin',
    password: 'admin123',
    port: 5433,
});