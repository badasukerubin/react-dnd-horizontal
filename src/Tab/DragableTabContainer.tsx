import { useCallback, useState } from "react";
import { Tab } from "./types";
import { TABS } from "./data";
import DragableTab from "./DragableTab";

export default function DragableTabContainer() {
  const [tabs, setTabs] = useState<Tab[]>(TABS);

  const reOrderTabs = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragTab = tabs[dragIndex];
      const hoverTab = tabs[hoverIndex];

      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        newTabs[dragIndex] = hoverTab;
        newTabs[hoverIndex] = dragTab;

        return newTabs;
      });
    },
    [tabs]
  );

  return (
    <div className="Tab-pane">
      {tabs?.map((tab, index) => (
        <DragableTab
          key={tab.id}
          index={index}
          reOrderTabs={reOrderTabs}
          tab={tab}
        />
      ))}
    </div>
  );
}
