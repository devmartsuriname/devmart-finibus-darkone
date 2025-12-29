-- Phase 11J: Insert Google Maps embed URL setting
INSERT INTO settings (key, value, category, description)
VALUES (
  'google_maps_embed_url',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.3157198076087!2d-55.210390399999994!3d5.811011000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d09cb1c9fa0fa57%3A0x11a16b158301b22f!2sDevmart!5e0!3m2!1sen!2s!4v1766971935073!5m2!1sen!2s',
  'general',
  'Google Maps embed URL for the Contact page map. Must start with https://www.google.com/maps/embed?pb='
);