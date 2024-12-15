import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import Header_sub from '../Header_sub'; // Assuming Header_sub is a separate component

const NoticePeriodList = () => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch data from the API
  //   const fetchNoticePeriodData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_URL}/admin/notice-period`);
  //       const data = await response.json();
  //       setBuddies(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching notice period data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchNoticePeriodData();
  // }, []);


  const hostelId = localStorage.getItem('hostel_id');


  useEffect(() => {
    // Fetch data from the API
    const fetchNoticePeriodData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/admin/notice-period?hostel_id=${hostelId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setBuddies(data);
      } catch (error) {
        console.error('Error fetching notice period data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hostelId) {
      fetchNoticePeriodData();
    }
  }, [hostelId]); // Re-run the effect if hostelId changes

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Header_sub />
        <CircularProgress sx={{ marginTop: 2 }} />
      </Box>
    );
  }

  if (buddies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Header_sub />
        <Typography variant="h6" color="textSecondary" mt={5}>
          No buddies are currently serving their notice period.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Header_sub />
      <Typography variant="h5" gutterBottom align="center" color="primary" mt={10}>
        Notice Period List
      </Typography>
      <List>
        {buddies.map((buddie) => (
          <React.Fragment key={buddie._id}>
            <ListItem>
              <Card sx={{ width: '100%', marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {buddie.buddie_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Room: {buddie.room_no}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Last Working Day: {new Date(buddie.last_working_day).toLocaleDateString()}
                  </Typography>
                  <Chip label="Notice Period" color="warning" sx={{ marginTop: 1 }} />
                </CardContent>
              </Card>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NoticePeriodList;
