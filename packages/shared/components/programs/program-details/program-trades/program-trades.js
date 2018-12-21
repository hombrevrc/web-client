import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import moment from "moment";
import * as PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import {
  PROGRAM_TRADES_COLUMNS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "shared/components/programs/program-details/program-details.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatValue } from "shared/utils/formatter";

class ProgramTrades extends Component {
  fetchProgramTrades = filters => {
    const { currency, programId, fetchTrades } = this.props;
    return fetchTrades(programId, filters, currency);
  };

  render() {
    const { t } = this.props;

    return (
      <TableModule
        itemsName={"program-details-page.history.items-name.trades"}
        getItems={this.fetchProgramTrades}
        defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
        filtering={PROGRAM_TRADES_FILTERS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
        )}
        paging={DEFAULT_PAGING}
        columns={PROGRAM_TRADES_COLUMNS}
        renderHeader={column => (
          <span
            className={`details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`program-details-page.history.trades.${column.name}`)}
          </span>
        )}
        renderBodyRow={trade => (
          <TableRow className="details-trades__row">
            <TableCell className="details-trades__cell program-details-trades__cell--direction">
              <BaseProfitability
                isPositive={trade.direction === "Buy"}
                isNegative={trade.direction === "Sell"}
              >
                {trade.direction}
              </BaseProfitability>
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--symbol">
              {trade.symbol}
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--volume">
              <NumberFormat
                value={formatValue(trade.volume)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--price">
              <NumberFormat
                value={formatValue(trade.price)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--profit">
              <Profitability value={+formatValue(trade.profit)} prefix="sign">
                <NumberFormat
                  value={formatValue(trade.profit, null, true)}
                  thousandSeparator=" "
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--date">
              {moment(trade.date).format("DD-MM-YYYY, hh:mm a")}
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--ticket">
              {trade.ticket}
            </TableCell>

            <TableCell className="details-trades__cell program-details-trades__cell--entry">
              {trade.entry}
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

ProgramTrades.propTypes = {
  programId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  fetchTrades: PropTypes.func.isRequired
};

export default translate()(ProgramTrades);
