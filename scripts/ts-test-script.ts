import * as ts from "typescript";

import {
  buildPathMaps,
  CommonPathHandler, JBRPathHandler,
  PathParserMaps,
  NgPathHandler,
  NodeModulesPathHandler,
  RxjsPathHandler,
  getParsedTSConfig,
  createProgram,
  getSourceFile,
  createSourceFileMap,
  createImportsMap,
  convertPath,
  createLocalMap,
  ImportsMapElementExtended,
  parseSourceFile,
  parseDeclaration, parseSourceFiles
} from "../libraries/typescript";


const maps: PathParserMaps<[ts.SyntaxKind]> = buildPathMaps(
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new NgPathHandler(),
  new RxjsPathHandler(),
  new JBRPathHandler()
)

const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/analytics/analytics-service.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/commands/command/command.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/ui/src/lib/common/overlay/color/color-overlay.component.ts';

const config = getParsedTSConfig(),
  entryFile = config.fileNames[0];

const program = createProgram(entryFile, config.options),
  sourceFile = getSourceFile(program, sourcePath);

const sourceFileMap = createSourceFileMap(program, {
  debug: false,
  ignorePathsMap: maps.ignorePathsMap,
  pathResolutionMap: maps.pathResolutionMap,
  duplicatePathPrecedenceMap: maps.duplicatePathPrecedenceMap
});

const importsMap = createImportsMap(sourceFile, {
  debug: false,
  pathResolutionMap: maps.pathResolutionMap,
  // TODO - move this inside createImportsMap - add sourceFileMap and pathConversionMap to options?
  importsMapElementCreatorFn: (importName: string, importModule: string, resolvedImportModule: string) => {
    console.log('importName', importName);
    console.log('importModule', importModule);
    console.log('resolvedImportModule', resolvedImportModule);
    const sourceModule = sourceFileMap.get(resolvedImportModule, importName);
    console.log('sourceModule', sourceModule);

    let result: ImportsMapElementExtended<[kind?: ts.SyntaxKind]> = [importName, importModule, resolvedImportModule];

    if(!sourceModule) {
      console.log(`No source module found for ${importName}`);
    }

    if (sourceModule) {
      result = [importName, importModule, sourceModule[0], sourceModule[1]];
    }
    console.log(result);
    console.log('====================')

    let convertedPath = '';

    if(sourceModule) {
      convertedPath = convertPath(importName, sourceModule[0], sourceModule[1], maps.pathConversionMap);
    }

    console.log('convertedPath', convertedPath);
    // TODO - this works in the previous version without any??? the mouse over signature for convertPath is different?
    return result;
  }
});

const localMap = createLocalMap(program, sourceFile);

const sfParseOptions = {
  returnArray: false,
  lazy: false,
  debug: false,
  nodeParseFn: parseDeclaration
}

const parsedSF = parseSourceFile(program, sourceFile, sfParseOptions);
const parsedSFs = parseSourceFiles(program, entryFile, sfParseOptions);

//console.log(parsedSFs);
