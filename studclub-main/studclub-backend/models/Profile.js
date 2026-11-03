const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    gender: {
      type: String,
      enum: ['female', 'male'],
      required: [true, 'Gender is required']
    },
    age: {
      type: Number,
      required: [true, 'Age is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    locality: {
      type: String,
      required: [true, 'Locality is required'],
      trim: true
    },
    services: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 25
    },
    verified: {
      type: Boolean,
      default: true
    },
    photo: {
      type: String,
      required: [true, 'Photo is required']
    },
    tagline: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    languages: {
      type: [String],
      default: ['English', 'Hindi']
    },
    profession: {
      type: String,
      default: 'Companionship Specialist'
    },
    height: {
      type: String,
      default: "5'7\""
    },
    badge: {
      type: String,
      default: 'Verified VIP'
    },
    membershipTierRequired: {
      type: String,
      default: 'Gold STUDD VIP'
    },
    consultationRate: {
      type: String,
      default: '₹25,000 / Session'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', ProfileSchema);
