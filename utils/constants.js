import {
  SiDribbble,
  SiFacebook,
  SiFigma,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiMedium,
  SiX,
  SiXing,
} from "react-icons/si";
import { TbWorld } from "react-icons/tb";

export const azMonths = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "İyn",
  "İyl",
  "Avq",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];
//* toLocaleDateString does not support the Azerbaijani language, I should have written like this

export const LANGUAGE_OPTIONS = [
  "elementary",
  "limited",
  "pro",
  "fullPro",
  "native",
];

export const LOCALES = [
  { value: "az", label: "AZ", iso: "az-AZ", description: "Azərbaycan dili" },
  { value: "en", label: "US", iso: "en-US", description: "English" },
];

export const SOCIALS = [
  { name: "LinkedIn", logo: <SiLinkedin /> },
  { name: "Github", logo: <SiGithub /> },
  { name: "Twitter", logo: <SiX /> },
  { name: "Facebook", logo: <SiFacebook /> },
  { name: "Instagram", logo: <SiInstagram /> },
  { name: "Website", logo: <TbWorld /> },
  { name: "Xing", logo: <SiXing /> },
  { name: "Medium", logo: <SiMedium /> },
  { name: "Figma", logo: <SiFigma /> },
  { name: "Dribbble", logo: <SiDribbble /> },
];

export const FONTS = ["monospace", "cursive", "sans-serif", "fantasy"];
export const uiSans = `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji`;
