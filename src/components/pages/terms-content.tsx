import { Text } from "@/components/language";
import { PageHeading } from "@/components/page-heading";
export const metadata = { title: "Terms of use" };
export default function Terms() {
  return (
    <section className="dashboard-tool-content legal-page">
      <PageHeading
        eyebrow="A THOUGHTFUL SHARED SPACE"
        title="Room for curiosity and care."
        description="Terms of use · Updated October 6, 2026"
      />
      <article className="article-prose">
        <h2>
          <Text>{"Using Asteria"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Asteria offers free astrology tools and educational content for adults aged 18 and over. By creating an account, you agree to use the service responsibly, provide an email address you control, and protect your sign-in credentials."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Symbolic interpretations"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Charts and readings are provided for reflection, education, and entertainment. Astrology is not a scientifically validated method for predicting individual outcomes. Interpretations are not professional health, legal, financial, or relationship advice. You remain responsible for your choices."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Calculation limits"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Asteria calculates tropical geocentric planetary longitudes and whole-sign houses. Unknown birth times use local noon and omit angles and houses. Angle calculations use a simplified mean-obliquity model; houses are omitted at latitudes of 66 degrees or higher. Data-entry errors, ambiguous daylight-saving times, and different astrological methods can affect results. Specialized techniques introduced in the library are not all implemented as calculators."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Accounts and content"}</Text>
        </h2>
        <p>
          <Text>
            {
              "Your saved chart details and reflections belong to you. You grant the application permission to store and process them to provide the service. Do not upload another person’s details without consent, abuse email delivery, attempt unauthorized access, or use the application for unlawful purposes."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Availability"}</Text>
        </h2>
        <p>
          <Text>
            {
              "The app uses free hosting, database, and email tiers with usage limits. Availability and uninterrupted delivery are not guaranteed. Features and limits may change, and material changes will be reflected in the documentation and policies. Asteria does not currently charge fees."
            }
          </Text>
        </p>
        <h2>
          <Text>{"Deletion and contact"}</Text>
        </h2>
        <p>
          <Text>
            {
              "You may export your data and delete your account in Settings. For service questions, contact"
            }
          </Text>
          <Text> </Text>
          <a href="mailto:jokareem24@gmail.com">
            <Text>{"jokareem24@gmail.com"}</Text>
          </a>
          <Text>
            {
              ". The application’s open-source license governs reuse of its code; these terms govern use of the hosted service."
            }
          </Text>
        </p>
      </article>
    </section>
  );
}
