import { supabase } from '../lib/supabase';

export const enquiryService = {
  // Get all enquiries (admin only)
  getAll: async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create new enquiry
  create: async (enquiryData) => {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([{
        student_name: enquiryData.studentName,
        phone: enquiryData.phone,
        email: enquiryData.email,
        message: enquiryData.message,
        property_id: enquiryData.propertyId,
        pg_name: enquiryData.pgName,
        status: 'New',
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update enquiry status (admin only)
  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete enquiry (admin only)
  delete: async (id) => {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Get enquiries count by status
  getCountByStatus: async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('status');

    if (error) throw error;

    const counts = { New: 0, Contacted: 0, Closed: 0 };
    data.forEach((item) => {
      if (counts[item.status] !== undefined) {
        counts[item.status]++;
      }
    });
    return counts;
  },

  // Subscribe to real-time changes
  subscribeToChanges: (callback) => {
    return supabase
      .channel('enquiries-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'enquiries' },
        callback
      )
      .subscribe();
  },
};

// Helper to convert DB row to frontend format
export const mapEnquiryFromDB = (row) => ({
  id: row.id,
  studentName: row.student_name,
  phone: row.phone,
  email: row.email,
  message: row.message,
  propertyId: row.property_id,
  pgName: row.pg_name,
  status: row.status,
  date: new Date(row.created_at).toLocaleDateString(),
});

export default enquiryService;
