import "./globals.css";
import { Rubik } from "next/font/google";
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Mail Merge",
  description: "A Mail Merging Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <div className="mb-36 md:mb-20">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
