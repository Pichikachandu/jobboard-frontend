// backend/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  // Required fields
  company: { 
    type: String, 
    required: [true, 'Company name is required'] 
  },
  position: { 
    type: String, 
    required: [true, 'Job position is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Job description is required'],
    default: 'No description provided'
  },
  
  // Fields with defaults
  logo: { 
    type: String, 
    default: '/images/default-company.png' 
  },
  experience: { 
    type: String, 
    default: '1-3 yr Exp' 
  },
  locationType: { 
    type: String, 
    default: 'Onsite' 
  },
  salary: { 
    type: String, 
    default: '12LPA' 
  },
  postedTime: { 
    type: String, 
    default: '24h Ago' 
  },
  jobType: { 
    type: String, 
    default: 'Full Time',
    enum: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Remote']
  },
  applicationDeadline: { 
    type: String, 
    default: 'Not specified' 
  },
  
  // System fields
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add a text index for search functionality
jobSchema.index({
  company: 'text',
  position: 'text',
  description: 'text'
});

// Virtual for formatted job data
jobSchema.virtual('formattedJob').get(function() {
  return {
    id: this._id,
    company: this.company,
    logo: this.logo,
    position: this.position,
    experience: this.experience,
    locationType: this.locationType,
    salary: this.salary,
    postedTime: this.postedTime,
    description: this.description,
    jobType: this.jobType,
    applicationDeadline: this.applicationDeadline,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
});

// Pre-save hook to update postedTime
jobSchema.pre('save', function(next) {
  if (this.isNew) {
    this.postedTime = 'Just now';
  }
  next();
});

module.exports = mongoose.model('Job', jobSchema);