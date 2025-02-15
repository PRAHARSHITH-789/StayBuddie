import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, CircularProgress, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Header_sub from '../Header_sub';

const UnpaidBuddiesList = () => {
  const [hostelId, setHostelId] = useState(localStorage.getItem('hostel_id') || '');
  const [date, setDate] = useState('');
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUnpaidBuddies = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/unpaid-buddies-by-date`, {
        params: { hostelId, date },
      });
      setBuddies(response.data);
    } catch (err) {
      setError('Failed to fetch unpaid buddies. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hostelId && date) {
      fetchUnpaidBuddies();
    }
  }, []);

  const handleWhatsAppMessage = (contact) => {
    window.open(`https://wa.me/${contact}`, '_blank');
  };

  return (
    <div>
        <Header_sub />
 
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Unpaid Buddies List
      </Typography>
      <TextField
        label="Select Date"
        type="date"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchUnpaidBuddies}
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Fetch Unpaid Buddies'}
      </Button>

      {error && <Typography color="error" style={{ marginTop: '1rem' }}>{error}</Typography>}

      {buddies.length > 0 && (
        <Paper style={{ marginTop: '1.5rem', padding: '1rem' }}>
          <List>
            {buddies.map((buddie, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={buddie.name}
                  secondary={`Room: ${buddie.roomNumber || 'N/A'} | Contact: ${buddie.contact} | DOJ: ${new Date(buddie.dateOfJoining).toLocaleDateString()}`}
                />
                <IconButton
                  color="success"
                  onClick={() => handleWhatsAppMessage(buddie.contact)}
                >
                  <WhatsAppIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {buddies.length === 0 && !loading && !error && (
        <Typography style={{ marginTop: '1rem' }}>No unpaid buddies found.</Typography>
      )}
    </Container>
    </div>
  );
};

export default UnpaidBuddiesList;
