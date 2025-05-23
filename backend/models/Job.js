const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  logo: { type: String, default: '/images/default-company.png' },
  position: { type: String, required: true },
  experience: { type: String, required: true, default: '1-3 yr Exp' },
  locationType: { type: String, required: true, default: 'Remote' },
  salary: { type: String, required: true, default: 'Competitive salary' },
  description: { type: String, required: true },
  jobType: { type: String, required: true, default: 'Full-time' },
  postedTime: { type: String, default: 'Posted 2 days ago' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
