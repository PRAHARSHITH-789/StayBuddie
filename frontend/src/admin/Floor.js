// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const FloorRoomManagement = () => {
//   const [hostelId, setHostelId] = useState(localStorage.getItem('hostel_id') || '');
//   const [floorNumber, setFloorNumber] = useState('');
//   const [rooms, setRooms] = useState([{ roomNumber: '', vacancy: true }]);
//   const [floors, setFloors] = useState([]);
//   const [editFloorId, setEditFloorId] = useState(null);
//   const [open, setOpen] = useState(false);

//   const fetchFloors = async () => {
//     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/floors/${hostelId}`);
//     setFloors(response.data);
//   };

//   useEffect(() => {
//     if (hostelId) fetchFloors();
//   }, [hostelId]);

//   const handleAddRoom = () => {
//     setRooms([...rooms, { roomNumber: '', vacancy: true }]);
//   };

//   const handleRoomChange = (index, field, value) => {
//     const updatedRooms = [...rooms];
//     updatedRooms[index][field] = field === 'vacancy' ? value === 'true' : value;
//     setRooms(updatedRooms);
//   };

//   const handleSubmit = async () => {
//     if (editFloorId) {
//       await axios.put(`${process.env.REACT_APP_URL}/admin/update-floor/${editFloorId}`, { hostelId, floorNumber, rooms });
//     } else {
//       await axios.post(`${process.env.REACT_APP_URL}/admin/add-floor`, { hostelId, floorNumber, rooms });
//     }

//     handleClose();
//     fetchFloors();
//   };

//   const handleEdit = (floor) => {
//     setEditFloorId(floor._id);
//     setFloorNumber(floor.floorNumber);
//     setRooms(floor.rooms);
//     setOpen(true);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${process.env.REACT_APP_URL}/admin/delete-floor/${id}`);
//     fetchFloors();
//   };

//   const handleOpen = () => {
//     setEditFloorId(null);
//     setFloorNumber('');
//     setRooms([{ roomNumber: '', vacancy: true }]);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Floor Room Management</Typography>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Floor
//       </Button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{editFloorId ? 'Edit Floor' : 'Add Floor'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Floor Number"
//             value={floorNumber}
//             onChange={(e) => setFloorNumber(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           {rooms.map((room, index) => (
//             <Paper key={index} style={{ padding: '1rem', marginBottom: '1rem' }}>
//               <TextField
//                 label="Room Number"
//                 value={room.roomNumber}
//                 onChange={(e) => handleRoomChange(index, 'roomNumber', e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Vacancy (true/false)"
//                 value={room.vacancy}
//                 onChange={(e) => handleRoomChange(index, 'vacancy', e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//             </Paper>
//           ))}
//           <Button onClick={handleAddRoom} variant="outlined">Add Room</Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit} color="primary">{editFloorId ? 'Update' : 'Submit'}</Button>
//         </DialogActions>
//       </Dialog>

//       <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>Existing Floors</Typography>
//       <List>
//         {floors.map((floor) => (
//           <ListItem key={floor._id} divider>
//             <ListItemText
//               primary={`Floor ${floor.floorNumber}`}
//               secondary={`Rooms: ${floor.rooms.map(r => r.roomNumber + (r.vacancy ? ' (Vacant)' : ' (Occupied)')).join(', ')}`}
//             />
//             <IconButton onClick={() => handleEdit(floor)}>
//               <EditIcon />
//             </IconButton>
//             <IconButton onClick={() => handleDelete(floor._id)} color="error">
//               <DeleteIcon />
//             </IconButton>
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default FloorRoomManagement;
