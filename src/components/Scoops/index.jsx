import { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";

const Scoops = () => {
  const [scoopData, setScoopData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/scoops")
      .then((res) => setScoopData(res.data));
  }, []);
  return (
    <div className="container my-5">
      <h1>Ice Cream Varieties</h1>
      <p>
        <span className="text-success">$5</span> each
      </p>
      <h3>
        Varieties Fee:{" "}
        <span className="text-success"> $ {basket.length * 5} </span>
      </h3>
      <div className="row gap-5 p-3 justify-content-around mt-3">
        {scoopData.map((i) => (
          <Card key={i.name} data={i} basket={basket} setBasket={setBasket} />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
