import React from "react";

import Paging from "./paging/paging";
import { translate } from "react-i18next";

const Items = ({
  totalPages,
  currentPage,
  itemsOnPage,
  totalItems,
  itemsName = "",
  t
}) => {
  if (!totalItems) return null;
  const from = (currentPage - 1) * itemsOnPage + 1;
  const to = Math.min(currentPage * itemsOnPage, totalItems);
  return (
    <span
      style={{
        letterSpacing: 0.56,
        color: "rgba(232, 239, 243, 0.4)",
        fontSize: 14
      }}
    >
      {`Showing ${from}-${to} of ${totalItems} `}
      {t(itemsName, { count: 0 })}
    </span>
  );
};

const ItemsCounter = translate()(Items);

const TableFooter = ({ isPending, paging, updatePaging, itemsName }) => {
  if (paging.totalPages <= 1) return null;

  return (
    <div className="table__footer">
      <ItemsCounter {...paging} itemsName={itemsName}/>
      <Paging
        paging={{ total: paging.totalPages, current: paging.currentPage }}
        hide={isPending}
        updatePaging={next => updatePaging(next.currentPage)}
      />
    </div>
  );
};

export default TableFooter;
