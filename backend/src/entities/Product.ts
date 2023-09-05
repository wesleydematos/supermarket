import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import Pack from "./Pack";

@Entity("products")
class Product {
  @PrimaryColumn()
  code: number;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("decimal", { precision: 9, scale: 2, nullable: false })
  cost_price: number;

  @Column("decimal", { precision: 9, scale: 2, nullable: false })
  sales_price: number;
}

export default Product;
