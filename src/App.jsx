import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeviceListPage from './pages/DeviceListPage';
import DeviceDetailPage from './pages/DeviceDetailPage';
import AlertsPage from './pages/DeviceDetailPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      {/* FIX: Added 'bg-gray-50' and 'text-gray-900' here directly 
         instead of using @apply in CSS 
      */}
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
        
        <Header />
        
        {/* Main Layout Container */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<DeviceListPage />} />
            <Route path="/devices/:deviceid" element={<DeviceDetailPage />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            &copy; 2025 IVY TECH IoT Monitor
          </div>
        </footer>
        
      </div>
    </Router>
  );
}

export default App;