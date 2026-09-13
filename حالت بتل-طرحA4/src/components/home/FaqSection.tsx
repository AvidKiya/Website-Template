import type { Faq } from "@/data/types";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="container-x section-gap" id="faq" aria-label="سوالات متداول">
      <SectionHeader title="پرسش‌های متداول" subtitle="پاسخ سریع به رایج‌ترین سوال‌های خریداران" />
      <Accordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
