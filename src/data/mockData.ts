import { Event, Guest, BudgetItem, Resource, ScheduleItem } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Priya & Arjun\'s Wedding',
    description: 'A grand traditional Indian wedding celebration with all rituals and ceremonies.',
    type: 'wedding',
    status: 'planning',
    date: '2024-12-15',
    startTime: '10:00',
    endTime: '23:00',
    venue: 'Taj Palace Banquet Hall',
    budget: 2500000,
    expenses: 1850000,
    guestCount: 800,
    confirmedGuests: 650,
    city: 'Mumbai',
    state: 'Maharashtra',
    eventCategory: 'traditional',
    religiousRequirements: 'Hindu rituals, Pandit required',
    cateringType: 'vegetarian',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Mehendi Ceremony - Priya',
    description: 'Traditional mehendi ceremony with music, dance, and henna application.',
    type: 'mehendi',
    status: 'confirmed',
    date: '2024-12-13',
    startTime: '15:00',
    endTime: '21:00',
    venue: 'Priya\'s Family Home',
    budget: 350000,
    expenses: 280000,
    guestCount: 150,
    confirmedGuests: 135,
    city: 'Mumbai',
    state: 'Maharashtra',
    eventCategory: 'traditional',
    cateringType: 'vegetarian',
    createdAt: '2023-12-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'Diwali Corporate Celebration',
    description: 'Grand Diwali celebration for employees with cultural programs and feast.',
    type: 'festival',
    status: 'in-progress',
    date: '2024-11-01',
    startTime: '18:00',
    endTime: '22:00',
    venue: 'Hotel Leela Palace',
    budget: 800000,
    expenses: 650000,
    guestCount: 300,
    confirmedGuests: 285,
    city: 'Bangalore',
    state: 'Karnataka',
    eventCategory: 'traditional',
    cateringType: 'vegetarian',
    createdAt: '2023-10-05',
    updatedAt: '2024-01-19'
  },
  {
    id: '4',
    title: 'Annual IT Conference Delhi',
    description: 'Technology conference featuring Indian startups and innovation leaders.',
    type: 'corporate',
    status: 'completed',
    date: '2024-09-20',
    startTime: '08:00',
    endTime: '17:00',
    venue: 'India Habitat Centre',
    budget: 1200000,
    expenses: 1150000,
    guestCount: 500,
    confirmedGuests: 485,
    city: 'New Delhi',
    state: 'Delhi',
    eventCategory: 'modern',
    cateringType: 'mixed',
    createdAt: '2024-03-01',
    updatedAt: '2024-06-11'
  }
];

export const mockGuests: Guest[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 98765 43210',
    status: 'confirmed',
    dietary: 'vegetarian',
    relation: 'family',
    side: 'groom',
    invitedAt: '2024-01-16',
    respondedAt: '2024-01-18'
  },
  {
    id: '2',
    eventId: '1',
    name: 'Sunita Sharma',
    email: 'sunita.sharma@yahoo.com',
    phone: '+91 87654 32109',
    status: 'pending',
    dietary: 'jain',
    relation: 'friend',
    side: 'bride',
    invitedAt: '2024-01-16'
  },
  {
    id: '3',
    eventId: '2',
    name: 'Amit Patel',
    email: 'amit.patel@hotmail.com',
    phone: '+91 76543 21098',
    status: 'confirmed',
    dietary: 'vegetarian',
    relation: 'relative',
    side: 'bride',
    invitedAt: '2023-12-15',
    respondedAt: '2023-12-20'
  },
  {
    id: '4',
    eventId: '2',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@gmail.com',
    phone: '+91 65432 10987',
    status: 'declined',
    dietary: 'no-onion-garlic',
    relation: 'colleague',
    side: 'both',
    notes: 'Out of town',
    invitedAt: '2023-12-15',
    respondedAt: '2023-12-18'
  }
];

