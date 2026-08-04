import { eventService } from '@/services/event.service';

export const eventController = {
  async fetchHomeEvents() {
    try {
      return await eventService.getEvents(3);
    } catch (error) {
      console.error('Fetch Events Error:', error);
      throw new Error('Failed to load recent events.');
    }
  },

  async fetchAllEvents() {
    try {
      return await eventService.getEvents();
    } catch (error) {
      console.error('Fetch All Events Error:', error);
      throw new Error('Failed to load events list.');
    }
  },

  async addEvent(eventData) {
    try {
      if (!eventData.title || !eventData.image) {
        throw new Error('Title and Image are required.');
      }
      return await eventService.createEvent(eventData);
    } catch (error) {
      console.error('Add Event Error:', error);
      throw error;
    }
  },

  async removeEvent(eventId) {
    try {
      return await eventService.deleteEvent(eventId);
    } catch (error) {
      console.error('Delete Event Error:', error);
      throw new Error('Could not delete event.');
    }
  }
};