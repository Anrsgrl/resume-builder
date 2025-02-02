import "@/styles/globals.css";
import "@/styles/editor.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Resume Builder",
  description: "Building ATS friendly Resume",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Toaster containerClassName="print:hidden" />
          <main className="min-h-lvh ">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
