import { useEffect, useState, createContext, useContext } from "react";

export type RouteInfo = {
  path: string;
  segments: string[];
  query: URLSearchParams;
};

function parse(): RouteInfo {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [p, q = ""] = raw.split("?");
  const path = p || "/";
  return {
    path,
    segments: path.split("/").filter(Boolean),
    query: new URLSearchParams(q),
  };
}

const RouteCtx = createContext<RouteInfo>(parse());

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<RouteInfo>(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener("hashchange", on);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return <RouteCtx.Provider value={route}>{children}</RouteCtx.Provider>;
}

export const useRoute = () => useContext(RouteCtx);

export const navigate = (to: string) => {
  const clean = to.startsWith("#") ? to : "#" + to;
  if (window.location.hash === clean) return;
  window.location.hash = clean;
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
};

export function Link({
  to,
  children,
  className,
  onClick,
  title,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <a
      href={"#" + to}
      title={title}
      className={className}
      onClick={() => onClick?.()}
    >
      {children}
    </a>
  );
}
