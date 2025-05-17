import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    name: process.env.DB_NAME || 'db_app',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'my_secret',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    ttlSeconds: process.env.REDIS_TTL_SECONDS || 300,
    get url() {
      return `redis://${this.host}:${this.port}`;
    },
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || '',
    enabled: process.env.SEND_EMAILS === 'true',
  },
  locationIQ: {
    apiKey: process.env.LOCATIONIQ_API_KEY || '',
  },
}
