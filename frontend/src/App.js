import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Hostel from './Hostel';
import AddingHostel from './admin/AddingHostel';
import AddBuddie from './admin/AddBuddie';
import AddRoom from './admin/AddRoom';
import HostelProfile from './admin/HostelProfile';
import ThankYouScreen from './admin/ThankYouScreen';
import Hostels from './Hostels';
import AboutUs from './AboutUs';
// import Login from './Login';

import ProtectedRoute from './ProtectedRoute';
import BuddieProtectedRoute from './BuddieProtectedRoute';

import TermsAndConditions from './TermsAndConditions';
import Settings from './admin/settings';
import HostelFees from './admin/HostelFees';
import FoodMenu from './admin/FoodMenu';
import BuddieLogin from './buddie/BuddieLogin';
import BuddieHome from './buddie/BuddieHome';
import BuddieProfile from './buddie/BuddieProfile';
import Payments from './buddie/Payments';
import AdminPayments from './admin/AdminPayments';
import Complaints from './admin/AdminComplaints';
import Complaint from './buddie/Complaint';
import BuddieRating from './buddie/BuddieRating';
import DhobiCloths from './buddie/DhobiCloths';
import AddingBuddie from './AddingBuddie';
import UnapprovedBuddies from './admin/UnapprovedBuddies';
import BuddieDetails from './admin/BuddieDetails';
import SearchRoom from './admin/SearchRoom';
import SearchBuddie from './admin/SearchBuddie';
import SearchPayments from './admin/SearchPayments';
import SearchComplaints from './admin/SearchComplaints';
import SearchHostels from './SearchHostel';
import HelpCenter from './HelpCenter';
import AdminTerms from './admin/AdminTerms'
import AdminHelp from './admin/AdminHelp'
import AdminDhobiCloths from './admin/AdminDhobiCloths'
import UnpaidBuddiesList from './admin/UnpaidBuddiesList';
import UnpaidDaywise from './admin/UnpaidDaywise';
// import Floor from './admin/Floor';


import { io } from "socket.io-client";
import { useUserContext } from './HostelContext';
import { useBuddieContext } from './BuddieContext';
// import toast,{Toaster} from 'react-hot-toast';
import toast,{Toaster} from 'react-hot-toast';
import NoticePeriodList from './admin/NoticePeriodList';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const isBuddieAuthenticated = !!localStorage.getItem('buddieAuthToken');

  const [socket, setSocket] = useState(null);
  const { user } = useUserContext(); // Get user from context

  const [buddieSocket, setBuddieSocket] = useState(null);
  const { buddie } = useBuddieContext(); // Get user from context





  useEffect(() => {
    // Create the socket connection only if user exists and no socket is currently connected
    if (user && !socket) {
      const socketInstance = io( `${process.env.REACT_APP_URlSocket}`, {
        query: { userId: user },
      });
      setSocket(socketInstance);
      

      console.log('Socket connected:', socketInstance);

      // Cleanup the socket connection when the component unmounts
      return () => {
        if (!user && socket) {
          socket.disconnect();
          setSocket(null); // Clear the socket reference
          // console.log("dis");
        }
      };
    }
  }, [user, socket]);



  useEffect(() => {
    // Create the socket connection only if user exists and no socket is currently connected
    if (buddie && !buddieSocket) {
      const socketInstance = io(`${process.env.REACT_APP_URlSocket}`, {
        query: { userId: buddie },
      });
      setBuddieSocket(socketInstance);

      console.log('Socket connected:', socketInstance);

      // Cleanup the socket connection when the component unmounts
      return () => {
        if (!buddie && buddieSocket) {
          buddieSocket.disconnect();
          setBuddieSocket(null); // Clear the socket reference
          // console.log("dis");
        }
      };
    }
  }, [buddie, buddieSocket]);





  useEffect(() => {
    socket?.on("paymentRequest", (data) => {
      // Show a toast when "firstevent" is received
      // toast.info(msg);
      // console.log("called");
      toast.success("Recieved a Payment Request", {
        duration: 4000,
        style: {
          width: "300px",
        },
      });
      // play();
    });

  }, [socket]);





  useEffect(() => {
    socket?.on("complaintRequest", (data) => {
      // Show a toast when "firstevent" is received
      // toast.info(msg);
      // console.log("called");
      toast.success("Recieved a Complaint Request", {
        duration: 4000,
        style: {
          width: "300px",
        },
      });
      // play();
    });



  }, [socket]);




  // console.log("Socket in Router:", buddieSocket); // Should log a valid socket instance


  return (

    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hostel/:id" element={<Hostel />} />
        <Route path="/addBuddie/:hostel_id" element={<AddingBuddie />} />

        <Route path="/a" element={<AddingHostel />} />
        <Route path="/thanks" element={<ThankYouScreen />} />
        <Route path="/hostels" element={<Hostels />} />

        <Route path="/search-hostels" element={<SearchHostels />} /> {/* Add the search route */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/buddie-login" element={<BuddieLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/help" element={<HelpCenter />} />






        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="search-buddies" element={<SearchBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="search-rooms" element={<SearchRoom />} />
          <Route path="settings" element={<Settings socket={socket} />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} />
          <Route path="payments" element={<AdminPayments socket={socket} />} />
          <Route path="search-payments" element={<SearchPayments />} />
          <Route path="complaints" element={<Complaints socket={socket} />} />
          <Route path="search-complaints" element={<SearchComplaints />} />
          <Route path="pendingRequests" element={<UnapprovedBuddies />} />
          <Route path="buddie/:id" element={<BuddieDetails />} />
          <Route path="terms-conditions" element={<AdminTerms />} />
          <Route path="help-center" element={<AdminHelp />} />
          <Route path="dhobi" element={<AdminDhobiCloths />} />
          <Route path="notice-period" element={<NoticePeriodList />} />
          <Route path="unpaid-buddies" element={<UnpaidBuddiesList />} />
          <Route path="unpaid-daywise" element={<UnpaidDaywise />} />
          {/* <Route path="floor" element={<Floor />} /> */}




        </Route>


        {/* Protected Routes */}
        <Route path="/buddie/*" element={<BuddieProtectedRoute isBuddieAuthenticated={isBuddieAuthenticated} />}>
          <Route path="home" element={<BuddieHome />} />
          <Route path="profile" element={<BuddieProfile />} />
          <Route path="payments" element={<Payments buddieSocket={buddieSocket} />} />
          <Route path="complaint" element={<Complaint buddieSocket={buddieSocket} />} />

          <Route path="rating" element={<BuddieRating />} />
          <Route path="dhobi" element={<DhobiCloths />} />




          {/* <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
