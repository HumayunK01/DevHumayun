import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// You'll need to replace these with your actual Supabase project credentials
// Get them from: https://app.supabase.com/project/_/settings/api

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to increment visitor count
export async function incrementVisitorCount() {
    try {
        // First, try to get the current count
        const { data, error } = await supabase
            .from('visitor_stats')
            .select('count')
            .eq('id', 1)
            .single();

        if (error && error.code !== 'PGRST116') {
            // PGRST116 means no rows found, which is fine for first time
            console.error('Error fetching visitor count:', error);
            return null;
        }

        const currentCount = data?.count || 0;
        const newCount = currentCount + 1;

        // Update or insert the count
        const { data: updatedData, error: updateError } = await supabase
            .from('visitor_stats')
            .upsert({ id: 1, count: newCount }, { onConflict: 'id' })
            .select()
            .single();

        if (updateError) {
            console.error('Error updating visitor count:', updateError);
            return null;
        }

        return updatedData.count;
    } catch (error) {
        console.error('Error in incrementVisitorCount:', error);
        return null;
    }
}

// Function to get current visitor count without incrementing
export async function getVisitorCount() {
    try {
        const { data, error } = await supabase
            .from('visitor_stats')
            .select('count')
            .eq('id', 1)
            .single();

        if (error) {
            console.error('Error fetching visitor count:', error);
            return null;
        }

        return data?.count || 0;
    } catch (error) {
        console.error('Error in getVisitorCount:', error);
        return null;
    }
}
