import {PathHandler} from "./handlers/path-handler";
import {IgnorePathsMap, PathConversionMap} from "../maps";
import {DuplicatePathPrecedenceMap, PathResolutionMap} from "./resolvers";


export type MapBuilderMaps<E extends unknown[]> = {
  ignoreMap: IgnorePathsMap
  duplicatePrecedenceMap: DuplicatePathPrecedenceMap
  pathResolutionMap: PathResolutionMap
  pathConversionMap: PathConversionMap<E>
}


export function buildMaps<E extends unknown[]>(...pathHandlers: PathHandler<E>[]): MapBuilderMaps<E> {

  const maps: MapBuilderMaps<E> = {
    ignoreMap: [],
    duplicatePrecedenceMap: [],
    pathResolutionMap: [],
    pathConversionMap: []
  }

  pathHandlers.forEach((handler) => {
    maps.ignoreMap = maps.ignoreMap.concat(handler.getIgnorePathsMap())
    maps.duplicatePrecedenceMap = maps.duplicatePrecedenceMap.concat(handler.getDuplicatePathPrecedenceMap())
    maps.pathResolutionMap = maps.pathResolutionMap.concat(handler.getPathResolutionMap())
    maps.pathConversionMap = maps.pathConversionMap.concat(handler.getPathConversionMap())
  })

  return maps;
}
