import { User } from 'src/users/users.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  rank: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
