import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const Terms = () => {
  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Jumbo's website, you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on Jumbo's
                website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Product Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide accurate product information. However, we do not warrant that
                product descriptions or other content on this site is accurate, complete, reliable,
                current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing</h2>
              <p className="text-gray-700 leading-relaxed">
                All prices are in Ghana Cedis (₵) and are subject to change without notice. We
                reserve the right to modify prices at any time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

