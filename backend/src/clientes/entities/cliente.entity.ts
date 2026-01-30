import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { OneToMany } from 'typeorm';

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

}
