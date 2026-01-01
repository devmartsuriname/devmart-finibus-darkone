/**
 * QuotePage Component
 * 
 * Phase 6D: Quote Wizard main page
 * Route: /quote
 * 
 * Layout follows Finibus inner page pattern:
 * - Breadcrumb header
 * - Wizard content section
 * - LetsTalkArea footer
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../common/Breadcrumb';
import LetsTalkArea from '../../common/LetsTalkArea';
import QuoteWizard from './QuoteWizard';

function QuotePage() {
  return (
    <>
      <Helmet>
        <title>Get a Quote | Devmart</title>
        <meta name="description" content="Request a customized quote for Devmart's professional services. Select services, choose engagement tiers, and get a personalized proposal." />
      </Helmet>
      
      <Breadcrumb pageName="Get a Quote" />
      
      <QuoteWizard />
      
      <LetsTalkArea />
    </>
  );
}

export default QuotePage;
