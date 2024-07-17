import { Box, IconButton, Select } from '@chakra-ui/react'
import Link from 'next/link';
import { FiLogIn } from "react-icons/fi";
import ModalBtn from './ModalBtn';
import { FaFlagCheckered } from "react-icons/fa";
import FinishModal from './FinishModal';


export default function Options() {
    return (
        <Box>
            <Box className='flex flex-row justify-between items-center '>
                <ModalBtn />
                <Box className='flex flex-row space-x-5'>
                    <Box className='flex flex-row  space-x-2'>
                        <Link href='/sing-up'>
                            <IconButton
                                colorScheme="customColor"
                                aria-label='login'
                                icon={<FiLogIn size='23px' />}
                            />
                        </Link>
                        <FinishModal />
                    </Box>
                    <Select className='text-textcolor'>
                        <option value='All'>All</option>
                        <option value='Ended'>Ended</option>
                        <option value='Pending'>Pending</option>
                    </Select>
                </Box>
            </Box>
        </Box>
    )
}
