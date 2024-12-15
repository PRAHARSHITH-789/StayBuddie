import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  TablePagination,
  Skeleton,
  IconButton,
  Box,
  styled,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
  List,
  CardContent,
  Card,
  CardActions
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header_sub from '../Header_sub';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import notFound from '../assets/notFound.png';
import { Toaster } from 'react-hot-toast';


const LocationChip1 = styled(Chip)({
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign: 'center',
});

const ComplaintList = ({socket}) => {
  // console.log(socket);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); // For tabs
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingResolved, setLoadingResolved] = useState(true);
  const [pagePending, setPagePending] = useState(0);
  const [pageResolved, setPageResolved] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const token = localStorage.getItem('authToken');
  const hostel_id = localStorage.getItem('hostel_id');



  // const fetchBuddieName = async (buddie_id) => {
  //   try {
  //     // Log the buddie_id to see what is passed
  //     console.log("Fetching buddie name for buddie_id:", buddie_id);
      
  //     // Make sure buddie_id is not undefined
  //     if (!buddie_id) {
  //       throw new Error("buddie_id is required");
  //     }
  
  //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
  //     return response.data.name;
  //   } catch (error) {
  //     console.error('Error fetching buddie name:', error);
  //     return 'Unknown';
  //   }
  // };
  



  // const fetchComplaints = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/complaints/${hostel_id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  
  //     // Add buddie names to pending complaints
  //     const pendingComplaintsWithNames = await Promise.all(
  //       response.data
  //         .filter((complaint) => complaint.status === 'pending')
  //         .map(async (complaint) => {
  //           const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
  //           return { ...complaint, buddie_name };
  //         })
  //     );
  
  //     // Add buddie names to resolved complaints
  //     const resolvedComplaintsWithNames = await Promise.all(
  //       response.data
  //         .filter((complaint) => complaint.status === 'resolved')
  //         .map(async (complaint) => {
  //           const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
  //           return { ...complaint, buddie_name };
  //         })
  //     );
  
  //     setPendingComplaints(pendingComplaintsWithNames);
  //     setResolvedComplaints(resolvedComplaintsWithNames);
  //   } catch (error) {
  //     console.error('Error fetching complaints:', error);
  //     toast.error('Error fetching complaints');
  //   } finally {
  //     setLoadingPending(false);
  //     setLoadingResolved(false);
  //   }
  // };

  
  // useEffect(() => {
  //   fetchComplaints(); // Initial fetch on component mount
  // }, []);
  



  const fetchBuddieName = async (buddie_id) => {
    try {
      // Log the buddie_id to see what is passed
      // console.log("Fetching buddie name for buddie_id:", buddie_id);
      
      // Make sure buddie_id is not undefined or null
      if (!buddie_id) {
        throw new Error("buddie_id is required");
      }
  
      // Call backend API to fetch the buddie name
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
      
      // Return the buddie name from the response
      return response.data.name;
    } catch (error) {
      console.error('Error fetching buddie name:', error);
      return 'Unknown';  // Fallback value for unknown buddie
    }
  };
  
  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/complaints/${hostel_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Add buddie names to pending complaints
      const pendingComplaintsWithNames = await Promise.all(
        response.data
          .filter((complaint) => complaint.status === 'pending')
          .map(async (complaint) => {
            const buddie_id = complaint.buddie_id && complaint.buddie_id._id;
            
            // Check if buddie_id exists and is valid before calling fetchBuddieName
            const buddie_name = buddie_id ? await fetchBuddieName(buddie_id) : 'Unknown';
            
            return { ...complaint, buddie_name };
          })
      );
  
      // Add buddie names to resolved complaints
      const resolvedComplaintsWithNames = await Promise.all(
        response.data
          .filter((complaint) => complaint.status === 'resolved' || complaint.status === 'rejected')
          .map(async (complaint) => {
            const buddie_id = complaint.buddie_id && complaint.buddie_id._id;
  
            // Check if buddie_id exists and is valid before calling fetchBuddieName
            const buddie_name = buddie_id ? await fetchBuddieName(buddie_id) : 'Unknown';
            
            return { ...complaint, buddie_name };
          })
      );
  
      // Update the state with complaints having buddie names
      setPendingComplaints(pendingComplaintsWithNames);
      setResolvedComplaints(resolvedComplaintsWithNames);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Error fetching complaints');
    } finally {
      // Stop the loading indicators
      setLoadingPending(false);
      setLoadingResolved(false);
    }
  };
  
  // UseEffect hook to call fetchComplaints on component mount
  useEffect(() => {
    fetchComplaints(); // Initial fetch on component mount
  }, []); // Empty dependency array to run only once
  


  const handleResolve = async (complaintId) => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/admin/complaints/${complaintId}/resolve`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Complaint marked as resolved');

      setPendingComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
      const resolvedComplaint = pendingComplaints.find((complaint) => complaint._id === complaintId);
      setResolvedComplaints((prev) => [...prev, { ...resolvedComplaint, status: 'resolved' }]);
    } catch (error) {
      console.error('Error resolving complaint:', error);
      toast.error('Error resolving complaint');
    }
  };

  const handleReject = async (complaintId) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_URL}/admin/complaints/${complaintId}/reject`,
        { status: 'rejected' }, // Update the status to 'rejected'
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Complaint marked as rejected');
  
      // Move the complaint from pending or resolved lists to the rejected list
      setPendingComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
      setResolvedComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
    } catch (error) {
      console.error('Error rejecting complaint:', error);
      toast.error('Error rejecting complaint');
    }
  };
  

  const handleOpenSearchPage = () => {
    navigate('/admin/search-complaints');
  };


  // useEffect(() => {
  //   // Setting up the socket listener
  //   if (socket) {
  //     socket.on('complaintRequest', async (data) => {
  //       // When a new complaint is received via socket, fetch the corresponding buddie_name
  //       const buddie_name = await fetchBuddieName(data.buddie_id);
  //       // console.log(data);
  
  //       // If the complaint is pending, add it to the pendingComplaints state
  //       if (data.status === 'pending') {
  //         setPendingComplaints((prev) => [...prev, { ...data, buddie_name }]);
  //         // console.log(pendingComplaints);
  //       }

  
  //       // If the complaint is resolved, add it to the resolvedComplaints state
  //       if (data.status === 'resolved') {
  //         setResolvedComplaints((prev) => [...prev, { ...data, buddie_name }]);
  //       }
  //     });
  
  //     // Cleanup socket listener when component unmounts
  //     return () => {
  //       socket.off('complaintRequest');
  //     };
  //   }
  // }, [socket]); // Re-run when socket changes
  

  
    // useEffect(() => {
  //   // Setting up the socket listener
  //   if (socket) {
  //     socket.on('complaintRequest', async (data) => {
  //       try {
  //         // Log the incoming data for debugging
  //         console.log("Received complaint data:", data);
  
  //         // Ensure buddie_id exists before fetching
  //         if (!data.buddie_id) {
  //           console.warn("Missing buddie_id in complaint data:", data);
  //           return;
  //         }
  
  //         // Fetch buddie name
  //         const buddie_name = await fetchBuddieName(data.buddie_id);
  
  //         // If the complaint is pending, add it to the pendingComplaints state
  //         if (data.status === 'pending') {
  //           setPendingComplaints((prev) => [
  //             ...prev,
  //             { ...data, buddie_name },
  //           ]);
  //         }
  
  //         // If the complaint is resolved, add it to the resolvedComplaints state
  //         if (data.status === 'resolved') {
  //           setResolvedComplaints((prev) => [
  //             ...prev,
  //             { ...data, buddie_name },
  //           ]);
  //         }
  //       } catch (error) {
  //         console.error("Error handling complaintRequest:", error);
  //       }
  //     });
  
  //     // Cleanup socket listener when component unmounts
  //     return () => {
  //       socket.off('complaintRequest');
  //     };
  //   }
  // }, [socket]);
  


  // useEffect(() => {
  //   if (socket) {
  //     const handleComplaintRequest = async (data) => {
  //       try {
  //         // Log incoming data for debugging
  //         // console.log("Received complaint data:", data);
  
  //         // Ensure buddie_id exists before proceeding
  //         if (!data.buddie_id) {
  //           console.warn("Missing buddie_id in complaint data:", data);
  //           return;
  //         }
  
  //         // Fetch the buddy name for the incoming complaint
  //         const buddie_name = await fetchBuddieName(data.buddie_id);
  
  //         // Update the state based on the complaint's status
  //         if (data.status === 'pending') {
  //           setPendingComplaints((prev) => [
  //             ...prev,
  //             { ...data, buddie_name },
  //           ]);
  //         } else if (data.status === 'resolved') {
  //           setResolvedComplaints((prev) => [
  //             ...prev,
  //             { ...data, buddie_name },
  //           ]);
  //         }
  //       } catch (error) {
  //         console.error("Error processing complaintRequest:", error);
  //       }
  //     };
  
  //     // Listen to the 'complaintRequest' event
  //     socket.on('complaintRequest', handleComplaintRequest);
  
  //     // Cleanup socket listener when component unmounts
  //     return () => {
  //       socket.off('complaintRequest', handleComplaintRequest);
  //     };
  //   }
  // }, [socket]);




