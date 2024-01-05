import {DuplicatePathPrecedenceMap, PathResolutionMap} from "../resolvers";
import {IgnorePathsMap, PathConversionMap} from "../../maps";


export interface PathHandler {
  getIgnorePathsMap(): IgnorePathsMap
  getPathResolutionMap(): PathResolutionMap
  getDuplicatePathPrecedenceMap(): DuplicatePathPrecedenceMap
  getPathConversionMap(): PathConversionMap
}


export class BasePathHandler implements PathHandler {
  getIgnorePathsMap(): IgnorePathsMap { return [] }
  getPathResolutionMap(): PathResolutionMap { return [] }
  getDuplicatePathPrecedenceMap(): DuplicatePathPrecedenceMap { return [] }
  getPathConversionMap(): PathConversionMap { return [] }
}
