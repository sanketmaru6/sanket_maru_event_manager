import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import EventList from './components/Events/EventList';
import CreateEvent from './components/Events/CreateEvent';
import GuestManagement from './components/Guests/GuestManagement';
import BudgetManagement from './components/Budget/BudgetManagement';
import ResourceManagement from './components/Resources/ResourceManagement';
import ScheduleManagement from './components/Schedule/ScheduleManagement';
import { Event } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedEvent(null);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setActiveView('event-details');
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setActiveView('edit-event');
  };

  const handleCreateEvent = () => {
    setActiveView('create-event');
  };

  const handleSaveEvent = (event: any) => {
    console.log('Saving event:', event);
    setActiveView('events');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'events':
        return (
          <EventList
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
            onCreateEvent={handleCreateEvent}
          />
        );
      case 'create-event':
        return (
          <CreateEvent
            onBack={() => setActiveView('events')}
            onSave={handleSaveEvent}
          />
        );
      case 'guests':
        return <GuestManagement />;
      case 'budget':
        return <BudgetManagement />;
      case 'resources':
        return <ResourceManagement />;
      case 'schedule':
        return <ScheduleManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;