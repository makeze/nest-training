import { INestApplication, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as request from 'supertest';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {

  const coffee = {
    name: 'Fun',
    brand: 'Tasty',
    flavors: ['tasty', 'nutty']
  };

  const updatedCoffee = {
    name: 'Cool',
    brand: 'Even Tastier',
    flavors: ['tasty', 'caramely']
  };

  const expectedCoffee = expect.objectContaining({
    ...coffee,
    flavors: expect.arrayContaining(
      coffee.flavors.map(name => expect.objectContaining({ name }))
    )
  });


  const expectedUpdatedCoffee = expect.objectContaining({
    ...updatedCoffee,
    flavors: expect.arrayContaining(
      updatedCoffee.flavors.map(name => expect.objectContaining({ name }))
    )
  });

  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(
      {
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      }
    ));
    await app.init();
  }); HttpStatus

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedCoffee);
      });
  });
  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        console.log(body);
        expect(body.length).toBeGreaterThan(0);
      })
  });
  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer())
      .get('/coffees/1')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        console.log(body);
        expect(body).toEqual(expectedCoffee);
      })
  });
  it('Update one [PATCH /:id]', () => {
    return request(app.getHttpServer())
      .patch('/coffees/1')
      .send(updatedCoffee as CreateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        console.log(body);
        expect(body).toEqual(expectedUpdatedCoffee);
      })
  });
  it('Delete one [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      })
  });

  afterAll(async () => {
    await app.close();
  });
});