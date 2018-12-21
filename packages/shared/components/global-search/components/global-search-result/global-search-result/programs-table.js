import React from "react";
import { translate } from "react-i18next";
import { Table } from "shared/components/table/components";
import ProgramTableRowShort from "shared/modules/programs-table/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "shared/modules/programs-table/components/programs-table/programs.constants";

const ProgramsTable = ({ t, isPending, data, title }) => {
  return (
    <Table
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderHeader={column => (
        <span
          className={`programs-table__cell programs-table__cell--${
            column.name
          }`}
        >
          {t(`programs-page.programs-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={program => (
        <ProgramTableRowShort
          title={title}
          program={program}
          onExpandClick={() => {}}
        />
      )}
    />
  );
};

export default translate()(ProgramsTable);
