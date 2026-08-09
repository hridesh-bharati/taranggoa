import { eventService } from '@/services/event.service';

export const eventController = {
  // Fetch All Events
  async fetchAllEvents() {
    try {
      return await eventService.getAllEvents();
    } catch (error) {
      console.error('Fetch Events Error:', error);
      throw new Error('Failed to load events list.');
    }
  },

  // Helper: Read Multiple Image Files as Data URLs
  async processImageFiles(files) {
    if (!files || files.length === 0) return [];

    const fileArray = Array.from(files);
    const promises = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    return await Promise.all(promises);
  },

  // Helper: Upload Single File/Base64 to existing /api/upload Route
  async uploadSingleToCloudinary(item) {
    // Agar pehle se Cloudinary/HTTP URL h to wapas upload mat karo
    if (typeof item === 'string' && item.startsWith('http')) {
      return item;
    }

    const formData = new FormData();

    if (item instanceof File) {
      formData.append('file', item);
    } else if (typeof item === 'string' && item.startsWith('data:')) {
      // Base64 string ko Blob banakar upload karenge
      const res = await fetch(item);
      const blob = await res.blob();
      formData.append('file', blob, `event_${Date.now()}.jpg`);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.url) {
      throw new Error(data.error || 'Failed to upload image to Cloudinary.');
    }

    return data.url;
  },

  // Helper: Upload Multiple Images Array
  async uploadImages(imagesArray) {
    if (!imagesArray || imagesArray.length === 0) return [];

    const uploadPromises = imagesArray.map((img) => this.uploadSingleToCloudinary(img));
    return await Promise.all(uploadPromises);
  },

  // Push / Create Event Method
  async addEvent(formData) {
    try {
      if (!formData.title || !formData.date || !formData.location) {
        throw new Error('Title, Date, and Location are required fields.');
      }
      if (!formData.images || formData.images.length === 0) {
        throw new Error('At least one event image is required.');
      }

      // 1. Upload Images to Cloudinary using existing API route
      const uploadedUrls = await this.uploadImages(formData.images);

      // 2. Prepare Payload with Cloudinary Image URLs
      const payload = {
        title: formData.title.trim(),
        date: formData.date,
        location: formData.location.trim(),
        description: formData.description ? formData.description.trim() : '',
        image: uploadedUrls[0] || '', // Primary Thumbnail
        gallery: uploadedUrls, // Full Image URLs Array
      };

      return await eventService.createEvent(payload);
    } catch (error) {
      console.error('Add Event Error:', error);
      throw error;
    }
  },

  // Update Event Method
  async updateEvent(id, formData) {
    try {
      if (!id) throw new Error('Event ID is required for update.');

      // 1. Upload Images to Cloudinary using existing API route
      const uploadedUrls = await this.uploadImages(formData.images);

      const payload = {
        title: formData.title.trim(),
        date: formData.date,
        location: formData.location.trim(),
        description: formData.description ? formData.description.trim() : '',
        image: uploadedUrls[0] || '',
        gallery: uploadedUrls,
      };

      return await eventService.updateEvent(id, payload);
    } catch (error) {
      console.error('Update Event Error:', error);
      throw error;
    }
  },

  // Remove Event
  async removeEvent(id) {
    try {
      if (!id) throw new Error('Event ID is required.');
      return await eventService.deleteEvent(id);
    } catch (error) {
      console.error('Delete Event Error:', error);
      throw new Error('Could not delete event.');
    }
  }
};