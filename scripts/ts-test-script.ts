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
  createDependencyMap,
  createImportsMap,
  convertPath,
  createLocalMap,
  parseSourceFile,
  parseDeclaration,
  parseSourceFiles,
  AngularMaterialPathHandler,
  ImportsMapElementCreatorFnParams, parse
} from "../libraries/typescript";

const pathHandlers = [
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new AngularMaterialPathHandler(),
  new NgPathHandler(),
  new RxjsPathHandler(),
  new JBRPathHandler()
]

const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/analytics/analytics-service.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/commands/command/command.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/ui/src/lib/common/overlay/color/color-overlay.component.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/ui/src/lib/forms/codemirror/codemirror.component.ts';

/*
const maps: PathParserMaps = buildPathMaps(...pathHandlers);

const config = getParsedTSConfig(),
  entryFile = config.fileNames[0];

const program = createProgram(entryFile, config.options),
  sourceFile = getSourceFile(program, sourcePath);

const dependencyMap = createDependencyMap(program, {
  debug: false,
  ...maps
});

const importsMap = createImportsMap(sourceFile, {
  debug: false,
  pathResolutionMap: maps.pathResolutionMap,
  dependencyMap,
  importsMapElementCreatorFn: (params: ImportsMapElementCreatorFnParams<{kind: ts.SyntaxKind.ImportDeclaration}>) => {
    return {kind: params.importDec.kind}
  }
});

const localMap = createLocalMap(program, sourceFile);

const sfParseOptions = {
  returnArray: false,
  lazy: false,
  debug: false,
  nodeParseFn: parseDeclaration,
  pathResolutionMap: maps.pathResolutionMap,
  dependencyMap,
}

const parsedSF = parseSourceFile(program, sourceFile, sfParseOptions);
const parsedSFs = parseSourceFiles(program, entryFile, sfParseOptions);

console.log(parsedSF);*/

const source = parse({
  debug: false,
  lazy: false,
  walk: false,
  nodeParseFn: parseDeclaration,
  sourcePath,
  pathHandlers
});

//console.log(source);

