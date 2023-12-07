import * as ts from "typescript";
import {PathConversionMap, PathConversionMapEntry} from "../../maps";
import {PathResolutionMap, PathResolutionMapEntry} from "../resolvers";
import {BasePathHandler} from "./path-handler";


const JBR_PATH_RESOLVER: PathResolutionMapEntry = [/^.*?\/jbr\/(?:dist\/)?libraries\/(?:@jbr\/)?(.*?)$/g, '@jbr/$1']
const JBR_PATH_CONVERTOR: PathConversionMapEntry<[ts.SyntaxKind]> = [/^@jbr\/([^\/]*)(?:\/src)?\/lib/g, 'libraries/$1']


export class JBRPathHandler extends BasePathHandler {
  override getPathResolutionMap(): PathResolutionMap {
    return [JBR_PATH_RESOLVER];
  }

  override getPathConversionMap(): PathConversionMap<[ts.SyntaxKind]> {
    return [JBR_PATH_CONVERTOR];
  }
}

