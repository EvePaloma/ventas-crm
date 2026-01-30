import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Column({ default: 'pendiente' })
    estado: string;

    @CreateDateColumn()
    fechaCreacion: Date;

    @ManyToOne(() => Cliente, cliente => cliente.ventas)
    cliente: Cliente;
}
