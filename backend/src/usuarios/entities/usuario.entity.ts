import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';

export enum RolUsuario {
    ADMIN = 'admin',
    USUARIO = 'usuario',
    VENDEDOR = 'vendedor',
}

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({select: false})
    password: string;

    @Column({ 
        type: 'enum',
        enum: RolUsuario, 
        default: RolUsuario.USUARIO 
    })
    rol: RolUsuario;

    @CreateDateColumn()
    fechaAlta: Date;

    @OneToMany(() => Cliente, (cliente) => cliente.vendedor)
    clientes: Cliente[];

    @OneToMany(() => Tarea, (tarea) => tarea.vendedor)
    tareas: Tarea[];
}
