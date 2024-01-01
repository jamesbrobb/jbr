import * as ts from 'typescript';


export type PathReplacementFn = (name: string, modulePath: string, kind: ts.SyntaxKind) => string;
export type PathConversionMapEntry = [pathMatch: string | RegExp, replacement: string | PathReplacementFn]
export type PathConversionMap = PathConversionMapEntry[];


export function convertPath(name: string, modulePath: string, kind: ts.SyntaxKind, pathConversionMap: PathConversionMap): string {

  let convertedPath = modulePath;

  pathConversionMap.forEach((value) => {
    let [pathMatch, replacement] = value;

    if(typeof replacement === 'function') {
      replacement = replacement(name, modulePath, kind);
    }

    convertedPath = convertedPath.replace(pathMatch, replacement)
      .replace('$name', name);
  });

  return convertedPath;
}
