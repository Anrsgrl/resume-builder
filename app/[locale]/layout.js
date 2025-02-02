import "@/styles/globals.css";
import "@/styles/editor.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import banner from "@/assets/images/banner.webp";

export const metadata = {
  title: "Resume Builder",
  description:
    "Craft a professional, easy-to-build resume that highlights your skills and experience effectively to potential employers.",
  keywords:
    "Resume Builder, Professional Resume, CV Creator, Resume Template, Job Application, Career Development, Resume Design, Create Resume, Resume Tips, Resume Format, Job Search, Career Growth, Resume Writing, CV Formatting, Career Opportunities, ATS-friendly Resume, Resume for Job Applications, Easy Resume Builder, Online Resume Maker, Resume for Employers",
  openGraph: {
    title: "Resume Builder",
    description:
      "Craft a professional, easy-to-build resume that highlights your skills and experience effectively to potential employers.",
    url: "https://resume.anarr.dev",
    type: "website",
    images: [
      {
        url: banner.src,
        width: 1200,
        height: 630,
        alt: "Resume builder Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Builder",
    description:
      "Craft a professional, easy-to-build resume that highlights your skills and experience effectively to potential employers.",
    images: [banner.src],
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {/* OpenGraph Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={metadata.openGraph.images[0].alt}
        />
        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        <title>Resume Builder</title>
      </head>
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
