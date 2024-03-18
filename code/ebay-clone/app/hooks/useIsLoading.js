const useIsLoading = (bool) => {
  // Get our local Storage and Set the Item isLoading
  localStorage.setItem("isLoading", bool);
  // Dispatch an event when the storage gets changed
  window.dispatchEvent(new Event("storage"));
};

export default useIsLoading;
