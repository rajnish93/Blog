import Link from "next/link";

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="Tailwind CSS Blog">
              <div className="flex items-center justify-between">
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  Rajnish Singh
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              <Link
                key="blog"
                href="/blog"
                className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
              >
                Blog
              </Link>
            </div>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <footer>
          <div className="flex flex-col items-center mt-16">
            <div>{`© ${new Date().getFullYear()}`}</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LayoutWrapper;
