import * as ts from "typescript";

import {DuplicatePathPrecedenceMap, PathResolutionMap} from "../resolvers";
import {IgnorePathsMap, PathConversionMap} from "../../maps";


export interface PathHandler<E extends unknown[]> {
  getIgnorePathsMap(): IgnorePathsMap
  getPathResolutionMap(): PathResolutionMap
  getDuplicatePathPrecedenceMap(): DuplicatePathPrecedenceMap
  getPathConversionMap(): PathConversionMap<E>
}


export class BasePathHandler<E extends unknown[] = [ts.SyntaxKind]> implements PathHandler<E> {
  getIgnorePathsMap(): IgnorePathsMap { return [] }
  getPathResolutionMap(): PathResolutionMap { return [] }
  getDuplicatePathPrecedenceMap(): DuplicatePathPrecedenceMap { return [] }
  getPathConversionMap(): PathConversionMap<E> { return [] }
}
