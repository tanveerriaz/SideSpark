import { ArrowLeft, Mail } from "lucide-react";

import sidesparkMark from "../assets/brand/sidespark-mark.png";

const CONTACT_EMAIL = "tanveer.riaz@hotmail.com";

const POLICIES = {
  privacy: {
    eyebrow: "Your data in this prototype",
    title: "Privacy",
    intro: "SideSpark is currently a prototype. It has no real accounts, people, bookings, messages, or notifications.",
    sections: [
      {
        title: "What this prototype stores",
        content: (
          <>
            <p>Names, profiles, experiences, credits, and badges shown in Demo mode are fictional. If you try the demo, your progress, draft experiences, and reservations are stored in your browser where that storage is available.</p>
            <p>SideSpark does not send those demo records to an application backend. You can remove them by clearing this site's data in your browser.</p>
          </>
        ),
      },
      {
        title: "Technical information",
        content: (
          <p>Like most hosted websites, the hosting service may process standard technical data such as your IP address, browser details, requested pages, and timestamps to deliver and protect the site. That processing is controlled by the hosting provider and its policies.</p>
        ),
      },
      {
        title: "What not to share",
        content: (
          <p>Do not enter confidential, sensitive, financial, medical, employment, identity, or private contact information into this prototype. Demo fields are provided only to explore the product idea.</p>
        ),
      },
      {
        title: "If SideSpark becomes a live service",
        content: (
          <p>This notice will need to change before SideSpark collects real account or community information. A live service would need clear purposes, consent choices, security, retention rules, access and correction processes, and a published data-protection contact.</p>
        ),
      },
    ],
    crossLink: { href: "/terms/", label: "Terms" },
  },
  terms: {
    eyebrow: "Rules for trying the prototype",
    title: "Terms",
    intro: "These terms apply to the current SideSpark prototype. By using it, you agree to use it lawfully and with care.",
    sections: [
      {
        title: "Who may use it",
        content: <p>You must be 18 or older to use SideSpark. The concept is intended for adults joining free online or in-person community experiences.</p>,
      },
      {
        title: "Prototype and demo content",
        content: (
          <p>SideSpark is not yet a live community service. Names, profiles and experiences in Demo mode are fictional. Demo reservations and host drafts do not reach real people. Credits and badges have no monetary value, cannot be bought or transferred, and do not guarantee access to an experience.</p>
        ),
      },
      {
        title: "Use good judgement",
        content: (
          <>
            <p>SideSpark does not provide medical, legal, financial, employment or safety advice. You remain responsible for deciding whether an activity, location, host, guest, or piece of information is suitable for you.</p>
            <p>Do not use the prototype to harm, harass, deceive, impersonate, discriminate against, threaten, exploit, or invade the privacy of another person. Do not submit unlawful material or content you do not have permission to use.</p>
          </>
        ),
      },
      {
        title: "Availability and responsibility",
        content: (
          <p>The prototype is provided for evaluation and may change, stop, or contain mistakes. SideSpark does not promise matches, identity checks, attendance, outcomes, accuracy, availability, or uninterrupted operation. Nothing in these terms excludes rights or liability that the law does not allow to be excluded.</p>
        ),
      },
      {
        title: "Ownership, links and law",
        content: (
          <>
            <p>SideSpark's name, interface, copy, and original media remain the property of their respective owners. You may use the prototype for personal evaluation, but you may not present it as your own service or misuse its content.</p>
            <p>External websites have their own terms and privacy practices. These terms are governed by the laws of Singapore, and disputes are subject to the courts of Singapore.</p>
          </>
        ),
      },
    ],
    crossLink: { href: "/privacy/", label: "Privacy" },
  },
};

export function LegalPage({ type }) {
  const policy = POLICIES[type] ?? POLICIES.privacy;

  return (
    <main className="legal-shell">
      <header className="legal-header">
        <a className="legal-brand" href="/" aria-label="SideSpark home">
          <img src={sidesparkMark} alt="SideSpark spark mark" />
          <span>SideSpark</span>
        </a>
        <a className="legal-back" href="/">
          <ArrowLeft aria-hidden="true" /> Back to SideSpark
        </a>
      </header>

      <article className="legal-article" aria-labelledby="legal-title">
        <p className="legal-eyebrow">{policy.eyebrow}</p>
        <h1 id="legal-title">{policy.title}</h1>
        <p className="legal-updated">Last updated 5 September 2026</p>
        <p className="legal-intro">{policy.intro}</p>

        <div className="legal-sections">
          {policy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>

        <aside className="legal-contact" aria-label="Policy contact">
          <div>
            <p className="legal-eyebrow">Questions or requests</p>
            <h2>Contact Tanveer</h2>
            <p>Ask about this policy, the information stored in your browser, or the SideSpark prototype.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label={`Contact Tanveer about ${policy.title.toLowerCase()}`}>
            <Mail aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
        </aside>

        <nav className="legal-page-links" aria-label="Policy links">
          <a href={policy.crossLink.href}>{policy.crossLink.label}</a>
          <a href="/">Back to SideSpark</a>
        </nav>
      </article>
    </main>
  );
}
