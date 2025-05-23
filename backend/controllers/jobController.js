// backend/controllers/jobController.js
const Job = require('../models/Job');

// Helper function to build search query
const buildSearchQuery = (queryParams) => {
  const {
    search,
    location,
    jobType,
    experience,
    minSalary,
    maxSalary,
    company
  } = queryParams;

  const query = { isActive: true };

  // Text search
  if (search) {
    query.$text = { $search: search };
  }

  // Exact match filters
  if (location && location !== 'All Locations') {
    query.locationType = location;
  }

  if (jobType && jobType !== 'All Types') {
    query.jobType = jobType;
  }

  if (experience && experience !== 'All Experience') {
    query.experience = experience;
  }

  if (company) {
    query.company = new RegExp(company, 'i'); // Case-insensitive company search
  }

  // Salary range filter
  const salaryQuery = {};
  if (minSalary) {
    salaryQuery.$gte = parseInt(minSalary);
  }
  if (maxSalary) {
    salaryQuery.$lte = parseInt(maxSalary);
  }
  if (Object.keys(salaryQuery).length > 0) {
    // Extract numeric value from salary string (e.g., "12LPA" -> 12)
    query.$expr = {
      $let: {
        vars: {
          salaryNum: {
            $toInt: {
              $arrayElemAt: [
                { $split: ["$salary", "LPA"] },
                0
              ]
            }
          }
        },
        in: {
          $and: [
            minSalary ? { $gte: ["$$salaryNum", parseInt(minSalary)] } : true,
            maxSalary ? { $lte: ["$$salaryNum", parseInt(maxSalary)] } : true
          ].filter(cond => cond !== true)
        }
      }
    };
  }

  return query;
};

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = buildSearchQuery(req.query);

    // Get total count for pagination
    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Public
const createJob = async (req, res) => {
  try {
    console.log('Received job data:', req.body);
    
    // Basic validation
    const requiredFields = ['company', 'position'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        fields: missingFields
      });
    }

    // Format job data with defaults
    const jobData = {
      company: req.body.company,
      logo: req.body.logo || '/images/default-company.png',
      position: req.body.position,
      experience: req.body.experience || '1-3 yr Exp',
      locationType: req.body.locationType || 'Onsite',
      salary: req.body.salary || '12LPA',
      description: req.body.description || 'No description provided',
      postedTime: 'Just now',
      jobType: req.body.jobType || 'Full Time',
      applicationDeadline: req.body.applicationDeadline || 'Not specified'
    };

    // Create and save job
    const job = new Job(jobData);
    const createdJob = await job.save();
    
    console.log('Created job:', createdJob);
    
    res.status(201).json({
      success: true,
      data: createdJob
    });
  } catch (error) {
    console.error('Error creating job:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate job entry',
        error: 'A job with similar details already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Public
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Public
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get job statistics
// @route   GET /api/jobs/stats
// @access  Public
const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$jobType',
          count: { $sum: 1 },
          avgSalary: { $avg: { $toInt: { $arrayElemAt: [{ $split: ["$salary", "LPA"] }, 0] } } }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting job stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting job statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobStats
};