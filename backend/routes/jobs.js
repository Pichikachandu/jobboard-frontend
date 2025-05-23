const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  const job = new Job({
    company: req.body.company,
    logo: req.body.logo || '/images/default-company.png',
    position: req.body.position,
    experience: req.body.experience || '1-3 yr Exp',
    locationType: req.body.locationType || 'Remote',
    salary: req.body.salary || 'Competitive salary',
    description: req.body.description,
    jobType: req.body.jobType || 'Full-time',
    postedTime: 'Just now'
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a job
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        job[key] = req.body[key];
      }
    });

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    await job.remove();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
