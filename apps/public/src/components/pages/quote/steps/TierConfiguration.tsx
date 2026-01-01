/**
 * TierConfiguration Component
 * 
 * Phase 6D-3: Step 2 of Quote Wizard
 * 
 * Displays tier selection for each selected service with global billing toggle.
 * Uses PriceBox patterns with radio selection behavior.
 * 
 * Reused Finibus patterns:
 * - .nav-pills, .nav-link for billing toggle (from ServicePrice.jsx)
 * - .single-price-box, .feature-list for tier cards (from PriceBox.jsx)
 * - .title.black for section headers
 * - Selection border/shadow from ServiceSelection.tsx
 */

import React from 'react';
import { useServicePricingPlans } from '../../../../hooks/useServicePricingPlans';
import { useServices } from '../../../../hooks/useServices';

interface TierSelection {
  planId: string;
  planName: string;
  priceAmount: number;
  currency: string;
}

interface TierConfigurationProps {
  selectedServiceIds: string[];
  billingPeriod: 'monthly' | 'yearly';
  selections: { [serviceId: string]: TierSelection };
  currentServiceIndex: number;
  onBillingPeriodChange: (period: 'monthly' | 'yearly') => void;
  onSelectionChange: (serviceId: string, plan: TierSelection) => void;
  onServiceIndexChange: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

function TierConfiguration({
  selectedServiceIds,
  billingPeriod,
  selections,
  currentServiceIndex,
  onBillingPeriodChange,
  onSelectionChange,
  onServiceIndexChange,
  onNext,
  onPrev,
}: TierConfigurationProps) {
  // Get service details for titles
  const { services } = useServices();
  
  // Current service being configured
  const currentServiceId = selectedServiceIds[currentServiceIndex] || null;
  const currentService = services.find(s => s.id === currentServiceId);
  
  // Fetch pricing plans for current service
  const { plans, loading, error } = useServicePricingPlans(currentServiceId, billingPeriod);
  
  // Current selection for this service
  const currentSelection = currentServiceId ? selections[currentServiceId] : null;
  
  // Check if all services have tier selections
  const allServicesConfigured = selectedServiceIds.every(id => selections[id]?.planId);
  
  // Navigate to previous service
  const goPrevService = () => {
    if (currentServiceIndex > 0) {
      onServiceIndexChange(currentServiceIndex - 1);
    } else {
      onPrev(); // Go back to Step 1
    }
  };
  
  // Navigate to next service or step
  const goNextService = () => {
    if (currentServiceIndex < selectedServiceIds.length - 1) {
      onServiceIndexChange(currentServiceIndex + 1);
    } else if (allServicesConfigured) {
      onNext(); // Proceed to Step 3
    }
  };
  
  // Select a tier
  const selectTier = (plan: { id: string; plan_name: string; price_amount: number; currency: string }) => {
    if (!currentServiceId) return;
    onSelectionChange(currentServiceId, {
      planId: plan.id,
      planName: plan.plan_name,
      priceAmount: plan.price_amount,
      currency: plan.currency,
    });
  };
  
  // Handle keyboard selection
  const handleKeyDown = (e: React.KeyboardEvent, plan: { id: string; plan_name: string; price_amount: number; currency: string }) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectTier(plan);
    }
  };

  // Edge case: No services selected (redirect back)
  if (selectedServiceIds.length === 0) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="title text-center">
            <span>Step 2</span>
            <h2>Choose Your Tiers</h2>
          </div>
          <p className="text-center text-muted">
            No services selected. Please go back and select services.
          </p>
          <div className="row justify-content-center mt-4">
            <div className="col-auto">
              <div className="cmn-btn">
                <a href="#!" onClick={(e) => { e.preventDefault(); onPrev(); }}>
                  Back to Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {/* Header */}
      <div className="col-12">
        <div className="title text-center">
          <span>Step 2</span>
          <h2>Choose Your Tiers</h2>
          <p>
            Service {currentServiceIndex + 1} of {selectedServiceIds.length}
            {currentService && `: ${currentService.title}`}
          </p>
        </div>
      </div>

      {/* Billing Toggle - nav-pills pattern from ServicePrice */}
      <div className="col-12 mb-4">
        <div className="row justify-content-center">
          <div className="col-auto">
            <ul className="nav nav-pills" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${billingPeriod === 'monthly' ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={billingPeriod === 'monthly'}
                  onClick={() => onBillingPeriodChange('monthly')}
                >
                  Pay Monthly
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${billingPeriod === 'yearly' ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={billingPeriod === 'yearly'}
                  onClick={() => onBillingPeriodChange('yearly')}
                >
                  Pay Yearly
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="col-12">
          <p className="text-center text-muted">Loading pricing plans...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="col-12">
          <p className="text-center text-danger">{error}</p>
        </div>
      )}

      {/* No plans available */}
      {!loading && !error && plans.length === 0 && (
        <div className="col-12">
          <p className="text-center text-muted">
            No pricing plans available for this service with {billingPeriod} billing.
          </p>
        </div>
      )}

      {/* Tier Cards - single-price-box pattern from PriceBox */}
      {!loading && !error && plans.length > 0 && (
        <div className="col-12">
          <div className="row justify-content-center" role="radiogroup" aria-label="Select a tier">
            {plans.map((plan) => {
              const isSelected = currentSelection?.planId === plan.id;
              const features = Array.isArray(plan.features) ? plan.features : [];
              
              return (
                <div key={plan.id} className="col-md-6 col-lg-4 col-xl-4">
                  <div
                    className="single-price-box"
                    onClick={() => selectTier(plan)}
                    onKeyDown={(e) => handleKeyDown(e, plan)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    style={{
                      cursor: 'pointer',
                      position: 'relative',
                      border: isSelected ? '2px solid #1eb36b' : '1px solid transparent',
                      boxShadow: isSelected ? '0 0 20px rgba(30, 179, 107, 0.3)' : undefined,
                      transition: 'border 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
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
                          zIndex: 2,
                        }}
                      >
                        ✓
                      </span>
                    )}

                    <h3>{plan.plan_name}</h3>
                    {plan.plan_subtitle && <span>{plan.plan_subtitle}</span>}
                    <h2>
                      ${plan.price_amount}/
                      <sub>Per {billingPeriod === 'monthly' ? 'Month' : 'Year'}</sub>
                    </h2>

                    <ul className="feature-list">
                      {features.map((feature, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Replace CTA button with selection text */}
                    <div className="pay-btn">
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '12px 30px',
                          backgroundColor: isSelected ? '#1eb36b' : '#f5f5f5',
                          color: isSelected ? '#fff' : '#333',
                          borderRadius: '4px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select Plan'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Validation message */}
      {!currentSelection && !loading && plans.length > 0 && (
        <div className="col-12 mt-3">
          <p className="text-center" style={{ color: '#999', fontSize: '14px' }}>
            Please select a tier for this service to continue.
          </p>
        </div>
      )}

      {/* Service navigation */}
      <div className="col-12 mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="d-flex justify-content-between align-items-center">
              <div className="cmn-btn">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    goPrevService();
                  }}
                >
                  {currentServiceIndex === 0 ? 'Back to Services' : 'Previous Service'}
                </a>
              </div>

              <div className="cmn-btn">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentSelection) goNextService();
                  }}
                  style={{
                    opacity: currentSelection ? 1 : 0.5,
                    cursor: currentSelection ? 'pointer' : 'not-allowed',
                  }}
                >
                  {currentServiceIndex < selectedServiceIds.length - 1
                    ? 'Next Service'
                    : 'Continue to Summary'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="col-12 mt-3">
        <p className="text-center" style={{ color: '#666', fontSize: '14px' }}>
          {Object.keys(selections).length} of {selectedServiceIds.length} service
          {selectedServiceIds.length !== 1 ? 's' : ''} configured
        </p>
      </div>
    </div>
  );
}

export default TierConfiguration;
