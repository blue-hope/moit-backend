import {
  Column,
  ColumnOptions,
  ColumnType,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

const typeMapping: { [key: string]: ColumnType } = {
  timestamp: 'datetime',
};

type CastedColumnOptions = ColumnOptions & {
  namespace?: typeof CreateDateColumn | typeof UpdateDateColumn;
};

function resolve(originalColumnType: ColumnType): ColumnType {
  const isTestEnv = process.env.NODE_ENV === 'test';
  if (isTestEnv && (originalColumnType as any) in typeMapping) {
    return typeMapping[originalColumnType.toString()];
  }
  return originalColumnType;
}

export function CastedColumn(columnOptions: CastedColumnOptions) {
  if (columnOptions.type) {
    columnOptions.type = resolve(columnOptions.type);
  }
  if (columnOptions.namespace) {
    const namespace = columnOptions.namespace;
    delete columnOptions.namespace;
    return namespace(columnOptions);
  }
  return Column(columnOptions);
}
