import "../App.css";
import store from "../store/store";
import { useState, useEffect } from "react";
import * as ActionTypes from "../store/actions/actionTypes";
import Data from "../data.json";
import { Header } from "./header";

function Card({ id, name, image, price, category, description }) {
  const [index, setIndex] = useState(-1);

  // store subscribe called when store update
  store.subscribe(() => {
    const findIndex = store
      .getState()
      .commonReducer.addedProductList.findIndex((product) => product.id === id);
    setIndex(findIndex);
  });

  useEffect(() => {
    const findIndex = store
      .getState()
      .commonReducer.addedProductList.findIndex((product) => product.id === id);
    setIndex(findIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=" w-[280px] rounded-md relative  border-[1px] border-gray-300 mx-auto hover:transform hover:scale-[1.02] card-item">
        <img src={image} alt={name} className="w-full"></img>
        <h1 className="font-bold mt-4 text-lg">{name}</h1>
        <div className=" text-red-500 font-semibold mt-4 mb-10">
          {price} Rs.
        </div>

        <button
          className={`border-[1px] absolute top-[375px]  left-[75px] border-gray-300 p-3 rounded-lg ${
            index === -1
              ? "bg-white text text-red-400 "
              : " bg-slate-400 text-black"
          }`}
          disabled={index === -1 ? false : true}
          onClick={() => {
            store.dispatch({
              type: ActionTypes.ADD_TO_CART,
              payload: { id: id },
            });
          }}
        >
          {index === -1 ? "Add To Cart" : "In the cart"}
        </button>
      </div>
    </>
  );
}

function Home() {
  const products = Data.map((product) => {
    return (
      <Card
        key={product.id}
        id={product.id}
        name={product.name}
        image={product.image}
        price={product.price}
        category={product.category}
        description={product.description}
      />
    );
  });

  return (
    <div>
      <Header />
      <div className=" text-center">
        <h1 className=" font-bold text-lg sm:text-2xl mb-5 mt-5">
          New Products
        </h1>

        <div className="gap-10 gap-y-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto w-5/6">
          {products}
        </div>
        <h1 className="my-[50px] font-semibold">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/rohit-jain28/"
            className=" underline text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            Rohit Jain
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Home;
