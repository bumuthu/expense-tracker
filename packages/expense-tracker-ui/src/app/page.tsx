'use client'

import ErrorAlert from "../components/ErrorAlert";
import Dashboard from "../components/Dashboard";
import { TopNavBar } from "../components/TopNavBar";
import { useAppContext } from "../context/AppContext";
import { Box } from '@chakra-ui/react';

export default function RootPage() {
  const context = useAppContext();

  return (
    <main>
      <ErrorAlert isOpen={context.errorOpened} setIsOpen={(v: boolean) => context.setErrorOpened(v)} />
      <TopNavBar />
      <Box>
        <Dashboard />
      </Box>
    </main>
  );
}
