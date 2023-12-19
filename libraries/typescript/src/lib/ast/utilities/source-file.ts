import * as ts from 'typescript';
import {ParseNodeOptions, walkNodeTree} from "./node";
import {logResults} from "./log";


export function getSourceFile(program: ts.Program, sourcePath: string): ts.SourceFile {

  const sourceFile = program.getSourceFile(sourcePath);

  if(!sourceFile) {
    throw new Error(`No source file found for ${sourcePath} - if it\'s part of a library make sure it\'s exported in the public-api.ts file`);
  }

  return sourceFile;
}

export function convertSourceFileToSymbol(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): ts.Symbol | undefined {

  const typeChecker = program.getTypeChecker(),
    symbol = typeChecker.getSymbolAtLocation(sourceFile);

  if(!symbol && debug) {
    console.log(`No symbols found in ${sourceFile.fileName}`);
  }

  return symbol;
}

export function getExportedDeclarationsFromSource(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  debug: boolean = false
): ts.Declaration[] {

  const symbol = convertSourceFileToSymbol(program, sourceFile, debug),
    typeChecker = program.getTypeChecker();

  if(!symbol) {
    return [];
  }

  return typeChecker.getExportsOfModule(symbol)
    .map(value => value.declarations?.[0])
    .filter((declaration): declaration is ts.Declaration => !!declaration);
}


export function parseSourceFile<R = ts.Node>(program: ts.Program, sourceFile: ts.SourceFile, options?: ParseNodeOptions<R>): any[] | {} {

  const results = getExportedDeclarationsFromSource(program, sourceFile)
      .map(declaration => walkNodeTree(declaration, sourceFile, options));

  if(options?.debug) {
    logResults(results);
  }

  return results
}
