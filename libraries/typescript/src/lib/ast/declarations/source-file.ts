import * as ts from 'typescript';

export function convertSourceFileToSymbol(program: ts.Program, sourceFile: ts.SourceFile): ts.Symbol | undefined {

  const typeChecker = program.getTypeChecker(),
    symbol = typeChecker.getSymbolAtLocation(sourceFile);

  if(!symbol) {
    console.log(`No symbols found in ${sourceFile.fileName}`);
  }

  return symbol;
}

export function getExportedDeclarationsFromSource(program: ts.Program, sourceFile: ts.SourceFile): ts.Declaration[] {

  const symbol = convertSourceFileToSymbol(program, sourceFile),
    typeChecker = program.getTypeChecker();

  if(!symbol) {
    return [];
  }

  return typeChecker.getExportsOfModule(symbol)
    .map(value => value.declarations?.[0])
    .filter((declaration): declaration is ts.Declaration => !!declaration);
}
