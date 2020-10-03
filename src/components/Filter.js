import React from "react";

function Filter({ count, size, sort, setSize, setSort }) {
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className="filter">
      <div className="filter-result">{count} Products</div>
      <div className="filter-sort">
        Order
        <select value={sort} onChange={handleSort}>
          <option>Lastest</option>
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter
        <select value={size} onChange={handleSize}>
          <option value="All">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
