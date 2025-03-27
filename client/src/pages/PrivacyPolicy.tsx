import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: March 27, 2025</p>
          
          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              PocketCompute ("we", "our", or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website or use our products, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our website and products, including:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> This is information by which you may be personally identified, such as name, postal address, email address, telephone number, payment information, or any other identifier by which you may be contacted online or offline.
              </li>
              <li>
                <strong>Usage Information:</strong> Details about your use of our website and products, including your IP address, browser type, operating system, device information, pages visited, length of visit, and referral source.
              </li>
              <li>
                <strong>Device Information:</strong> When you use our products, we may collect data about your device operations, such as hardware model, operating system, and performance information.
              </li>
            </ul>
            
            <h2>3. How We Collect Information</h2>
            <p>
              We collect this information directly from you when you provide it to us, automatically as you navigate through the site, and from third parties.
            </p>
            <ul>
              <li>
                <strong>Information You Provide:</strong> We collect information you provide directly when you register for an account, make a purchase, sign up for our newsletter, respond to a survey, or contact customer service.
              </li>
              <li>
                <strong>Automatic Information Collection:</strong> We use cookies, web beacons, and other tracking technologies to collect information about your equipment, browsing actions, and usage patterns.
              </li>
              <li>
                <strong>Third-Party Sources:</strong> We may receive information about you from third parties, including business partners, analytics providers, and service providers.
              </li>
            </ul>
            
            <h2>4. How We Use Your Information</h2>
            <p>
              We use information that we collect about you or that you provide to us, including any personal information:
            </p>
            <ul>
              <li>To present our website and products to you in the best possible way.</li>
              <li>To provide you with products, information, and services that you request from us.</li>
              <li>To process and complete your transactions and send you related information.</li>
              <li>To communicate with you about your account or your use of our products.</li>
              <li>To provide you with customer support and respond to your inquiries.</li>
              <li>To improve our website, products, and customer service.</li>
              <li>To personalize your experience and deliver content relevant to your interests.</li>
              <li>To comply with our legal obligations and enforce our terms of use.</li>
            </ul>
            
            <h2>5. Disclosure of Your Information</h2>
            <p>
              We may disclose personal information that we collect or you provide as described in this privacy policy:
            </p>
            <ul>
              <li>To our subsidiaries and affiliates for the purposes described in this policy.</li>
              <li>To service providers who perform functions on our behalf, such as hosting providers, payment processors, and customer service providers.</li>
              <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
              <li>To enforce or apply our terms of use and other agreements.</li>
              <li>To protect the rights, property, or safety of PocketCompute, our customers, or others.</li>
            </ul>
            
            <h2>6. Data Security</h2>
            <p>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls. Any payment transactions will be encrypted.
            </p>
            
            <h2>7. Your Rights and Choices</h2>
            <p>
              You have certain rights regarding your personal information, which may include:
            </p>
            <ul>
              <li>The right to access and obtain a copy of your personal information.</li>
              <li>The right to rectify or update your personal information.</li>
              <li>The right to delete your personal information.</li>
              <li>The right to restrict or object to our processing of your personal information.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw your consent at any time.</li>
            </ul>
            
            <h2>8. International Transfers</h2>
            <p>
              Your personal information may be transferred to, and processed in, countries other than the country in which you are resident. These countries may have data protection laws different from the laws of your country. By using our website and products, you consent to this transfer, storing, or processing.
            </p>
            
            <h2>9. Children's Privacy</h2>
            <p>
              Our website and products are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on our website or products.
            </p>
            
            <h2>10. Changes to Our Privacy Policy</h2>
            <p>
              We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on our website. The date the privacy policy was last revised is identified at the top of the page.
            </p>
            
            <h2>11. Contact Information</h2>
            <p>
              To ask questions or comment about this privacy policy and our privacy practices, contact us at:
            </p>
            <p>
              PocketCompute<br />
              123 Innovation Drive<br />
              Tech City, CA 94043<br />
              contact@pocketcompute.tech
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;