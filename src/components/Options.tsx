import { Box, Button, IconButton, Select } from '@chakra-ui/react'
import Link from 'next/link';
import { FiLogIn } from "react-icons/fi";
import ModalBtn from './ModalBtn';
import { FaFlagCheckered } from "react-icons/fa";
import FinishModal from './FinishModal';
import { userStore } from '@/store/loginuser';
import { FaUser } from "react-icons/fa";



export default function Options() {
    const isLoggedIn: boolean = userStore((state) => state.isLoggedIn);
    return (
        <Box>
            <Box className='flex flex-row justify-between items-center '>
                {/* add Task */}
                <ModalBtn />
                <Box className='flex flex-row space-x-5'>
                    <Box className='flex flex-row  space-x-2'>
                        {!isLoggedIn ? (
                            <Link href='/sing-up'>
                                <IconButton
                                    colorScheme="customColor"
                                    aria-label='login'
                                    icon={<FiLogIn size='23px' />}
                                />
                            </Link>
                        ) : (
                            <>
                                <Link href='/account'>
                                    <IconButton
                                        colorScheme="customColor"
                                        aria-label='accouunt'
                                        icon={<FaUser size='21px' />}
                                    />
                                </Link>
                                <FinishModal />
                            </>
                        )}
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}
