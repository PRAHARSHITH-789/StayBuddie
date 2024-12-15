const mongoose = require('mongoose');

const buddieHistorySchema = new mongoose.Schema({
  buddie_name: { type: String, required: true },
  buddie_dob: { type: Date, required: true },
  buddie_gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  buddie_contact: { type: String, required: true },
  buddie_email: { type: String, default: '' },
  buddie_profession: { type: String, enum: ['Work', 'Student'], required: true },
  buddie_guardian_name: { type: String, required: true },
  buddie_emergency_contact: { type: String, required: true },
  buddie_id_proof: { type: String, required: true },
  buddie_bike_no: { type: String, default: '' },
  buddie_photo: { type: String, default: '' },
  hostel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
  room_no: { type: String, default: '' },
  buddie_doj: { type: Date, default: Date.now },
  last_working_day: { type: Date, required: true }, // Date the notice period ends
  notice_period_start_date: { type: Date, required: true }, // Date the notice period started
  rent_due: Number,
  paid_rents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
});

module.exports = mongoose.model('BuddieHistory', buddieHistorySchema);
