/**
 * QuoteSummary Component
 * 
 * Phase 6D-4: Step 3 of Quote Wizard
 * 
 * Displays a read-only summary of all selected services and tiers.
 * Calculates and displays total estimated amount.
 * No database writes - display only.
 * 
 * Reused Finibus patterns:
 * - .title.black for section headers
 * - .single-price-box (simplified) for summary cards
 * - .cmn-btn for navigation buttons
 * - Bootstrap grid for layout
 */

import React from 'react';
import { useServices } from '../../../../hooks/useServices';

interface TierSelection {
  planId: string;
  planName: string;
  priceAmount: number;
  currency: string;
}

interface QuoteSummaryProps {
  selectedServiceIds: string[];
  billingPeriod: 'monthly' | 'yearly';
  selections: { [serviceId: string]: TierSelection };
  onNext: () => void;
  onPrev: () => void;
}

function QuoteSummary({
  selectedServiceIds,
  billingPeriod,
  selections,
  onNext,
  onPrev,
}: QuoteSummaryProps) {
  // Get service details for titles
  const { services, loading } = useServices();

  // Calculate total from all selections
  const calculateTotal = (): number => {
    return selectedServiceIds.reduce((sum, serviceId) => {
      const selection = selections[serviceId];
      return sum + (selection?.priceAmount || 0);
    }, 0);
  };

  // Get currency from first selection (all should be same)
  const getCurrency = (): string => {
    for (const serviceId of selectedServiceIds) {
      const selection = selections[serviceId];
      if (selection?.currency) {
        return selection.currency;
      }
    }
    return 'USD';
  };

  // Format price with commas
  const formatPrice = (amount: number): string => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const total = calculateTotal();
  const currency = getCurrency();
  const billingLabel = billingPeriod === 'monthly' ? 'Monthly' : 'Yearly';

  // Edge case: No services selected
  if (selectedServiceIds.length === 0) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="title black text-center">
            <span>Step 3</span>
            <h2>Quote Summary</h2>
          </div>
          <p className="text-center text-muted">
            No services selected. Please go back to select services.
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

  // Loading state
  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="title black text-center">
            <span>Step 3</span>
            <h2>Quote Summary</h2>
          </div>
          <p className="text-center text-muted">Loading summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {/* Header */}
      <div className="col-12">
        <div className="title black text-center">
          <span>Step 3</span>
          <h2>Quote Summary</h2>
          <p>Review your selections before proceeding</p>
        </div>
      </div>

      {/* Billing Period Display */}
      <div className="col-12 mb-4">
        <div className="text-center">
          <span style={{ 
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#666'
          }}>
            Billing: <strong>{billingLabel}</strong>
          </span>
        </div>
      </div>

      {/* Selected Services Summary */}
      <div className="col-12">
        <div className="row justify-content-center">
          {selectedServiceIds.map((serviceId) => {
            const service = services.find(s => s.id === serviceId);
            const selection = selections[serviceId];

            // Skip if no selection (shouldn't happen but defensive)
            if (!selection) return null;

            const serviceName = service?.title || 'Service';

            return (
              <div key={serviceId} className="col-md-6 col-lg-4 col-xl-4">
                <div 
                  className="single-price-box"
                  style={{
                    cursor: 'default',
                    marginBottom: '20px',
                  }}
                >
                  <h3>{serviceName}</h3>
                  <span>{selection.planName}</span>
                  <h2>
                    ${formatPrice(selection.priceAmount)}/
                    <sub>Per {billingPeriod === 'monthly' ? 'Month' : 'Year'}</sub>
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Section */}
      <div className="col-12 mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div 
              style={{
                padding: '20px 30px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                textAlign: 'center',
                border: '1px solid #eee',
              }}
            >
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                Estimated Total
              </p>
              <h2 style={{ margin: '10px 0 0 0', fontSize: '32px', color: '#333' }}>
                ${formatPrice(total)}<span style={{ fontSize: '16px', color: '#999' }}> / {billingLabel}</span>
              </h2>
              <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#999' }}>
                {selectedServiceIds.length} service{selectedServiceIds.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="col-12 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="d-flex justify-content-between">
              <div className="cmn-btn">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    onPrev();
                  }}
                >
                  Previous
                </a>
              </div>

              <div className="cmn-btn">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    onNext();
                  }}
                >
                  Continue to Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteSummary;
