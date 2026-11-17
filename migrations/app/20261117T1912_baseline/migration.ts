#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/72ee991698b50e36185a254388457dde435c02e3f0bd8e0df77d5a388b61bcb6/contract';
import endContract from '../../snapshots/72ee991698b50e36185a254388457dde435c02e3f0bd8e0df77d5a388b61bcb6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Fish',
        columns: [
          col('bait', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('comments', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('date', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idType', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('image', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('isCaught', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('place', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('weight', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'FishType',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Fish',
        index: 'Fish_idType_idx_0fa97492',
        columns: ['idType'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Fish',
        foreignKey: {
          name: 'Fish_idType_fkey',
          columns: ['idType'],
          references: { schema: 'public', table: 'FishType', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
