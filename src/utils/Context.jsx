import { createContext,  useState } from "react";
// import axios from "./axios";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || null);
  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   setProducts();
  // }, []);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
