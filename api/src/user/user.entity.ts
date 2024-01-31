import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { List } from "src/list/list.entity"
// import * as bcrypt from 'bcrypt';

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

  // @BeforeInsert()
  // async hashPassword(){
  //   console.log('inside hash in user entity')
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  @Column()
  signedIn: boolean

}