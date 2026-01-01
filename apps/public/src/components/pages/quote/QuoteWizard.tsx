/**
 * QuoteWizard Component
 * 
 * Phase 6D: Multi-step quote wizard container
 * 
 * Steps:
 * 1. Service Selection - Multi-select services
 * 2. Tier Configuration - Per-service tier selection with billing toggle
 * 3. Quote Summary - Review selections and total
 * 4. Contact Information - Lead capture form
 * 5. Confirmation - Success message with reference
 * 
 * Uses existing CSS patterns from Finibus:
 * - .sec-pad for section spacing
 * - .title.black for headers
 * - .nav-pills for step indicator
 * - .cmn-btn for navigation
 */

import React, { useState } from 'react';
import ServiceSelection from './steps/ServiceSelection';
import TierConfiguration from './steps/TierConfiguration';
import QuoteSummary from './steps/QuoteSummary';

// Step labels for wizard navigation
const WIZARD_STEPS = [
  { number: 1, label: 'Services' },
  { number: 2, label: 'Tiers' },
  { number: 3, label: 'Summary' },
  { number: 4, label: 'Contact' },
  { number: 5, label: 'Done' },
];

// Wizard state interface
export interface WizardState {
  currentStep: number;
  // Step 1: Service Selection
  selectedServiceIds: string[];
  // Step 2: Tier Configuration
  billingPeriod: 'monthly' | 'yearly';
  selections: {
    [serviceId: string]: {
      planId: string;
      planName: string;
      priceAmount: number;
      currency: string;
    };
  };
  currentServiceIndex: number;
  // Step 4: Contact
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
  // Step 5: Result
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  referenceNumber: string | null;
  errorMessage: string | null;
}

// Initial wizard state
const initialState: WizardState = {
  currentStep: 1,
  selectedServiceIds: [],
  billingPeriod: 'monthly',
  selections: {},
  currentServiceIndex: 0,
  name: '',
  email: '',
  company: '',
  message: '',
  honeypot: '',
  isSubmitting: false,
  submitStatus: 'idle',
  referenceNumber: null,
  errorMessage: null,
};

function QuoteWizard() {
  const [state, setState] = useState<WizardState>(initialState);
  const { currentStep } = state;

  // Navigation handlers
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setState(prev => ({ ...prev, currentStep: step }));
    }
  };

  const goNext = () => {
    if (currentStep < 5) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  // State update handler for child steps
  const updateState = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Tier selection handler
  const handleTierSelection = (
    serviceId: string, 
    plan: { planId: string; planName: string; priceAmount: number; currency: string }
  ) => {
    setState(prev => ({
      ...prev,
      selections: {
        ...prev.selections,
        [serviceId]: plan,
      },
    }));
  };

  // Render step indicator (nav-pills pattern from ServicePrice)
  const renderStepIndicator = () => (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <ul className="nav nav-pills mb-4 justify-content-center" role="tablist">
          {WIZARD_STEPS.map((step) => (
            <li key={step.number} className="nav-item" role="presentation">
              <button
                className={`nav-link ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                type="button"
                role="tab"
                aria-selected={currentStep === step.number}
                disabled={step.number > currentStep}
                onClick={() => step.number < currentStep && goToStep(step.number)}
                style={{ 
                  cursor: step.number < currentStep ? 'pointer' : 'default',
                  opacity: step.number > currentStep ? 0.5 : 1
                }}
              >
                <span style={{ marginRight: '8px' }}>{step.number}.</span>
                {step.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render content per step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedServiceIds={state.selectedServiceIds}
            onSelectionChange={(ids) => updateState({ selectedServiceIds: ids })}
            onNext={goNext}
          />
        );
      case 2:
        return (
          <TierConfiguration
            selectedServiceIds={state.selectedServiceIds}
            billingPeriod={state.billingPeriod}
            selections={state.selections}
            currentServiceIndex={state.currentServiceIndex}
            onBillingPeriodChange={(period) => updateState({ billingPeriod: period })}
            onSelectionChange={handleTierSelection}
            onServiceIndexChange={(idx) => updateState({ currentServiceIndex: idx })}
            onNext={goNext}
            onPrev={goPrev}
          />
        );
      case 3:
        return (
          <QuoteSummary
            selectedServiceIds={state.selectedServiceIds}
            billingPeriod={state.billingPeriod}
            selections={state.selections}
            onNext={goNext}
            onPrev={goPrev}
          />
        );
      case 4:
        return (
          <div className="row">
            <div className="col-12">
              <div className="title black text-center">
                <span>Step 4</span>
                <h2>Your Information</h2>
              </div>
              <p className="text-center text-muted">
                Enter your contact details. (Implementation pending Step 6D-5)
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="row">
            <div className="col-12">
              <div className="title black text-center">
                <span>Step 5</span>
                <h2>Confirmation</h2>
              </div>
              <p className="text-center text-muted">
                Quote submitted successfully. (Implementation pending Step 6D-6)
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return state.selectedServiceIds.length > 0;
      case 2:
        // All selected services must have a tier selection
        return state.selectedServiceIds.length > 0 && 
          state.selectedServiceIds.every(id => state.selections[id]?.planId);
      case 3:
        return true; // Summary is read-only
      case 4:
        // Will be implemented in Step 6D-5
        return state.name.trim() !== '' && state.email.trim() !== '';
      default:
        return true;
    }
  };

  // Render navigation buttons
  const renderNavigation = () => {
    // Don't show navigation on confirmation step
    if (currentStep === 5) return null;

    const nextDisabled = !canProceed();

    return (
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-between">
            {currentStep > 1 ? (
              <div className="cmn-btn">
                <a href="#!" onClick={(e) => { e.preventDefault(); goPrev(); }}>
                  Previous
                </a>
              </div>
            ) : (
              <div />
            )}
            {currentStep < 5 && (
              <div className="cmn-btn">
                <a 
                  href="#!" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    if (!nextDisabled) goNext(); 
                  }}
                  style={{ 
                    opacity: nextDisabled ? 0.5 : 1,
                    cursor: nextDisabled ? 'not-allowed' : 'pointer'
                  }}
                >
                  {currentStep === 4 ? 'Submit' : 'Next'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="quote-wizard sec-pad">
      <div className="container">
        {renderStepIndicator()}
        {renderStepContent()}
        {renderNavigation()}
      </div>
    </section>
  );
}

export default QuoteWizard;
