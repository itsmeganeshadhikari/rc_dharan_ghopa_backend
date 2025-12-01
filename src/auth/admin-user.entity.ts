import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum AdminRole {
  ADMIN = 'ADMIN',
  SECRETARY = 'SECRETARY',
}
registerEnumType(AdminRole, { name: 'AdminRole' });

@ObjectType()
@Entity()
export class AdminUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field(() => AdminRole)
  @Column({ type: 'enum', enum: AdminRole, default: AdminRole.ADMIN })
  role!: AdminRole;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
