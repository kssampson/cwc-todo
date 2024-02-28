import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Projects } from "src/projects/projects.entity"

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Projects, (project) => project.user)
  projects: Projects[]

  @Column({unique: true, nullable: false})
  username: string

  @Column({unique: true, nullable: false})
  email: string

  @Column({nullable: false})
  password: string

}