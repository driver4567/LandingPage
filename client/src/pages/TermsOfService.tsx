import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="fixed top-24 left-4 z-50 bg-white shadow-md hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: March 27, 2025</p>
          
          <div className="prose max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our products, you agree to be bound by these Terms of Service and to use our website and products in accordance with these Terms. If you don't agree to these Terms, you must not access or use our website or products.
            </p>
            
            <h2>2. Intellectual Property</h2>
            <p>
              Our website and its original content, features, and functionality are owned by PocketCompute and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            
            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access our website and products and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
            
            <h2>4. Products and Services</h2>
            <p>
              PocketCompute provides hardware devices and related software services. All purchases of our products are subject to the following terms:
            </p>
            <ul>
              <li>Prices and availability of products are subject to change without notice.</li>
              <li>We reserve the right to limit the quantity of items purchased.</li>
              <li>Product warranties are provided as specified in product documentation.</li>
              <li>Software updates and services may be necessary for the proper functioning of our products and may be subject to additional terms.</li>
            </ul>
            
            <h2>5. User Content</h2>
            <p>
              Our website and products may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post, and you grant PocketCompute a license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through our website and products.
            </p>
            
            <h2>6. Prohibited Uses</h2>
            <p>
              You may use our website and products only for lawful purposes and in accordance with these Terms. You agree not to use our website or products:
            </p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
              <li>To impersonate or attempt to impersonate PocketCompute, a PocketCompute employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of our website and products, or which may harm PocketCompute or users of our website and products.</li>
            </ul>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall PocketCompute, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our website and products.
            </p>
            
            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
            </p>
            
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;