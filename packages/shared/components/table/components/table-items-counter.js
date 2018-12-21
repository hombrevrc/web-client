import React from "react";

import { translate } from "react-i18next";

const ItemsCounter = ({
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

export default translate()(ItemsCounter);
