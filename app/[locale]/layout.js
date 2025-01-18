import "@/styles/globals.css";
import "@/styles/editor.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Resume Builder",
  description: "Building ATS friendly Resume",
};

export default async function RootLayout({ children, locale }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Toaster />
          <main className="min-h-dvh">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
