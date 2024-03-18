"use client";

import TextInput from "../components/TextInput";
import MainLayout from "../layouts/MainLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/router";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import useIsLoading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";

export default function Address() {
  const router = useRouter();
  const { user } = useUser();

  // State
  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [error, setError] = useState({});

  const showError = () => {
    // If the error.length > 0, and the error type = type we are passing, return the error message, else return nothing
    if (Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const getAddress = async () => {
    if (user?.id == null || user?.id == undefined) {
      useIsLoading(false);
      return;
    }

    const response = await useUserAddress();
    if (response) {
      setTheCurrentAddress(response);
      useIsLoading(false);
      return;
    }
    useIsLoading(false);
  };

  useEffect(() => {
    useIsLoading(true);
    getAddress();
  }, [user]);

  return (
    <>
      <MainLayout>
        <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
          <div className="mx-auto bg-white rounded-lg p-3">
            <div className="text-xl text-bold mb-2">Address Details</div>

            <form>
              <div className="mb-4">
                <TextInput
                  className="w-full"
                  string={"TEST"}
                  placeholder={"Name"}
                  error="Uh oh, something went wrong, please check again for errors and try again."
                />
              </div>

              <button className="mt-6 w-full text-white text-lg font-semibold p-3 rounded bg-blue-500">
                Update Address
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
