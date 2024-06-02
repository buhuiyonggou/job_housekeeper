// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "@/app/theme";
import React from "react";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
       <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </ChakraProvider>
  );
}
