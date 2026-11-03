const fs = require('fs');
const path = require('path');
const Profile = require('../models/Profile');
const { getIsConnected } = require('../config/db');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');
const SEED_FILE = path.join(DATA_DIR, 'seedProfiles.json');

// Ensure data folder and file exists
const initLocalStore = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PROFILES_FILE)) {
    let initialData = [];
    if (fs.existsSync(SEED_FILE)) {
      try {
        initialData = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
      } catch (e) {
        initialData = [];
      }
    }
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(initialData, null, 2), 'utf8');
  }
};

initLocalStore();

const readLocalProfiles = () => {
  try {
    initLocalStore();
    const data = fs.readFileSync(PROFILES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local profiles:', err);
    return [];
  }
};

const writeLocalProfiles = (profiles) => {
  try {
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing local profiles:', err);
    return false;
  }
};

// Seed MongoDB if empty and connected
const seedMongoIfEmpty = async () => {
  if (!getIsConnected()) return;
  try {
    const count = await Profile.countDocuments();
    if (count === 0) {
      console.log('Seeding MongoDB with initial profiles...');
      const localData = readLocalProfiles();
      if (localData.length > 0) {
        await Profile.insertMany(localData);
        console.log(`Seeded ${localData.length} profiles into MongoDB.`);
      }
    }
  } catch (err) {
    console.error('Error during MongoDB seeding:', err.message);
  }
};

// Service functions
const getAll = async (query = {}) => {
  const { gender, city, category, search, verified } = query;

  if (getIsConnected()) {
    try {
      const filter = {};
      if (gender && gender !== 'all') filter.gender = gender;
      if (city && city !== 'All Cities') filter.city = new RegExp(city, 'i');
      if (category && !category.startsWith('All')) filter.category = category;
      if (verified !== undefined && verified !== '') filter.verified = verified === 'true';

      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [
          { name: regex },
          { locality: regex },
          { city: regex },
          { category: regex },
          { profession: regex }
        ];
      }

      const profiles = await Profile.find(filter).sort({ createdAt: -1 });
      return profiles;
    } catch (err) {
      console.warn('MongoDB query failed, falling back to local store:', err.message);
    }
  }

  // Fallback to local JSON store
  let list = readLocalProfiles();

  if (gender && gender !== 'all') {
    list = list.filter((p) => p.gender === gender);
  }
  if (city && city !== 'All Cities') {
    list = list.filter((p) => p.city?.toLowerCase() === city.toLowerCase());
  }
  if (category && !category.startsWith('All')) {
    list = list.filter((p) => p.category === category);
  }
  if (verified !== undefined && verified !== '') {
    const isV = verified === 'true';
    list = list.filter((p) => Boolean(p.verified) === isV);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.locality?.toLowerCase().includes(s) ||
        p.city?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s) ||
        p.profession?.toLowerCase().includes(s)
    );
  }

  return list;
};

const getById = async (id) => {
  if (getIsConnected()) {
    try {
      const profile = await Profile.findOne({ id });
      if (profile) return profile;
    } catch (err) {
      console.warn('MongoDB getById failed, using local store:', err.message);
    }
  }

  const list = readLocalProfiles();
  return list.find((p) => p.id === id) || null;
};

const create = async (profileData) => {
  // Generate unique ID if not provided
  if (!profileData.id) {
    const prefix = profileData.gender === 'female' ? 'w' : 'm';
    profileData.id = `${prefix}_${Date.now()}`;
  }

  // Ensure arrays are parsed
  if (typeof profileData.services === 'string') {
    try {
      profileData.services = JSON.parse(profileData.services);
    } catch {
      profileData.services = profileData.services.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  if (typeof profileData.languages === 'string') {
    try {
      profileData.languages = JSON.parse(profileData.languages);
    } catch {
      profileData.languages = profileData.languages.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }

  profileData.age = Number(profileData.age) || 24;
  profileData.rating = Number(profileData.rating) || 4.9;
  profileData.reviewCount = Number(profileData.reviewCount) || 12;
  profileData.verified = profileData.verified === true || profileData.verified === 'true';

  let savedDoc = null;
  if (getIsConnected()) {
    try {
      savedDoc = await Profile.create(profileData);
    } catch (err) {
      console.warn('MongoDB create failed, writing to local store:', err.message);
    }
  }

  // Always keep local JSON store updated as mirror/fallback
  const list = readLocalProfiles();
  // prepend so new items appear at top
  const newList = [profileData, ...list.filter((p) => p.id !== profileData.id)];
  writeLocalProfiles(newList);

  return savedDoc ? savedDoc.toObject() : profileData;
};

const update = async (id, updateData) => {
  if (typeof updateData.services === 'string') {
    try {
      updateData.services = JSON.parse(updateData.services);
    } catch {
      updateData.services = updateData.services.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  if (typeof updateData.languages === 'string') {
    try {
      updateData.languages = JSON.parse(updateData.languages);
    } catch {
      updateData.languages = updateData.languages.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  if (updateData.age !== undefined) updateData.age = Number(updateData.age);
  if (updateData.rating !== undefined) updateData.rating = Number(updateData.rating);
  if (updateData.reviewCount !== undefined) updateData.reviewCount = Number(updateData.reviewCount);
  if (updateData.verified !== undefined) {
    updateData.verified = updateData.verified === true || updateData.verified === 'true';
  }

  let updatedDoc = null;
  if (getIsConnected()) {
    try {
      updatedDoc = await Profile.findOneAndUpdate({ id }, { $set: updateData }, { new: true });
    } catch (err) {
      console.warn('MongoDB update failed, updating local store:', err.message);
    }
  }

  const list = readLocalProfiles();
  const index = list.findIndex((p) => p.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...updateData };
    writeLocalProfiles(list);
    return updatedDoc ? updatedDoc.toObject() : list[index];
  }

  return updatedDoc ? updatedDoc.toObject() : null;
};

const remove = async (id) => {
  let deletedFromMongo = false;
  if (getIsConnected()) {
    try {
      const res = await Profile.findOneAndDelete({ id });
      deletedFromMongo = !!res;
    } catch (err) {
      console.warn('MongoDB delete failed, removing from local store:', err.message);
    }
  }

  const list = readLocalProfiles();
  const initialLength = list.length;
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length !== initialLength) {
    writeLocalProfiles(filtered);
    return true;
  }

  return deletedFromMongo;
};

const getStats = async () => {
  const all = await getAll();
  const femaleCount = all.filter((p) => p.gender === 'female').length;
  const maleCount = all.filter((p) => p.gender === 'male').length;
  const verifiedCount = all.filter((p) => p.verified).length;

  const cityDistribution = {};
  all.forEach((p) => {
    if (p.city) {
      cityDistribution[p.city] = (cityDistribution[p.city] || 0) + 1;
    }
  });

  return {
    total: all.length,
    femaleCount,
    maleCount,
    verifiedCount,
    citiesCount: Object.keys(cityDistribution).length,
    cityDistribution
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getStats,
  seedMongoIfEmpty
};
