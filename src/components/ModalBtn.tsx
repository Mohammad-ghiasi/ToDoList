"use client"
import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa";

export default function ModalBtn() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Box className="hidden md:block">
            <Button className="hidden" onClick={onOpen} colorScheme="customColor">Add Task</Button>
        </Box>
        <Box className="block md:hidden">
            <IconButton
                colorScheme="customColor"
                aria-label='login'
                icon={<FaPlus size='23px' />}
                className="hidden"
            />
        </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-textcolor">Add Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        mohammad ghiasi
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="customColor"  className="w-[100%]" rightIcon={<FaPlus />}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
