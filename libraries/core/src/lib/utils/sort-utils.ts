
export type SortOrder = 'asc' | 'desc' | 'none'

function isDefined(arg: unknown): boolean {
  return arg !== undefined && arg !== null;
}

export function comparer<V>(value1: V, value2: V, sortOrder: SortOrder = 'asc'): number {
  const compareOrder = sortOrder === 'desc' ? -1 : sortOrder === 'asc' ? 1 : 0;
  const undefinedOrder = sortOrder === 'asc' ? compareOrder : compareOrder * -1;

  if (!isDefined(value1) && !isDefined(value2)) {
    return 0;
  }

  if (!isDefined(value1)) {
    return undefinedOrder;
  }

  if (!isDefined(value2)) {
    return -1 * undefinedOrder;
  }

  if (value1 instanceof Date && value2 instanceof Date) {
    return (value1.getTime() - value2.getTime()) * compareOrder;
  }

  if (typeof value1 === 'number' && typeof value2 === 'number') {
    return (Number(value1) - Number(value2)) * compareOrder;
  }

  if (typeof value1 === 'string' && typeof value2 === 'string') {
    const stringVal1 = String(value1).toUpperCase();
    const stringVal2 = String(value2).toUpperCase();
    return stringVal1.localeCompare(stringVal2) * compareOrder;
  }

  if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
    return ((value1 ? 1 : -1) - (value2 ? 1 : -1)) * compareOrder;
  }

  return 0;
}
