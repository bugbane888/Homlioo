import { supabase } from '../lib/supabase';

const isDev = process.env.NODE_ENV === 'development';
const devLog = (...a) => isDev && console.log(...a);
const devError = (...a) => isDev && console.error(...a);

// ─── Logging helpers ────────────────────────────────────────────────────────
const log = (action, data) => devLog(`[PropertyService] ${action}`, data ?? '');
const logError = (action, error) => devError(`[PropertyService] ❌ ${action}`, error);

// ─── Public Service API ──────────────────────────────────────────────────────
export const propertyService = {

  // Get all PUBLISHED properties (for public listings page)
  getAll: async () => {
    log('getAll', 'Fetching published properties...');
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      logError('getAll', error);
      throw error;
    }
    log('getAll', `Fetched ${data.length} properties`);
    return data;
  },

  // Get ALL properties regardless of status (for admin panel)
  getAllAdmin: async () => {
    log('getAllAdmin', 'Fetching all properties for admin...');
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logError('getAllAdmin', error);
      throw error;
    }
    log('getAllAdmin', `Fetched ${data.length} properties`);
    return data;
  },

  // Get single property by ID
  getById: async (id) => {
    log('getById', id);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logError('getById', error);
      throw error;
    }
    return data;
  },

  // Upload an image to Supabase Storage — returns the public URL
  uploadImage: async (file) => {
    if (!file) {
      log('uploadImage', 'No file provided, skipping');
      return null;
    }
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `images/${fileName}`;

    log('uploadImage', `Uploading ${file.name} → ${filePath}`);

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file, { upsert: false });

    if (uploadError) {
      logError('uploadImage', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);

    log('uploadImage', `Public URL: ${data.publicUrl}`);
    return data.publicUrl;
  },

  // Upload multiple images — returns array of public URLs (nulls filtered out)
  uploadImages: async (files) => {
    if (!files || files.length === 0) return [];
    log('uploadImages', `Uploading ${files.length} images...`);
    const results = await Promise.all(
      files.map(f => propertyService.uploadImage(f))
    );
    const urls = results.filter(Boolean);
    log('uploadImages', `Uploaded ${urls.length} / ${files.length} images`);
    return urls;
  },

  // Create new property (admin only)
  create: async (propertyData) => {
    log('create', propertyData);
    const payload = buildDbPayload(propertyData);
    const { data, error } = await supabase
      .from('properties')
      .insert([payload])
      .select()
      .single();

    if (error) {
      logError('create', error);
      throw error;
    }
    log('create', `Created property id=${data.id}`);
    return data;
  },

  // Update property (admin only)
  update: async (id, updates) => {
    log('update', { id, updates });
    const payload = buildDbPayload(updates);
    const { data, error } = await supabase
      .from('properties')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logError('update', error);
      throw error;
    }
    log('update', `Updated property id=${id}`);
    return data;
  },

  // Publish a property — sets status to 'published'
  publish: async (id) => {
    log('publish', `Publishing property id=${id}`);
    const { data, error } = await supabase
      .from('properties')
      .update({ status: 'published', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logError('publish', error);
      throw error;
    }
    log('publish', `Property id=${id} is now published`);
    return data;
  },

  // Delete property (admin only)
  delete: async (id) => {
    log('delete', id);
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      logError('delete', error);
      throw error;
    }
    log('delete', `Deleted property id=${id}`);
    return true;
  },

  // Search properties (published only)
  search: async (query) => {
    log('search', query);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'published')
      .or(`name.ilike.%${query}%,locality.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      logError('search', error);
      throw error;
    }
    return data;
  },

  // Filter properties (published only)
  filter: async (filters) => {
    log('filter', filters);
    let query = supabase.from('properties').select('*').eq('status', 'published');

    if (filters.gender) query = query.eq('gender', filters.gender);
    if (filters.verified !== undefined) query = query.eq('verified', filters.verified);
    if (filters.minPrice) query = query.gte('total', filters.minPrice);
    if (filters.maxPrice) query = query.lte('total', filters.maxPrice);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) {
      logError('filter', error);
      throw error;
    }
    return data;
  },

  // Subscribe to real-time changes
  subscribeToChanges: (callback) => {
    const channelId = `properties-changes-${Math.random().toString(36).substring(7)}`;
    log('subscribeToChanges', `Channel: ${channelId}`);
    return supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        callback
      )
      .subscribe();
  },
};

// ─── Internal helper: build the DB payload from frontend data ────────────────
function buildDbPayload(data) {
  const payload = {};

  // Only include fields that are explicitly provided (don't overwrite with undefined)
  if (data.name !== undefined) payload.name = data.name;
  if (data.locality !== undefined) payload.locality = data.locality;
  if (data.city !== undefined) payload.city = data.city;
  if (data.state !== undefined) payload.state = data.state;
  if (data.pincode !== undefined) payload.pincode = data.pincode;
  if (data.college !== undefined) payload.college = data.college;
  if (data.collegeTime !== undefined) payload.college_time = data.collegeTime;
  if (data.collegeDistance !== undefined) payload.college_distance = data.collegeDistance;
  if (data.metroTime !== undefined) payload.metro_time = data.metroTime;
  if (data.metroDistance !== undefined) payload.metro_distance = data.metroDistance;
  if (data.hospitalTime !== undefined) payload.hospital_time = data.hospitalTime;
  if (data.hospitalDistance !== undefined) payload.hospital_distance = data.hospitalDistance;
  if (data.price !== undefined) payload.price = data.price;
  if (data.total !== undefined) payload.total = data.total;
  if (data.gender !== undefined) payload.gender = data.gender;
  if (data.sharing !== undefined) payload.sharing = data.sharing;
  if (data.rating !== undefined) payload.rating = data.rating;
  if (data.reviews !== undefined) payload.reviews = data.reviews;
  if (data.verified !== undefined) payload.verified = data.verified;
  if (data.isPremium !== undefined) payload.is_premium = data.isPremium;
  if (data.isVerified !== undefined) payload.verified = data.isVerified;
  if (data.roomsLeft !== undefined) payload.rooms_left = data.roomsLeft;
  if (data.amenities !== undefined) payload.amenities = data.amenities;
  if (data.tags !== undefined) payload.tags = data.tags;
  if (data.rules !== undefined) payload.rules = data.rules;
  if (data.metro !== undefined) payload.metro = data.metro;
  if (data.hospital !== undefined) payload.hospital = data.hospital;
  if (data.mapUrl !== undefined) payload.map_url = data.mapUrl;
  if (data.description !== undefined) payload.description = data.description;
  if (data.ownerName !== undefined) payload.owner_name = data.ownerName;
  if (data.ownerPhone !== undefined) payload.owner_phone = data.ownerPhone;
  if (data.coverImage !== undefined) payload.cover_image = data.coverImage;
  if (data.galleryImages !== undefined) payload.gallery_images = data.galleryImages;
  // Rooms (full JSONB structure with per-room pricing)
  if (data.rooms !== undefined) payload.rooms = data.rooms;
  // Electricity — only store if explicitly provided (avoid defaulting to 500)
  if (data.electricity !== undefined && data.electricity !== '') {
    payload.electricity = parseInt(data.electricity, 10) || null;
  }
  // Status for draft/publish workflow
  if (data.status !== undefined) payload.status = data.status;

  return payload;
}

// ─── Map DB row → frontend format ────────────────────────────────────────────
export const mapPropertyFromDB = (row) => {
  // Safely parse rooms from JSONB (may be null for old records)
  const rooms = row.rooms || null;

  // Derive price/total from rooms if available, otherwise fall back to DB columns
  const validRents = rooms 
    ? Object.values(rooms).map(r => parseInt(r.rent || 0, 10)).filter(rent => rent > 0)
    : [];
  const basePrice = validRents.length > 0 ? Math.min(...validRents) : row.price;

  return {
    id: row.id,
    name: row.name,
    locality: row.locality,
    city: row.city || '',
    state: row.state || '',
    pincode: row.pincode || '',
    college: row.college,
    collegeTime: row.college_time || '',
    collegeDistance: row.college_distance || '',
    price: basePrice || row.price || 0,
    total: row.total || basePrice || 0,
    gender: row.gender,
    sharing: row.sharing,
    rating: parseFloat(row.rating) || 0,
    reviews: row.reviews || 0,
    verified: row.verified || false,
    isPremium: row.is_premium || false,
    roomsLeft: row.rooms_left || 0,
    amenities: row.amenities || [],
    tags: row.tags || [],
    rules: row.rules || [],
    metro: row.metro || '',
    metroTime: row.metro_time || '',
    metroDistance: row.metro_distance || '',
    hospital: row.hospital || '',
    hospitalTime: row.hospital_time || '',
    hospitalDistance: row.hospital_distance || '',
    mapUrl: row.map_url || '',
    description: row.description || '',
    ownerName: row.owner_name || '',
    ownerPhone: row.owner_phone || '',
    coverImage: row.cover_image || '',
    // galleryImages: ensure it's always an array of strings, never null
    galleryImages: Array.isArray(row.gallery_images)
      ? row.gallery_images.filter(Boolean)
      : [],
    // rooms: full per-room pricing object from JSONB
    rooms: rooms,
    // electricity: only set if explicitly stored; null means "not specified"
    electricity: row.electricity ?? null,
    // status: default to 'published' for backward compatibility with old rows
    status: row.status || 'published',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

export default propertyService;
