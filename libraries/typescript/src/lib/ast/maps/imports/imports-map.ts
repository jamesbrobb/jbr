import {ParseNodeFunc} from "../../utilities";
import {PathResolutionMap} from "../../paths";
import {Import} from "../../declarations";


export type ImportsMapElement = [importName: string, importModule: string]
export type ImportsMapElementExtended<R extends unknown[] = []> = [...args: ImportsMapElement, ...rest: R]
export type ImportsMap<E extends unknown[]> = ImportsMapElementExtended<E>[]

export type ImportsMapOptions = {
  debug?: boolean
  nodeParseFn?: ParseNodeFunc<Import>,
  pathResolutionMap?: PathResolutionMap
}
