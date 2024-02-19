import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/user";

export const metadata = {
  title: "Ebay Clone",
  description: "The marketplace for everything.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />

        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
