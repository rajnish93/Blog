import Image from "next/image";
import { fetchMarkdownContent } from "@/lib/mdx";
import SocialIcon from "@/components/socialIcon";
import ReactMarkdown from "react-markdown";

export default async function About() {
  const { metadata, content } = await fetchMarkdownContent("about", "default");

  return (
    <div className="divide-y">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 space-x-2">
          <Image
            src={metadata.avatar}
            alt="avatar"
            width={192}
            height={192}
            className="w-48 h-48 rounded-full"
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
            {metadata.name}
          </h3>
          <div className="text-gray-500 dark:text-gray-400">
            {metadata.occupation}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {metadata.company}
          </div>
          <div className="flex pt-6 space-x-3">
            <SocialIcon kind="mail" href={`mailto:${metadata.email}`} />
            <SocialIcon kind="github" href={metadata.github} />
            <SocialIcon kind="linkedin" href={metadata.linkedin} />
            <SocialIcon kind="twitter" href={metadata.twitter} />
          </div>
        </div>
        <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
