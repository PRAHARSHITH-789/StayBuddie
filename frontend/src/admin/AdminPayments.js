// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Button,
//   Typography,
//   Box,
//   Chip,
//   Skeleton,
//   AppBar,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Tabs,
//   Tab,
//   ListItem,
//   List
// } from '@mui/material';
// // import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { styled } from '@mui/system';
// import { ArrowBack } from '@mui/icons-material';
// import profileImage from '../assets/buddie.jpg';
// import { useNavigate } from 'react-router-dom';
// import Header_sub from '../Header_sub';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckIcon from '@mui/icons-material/Check';
// import SearchIcon from '@mui/icons-material/Search';
// import UnpaidBuddiesList from './UnpaidBuddies';
// import CloseIcon from '@mui/icons-material/Close';
// import notFound from '../assets/notFound.png';
// import AddPaymentPage from './AddPayment';
// import Avatar from 'react-avatar';
// // import { DataTable, Column } from 'primereact/datatable';


// const HeaderContainer = styled(Box)({


//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   mb: 4,
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   padding: '14px 16px',
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   boxSizing: 'border-box',
//   backgroundColor: '#fff',
//   zIndex: 1000,
// });

// const StayText = styled(Typography)({
//   fontFamily: '"Sofia", sans-serif',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   color: 'orange',
// });

// const BuddieText = styled(Typography)({
//   fontFamily: '"Sofia", sans-serif',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   color: '#333',
// });

// const ProfileIcon = styled(IconButton)({
//   borderRadius: '50%',
//   backgroundColor: '#ddd',
//   width: '40px',
//   height: '40px',
// });

// const LocationChip1 = styled(Chip)({

//   // marginTop: '15px',
//   fontFamily: 'Anta',
//   fontSize: '18px',
//   textAlign: 'center',
//   // backgroundColor:'#f0c674'
// });


// const statusColors = {
//   pending: 'warning',
//   accepted: 'success',
//   rejected: 'error',
// };

// const AdminPayments = ({ socket }) => {




//   const navigate = useNavigate(); // Initialize navigate function

//   const handleBackClick = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   const [search, setSearch] = useState('');


//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: 'contains' },
//     buddie: { value: null, matchMode: 'contains' },
//     amount: { value: null, matchMode: 'contains' },
//     status: { value: null, matchMode: 'contains' },
//   });


//   const [paymentRequests, setPaymentRequests] = useState([]);
//   const [pendingPayments, setPendingPayments] = useState([]);
//   const [acceptedPayments, setAcceptedPayments] = useState([]);
//   const [pagePending, setPagePending] = useState(0);
//   const [rowsPerPagePending, setRowsPerPagePending] = useState(3);
//   const [pageAccepted, setPageAccepted] = useState(0);
//   const [rowsPerPageAccepted, setRowsPerPageAccepted] = useState(3);
//   const [loading, setLoading] = useState(true);
//   const [buddieNames, setBuddieNames] = useState({}); // Object to store buddie names

//   const [value, setValue] = useState(0); // State to control the active tab



//   const token = localStorage.getItem('authToken');
//   const hostelId = localStorage.getItem('hostel_id');





//   const fetchPayments = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payments/hostel/${hostelId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const payments = response.data;

//       setPaymentRequests((prevRequests) => [...prevRequests, payments]);


