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
      <Box position="fixed" top={context.errorOpened ? 12: 0} left={0} width="100%" bg="white" zIndex={10}>
        <TopNavBar />
      </Box>
      <Box>
        <Dashboard />
      </Box>
    </main>
  );
}
