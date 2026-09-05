import { ArrowRight, ExternalLink, Mail } from "lucide-react";

const MAKING_OF_URL = "https://tanveerriaz.me/blog/sidespark-started-with-a-conversation";

export function SiteFooter() {
  return (
    <footer className="sidespark-footer">
      <div className="sidespark-footer__inner">
        <p>
          <strong>SideSpark community prototype.</strong>
          <span>No real accounts, people, bookings, or notifications are connected yet.</span>
        </p>
        <nav className="sidespark-footer__links" aria-label="Footer links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:tanveer.riaz@hotmail.com">
            <Mail aria-hidden="true" /> Contact us
          </a>
          <a href={MAKING_OF_URL} target="_blank" rel="noopener noreferrer">
            How SideSpark was made <ExternalLink aria-hidden="true" />
          </a>
          <a href="/presentation.html">
            Watch the original 60-sec pitch <ArrowRight aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
