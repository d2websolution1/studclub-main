const express = require('express');
const router = express.Router();
const profileStore = require('../services/profileStore');
const upload = require('../middleware/upload');

// GET /api/stats - Statistics for Admin Dashboard
router.get('/stats', async (req, res) => {
  try {
    const stats = await profileStore.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/profiles - List all profiles with filtering
router.get('/', async (req, res) => {
  try {
    const profiles = await profileStore.getAll(req.query);
    res.json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/profiles/:id - Get single profile
router.get('/:id', async (req, res) => {
  try {
    const profile = await profileStore.getById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/profiles - Create new profile
// Supports both multipart/form-data (with file upload) and application/json
router.post('/', upload.single('photoFile'), async (req, res) => {
  try {
    const body = { ...req.body };

    // If an image was uploaded, construct URL path
    if (req.file) {
      body.photo = `/uploads/${req.file.filename}`;
    }

    if (!body.name || !body.gender || !body.category || !body.city || !body.locality) {
      return res.status(400).json({
        success: false,
        message: 'Name, gender, category, city, and locality are required fields.'
      });
    }

    if (!body.photo) {
      // Provide a clean gender-based placeholder if none provided
      body.photo = body.gender === 'female' ? '/images/w1.jpg' : '/images/m1.jpg';
    }

    const newProfile = await profileStore.create(body);
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: newProfile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/profiles/:id - Update profile
router.put('/:id', upload.single('photoFile'), async (req, res) => {
  try {
    const body = { ...req.body };

    if (req.file) {
      body.photo = `/uploads/${req.file.filename}`;
    }

    const updated = await profileStore.update(req.params.id, body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/profiles/:id/toggle-verified - Toggle verified flag
router.patch('/:id/toggle-verified', async (req, res) => {
  try {
    const existing = await profileStore.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const newStatus = !existing.verified;
    const updated = await profileStore.update(req.params.id, { verified: newStatus });

    res.json({
      success: true,
      message: `Profile verification set to ${newStatus}`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/profiles/:id - Delete profile
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await profileStore.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({
      success: true,
      message: 'Profile deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
