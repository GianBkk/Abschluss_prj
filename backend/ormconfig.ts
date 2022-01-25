import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig : TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || 'localhost',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASS || 'postgres',
    database: process.env.POSTGRES_DB || 'printer_db',
    entities: ["dist/src/models/*.entity{.ts,.js}"],
    synchronize: false,
    migrations: ["dist/src/migration/*.js"],

    cli: {
        "migrationsDir": 'src/migration'
    }
  }

  export default typeOrmConfig