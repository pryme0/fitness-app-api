import { AddOnEntity } from '../../add-on-services/entities';
import { MembershipEntity } from '../../membership/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum InvoiceStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  membershipCost: number;

  @Column({ type: 'decimal', nullable: true })
  addOnCost: number;

  @Column({ type: 'decimal', nullable: true })
  totalCost: number;

  @Column()
  month: string;

  @Column({
    type: 'simple-enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.UNPAID,
  })
  status: InvoiceStatus;

  @ManyToMany(() => AddOnEntity)
  @JoinTable()
  addOns: AddOnEntity[];

  @ManyToOne(() => MembershipEntity, (membership) => membership.invoices)
  membership: MembershipEntity;

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Timestamp;
}
