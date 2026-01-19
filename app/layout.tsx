import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Form",
  description: "Bluish themed contact form layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <header className="app-header">
            <h2>My Website</h2>
          </header>

          <section className="app-content">
            {children}
          </section>

          <footer className="app-footer">
            © 2025 All Rights Reserved
          </footer>
        </div>
      </body>
    </html>
  );
}
