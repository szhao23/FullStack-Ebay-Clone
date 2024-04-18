"use client";

import CheckoutItem from "../components/CheckoutItem";
import MainLayout from "../layouts/MainLayout";
import { useRef, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "./../context/user";
import { useCart } from "../context/cart";
import { useRouter } from "next/navigation";
import useIsLoading from "./../hooks/useIsLoading";
import { toast } from "react-toastify";
import useUserAddress from "../hooks/useUserAddress";

export default function Checkout() {
  const user = useUser();
  const cart = useCart();
  const router = useRouter();

  let stripe = useRef(null);
  let elements = useRef(null);
  let card = useRef(null);
  let clientSecret = useRef(null);

  const [addressDetails, setAddressDetails] = useState({});
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  useEffect(() => {
    if (cart?.cartTotal() <= 0) {
      toast.error("Your cart is empty!", { autoClose: 3000 });
      // Redirect to Home Page
      return router.push("/");
    }

    useIsLoading(false);

    const getAddress = async () => {
      if (user?.id == null || user?.id == undefined) {
        useIsLoading(false);
        return;
      }

      setIsLoadingAddress(true);
      const response = await useUserAddress();
      if (response) setAddressDetails(response);
      setIsLoadingAddress(false);
    };

    getAddress();
    setTimeout(() => stripeInit(), 300);
  }, [user]);

  const stripeInit = async () => {
    stripe.current = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PK_KEY || ""
    );

    const response = await fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({ amount: cart.cartTotal() }),
    });
    const result = await response.json();

    console.log("Client Secret: ", result.client_secret);

    clientSecret.current = result.client_secret;
    elements.current = stripe.current.elements();
    var style = {
      base: { fontSize: "18px" },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#EE4B2B",
        iconColor: "#EE4B2B",
      },
    };
    card.current = elements.current.create("card", {
      hidePostalCode: true,
      style: style,
    });

    card.current.mount("#card-element");
    card.current.on("change", function (event) {
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error
        ? event.error.message
        : "";
    });

    useIsLoading(false);
  };

  return (
    <>
      <MainLayout>
        <div id="CheckOutPage" className="mt-4 max-w-[1100px] mx-auto">
          <div className="text-2xl font-bold mt-4 mb-4">Checkout</div>

          <div className="relative flex items-baseline gap-4 justify-between mx-auto w-full">
            <div className="w-[65%]">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-xl font-semibold mb-2">
                  Shipping Address
                </div>

                <div>
                  <ul className="text-sm mt-2">
                    <li>Name: Test</li>
                    <li>Address: Test</li>
                    <li>Zipcode: Test</li>
                    <li>City: Test</li>
                    <li>Country: Test</li>
                  </ul>
                </div>
              </div>

              <div id="Items" className="bg-white rounded-lg mt-4">
                {cart.getCart().map((product) => (
                  <CheckoutItem key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div
              id="PlaceOrder"
              className="relative -top-[6px] w-[35%] border rounded-lg"
            >
              <div className="p-4">
                <div className="flex items-baseline justify-between text-sm mb-1">
                  <div>Items (3)</div>
                  <div>$12.99</div>
                </div>
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div>Shipping:</div>
                  <div>Free</div>
                </div>

                <div className="border-t">
                  <div className="flex items-center justify-between my-4">
                    <div className="font-semibold">Order Total</div>
                    <div className="text-2xl font-semibold">$12.99</div>
                  </div>
                </div>

                <form>
                  <div
                    className="border border-gray-500 p-2 rounded-sm"
                    id="card-element"
                  />

                  <p
                    id="card-error"
                    role="alert"
                    className="text-red-700 text-center font-semibold relative top-2"
                  />

                  <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-lg w-full text-white font-semibold p-3 rounded-full"
                  >
                    Confirm and Pay
                  </button>
                </form>
              </div>

              <div className="flex items-center p-4 justify-center gap-2 border-t">
                <img width={50} src="/images/logo.svg" />
                <div className="font-light mb-2 mt-2">MONEY BACK GUARANTEE</div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
