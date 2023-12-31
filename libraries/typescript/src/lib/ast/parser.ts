import * as ts from "typescript";
import * as path from "path";

import {SourceFileDeclaration} from "./declarations/kinds/source-file";
import {buildPathMaps, PathParserMaps, PathHandler} from "./paths";
import {createProgram, getParsedTSConfig, getSourceFile, parseSourceFile, parseSourceFiles} from "./utilities";
import {createSourceFileMap} from "./maps";


export type ParseOptions = {
  pathHandlers?: PathHandler<any>[],
  sourcePath?: string,
  walk?: boolean,
  lazy?: boolean,
  debug?: boolean
}


export function parse(options?: ParseOptions): SourceFileDeclaration[] | SourceFileDeclaration {

  const config = getParsedTSConfig(),
    entryFile = config.fileNames[0],
    program = createProgram(entryFile, config.options);

  const pathHandlers = options?.pathHandlers || [],
    pathMaps: PathParserMaps<[ts.SyntaxKind]> = buildPathMaps(...pathHandlers);

  const dependenciesMap = createSourceFileMap(program, {
    debug: false,
    ...pathMaps
  });

  // Import map needs to be created in parse source file?

  const sfParseOptions = {
    debug: options?.debug,
    lazy: options?.lazy
  }

  if(options?.sourcePath && !options?.walk) {
    return parseSourceFile(program, options.sourcePath, sfParseOptions)
  }

  return parseSourceFiles(program, options?.sourcePath || entryFile, sfParseOptions);
}
