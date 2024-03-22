"use client";

import TextInput from "../components/TextInput";
import MainLayout from "../layouts/MainLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import useIsLoading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { toast } from "react-toastify";
import useCreateAddress from "../hooks/useCreateAddress";
import ClientOnly from "../components/ClientOnly";

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

  // Pass an error type
  const showError = (type) => {
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

  // On load/Mount of Page
  useEffect(() => {
    useIsLoading(true);
    getAddress();
  }, [user]);

  // Set the Current Address
  const setTheCurrentAddress = (result) => {
    // Fetch information from current state
    setAddressId(result.id);
    setName(result.name);
    setAddress(result.address);
    setZipcode(result.zipcode);
    setCity(result.city);
    setCountry(result.country);
  };

  // Validation for Text Input
  const validate = () => {
    setError({});
    let isError = false;

    // If there's no name, set the type of name, pass the message
    if (!name) {
      setError({ type: "name", message: "A name is required." });
      isError = true;
    } else if (!address) {
      setError({ type: "address", message: "An address is required." });
      isError = true;
    } else if (!zipcode) {
      setError({ type: "zipcode", message: "A zipcode is required." });
      isError = true;
    } else if (!city) {
      setError({ type: "city", message: "A city is required." });
      isError = true;
    } else if (!country) {
      setError({ type: "country", message: "A country is required." });
      isError = true;
    }

    return isError;
  };

  const submit = async (event) => {
    // Don't want the form to submit, page will refresh so need to include this
    event.preventDefault();
    // Validate
    let isError = validate();

    if (isError) {
      toast.error(error.message, { autoClose: 3000 });
      return;
    }

    try {
      setIsUpdatingAddress(true);

      const response = await useCreateAddress({
        addressId,
        name,
        address,
        zipcode,
        city,
        country,
      });

      setTheCurrentAddress(response);
      setIsUpdatingAddress(false);

      toast.success("Address has been updated successfully!", {
        autoClose: 3000,
      });

      // Redirect to Checkout Page
      router.push("/checkout");
    } catch (error) {
      setIsUpdatingAddress(false);
      console.log("The error is", error);
      alert(error);
    }
  };

  return (
    <>
      <MainLayout>
        <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
          <div className="mx-auto bg-white rounded-lg p-3">
            <div className="text-xl text-bold mb-2">Address Details</div>

            <form onSubmit={submit}>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={name}
                    placeholder="Name"
                    onUpdate={setName}
                    error={showError("name")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={address}
                    placeholder="Address"
                    onUpdate={setAddress}
                    error={showError("address")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={zipcode}
                    placeholder="Zipcode"
                    onUpdate={setZipcode}
                    error={showError("zipcode")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={city}
                    placeholder="City"
                    onUpdate={setCity}
                    error={showError("city")}
                  />
                </ClientOnly>
              </div>

              <div>
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={country}
                    placeholder="Country"
                    onUpdate={setCountry}
                    error={showError("country")}
                  />
                </ClientOnly>
              </div>

              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`mt-6 w-full text-white text-lg font-semibold p-3 rounded ${
                  isUpdatingAddress ? "bg-blue-800" : "bg-blue-600"
                }
                `}
              >
                {!isUpdatingAddress ? (
                  <div>Update Address</div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Please wait...
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
