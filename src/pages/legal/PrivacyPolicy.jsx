import React, { useEffect } from "react";
import PageTransition from "../../components/common/PageTransition";
import Logo from "../../components/common/Logo";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="bg-[#F8F7F4] dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          
          {/* Header */}
          <div className="bg-brand-navy p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-brand-purple rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="relative z-10 flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl font-[900] tracking-tight relative z-10">PRIVACY POLICY</h1>
            <p className="text-brand-amber font-bold tracking-widest uppercase text-xs mt-4 relative z-10">
              India's Verified PG Accommodation Discovery Platform
            </p>
            <p className="text-slate-400 text-xs mt-2 relative z-10">
              Effective Date: June 1, 2025 | Version 1.0
            </p>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12 text-slate-600 dark:text-slate-300 space-y-8 text-sm leading-relaxed">
            
            <p className="font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              By creating an account or using the HOMLiOO platform, you confirm that you have read and agreed to this
              Privacy Policy. If you do not agree, please stop using the platform immediately.
            </p>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">1. WHAT HOMLIOO IS</h2>
              <p>
                HOMLiOO is a technology platform that connects students looking for PG (Paying Guest) accommodation with verified
                PG owners in India. It operates as a discovery and comparison tool — not as a broker, landlord, or property manager.
                Students search, compare, and make direct contact with PG owners. No fee is charged to students. Revenue comes only
                from PG owners who opt for visibility features.
              </p>
              <p className="mt-2">
                HOMLiOO is an intermediary under the Information Technology Act, 2000. It is not a party to any agreement
                between a student and a PG owner.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">2. WHO THIS POLICY COVERS</h2>
              <p>This Privacy Policy applies to three groups of people:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Students</strong> — Anyone using HOMLiOO to search for, compare, or shortlist PG accommodation.</li>
                <li><strong>PG Owners</strong> — Anyone listing a property on HOMLiOO.</li>
                <li><strong>Visitors</strong> — Anyone who browses the HOMLiOO website or app without registering.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">3. WHAT INFORMATION WE COLLECT</h2>
              
              <h3 className="font-bold text-brand-purple mt-4 mb-2">3.1 From Students</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name and phone number (required for OTP verification at registration).</li>
                <li>Email address (optional, for notifications and account recovery).</li>
                <li>Search inputs: preferred location, budget range, room type, and amenity choices.</li>
                <li>Shortlisted properties and comparison selections saved during your session.</li>
                <li>Reviews you write on the platform (linked only to your verified college name — your full name is never shown publicly).</li>
                <li>Device type, browser, IP address, and session timestamps (collected automatically for security and diagnostics).</li>
                <li>Approximate location (with your permission) to show nearby verified listings.</li>
              </ul>

              <h3 className="font-bold text-brand-purple mt-6 mb-2">3.2 From PG Owners</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name, phone number, and email address.</li>
                <li>Aadhaar or PAN number — collected solely to verify your identity before your listing goes live. This is stored in encrypted cloud storage and never shown to students.</li>
                <li>Property details: address, geolocation, room types, pricing breakdown, amenities, house rules, and availability.</li>
                <li>Property photographs taken and uploaded by the HOMLiOO field team during the verification visit.</li>
                <li>Dashboard usage data: how students interact with your listing (views, shortlists, contact clicks).</li>
              </ul>

              <h3 className="font-bold text-brand-purple mt-6 mb-2">3.3 Collected Automatically from All Users</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Log data: pages visited, time spent, actions taken, and error logs.</li>
                <li>Cookies: used for session management, saved preferences, and platform analytics.</li>
                <li>Crash reports and performance data from the app or browser.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">4. HOW WE USE YOUR INFORMATION</h2>
              <ul className="list-none space-y-4">
                <li>
                  <strong>4.1 To Run the Platform:</strong> Creating/managing accounts, displaying verified listings, calculating AI Match Scores, enabling comparisons, generating share links, and connecting students with owners.
                </li>
                <li>
                  <strong>4.2 For Verification and Trust:</strong> Verifying PG owner identity, confirming reviews, detecting fake accounts/spam, and refreshing listing data for accuracy.
                </li>
                <li>
                  <strong>4.3 For Communication:</strong> Sending OTPs, notifying about saved preferences, sending platform updates, and promotional messages (only with explicit opt-in).
                </li>
                <li>
                  <strong>4.4 For Legal/Compliance:</strong> Complying with Indian laws (IT Act 2000, DPDP Act 2023) and responding to lawful requests.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">5. DATA SHARING</h2>
              <p>HOMLiOO does not sell your data. We share information only in the following situations:</p>
              
              <h3 className="font-bold text-brand-purple mt-4 mb-2">5.1 Between Students and PG Owners</h3>
              <p>When a student taps 'Call' or 'WhatsApp', the owner's first name and phone number are shared. HOMLiOO does not share a student's contact details with owners automatically — a student initiates contact first.</p>
              
              <h3 className="font-bold text-brand-purple mt-4 mb-2">5.2 With Service Providers</h3>
              <p>We share data with third-party vendors under strict confidentiality agreements (e.g., Cloud hosting, OTP providers, Analytics, and Payment gateways).</p>
              
              <h3 className="font-bold text-brand-purple mt-4 mb-2">5.3 Legal Disclosures</h3>
              <p>We may share data if required by law or to protect the safety and rights of HOMLiOO users. We never sell data to advertisers.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">6. COOKIES</h2>
              <p>HOMLiOO uses cookies to keep your session active, remember search preferences, and understand platform usage. You can manage cookies through browser settings, but disabling essential cookies may impact functionality.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">7. DATA SECURITY</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All data in transit is protected by SSL/TLS encryption.</li>
                <li>PG owner identity documents are stored encrypted.</li>
                <li>Student accounts are protected by OTP-based phone verification.</li>
                <li>In the event of a data breach, HOMLiOO will notify affected users as required by law.</li>
              </ul>
              <p className="mt-2 text-xs italic">You are responsible for keeping your login details confidential. Log out from shared devices.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">8. DATA RETENTION</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm mt-2 border-collapse border border-slate-200 dark:border-slate-700">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Data Type</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Kept For</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Account & profile data</td><td className="p-3 border border-slate-200 dark:border-slate-700">Until deletion + 2 years</td><td className="p-3 border border-slate-200 dark:border-slate-700">Dispute resolution</td></tr>
                    <tr><td className="p-3 border border-slate-200 dark:border-slate-700">PG owner identity</td><td className="p-3 border border-slate-200 dark:border-slate-700">5 years</td><td className="p-3 border border-slate-200 dark:border-slate-700">Legal compliance (IT Act)</td></tr>
                    <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Listing data</td><td className="p-3 border border-slate-200 dark:border-slate-700">Active + 1 year</td><td className="p-3 border border-slate-200 dark:border-slate-700">Platform operations</td></tr>
                    <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Search & session data</td><td className="p-3 border border-slate-200 dark:border-slate-700">90 days rolling</td><td className="p-3 border border-slate-200 dark:border-slate-700">Security / debugging</td></tr>
                    <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Reviews</td><td className="p-3 border border-slate-200 dark:border-slate-700">Duration of listing + 1 yr</td><td className="p-3 border border-slate-200 dark:border-slate-700">Platform integrity</td></tr>
                    <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Communication records</td><td className="p-3 border border-slate-200 dark:border-slate-700">2 years</td><td className="p-3 border border-slate-200 dark:border-slate-700">Consumer protection</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">9. YOUR RIGHTS — DPDP ACT 2023</h2>
              <p>Under India's Digital Personal Data Protection Act, 2023, you have the following rights:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Access:</strong> Request a summary of your data.</li>
                <li><strong>Correction:</strong> Ask us to correct inaccurate information.</li>
                <li><strong>Deletion:</strong> Request deletion of your account/data within 30 days.</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for non-essential processing at any time.</li>
              </ul>
              <p className="mt-4 bg-brand-purple/5 border border-brand-purple/20 p-4 rounded-xl">
                To exercise any of these rights, email <strong>grievance@homliooo.com</strong> with the subject: 'Data Rights Request'. We will acknowledge within 3 working days and resolve within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">10. PLATFORM DISCLAIMER</h2>
              <p>
                HOMLiOO is a discovery platform. It does not own, manage, or guarantee any property listed on it. All communication and agreements are between the student and PG owner. HOMLiOO is not liable for disputes or misrepresentations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">11. WHAT YOU MUST NOT DO</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Post unauthorised property listings.</li>
                <li>Submit false or fabricated reviews.</li>
                <li>Misuse another user's contact information.</li>
                <li>Create multiple accounts to circumvent restrictions.</li>
                <li>Use automated tools to scrape data.</li>
                <li>Impersonate others.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">12. GOVERNING LAW</h2>
              <p>This Privacy Policy is governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of courts in Greater Noida, Uttar Pradesh.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">13. GRIEVANCE OFFICER</h2>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                <p><strong>Grievance Officer:</strong> [Name — To Be Designated]</p>
                <p><strong>Platform:</strong> HOMLiOO</p>
                <p><strong>Email:</strong> grievance@homliooo.com</p>
                <p><strong>Address:</strong> Greater Noida, Uttar Pradesh, India</p>
                <p><strong>Response Time:</strong> Acknowledgement within 24 hours. Resolution within 30 days.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
