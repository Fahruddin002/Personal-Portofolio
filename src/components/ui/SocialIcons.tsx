import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

export const socialIconMap: Record<string, JSX.Element> = {
  GitHub: <GithubLogo size={20} weight="bold" />,
  LinkedIn: <LinkedinLogo size={20} weight="bold" />,
  Instagram: <InstagramLogo size={20} weight="bold" />,
};