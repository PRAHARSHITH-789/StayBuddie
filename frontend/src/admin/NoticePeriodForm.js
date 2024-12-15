import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography, Box } from '@mui/material';
import axios from 'axios';

const NoticePeriodForm = ({ buddieId, onNoticeAdded }) => {
  const [open, setOpen] = useState(false);
  const [noticePeriodStartDate, setNoticePeriodStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [lastWorkingDay, setLastWorkingDay] = useState('');
  const [isServingNotice, setIsServingNotice] = useState(false);
  const [storedLastWorkingDay, setStoredLastWorkingDay] = useState(null);

  useEffect(() => {
    const fetchNoticeStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddie/notice-status/${buddieId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
  
        // console.log('API Response:', response.data); // Debugging API response
  
        if (response.data.isServingNotice) {
          setIsServingNotice(true);
          setStoredLastWorkingDay(response.data.lastWorkingDay);
        } else {
          setIsServingNotice(false);
        }
      } catch (error) {
        console.error('Error fetching notice status:', error);
      }
    };
  
    fetchNoticeStatus();
  }, [buddieId]);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/admin/buddie/notice/${buddieId}`,
        {
          notice_period_start_date: noticePeriodStartDate,
          last_working_day: lastWorkingDay,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );

      // Notify parent about successful addition
      if (onNoticeAdded) onNoticeAdded();

      // Update state
      setIsServingNotice(true);
      setStoredLastWorkingDay(lastWorkingDay);
      handleClose();
    } catch (error) {
      console.error('Error starting notice period:', error);
    }
  };

  return (
    <Box marginTop={4}>
      {isServingNotice ? (
        <Typography variant="h6" color="secondary">
          Notice Period<br />
          Last Working Day: {new Date(storedLastWorkingDay).toLocaleDateString()}
        </Typography>
      ) : (
        <>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Start Notice Period
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Start Notice Period</DialogTitle>
            <DialogContent>
              <TextField
                label="Notice Period Start Date"
                type="date"
                fullWidth
                margin="normal"
                value={noticePeriodStartDate}
                onChange={(e) => setNoticePeriodStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Last Working Day"
                type="date"
                fullWidth
                margin="normal"
                value={lastWorkingDay}
                onChange={(e) => setLastWorkingDay(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default NoticePeriodForm;
