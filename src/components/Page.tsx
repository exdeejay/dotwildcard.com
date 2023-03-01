import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export interface PageProps {
  title: string;
  children: ReactNode;
  dangerouslySetInnerHtml?: string;
}

export function Page({ title, children, dangerouslySetInnerHtml }: PageProps) {
  return (
    <>
      <Header title={title} />
      <main
        className="grow w-full md:w-[theme(screens.md)] mx-auto mt-6 p-2 md:p-8 bg-primary-800"
        dangerouslySetInnerHTML={dangerouslySetInnerHtml !== undefined ? { __html: dangerouslySetInnerHtml } : undefined}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
