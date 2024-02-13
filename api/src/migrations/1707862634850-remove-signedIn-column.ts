import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSignedInColumn1707862634850 implements MigrationInterface {
    name = 'RemoveSignedInColumn1707862634850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "signedIn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "signedIn" boolean NOT NULL`);
    }

}
