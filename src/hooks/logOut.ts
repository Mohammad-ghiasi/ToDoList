// import axios from 'axios';
// import { useMutation } from '@tanstack/react-query';
// import { useToast } from '@chakra-ui/react'; // Assuming you're using Chakra UI for toast notifications

// const logout = async () => {
//   const { data } = await axios.get('http://localhost:3000/api/logout');
//   return data;
// };

// export const useLogout = (logoutUser: () => void) => {
//   const toast = useToast();

//   return useMutation({
//     mutationFn: logout, {
//     onSuccess: (data: any) => {
//       toast({
//         title: data.message,
//         status: 'success',
//         position: 'top',
//         duration: 2000,
//         isClosable: true,
//       });
//       logoutUser();
//       window.location.reload();
//     },
//     onError: (error: any) => {
//       console.log(error);
//       toast({
//         title: 'Logout failed',
//         status: 'error',
//         position: 'top',
//         duration: 2000,
//         isClosable: true,
//       });
//     },
//   }});
// };


// // {
// //     onSuccess: (data) => {
// //       toast({
// //         title: data.message,
// //         status: 'success',
// //         position: 'top',
// //         duration: 2000,
// //         isClosable: true,
// //       });
// //       logoutUser();
// //       window.location.reload();
// //     },
// //     onError: (error: any) => {
// //       console.log(error);
// //       toast({
// //         title: 'Logout failed',
// //         status: 'error',
// //         position: 'top',
// //         duration: 2000,
// //         isClosable: true,
// //       });
// //     },
// //   }
