export type Sign = {
  name: string;
  symbol: string;
  element: string;
  modality: string;
  ruler: string;
  dates: string;
  archetype: string;
  gift: string;
  growth: string;
  description: string;
};
export const signs: Sign[] = [
  {
    name: "Aries",
    symbol: "♈\uFE0E",
    element: "Fire",
    modality: "Cardinal",
    ruler: "Mars",
    dates: "Mar 21 – Apr 19",
    archetype: "The initiator",
    gift: "Courage",
    growth: "Patience",
    description:
      "Aries begins the zodiac with directness, initiative, and a willingness to try. Its fire is the first spark: an instinct to move before every detail is settled. Give enthusiasm a clear purpose, and make room for the pace of others.",
  },
  {
    name: "Taurus",
    symbol: "♉\uFE0E",
    element: "Earth",
    modality: "Fixed",
    ruler: "Venus",
    dates: "Apr 20 – May 20",
    archetype: "The cultivator",
    gift: "Steadiness",
    growth: "Flexibility",
    description:
      "Taurus makes an idea tangible. Associated with the senses, resources, and lasting values, it asks what is worth tending over time. Stability nourishes this sign; growth comes from recognizing when comfort has become a constraint.",
  },
  {
    name: "Gemini",
    symbol: "♊\uFE0E",
    element: "Air",
    modality: "Mutable",
    ruler: "Mercury",
    dates: "May 21 – Jun 20",
    archetype: "The storyteller",
    gift: "Curiosity",
    growth: "Focus",
    description:
      "Gemini connects people and ideas through language. Its adaptable air notices a second perspective and asks another question. Curiosity is its gift; following one thread deeply helps turn information into understanding.",
  },
  {
    name: "Cancer",
    symbol: "♋\uFE0E",
    element: "Water",
    modality: "Cardinal",
    ruler: "Moon",
    dates: "Jun 21 – Jul 22",
    archetype: "The nurturer",
    gift: "Care",
    growth: "Boundaries",
    description:
      "Cancer builds emotional shelter. Memory, belonging, and the rhythms of home are central to its symbolism. Care becomes sustainable when it includes boundaries and the willingness to name a need rather than hoping it will be sensed.",
  },
  {
    name: "Leo",
    symbol: "♌\uFE0E",
    element: "Fire",
    modality: "Fixed",
    ruler: "Sun",
    dates: "Jul 23 – Aug 22",
    archetype: "The creator",
    gift: "Generosity",
    growth: "Receptivity",
    description:
      "Leo brings warmth, creativity, and a desire to participate wholeheartedly in life. It is associated with the courage to be seen and to celebrate others. Its growth lies in making room for shared authorship and quiet forms of recognition.",
  },
  {
    name: "Virgo",
    symbol: "♍\uFE0E",
    element: "Earth",
    modality: "Mutable",
    ruler: "Mercury",
    dates: "Aug 23 – Sep 22",
    archetype: "The craftsperson",
    gift: "Discernment",
    growth: "Self-compassion",
    description:
      "Virgo refines what already exists. Practical observation, skill, and useful service are its recurring themes. Discernment becomes kinder when a workable solution matters more than an impossible standard of perfection.",
  },
  {
    name: "Libra",
    symbol: "♎\uFE0E",
    element: "Air",
    modality: "Cardinal",
    ruler: "Venus",
    dates: "Sep 23 – Oct 22",
    archetype: "The harmonizer",
    gift: "Perspective",
    growth: "Decisiveness",
    description:
      "Libra initiates connection through dialogue, proportion, and fairness. It notices how one choice affects another person. Harmony becomes authentic when it includes honest disagreement and a clear statement of personal preference.",
  },
  {
    name: "Scorpio",
    symbol: "♏\uFE0E",
    element: "Water",
    modality: "Fixed",
    ruler: "Mars · Pluto (modern)",
    dates: "Oct 23 – Nov 21",
    archetype: "The alchemist",
    gift: "Depth",
    growth: "Trust",
    description:
      "Scorpio explores intimacy, vulnerability, and transformation. Its symbolism favors honest engagement with what lies beneath appearances. Depth becomes constructive when protection softens enough to allow reciprocal trust.",
  },
  {
    name: "Sagittarius",
    symbol: "♐\uFE0E",
    element: "Fire",
    modality: "Mutable",
    ruler: "Jupiter",
    dates: "Nov 22 – Dec 21",
    archetype: "The explorer",
    gift: "Vision",
    growth: "Follow-through",
    description:
      "Sagittarius seeks a wider horizon through study, travel, and meaning. It links a personal experience to a larger story. Its optimism grows stronger when a promising vision is grounded in detail and accountable action.",
  },
  {
    name: "Capricorn",
    symbol: "♑\uFE0E",
    element: "Earth",
    modality: "Cardinal",
    ruler: "Saturn",
    dates: "Dec 22 – Jan 19",
    archetype: "The builder",
    gift: "Commitment",
    growth: "Rest",
    description:
      "Capricorn organizes effort into something lasting. Responsibility, structure, and long-term practice belong to its symbolism. Competence is most sustainable when achievement makes room for rest, vulnerability, and relationships.",
  },
  {
    name: "Aquarius",
    symbol: "♒\uFE0E",
    element: "Air",
    modality: "Fixed",
    ruler: "Saturn · Uranus (modern)",
    dates: "Jan 20 – Feb 18",
    archetype: "The visionary",
    gift: "Originality",
    growth: "Presence",
    description:
      "Aquarius considers networks, collective ideals, and alternatives to familiar systems. Its fixed air can sustain an unconventional idea. Its growth is to connect a broad principle with the particular people who live with its consequences.",
  },
  {
    name: "Pisces",
    symbol: "♓\uFE0E",
    element: "Water",
    modality: "Mutable",
    ruler: "Jupiter · Neptune (modern)",
    dates: "Feb 19 – Mar 20",
    archetype: "The dreamer",
    gift: "Imagination",
    growth: "Grounding",
    description:
      "Pisces closes the zodiac with empathy, imagination, and sensitivity to atmosphere. Its symbolism crosses the boundaries between self and other. Grounding practices and clear limits give compassion a reliable place to live.",
  },
];
export const planets = [
  {
    name: "Sun",
    symbol: "☉",
    theme: "Identity & vitality",
    text: "The Sun describes a symbolic center of purpose: how you create, direct your attention, and become more fully yourself. Its sign describes a style of expression; its house locates a field of experience. Read it together with the Moon and Ascendant rather than treating it as a complete personality.",
  },
  {
    name: "Moon",
    symbol: "☽",
    theme: "Feelings & belonging",
    text: "The Moon symbolizes emotional habits, memory, and what helps you feel held. Its sign describes a way of processing experience; its house suggests where you seek familiarity. Its swift motion makes an accurate birth time valuable, particularly near a sign boundary.",
  },
  {
    name: "Mercury",
    symbol: "☿",
    theme: "Mind & communication",
    text: "Mercury represents learning, speech, writing, and the exchange of ideas. Consider both a sign’s style and the aspects Mercury makes to other planets. Retrograde motion is an apparent reversal seen from Earth; astrology uses it as a symbol for review rather than evidence of inevitable disruption.",
  },
  {
    name: "Venus",
    symbol: "♀",
    theme: "Connection & values",
    text: "Venus concerns attraction, pleasure, reciprocity, and what you value. It can describe the qualities you appreciate in art and relationships. Venus does not determine a partner’s worth or whether a relationship will succeed; lived communication carries more weight than a placement.",
  },
  {
    name: "Mars",
    symbol: "♂",
    theme: "Action & desire",
    text: "Mars symbolizes assertion, effort, desire, and the way you meet resistance. Its expression can range from courage to impatience. A constructive reading asks where energy needs a clear outlet and how to act without overriding another person’s boundaries.",
  },
  {
    name: "Jupiter",
    symbol: "♃",
    theme: "Growth & meaning",
    text: "Jupiter represents expansion, study, confidence, and the search for meaning. In traditional astrology it is a benefic, but expansion can also exceed healthy limits. Ask what deserves more space and where optimism needs evidence and proportion.",
  },
  {
    name: "Saturn",
    symbol: "♄",
    theme: "Structure & time",
    text: "Saturn symbolizes limits, responsibility, repetition, and maturation. Its themes can be demanding and also deeply stabilizing. Read Saturn as an invitation to patient practice, not a sentence of misfortune or a guarantee of a specific life event.",
  },
  {
    name: "Uranus",
    symbol: "♅",
    theme: "Change & originality",
    text: "Uranus belongs to modern astrology and symbolizes innovation, independence, and breaks with convention. Its slow orbit gives it a generational dimension. Personal aspects and houses can focus those broad themes into a more individual reading.",
  },
  {
    name: "Neptune",
    symbol: "♆",
    theme: "Imagination & ideals",
    text: "Neptune is a modern astrological symbol for imagination, ideals, spirituality, and blurred boundaries. Its reading often asks how to distinguish a meaningful dream from an untested assumption. Grounding and consent remain important when interpreting sensitivity.",
  },
  {
    name: "Pluto",
    symbol: "♇",
    theme: "Power & transformation",
    text: "Pluto is used in modern astrology to explore power, attachment, endings, and renewal. Its very slow movement describes shared historical themes as well as personal symbolism through aspects and houses. Interpretations should support agency and avoid frightening predictions.",
  },
];
export const aspectDefinitions = [
  {
    name: "Conjunction",
    angle: 0,
    orb: 8,
    symbol: "☌",
    tone: "Integration",
    text: "Two planets occupy nearby zodiacal longitudes. Their symbols combine, intensify, or compete for the same channel. A conjunction is not automatically easy or difficult: consider the planets involved and the rest of the chart.",
  },
  {
    name: "Sextile",
    angle: 60,
    orb: 4,
    symbol: "⚹",
    tone: "Opportunity",
    text: "A sixty-degree relationship traditionally connects compatible elements. Sextiles suggest a workable opening that benefits from participation. Look for a skill or conversation you can actively cultivate rather than expecting opportunity to arrive by itself.",
  },
  {
    name: "Square",
    angle: 90,
    orb: 6,
    symbol: "□",
    tone: "Growth through friction",
    text: "A ninety-degree relationship symbolizes tension between different needs or methods. Squares can motivate practice and change. Avoid treating them as defects: a reading can ask how both needs can be expressed without one defeating the other.",
  },
  {
    name: "Trine",
    angle: 120,
    orb: 6,
    symbol: "△",
    tone: "Flow",
    text: "A one-hundred-twenty-degree relationship traditionally links the same element. It suggests an easy exchange or familiar talent. Ease still needs direction; ask what can be developed instead of assuming a trine guarantees an outcome.",
  },
  {
    name: "Quincunx",
    angle: 150,
    orb: 3,
    symbol: "⚻",
    tone: "Adjustment",
    text: "A one-hundred-fifty-degree relationship is emphasized in some modern schools. Its symbolism concerns adjustment between styles that do not share element or modality. Interpret it gently and in context; traditions disagree on its importance.",
  },
  {
    name: "Opposition",
    angle: 180,
    orb: 8,
    symbol: "☍",
    tone: "Balance",
    text: "A one-hundred-eighty-degree relationship connects opposite zodiacal positions. It symbolizes polarity, perspective, and the need for integration. Relationships can make an opposition visible, but another person is not responsible for resolving your chart.",
  },
  {
    name: "Semisextile",
    angle: 30,
    orb: 2,
    symbol: "⚺",
    tone: "Subtle adjustment",
    text: "A thirty-degree minor aspect joins neighboring signs. Some modern astrologers interpret it as a small but persistent adjustment. It is usually given a narrower orb and less emphasis than major aspects.",
  },
  {
    name: "Semisquare",
    angle: 45,
    orb: 2,
    symbol: "∠",
    tone: "Subtle friction",
    text: "A forty-five-degree minor aspect is often interpreted as a quieter form of tension. Use a narrow orb and consider whether major aspects already explain the same theme before giving it special weight.",
  },
  {
    name: "Quintile",
    angle: 72,
    orb: 2,
    symbol: "Q",
    tone: "Creative pattern",
    text: "A seventy-two-degree minor aspect divides the circle into five. Some modern schools associate it with creative organization or skill. It is a specialized symbolic technique rather than a universally accepted interpretive rule.",
  },
  {
    name: "Sesquiquadrate",
    angle: 135,
    orb: 2,
    symbol: "⚼",
    tone: "Refinement through tension",
    text: "A one-hundred-thirty-five-degree minor aspect belongs to the square family in many modern interpretations. It can be read as a recurring tension that asks for refinement. Narrow orbs help avoid finding patterns everywhere.",
  },
  {
    name: "Biquintile",
    angle: 144,
    orb: 2,
    symbol: "bQ",
    tone: "Creative development",
    text: "A one-hundred-forty-four-degree minor aspect is twice the quintile. Some astrologers connect it with creative development. It should remain a secondary theme and does not establish innate superiority or a guaranteed talent.",
  },
];
export const houseThemes = [
  "Identity & appearance",
  "Resources & values",
  "Communication & local life",
  "Home & foundations",
  "Creativity & pleasure",
  "Routine & service",
  "Partnership & agreements",
  "Shared resources & vulnerability",
  "Learning & wider horizons",
  "Vocation & visibility",
  "Community & hopes",
  "Solitude & reflection",
];
export type Article = {
  slug: string;
  title: string;
  category: string;
  intro: string;
  sections: { title: string; text: string }[];
  minutes: number;
};
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
const foundations: Article[] = [
  {
    slug: "reading-your-birth-chart",
    title: "How to read your birth chart",
    category: "Foundations",
    intro: "A map of the sky. A language for getting to know yourself.",
    minutes: 6,
    sections: [
      {
        title: "Start with the whole picture",
        text: "A natal chart maps the sky at a particular time and place. Astrology interprets that map through signs, planets, houses, and aspects. Begin with the Sun, Moon, and Ascendant, then notice repeated elements and modalities. No single placement can summarize a person.",
      },
      {
        title: "Planet, sign, house, aspect",
        text: "A useful reading grammar is: the planet describes a symbolic function, the sign describes its style, the house describes a field of experience, and aspects describe relationships between functions. A Venus placement, for example, becomes more meaningful when its house and connections are considered.",
      },
      {
        title: "Accuracy and uncertainty",
        text: "Enter a recorded birth time and the time zone in effect at birth. A small time error can shift the Ascendant and house boundaries. If time is unknown, Asteria omits houses and rising sign rather than pretending a noon chart is precise. Even planetary signs near a boundary may remain uncertain.",
      },
      {
        title: "Interpret with care",
        text: "Astrology is a cultural and symbolic practice, not a scientifically validated method of predicting an individual’s future. Use a reading to generate questions, not to limit choices. Your history, relationships, and decisions are more complex than any chart.",
      },
    ],
  },
  {
    slug: "elements-and-modalities",
    title: "The four elements & three modalities",
    category: "Foundations",
    intro: "Understand the twelve signs through a simpler pattern.",
    minutes: 4,
    sections: [
      {
        title: "Four elements",
        text: "Fire emphasizes initiative and enthusiasm; Earth emphasizes embodiment and practicality; Air emphasizes ideas and relationship; Water emphasizes feeling and connection. These are symbolic categories, not physical measurements. Each element contains three signs.",
      },
      {
        title: "Three modalities",
        text: "Cardinal signs begin and orient: Aries, Cancer, Libra, Capricorn. Fixed signs sustain and consolidate: Taurus, Leo, Scorpio, Aquarius. Mutable signs adapt and connect: Gemini, Virgo, Sagittarius, Pisces. A chart contains all twelve signs, even when planets cluster in only a few.",
      },
      {
        title: "A balanced reading",
        text: "An element distribution is a count of selected planetary placements. It can be a useful overview, but weighting systems differ between astrologers. A low count does not mean a person lacks a capacity; consider houses, rulers, lived experience, and the whole chart.",
      },
    ],
  },
  {
    slug: "tropical-and-sidereal",
    title: "Tropical & sidereal astrology",
    category: "Traditions",
    intro: "Two reference systems. Different ways of orienting the zodiac.",
    minutes: 5,
    sections: [
      {
        title: "The tropical zodiac",
        text: "The tropical zodiac starts at the March equinox and divides the ecliptic into twelve equal thirty-degree signs. It is tied to seasonal reference points, not the uneven borders of astronomical constellations. Asteria’s calculations use this system.",
      },
      {
        title: "The sidereal zodiac",
        text: "Sidereal systems anchor signs to a stellar reference using an ayanamsha. Several conventions exist, including Lahiri. Vedic astrology commonly uses a sidereal zodiac alongside techniques such as nakshatras and dashas. A tropical chart is not interchangeable with a sidereal chart.",
      },
      {
        title: "Choosing a tradition",
        text: "Both traditions have long interpretive histories and internal disagreements. Learn the assumptions of one system before mixing techniques. Asteria teaches these differences but does not currently calculate a sidereal chart or dasha schedule.",
      },
    ],
  },
  {
    slug: "houses-and-birth-time",
    title: "Houses, angles & your birth time",
    category: "Foundations",
    intro: "Why location and a few minutes can change a chart.",
    minutes: 5,
    sections: [
      {
        title: "The angles",
        text: "The Ascendant is the zodiacal degree rising at the eastern horizon. Its opposite is the Descendant. The Midheaven marks the meridian intersection with the ecliptic, and the IC is opposite it. These depend on time and location; Asteria calculates the Ascendant and Midheaven when birth time is known.",
      },
      {
        title: "Whole-sign houses",
        text: "Asteria uses whole-sign houses: the entire rising sign becomes the first house, and subsequent signs form the remaining eleven houses. The Ascendant and Midheaven remain distinct points; the Midheaven is not necessarily in the tenth whole-sign house.",
      },
      {
        title: "Other systems",
        text: "Placidus, Koch, equal-house, and other systems divide the chart differently. House placements can change when systems change. Asteria does not label whole-sign results as Placidus. Near the geographic poles the Ascendant becomes unstable; houses are omitted above 66 degrees latitude.",
      },
    ],
  },
  {
    slug: "retrogrades-explained",
    title: "Retrogrades without the fear",
    category: "Techniques",
    intro: "Apparent motion, interpreted with perspective.",
    minutes: 4,
    sections: [
      {
        title: "What is moving backward?",
        text: "A planet is called retrograde when its apparent geocentric longitude decreases. It does not reverse its physical orbit. The effect arises from the relative motion of Earth and the planet. Asteria estimates direction using positions twelve hours before and after the selected instant.",
      },
      {
        title: "A symbolic reading",
        text: "Many modern astrologers associate retrogrades with revision, internalization, or returning to unfinished work. These are interpretive themes, not causal scientific findings. Mercury retrograde does not require canceling a trip, a relationship, or a necessary decision.",
      },
      {
        title: "Natal and transiting",
        text: "A natal retrograde describes a placement in a birth chart; a current retrograde describes the sky now. Personal transits compare current planets to natal placements. Context and the specific planets matter more than a broad retrograde headline.",
      },
    ],
  },
  {
    slug: "moon-phases",
    title: "Living with the lunar cycle",
    category: "Moon",
    intro: "An invitation to notice rhythms, from new moon to full.",
    minutes: 4,
    sections: [
      {
        title: "The astronomical cycle",
        text: "The Moon’s phase depends on its angular separation from the Sun as seen from Earth. The synodic cycle averages about 29.5 days. New moon corresponds to conjunction, first quarter to ninety degrees, full moon to opposition, and last quarter to two-hundred-seventy degrees.",
      },
      {
        title: "A reflective practice",
        text: "Some people use the waxing half of the cycle to develop intentions and the waning half to review or release. This is a chosen ritual, not a rule that the Moon imposes. Journal what you actually experience rather than forcing your mood to match a phase.",
      },
      {
        title: "Phase and sign",
        text: "Lunar phase describes the relationship between Sun and Moon; Moon sign describes the Moon’s zodiacal longitude. They are different measurements. Asteria shows both and calculates upcoming quarter phases in UTC.",
      },
    ],
  },
  {
    slug: "transits",
    title: "Understanding planetary transits",
    category: "Techniques",
    intro: "Compare today’s sky with the sky at your birth.",
    minutes: 5,
    sections: [
      {
        title: "A moving relationship",
        text: "A transit occurs when a current planetary position forms an aspect to a natal position. Slow planets can remain near an aspect for months; the Moon moves much more quickly. Asteria lists close current-to-natal aspects for a saved chart.",
      },
      {
        title: "Orb and exactness",
        text: "An orb is the permitted distance from an exact aspect angle. Tighter orbs produce fewer, more specific matches. Asteria uses a two-degree orb for personal transits and publishes its aspect definitions. A matching angle is a calculation; the interpretation is symbolic.",
      },
      {
        title: "Timing without determinism",
        text: "Use transit themes as journal prompts and opportunities to reflect. A transit does not establish that an event will occur. Decisions about health, safety, money, and relationships should be grounded in reliable information and your circumstances.",
      },
    ],
  },
  {
    slug: "synastry-and-compatibility",
    title: "Compatibility beyond a sun sign",
    category: "Relationships",
    intro: "A conversation between two charts, not a verdict.",
    minutes: 5,
    sections: [
      {
        title: "Synastry",
        text: "Synastry compares planets in two natal charts. Sun and Moon may describe identity and emotional styles; Mercury communication; Venus and Mars attraction and action. Many astrologers also consider angles and houses when both birth times are reliable.",
      },
      {
        title: "Difference and connection",
        text: "A square can describe productive tension; a trine can describe ease that still needs attention. No sign pairing guarantees a good or bad relationship. Asteria’s public sign comparison is an introductory element-based reflection, while two-chart synastry compares actual planetary longitudes.",
      },
      {
        title: "People before placements",
        text: "Consent, kindness, communication, and compatible life choices matter more than an astrological score. Asteria avoids assigning a numerical probability of relationship success. Use prompts to ask a better question of each other.",
      },
    ],
  },
  {
    slug: "traditional-and-modern",
    title: "Traditional & modern astrology",
    category: "Traditions",
    intro: "Learn the history behind different interpretive approaches.",
    minutes: 4,
    sections: [
      {
        title: "Traditional foundations",
        text: "Hellenistic, medieval, and early modern astrology emphasize the seven visible planets, rulership, dignity, houses, and timing techniques. Many practitioners distinguish sect and use whole-sign houses. These traditions are related but not identical.",
      },
      {
        title: "Modern approaches",
        text: "Modern Western astrology often adds Uranus, Neptune, and Pluto and emphasizes psychological themes. Some schools assign these planets modern rulerships; others keep traditional rulers while using the outer planets. Asteria labels both where applicable.",
      },
      {
        title: "Learn in context",
        text: "A technique’s meaning depends on its tradition. Avoid mixing a dasha, a progressed Moon, and a traditional profection as if they were interchangeable. The library introduces techniques; its calculation tools focus on tropical natal astrology.",
      },
    ],
  },
  {
    slug: "vedic-astrology",
    title: "An introduction to Vedic astrology",
    category: "Traditions",
    intro: "Jyotisha, nakshatras, and planetary periods.",
    minutes: 4,
    sections: [
      {
        title: "A distinct tradition",
        text: "Jyotisha is a diverse Indian astrological tradition with its own texts, lineages, and methods. Many practitioners use a sidereal zodiac, lunar mansions called nakshatras, divisional charts, and planetary period systems called dashas.",
      },
      {
        title: "Avoid simple translation",
        text: "Changing a Western chart’s sign labels is not a complete Vedic reading. Ayanamsha choice, divisional chart rules, and timing methods need specialist study. Asteria provides an educational introduction, not computed Vedic predictions.",
      },
    ],
  },
  {
    slug: "chinese-astrology",
    title: "Chinese astrology & the zodiac cycle",
    category: "Traditions",
    intro: "Animals, elements, and calendar-based traditions.",
    minutes: 4,
    sections: [
      {
        title: "More than a birth-year animal",
        text: "The familiar twelve-animal cycle is only one layer of Chinese calendrical traditions. Systems such as BaZi consider year, month, day, and hour pillars, the ten heavenly stems, twelve earthly branches, and five phases.",
      },
      {
        title: "Calendar boundaries",
        text: "A person born in January or February may belong to a different animal year than a simple Gregorian lookup suggests. Traditions differ in using Lunar New Year or the solar-term boundary. Asteria does not calculate BaZi or replace specialist calendar methods.",
      },
    ],
  },
  {
    slug: "dignities-and-rulership",
    title: "Planetary rulership & essential dignity",
    category: "Techniques",
    intro: "A traditional way to describe how a planet is situated.",
    minutes: 5,
    sections: [
      {
        title: "Domicile and detriment",
        text: "Traditional domiciles are Sun in Leo, Moon in Cancer, Mercury in Gemini and Virgo, Venus in Taurus and Libra, Mars in Aries and Scorpio, Jupiter in Sagittarius and Pisces, and Saturn in Capricorn and Aquarius. The opposite signs are traditionally called detriments.",
      },
      {
        title: "Exaltation and context",
        text: "Exaltation is another traditional dignity: Sun in Aries, Moon in Taurus, Mercury in Virgo, Venus in Pisces, Mars in Capricorn, Jupiter in Cancer, Saturn in Libra. Fall is the opposite sign. Dignity does not describe a person’s moral worth or determine an outcome.",
      },
      {
        title: "A fuller evaluation",
        text: "Traditional methods also consider triplicity, bounds, decans, sect, house position, and planetary condition. Asteria introduces the vocabulary but does not generate a full traditional dignity scoring system.",
      },
    ],
  },
  {
    slug: "nodes-and-eclipses",
    title: "Lunar nodes & eclipses",
    category: "Moon",
    intro: "Where the Moon’s orbital plane meets the ecliptic.",
    minutes: 4,
    sections: [
      {
        title: "The nodal axis",
        text: "The lunar nodes are calculated intersection points, not physical planets. The North Node marks the ascending crossing of the ecliptic and the South Node lies opposite. Mean and true node calculations differ; Asteria currently teaches nodes without plotting them.",
      },
      {
        title: "Eclipses",
        text: "Eclipses occur near the nodes when Sun, Earth, and Moon align. Solar eclipses happen near new moon; lunar eclipses near full moon. Astrological interpretations vary by tradition. An eclipse does not establish an inevitable personal crisis.",
      },
    ],
  },
  {
    slug: "progressions-and-returns",
    title: "Progressions, returns & profections",
    category: "Techniques",
    intro: "A guide to timing methods and what they actually calculate.",
    minutes: 5,
    sections: [
      {
        title: "Secondary progressions",
        text: "Secondary progressions symbolically advance the natal chart one day for each year of life. A progressed Moon is therefore different from the current transiting Moon. Different conventions for angles require careful study.",
      },
      {
        title: "Solar and lunar returns",
        text: "A return chart is cast for the moment a transiting body reaches its natal longitude. Location and exact time can affect its angles. A solar return is not simply a chart for midnight on a birthday.",
      },
      {
        title: "Annual profections",
        text: "Annual profections advance the activated whole-sign house by one for each year of age, returning to the first house at multiples of twelve. Traditional readings connect the activated sign to its ruler. Asteria explains these methods but does not currently calculate return or progression charts.",
      },
    ],
  },
  {
    slug: "ethical-astrology",
    title: "A thoughtful approach to astrology",
    category: "Foundations",
    intro: "Curiosity, agency, and the limits of interpretation.",
    minutes: 3,
    sections: [
      {
        title: "Symbolism and evidence",
        text: "Astrology has a long cultural history. Its claims about personality and future events are not scientifically established. Astronomical positions can be measured accurately while their astrological interpretation remains a symbolic practice.",
      },
      {
        title: "Protect agency",
        text: "Avoid absolute judgments, frightening predictions, and claims about another person’s private intentions. A chart cannot diagnose an illness or justify discrimination. Ask open questions and respect the right to disagree with an interpretation.",
      },
      {
        title: "Protect privacy",
        text: "Birth date, time, place, and personal reflections can be sensitive. Asteria calculates public charts in your browser, saves a chart only when you choose, and keeps account data private. Share another person’s details only with their permission.",
      },
    ],
  },
];
export const articles: Article[] = [
  ...foundations,
  ...planets.map((p) => ({
    slug: slugify(p.name),
    title: `${p.name}: ${p.theme.toLowerCase()}`,
    category: "Planets",
    intro: p.text.split(". ")[0] + ".",
    minutes: 3,
    sections: [
      { title: "The symbolism", text: p.text },
      {
        title: "Reading it in your chart",
        text: `Find ${p.name} in your chart’s placements. Read its sign as a style, its house as an area of life, and its aspects as connections to other symbolic functions. Consider the whole chart and your actual experience. This is an interpretive framework, not a prediction.`,
      },
    ],
  })),
  ...aspectDefinitions.map((a) => ({
    slug: slugify(a.name),
    title: `The ${a.name.toLowerCase()} aspect`,
    category: "Aspects",
    intro: `${a.angle}° · ${a.tone} · default orb ${a.orb}°`,
    minutes: 3,
    sections: [
      { title: "What it describes", text: a.text },
      {
        title: "How Asteria calculates it",
        text: `The shortest angular separation between two planetary longitudes is compared with ${a.angle}°. A match is included when the difference is at most ${a.orb}°. The remaining difference is the orb. Orbs are conventions and differ between schools; Asteria’s chart includes major and selected minor longitude aspects.`,
      },
    ],
  })),
  ...houseThemes.map((h, i) => ({
    slug: `house-${i + 1}`,
    title: `The ${i + 1}${i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"} house`,
    category: "Houses",
    intro: h,
    minutes: 3,
    sections: [
      {
        title: "A field of experience",
        text: `The ${i + 1} house is traditionally associated with ${h.toLowerCase()}. Planets placed here bring their symbolism into this field of experience. An empty house is not an absent life area: its sign and ruler still form part of the chart.`,
      },
      {
        title: "Whole-sign context",
        text: "Asteria uses whole-sign houses, beginning with the entire sign containing the Ascendant. Reliable birth time and location are necessary. Different house systems can produce different placements. Houses are omitted if the birth time is unknown or the location is too close to a geographic pole.",
      },
    ],
  })),
];
export const categories = [
  "All",
  "Foundations",
  "Planets",
  "Houses",
  "Aspects",
  "Moon",
  "Techniques",
  "Traditions",
  "Relationships",
];
export function signAt(longitude: number) {
  return signs[Math.floor((((longitude % 360) + 360) % 360) / 30)];
}
export const planetKeywords: Record<string, string> = {
  Sun: "purpose",
  Moon: "emotional needs",
  Mercury: "communication",
  Venus: "connection and values",
  Mars: "assertion",
  Jupiter: "growth",
  Saturn: "responsibility",
  Uranus: "change",
  Neptune: "imagination",
  Pluto: "transformation",
};
