import React, { useEffect, useState } from "react";
import "./Searchbox.scss";
import { getAppUrl, post, get } from "../../utils/request.util";

function Searchbox({ globalData, matchUrl, onClickEvent, fetchFunction }) {
  const [data, setData] = useState([...globalData]);
  const [search, setSearch] = useState("");
  function fetchData() {
    get(
      matchUrl,
      {
        Authorization: localStorage.getItem("token"),
      },
      function (response) {
        setData(response.data.data);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  function filterData(value) {
    setSearch(value);
    if (value === "") {
      setData(globalData);
      return;
    }
    const dataCopy = [...globalData];
    const filteredValues = dataCopy.filter((x) =>
      x.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredValues);
  }

  useEffect(() => {}, [data]);

  return (
    <div className="searchbox">
      <input
        placeholder="search..."
        onInput={(e) => (matchUrl ? fetchData() : filterData(e.target.value))}
      />
      <div className="suggestions">
        {search.length ? (
          data.map((d) => {
            return <div className="suggestion" onClick={() => onClickEvent(d.user_id)}>{d.name}</div>;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Searchbox;