useEffect(() => {
  if (socket) {
    const handleComplaintRequest = async (data) => {
      try {
        // Log incoming data for debugging
        // console.log("Received complaint data:", data);

        // Ensure buddie_id exists before proceeding
        if (!data.buddie_id) {
          console.warn("Missing buddie_id in complaint data:", data);
          return;
        }

        // Fetch the buddy name for the incoming complaint
        const buddie_name = await fetchBuddieName(data.buddie_id);

        // Update the state based on the complaint's status
        if (data.status === 'pending') {
          setPendingComplaints((prev) => [
            ...prev,
            { ...data, buddie_name },
          ]);
        } else if (data.status === 'resolved') {
          setResolvedComplaints((prev) => [
            ...prev,
            { ...data, buddie_name },
          ]);
        }
      } catch (error) {
        console.error("Error processing complaintRequest:", error);
      }
    };

    // Listen to the 'complaintRequest' event
    socket.on('complaintRequest', handleComplaintRequest);

    // Cleanup socket listener when component unmounts or socket changes
    return () => {
      if (socket) {
        socket.off('complaintRequest', handleComplaintRequest);
      }
    };
  }
}, [socket]);

  












  const handleChangeTab = (event, newValue) => setActiveTab(newValue);
  const handleChangePagePending = (event, newPage) => setPagePending(newPage);
  const handleChangePageResolved = (event, newPage) => setPageResolved(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);


  

  // const renderTableContent = (complaints, loading, isPending = true) => (
  //   loading ? (
  //     <TableRow>
  //       <TableCell colSpan={6} align="center">
  //         <Typography>Loading...</Typography>
  //       </TableCell>
  //     </TableRow>
  //   ) : complaints.length === 0 ? (
  //     <TableRow>
  //       <TableCell colSpan={6} align="center">
  //         <img src={notFound} alt="No data found" style={{ width: '150px', margin: '20px 0' }} />
  //         <Typography>No complaints found</Typography>
  //       </TableCell>
  //     </TableRow>
  //   ) : (
  //     complaints
  //       .slice(
  //         isPending ? pagePending * rowsPerPage : pageResolved * rowsPerPage,
  //         (isPending ? pagePending : pageResolved) * rowsPerPage + rowsPerPage
  //       )
  //       .map((complaint) => (
  //         <TableRow key={complaint._id}>
  //           <TableCell>{complaint.buddie_name || "Unknown"}</TableCell>
  //           <TableCell>{complaint.buddie_id?.room_no || "loading"}</TableCell>
  //           <TableCell>{complaint.complaint_name}</TableCell>
  //           <TableCell>{complaint.description}</TableCell>
  //           <TableCell>
  //             <Chip label={complaint.status} color={isPending ? "warning" : "success"} />
  //           </TableCell>
  //           {isPending && (
  //             <TableCell>
  //               <Box sx={{ display: 'flex', gap: 1 }}>
  //                 <IconButton
  //                   onClick={() => handleResolve(complaint._id)}
  //                   sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#FFB300' }, boxShadow: 1 }}
  //                 >
  //                   <CheckIcon />
  //                 </IconButton>
  //                 <IconButton
  //                   onClick={() => handleReject(complaint._id)}
  //                   sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#E57373' }, boxShadow: 1 }}
  //                 >
  //                   <DeleteIcon />
  //                 </IconButton>
  //               </Box>
  //             </TableCell>
  //           )}
  //         </TableRow>
  //       ))
  //   )
  // );


  // const renderListContent = (complaints, loading, isPending = true) => (
  //   loading ? (
  //     <Box sx={{ padding: 2, textAlign: 'center' }}>
  //       <Typography variant="h6">Loading...</Typography>
  //     </Box>
  //   ) : complaints.length === 0 ? (
  //     <Box sx={{ padding: 2, textAlign: 'center' }}>
  //       <img src={notFound} alt="No data found" style={{ width: '150px', margin: '20px 0' }} />
  //       <Typography>No complaints found</Typography>
  //     </Box>
  //   ) : (
  //     complaints
  //       .slice(
  //         isPending ? pagePending * rowsPerPage : pageResolved * rowsPerPage,
  //         (isPending ? pagePending : pageResolved) * rowsPerPage + rowsPerPage
  //       )
  //       .map((complaint) => (
  //         <ListItem key={complaint._id} sx={{ padding: 2 }}>
  //           <Card sx={{ width: '100%', boxShadow: 3, marginBottom: 2, borderRadius: 2 }}>
  //             <CardContent>
  //               <Typography variant="h6" color="primary">{complaint.buddie_name || "Unknown"}</Typography>
  //               <Typography variant="body2" color="textSecondary">Room: {complaint.buddie_id?.room_no || "loading"}</Typography>
  //               <Typography variant="body2" color="textSecondary">Complaint: {complaint.complaint_name}</Typography>
  //               <Typography variant="body2" color="textSecondary" paragraph>{complaint.description}</Typography>
  //               <Chip label={complaint.status} color={isPending ? "warning" : "success"} sx={{ marginTop: 1 }} />
  //             </CardContent>
  
  //             {isPending && (
  //               <CardActions sx={{ justifyContent: 'flex-end' }}>
  //                 <Box sx={{ display: 'flex', gap: 1 }}>
  //                   <IconButton
  //                     onClick={() => handleResolve(complaint._id)}
  //                     sx={{
  //                       backgroundColor: 'green',
  //                       color: 'white',
  //                       '&:hover': { backgroundColor: '#FFB300' },
  //                       boxShadow: 1
  //                     }}
  //                   >
  //                     <CheckIcon />
  //                   </IconButton>
  //                   <IconButton
  //                     onClick={() => handleReject(complaint._id)}
  //                     sx={{
  //                       backgroundColor: 'red',
  //                       color: 'white',
  //                       '&:hover': { backgroundColor: '#E57373' },
  //                       boxShadow: 1
  //                     }}
  //                   >
  //                     <DeleteIcon />
  //                   </IconButton>
  //                 </Box>
  //               </CardActions>
  //             )}
  //           </Card>
  //         </ListItem>
  //       ))
  //   )
  // );
  
  
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };



  return (
    <div>
      <Header_sub />
      <Box padding={2} onClick={handleOpenSearchPage} sx={{ cursor: 'pointer' }} mt={10}>
        <TextField
          fullWidth
          label="Search Complaints"
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
{/* 
      <Tabs value={activeTab} onChange={handleChangeTab} centered>
        <Tab label="Pending Complaints" />
        <Tab label="Resolved Complaints" />
      </Tabs> */}






  {/* <>
    {activeTab === 0 && (
      <Box p={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: 'tomato' }}>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableContent(pendingComplaints, loadingPending, true)}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pendingComplaints.length}
          rowsPerPage={rowsPerPage}
          page={pagePending}
          onPageChange={handleChangePagePending}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    )}

    {activeTab === 1 && (
      <Box p={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: 'tomato' }}>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableContent(resolvedComplaints, loadingResolved, false)}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={resolvedComplaints.length}
          rowsPerPage={rowsPerPage}
          page={pageResolved}
          onPageChange={handleChangePageResolved}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    )}
 
</> */}


<Tabs value={activeTab} onChange={handleChangeTab} centered>
      <Tab label="Pending" />
      <Tab label="Complaints" />
</Tabs>

<Box role="tabpanel" hidden={activeTab !== 0}>
  <Box sx={{ mb: 4, mt: 3 ,p:1}}>
    {pendingComplaints.length === 0 ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 300,
        }}
      >
        <img
          src={notFound}
          alt="No Complaints Found"
          style={{ width: '200px', height: 'auto' }}
        />
        <Typography variant="h6" color="textSecondary">
          No Complaints Found
        </Typography>
      </Box>
    ) : (
      <List
        sx={{
          bgcolor: 'background.paper',
          // borderRadius: 3,
          // boxShadow: 3,
          overflow: 'hidden',
          p: 0,
        }}
      >
        {pendingComplaints.map((complaint) => (
          <ListItem
            key={complaint._id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              borderBottom: '1px solid #f0f0f0',
              p: 2,
              '&:hover': {
                backgroundColor: '#f9f9f9',
              },
            }}
          >
            {/* Top Row: Buddie Name */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ textTransform: 'capitalize' }}
              >
                {complaint.buddie_name || 'Unknown'}
              </Typography>
              {/* <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: 12 }}
              >
                 {new Date(complaint.createdAt).toISOString().slice(0, 10)}

                 
              </Typography> */}

<Typography
  variant="body2"
  color="textSecondary"
  sx={{ fontSize: 12 }}
>
  {complaint?.createdAt 
    ? new Date(complaint.createdAt).toISOString().slice(0, 10) 
    : "Invalid Date"}
</Typography>

            </Box>

            {/* Middle Row: Complaint Details */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {complaint.complaint_name}
              </Typography>
            
              <Chip
                label={complaint.status}
                size="small"
                color={complaint.status === 'pending' ? 'warning' : 'success'}
              />
              
            </Box>

            <Typography variant="body2" color="textSecondary">
                {complaint.description}
              </Typography>
            {/* Bottom Row: Actions */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',  // Center the buttons
                gap: 1,
                mt: 1,
              }}
            >
              <IconButton
                onClick={() => handleResolve(complaint._id)}
                sx={{
                  // backgroundColor: 'green',
                  // color: 'white',
                  // '&:hover': { backgroundColor: '#FFB300' },
                  // boxShadow: 1,

                  backgroundColor: 'green',
                  color: 'white',
                  '&:hover': { backgroundColor: '#FFB300' },
                  boxShadow: 1,
                  width: '100%',   // Set width for square shape
                  // height: 40,  // Set height for square shape
                  borderRadius: 2,  // Optional: rounded corners

                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => handleReject(complaint._id)}
                sx={{
                  // backgroundColor: 'tomato',
                  // color: 'white',
                  // '&:hover': { backgroundColor: '#E57373' },
                  // boxShadow: 1,
                  backgroundColor: 'tomato',
                  color: 'white',
                  '&:hover': { backgroundColor: '#E57373' },
                  boxShadow: 1,
                  width: '100%',   // Set width for square shape
                  // height: 40,  // Set height for square shape
                  borderRadius: 2,  // Optional: rounded corners
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    )}
  </Box>
</Box>

{/* Resolved Complaints Tab */}
{/* <Box role="tabpanel" hidden={activeTab !== 1}>


  <Box sx={{ mb: 4, mt: 3 ,p:1}}>
    {resolvedComplaints.length === 0 ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 300,
        }}
      >
        <img
          src={notFound}
          alt="No Complaints Found"
          style={{ width: '200px', height: 'auto' }}
        />
        <Typography variant="h6" color="textSecondary">
          No Complaints Found
        </Typography>
      </Box>
    ) : (
      <List
        sx={{
          bgcolor: 'background.paper',
          // borderRadius: 3,
          boxShadow: 1,
          overflow: 'hidden',
          p: 0,

          
        }}
      >
        {resolvedComplaints.map((complaint) => (
          <ListItem
            key={complaint._id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              // borderBottom: '1px solid #f0f0f0',
              p: 1,
              '&:hover': {
                backgroundColor: '#f9f9f9',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ textTransform: 'capitalize' }}
              >
                {complaint.buddie_name || 'Unknown'}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: 12 }}
              >
                 {new Date(complaint.createdAt).toISOString().slice(0, 10)}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {complaint.complaint_name}
              </Typography>

              
          
              <Chip
                label={complaint.status}
                size="small"
                color={complaint.status === 'pending' ? 'warning' : 'success'}
              />
            </Box>
         

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1,
                mt: 1,
              }}
            >
                 <Typography variant="body2" textAlign={'left'} color="textSecondary">
                {complaint.description}
              </Typography>
              
            </Box>
            
          </ListItem>
        ))}

        
      </List>
    )}
  </Box>


</Box> */}

<Box role="tabpanel" hidden={activeTab !== 1}>
<Box sx={{ mb: 4, mt: 3, p: 1 }}>
        {resolvedComplaints.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}
          >
            <img
              src={notFound}
              alt="No Complaints Found"
              style={{ width: '200px', height: 'auto' }}
            />
            <Typography variant="h6" color="textSecondary">
              No Complaints Found
            </Typography>
          </Box>
        ) : (
          <List
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              overflow: 'hidden',
              p: 0,
            }}
          >
            {resolvedComplaints.map((complaint, index) => (
              <ListItem
                key={complaint._id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
                onClick={() => handleToggle(index)}
              >
                {/* Top Row: Buddie Name */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {complaint.buddie_name || 'Unknown'}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: 12 }}
                  >
                    {new Date(complaint.createdAt).toISOString().slice(0, 10)}
                  </Typography>
                </Box>

                {/* Middle Row: Complaint Name and Status */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {complaint.complaint_name}
                  </Typography>
                  <Chip
                    label={complaint.status}
                    size="small"
                    color={complaint.status === 'rejected' ? 'warning' : 'success'}
                  />
                </Box>

                {/* Toggleable Description */}
                {expandedIndex === index && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2" textAlign="left" color="textSecondary">
                      {complaint.description}
                    </Typography>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      </Box>


      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );

  
};

export default ComplaintList;