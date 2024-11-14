import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "../utils/axios";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";

function Details() {
  const navigate = useNavigate()
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);


  const { id } = useParams();
  // const  getSingleProduct = async () => {
  //   try {
  //     const {data} = await axios.get(`/products/${id}`)
  //     setProduct(data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
    // getSingleProduct();
  }, []);

  const ProductDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    navigate(`/`);
  };

  return product ? (
    <div className="flex w-[70%] h-full m-auto  justify-center items-center p-[10%]">
      <img
        className="object-contain w-[40%] h-[80%] mr-10"
        src={`${product.image}`}
        alt="product-image"
      />
      <div className="content">
        <h1 className="text-3xl">{`${product.title}`}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 my-5">${product.price}</h2>
        <p className="text-sm mb-[5%]">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300">
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className="py-2 px-5 border rounded border-red-200 text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
