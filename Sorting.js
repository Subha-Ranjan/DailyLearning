import { useState } from "react";

function Sorting() {
  let data = [];
  for (let i = 1; i <= 105; i++) {
    data.push({
      id: `${i}`,
      name: `Subha${i}`,
      age: `1${i}`,
      email: `subha${i}@gmail.com`,
    });
  }

  //We'll map this array to print the <thead></thead>
  const columns = ["id", "name", "age", "email"];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null); //Ascending or Descending

  // Function to handle sorting
  // column parameter = "id"|| "name" || "age" || "email"
  // On clicking any of the columns heading, it'll sort the data
  // in ascending or descending order for any of the columns
  const handleSort = (column) => {
    // to manually set the order in ascending/descending
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // by default the sorting order will be ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Helper function to filter the data based on the search term
  const filterData = (data) => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  //Sortng the filteredData or normal data in ascending or descending order
  // a.sortColumn< b.sortColumn {return -1} ====> ascending [1, 3, 5, 7]
  // a.sortColumn> b.sortColumn {return +1} ====> descending [7,5,3,1]
  // otherwise {return 0}
  const sortedData = sortColumn
    ? filterData(data).sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : filterData(data);
  //=========================Pagination Section=================================================

  //no of page will change based on Searching/Sorting/Category Selection
  // Get total number of pages
  // sorted data can be manually sorted data or the default searchdata
  // Suppose sortdData.length = 20, itemsPerPage =4
  // totalPages =  Math.ceil(30/4) = 5
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Helper function to generate pagination buttons
  const generatePaginationButtons = () => {
    const visibleButtons = 7; // Number of visible buttons
    // totalButtons = Math.min(7, 5)====> 5
    const totalButtons = Math.min(visibleButtons, totalPages);
    // startPage=Math.max(1-Math.floor(5/2),1)=1
    let startPage = Math.max(currentPage - Math.floor(totalButtons / 2), 1);
    // startPage value will be half away previous from the current page, based on the visible buttons
    // startPage = Math.max(14 -m.floor(7/2),1)
    // if currentPage is page 2, then startPage will be of negetive value(-1) which is not feasible.
    // In those cases, startPage value will be 1. Math.max will consider positive +1 instead of -ve value.

    // if startPage= 11, currentpage page is 15, visiblePage=7. endPage=11+7-1=17
    const endPage = startPage + totalButtons - 1;

    // if endPage is 17, and total pages are 14, then startPage will be more than 1 which will be a dynamic value
    if (endPage > totalPages) {
      startPage = Math.max(totalPages - totalButtons + 1, 1);
    }

    return Array.from(
      { length: totalButtons },
      (_, index) => startPage + index
    );
  };

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Change items per page
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <div className="container">
      <h3>React Js Table with pagination and search and sorting</h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="data-table">
        {" "}
        {/* Added className to table element */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} onClick={() => handleSort(column)}>
                {column}
                {sortColumn === column && (
                  <span>
                    {sortDirection === "asc" ? <>&uarr;</> : <>&darr;</>}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="data-cell">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="page-button"
        >
          Previous
        </button>
        {generatePaginationButtons().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal",
            }}
            className="page-button" // Added className to button element
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="page-button" // Added className to button element
        >
          Next
        </button>
        <label>
          Items per page:
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
            className="items-per-page-select" // Added className to select element
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Sorting;
