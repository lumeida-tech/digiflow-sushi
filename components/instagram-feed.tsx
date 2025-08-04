"use client";

import { useEffect } from "react";

export default function InstagramFeed() {
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
    <div className="elfsight-app-274efdc5-35ec-49a3-b6b1-e7ff5b06847a" data-elfsight-app-lazy></div>
  );
}
