import { supabase } from '../lib/supabase';

export const propertyService = {
  // Get all properties
  getAll: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get single property by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Upload an image to Supabase Storage
  uploadImage: async (file) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  // Create new property (admin only)
  create: async (propertyData) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([{
        name: propertyData.name,
        locality: propertyData.locality,
        college: propertyData.college,
        price: propertyData.price,
        total: propertyData.total,
        gender: propertyData.gender,
        sharing: propertyData.sharing,
        rating: propertyData.rating || 5.0,
        reviews: propertyData.reviews || 0,
        verified: propertyData.verified ?? true,
        rooms_left: propertyData.roomsLeft || 3,
        amenities: propertyData.amenities || ['WiFi', 'AC', 'CCTV'],
        tags: propertyData.tags || ['New Listing'],
        rules: propertyData.rules || [],
        metro: propertyData.metro,
        hospital: propertyData.hospital,
        map_url: propertyData.mapUrl,
        description: propertyData.description,
        owner_phone: propertyData.ownerPhone,
        cover_image: propertyData.coverImage,
        gallery_images: propertyData.galleryImages || [],
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update property (admin only)
  update: async (id, updates) => {
    // Convert camelCase to snake_case for database
    const dbUpdates = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.locality !== undefined) dbUpdates.locality = updates.locality;
    if (updates.college !== undefined) dbUpdates.college = updates.college;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.total !== undefined) dbUpdates.total = updates.total;
    if (updates.gender !== undefined) dbUpdates.gender = updates.gender;
    if (updates.sharing !== undefined) dbUpdates.sharing = updates.sharing;
    if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
    if (updates.reviews !== undefined) dbUpdates.reviews = updates.reviews;
    if (updates.verified !== undefined) dbUpdates.verified = updates.verified;
    if (updates.roomsLeft !== undefined) dbUpdates.rooms_left = updates.roomsLeft;
    if (updates.amenities !== undefined) dbUpdates.amenities = updates.amenities;
    if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
    if (updates.rules !== undefined) dbUpdates.rules = updates.rules;
    if (updates.metro !== undefined) dbUpdates.metro = updates.metro;
    if (updates.hospital !== undefined) dbUpdates.hospital = updates.hospital;
    if (updates.mapUrl !== undefined) dbUpdates.map_url = updates.mapUrl;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.ownerPhone !== undefined) dbUpdates.owner_phone = updates.ownerPhone;
    if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;
    if (updates.galleryImages !== undefined) dbUpdates.gallery_images = updates.galleryImages;

    const { data, error } = await supabase
      .from('properties')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete property (admin only)
  delete: async (id) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Search properties
  search: async (query) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .or(`name.ilike.%${query}%,locality.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Filter properties
  filter: async (filters) => {
    let query = supabase.from('properties').select('*');

    if (filters.gender) {
      query = query.eq('gender', filters.gender);
    }
    if (filters.verified !== undefined) {
      query = query.eq('verified', filters.verified);
    }
    if (filters.minPrice) {
      query = query.gte('total', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('total', filters.maxPrice);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Subscribe to real-time changes
  subscribeToChanges: (callback) => {
    const channelId = `properties-changes-${Math.random().toString(36).substring(7)}`;
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

// Helper to convert DB row to frontend format
export const mapPropertyFromDB = (row) => ({
  id: row.id,
  name: row.name,
  locality: row.locality,
  college: row.college,
  price: row.price,
  total: row.total,
  gender: row.gender,
  sharing: row.sharing,
  rating: parseFloat(row.rating),
  reviews: row.reviews,
  verified: row.verified,
  roomsLeft: row.rooms_left,
  amenities: row.amenities || [],
  tags: row.tags || [],
  rules: row.rules || [],
  metro: row.metro,
  hospital: row.hospital,
  mapUrl: row.map_url,
  description: row.description,
  ownerPhone: row.owner_phone,
  coverImage: row.cover_image,
  galleryImages: row.gallery_images || [],
});

export default propertyService;
