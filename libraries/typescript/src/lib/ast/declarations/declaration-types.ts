import * as ts from 'typescript';
import {DeclarationKind} from "./declaration-kind";
import {Import, ImportClause, ImportSpecifier, NamedImports, NamespaceImport} from "./kinds";


type SyntaxKindToTSNodeTypeMap = {
  [ts.SyntaxKind.ImportDeclaration]: ts.ImportDeclaration
  [ts.SyntaxKind.ImportClause]: ts.ImportClause
  [ts.SyntaxKind.NamespaceImport]: ts.NamespaceImport
  [ts.SyntaxKind.NamedImports]: ts.NamedImports
  [ts.SyntaxKind.ImportSpecifier]: ts.ImportSpecifier
  [ts.SyntaxKind.Identifier]: ts.Identifier
  [ts.SyntaxKind.StringLiteral]: ts.StringLiteral
}

type SyntaxKindToDeclarationTypeMap = {
  [ts.SyntaxKind.ImportDeclaration]: Import
  [ts.SyntaxKind.ImportClause]: ImportClause
  [ts.SyntaxKind.NamespaceImport]: NamespaceImport
  [ts.SyntaxKind.NamedImports]: NamedImports
  [ts.SyntaxKind.ImportSpecifier]: ImportSpecifier
  [ts.SyntaxKind.Identifier]: string
  [ts.SyntaxKind.StringLiteral]: string
}

type SyntaxKinds = `${ts.SyntaxKind}` extends `${infer T extends number}` ? T : never;

////////////////////////////////////////////////////////////////////////////////////////

export type Declaration<K extends DeclarationKind> = {
  kind: K
}

export type SyntaxKindToTypeMap<V> = {[key in SyntaxKinds]?: V}
export type GetTypeForSyntaxKind<K extends SyntaxKinds, M extends SyntaxKindToTypeMap<unknown>> = M[K]
export type GetTSNodeTypeForSyntaxKind<K extends SyntaxKinds> = GetTypeForSyntaxKind<K, SyntaxKindToTSNodeTypeMap>
export type GetDeclarationTypeForSyntaxKind<K extends SyntaxKinds> = GetTypeForSyntaxKind<K, SyntaxKindToDeclarationTypeMap>

export type GetDeclarationFn<K extends SyntaxKinds> =
  (node: GetTSNodeTypeForSyntaxKind<K>, sourceFile: ts.SourceFile) => GetDeclarationTypeForSyntaxKind<K>

export type DeclarationParseFunctionMap = {[key in SyntaxKinds]?: GetDeclarationFn<key>}
