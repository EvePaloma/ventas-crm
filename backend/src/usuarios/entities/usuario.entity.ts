import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  BeforeInsert, 
  OneToMany, 
  ManyToOne 
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Tarea } from '../../tareas/entities/tarea.entity'; 
import { Rol } from '../../roles/entities/role.entity'; 

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false }) 
    password: string;

    @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true })
    rol: Rol;

    @CreateDateColumn()
    fechaAlta: Date;

    @OneToMany(() => Cliente, (cliente) => cliente.vendedor)
    clientes: Cliente[];

    @OneToMany(() => Tarea, (tarea) => tarea.vendedor)
    tareas: Tarea[];

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}