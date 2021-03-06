import "./pager.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

class Pager extends PureComponent {
  generateVisiblePages = (first, count) => {
    const pages = [];
    for (let i = first; i < first + count; i++) pages.push(i);
    return pages;
  };

  render() {
    const { total, current, countVisiblePages, onPageChanged } = this.props;
    const handleChange = page => () => onPageChanged(page);
    const PagerSeparator = () => <div className="pager__separator">...</div>;
    const PagerButton = ({ page, label }) => (
      <div
        className={classNames("pager__button", {
          "pager__button--current": page === current
        })}
        onClick={handleChange(page)}
      >
        {label || page}
      </div>
    );
    const half = Math.floor(countVisiblePages / 2);
    const firstPage =
      (current <= half + 1 && 1) ||
      (current >= total - half && total - countVisiblePages + 1) ||
      current - half;

    const visiblePages = this.generateVisiblePages(
      firstPage,
      countVisiblePages
    );
    return (
      <div className="pager">
        {firstPage > 1 && (
          <div className="pager__pager-block">
            <PagerButton page={1} />
            {firstPage > 2 && <PagerSeparator />}
          </div>
        )}
        <div className="pager__pager-block">
          {visiblePages
            .filter(page => page <= total)
            .map(page => (
              <PagerButton key={page} page={page} />
            ))}
        </div>
        {total - firstPage >= countVisiblePages && (
          <div className="pager__pager-block">
            {total - firstPage > countVisiblePages && <PagerSeparator />}
            <PagerButton page={total} />
          </div>
        )}
      </div>
    );
  }
}

Pager.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  countVisiblePages: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired
};

export default translate()(Pager);
