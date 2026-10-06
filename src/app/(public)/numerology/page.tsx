import { PageHeading } from '@/components/page-heading';import { Numerology } from '@/components/numerology';
export const metadata={title:'Life path & numerology calculator'};
export default function Page(){return <main className="container public-main"><PageHeading eyebrow="A LITTLE NUMBER MAGIC" title="Your numbers. A new perspective." description="Explore your life path, birthday number, and personal year with a free, transparent numerology calculator."/><Numerology/></main>;}
