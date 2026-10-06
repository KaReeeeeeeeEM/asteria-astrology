import { PageHeading } from "@/components/page-heading";
export const metadata = { title: "Privacy & your data" };
export default function Privacy() {
  return (
    <main className="container public-main legal-page">
      <PageHeading
        eyebrow="YOUR DATA BELONGS TO YOU"
        title="A private place to explore."
        description="Privacy policy · Updated October 6, 2026"
      />
      <article className="article-prose">
        <h2>What we store</h2>
        <p>
          When you register, we store your email address, display name, a
          securely hashed password, account timestamps, and authentication
          sessions. Passkeys store public credentials and authenticator
          metadata; we never receive your biometric data or private passkey.
        </p>
        <p>
          Saved charts contain the name or nickname, birth date, optional birth
          time, location, coordinates, and time zone you choose to save. Journal
          entries and saved article bookmarks are associated with your account.
          These records are accessible through authenticated, account-scoped
          application APIs.
        </p>
        <h2>Public chart calculations</h2>
        <p>
          Public birth chart and synastry calculations run in your browser.
          Birth details are not saved to our database until you explicitly save
          a chart. City lookup sends only your search query to Open-Meteo’s
          geocoding service. Use a nickname and enter coordinates manually if
          you prefer.
        </p>
        <h2>Service providers</h2>
        <p>
          Vercel hosts the application and may process request logs and network
          metadata. Neon stores account data. Easymail delivers transactional
          verification and password-reset messages through the configured SMTP
          sender; this includes your email address and the message contents.
          Open-Meteo handles optional city searches. Fonts are served by the
          application. We do not install advertising trackers or third-party
          analytics.
        </p>
        <h2>Cookies and offline storage</h2>
        <p>
          Essential session cookies support sign-in. The progressive web app
          caches an offline guide and app icon. It does not cache authenticated
          dashboard pages, API responses, or journal data. You can remove
          browser storage or uninstall the app through your device settings.
        </p>
        <h2>Your controls</h2>
        <p>
          You can export your profile, charts, recent journal entries (up to
          200), and bookmarks from Settings. You can delete individual saved
          records or delete your entire account with password confirmation.
          Account deletion cascades to charts, reflections, bookmarks, passkeys,
          and sessions. Provider logs and backup retention follow the respective
          service provider’s policies.
        </p>
        <h2>Responsible use</h2>
        <p>
          Do not enter another person’s birth details without their permission.
          The service is intended for users aged 18 and over. Never include
          passwords, identification numbers, or other highly sensitive
          information in a journal entry.
        </p>
        <h2>Requests and contact</h2>
        <p>
          For privacy questions, corrections, or issues accessing your data,
          contact the operator at{" "}
          <a href="mailto:jokareem24@gmail.com">jokareem24@gmail.com</a>. This
          privacy policy describes the current application and will be updated
          if its data practices change.
        </p>
      </article>
    </main>
  );
}
