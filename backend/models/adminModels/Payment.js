// const mongoose = require('mongoose');

// // Define the payment schema
// const paymentSchema = new mongoose.Schema({
//   // Reference to the Buddie making the payment
//   buddie_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Buddie',
//     required: true
//   },
  
//   buddie_name:{
//     type:String,
//     required:true
//   },
  
//   // Reference to the Hostel where the payment is made
//   hostel_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hostel',
//     required: true
//   },
  
//   // Amount of the payment
//   amount: {
//     type: Number,
//     required: true
//   },
  
//   paidAmount:{
//     type:Number,
//     require: true
//   },

//   pendingBalance:{
//     type:Number,
//     require:true,
//   },
//   // Date of the payment, defaulting to the current date
//   date: {
//     type: Date,
//     default: Date.now
//   },
  
//   // Status of the payment (e.g., pending, accepted, rejected)
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected'],
//     default: 'pending'
//   },
  
//   // Month and year for which the payment is made (e.g., "January 2024")
//   month: {
//     type: String,
//     required: true
//   }
// });

// // Export the model
// module.exports = mongoose.model('Payment', paymentSchema);




const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    buddie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Buddie',
      required: true,
    },
    buddie_name: {
      type: String,
      required: true,
    },
    room_no: {
      type: String,
      required: true,
    },
    rent_amount: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
    pending_amount: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
      default: Date.now
    },
    month: {
      type: String, // Format: "YYYY-MM"
      required: true,
    },
    hostel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hostel',
      required: true,
    },
    status: {
      type: String,
      enum: ['paid', 'unpaid', 'partial'],
      required: true,
    },
  },
);

module.exports = mongoose.model('Payment', paymentSchema);
