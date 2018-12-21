import React from "react";

import Paging from "./paging/paging";
import ItemsCounter from "shared/components/table/components/table-items-counter";

const TableFooter = ({ isPending, paging, updatePaging, itemsName }) => {
  if (paging.totalPages <= 1) return null;

  return (
    <div className="table__footer">
      <ItemsCounter {...paging} itemsName={itemsName} />
      <Paging
        paging={{ total: paging.totalPages, current: paging.currentPage }}
        hide={isPending}
        updatePaging={next => updatePaging(next.currentPage)}
      />
    </div>
  );
};

export default TableFooter;
