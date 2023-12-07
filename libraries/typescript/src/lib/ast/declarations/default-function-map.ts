import * as ts from "typescript";

import {DeclarationParseFunctionMap} from "./declaration-types";
import {getImportClause, getImportDeclaration, getImportSpecifier, getNamedImports, getNamespaceImport} from "./kinds";
import {getText} from "../utilities";


export const defaultDeclarationFunctionMap: DeclarationParseFunctionMap = {
  [ts.SyntaxKind.ImportDeclaration]: getImportDeclaration,
  [ts.SyntaxKind.ImportClause]: getImportClause,
  [ts.SyntaxKind.NamedImports]: getNamedImports,
  [ts.SyntaxKind.ImportSpecifier]: getImportSpecifier,
  [ts.SyntaxKind.NamespaceImport]: getNamespaceImport,
  [ts.SyntaxKind.Identifier]: getText,
  [ts.SyntaxKind.StringLiteral]: getText
}
