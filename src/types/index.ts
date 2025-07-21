export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'wedding' | 'engagement' | 'haldi' | 'mehendi' | 'sangam' | 'reception' | 'conference' | 'corporate' | 'birthday' | 'festival' | 'religious' | 'cultural' | 'other';
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  budget: number;
  expenses: number;
  guestCount: number;
  confirmedGuests: number;
  city: string;
  state: string;
  eventCategory: 'traditional' | 'modern' | 'fusion';
  religiousRequirements?: string;
  cateringType: 'vegetarian' | 'non-vegetarian' | 'jain' | 'vegan' | 'mixed';
  createdAt: string;
  updatedAt: string;
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  status: 'invited' | 'confirmed' | 'declined' | 'pending';
  dietary?: 'vegetarian' | 'non-vegetarian' | 'jain' | 'vegan' | 'no-onion-garlic' | 'other';
  relation?: 'family' | 'friend' | 'colleague' | 'neighbor' | 'relative' | 'other';
  side?: 'bride' | 'groom' | 'both' | 'host';
  notes?: string;
  invitedAt: string;
  respondedAt?: string;
}

export interface BudgetItem {
  id: string;
  eventId: string;
  category: string;
  description: string;
  budgetedAmount: number;
  actualAmount: number;
  status: 'planned' | 'booked' | 'paid' | 'overdue';
  vendor?: string;
  dueDate?: string;
}

export interface Resource {
  id: string;
  eventId: string;
  name: string;
  type: 'venue' | 'catering' | 'equipment' | 'entertainment' | 'decoration' | 'other';
  status: 'available' | 'booked' | 'unavailable';
  cost: number;
  contact?: string;
  notes?: string;
}

export interface ScheduleItem {
  id: string;
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  responsible: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}