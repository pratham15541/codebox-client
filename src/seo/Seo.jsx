import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, name, type }) {
  const websiteUrl = "http://localhost:5173/"; // Replace with your website URL

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="CodeBox" />
      <meta name="color-scheme" content="dark light" />
      {/* End standard metadata tags */}

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={websiteUrl} />
      <meta property="og:site_name" content={name} />
      {/* Add Open Graph image tag if you have a website logo or thumbnail */}
      {/* <meta property="og:image" content={imageUrl} /> */}
      {/* End Open Graph tags */}

      {/* Twitter Card tags */}
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      {/* <meta name="twitter:creator" content="@YourTwitterHandle" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* Add Twitter Card image tag if you have a website logo or thumbnail */}
      {/* <meta name="twitter:image" content={imageUrl} /> */}
      {/* End Twitter Card tags */}
    </Helmet>
  );
}
