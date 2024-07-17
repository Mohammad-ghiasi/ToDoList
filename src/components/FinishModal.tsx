"use client"
import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { FaFlagCheckered } from 'react-icons/fa'

export default function FinishModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleFinish = () => {
        console.log('hi');
    }
    return (
        <>
            <IconButton
                colorScheme="customColor"
                aria-label='login'
                icon={<FaFlagCheckered size='20px' />}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-textcolor">Finish Day?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className='flex flex-row justify-around'>
                            <Button onClick={() => handleFinish()} className='w-[40%]' colorScheme="customColor">Yes</Button>
                            <Button onClick={() => onClose()} className='w-[40%]'>No</Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
