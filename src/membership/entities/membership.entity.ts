import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  Timestamp,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { AddOnEntity } from '../../add-on-services/entities';
import { InvoiceEntity } from '../../invoice/entities';
import { MembershipAddOnEntity } from './membershipAddon.entity';

@Entity()
export class MembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  membershipType: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'float', nullable: true })
  amount: number;

  @Column()
  email: string;

  @Column({ default: true })
  isFirstMonth: boolean;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.membership) // Define one-to-many relationship
  invoices: InvoiceEntity[];

  @OneToMany(
    () => MembershipAddOnEntity,
    (membershipAddOn) => membershipAddOn.membership,
  )
  membershipAddOns: MembershipAddOnEntity[];

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Timestamp;
}
