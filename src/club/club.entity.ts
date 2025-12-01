import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Member } from '../member/member.entity';
import { Event } from '../event/event.entity';

@ObjectType()
@Entity()
export class Club {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  riClubNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  districtNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'date', nullable: true })
  charterDate?: Date;

  @Field(() => [Member], { nullable: true })
  @OneToMany(() => Member, (member) => member.club)
  members?: Member[];

  @Field(() => [Event], { nullable: true })
  @OneToMany(() => Event, (event) => event.club)
  events?: Event[];

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt!: Date;
}
