/**
 * ServiceSelection Component
 * 
 * Phase 6D-2: Step 1 of Quote Wizard
 * 
 * Displays all published services as selectable cards with checkbox behavior.
 * Allows multi-select for bundle quotes.
 * 
 * Reused Finibus patterns:
 * - .single-service card structure from ServiceArea.tsx
 * - .service-icon, .service-content patterns
 * - .title.black for section header
 * - .cmn-btn for action button
 */

import React from 'react';
import { useServices } from '../../../../hooks/useServices';

// Static fallback icons (matches ServiceArea.tsx)
const FALLBACK_ICONS = [
  '/images/icons/service-icon-1.png',
  '/images/icons/service-icon-2.png',
  '/images/icons/service-icon-3.png',
  '/images/icons/service-icon-4.png',
];

interface ServiceSelectionProps {
  selectedServiceIds: string[];
  onSelectionChange: (serviceIds: string[]) => void;
  onNext: () => void;
}

function ServiceSelection({ 
  selectedServiceIds, 
  onSelectionChange, 
  onNext 
}: ServiceSelectionProps) {
  const { services, loading, error } = useServices();

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    if (selectedServiceIds.includes(serviceId)) {
      onSelectionChange(selectedServiceIds.filter(id => id !== serviceId));
    } else {
      onSelectionChange([...selectedServiceIds, serviceId]);
    }
  };

  // Check if a service is selected
  const isSelected = (serviceId: string) => selectedServiceIds.includes(serviceId);

  // Format count with leading zero
  const formatCount = (index: number) => String(index + 1).padStart(2, '0');

  // Loading state - skeleton using existing card structure
  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
        <div className="title text-center">
            <span>Step 1</span>
            <h2>Select Services</h2>
          </div>
          <p className="text-center text-muted">Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="row">
        <div className="col-12">
        <div className="title text-center">
            <span>Step 1</span>
            <h2>Select Services</h2>
          </div>
          <p className="text-center text-danger">
            Unable to load services. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // No services available
  if (services.length === 0) {
    return (
      <div className="row">
        <div className="col-12">
        <div className="title text-center">
            <span>Step 1</span>
            <h2>Select Services</h2>
          </div>
          <p className="text-center text-muted">
            No services are currently available.
          </p>
        </div>
      </div>
    );
  }

  const canProceed = selectedServiceIds.length > 0;

  return (
    <div className="row">
      {/* Header */}
      <div className="col-12">
        <div className="title text-center">
          <span>Step 1</span>
          <h2>Select Services</h2>
          <p>Choose one or more services for your quote. Click to select.</p>
        </div>
      </div>

      {/* Service Cards Grid - reuses .single-service pattern from ServiceArea */}
      <div className="col-12">
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => {
            const selected = isSelected(service.id);
            const iconUrl = service.icon?.public_url || FALLBACK_ICONS[index % FALLBACK_ICONS.length];
            
            return (
              <div key={service.id} className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div 
                  className={`single-service ${selected ? 'selected' : ''}`}
                  onClick={() => toggleService(service.id)}
                  style={{ 
                    cursor: 'pointer',
                    position: 'relative',
                    border: selected ? '2px solid #1eb36b' : undefined,
                    boxShadow: selected ? '0 0 20px rgba(30, 179, 107, 0.3)' : undefined
                  }}
                  role="checkbox"
                  aria-checked={selected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleService(service.id);
                    }
                  }}
                >
                  {/* Selection indicator */}
                  {selected && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#1eb36b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}
                    >
                      ✓
                    </span>
                  )}
                  
                  <span className="count">{formatCount(index)}</span>
                  
                  <div className="service-icon">
                    <i>
                      <img src={iconUrl} alt={service.title} />
                    </i>
                  </div>
                  
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.short_description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selection summary */}
      <div className="col-12 mt-4">
        <p className="text-center" style={{ color: '#666' }}>
          {selectedServiceIds.length === 0 
            ? 'No services selected' 
            : `${selectedServiceIds.length} service${selectedServiceIds.length > 1 ? 's' : ''} selected`}
        </p>
      </div>

      {/* Validation message */}
      {!canProceed && (
        <div className="col-12">
          <p className="text-center" style={{ color: '#999', fontSize: '14px' }}>
            Please select at least one service to continue.
          </p>
        </div>
      )}
    </div>
  );
}

export default ServiceSelection;
