const useUserAddress = async () => {
  let address = {};
  let response = await fetch("/api/address/get");

  if (response) {
    let data = await response.json();
    // If there is data, set the address to that data, else if no data, set address to empty object
    if (data) address = data;
  }

  return address;
};

export default useUserAddress;
