// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Typography, Box, Autocomplete } from '@mui/material';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import styles

// const AddPaymentPage = ({ handleAddPayment }) => {
//   const [open, setOpen] = useState(false);
//   const [buddieName, setBuddieName] = useState(null);
//   const [buddieDetails, setBuddieDetails] = useState([]);
//   const [buddieList, setBuddieList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10)); // Current date
//   const [rentAmount, setRentAmount] = useState(0);
//   const hostelId = localStorage.getItem('hostel_id');


//   const [roomList, setRoomList] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   const [paidAmount, setPaidAmount] = useState('');
//   const [pendingBalance, setPendingBalance] = useState('');

//   useEffect(() => {
//     const rent = parseFloat(rentAmount) || 0;
//     const paid = parseFloat(paidAmount) || 0;
//     setPendingBalance((rent - paid).toFixed(2));
//   }, [rentAmount, paidAmount]);


//   useEffect(() => {
//     const fetchBuddies = async () => {
//       if (!hostelId) {
//         console.error('Hostel ID is required to fetch buddies.');
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-buddies`, {
//           params: { hostelId },
//         });

//         setBuddieList(response.data);
//         // console.log('Fetched Buddies:', response.data);
//       } catch (err) {
//         console.error('Error fetching buddies:', err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBuddies();
//   }, [hostelId]);




//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/admin/get-rooms?hostelId=${hostelId}`);
//         setRoomList(response.data);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       }
//     };


//     fetchRooms();
//   }, [hostelId]);




//   // const handleBuddieChange = async (event, newValue) => {
//   //   const selectedBuddieName = newValue?.buddie_name || '';
//   //   setBuddieName(selectedBuddieName);

//   //   if (selectedBuddieName) {
//   //     setLoading(true);
//   //     try {
//   //       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-details?buddie_name=${selectedBuddieName}`);
//   //       setBuddieDetails(response.data);
//   //     } catch (err) {
//   //       console.error('Error fetching buddie details:', err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
//   // };



//   // const handleSubmit = async () => {
//   //   if (!buddieDetails) {
//   //     toast.error('No buddy details found.');
//   //     return;
//   //   }

//   //   // Validate that the rentAmount is a number and greater than 0
//   //   if (!rentAmount || isNaN(rentAmount) || rentAmount <= 0) {
//   //     toast.error('Invalid rent amount');
//   //     return;
//   //   }

//   //   const paymentData = {
//   //     buddie_name: buddieDetails.buddie_name,
//   //     rent_amount: rentAmount, // Make sure rent_amount is passed correctly
//   //     payment_date: paymentDate,
//   //     hostel_id: hostelId, // The hostel_id should be passed as well
//   //     month: paymentDate.slice(0, 7), // Example: "2024-11"
//   //   };

//   //   try {
//   //     const response = await axios.post(`${process.env.REACT_APP_URL}/admin/payments/add-payment`, paymentData); // Post payment to your API
//   //     handleAddPayment(response.data.payment)
//   //     toast.success('Payment added successfully!');
//   //     setOpen(false); // Close the dialog

//   //     // Clear form fields
//   //     setBuddieDetails(null); // Reset buddie details
//   //     setRentAmount(''); // Reset rent amount
//   //     setPaymentDate(''); // Reset payment date

//   //   } catch (err) {
//   //     toast.error('Error adding payment. Please try again.');
//   //     console.error('Error adding payment:', err);
//   //   }
//   // };


//   const handleSubmit = async () => {
//     if (!selectedBuddie) {
//       toast.error('Please select a Buddie');
//       return;
//     }

//     if (!rentAmount || isNaN(rentAmount) || rentAmount <= 0) {
//       toast.error('Invalid rent amount');
//       return;
//     }

//     if (!paidAmount || isNaN(paidAmount) || paidAmount < 0) {
//       toast.error('Invalid paid amount');
//       return;
//     }

//     const pendingAmount = rentAmount - paidAmount;
//     let status = paidAmount === rentAmount ? 'paid' : paidAmount === 0 ? 'unpaid' : 'partial';

