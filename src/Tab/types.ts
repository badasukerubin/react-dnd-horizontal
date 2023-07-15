export enum DragableType {
  Tab = "tab",
}

export interface Tab {
  id: number;
  rank: number;
  name: string;
}

export interface TabProps {
  index?: number;
  tab: Tab;
  reOrderTabs?: (dragRank: number, hoverRank: number) => void;
}
