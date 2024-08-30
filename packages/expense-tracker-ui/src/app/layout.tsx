import './globals.css'
import type { Metadata } from "next";
import { AppProvider } from "../context/AppContext";
import ThemeProvider from '../theme/ThemeProvider';

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "developed by Bumuthu Dilshan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
