"use client";
import "./globals.css";
import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";
import Loader from "./components/Loader";

const inter = Inter({ subsets: ["latin"] });

// ✅ This is important!
const persistor = persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <PrelineScriptWrapper />
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            {children}
            <Toaster />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
