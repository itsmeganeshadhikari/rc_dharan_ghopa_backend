// src/member/enums/member-status.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum MemberStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Honorary = 'Honorary',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'Gender of the member',
});

registerEnumType(MemberStatus, {
  name: 'MemberStatus',
  description: 'Status of a rotary member',
});
