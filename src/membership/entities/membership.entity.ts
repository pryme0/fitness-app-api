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
import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';

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

  @Column({ type: 'decimal', nullable: true })
  totalAmount: number;

  @Column()
  email: string;

  @Column({ default: true })
  isFirstMonth: boolean;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.membership) // Define one-to-many relationship
  invoices: InvoiceEntity[];

  
  @ManyToMany(() => AddOnEntity, (addOn) => addOn.memberships)
  @JoinTable()
  addOns: AddOnEntity[];

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Timestamp;
}
