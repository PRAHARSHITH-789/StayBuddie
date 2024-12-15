import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionDetails,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  AccordionSummary,
  Chip,
  Skeleton,
} from '@mui/material';
import { ExpandMore, WhatsApp } from "@mui/icons-material";
import Header_sub from '../Header_sub';

const UnpaidBuddiesList = () => {
  const [unpaidBuddies, setUnpaidBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hostelId = localStorage.getItem('hostel_id');

  useEffect(() => {
    const fetchUnpaidBuddies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/unpaid-buddies`, {
          params: { hostelId },
        });

        if (response?.data && Array.isArray(response.data)) {
          setUnpaidBuddies(response.data);
        } else {
          setError('Invalid data format from server');
        }
      } catch (err) {
        console.error('Error fetching unpaid buddies:', err);
        setError('Failed to fetch unpaid buddies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidBuddies();
  }, [hostelId]);

  if (error) {
    return (
      <Box mt={12}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Header_sub />
      <Box mt={12}>
        {loading ? (
          [...Array(5)].map((_, index) => (
            <Card key={index} sx={{ margin: "10px 0", boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Skeleton variant="text" width={120} height={25} sx={{ marginBottom: 1 }} />
                  <Skeleton variant="text" width={180} height={20} />
                </Box>
                <Skeleton variant="rectangular" width={40} height={40} />
              </CardContent>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Skeleton variant="text" width={200} height={20} />
                  <Skeleton variant="text" width={100} height={20} />
                </AccordionDetails>
              </Accordion>
            </Card>
          ))
        ) : unpaidBuddies.length === 0 ? (
          <Typography variant="h6">No unpaid buddies found.</Typography>
        ) : (
          unpaidBuddies.map((buddie, index) => (
            <Card key={index} sx={{ margin: "10px 0", boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    {buddie.name || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {buddie.contact ? `Contact: ${buddie.contact}` : "Contact not available"}
                  </Typography>
                </Box>
                {buddie.contact && (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginLeft: "auto", minWidth: "40px", padding: 1 }}
                    onClick={() =>
                      window.open(
                        `https://wa.me/${buddie.contact}?text=Hello ${buddie.name}, please pay your rent. You are overdue for ${buddie.unpaidMonths} month(s).`,
                        "_blank"
                      )
                    }
                  >
                    <WhatsApp />
                  </Button>
                )}
              </CardContent>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="textSecondary">
                    {buddie.lastPaymentMonth
                      ? `Last Payment Date: ${new Date(buddie.lastPaymentMonth).toLocaleDateString()}`
                      : "No Payment History"}
                  </Typography>
                  <Typography variant="body2" color="error">
                    Months Unpaid: {buddie.unpaidMonths || 0}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
};

export default UnpaidBuddiesList;
