#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6d8116dbcc6328ed452028974aa10b15231d5f2f763e150d2108c6e856723817/contract';
import endContract from '../../snapshots/6d8116dbcc6328ed452028974aa10b15231d5f2f763e150d2108c6e856723817/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/72ee991698b50e36185a254388457dde435c02e3f0bd8e0df77d5a388b61bcb6/contract';
import startContract from '../../snapshots/72ee991698b50e36185a254388457dde435c02e3f0bd8e0df77d5a388b61bcb6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'FishType',
        column: col('color', 'text', { default: lit('gray'), codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
