"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientContextProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
