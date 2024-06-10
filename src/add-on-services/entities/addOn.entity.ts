import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import {
  MembershipEntity,
  MembershipAddOnEntity,
} from '../../membership/entities';
import { InvoiceEntity } from '../../invoice/entities';

@Entity()
export class AddOnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  monthlyAmount: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => InvoiceEntity, (invoice) => invoice.addOns)
  invoices: InvoiceEntity[];

  @OneToMany(
    () => MembershipAddOnEntity,
    (membershipAddOn) => membershipAddOn.addOn,
  )
  membershipAddOns: MembershipAddOnEntity[];

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Timestamp;
}
