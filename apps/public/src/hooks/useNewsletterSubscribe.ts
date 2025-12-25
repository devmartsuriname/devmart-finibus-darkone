/**
 * useNewsletterSubscribe Hook
 * 
 * Handles newsletter subscription form submission.
 * Inserts into newsletter_subscribers table.
 * Phase 7 — Homepage Dynamic Wiring
 */

import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface UseNewsletterSubscribeResult {
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  isSubmitting: boolean;
}

export function useNewsletterSubscribe(): UseNewsletterSubscribeResult {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Basic validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return { success: false, message: 'Please enter your email address.' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: trimmedEmail, source: 'homepage' });

      if (error) {
        // Handle duplicate email (unique constraint violation)
        if (error.code === '23505') {
          return { success: true, message: 'You are already subscribed!' };
        }
        throw error;
      }

      return { success: true, message: 'Thank you for subscribing!' };
    } catch (err) {
      console.error('Newsletter subscribe error:', err);
      return { success: false, message: 'Subscription failed. Please try again.' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
}

export default useNewsletterSubscribe;
