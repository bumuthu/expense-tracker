"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
      primary: "#141414"
    },
  })

export default function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
        {props.children}
    </ChakraProvider>
  )
}