import * as ts from "typescript";

export function getText(node: ts.Node, sourceFile: ts.SourceFile): string {
  return ts.isStringLiteral(node) ? node.text : node.getText(sourceFile)
}
