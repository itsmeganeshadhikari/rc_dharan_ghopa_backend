import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Club } from '../club/club.entity';

@ObjectType()
@Entity()
export class Event {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'timestamptz' })
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field()
  @Column({ default: false })
  isClubMeeting!: boolean;

  @Field(() => Club)
  @ManyToOne(() => Club, (club) => club.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clubId' })
  club!: Club;

  @Field(() => ID)
  @Column()
  clubId!: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt!: Date;
}
