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
import { supabase } from '../../../lib/supabase';
import { useServices } from '../../../hooks/useServices';
import ServiceSelection from './steps/ServiceSelection';
import TierConfiguration from './steps/TierConfiguration';
import QuoteSummary from './steps/QuoteSummary';
import ContactSubmit from './steps/ContactSubmit';
import QuoteConfirmation from './steps/QuoteConfirmation';

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
  phone: string;
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
  phone: '',
  message: '',
  honeypot: '',
  isSubmitting: false,
  submitStatus: 'idle',
  referenceNumber: null,
  errorMessage: null,
};

// Generate reference number: QT-{YEAR}-{XXXX}
const generateReferenceNumber = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `QT-${year}-${random}`;
};

function QuoteWizard() {
  const [state, setState] = useState<WizardState>(initialState);
  const { currentStep } = state;
  
  // Fetch services for title lookups
  const { services } = useServices();

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

  // Field change handler for contact form
  const handleFieldChange = (field: string, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
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

  // Quote submission handler
  const handleQuoteSubmit = async (): Promise<void> => {
    // Anti-spam: if honeypot is filled, silently "succeed"
    if (state.honeypot) {
      setState(prev => ({
        ...prev,
        submitStatus: 'success',
        referenceNumber: generateReferenceNumber(),
        currentStep: 5,
      }));
      return;
    }

    // Validate required fields
    const trimmedName = state.name.trim();
    const trimmedEmail = state.email.trim();

    if (!trimmedName) {
      setState(prev => ({
        ...prev,
        submitStatus: 'error',
        errorMessage: 'Please enter your name.',
      }));
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState(prev => ({
        ...prev,
        submitStatus: 'error',
        errorMessage: 'Please enter a valid email address.',
      }));
      return;
    }

    // Start submission
    setState(prev => ({ ...prev, isSubmitting: true, submitStatus: 'idle', errorMessage: null }));

    try {
      // Generate IDs client-side to avoid needing SELECT permission after INSERT
      const quoteId = crypto.randomUUID();
      const leadId = crypto.randomUUID();
      const referenceNumber = generateReferenceNumber();

      // Calculate total amount
      const totalAmount = state.selectedServiceIds.reduce((sum, serviceId) => {
        const selection = state.selections[serviceId];
        return sum + (selection?.priceAmount || 0);
      }, 0);

      // Get currency from first selection
      const firstSelection = state.selections[state.selectedServiceIds[0]];
      const currency = firstSelection?.currency || 'USD';

      // 1. Insert lead first (with pre-generated ID)
      const { error: leadError } = await supabase
        .from('leads')
        .insert({
          id: leadId,
          name: trimmedName,
          email: trimmedEmail,
          subject: 'Quote Request',
          message: state.message.trim() || null,
          source: 'quote_wizard',
          quote_id: quoteId,
        });

      if (leadError) throw leadError;

      // 2. Insert quote with lead_id already set (no UPDATE needed)
      const { error: quoteError } = await supabase
        .from('quotes')
        .insert({
          id: quoteId,
          reference_number: referenceNumber,
          total_amount: totalAmount,
          currency: currency,
          billing_period: state.billingPeriod,
          status: 'pending',
          lead_id: leadId,
        });

      if (quoteError) throw quoteError;

      // 3. Insert quote items
      const quoteItems = state.selectedServiceIds.map(serviceId => {
        const selection = state.selections[serviceId];
        const service = services.find(s => s.id === serviceId);
        return {
          quote_id: quoteId,
          service_id: serviceId,
          plan_id: selection.planId,
          service_title: service?.title || 'Unknown Service',
          plan_name: selection.planName,
          price_amount: selection.priceAmount,
          currency: selection.currency,
        };
      });

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(quoteItems);

      if (itemsError) throw itemsError;

      // Success!
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitStatus: 'success',
        referenceNumber: referenceNumber,
        currentStep: 5,
      }));

    } catch (error) {
      console.error('Quote submission error:', error);
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitStatus: 'error',
        errorMessage: 'Something went wrong. Please try again.',
      }));
    }
  };

  // Render step indicator (nav-pills pattern from ServicePrice)
  const renderStepIndicator = () => (
    <div className="row justify-content-center">
      <div className="col-12">
        <ul 
          className="nav nav-pills mb-4 justify-content-center" 
          role="tablist"
          style={{
            flexWrap: 'nowrap',
            overflowX: 'auto',
            paddingBottom: '10px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
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
                  opacity: step.number > currentStep ? 0.5 : 1,
                  minWidth: '120px',
                  marginRight: '10px',
                  whiteSpace: 'nowrap',
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
          <ContactSubmit
            name={state.name}
            email={state.email}
            company={state.company}
            phone={state.phone}
            message={state.message}
            honeypot={state.honeypot}
            isSubmitting={state.isSubmitting}
            submitStatus={state.submitStatus}
            errorMessage={state.errorMessage}
            onFieldChange={handleFieldChange}
            onSubmit={handleQuoteSubmit}
            onPrev={goPrev}
          />
        );
      case 5:
        return (
          <QuoteConfirmation referenceNumber={state.referenceNumber} />
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
        // Validate name and email
        const trimmedName = state.name.trim();
        const trimmedEmail = state.email.trim();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
        return trimmedName !== '' && emailValid;
      default:
        return true;
    }
  };

  // Render navigation buttons (Steps 1-3 only, Step 4 has its own, Step 5 none)
  const renderNavigation = () => {
    // Step 4 and 5 handle their own navigation
    if (currentStep >= 4) return null;

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
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="service-area sec-pad">
      <div className="container">
        {renderStepIndicator()}
        {renderStepContent()}
        {renderNavigation()}
      </div>
    </section>
  );
}

export default QuoteWizard;
