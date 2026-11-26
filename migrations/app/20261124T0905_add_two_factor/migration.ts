#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1390e06f742f98e9a188097bcd19cd276270d13b4da6b767a4b78c119ef70dd3/contract';
import startContract from '../../snapshots/1390e06f742f98e9a188097bcd19cd276270d13b4da6b767a4b78c119ef70dd3/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/861ac7585bb1fbc6e2b48d0efc4b8803e2b2a979f7b93d4cb94081e389ae235b/contract';
import endContract from '../../snapshots/861ac7585bb1fbc6e2b48d0efc4b8803e2b2a979f7b93d4cb94081e389ae235b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('twoFactorEnabled', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('twoFactorSecret', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
