import * as ts from "typescript";
import * as path from "path";

import {PathResolutionMap, resolvePath} from "../../paths";
import {Import, isImportDeclaration, parseDefinition} from "../../declarations";
import {walkNodeTree} from "../../utilities";
import {ImportsMap, ImportsMapElement, ImportsMapElementExtended, ImportsMapOptions} from "./imports-map";


export type ImportsMapElementCreatorFn<R extends unknown[]> = (...args: ImportsMapElement) => ImportsMapElementExtended<R>;

export type ImportsMapFactoryOptions<R extends unknown[]> =
  R['length'] extends 0 ?
    ImportsMapOptions : ImportsMapOptions & { importsMapElementCreatorFn: ImportsMapElementCreatorFn<R> }



export function createImportsMap<R extends unknown[] = []>(sourceFile: ts.SourceFile, options?: ImportsMapFactoryOptions<R>): ImportsMap<R> {

  if(options && !options.nodeParseFn) {
    options.nodeParseFn = parseDefinition as any
  }

  // @ts-ignore
  const map: ImportsMap<R> = sourceFile.statements
    .filter(ts.isImportDeclaration)
    .map(impt => walkNodeTree(impt, sourceFile, options))
    // TODO - this code is coupled to my Import - need to decouple
    .filter(isImportDeclaration)
    .flatMap(imprt => getImportNames(imprt)
      .map(name => [name, resolveModulePath(imprt.module, sourceFile, options?.pathResolutionMap)])
    )
    ///////////////////////////
    .map(([name, module]) => {
        if (options && 'importsMapElementCreatorFn' in options) {
          return options.importsMapElementCreatorFn(name, module)
        }

        return [name, module]
      }
    );

  if(options?.debug) {
    console.log(map);
  }

  return map;
}


function resolveModulePath(modulePath: string, sourceFile: ts.SourceFile, pathResolutionMap: PathResolutionMap = []): string {

  if(modulePath.startsWith('.')) {
    modulePath = path.resolve(path.dirname(sourceFile.fileName), modulePath);
  }

  return resolvePath(modulePath, pathResolutionMap);
}


function getImportNames(imprt: Import): string[] {

  if(!imprt.children) {
    return [];
  }

  return imprt.children.map(child => child)
    .flatMap(child => child.children?.map(namedImport => namedImport))
    .flatMap(namedImport => namedImport?.children?.map(importSpecifier => importSpecifier))
    .map(importSpecifier => importSpecifier?.name)
    .filter((name): name is string => !!name);
}

