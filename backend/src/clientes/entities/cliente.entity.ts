import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
