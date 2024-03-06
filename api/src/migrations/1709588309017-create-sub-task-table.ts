import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubTaskTable1709588309017 implements MigrationInterface {
    name = 'CreateSubTaskTable1709588309017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL DEFAULT 'To Do', "taskId" integer, CONSTRAINT "PK_ccb15801cf521e9c45237f484c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub_task" ADD CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_task" DROP CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57"`);
        await queryRunner.query(`DROP TABLE "sub_task"`);
    }

}
