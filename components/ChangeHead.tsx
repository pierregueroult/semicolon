import { ChangeHeadTypes } from "../interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

const ChangeHead = ({ pages }: ChangeHeadTypes) => {
  const router = useRouter();
  const defaultTitle = "Semicolon";
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    const setTitleHead = () => {
      for (let i = 0; i < pages.length; i++) {
        const element = pages[i];
        if (element.href === router.route) {
          setTitle(`${element.name} - Semicolon`);
          return;
        } else {
          setTitle(defaultTitle);
        }
      }
    };
    setTitleHead();
  }, [router]);

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Head>
  );
};

export default ChangeHead;
