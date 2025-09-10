"use client";
import { useEffect } from "react";
import "zenn-content-css";

export const Preview = (props: { html: string }) => {
  const html = props.html;

  useEffect(() => {
    import("zenn-embed-elements");
  }, []);
  return <div className="znc" dangerouslySetInnerHTML={{ __html: html }}></div>;
};
