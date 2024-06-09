import { MembershipEntity } from 'src/membership/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
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

  @Column()
  amount: number;

  @Column({ type: 'date' })
  month: Date;

  @Column({
    type: 'simple-enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.UNPAID,
  })
  status: InvoiceStatus;

  @ManyToOne(() => MembershipEntity, (membership) => membership.invoices)
  membership: MembershipEntity;

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Timestamp;
}
