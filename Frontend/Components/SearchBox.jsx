import React, { useState } from "react";
import './SearchBox.css'
const SearchTable = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return; // prevent empty search

    try {
    const response = await fetch(`http://localhost:8000/employees/search?skill=${encodeURIComponent(query)}`);
    // const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-container-search">
      <div className="Searcharea">
        <input
          id="chat-input"
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Send</button>
      </div>

      <div className="container-search">
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Skills</th>
              <th>Experience Years</th>
              <th>Projects</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.ID}>
                  <td>{item.ID}</td>
                  <td>{item.Name}</td>
                  <td>{item.Skills}</td>
                  <td>{item["Experience Years"]}</td>
                  <td>{item.Projects}</td>
                  <td>{item.Availability}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchTable;
