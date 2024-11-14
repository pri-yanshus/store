import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
// import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const changeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      // product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every field must be at least 4 characters");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...product[pi], ...product };
    setProducts(copyData);

    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
  };
  console.log(products);
  return (
    <form
      onSubmit={AddProductHandler}
      className="p-[5%] w-screen h-screen flex flex-col items-center"
    >
      <h1 className="text-3xl w-1/2 mb-5">Add New Product</h1>
      <input
        type="url"
        placeholder="Image Url"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        name="description"
        onChange={changeHandler}
        value={product && product.description}
        placeholder="enter product description here..."
        className="text-1xl bg-zinc-100 rounded p-3 w-[50%] mb-3"
        rows="5"
      ></textarea>
      <div className="w-1/2">
        <button className="self-start py-2 px-5 border rounded border-blue-200 text-blue-300">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