export const mockBudgetItems: BudgetItem[] = [
  {
    id: '1',
    eventId: '1',
    category: 'Mandap & Decoration',
    description: 'Traditional mandap setup with flowers and lights',
    budgetedAmount: 400000,
    actualAmount: 380000,
    status: 'paid',
    vendor: 'Shree Decorators Mumbai',
    dueDate: '2024-12-01'
  },
  {
    id: '2',
    eventId: '1',
    category: 'Catering & Food',
    description: 'Traditional vegetarian feast for 800 guests',
    budgetedAmount: 800000,
    actualAmount: 750000,
    status: 'booked',
    vendor: 'Rajdhani Caterers',
    dueDate: '2024-12-10'
  },
  {
    id: '3',
    eventId: '2',
    category: 'Mehendi Artist',
    description: 'Professional mehendi artists for bridal party',
    budgetedAmount: 50000,
    actualAmount: 45000,
    status: 'paid',
    vendor: 'Artistic Mehendi by Priya'
  },
  {
    id: '4',
    eventId: '2',
    category: 'Music & Entertainment',
    description: 'DJ and traditional dhol players',
    budgetedAmount: 80000,
    actualAmount: 0,
    status: 'planned',
    vendor: 'Bollywood Beats Entertainment',
    dueDate: '2024-12-05'
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Wedding Mandap',
    type: 'venue',
    status: 'booked',
    cost: 200000,
    contact: 'manager@tajpalace.com',
    notes: 'Traditional wooden mandap with floral decoration'
  },
  {
    id: '2',
    eventId: '1',
    name: 'DJ & Sound System',
    type: 'equipment',
    status: 'booked',
    cost: 150000,
    contact: 'booking@soundmagic.in',
    notes: 'Includes wireless mics and LED lighting'
  },
  {
    id: '3',
    eventId: '2',
    name: 'Dhol Tasha Pathak',
    type: 'entertainment',
    status: 'booked',
    cost: 25000,
    contact: 'maharashtra.dhol@gmail.com',
    notes: 'Traditional Maharashtrian dhol group'
  },
  {
    id: '4',
    eventId: '2',
    name: 'Marigold Decorations',
    type: 'decoration',
    status: 'available',
    cost: 45000,
    contact: 'mumbai.flowers@gmail.com',
    notes: 'Fresh marigold and rose garlands'
  }
];

export const mockScheduleItems: ScheduleItem[] = [
  {
    id: '1',
    eventId: '1',
    title: 'Ganesh Puja & Kalash Sthapana',
    description: 'Traditional prayers and ceremonial setup',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Mandap Area',
    responsible: 'Pandit Sharma',
    status: 'scheduled'
  },
  {
    id: '2',
    eventId: '1',
    title: 'Baraat Arrival',
    description: 'Groom\'s procession with dhol and band',
    startTime: '11:30',
    endTime: '12:30',
    location: 'Main Entrance',
    responsible: 'Event Coordinator',
    status: 'scheduled'
  },
  {
    id: '3',
    eventId: '2',
    title: 'Mehendi Application',
    description: 'Bridal mehendi and guest mehendi',
    startTime: '15:00',
    endTime: '18:00',
    location: 'Garden Area',
    responsible: 'Mehendi Artists',
    status: 'scheduled'
  },
  {
    id: '4',
    eventId: '2',
    title: 'Sangeet & Dance',
    description: 'Music, dance performances and celebration',
    startTime: '19:00',
    endTime: '21:00',
    location: 'Main Hall',
    responsible: 'DJ & Choreographer',
    status: 'scheduled'
  },
  {
    id: '5',
    eventId: '1',
    title: 'Registration',
    description: 'Guest registration and welcome',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Main Lobby',
    responsible: 'Event Team',
    status: 'scheduled'
  },
  {
    id: '6',
    eventId: '1',
    title: 'Opening Keynote',
    description: 'Welcome address by CEO',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Main Auditorium',
    responsible: 'AV Team',
    status: 'scheduled'
  },
  {
    id: '7',
    eventId: '2',
    title: 'Ceremony',
    description: 'Wedding ceremony',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Garden Pavilion',
    responsible: 'Wedding Coordinator',
    status: 'scheduled'
  },
  {
    id: '8',
    eventId: '2',
    title: 'Reception Dinner',
    description: 'Wedding reception and dinner',
    startTime: '18:00',
    endTime: '22:00',
    location: 'Main Hall',
    responsible: 'Catering Team',
    status: 'scheduled'
  }
];