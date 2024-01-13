export interface Environment {
  PORT: number;

  COUCHDB_URL: string;
  COUCHDB_DBNAME: string;
}

const local = {
  PORT: 7000,
  COUCHDB_URL:
    process.env.COUCHDB_URL || "http://admin:password@localhost:5984",
  COUCHDB_DBNAME: process.env.COUCHDB_DBNAME || "xpense",
};

let environment: Environment = null as any;

if (!process.env.ENV || process.env.ENV === "development") {
  environment = { ...process.env, ...local };
} else {
  environment = { ...process.env } as any;
}

export default environment;
