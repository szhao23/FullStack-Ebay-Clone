const useCreateAddress = async (details) => {
  let url = "create";
  // If there is an address ID passed in, update
  if (details.addressId) url = "update";

  // Post request to create new/updated address using API we created in api/address
  const response = await fetch(`/api/address/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      addressId: details.addressId,
      name: details.name,
      address: details.address,
      zipcode: details.zipcode,
      city: details.city,
      country: details.country,
    }),
  });

  // After complete, get the data with response.json()
  const data = await response.json();

  return data;
};

export default useCreateAddress;
