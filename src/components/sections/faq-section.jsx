"use client";
import { useState } from "react";
import { PiPlus } from "react-icons/pi";
import styles from "./landing.module.css";

const questions = [
    { question: "Who is Team Tasks for?", answer: "Team Tasks is built for managers who want a clear place to maintain tasks under their teams, monitor progress, and keep deadlines visible." },
    { question: "Do my team members need accounts?", answer: "No. You manage your teams and their task boards from your own account. Your team members do not need to sign up." },
    { question: "How do I keep track of deadlines?", answer: "Add an optional due date when creating or editing a task. The date appears on its card, and unfinished tasks past their deadline are marked overdue." },
    { question: "What do AI summaries include?", answer: "AI summaries use your team's task titles and statuses to give you a quick overview of progress and suggest next steps. Review the suggestions before acting on them." },
];
export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);
    return <section data-reveal="visible" id="faq" className={styles.faq}>
        <div className={styles.sectionHeading}>
            {/* <p className={styles.eyebrow}>
                A FEW THINGS TO KNOW
            </p>*/}
            <h2>
                Good questions.<br /><span>Clear answers.</span>
            </h2>
        </div>
        <div className={styles.questions}>{questions.map((item, index) => {
            const isOpen = openIndex === index;
            return <div key={item.question} className={styles.question}>
                <h3><button id={`faq-question-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}>{item.question}<PiPlus className={styles.faqToggle} aria-hidden="true" /></button></h3>
                <div id={`faq-answer-${index}`} className={styles.answer} data-open={isOpen} aria-hidden={!isOpen} inert={!isOpen} role="region" aria-labelledby={`faq-question-${index}`}>
                    <div className={styles.answerInner}><p>{item.answer}</p></div>
                </div>
            </div>;
        })}</div>
    </section>;
}
