import * as ts from "typescript";
import * as path from "path";
import {ImportsMap, ImportsMapElement, ImportsMapElementExtended, ImportsMapOptions} from "./imports-map";
import {SetKeyAsOptional} from "@jbr/types";
import {PathResolutionMap, resolvePath, walkNodeTree} from "../../utilities";



export type ImportsMapElementCreatorFn<R extends unknown[]> = (...args: ImportsMapElement) => ImportsMapElementExtended<R>;

type _ImportsMapFactoryOptionsInt<T extends unknown[]> = {
  importsMapElementCreatorFn: ImportsMapElementCreatorFn<T>
} & ImportsMapOptions

export type ImportsMapFactoryOptions<T extends unknown[] = []> =
  T['length'] extends 0 ?
    SetKeyAsOptional<_ImportsMapFactoryOptionsInt<T>, 'importsMapElementCreatorFn'> :
    _ImportsMapFactoryOptionsInt<T>


export function createImportsMap<R extends unknown[] = []>(sourceFile: ts.SourceFile, options?: ImportsMapFactoryOptions<R>): ImportsMap<R> {

  const map: ImportsMap<R> = getImportDeclarations<R>(sourceFile, options)
    .flatMap(imprt => getImportNames(imprt)
      .map(name => [
        name,
        resolveModulePath(imprt.module, sourceFile, options?.pathResolutionMap)
      ])
    )
    .map(([name, module]: ImportsMapElement): ImportsMapElementExtended<R> => {

      if(!!options?.importsMapElementCreatorFn) {
        return options.importsMapElementCreatorFn(name, module);
      }

      return [name, module] as any;
    });

  if(options?.debug) {
    console.log(map);
  }

  return map;
}


function getImportDeclarations<R extends unknown[]>(sourceFile: ts.SourceFile, options?: ImportsMapFactoryOptions<R>): Import[] {
  return sourceFile.statements
    .filter(ts.isImportDeclaration)
    .map(impt => walkNodeTree(impt, sourceFile, options))
    .filter(isImportDeclaration);
}

function getImportNames(imprt: Import): string[] {

  if(!imprt.children) {
    return [];
  }

  return imprt.children?.map(child => child)
    .flatMap(child => child.children?.map(namedImport => namedImport))
    .flatMap(namedImport => namedImport?.children?.map(importSpecifier => importSpecifier))
    .map(importSpecifier => importSpecifier?.name)
    .filter((name): name is string => !!name);
}


function resolveModulePath(modulePath: string, sourceFile: ts.SourceFile, pathResolutionMap: PathResolutionMap = []): string {

  if(modulePath.startsWith('.')) {
    modulePath = path.resolve(path.dirname(sourceFile.fileName), modulePath);
  }

  return resolvePath(modulePath, pathResolutionMap);
}
