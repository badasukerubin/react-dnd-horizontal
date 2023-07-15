import React, { memo } from "react";
import { TabProps } from "./types";

export default memo(function Tab({ tab }: TabProps) {
  return (
    <>
      <div className={`Tab`}>
        <span>{tab.name}</span>
      </div>
    </>
  );
});
