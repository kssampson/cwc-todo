import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Project } from "src/projects/projects.entity"

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[]

  @Column({unique: true, nullable: false})
  username: string

  @Column({unique: true, nullable: false})
  email: string

  @Column({nullable: false})
  password: string

}