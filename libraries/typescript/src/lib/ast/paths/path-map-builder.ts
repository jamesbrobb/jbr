import {PathHandler} from "./handlers";
import {IgnorePathsMap, PathConversionMap} from "../maps";
import {DuplicatePathPrecedenceMap, PathResolutionMap} from "./resolvers";


export type PathParserMaps<E extends unknown[]> = {
  ignorePathsMap: IgnorePathsMap
  duplicatePathPrecedenceMap: DuplicatePathPrecedenceMap
  pathResolutionMap: PathResolutionMap
  pathConversionMap: PathConversionMap<E>
}


export function buildPathMaps<E extends unknown[]>(...pathHandlers: PathHandler<E>[]): PathParserMaps<E> {

  const maps: PathParserMaps<E> = {
    ignorePathsMap: [],
    duplicatePathPrecedenceMap: [],
    pathResolutionMap: [],
    pathConversionMap: []
  }

  pathHandlers.forEach((handler) => {
    maps.ignorePathsMap = maps.ignorePathsMap.concat(handler.getIgnorePathsMap())
    maps.duplicatePathPrecedenceMap = maps.duplicatePathPrecedenceMap.concat(handler.getDuplicatePathPrecedenceMap())
    maps.pathResolutionMap = maps.pathResolutionMap.concat(handler.getPathResolutionMap())
    maps.pathConversionMap = maps.pathConversionMap.concat(handler.getPathConversionMap())
  })

  return maps;
}
