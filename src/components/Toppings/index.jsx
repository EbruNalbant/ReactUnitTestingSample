import axios from "axios";
import { useEffect, useState } from "react";

const Toppings = () => {
  const [toppingData, setToppingData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/toppings")
      .then((res) => setToppingData(res.data));
  }, []);

  // her sos seçildiğinde çalışır
  const handleChange = (e, data) => {
    e.target.checked
      ? setBasket([...basket, data])
      : setBasket(basket.filter((i) => i.name !== data.name));
  };

  return (
    <div className="container">
      <h1>Sauce Varieties</h1>
      <p>
        <span className="text-success">$2</span> each
      </p>
      <h3>
        Sauces Fee: <span className="text-success">${basket.length * 2}</span>{" "}
      </h3>
      <div className="row gap-3 mt-4 justify-content-around ">
        {toppingData.map((data) => (
          <div
            key={data.name}
            className="d-flex flex-column align-items-center border py-3 rounded-5 top-card"
            style={{ width: "150px" }}
          >
            <label
              className="d-flex flex-column align-items-center gap-3"
              htmlFor={data.name}
            >
              <img height={100} src={data.imagePath} alt="sauce-image" />
              <p className="text-center text-nowrap">{data.name}</p>
            </label>
            <input
              onChange={(e) => handleChange(e, data)}
              id={data.name}
              className="form-check-input"
              type="checkbox"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
