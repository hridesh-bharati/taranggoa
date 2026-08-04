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

  // Push / Create Event Method
  async addEvent(formData) {
    try {
      if (!formData.title || !formData.date || !formData.location) {
        throw new Error('Title, Date, and Location are required fields.');
      }
      if (!formData.images || formData.images.length === 0) {
        throw new Error('At least one event image is required.');
      }

      const payload = {
        title: formData.title.trim(),
        date: formData.date,
        location: formData.location.trim(),
        description: formData.description ? formData.description.trim() : '',
        image: formData.images[0] || '', // Primary Thumbnail
        gallery: formData.images, // Full Images Array
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
      
      const payload = {
        title: formData.title.trim(),
        date: formData.date,
        location: formData.location.trim(),
        description: formData.description ? formData.description.trim() : '',
        image: formData.images[0] || '',
        gallery: formData.images,
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