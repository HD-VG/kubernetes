import { 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Column, 
  BeforeInsert 
} from 'typeorm';
import * as crypto from 'crypto';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  createUserId: number;

  @Column({ nullable: true })
  updateUserId: number;

  @Column({ nullable: true })
  deleteUserId: number;

  @CreateDateColumn({ 
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', 
  })
  createAt: Date;

  @UpdateDateColumn({ 
    name: 'updated_at',
    type: 'timestamp',
    nullable: true
  })
  updateAt: Date;

  @DeleteDateColumn({ 
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true 
  })
  deleteAt: Date;

  @BeforeInsert()
  generateUid() {
    if (!this.uuid) {
      this.uuid = crypto.randomBytes(8).toString('hex');
    }
  }
}
