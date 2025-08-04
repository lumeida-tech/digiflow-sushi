"use client"; 

import { useEffect } from "react";

export default function GoogleReviews() {
  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="elfsight-app-1bf3274a-64b0-4e7f-b49b-1c79ab2dc7cd"
      data-elfsight-app-lazy
    ></div>
  );
}
