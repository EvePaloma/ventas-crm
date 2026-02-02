import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
