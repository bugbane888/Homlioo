import { supabase } from '../lib/supabase';

export const favoritesService = {
  // Get all favorites for current user
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map((f) => f.property_id);
  },

  // Add property to favorites
  add: async (userId, propertyId) => {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{
        user_id: userId,
        property_id: propertyId,
      }])
      .select()
      .single();

    if (error) {
      // Ignore duplicate errors
      if (error.code === '23505') return null;
      throw error;
    }
    return data;
  },

  // Remove property from favorites
  remove: async (userId, propertyId) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId);

    if (error) throw error;
    return true;
  },

  // Toggle favorite status
  toggle: async (userId, propertyId) => {
    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

    if (existing) {
      await favoritesService.remove(userId, propertyId);
      return false; // Removed
    } else {
      await favoritesService.add(userId, propertyId);
      return true; // Added
    }
  },

  // Check if property is favorited
  isFavorited: async (userId, propertyId) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },
};

export default favoritesService;
