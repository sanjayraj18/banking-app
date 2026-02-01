//sessionprovider logic
// app/providers/SessionProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import {RecoilRoot} from "recoil";
import { ReactNode } from "react";

export default function Providers ({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
    <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  )
  
}
