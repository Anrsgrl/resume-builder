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

export const LANGUAGE_OPTIONS = [
  { value: "elementary", label: "Elementary Proficiency" },
  { value: "limited_working", label: "Limited Working Proficiency" },
  {
    value: "professional_working",
    label: "Professional Working Proficiency",
  },
  { value: "full_professional", label: "Full Professional Proficiency" },
  { value: "native_or_bilingual", label: "Native or Bilingual Proficiency" },
];

export const LANGUAGE_OPTIONS_AZ = [
  { value: "elementary", label: "Elementar" },
  { value: "limited_working", label: "Məhdud iş bacarığı" },
  {
    value: "professional_working",
    label: "Peşəkar iş bacarığı",
  },
  { value: "full_professional", label: "Tam peşəkar bacarıq" },
  {
    value: "native_or_bilingual",
    label: "Ana dili və ya iki dildə sərbəstlik",
  },
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
