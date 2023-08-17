import store from "../store/store";
import { useEffect, useState } from "react";
import Data from "../data";
import { Link } from "react-router-dom";

export function Header() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  const updateState = () => {
    const totalCount = store
      .getState()
      .commonReducer.addedProductList.map((product) => product.count)
      .reduce((result, current) => {
        return result + current;
      }, 0);

    let newPrice = 0;
    store.getState().commonReducer.addedProductList.map((product) => {
      let value = Data.filter((item) => item.id === product.id)[0].price;
      newPrice += value * product.count;
      return newPrice;
    });
    setPrice(newPrice);
    setCount(totalCount);
  };

  store.subscribe(() => {
    updateState();
  });

  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-16 sm:h-20 bg-[#0029cd] flex sm:justify-center">
      <div className="font-bold mt-5 text-xl sm:text-3xl ml-3 sm:ml-9 text-[#ffffff]">
        Bakery Shop
      </div>
      <Link to="/cart">
        <div className="flex p-2 bg-green-700 rounded-lg h-12 sm:h-14 mt-2 sm:mt-3 absolute right-5">
          <img
            src="/images/shopping-cart.png"
            alt="Bucket"
            className=" w-[30px]"
          ></img>
          <button className=" ml-2 text-xs sm:text-sm font-semibold">
            {count === 0 ? (
              <div className="text-white">My Cart</div>
            ) : (
              <>
                <div className=" text-white">{count} items</div>
                <div className=" text-white">{price} Rs</div>
              </>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
}
