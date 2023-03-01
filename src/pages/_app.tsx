import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
// import "bootstrap/dist/js/bootstrap.js";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { NextComponentType, NextPageContext } from "next/types";
import BaseLayout from "components/BaseLayout";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}> & { Component: { noBaseLayout: Boolean | undefined } }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      {Component.noBaseLayout ? (
        <Component {...pageProps} />
      ) : (
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      )}
    </SessionContextProvider>
  );
}
