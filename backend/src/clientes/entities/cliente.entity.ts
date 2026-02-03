import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tareas/entities/tarea.entity';
import { ManyToOne } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    telefono: string;

    @Column({ default: 'nuevo'})
    estado: string; //Nuevo, contactado, venta_cerrada

    @OneToMany(() => Venta, venta => venta.cliente)
    ventas: Venta[];

    @OneToMany(() => Tarea, tarea => tarea.cliente)
    tareas: Tarea[];

    @ManyToOne(() => Usuario, (usuario) => usuario.clientes)
    @JoinColumn({ name: 'vendedorId' })
    vendedor: Usuario;
}
