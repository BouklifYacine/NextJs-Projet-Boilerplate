import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import appCss from "../../styles/globals.css?url";
import QueryProvider from "@/app/(providers)/QueryProvider";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "FootyGogo" },
      {
        name: "description",
        content:
          "FootyGogo la boilerplate NextJS idéale pour vos projets full stack",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased font-sans relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Outlet />
            <Toaster position="top-center" />
          </QueryProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
