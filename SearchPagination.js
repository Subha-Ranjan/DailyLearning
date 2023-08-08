import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchPagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //
  const itemsPerPage = 4; //no of items in the table
  const [loading, setLoading] = useState(true); //until n unless data reaches to the table
  const [searchQuery, setSearchQuery] = useState(""); //Serach content

  //line 19-32: to fillup the results in data array
  useEffect(() => {
    fetchData(); //to fetch data from the api and store it to 'data' array
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  //line : to filter out the results from 'data' array
  const filteredData = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  //line 39-46: getting range of items for each page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage); //total no of pages based on dataLength & itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage; // 1*4 = 4
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 4-4= 0
  const currentItems = loading
    ? []
    : filteredData.slice(indexOfFirstItem, indexOfLastItem); // .slice(0,4)===> a[0]-a[3], a[4]-a[7], a[8]-a[11] ....
  //console.log(currentItems);

  //line :change the page number to show the items of that particular page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //line: to show the items of the next page
  const handleNextPage = () => {
    setCurrentPage(
      (prevPage) => (prevPage >= totalPages ? prevPage : prevPage + 1)
      //      5           8           5             6
    );
  };

  //line: to show the items of the previous page
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage <= 1 ? prevPage : prevPage - 1));
  };

  //line : to handle the search - when we will start searching with something
  //       and suppose there are 5 matches(5 items),sice we are showing 4 tems per page
  //       so for the page no 1 will contain 4 items and page no 2 will contain 1 item.
  //       So basically there will be total 2 pages. In order to show those 2 pages,
  //       again the 'currentPage' will be set to page no 1 :
  //       const [currentPage, setCurrentPage] = useState(1);
  //       and the same rendering logic will start again.

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1 className="main-heading">
        React Js Table with Search and Pagination
      </h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by title or description..."
        className="search-input"
      />

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="column-header">ID</th>
                    <th className="column-header">Title</th>
                    <th className="column-header">Description</th>
                    <th className="column-header">Thumbnail</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(
                    //(a[0]-a[3] => a[0],a[1],a[2],a[3])
                    (
                      item //item == a[0] ===> {id: 1, title: 'Tree Oil 30ml', description: 'Tea tree oil, thumbnail:"..." }
                    ) => (
                      <tr key={item.id} className="data-row">
                        <td className="data-cell">{item.id}</td>
                        <td className="data-cell">{item.title}</td>
                        <td className="data-cell">{item.description}</td>
                        <td className="data-cell">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            width="50"
                            height="50"
                            className="thumbnail-image"
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              {/* for the Previous Button */}
              <div className="pagination-buttons">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="pagination-button"
                >
                  Previous
                </button>

                {/* for the Numbered-Buttons (from 1 to 8) */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pagination-button ${
                      index + 1 === currentPage ? "selected" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* for the Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchPagination;
