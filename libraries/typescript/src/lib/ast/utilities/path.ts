
export type PathResolutionMap = [matcher: string | RegExp, prepend?: string, append?: string][];

export function resolvePath(path: string, map: PathResolutionMap): string {

  path = path.replace(/"/g, '').replace(/'/g, '');

  map.forEach((value) => {

    if(path.search(value[0]) === -1) {
      return;
    }

    if(value[0] instanceof RegExp && value[0].test(path)) {
      path = path.replace(value[0], value[1] || '');
    }


    if(typeof value[0] === 'string') {
      path = `${value[1] || ''}${path.split(value[0]).slice(-1)[0]}${value[2] || ''}`;
    }
  });

  return path.replace(/^\//, '');
}


export type DuplicatePathPrecedenceMap = [path: string | RegExp, priority: number][];

export function resolveDuplicatePath(existingPath: string, newPath: string, map: DuplicatePathPrecedenceMap): number {

  let result = 0;

  const a = map.find((value) => {
    return existingPath.search(value[0]) !== -1;
  });

  const b = map.find((value) => {
    return newPath.search(value[0]) !== -1;
  });

  if(a && b) {
    result = Math.min(Math.max(a[1] - b[1], 1), -1);
  }

  return result;
}
