import React from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "How do I apply for accommodation?",
    answer:
      "Just head to our website, use the search to browse available rooms, and once you find the right fit, you can book directly through our platform. Easy as that!",
  },
  {
    question: "What types of places do you offer?",
    answer:
      "We’ve got everything from cozy single rooms and shared spaces to studios and full apartments—something for every style and budget.",
  },
  {
    question: "Are utilities included in the rent?",
    answer:
      "Most of the time, utilities like water, electricity, and gas are included. But it’s always good to double-check the listing details to be sure.",
  },
  {
    question: "How long can I stay?",
    answer:
      "We offer both short-term and longer stays, so it depends on what you need. You can discuss the details with the property owner or manager to find what works best.",
  },
  {
    question: "Is Wi-Fi included?",
    answer:
      "Absolutely! All our places come with Wi-Fi to keep you connected, whether you’re working, relaxing, or streaming your favorite shows.",
  },
  {
    question: "How do I pay for my stay?",
    answer:
      "You can easily pay through our secure online platform, with options like bank transfer, credit card, and sometimes even local payment methods.",
  },
];

const FAQList = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
