import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';
import { hash } from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];

  @BeforeInsert()
  async hashPassword (): Promise<any> {
    this.password = await hash(this.password, 10);
  }
}
