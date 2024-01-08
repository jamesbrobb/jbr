
export type ImportsMapMapAdditionalProps = {[key: PropertyKey]: unknown}

export type ImportsMapElement<O extends ImportsMapMapAdditionalProps = {}> = {
  name: string
  module: string
  resolvedModulePath: string
  convertedModulePath?: string
} & O

export type ImportsMap<O extends ImportsMapMapAdditionalProps = {}> = ImportsMapElement<O>[]
