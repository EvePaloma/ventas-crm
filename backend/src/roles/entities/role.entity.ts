import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity({ name: 'roles' })
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true })
    nombre: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}