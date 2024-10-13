"use client";
import FAQHeader from "@/app/(home)/faq/_components/FAQHeader";
import FAQList from "@/app/(home)/faq/_components/FAQList";
import PageWrapper from "@/components/PageWrapper";

export default function FAQPage() {
  return (
    <PageWrapper>
      <FAQHeader />
      <FAQList />
    </PageWrapper>
  );
}
