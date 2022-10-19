import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/react";

export default function Checkout() {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const { data } = useSession()

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="max-w-screen-2xl mx-auto lg:flex">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-xl border-b pb-4">
              {items.length === 0 
              ? 'Your Amazon Basket is empty!' 
              : 'Your Shopping Basket'}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">Subtotal({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="BRL" />
                </span>
              </h2>

              <button disabled={!data} className={`button mt-2 ${!data && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300'}`}>
                {!data ? 'Sign in to Checkout' : 'Proceed to Checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
