import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeProjectsEntity1708989544198 implements MigrationInterface {
    name = 'ChangeProjectsEntity1708989544198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_11dc92b1cdada25188e4073660e"`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL, "userIdId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_11dc92b1cdada25188e4073660e" FOREIGN KEY ("listsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_1aae694574f4c74d4d4a4304c22" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_1aae694574f4c74d4d4a4304c22"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_11dc92b1cdada25188e4073660e"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_11dc92b1cdada25188e4073660e" FOREIGN KEY ("listsId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
