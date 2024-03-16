
export type NavConfig = NavItemNode[];

export type NavItemNode = {
  label: string
  path: string
  hasContent: boolean
  active: number
  children?: NavItemNode[]
}
