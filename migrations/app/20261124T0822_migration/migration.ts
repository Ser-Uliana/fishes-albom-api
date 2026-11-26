#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1390e06f742f98e9a188097bcd19cd276270d13b4da6b767a4b78c119ef70dd3/contract';
import endContract from '../../snapshots/1390e06f742f98e9a188097bcd19cd276270d13b4da6b767a4b78c119ef70dd3/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/6d8116dbcc6328ed452028974aa10b15231d5f2f763e150d2108c6e856723817/contract';
import startContract from '../../snapshots/6d8116dbcc6328ed452028974aa10b15231d5f2f763e150d2108c6e856723817/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { default: lit('user'), codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
