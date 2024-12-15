// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Chip,
//   Box,
//   styled,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




// const LocationChip1 = styled(Chip)({
//     // marginTop: '15px',
//     fontFamily: 'Anta',
//     fontSize: '18px',
//     textAlign:'center'
//   });


// const RoomVacancyList = ({ hostelId }) => {
//   const [roomData, setRoomData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRoomData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms/grouped`, {
//           params: { hostelId },
//         });
  
//         // Sort sharing groups
//         const sortedData = response.data.sort((a, b) => a._id - b._id);
  
//         // Sort rooms inside each group by room_number
//         sortedData.forEach((group) => {
//           group.rooms.sort((roomA, roomB) => parseInt(roomA.room_number) - parseInt(roomB.room_number));
//         });
  
//         setRoomData(sortedData);
//       } catch (err) {
//         setError('Failed to fetch room data');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchRoomData();
//   }, [hostelId]);
  

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//         <Box  textAlign={'center'}>
//         <LocationChip1 label={'Vacancies'} style={{marginBottom:'15px'}}/>

//         </Box>


//     {roomData.map((group) => (
//       <Accordion key={group._id}>
//        <AccordionSummary
//   expandIcon={<ExpandMoreIcon />}
//   aria-controls={`panel-${group._id}-content`}
//   id={`panel-${group._id}-header`}
// >
//   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//     {/* Sharing Type */}
//     <Typography variant="h6" style={{ color: 'tomato' }}>
//       {group._id} Sharing
//     </Typography>
    
//     {/* Total Vacancies */}
//     <Typography style={{ color: 'gray' }}>
//       ({group.totalVacancies})
//     </Typography>
//   </div>
// </AccordionSummary>

//         <AccordionDetails>
//           <Box display="flex" flexWrap="wrap" gap={1}>
//             {group.rooms.map((room) => (
//               <Chip
//                 key={room.room_number}
//                 label={`Room ${room.room_number} (${room.room_vacancy} Vacancies)`}
//                 // color="warning"
//                 style={{color:'darkcyan'}}
//                 variant="outlined"
//               />
//             ))}
//           </Box>
//         </AccordionDetails>
//       </Accordion>
//     ))}
//   </div>
//   );
// };

// export default RoomVacancyList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LocationChip1 = styled(Chip)({
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign: 'center',
});

const RoomVacancyList = ({ hostelId }) => {
  const [roomData, setRoomData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Fetch vacancy data
        const roomResponse = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms/grouped`, {
          params: { hostelId },
        });

        // Fetch notice period data
        const noticeResponse = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms/notice-count`, {
          params: { hostelId },
        });

        // Sort sharing groups
        const sortedData = roomResponse.data.sort((a, b) => a._id - b._id);

        // Sort rooms inside each group by room_number
        sortedData.forEach((group) => {
          group.rooms.sort((roomA, roomB) => parseInt(roomA.room_number) - parseInt(roomB.room_number));
        });

        setRoomData(sortedData);
        setNoticeData(noticeResponse.data); // Save notice data
      } catch (err) {
        setError('Failed to fetch room data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [hostelId]);

  const getNoticeCountForRoom = (roomNumber) => {
    const noticeRoom = noticeData.find((notice) => notice._id === roomNumber);
    return noticeRoom ? noticeRoom.noticeCount : 0;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Box textAlign={'center'}>
        <LocationChip1 label={'Vacancies'} style={{ marginBottom: '15px' }} />
      </Box>

      {roomData.map((group) => (
        <Accordion key={group._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${group._id}-content`}
            id={`panel-${group._id}-header`}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Sharing Type */}
              <Typography variant="h6" style={{ color: 'tomato' }}>
                {group._id} Sharing
              </Typography>

              {/* Total Vacancies */}
              <Typography style={{ color: 'gray' }}>({group.totalVacancies})</Typography>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {group.rooms.map((room) => {
                const noticeCount = getNoticeCountForRoom(room.room_number);

                return (
                  <Chip
                    key={room.room_number}
                    label={`Room ${room.room_number} (${room.room_vacancy} Vacancies) ${
                      noticeCount > 0 ? `| ${noticeCount} Notice` : ''
                    }`}
                    style={{ color: 'darkcyan' }}
                    variant="outlined"
                  />
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default RoomVacancyList;
