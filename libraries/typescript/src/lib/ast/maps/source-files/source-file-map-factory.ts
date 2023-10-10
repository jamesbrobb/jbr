import * as ts from "typescript";
import {SetKeyAsOptional} from "@jbr/types";
import {log} from "../../utilities";
import {SourceFileMap, SourceFileMapOptions} from "./source-file-map";
import {convertSourceFileToSymbol} from "../../declarations";


export type IgnorePathsMap = (string | RegExp)[];

export type SourceModuleCreatorFn<T extends unknown[]> = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  debug?: boolean
) => [...args: T];

type _SourceFileMapFactoryOptionsInt<T extends unknown[]> = {
  ignorePathsWith?: IgnorePathsMap,
  sourceModuleCreatorFn: SourceModuleCreatorFn<T>
} & SourceFileMapOptions

export type SourceFileMapFactoryOptions<T extends unknown[] = []> =
    T['length'] extends 0 ?
      SetKeyAsOptional<_SourceFileMapFactoryOptionsInt<T>, 'sourceModuleCreatorFn'> :
      _SourceFileMapFactoryOptionsInt<T>


type SymbolWithExports = ts.Symbol & {exports: ts.SymbolTable};
type SourceAndSymbolTuple = [sourceFile: ts.SourceFile, symbol: SymbolWithExports];


export function createSourceFileMap<T extends unknown[] = []>(program: ts.Program, options?: SourceFileMapFactoryOptions<T>): SourceFileMap<T> {

  const sourceFilesMap = new SourceFileMap<T>(options);

  program.getSourceFiles()
    .filter(sourceFile => isSourceFileEligible<T>(program, sourceFile, options))
    .map(sourceFile => [sourceFile, getSymbolFromSource(program, sourceFile)])
    .filter((arg): arg is SourceAndSymbolTuple => !!arg[1])
    .forEach(([sourceFile, symbol]) => {

      symbol.exports.forEach((value, key) => {

        if (['__export', '__exportStar'].includes(value.name) || value.name.includes('ɵ')) {
          return;
        }

        const declaration = value.declarations?.[0];

        if (!declaration) {
          return;
        }

        let extras: T | undefined;

        if(!!options?.sourceModuleCreatorFn) {
          extras = options.sourceModuleCreatorFn(declaration, sourceFile, options.debug);
        }

        sourceFilesMap.set(symbol.name, key.toString(), declaration.kind, ...(extras || []) as T);
      });
    });

  if(options?.debug) {
    log(sourceFilesMap.toString(), 'SOURCE FILES MAP');
  }

  return sourceFilesMap;
}

function isSourceFileEligible<T extends unknown[]>(program: ts.Program, sourceFile: ts.SourceFile, options?: SourceFileMapFactoryOptions<T>): boolean {

  const baseUrl = program.getCompilerOptions().baseUrl || '';

  if(!baseUrl && options?.debug) {
    console.warn('No baseUrl found in tsconfig.json');
  }

  if(!sourceFile.fileName.includes(baseUrl)) {
    return false;
  }

  return !ignorePath(sourceFile.fileName, options?.ignorePathsWith || [], options?.debug)
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

function getSymbolFromSource(program: ts.Program, sourceFile: ts.SourceFile): SymbolWithExports | undefined {

  const symbol = convertSourceFileToSymbol(program, sourceFile);

  if(isSymbolWithExports(symbol)) {
    return symbol;
  }

  return undefined;
}

function isSymbolWithExports(symbol?: ts.Symbol): symbol is SymbolWithExports {
  return !!symbol?.exports?.size;
}
