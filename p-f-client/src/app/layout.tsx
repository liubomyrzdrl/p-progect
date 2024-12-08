import { Inter } from "next/font/google";
import ReduxProvider from "@/store/provider";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ToastContainer autoClose={3000} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
