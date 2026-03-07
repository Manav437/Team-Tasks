"use client";
import { useState } from "react";
import { faqContent } from "@/constants";
import { FaqItem } from "@/components/ui/faq-item";

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="w-11/12 max-w-2xl mx-auto my-16">
            <h2 className="text-3xl font-bold mb-10 text-center text-slate-900 tracking-tight">
                Frequently Asked Questions
            </h2>

            <div className="flex flex-col gap-3 min-h-[400px]">
                {faqContent.map((item, index) => (
                    <FaqItem
                        key={index}
                        item={item}
                        isOpen={openIndex === index}
                        onToggle={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                    />
                ))}
            </div>
        </section>
    );
}