//     const paymentData = {
//       buddie_id: selectedBuddie._id,
//       buddie_name: selectedBuddie.buddie_name,
//       room_no: selectedRoom,
//       rent_amount: rentAmount,
//       paid_amount: paidAmount,
//       pending_amount: pendingAmount,
//       payment_date: paymentDate,
//       hostel_id: hostelId,
//       month: paymentDate.slice(0, 7),
//       status,
//     };

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_URL}/admin/payments/add-payment`, paymentData);
//       handleAddPayment(response.data.payment);
//       toast.success('Payment added successfully!');
//       setOpen(false);

//       // Reset
//       setSelectedBuddie(null);
//       setSelectedRoom('');
//       setRentAmount('');
//       setPaidAmount('');
//       setPaymentDate('');
//     } catch (err) {
//       console.error('Error adding payment:', err);
//       toast.error('Failed to add payment');
//     }
//   };













//   const [selectedBuddie, setSelectedBuddie] = useState(null);

//   const handleRoomChange = async (event, newValue) => {
//     const roomNumber = newValue?.room_number || '';
//     setSelectedRoom(roomNumber);
//     setSelectedBuddie(null);
//     setBuddieList([]);

//     if (roomNumber) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_URL}/admin/buddies-by-room?room_number=${roomNumber}&hostelId=${hostelId}`
//         );
//         setBuddieList(response.data);
//       } catch (error) {
//         console.error('Error fetching buddies:', error);
//       }
//     }
//   };



//   const handleBuddieChange = (event, newValue) => {
//     setSelectedBuddie(newValue);
//     setRentAmount(newValue?.rent_amount || '');
//   };







//   return (
//     <div>
//       <Box>
//         <Button
//           variant="contained"
//           //   color="primary"

//           onClick={() => setOpen(true)}
//           style={{
//             marginTop: '10px',
//             position: 'absolute',
//             right: '20px',
//             backgroundColor: 'tomato'

//           }}
//         >
//           Add Payment
//         </Button>
//       </Box>

//       {/* Dialog for adding payment */}
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
//         <DialogTitle>Add Payment</DialogTitle>
//         {/* <DialogContent>

//           <Autocomplete
//             value={roomList.find((room) => room.room_number === selectedRoom) || null}
//             options={roomList}
//             getOptionLabel={(option) => option.room_number}
//             onChange={handleRoomChange}
//             renderInput={(params) => <TextField {...params} label="Room Number" variant="outlined" fullWidth required />}
//             isOptionEqualToValue={(option, value) => option.room_number === value?.room_number}
             
//           />

//           <Autocomplete
//             value={selectedBuddie}
//             options={buddieList}
//             getOptionLabel={(option) => option.buddie_name}
//             onChange={handleBuddieChange}
//             renderInput={(params) => <TextField {...params} label="Buddie Name" variant="outlined" fullWidth required />}
//             isOptionEqualToValue={(option, value) => option.buddie_name === value?.buddie_name}
           
//           />
//             <>
//               <TextField
//                 required
//                 label="Rent Amount"
//                 value={buddieDetails.rent_amount}
//                 onChange={(e) => setRentAmount(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 required
//                 label="Payment Date"
//                 value={paymentDate}
//                 fullWidth
//                 margin="normal"
//                 type="date"
//                 onChange={(e) => setPaymentDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </>

//         </DialogContent> */}


//         <DialogContent>
//           <Autocomplete
//             value={roomList.find((room) => room.room_number === selectedRoom) || null}
//             options={roomList}
//             getOptionLabel={(option) => option.room_number}
//             onChange={handleRoomChange}
//             renderInput={(params) => <TextField {...params} label="Room Number" variant="outlined" fullWidth required />}
//             isOptionEqualToValue={(option, value) => option.room_number === value?.room_number}
//           />
//           <Box sx={{ height: 16 }} /> {/* This adds space */}
//           {/* 
//           <Autocomplete
//             value={selectedBuddie}
//             options={buddieList}
//             getOptionLabel={(option) => option.buddie_name}
//             onChange={handleBuddieChange}
//             renderInput={(params) => <TextField {...params} label="Buddie Name" variant="outlined" fullWidth required />}
//             isOptionEqualToValue={(option, value) => option.buddie_name === value?.buddie_name}
//           /> */}

//           <Autocomplete
//             value={selectedBuddie}
//             options={buddieList}
//             getOptionLabel={(option) => option.buddie_name}
//             onChange={(event, newValue) => setSelectedBuddie(newValue)}
//             renderInput={(params) => <TextField {...params} label="Buddie Name" variant="outlined" />}
//             isOptionEqualToValue={(option, value) => option._id === value?._id}
//           />




//           <>
//             <TextField
//               required
//               label="Rent Amount"
//               value={rentAmount}
//               onChange={(e) => setRentAmount(e.target.value)}
//               fullWidth
//               margin="normal"
//               type="number"
//             />

//             <TextField
//               required
//               label="Paid Amount"
//               value={paidAmount}
//               onChange={(e) => setPaidAmount(e.target.value)}
//               fullWidth
//               margin="normal"
//               type="number"
//             />

