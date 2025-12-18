// src/member/member.entity.ts
import { Field, ID, ObjectType, GraphQLISODateTime } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Club } from "../club/club.entity";
import { MemberStatus } from "./enums/member-status.enum";

@ObjectType()
@Entity()
export class Member {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  fullName!: string;

  
  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  classification?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rotaryId?: string;

  @Field()
  @Column({ default: true })
  isActive!: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: "date", nullable: true })
  joinDate?: Date;

  // 🔹 Member photo URL
  @Field({ nullable: true })
  @Column({ nullable: true })
  photoUrl?: string;

  // 🔹 Role in club (President, Secretary, etc.)
  @Field({ nullable: true })
  @Column({ nullable: true })
  role?: string;

  // 🔹 Enum status: Active / Inactive / Honorary
  @Field(() => MemberStatus, { nullable: true })
  @Column({
    type: "enum",
    enum: MemberStatus,
    default: MemberStatus.Active,
    nullable: true,
  })
  status?: MemberStatus;

  // 🔹 Additional notes
  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  notes?: string;

  @Field(() => Club)
  @ManyToOne(() => Club, (club) => club.members, { onDelete: "CASCADE" })
  @JoinColumn({ name: "clubId" })
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
