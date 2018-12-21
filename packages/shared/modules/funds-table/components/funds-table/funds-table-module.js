import "./funds-table.scss";

import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Table } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";

import FundsTableRow from "./fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

const FundsTableModule = ({
  t,
  data,
  isPending,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated,
  title,
  itemsName
}) => {
  return (
    <Table
      itemsName={itemsName}
      title={title}
      sorting={sorting}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={FUNDS_TABLE_COLUMNS}
      items={data.funds}
      isPending={data.isPending}
      renderFilters={() => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.fund-start")}
          />
        </Fragment>
      )}
      renderHeader={column => {
        if (!isAuthenticated && column.name === "favorite") return null;
        return (
          <span
            className={`funds-table__cell funds-table__cell--${column.name}`}
          >
            {t(`funds-page.funds-header.${column.name}`)}
          </span>
        );
      }}
      renderBodyRow={fund => (
        <FundsTableRow
          title={title}
          fund={fund}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  );
};

export default translate()(FundsTableModule);
