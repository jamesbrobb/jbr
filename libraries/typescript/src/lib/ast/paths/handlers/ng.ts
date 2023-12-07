import * as ts from "typescript";
import {IgnorePathsMap, PathConversionMap, PathConversionMapEntry} from "../../maps";
import {BasePathHandler} from "./path-handler";


export const NG_PATH_CONVERTOR: PathConversionMapEntry<[ts.SyntaxKind]> = [/^@angular\/(.*?)$/g, 'https://angular.io/api/$1/$importName']


export class NgPathHandler extends BasePathHandler {

  override getIgnorePathsMap(): IgnorePathsMap {
    return [/^(?!.*@angular).*?\/index((\.d)*?\.ts)*?$/g]
  }

  override getPathConversionMap(): PathConversionMap<[ts.SyntaxKind]> {
    return [NG_PATH_CONVERTOR];
  }
}
