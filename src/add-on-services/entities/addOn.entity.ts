// src/addon-service/addon-service.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Timestamp, UpdateDateColumn, ManyToMany } from 'typeorm';
import { MembershipEntity } from '../../membership/entities/membership.entity';

@Entity()
export class AddOnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  monthlyAmount: number;

  @ManyToMany(() => MembershipEntity, (membership) => membership.addOns)
  memberships: MembershipEntity[];

  @CreateDateColumn({ nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Timestamp;
}
