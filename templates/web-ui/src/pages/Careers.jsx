import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Accra, Ghana',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Accra, Ghana',
      type: 'Full-time',
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Accra, Ghana',
      type: 'Full-time',
    },
    {
      id: 4,
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
    },
  ];

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Careers at Jumbo</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6 mb-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h2>
              <p className="text-gray-700 leading-relaxed">
                At Jumbo, we're building the future of e-commerce in Ghana. We're looking for
                talented, passionate individuals who want to make a difference and help us shape the
                online shopping experience for millions of customers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Competitive salary and benefits package</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Flexible working arrangements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Opportunities for professional growth</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Dynamic and inclusive work environment</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
            <div className="space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-jumia-orange transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-jumia-gray">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <button className="bg-jumia-orange text-white px-6 py-2 rounded-lg font-medium hover:bg-jumia-orange-dark transition whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See a Role That Fits?</h2>
            <p className="text-gray-700 mb-6">
              We're always looking for talented people to join our team. Send us your resume and
              we'll keep you in mind for future opportunities.
            </p>
            <button className="bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition">
              Submit Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;

