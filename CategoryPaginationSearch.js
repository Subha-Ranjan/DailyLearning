// CategoryPaginationSearch

import { useState } from "react";
import React from "react";

function CategoryPaginationSearch() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

// Category
  const categories = [
    "All",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
  ];

// line : Data for the table
let items = []
for (let i = 1; i < 25; i++) {
  items.push({id: `first${i}`, name: `last${i}`,
  category: `abc${i}@gmail.com`});
}
console.log(items);

//line: Function to filter items based on the selected category and search query
  const filterItems = (category, search) => {
    const lowerCaseSearchQuery = search.toLowerCase();
    return items.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      return (
        (category === "All" || item.category === category) &&
        lowerCaseName.includes(lowerCaseSearchQuery)
      );
    });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const filteredItems = filterItems(selectedCategory, searchQuery);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h3 className="main-heading">
        React js Filter by Category and Pagination with Search
      </h3>
      <div className="filter-search-container">
        <div className="filter-container">
          <label htmlFor="category-filter">Filter by category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="search-container">
          <label htmlFor="search-input">Search:</label>
          <input
            type="text"
            id="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Name"
          />
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th className="column-header">Id</th>
            <th className="column-header">Developer Name</th>
            <th className="column-header">Category</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id} className="data-row">
              <td className="data-cell">{item.id}</td>
              <td className="data-cell">{item.name}</td>
              <td className="data-cell">{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryPaginationSearch;
