import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: true })
  codeSnippet: string;

  @Column({ default: 0 })
  positiveCount: number;

  @Column({ default: 0 })
  negativeCount: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
