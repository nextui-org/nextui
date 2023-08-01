import {Button, Image, Link} from "@nextui-org/react";

import {Blockquote} from "@/components/docs/components/blockquote";

export default function FigmaPage() {
  return (
    <>
      <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
        <section className="w-full flex flex-col items-center lg:px-16 mt-12 gap-6">
          <div className="text-center max-w-xl">
            <h1 className="mb-2 font-bold text-4xl">NextUI Figma Kit</h1>
            <h5 className="text-default-500 text-lg">
              A Figma file that contains the basis of the NextUI design system to help you design
              your applications.
            </h5>
          </div>

          <iframe
            className="aspect-video w-full border border-transparent dark:border-default-200/50 object-fit rounded-xl shadow-lg"
            height="600"
            src="https://embed.figma.com/file/1267584376234254760/hf_embed?community_viewer=true&embed_host=nextui"
            title="NextUI Figma Kit"
            width="800"
          />
          <div className="text-center max-w-2xl m-auto">
            <Button className="max-w-fit" color="default" variant="bordered">
              <Link
                isExternal
                showAnchorIcon
                className="text-current"
                href="https://www.figma.com/community/file/1267584376234254760"
              >
                Open in Figma
              </Link>
            </Button>
            <Blockquote color="warning">
              This file is still in development and will be continuously updated.
            </Blockquote>
          </div>
        </section>
      </main>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"
      >
        <Image removeWrapper alt="docs left background" src="/gradients/docs-left.png" />
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
      >
        <Image removeWrapper alt="docs right background" src="/gradients/docs-right.png" />
      </div>
    </>
  );
}
