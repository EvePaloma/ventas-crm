import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('tareas')
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column({ default: 'pendiente' })
    estado: string;

    @Column({ type: 'timestamp', nullable: true })
    fechaLimite: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.tareas)
    cliente: Cliente;
}
