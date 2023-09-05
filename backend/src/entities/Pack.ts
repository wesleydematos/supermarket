import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("packs")
class Pack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("bigint", { nullable: false })
  pack_id: number;

  @Column("bigint", { nullable: false })
  product_id: number;

  @Column("bigint", { nullable: false })
  qty: number;
}

export default Pack;
