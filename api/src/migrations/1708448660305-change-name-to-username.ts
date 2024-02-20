import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameToUsername1708448660305 implements MigrationInterface {
    name = 'ChangeNameToUsername1708448660305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "username"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" TO "UQ_fe0bb3f6520ee0469504521e710"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" TO "UQ_51b8b26ac168fbe7d6f5653e6cf"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "name"`);
    }

}
