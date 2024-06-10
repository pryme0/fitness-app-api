import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';
import { MembershipEntity } from './membership.entity';
import { AddOnEntity } from 'src/add-on-services/entities';

@Entity()
export class MembershipAddOnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => MembershipEntity,
    (membership) => membership.membershipAddOns,
  )
  membership: MembershipEntity;

  @ManyToOne(() => AddOnEntity, (addOn) => addOn.membershipAddOns)
  addOn: AddOnEntity;

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;
}
