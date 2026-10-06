import React, { useEffect } from "react";

export const SITE_URL = "https://ayushmanchakraborty.vercel.app";
export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_NAME = "Ayushman Chakraborty";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const upsertMeta = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertCanonical = (url: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData,
}) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta(
      'meta[name="robots"]',
      { name: "robots" },
      noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large",
    );
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, image);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, image);
    upsertCanonical(canonicalUrl);

    const oldScript = document.head.querySelector('script[data-seo-jsonld="route"]');
    oldScript?.remove();
    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "route";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.head.querySelector('script[data-seo-jsonld="route"]')?.remove();
    };
  }, [description, image, noindex, path, structuredData, title]);

  return null;
};

export default SEO;