//       setPendingPayments(payments.filter(payment => payment.status === 'unpaid'));
//       setAcceptedPayments(payments.filter(payment => payment.status === 'paid' || payment.status === 'partial'));
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching payments', error);
//       // toast.error('Error fetching payments');
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (hostelId && token) {
//       fetchPayments();
//     }
//   }, [hostelId, token]);





//   const acceptPayment = async (paymentId) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_URL}/admin/payments/${paymentId}/accept`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // toast.success('Payment accepted!');
//       fetchPayments(); // Refresh payment requests after acceptance
//     } catch (error) {
//       console.error('Error accepting payment', error);
//       // toast.error('Error accepting payment');
//     }
//   };


//   const rejectPayment = async (paymentId) => {
//     try {
//       // Send a PUT request to change the payment status to 'rejected'
//       await axios.put(`${process.env.REACT_APP_URL}/admin/payments/${paymentId}/reject`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Success message
//       // toast.success('Payment rejected successfully!');

//       // Refresh the payments list after rejection
//       fetchPayments(); // Call your function to fetch updated payments
//     } catch (error) {
//       console.error('Error rejecting payment:', error);
//       // toast.error('Error rejecting payment');
//     }
//   };

//   const handleChangePagePending = (event, newPage) => {
//     setPagePending(newPage);
//   };

//   const handleChangeRowsPerPagePending = (event) => {
//     setRowsPerPagePending(parseInt(event.target.value, 10));
//     setPagePending(0);
//   };

//   const handleChangePageAccepted = (event, newPage) => {
//     setPageAccepted(newPage);
//   };

//   const handleChangeRowsPerPageAccepted = (event) => {
//     setRowsPerPageAccepted(parseInt(event.target.value, 10));
//     setPageAccepted(0);
//   };



//   const handleOpenSearchPage = () => {
//     navigate('/admin/search-payments');
//   };




//   const handleChangeTab = (event, newValue) => {
//     setValue(newValue);
//   };





//   useEffect(() => {
//     if (socket) {
//       socket.on("paymentRequest", async (data) => {
//         // Update payment requests state with the new data
//         setPaymentRequests((prevRequests) => [...prevRequests, data]);

//         // Extract unique buddy IDs from the payments
//         const payments = [...paymentRequests, data];


//         // Separate payments into pending and accepted statuses
//         const pending = payments.filter((payment) => payment.status === "pending");
//         const accepted = payments.filter((payment) => payment.status === "accepted");

//         setPendingPayments(pending);
//         setAcceptedPayments(accepted);
//       });

//       // Cleanup listener on unmount
//       return () => {
//         socket.off("paymentRequest");
//       };
//     }
//   }, [socket, paymentRequests]);



//   const handleAddPayment = (payment) => {
//     // console.log(payment);
//     setAcceptedPayments((prevRequests) => [...prevRequests, payment]);
//   }


//   return (


//     <Box p={3}>
//       <Header_sub />




//       <Box onClick={handleOpenSearchPage} sx={{ cursor: 'pointer', marginTop: '80px' }} >
//         <TextField
//           fullWidth
//           label="Search Payments"
//           variant="outlined"
//           // disabled
//           // onClick={handleOpenSearchPage}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <AddPaymentPage handleAddPayment={handleAddPayment} />



//       <Tabs value={value} onChange={handleChangeTab} aria-label="Payment Tabs" centered style={{ marginTop: '50px' }}>
//         <Tab label="Requests" />
//         <Tab label="Payments" />
//       </Tabs>




//       <Box role="tabpanel" hidden={value !== 0}>

//         <Box sx={{ mb: 4, mt: 3 }}>
//           {pendingPayments.length === 0 ? (
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 // height: 300,
//               }}
//             >
//               <img
//                 src={notFound}
//                 alt="No Data Found"
//                 style={{ width: '200px', height: 'auto' }}
//               />
//               <Typography variant="h6" color="textSecondary">
//                 No Data Found
//               </Typography>
//             </Box>
//           ) : (
//             <List
//               sx={{
//                 bgcolor: 'background.paper',
//                 // borderRadius: 3,
//                 // boxShadow: 3,
//                 overflow: 'hidden',
//                 p: 0,
//               }}
//             >
//               {pendingPayments.map((payment) => (
//                 <ListItem
//                   key={payment._id}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: 1,
//                     borderBottom: '1px solid #f0f0f0',
//                     p: 2,
//                     '&:hover': {
//                       backgroundColor: '#f9f9f9',
//                     },
//                   }}
//                 >
//                   {/* Top Row: Buddie Name */}
//                   <Box
//                     sx={{
//                       width: '100%',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Typography
//                       variant="body1"
//                       fontWeight="bold"
//                       sx={{ textTransform: 'capitalize' }}
//                     >
//                       {payment.buddie_name || 'Unknown'}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       sx={{ fontSize: 12 }}
//                     >
//                       {new Date(payment.date).toISOString().slice(0, 10)}
//                     </Typography>
//                   </Box>

//                   {/* Middle Row: Payment Details */}
//                   <Box
//                     sx={{
//                       width: '100%',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <Typography variant="body2" color="textSecondary">
//                       ₹{payment.amount} | {payment.month}
//                     </Typography>
//                     <Chip
//                       label={payment.status}
//                       size="small"
//                       color={statusColors[payment.status]}
//                     />
//                   </Box>


//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'center',  // Center the buttons
//                       gap: 1,
//                       mt: 1,
//                       // width: '100%',  // Ensure full width for the container
//                     }}
//                   >
//                     <IconButton
//                       onClick={() => acceptPayment(payment._id)}
//                       sx={{
//                         backgroundColor: 'green',
//                         color: 'white',
//                         '&:hover': { backgroundColor: '#FFB300' },
//                         boxShadow: 1,
//                         width: '100%',   // Set width for square shape
//                         // height: 40,  // Set height for square shape
//                         borderRadius: 2,  // Optional: rounded corners
//                       }}
//                     >
//                       <CheckIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={() => rejectPayment(payment._id)}
//                       sx={{
//                         backgroundColor: 'tomato',
//                         color: 'white',
//                         '&:hover': { backgroundColor: '#E57373' },
//                         boxShadow: 1,
//                         width: '100%',   // Set width for square shape
//                         // height: 40,  // Set height for square shape
//                         borderRadius: 2,  // Optional: rounded corners
//                       }}
//                     >
//                       <CloseIcon />
//                     </IconButton>
//                   </Box>



//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Box>



//       </Box>

//       <Box role="tabpanel" hidden={value !== 1} mt={2}>

//         <Box sx={{ mb: 4, mt: 3 }}>
//           {acceptedPayments.length === 0 ? (
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 // height: 300,
//               }}
//             >
//               <img
//                 src={notFound}
//                 alt="No Data Found"
//                 style={{ width: '200px', height: 'auto' }}
//               />
//               <Typography variant="h6" color="textSecondary">
//                 No Data Found
//               </Typography>
//             </Box>
//           ) : (
//             <List
//               sx={{
//                 bgcolor: 'background.paper',
//                 // borderRadius: 3,
//                 // boxShadow: 3,
//                 overflow: 'hidden',
//                 p: 0,
//               }}
//             >
//               {acceptedPayments.map((payment) => (
//                 <ListItem
//                   key={payment._id}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'flex-start',
//                     gap: 1,
//                     borderBottom: '1px solid #f0f0f0',
//                     p: 2,
//                     '&:hover': {
//                       backgroundColor: '#f9f9f9',
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: '100%',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Typography
//                       variant="body1"
//                       fontWeight="bold"
//                       sx={{ textTransform: 'capitalize' }}
//                     >
//                       {payment.buddie_name}
//                     </Typography>

//                   </Box>

//                   <Box
//                     sx={{
//                       width: '100%',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <Typography variant="body2" color="textSecondary">
//                       {/* ₹{payment.amount} | {new Date(payment.date).toISOString().slice(0, 10)} */}
//                       ₹{payment.rent_amount}

//                     </Typography>
//                     <Chip
//                       label={payment.status}
//                       size="small"
//                       color={statusColors[payment.status]}
//                     />
//                   </Box>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminPayments;




import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  ListItem,
  List,
  TextField,
  Tabs,
  Tab,
  InputAdornment,
  Button,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import notFound from '../assets/notFound.png';
import AddPaymentPage from './AddPayment';
import Header_sub from '../Header_sub';

const statusColors = {
  unpaid: 'warning',
  paid: 'success',
  partial: 'info',
};

const AdminPayments = ({ socket }) => {
  const [search, setSearch] = useState('');
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [acceptedPayments, setAcceptedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const token = localStorage.getItem('authToken');
  const hostelId = localStorage.getItem('hostel_id');

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/admin/payments/hostel/${hostelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const payments = response.data;
      console.log(payments);
      setPaymentRequests(payments);
      setPendingPayments(payments.filter((p) => p.status === 'unpaid'));
      setAcceptedPayments(
        payments.filter((p) => p.status === 'paid' || p.status === 'partial')
      );
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hostelId && token) {
      fetchPayments();
    }
  }, [hostelId, token]);

  const acceptPayment = async (paymentId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/payments/${paymentId}/accept`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPayments();
    } catch (error) {
      console.error('Error accepting payment', error);
    }
  };

  const rejectPayment = async (paymentId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/payments/${paymentId}/reject`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPayments();
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };


  const markAsPaid = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_URL}/admin/payments/${id}/mark-paid`);
      const updatedPayment = response.data;

      // Update the local state after marking as paid
      setAcceptedPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === id
            ? {
                ...payment,
                status: 'paid',
                paid_amount: payment.paid_amount + payment.pending_amount,
                pending_amount: 0,
              }
            : payment
        )
      );
    } catch (error) {
      console.error('Error marking as paid:', error);
    }
  };


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddPayment = (payment) => {
    setAcceptedPayments((prev) => [...prev, payment]);
  };

  useEffect(() => {
    if (socket) {
      socket.on('paymentRequest', (data) => {
        setPaymentRequests((prev) => [...prev, data]);
        setPendingPayments((prev) => [...prev, data]);
      });

      return () => {
        socket.off('paymentRequest');
      };
    }
  }, [socket]);

  return (
    <Box p={3}>
      <Header_sub />

      <Box sx={{ marginTop: '80px' }}>
        <TextField
          fullWidth
          label="Search Payments"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <AddPaymentPage handleAddPayment={handleAddPayment} />

      <Tabs
        value={value}
        onChange={handleChangeTab}
        aria-label="Payment Tabs"
        centered
        style={{ marginTop: '50px' }}
      >
        <Tab label="Requests" />
        <Tab label="Payments" />
      </Tabs>

      <Box role="tabpanel" hidden={value !== 0} sx={{ mt: 3 }}>
        {pendingPayments.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <img src={notFound} alt="No Data" width="150" />
            <Typography>No Data Found</Typography>
          </Box>
        ) : (
          <List>
            {pendingPayments.map((payment) => (
              <ListItem key={payment._id} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontWeight="bold">{payment.buddie_name || 'Unknown'}</Typography>
                  <Typography variant="body2">{payment.month}</Typography>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">₹{payment.amount}</Typography>
                  <Chip label={payment.status} color={statusColors[payment.status]} size="small" />
                </Box>

                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => acceptPayment(payment._id)}
                    sx={{ backgroundColor: 'green', color: 'white' }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => rejectPayment(payment._id)}
                    sx={{ backgroundColor: 'red', color: 'white' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 1} sx={{ mt: 3 }}>
        {acceptedPayments.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <img src={notFound} alt="No Data" width="150" />
            <Typography>No Data Found</Typography>
          </Box>
        ) : (
          <List>
            {/* {acceptedPayments.map((payment) => (
              <ListItem key={payment._id} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontWeight="bold">{payment.buddie_name}</Typography>
                  <Typography variant="body2">{payment.month}</Typography>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">₹{payment.rent_amount}</Typography>
                  <Typography variant="body2">Due: ₹{payment.pending_amount}</Typography>

                  <Chip label={payment.status} color={statusColors[payment.status]} size="small" />
                </Box>
              </ListItem>
            ))} */}


{acceptedPayments.map((payment) => (
  <ListItem key={payment._id} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <Typography fontWeight="bold">{payment.buddie_name}</Typography>
      <Typography variant="body2">{payment.month}</Typography>
    </Box>

    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
      <Typography variant="body2">₹{payment.paid_amount}</Typography>
      <Typography variant="body2">Due: ₹{payment.pending_amount}</Typography>

      <Chip label={payment.status} color={statusColors[payment.status]} size="small" />

      {/* Show "Mark as Completed" button only if the status is 'partial' */}
      {payment.status === 'partial' && (
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => markAsPaid(payment._id)}
          sx={{ ml: 1 }}
        >
          Paid
        </Button>
      )}
    </Box>
  </ListItem>
))}

          </List>
        )}
      </Box>
    </Box>
  );
};

export default AdminPayments;
