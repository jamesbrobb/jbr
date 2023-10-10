import * as ts from "typescript";
import {getText} from "../../utilities";
import {getExportedDeclarationsFromSource} from "../../declarations";


export type LocalMapElement = [kind: ts.SyntaxKind, node: ts.Declaration]
export type LocalMap = Map<string, LocalMapElement>


export function createLocalMap(program: ts.Program, sourceFile: ts.SourceFile): LocalMap {
  return new Map(
    getExportedDeclarationsFromSource(program, sourceFile)
      .map(node => [
        'name' in node && node.name? getText(node.name as any, sourceFile) : 'Name not found',
        [node.kind, node]
      ])
  );
}