//             <TextField
//               label="Pending Balance"
//               value={pendingBalance}
//               fullWidth
//               margin="normal"
//               type="number"
//               InputProps={{
//                 readOnly: true,
//               }}
//             />

//             <TextField
//               required
//               label="Payment Date"
//               value={paymentDate}
//               fullWidth
//               margin="normal"
//               type="date"
//               onChange={(e) => setPaymentDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </>
//         </DialogContent>




//         <DialogActions>
//           <Button onClick={() => setOpen(false)}
//             style={{ backgroundColor: 'tomato', color: 'white' }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             // color="primary"
//             disabled={loading || !buddieDetails}
//             style={{ backgroundColor: 'darkcyan', color: 'white' }}
//           >
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Toast Notifications Container */}
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default AddPaymentPage;






import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Autocomplete } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddPaymentPage = ({ handleAddPayment }) => {
  const [open, setOpen] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [buddieList, setBuddieList] = useState([]);
  const [selectedBuddie, setSelectedBuddie] = useState(null);

  const [rentAmount, setRentAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [pendingBalance, setPendingBalance] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const hostelId = localStorage.getItem('hostel_id');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/get-rooms?hostelId=${hostelId}`);
        setRoomList(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [hostelId]);

  useEffect(() => {
    const rent = parseFloat(rentAmount) || 0;
    const paid = parseFloat(paidAmount) || 0;
    setPendingBalance((rent - paid).toFixed(2));
  }, [rentAmount, paidAmount]);

  const handleRoomChange = async (event, newValue) => {
    setSelectedRoom(newValue);
    setSelectedBuddie(null);
    setBuddieList([]);

    if (newValue) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/admin/buddies-by-room?room_number=${newValue.room_number}&hostelId=${hostelId}`
        );
        setBuddieList(response.data);
      } catch (error) {
        console.error('Error fetching buddies:', error);
      }
    }
  };

  const handleBuddieChange = (event, newValue) => {
    setSelectedBuddie(newValue);
    setRentAmount(newValue?.rent_amount || '');
  };

  const handleSubmit = async () => {
    if (!selectedRoom || !selectedBuddie) {
      toast.error('Please select a Room and Buddie');
      return;
    }

    if (!rentAmount || isNaN(rentAmount) || rentAmount <= 0) {
      toast.error('Invalid rent amount');
      return;
    }

    if (!paidAmount || isNaN(paidAmount) || paidAmount < 0) {
      toast.error('Invalid paid amount');
      return;
    }

    const pendingAmount = rentAmount - paidAmount;
    let status = paidAmount == rentAmount ? 'paid' : paidAmount == 0 ? 'unpaid' : 'partial';

    const paymentData = {
      buddie_id: selectedBuddie._id,
      buddie_name: selectedBuddie.buddie_name,
      room_no: selectedRoom.room_number,
      rent_amount: rentAmount,
      paid_amount: paidAmount,
      pending_amount: pendingAmount,
      payment_date: paymentDate,
      hostel_id: hostelId,
      month: paymentDate.slice(0, 7),
      status,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/admin/payments/add-payment`, paymentData);
      handleAddPayment(response.data.payment);
      toast.success('Payment added successfully!');
      setOpen(false);

      setSelectedRoom(null);
      setSelectedBuddie(null);
      setRentAmount('');
      setPaidAmount('');
      setPendingBalance('');
      setPaymentDate(new Date().toISOString().slice(0, 10));
    } catch (err) {
      console.error('Error adding payment:', err);
      toast.error('Failed to add payment');
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        style={{ marginTop: '10px', position: 'absolute', right: '20px', backgroundColor: 'tomato' }}
      >
        Add Payment
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <Autocomplete
            value={selectedRoom}
            options={roomList}
            getOptionLabel={(option) => option.room_number}
            onChange={handleRoomChange}
            renderInput={(params) => <TextField {...params} label="Room Number" variant="outlined" fullWidth required />}
          />

          <Box sx={{ height: 16 }} />

          <Autocomplete
            value={selectedBuddie}
            options={buddieList}
            getOptionLabel={(option) => option.buddie_name}
            onChange={handleBuddieChange}
            renderInput={(params) => <TextField {...params} label="Buddie Name" variant="outlined" fullWidth required />}
          />

          <TextField
            label="Rent Amount"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />

          <TextField
            label="Paid Amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />

          <TextField
            label="Pending Balance"
            value={pendingBalance}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Payment Date"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} style={{ backgroundColor: 'tomato', color: 'white' }}>Cancel</Button>
          <Button onClick={handleSubmit} style={{ backgroundColor: 'darkcyan', color: 'white' }}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddPaymentPage;