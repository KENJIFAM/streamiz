interface Keys {
  [key: string]: string;
}

const keys: Keys = {
  mongoUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
  mongoHost: process.env.MONGO_INITDB_HOST,
  mongoDatabase: process.env.MONGO_INITDB_DATABASE,
  mongoPort: process.env.MONGO_INITDB_PORT
};

export default keys;