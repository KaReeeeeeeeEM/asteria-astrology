import { Text } from "@/components/language";
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading enter">
      <span className="eyebrow">
        ✦ <Text>{eyebrow}</Text>
      </span>
      <h1>
        <Text>{title}</Text>
      </h1>
      <p>
        <Text>{description}</Text>
      </p>
    </div>
  );
}
