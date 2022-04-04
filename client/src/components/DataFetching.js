import axios from "axios";
import { useState, React, useEffect } from "react";

const Datafetching = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://picsum.photos/200/300")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("there is an error");
      });
  }, []);
  return (
    <div>
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Datafetching;
