import 'server-only';
import { Pool, QueryResult, QueryResultRow } from 'pg';

// define environment variable type
declare global {
  var pgPool: Pool | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_PORT?: number;
      DB_CA_CERTIFICATE?: string;
    }

    // extend global interface to include our database instance
    interface Global {
      pgPool?: Pool;
    }
  }
}

// define the database interface
interface Database {
  query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>>;
  getPool(): Pool;
  end(): Promise<void>;
}

// Pool configuration
const poolConfig = {
  max: 20,
  idleTimeoutMillis: 10000,
  // connectionTimeoutMillis: 2000,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
    // ca: process.env.DB_CA_CERTIFICATE,
  },
};

// Create or use the existing pool
const getPool = (): Pool => {
  // Check if we already have a pool on the global object
  if (!global.pgPool) {
    global.pgPool = new Pool(poolConfig);

    // Setup error handler
    global.pgPool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      // process.exit(-1);
    });

    /**
     * Unused for Next.js 15 and above with turbo pack
     */
    // // For development environments: handle hot reloading
    // if (process.env.NODE_ENV !== "production") {
    //   // Clean up pool on module reload
    //   // @ts-ignore
    //   if (module.hot) {
    //     // @ts-ignore
    //     module.hot.dispose(async() => {
    //       if (global.pgPool) {
    //         await global.pgPool.end();
    //         global.pgPool = undefined;
    //       }
    //     });
    //   }
    // }
  }

  return global.pgPool;
};

// Function to initialize the database
const initDb = async () => {
  const pool = getPool();
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR,
        password VARCHAR,
        avatar VARCHAR
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log(`Database initialized: 'users' table is ready`);
  } catch (error) {
    console.error('Error initializing database', error);
    throw error;
  }
};

// Initialize the database when the module is loaded
initDb().catch((err) => {
  console.error('Failed to initialize the database:', err);
  process.exit(-1);
});

// Create the database object with all methods
const db: Database = {
  query: async <T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> => {
    const pool = getPool();
    return pool.query<T>(text, params);
  },

  getPool: (): Pool => {
    return getPool();
  },

  end: async (): Promise<void> => {
    if (global.pgPool) {
      await global.pgPool.end();
      global.pgPool = undefined;
    }
  },
};

export default db;
