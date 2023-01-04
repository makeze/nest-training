import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { DataSource } from 'typeorm';
import { CoffeeRefactor1672740201024 } from './src/migrations/1672740201024-CoffeeRefactor';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [Coffee, Flavor],
    migrations: [CoffeeRefactor1672740201024]
});