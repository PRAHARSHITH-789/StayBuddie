import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const NoticePeriodBuddie = () => {
  const [open, setOpen] = useState(false);
  const [noticePeriodStartDate, setNoticePeriodStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [lastWorkingDay, setLastWorkingDay] = useState('');
  const [isServingNotice, setIsServingNotice] = useState(false);
  const [storedLastWorkingDay, setStoredLastWorkingDay] = useState(null);
  const [error, setError] = useState(null); // For displaying errors

  const buddie_id = localStorage.getItem('buddie_id');

  useEffect(() => {
    const fetchNoticeStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/notice-status`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('buddieAuthToken')}` },
        });

        // console.log(response.data)
        if (response.data.isServingNotice) {
          setIsServingNotice(true);
          setStoredLastWorkingDay(response.data.lastWorkingDay);
        } else {
          setIsServingNotice(false);
        }
      } catch (error) {
        console.error('Error fetching notice status:', error);
        setError('Failed to fetch notice status. Please try again later.');
      }
    };

    fetchNoticeStatus();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/buddie/notice`,
        {
          notice_period_start_date: noticePeriodStartDate,
          last_working_day: lastWorkingDay,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('buddieAuthToken')}` },
        }
      );

      // Update state
      setIsServingNotice(true);
      setStoredLastWorkingDay(lastWorkingDay);
      handleClose();
    } catch (error) {
      console.error('Error starting notice period:', error);
      setError('Failed to start the notice period. Please try again later.');
    }
  };

  return (
    <Box marginTop={4}>
      {isServingNotice ? (
        <Typography variant="h6" color="primary">
          You are currently in your notice period.
          <br />
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

      {/* Snackbar for Error Handling */}
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default NoticePeriodBuddie;
