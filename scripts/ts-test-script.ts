import * as ts from "typescript";

import {
  buildMaps,
  CommonPathHandler, JBRPathHandler,
  MapBuilderMaps,
  NgPathHandler,
  NodeModulesPathHandler,
  RxjsPathHandler,
  getParsedConfig,
  createProgram,
  getSourceFile,
  createSourceFileMap,
  createImportsMap,
  convertPath,
  ImportsMapElementExtended
} from "../libraries/typescript/src/lib";


const maps: MapBuilderMaps<[ts.SyntaxKind]> = buildMaps(
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new NgPathHandler(),
  new RxjsPathHandler(),
  new JBRPathHandler()
)

const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/analytics/analytics-service.ts';

const config = getParsedConfig();

const  program = createProgram(config.fileNames[0], config.options),
  sourceFile = getSourceFile(program, sourcePath);

const sourceFileMap = createSourceFileMap(program, {
  debug: false,
  ignorePathsWith: maps.ignoreMap,
  pathResolutionMap: maps.pathResolutionMap,
  duplicatePathPrecedenceMap: maps.duplicatePrecedenceMap
});

const importsMap = createImportsMap(sourceFile, {
  debug: true,
  pathResolutionMap: maps.pathResolutionMap,
  // TODO - move this inside createImportsMap - add sourceFileMap and pathConversionMap to options?
  importsMapElementCreatorFn: (importName: string, importModule: string) => {

    const sourceModule = sourceFileMap.get(importModule, importName);

    let result: ImportsMapElementExtended<[kind?: ts.SyntaxKind]> = [importName, importModule];

    if(!sourceModule) {
      console.log(`No source module found for ${importName}`);
    }

    if (sourceModule) {
      result = [importName, sourceModule[0], sourceModule[1]];
    }
    // TODO - this works in the previous version without any??? the mouse over signature for convertPath is different?
    return convertPath(result as any, maps.pathConversionMap);
  }
});

console.log(importsMap);
