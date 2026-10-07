import { Text } from "@/components/language";
import { PageHeading } from "@/components/page-heading";
export const metadata = { title: "Privacy & your data" };
export default function Privacy() {
  return (
    <section className="dashboard-tool-content legal-page">
      <PageHeading
        eyebrow="YOUR DATA BELONGS TO YOU"
        title="A private place to explore."
        description="Privacy policy · Updated October 7, 2026"
      />
      <article className="article-prose">
        <h2>
          <Text>{"What we store"}</Text>
        </h2>
        <p>
          <Text>
            {
              "When you register, we store your email address, display name, a securely hashed password, account timestamps, and authentication sessions. Passkeys store public credentials and authenticator metadata; we never receive your biometric data or private passkey."
            }
          </Text>
        </p>
        <p>
          <Text>
            {
              "Saved charts contain the name or nickname, birth date, optional birth time, location, coordinates, and time zone you choose to save. Journal entries and saved article bookmarks are associated with your account. These records are accessible through authenticated, account-scoped application APIs."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Public chart calculations"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Public birth chart and synastry calculations run in your browser. Birth details are not saved to our database until you explicitly save a chart. City lookup sends only your search query to Open-Meteo’s geocoding service. Use a nickname and enter coordinates manually if you prefer."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Service providers"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Vercel hosts the application and may process request logs and network metadata. Neon stores account data. Easymail delivers transactional verification and password-reset messages through the configured SMTP sender; this includes your email address and the message contents. Open-Meteo handles optional city searches. Fonts are served by the application. We do not install advertising trackers or third-party analytics."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Cookies and offline storage"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Essential session cookies support sign-in. Preference cookies remember your language and sidebar state; browser storage remembers language and theme for the offline guide. The progressive web app caches an offline guide and app icon. It does not cache authenticated dashboard pages, API responses, or journal data. You can remove browser storage or uninstall the app through your device settings."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Your controls"}</Text>
        </h2>
        <p>
          <Text>
            {
              "You can export your profile, charts, recent journal entries (up to 200), and bookmarks from Settings. You can delete individual saved records or delete your entire account with password confirmation. Account deletion cascades to charts, reflections, bookmarks, passkeys, and sessions. Provider logs and backup retention follow the respective service provider’s policies."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Responsible use"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Do not enter another person’s birth details without their permission. The service is intended for users aged 18 and over. Never include passwords, identification numbers, or other highly sensitive information in a journal entry."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Requests and contact"}</Text>
        </h2>
        <p>
          <Text>
            {
              "For privacy questions, corrections, or issues accessing your data, contact the operator at"
            }
          </Text>
          <Text> </Text>
          <a href="mailto:jokareem24@gmail.com">
            <Text>{"jokareem24@gmail.com"}</Text>
          </a>
          <Text>
            {
              ". This privacy policy describes the current application and will be updated if its data practices change."
            }
          </Text>
        </p>
      </article>
    </section>
  );
}
