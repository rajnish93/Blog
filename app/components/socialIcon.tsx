import Mail from "/public/icons/mail.svg";
import Github from "/public/icons/github.svg";
import Facebook from "/public/icons/facebook.svg";
import Youtube from "/public/icons/youtube.svg";
import Linkedin from "/public/icons/linkedin.svg";
import Twitter from "/public/icons/twitter.svg";
import { SVGProps } from "react";

// Icons taken from: https://simpleicons.org/

type ComponentType = React.FC<SVGProps<SVGSVGElement>>;

const components: Record<string, ComponentType> = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

interface SocialIconProps {
  kind: string;
  href: string;
  size?: string;
}

const SocialIcon = ({ kind, href, size = "8" }: SocialIconProps) => {
  if (!href) return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  );
};

export default SocialIcon;
