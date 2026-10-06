import { PageHeading } from "@/components/page-heading";
export const metadata = { title: "Terms of use" };
export default function Terms() {
  return (
    <main className="container public-main legal-page">
      <PageHeading
        eyebrow="A THOUGHTFUL SHARED SPACE"
        title="Room for curiosity and care."
        description="Terms of use · Updated October 6, 2026"
      />
      <article className="article-prose">
        <h2>Using Asteria</h2>
        <p>
          Asteria offers free astrology tools and educational content for adults
          aged 18 and over. By creating an account, you agree to use the service
          responsibly, provide an email address you control, and protect your
          sign-in credentials.
        </p>
        <h2>Symbolic interpretations</h2>
        <p>
          Charts and readings are provided for reflection, education, and
          entertainment. Astrology is not a scientifically validated method for
          predicting individual outcomes. Interpretations are not professional
          health, legal, financial, or relationship advice. You remain
          responsible for your choices.
        </p>
        <h2>Calculation limits</h2>
        <p>
          Asteria calculates tropical geocentric planetary longitudes and
          whole-sign houses. Unknown birth times use local noon and omit angles
          and houses. Angle calculations use a simplified mean-obliquity model;
          houses are omitted at latitudes of 66 degrees or higher. Data-entry
          errors, ambiguous daylight-saving times, and different astrological
          methods can affect results. Specialized techniques introduced in the
          library are not all implemented as calculators.
        </p>
        <h2>Accounts and content</h2>
        <p>
          Your saved chart details and reflections belong to you. You grant the
          application permission to store and process them to provide the
          service. Do not upload another person’s details without consent, abuse
          email delivery, attempt unauthorized access, or use the application
          for unlawful purposes.
        </p>
        <h2>Availability</h2>
        <p>
          The app uses free hosting, database, and email tiers with usage
          limits. Availability and uninterrupted delivery are not guaranteed.
          Features and limits may change, and material changes will be reflected
          in the documentation and policies. Asteria does not currently charge
          fees.
        </p>
        <h2>Deletion and contact</h2>
        <p>
          You may export your data and delete your account in Settings. For
          service questions, contact{" "}
          <a href="mailto:jokareem24@gmail.com">jokareem24@gmail.com</a>. The
          application’s open-source license governs reuse of its code; these
          terms govern use of the hosted service.
        </p>
      </article>
    </main>
  );
}
