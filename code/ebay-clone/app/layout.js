import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Ebay Clone",
  description: "The marketplace for everything.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
