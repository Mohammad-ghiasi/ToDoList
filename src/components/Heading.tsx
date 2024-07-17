import Link from "next/link";
import { Box, Divider, IconButton, Text } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";

interface propsType {
    text: string;
    route: string
}

export default function Heading({text, route}: propsType) {
    return (
        <>
            <Box className="flex flex-row items-center justify-between">
                <Text className="text-xl md:text-2xl text-textcolor font-bold">
                    {text}
                </Text>
                <Link href={route}>
                    <IconButton
                        size={'sm'}
                        colorScheme="customColor"
                        aria-label='login'
                        icon={<IoArrowBackOutline size='25px' />}
                    />
                </Link>
            </Box>
            <Box className="flex items-center justify-center w-[100%] my-8">
                <Divider maxW='80%' />
            </Box>
        </>
    )
}
