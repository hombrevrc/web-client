import React from "react";
import FilterBadge from "../../../../../filter-pane/components/filter-badge/filter-badge";
import FilterBadgeButton from "../../../../../filter-pane/components/filter-badge/filter-badge-button";

const ProgramActiveFilterList = ({ filters, openFilterPane, clearFilters }) => {
  const showFilterActions = filters.length > 0;
  return (
    <div>
      {filters.map(x => <FilterBadge key={x} filter={x} />)}
      <FilterBadgeButton text="Add New" onClick={openFilterPane} />
      {showFilterActions && (
        <FilterBadgeButton text="Clear All" onClick={clearFilters} />
      )}
    </div>
  );
};

export default ProgramActiveFilterList;