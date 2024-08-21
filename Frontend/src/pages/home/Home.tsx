import { useEffect } from "react";
import Card from "../../globals/components/card/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hero from "./components/Hero";
import { fetchProducts } from "../../store/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { status, product } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(product);
  return (
    <>
      <Hero />
      <div>
        <h1 className="text-3xl text-black font-bold text-center mt-4">
          Top products:
        </h1>
        <div className=" flex justify-center">
          {product.length > 0 &&
            product.map((pd) => {
              return <Card key={pd.id} data={pd} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
