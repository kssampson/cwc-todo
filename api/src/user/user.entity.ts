import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { List } from "src/list/list.entity"

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => List, (list) => list.userId)
  lists: List[]

  @Column({unique: true, nullable: false})
  name: string

  @Column({unique: true, nullable: false})
  email: string

  @Column({nullable: false})
  password: string

  @Column()
  signedIn: boolean

}