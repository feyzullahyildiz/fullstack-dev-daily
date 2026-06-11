import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Fullstack Dev Daily Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Task Manager</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
