import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
          <main className="">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
