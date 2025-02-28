"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <header className="w-full p-4 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">Sova</span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Terms of Service & Privacy Policy</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>

            <h3 className="text-xl font-medium mt-6 mb-3">1. Introduction</h3>
            <p>
              Welcome to Sova ("we," "our," or "us"). By accessing or using our website, services, applications, or any
              other content provided by Sova (collectively, the "Services"), you agree to be bound by these Terms of
              Service ("Terms"). Please read these Terms carefully.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">2. Use of Services</h3>
            <p>
              You may use our Services only if you can form a binding contract with Sova, and only in compliance with
              these Terms and all applicable laws. When you create your Sova account, you must provide us with accurate
              and complete information. Any use or access by anyone under the age of 18 is prohibited.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">3. Account Responsibilities</h3>
            <p>
              You are responsible for safeguarding your password and for any activities or actions under your account.
              We encourage you to use "strong" passwords (passwords that use a combination of upper and lowercase
              letters, numbers, and symbols) with your account. Sova cannot and will not be liable for any loss or
              damage arising from your failure to comply with the above requirements.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">4. Trading Risks</h3>
            <p>
              Trading financial instruments involves significant risk. The value of your investments can go down as well
              as up, and you may not recover the amount of your initial investment. You should carefully consider your
              investment objectives, level of experience, and risk appetite before using our Services. Sova does not
              provide investment advice, and nothing on our platform should be construed as investment advice.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">5. Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, Sova shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
              indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use or
              inability to use the Services.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">6. Modifications to the Services</h3>
            <p>
              We reserve the right to modify or discontinue, temporarily or permanently, the Services (or any part
              thereof) with or without notice. We shall not be liable to you or to any third party for any modification,
              suspension, or discontinuance of the Services.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">7. Termination</h3>
            <p>
              We may terminate or suspend your account and access to the Services immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon
              termination, your right to use the Services will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>

            <h3 className="text-xl font-medium mt-6 mb-3">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us when you create an account, use our Services, or
              communicate with us. This may include your name, email address, phone number, financial information, and
              any other information you choose to provide.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our Services, to process transactions,
              send you related information, communicate with you, and for other legitimate business purposes. We may
              also use the information to detect, investigate, and prevent fraudulent transactions and other illegal
              activities.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">3. Sharing of Information</h3>
            <p>
              We may share the information we collect with third-party vendors, service providers, and other partners
              who need access to such information to carry out work on our behalf. We may also share information in
              response to a request for information if we believe disclosure is in accordance with any applicable law,
              regulation, or legal process.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">4. Data Security</h3>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and
              unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable,
              and we cannot guarantee the security of our systems.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">5. Your Choices</h3>
            <p>
              You may update, correct, or delete information about you at any time by logging into your online account.
              You may also opt out of receiving promotional communications from us by following the instructions in
              those communications.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">6. Changes to this Policy</h3>
            <p>
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising
              the date at the top of the policy and, in some cases, we may provide you with additional notice.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">7. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at: privacy@getsova.com</p>
          </section>

          <div className="mt-12 pt-8 border-t border-border/40 text-center">
            <p className="text-sm text-muted-foreground">Last updated: February 28, 2024</p>
            <Button variant="outline" onClick={() => router.push("/")} className="mt-4 rounded-full">
              Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

