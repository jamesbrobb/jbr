import * as ts from "typescript";

import {log, getSourceFileSymbol} from "../../utilities";
import {DependencyMap, DependencyMapOptions} from "./dependency-map";


type _SymbolWithExports = ts.Symbol & {exports: ts.SymbolTable};
type _SourceAndSymbolTuple = [sourceFile: ts.SourceFile, symbol: _SymbolWithExports];

type _Options = {
  ignorePathsMap?: IgnorePathsMap,
} & DependencyMapOptions


export type IgnorePathsMap = (string | RegExp)[];
export type SourceModuleCreatorFn<R extends unknown[]> = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  debug?: boolean
) => [...args: R];

export type DependencyMapFactoryOptions<R extends unknown[] = []> =
  R['length'] extends 0 ? _Options : _Options & { sourceModuleCreatorFn: SourceModuleCreatorFn<R> }


export function createDependencyMap<R extends unknown[] = []>(program: ts.Program, options?: DependencyMapFactoryOptions<R>): DependencyMap<R> {

  const dependencyMap = new DependencyMap<R>(options);

  program.getSourceFiles()
    .filter(sourceFile => isSourceFileEligible(program, sourceFile, options))
    .map(sourceFile => [sourceFile, getSymbolFromSource(program, sourceFile)])
    .filter((arg): arg is _SourceAndSymbolTuple => !!arg[1])
    .forEach(([sourceFile, symbol]) => {

      symbol.exports.forEach((value, key) => {

        if (['__export', '__exportStar'].includes(value.name) || value.name.startsWith('ɵ')) {
          return;
        }

        const declaration = value.declarations?.[0];

        if (!declaration) {
          return;
        }

        let extras: R | undefined;

        if(options && 'sourceModuleCreatorFn' in options) {
          extras = options.sourceModuleCreatorFn(declaration, sourceFile, options.debug);
        }

        dependencyMap.set(symbol.name, value.name, declaration.kind, ...(extras || []) as any);
      });
    });

  if(options?.debug) {
    log(dependencyMap.toString(), 'SOURCE FILES MAP');
  }

  return dependencyMap;
}

function isSourceFileEligible(program: ts.Program, sourceFile: ts.SourceFile, options?: DependencyMapFactoryOptions): boolean {

  const baseUrl = program.getCompilerOptions().baseUrl || '';

  if(!baseUrl && options?.debug) {
    console.warn('No baseUrl found in tsconfig.json');
  }

  if(!sourceFile.fileName.includes(baseUrl)) {
    return false;
  }

  return !ignorePath(sourceFile.fileName, options?.ignorePathsMap || [], options?.debug)
}

function getSymbolFromSource(program: ts.Program, sourceFile: ts.SourceFile): _SymbolWithExports | undefined {

  const symbol = getSourceFileSymbol(program, sourceFile);

  return isSymbolWithExports(symbol) ? symbol : undefined;
}

function isSymbolWithExports(symbol?: ts.Symbol): symbol is _SymbolWithExports {
  return !!symbol?.exports?.size;
}


function ignorePath(path: string, map: IgnorePathsMap, debug: boolean = false): boolean {

  const ignore = map.some(value => {
    return path.search(value) !== -1;
  });

  if(ignore && debug) {
    log(path, 'IGNORING PATH')
  }

  return ignore;
}
