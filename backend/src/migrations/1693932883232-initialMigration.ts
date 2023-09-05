import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitialMigration1693932883232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "code",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "cost_price",
            type: "decimal",
            precision: 9,
            scale: 2,
            isNullable: false,
          },
          {
            name: "sales_price",
            type: "decimal",
            precision: 9,
            scale: 2,
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "packs",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "pack_id",
            type: "bigint",
            isNullable: false,
          },
          {
            name: "product_id",
            type: "bigint",
            isNullable: false,
          },
          {
            name: "qty",
            type: "bigint",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FK_Pack_Product",
            referencedTableName: "products",
            referencedColumnNames: ["code"],
            columnNames: ["pack_id"],
          },
          {
            name: "FK_Component_Product",
            referencedTableName: "products",
            referencedColumnNames: ["code"],
            columnNames: ["product_id"],
          },
        ],
      })
    );

    await queryRunner.query(
      "INSERT INTO products (code, name, cost_price, sales_price) VALUES (16,'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',18.44,20.49), (18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99), (19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29), (20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79), (21,'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',10.71,11.71), (22,'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',6.74,7.49), (23,'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',2.15,2.39), (24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99), (26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79), (1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94), (1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78), (1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00)"
    );

    await queryRunner.query(
      "INSERT INTO packs (pack_id, product_id, qty) VALUES (1000,18,6), (1010,24,1), (1010,26,1), (1020,19,3), (1020,21,3)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
