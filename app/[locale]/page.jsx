import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  return <div className="flex">{t("example")}</div>;
}
