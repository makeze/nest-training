import { MigrationInterface, QueryRunner } from "typeorm"

export class CoffeeRefactor1672740201024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER Table "coffee" RENAME COLUMN "name" to "title"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER Table "coffee" RENAME COLUMN "title" to "name"`
        );
    }

}
