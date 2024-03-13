import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemTable1710274636410 implements MigrationInterface {
    name = 'CreateItemTable1710274636410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "description" character varying, "status" character varying NOT NULL DEFAULT 'To Do', "subTaskId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_778524ab8ebc4795e10cdc2012c" FOREIGN KEY ("subTaskId") REFERENCES "sub_task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_778524ab8ebc4795e10cdc2012c"`);
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
