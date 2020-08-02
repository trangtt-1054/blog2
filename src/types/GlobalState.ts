import { TabInfo } from "./TabInfo"

export type State = {
  tabs: TabInfo[]
  theme: string
  pageIndex: number
  searchTerm: string
}
