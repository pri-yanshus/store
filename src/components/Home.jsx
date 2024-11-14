import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
// import axios from "../utils/axios";
import Loading from "./Loading";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  // let filteredProducts = products && products;
  const [filteredProducts, setFilteredProducts] = useState(null);

  // const getProductsCategory = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/category/${category}`);
  //     console.log(data);
  //     setFilteredProducts(data);
  //     // filteredProducts = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!filteredProducts || category == "undefined")
      setFilteredProducts(products);
    if (category != "undefined")
      setFilteredProducts(products.filter((p) => p.category == category));
  }, [category, products]);

  console.log(filteredProducts);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-6 pt-[5%] flex flex-wrap overflow-y-auto overflow-x-hidden">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              key={i}
              to={`/details/${p.id}`}
              className="card mr-3 mb-3 p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 h-full w-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-200 text-sm">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
