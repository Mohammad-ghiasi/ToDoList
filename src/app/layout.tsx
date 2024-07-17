import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Box, Text } from "@chakra-ui/react";
import { Providers } from "@/providers/ChakraProviders";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "TODOLIST",
  description: "Full stack todo list Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} bg-customBg`}>
        <Providers>
          <header>
            <Text className="text-center text-[36px] md:text-[40px] lg:text-[50px] font-bold text-textcolor tracking-[5px] md:tracking-[10px] lg:tracking-[15px] pt-5 my-6 lg:my-10">
              TODOLIST
            </Text>
          </header>
          <Box className="w-[90%] md:w-[75%] lg:w-[50%] mx-auto ">
            {children}
          </Box>
        </Providers>
      </body>
    </html >
  );
}
