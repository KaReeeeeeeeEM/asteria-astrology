import { numerology, numberMeanings, reduceNumber } from "./explorations";

export type NumberProfile = {
  overview: string;
  strengths: string;
  growth: string;
  relationships: string;
  work: string;
  practice: string;
  birthday: string;
  question: string;
};

// Original Asteria editorial interpretations of the existing symbolic archetypes.
export const numberProfiles: Record<number, NumberProfile> = {
  1: {
    overview:
      "One explores how a person develops a voice of their own. In a life-path reading, independence is a long-running theme: choosing a direction, taking responsibility for a decision, and beginning before every detail is certain. The mature expression of this symbol is initiative that makes room for other people. It is useful to distinguish self-trust from the need to win, because both can look like confidence from the outside.",
    strengths:
      "Initiative can turn an unanswered question into a first attempt. This archetype is a useful lens for noticing courage, originality and a willingness to accept responsibility. Look for actual examples of starting something rather than assuming that every person with this number enjoys leadership.",
    growth:
      "When independence becomes defensive, asking for help can feel like failure. A reader can explore the difference between leading and controlling, or between healthy competition and constant comparison. Growth may involve sharing ownership while keeping a clear personal direction.",
    relationships:
      "Ask how autonomy and closeness coexist. Someone may appreciate direct communication and time for personal projects, yet still want reassurance and companionship. A useful conversation identifies where independence supports a relationship and where it prevents repair after a disagreement.",
    work: "Possible expressions include initiating projects, developing an original approach or taking ownership of a neglected problem. The number cannot choose a profession. Explore the person’s skills, constraints and interests, then ask which responsibilities allow them to contribute with appropriate freedom.",
    practice:
      "Choose one small decision you have been postponing. State the reason for your choice, take the first reversible step, and invite useful feedback. Notice whether acting from your own values feels different from acting to prove yourself.",
    birthday:
      "As a birthday talent, One emphasizes the way you get things moving. You might contribute a starting idea or make a difficult first call. This is a specific resource to investigate, rather than a claim that your entire personality must be forceful or independent.",
    question:
      "When do I trust my own direction, and when am I trying to prove that I do not need anyone?",
  },
  2: {
    overview:
      "Two explores the meeting point between people: listening, negotiation and the ability to notice what a situation needs. As a life-path theme, it invites a sustained study of cooperation. Cooperation does not require agreement at any cost. A mature reading includes the ability to remain kind while naming a difference, and to recognize that personal needs belong in the conversation alongside everyone else’s.",
    strengths:
      "Patient listening, sensitivity to atmosphere and thoughtful coordination can help a group work together. Ask for examples of resolving misunderstandings or bringing different perspectives into a shared plan. Sensitivity is most useful when it is checked against what people actually say.",
    growth:
      "Avoid treating conflict as proof that a relationship is broken. Excessive accommodation can build resentment or make decisions depend on everyone’s approval. Explore how to express a preference before frustration accumulates, and how to tolerate a respectful disagreement.",
    relationships:
      "The discussion often centers on reciprocity: who listens, who decides and who makes repairs? Ask what feeling supported looks like in concrete behavior. It is also worth distinguishing empathy from guessing someone else’s emotions without checking.",
    work: "Collaborative projects, mediation, attentive service and careful coordination can express this theme. Ask whether the person receives credit for the often-invisible work of keeping people connected. A sustainable role includes clear responsibilities and the ability to disagree.",
    practice:
      "In one conversation, ask a clarifying question and then state your own preference in a complete sentence. Do not apologize for having a preference. Review whether the exchange became more honest without becoming less considerate.",
    birthday:
      "As a birthday talent, Two describes a possible skill in noticing nuance and helping people connect. Look for a concrete example of useful listening. Do not confuse quiet participation with a lack of ambition, or assume that the person must always play peacemaker.",
    question:
      "Where does my wish for harmony support honesty, and where does it silence me?",
  },
  3: {
    overview:
      "Three explores expression: giving a feeling, idea or experience a form that others can encounter. The life-path theme may be approached through language, art, humor or the everyday ability to make an interaction feel alive. Expression is more than being entertaining. It includes learning what you want to say, finding a suitable audience and remaining present when your work is received differently than you hoped.",
    strengths:
      "Imagination and an ability to find an engaging angle can open a conversation. Notice where play helps someone learn or communicate. A reader should ask which medium feels natural, because expression can be quiet, visual or practical as well as verbal.",
    growth:
      "A flood of ideas can become avoidance of finishing. Humor can also hide disappointment or make a serious need difficult to hear. Explore the difference between experimenting freely and changing direction whenever a project becomes vulnerable or requires sustained effort.",
    relationships:
      "Shared laughter and creative exchange can nourish connection. Also ask how difficult feelings are expressed when a light tone is not enough. Being appreciated for your performance is different from feeling known when you have nothing polished to offer.",
    work: "Communication, teaching, design or any task requiring an imaginative explanation may offer useful examples. Focus on demonstrated abilities rather than naming a destined career. A simple editing or completion routine can make creative contributions easier to share consistently.",
    practice:
      "Make a small piece of work with a clear ending: a paragraph, sketch, recording or explanation. Finish it before starting another version. Share it with one suitable person and ask what they understood, rather than whether they liked you.",
    birthday:
      "As a birthday talent, Three can point to an expressive contribution: finding the words, lifting the atmosphere or helping an idea become memorable. Ask how that talent serves the wider life-path theme, rather than treating visibility or popularity as the goal.",
    question:
      "What am I ready to express honestly, even if it is less polished or entertaining?",
  },
  4: {
    overview:
      "Four is the symbol of foundations: the repeated actions that turn an intention into something dependable. In a life-path reading, it invites questions about commitment, craft and the meaning of stability. A foundation is useful because it supports life, not because it never changes. The central tension is learning how to build something durable while allowing methods, expectations and responsibilities to adapt as circumstances change.",
    strengths:
      "Reliability often appears in ordinary actions: arriving prepared, checking details, keeping promises and improving a process. These qualities can create trust that dramatic gestures cannot. Ask which kinds of structure genuinely help the person and which are inherited habits they no longer need.",
    growth:
      "Order can become rigidity when an unexpected change feels like a threat to worth or safety. There may be a temptation to carry everything alone, criticize mistakes or confuse rest with laziness. A helpful reading explores flexibility as part of competence, rather than as a failure of discipline.",
    relationships:
      "Practical care may be expressed through showing up, remembering commitments and solving everyday problems. Ask whether others recognize that care, and whether emotional needs are spoken as clearly as logistical needs. Reliability and warmth can support each other; a relationship does not have to become a list of duties.",
    work: "The theme can appear in building systems, developing a craft, maintaining resources or making an ambitious idea workable. Discuss what a sustainable pace looks like. The number does not promise security or require a conventional career; experimentation can also benefit from patient preparation.",
    practice:
      "Pick one routine that supports a meaningful goal. Keep it small enough to repeat for a week, and deliberately include a flexible day. Record what made the routine useful. The aim is a structure that helps you live, rather than a rule you must obey to feel worthy.",
    birthday:
      "As a birthday talent, Four highlights practical follow-through: organizing the next step, spotting a missing detail or making a promise dependable. With a Four life path as well, the theme is repeated across two roles. That gives you two angles to explore, not proof that you are twice as rigid or twice as capable.",
    question:
      "Which structures support the life I want, and which have become obligations without a purpose?",
  },
  5: {
    overview:
      "Five explores freedom through experience. As a life-path theme, it raises questions about change, curiosity and the ability to move between different environments. Freedom is not only the absence of restrictions; it is also the capacity to choose thoughtfully and remain accountable for the consequences. This reading becomes richer when it considers both the excitement of an open door and the skills that make exploring sustainable.",
    strengths:
      "Adaptability can help when plans change or a new perspective is needed. Curiosity may connect experiences that initially seem unrelated. Ask where learning through direct experience has been valuable, and which changes were chosen rather than simply endured.",
    growth:
      "Constant novelty can make it difficult to recognize when persistence would be rewarding. Restlessness may also be a signal of unmet needs rather than a demand to abandon everything. Explore which commitments protect freedom and which genuinely limit it.",
    relationships:
      "Discuss how variety, honesty and personal space fit into the relationship. Clear agreements make freedom easier to negotiate. A dislike of routine should not be used as an excuse to disregard another person’s need for consistency or consent.",
    work: "Changing environments, experimentation and learning new skills can provide examples of this theme. Ask what anchors the person when circumstances move quickly. An adaptable career still benefits from reliable agreements, financial planning and an honest appraisal of skills.",
    practice:
      "Try one new experience within a clearly defined limit of time or resources. Keep an existing commitment while doing it. Afterwards, ask whether the experience expanded your perspective or merely distracted you from a conversation you need to have.",
    birthday:
      "As a birthday talent, Five suggests a possible knack for adapting, discovering alternatives or bringing fresh experience into a problem. Ask for examples of useful flexibility. This talent can serve a steady life path without requiring a constantly changing lifestyle.",
    question:
      "What kind of freedom am I seeking, and what am I willing to take responsibility for?",
  },
  6: {
    overview:
      "Six explores care, responsibility and the environments in which people feel supported. As a life-path theme, it asks how you contribute to a home, community or relationship without losing a separate self. Care can be practical, creative or emotional. The mature expression includes both generosity and the ability to let another person make their own decisions, even when you would choose differently.",
    strengths:
      "Attention to comfort, fairness and everyday needs can turn good intentions into usable support. Ask where the person creates an atmosphere in which others can participate. Care may appear in arranging a space or keeping an agreement, not only in overt nurturing.",
    growth:
      "Responsibility can become over-responsibility: managing everyone’s feelings, correcting their choices or feeling guilty when you rest. A reader can ask what belongs to the person and what belongs to someone else. Receiving support is part of a reciprocal relationship.",
    relationships:
      "Explore how affection is shown and how boundaries are negotiated. Ask whether help is invited before it is offered. A person can care deeply without becoming indispensable, and being needed is not the same as being understood or loved.",
    work: "Service, teaching, design and the improvement of shared environments may provide examples. Ask whether standards are humane as well as high. A sustainable contribution requires appropriate resources, fair expectations and space to develop interests beyond caring for others.",
    practice:
      "Offer one specific form of help and ask whether it is wanted. Set a clear limit before you begin. Then do something restorative for yourself without framing it as a reward you must earn through service.",
    birthday:
      "As a birthday talent, Six can describe an ability to notice what would make an environment more supportive or beautiful. Explore how to offer that skill with permission. It does not assign a family role or require self-sacrifice.",
    question:
      "Where am I choosing to care, and where am I taking responsibility that was never mine?",
  },
  7: {
    overview:
      "Seven explores the search for understanding. In a life-path reading, it can be approached through study, observation, solitude and the wish to look beneath an easy explanation. This is not a claim that someone is automatically wise or psychic. It is an invitation to examine how they ask questions, evaluate evidence and make room for experiences that cannot immediately be put into words.",
    strengths:
      "Concentration and patient investigation can reveal details that a hurried answer misses. Ask what the person enjoys studying and how they decide something is credible. Reflection is useful when it deepens engagement with life rather than replacing it.",
    growth:
      "Analysis can become a barrier to action or intimacy when certainty is required before taking any risk. Solitude may replenish someone, but withdrawal can leave needs unspoken. Explore how to recognize the point at which more research will no longer change the decision.",
    relationships:
      "Discuss how private space and emotional availability can coexist. A person may need time to process before speaking, while a partner needs a clear indication that the conversation will resume. Curiosity about another person is more useful than assuming you have analyzed them correctly.",
    work: "Research, troubleshooting, reflective practice and careful assessment can provide examples. Ask how discoveries are communicated to people with different backgrounds. Expertise becomes more valuable when someone can explain their reasoning and accept a correction.",
    practice:
      "Choose a question you care about. Compare two credible sources, note what remains uncertain, and write a short explanation in plain language. Then take one appropriate action instead of waiting for a perfectly complete answer.",
    birthday:
      "As a birthday talent, Seven suggests a possible resource in observation and thoughtful questioning. Ask where taking time to investigate has improved an outcome. It can complement an expressive or collaborative life path without defining the person as withdrawn.",
    question:
      "When does reflection help me participate, and when does it become a way to stay outside the experience?",
  },
  8: {
    overview:
      "Eight explores the responsible use of influence and resources. In a life-path reading, the central questions concern effectiveness, authority and what success means to the person. This symbol is not a promise of wealth. It offers a way to discuss how ambitions become decisions, how power is shared and whether achievements remain connected to the values that made them worth pursuing.",
    strengths:
      "Resourcefulness can bring people, time and practical requirements into a workable plan. Ask for examples of organizing something fairly or making a difficult decision with accountability. Authority is stronger when its reasons can be explained.",
    growth:
      "Achievement can become an endless test of worth. Control, comparison or a narrow focus on measurable results may crowd out other needs. Explore how to distinguish a meaningful goal from a goal maintained mainly for status or approval.",
    relationships:
      "Discuss shared decisions, expectations and the distribution of responsibility. Ask how vulnerability is expressed when competence is a familiar role. A partnership is not a performance review, and resources do not replace mutual respect or emotional attention.",
    work: "Management, negotiation and stewardship can provide examples, but ambition appears in many kinds of work. Ask which outcomes matter and how they will be pursued. Include the real constraints, costs and responsibilities of a plan rather than promising a favorable result.",
    practice:
      "Define one goal in terms of both outcome and values. Identify who is affected by it, what resources it needs and which limits you will respect. Review progress without reducing your self-worth to the result.",
    birthday:
      "As a birthday talent, Eight can point to skill in organizing resources or carrying responsibility. Ask where that skill is demonstrated and where support is needed. It does not predict income, status or business success.",
    question:
      "What would success look like if it included my values, relationships and limits?",
  },
  9: {
    overview:
      "Nine explores perspective, compassion and the process of completing a chapter. As a life-path theme, it asks how personal experience can broaden concern for others without making every problem yours to solve. Completion is not always a dramatic ending. It can mean acknowledging what an experience taught you, making a thoughtful repair or releasing an expectation that no longer fits.",
    strengths:
      "A wide perspective can help someone see connections beyond their immediate situation. Ask where empathy has led to practical action, creative expression or a more generous interpretation. Compassion becomes useful when it can work at a realistic scale.",
    growth:
      "Idealism can turn into disappointment when real people fail to match an imagined standard. Giving without limits may also create exhaustion or unspoken expectations. Explore how to care about a large issue while making a contribution that is genuinely manageable.",
    relationships:
      "Discuss forgiveness, endings and the difference between accepting someone and excusing every behavior. A broad concern for others should still include the needs of close relationships. Letting go may mean changing an expectation rather than leaving a person.",
    work: "Service, creative communication and work with a wider social purpose may provide examples. Ask which part of a large ambition is within the person’s influence. A smaller sustained contribution can be more useful than a heroic role that cannot last.",
    practice:
      "Identify one unfinished commitment. Complete it, renegotiate it or acknowledge that it cannot continue. Record what you learned and what you want to carry forward. Do not force a major ending merely because this symbol mentions completion.",
    birthday:
      "As a birthday talent, Nine suggests a possible ability to see a wider context or communicate with compassion. Ask how that perspective helps with a concrete situation. It is a resource to practice, not an obligation to rescue everyone.",
    question:
      "What is ready to be completed, and what lesson can I keep without carrying the whole burden?",
  },
  11: {
    overview:
      "Eleven is retained here as a master number and read alongside its base number, Two. Its symbolic emphasis is inspiration that can be communicated with sensitivity. In a life-path discussion, ask how an impression becomes an understandable idea and how the person tests it in everyday experience. The label does not establish supernatural abilities or make someone more advanced than people with other numbers.",
    strengths:
      "A vivid inner response may become a useful image, explanation or creative insight. Paired with the cooperative theme of Two, the emphasis is on making that insight accessible. Ask where inspiration has actually helped someone else understand a situation.",
    growth:
      "Strong impressions are not automatically accurate. Explore how to distinguish an interpretation from a fact, and how to remain open to feedback. Pressure to have a special purpose can make ordinary learning feel insufficient; there is no requirement to perform exceptional sensitivity.",
    relationships:
      "Sensitivity needs clear communication and boundaries. Ask whether a feeling has been checked with the other person before it becomes a story about them. Shared reality matters as much as a compelling impression.",
    work: "Teaching, communication, art or thoughtful facilitation can provide examples of translating inspiration into something useful. Start with skills that can be practiced and assessed. A master-number label does not substitute for training or experience.",
    practice:
      "Write an intuitive impression in one column and the observations supporting it in another. List an alternative explanation. If appropriate, ask a neutral question instead of announcing a conclusion. Notice what changes when you leave room to be mistaken.",
    birthday:
      "As a birthday talent, Eleven is a possible lens for inspired expression supported by the listening qualities of Two. Discuss concrete examples without treating an impression as a guaranteed message or a diagnosis of someone else’s experience.",
    question:
      "How can I communicate an inspiration clearly while staying open to evidence and correction?",
  },
  22: {
    overview:
      "Twenty-two is retained as a master number and read alongside its base number, Four. Its symbolic theme is the relationship between a large vision and the everyday work needed to make it usable. A life-path reading can ask how ambition is translated into shared plans, realistic stages and durable systems. The number does not require a monumental achievement or guarantee that a project will succeed.",
    strengths:
      "Seeing both an overall plan and its practical requirements can help a group move from aspiration to action. Ask where the person has coordinated people or built something that others can use. Credit belongs to the team and the process as well as the vision.",
    growth:
      "A large imagined outcome can create paralysis or a reluctance to begin at a modest scale. There may also be a temptation to control every detail. Explore which part can be tested now and which responsibilities should be shared.",
    relationships:
      "Discuss whether shared goals leave room for different preferences and individual needs. Building a future together requires ongoing consent, not just agreement with a grand plan. Practical care should include rest and time that has no productive purpose.",
    work: "Planning, infrastructure and collaborative problem-solving can express this theme at many scales. Ask whether the vision serves the people affected by it. Reliable maintenance and feedback are as valuable as launching something impressive.",
    practice:
      "Break one ambitious idea into three stages. Make the first stage small enough to test, identify a collaborator and define what useful feedback would look like. Adjust the plan after the test instead of defending it because it was your original vision.",
    birthday:
      "As a birthday talent, Twenty-two can highlight practical imagination: turning an idea into a structure others can participate in. Read it with Four’s follow-through. It does not mean the person must carry a large project or family alone.",
    question:
      "What is the smallest useful version of my vision, and who should help shape it?",
  },
  33: {
    overview:
      "Thirty-three is retained as a master number and read alongside its base number, Six. Its symbolic theme is compassionate guidance made practical. A life-path discussion can explore teaching, creative care and the ability to support learning without taking ownership of another person’s life. This is not a rank of spiritual achievement, and the number never requires limitless giving or a role as someone’s rescuer.",
    strengths:
      "Patient explanation and humane standards can create a supportive environment for growth. Ask where the person helps others develop their own capabilities. The strongest guidance leaves someone more able to act independently, rather than more dependent on the guide.",
    growth:
      "A wish to help can become perfectionism, guilt or difficulty receiving care. Explore whether responsibility is freely chosen and whether the person has enough support. Being compassionate includes acknowledging limits and allowing mistakes.",
    relationships:
      "Discuss the balance between supporting someone and directing them. Ask what mutual care looks like when one person is usually the helper. An equal relationship makes room for both people’s needs, preferences and separate development.",
    work: "Teaching, service and creative work that helps others participate can provide examples. Ask about actual qualifications, resources and responsibilities. Compassion is a valuable intention, but skill and appropriate limits determine whether help is useful.",
    practice:
      "Teach one small skill by explaining, demonstrating and then allowing the learner to try. Ask for feedback without taking over. Afterwards, identify one way you also need support and make a clear request for it.",
    birthday:
      "Thirty-three cannot occur as a reduced day-of-month in this calculator, since calendar days end at 31. Its life-path meaning should not be assigned to a birthday result. As an archetype, read it with Six rather than as a superior form of care.",
    question:
      "Does my support help another person gain agency, and do I allow myself the same care?",
  },
};

export const personalYears: Record<
  number,
  {
    title: string;
    overview: string;
    focus: string;
    caution: string;
    practice: string;
  }
> = {
  1: {
    title: "Begin with intention",
    overview:
      "The first position of the nine-year cycle is read as a theme of initiative. Use it to consider what you want to start, what you are choosing for yourself and which first step is actually within reach. A new chapter may be a new approach to an existing situation; it does not have to mean abandoning the life you already have.",
    focus:
      "Choose one priority, define a modest first milestone and ask what support will help you begin. Make room for trial and revision rather than expecting a finished identity at the start.",
    caution:
      "A symbolic beginning is not evidence that every risk will work out. Avoid rushing commitments simply to feel that something new is happening.",
    practice:
      "Write a one-page intention with a first action, a review date and a reason that matters to you.",
  },
  2: {
    title: "Develop through cooperation",
    overview:
      "The second position emphasizes relationship, patience and the development of what has already begun. Consider where feedback, collaboration or careful listening could improve your next step. A quieter pace can still contain substantial progress when it allows a plan to become better understood.",
    focus:
      "Clarify expectations with someone involved in your plans. Notice the difference between waiting usefully and postponing a necessary conversation.",
    caution:
      "Patience does not require passivity. Do not wait for universal approval before expressing a need or taking a reasonable action.",
    practice:
      "Choose one collaboration and agree on roles, communication and the next review point.",
  },
  3: {
    title: "Give your ideas a voice",
    overview:
      "The third position is read through expression and exchange. Ask what wants a clearer form: a conversation, a creative project or an explanation of your goals. This theme can invite experimentation, but it also asks which ideas are ready to move from private possibility into something another person can encounter.",
    focus:
      "Share work with an appropriate audience and listen to what they understand. Let enjoyment support effort rather than replacing it.",
    caution:
      "An expressive year does not predict popularity. Avoid promising more than you can complete or using a cheerful tone to bypass difficult feelings.",
    practice:
      "Finish and share one small piece of work, then note a useful improvement for the next version.",
  },
  4: {
    title: "Strengthen the foundations",
    overview:
      "The fourth position emphasizes maintenance, structure and the habits that make a goal sustainable. Consider which foundations need attention: time, practical skills, agreements or the way you organize everyday responsibilities. This is a lens for purposeful effort, not a prediction that the year will be difficult.",
    focus:
      "Improve one recurring process and make responsibilities explicit. A useful structure should reduce strain rather than create a new standard of perfection.",
    caution:
      "Do not measure progress only by how busy you are. Leave flexibility for changing circumstances and treat rest as part of a workable plan.",
    practice:
      "Review a weekly routine, remove an unnecessary task and make one essential task easier to repeat.",
  },
  5: {
    title: "Explore change thoughtfully",
    overview:
      "The fifth position is read through movement, variety and experimentation. Ask what new information or experience might broaden your choices. A change can be tested at a small scale before it becomes a major commitment; curiosity does not require constant upheaval.",
    focus:
      "Try an alternative approach while keeping the agreements that matter. Notice whether a change solves the actual problem or simply makes it feel temporarily different.",
    caution:
      "This theme does not require travel, a breakup or a sudden career move. Consider real resources and consequences before making a large change.",
    practice:
      "Design a reversible experiment, set its limits and record what you learned.",
  },
  6: {
    title: "Care with clear boundaries",
    overview:
      "The sixth position emphasizes responsibility, relationships and shared environments. Consider what needs care and who should participate in providing it. This theme can be used to review the balance between giving, receiving and maintaining interests that belong to you alone.",
    focus:
      "Discuss practical needs openly, improve an environment you share and ask for help where responsibilities have become uneven.",
    caution:
      "A care theme does not predict marriage, pregnancy or family events. Do not turn a symbolic reading into a demand to accept more responsibility.",
    practice:
      "Map one shared responsibility and renegotiate who does what, with everyone’s agreement.",
  },
  7: {
    title: "Study, reflect and reassess",
    overview:
      "The seventh position is read through investigation and inner review. Ask which assumptions deserve a closer look and which skills you want to deepen. Reflection is valuable when it leads to clearer understanding, not when it becomes an endless requirement for certainty before participating in life.",
    focus:
      "Make time for focused learning and compare your ideas with actual experience. Explain what you are discovering to someone who can offer thoughtful feedback.",
    caution:
      "This is not a prediction of isolation or a reason to withdraw from support. Keep useful relationships and ordinary commitments active.",
    practice:
      "Choose a topic, keep a short learning journal and apply one insight to a real situation.",
  },
  8: {
    title: "Review results and responsibility",
    overview:
      "The eighth position emphasizes effectiveness, resources and the consequences of decisions. Ask what your current plans are producing, who is affected and whether your definition of success still fits. Use the theme to examine stewardship rather than to assume financial reward.",
    focus:
      "Review goals, agreements and practical resources. Measure outcomes alongside fairness, sustainability and the values you want your work to express.",
    caution:
      "The number does not predict a promotion, profit or investment outcome. Use ordinary evidence and qualified advice for consequential financial decisions.",
    practice:
      "Evaluate one goal with both a measurable outcome and a clear statement of the values you will preserve.",
  },
  9: {
    title: "Complete and make room",
    overview:
      "The ninth position emphasizes integration and completion. Ask what has reached a natural conclusion and what an unfinished experience still needs from you. Making room may mean finishing a task, acknowledging a lesson or releasing an unrealistic expectation rather than making a dramatic ending.",
    focus:
      "Complete what is manageable, repair an agreement where appropriate and identify what you want to carry into a new cycle.",
    caution:
      "This does not mean a loss is inevitable or that a relationship must end. Let real circumstances determine decisions; symbolic timing should not force them.",
    practice:
      "List three open loops, complete or renegotiate one, and record what the experience taught you.",
  },
};

const lifePathDevelopment: Record<number, string> = {
  1: "One way to study this theme is to compare three kinds of initiative: starting alone, inviting others into an idea, and helping another person take the lead. Each asks for a different form of confidence. A person may be comfortable with the first and still be learning the others. Ask which form is relevant now, then look for a small opportunity to practice it. Development is not a fixed sequence tied to a particular age.",
  2: "Study cooperation across different situations: listening to someone you agree with, naming a difference with someone you value, and making a decision when agreement is incomplete. These require different skills. Someone may be attentive and kind yet still be learning to state a boundary. Ask which skill would make the current relationship more honest. The goal is not to become endlessly agreeable, but to participate without erasing either person.",
  3: "Explore expression in stages: discovering an idea, shaping it for an audience, finishing the work and responding to feedback. Enjoyment of the first stage does not automatically make the others easy. Ask where the person currently gets stuck and which practical support would help. A reader can discuss an unfinished project rather than make a broad claim about creativity. Quiet, careful expression belongs to this theme as much as public performance.",
  4: "Explore building as a living process: choosing a foundation, maintaining it, checking whether it still serves its purpose and changing it when necessary. A useful structure can outlive the situation it was designed for. Ask which commitment deserves renewed effort and which needs a different method. Developing this theme means becoming more discerning about what to preserve, not simply becoming better at enduring. Stability can include the confidence to revise a plan.",
  5: "Study the difference between receiving a change, choosing a change and integrating what a change teaches. Adaptability may be strong in one setting and difficult in another. Ask what was learned from a recent experiment and whether that learning altered a real decision. The ability to stay with a useful experience matters as much as the ability to seek one. Freedom develops through thoughtful choices, not a prescribed number of adventures.",
  6: "Explore care through three questions: what is needed, what is wanted, and what can I sustainably offer? These answers may differ. Someone can be good at noticing a need while still learning to ask permission or share responsibility. Discuss a specific situation and compare intentions with the effect of the help. Developing this theme includes receiving care and accepting that another person may choose a different way to live.",
  7: "Study how a question moves through observation, research, uncertainty and a provisional conclusion. A person may enjoy gathering information yet find it difficult to act without certainty. Another may trust an explanation too quickly because it feels elegant. Ask which stage needs attention in the current situation. Developing understanding includes explaining your reasoning, hearing a challenge and revising a view. It does not require withdrawing from ordinary experience to become knowledgeable.",
  8: "Explore influence at different scales: managing your own commitments, coordinating a shared project and making decisions that affect people with less power. Responsibility changes as the scale changes. Ask how feedback reaches the decision-maker and which consequences are easy to overlook. Developing this theme includes learning to share credit, acknowledge a mistake and measure success in more than one way. It is not an inevitable climb toward status or wealth.",
  9: "Study completion as a process of recognizing, repairing where possible, learning and releasing. These stages need not occur in a neat order. Ask whether something truly needs to end or whether the expectation attached to it needs to change. Compassion can widen while a commitment becomes smaller and more realistic. Developing this theme means choosing what to carry forward with care, rather than assuming that generosity requires keeping every burden indefinitely.",
  11: "Explore inspiration through a practical sequence: notice an impression, describe it without exaggeration, compare it with observations and communicate it in a way another person can assess. Someone may feel the first stage strongly while still learning the others. Ask which ordinary skill would help the inspiration become useful. Read this alongside Two’s listening and cooperation. Development depends on practice and feedback, not on proving that an inner impression has special authority.",
  22: "Explore a vision through planning, a small test, feedback, collaboration and maintenance. An ambitious idea can feel complete in imagination while its practical requirements remain unclear. Ask what has actually been tested and who has had a voice in shaping it. Read this alongside Four’s reliability and adaptability. Development can mean reducing the scale of a plan so that it becomes genuinely useful; a smaller outcome is not a failure of the number.",
  33: "Explore guidance through listening, asking permission, offering a suitable explanation and allowing the learner to act independently. A wish to help may be sincere even when the method needs improvement. Ask what feedback would show that support is useful and whether the helper has support too. Read this alongside Six’s care and boundaries. Development is measured through a person’s growing agency, not through how indispensable the guide becomes or how much they sacrifice.",
};

export function buildNumerologyReading(result: ReturnType<typeof numerology>) {
  const life = numberProfiles[result.lifePath];
  const birthday = numberProfiles[result.birthday];
  const cycle = personalYears[result.personalYear];
  if (!life || !birthday || !cycle)
    throw new Error("Unsupported numerology result");
  const master =
    result.lifePath > 9 ? reduceNumber(result.lifePath, false) : null;
  const sections = [
    {
      label: "Life path",
      number: result.lifePath,
      title: numberMeanings[result.lifePath].title,
      introduction:
        "Read this as a recurring theme, not a fixed personality or a promised destiny.",
      paragraphs: [life.overview],
      details: [
        { title: "Strengths to recognize", text: life.strengths },
        { title: "Challenges and growth", text: life.growth },
        {
          title: "Developing this theme over time",
          text: lifePathDevelopment[result.lifePath],
        },
        { title: "Relationships and communication", text: life.relationships },
        { title: "Work, purpose and contribution", text: life.work },
        { title: "A practice for this theme", text: life.practice },
        { title: "A question for your reading", text: life.question },
        ...(master
          ? [
              {
                title: `Master number ${result.lifePath} and its base ${master}`,
                text: `This convention retains ${result.lifePath}; it also invites you to study ${master}, ${numberMeanings[master].title.toLowerCase()}. ${numberProfiles[master].overview} A master number adds a symbolic layer; it is not a ranking of worth or a guarantee of unusual abilities.`,
              },
            ]
          : []),
      ],
    },
    {
      label: "Birthday talent",
      number: result.birthday,
      title: numberMeanings[result.birthday].title,
      introduction:
        "The reduced day of birth describes a possible resource you can bring to the wider theme.",
      paragraphs: [
        birthday.birthday,
        `The life-path theme asks a broad question about your approach to life; the birthday position asks how you might contribute in a specific situation. Start with something observable: a skill you have practiced, a task people ask you to help with, or a way you make a shared project easier. A number does not establish a skill without experience, and a talent can be developed rather than treated as something you must already possess.`,
      ],
      details: [
        { title: "Recognize the talent in action", text: birthday.strengths },
        { title: "When the talent becomes overused", text: birthday.growth },
        { title: "Practice deliberately", text: birthday.practice },
      ],
    },
    {
      label: `Personal year · ${result.year}`,
      number: result.personalYear,
      title: cycle.title,
      introduction: `A changing focus for January 1–December 31, ${result.year}, using Asteria’s calendar-year convention.`,
      paragraphs: [cycle.overview],
      details: [
        { title: "Where to put your attention", text: cycle.focus },
        { title: "What this theme does not promise", text: cycle.caution },
        { title: "A practical exercise", text: cycle.practice },
        {
          title: "Understand the nine-year cycle",
          text: "The cycle moves through initiation (1), cooperation (2), expression (3), foundations (4), exploration (5), care (6), reflection (7), responsibility (8) and completion (9). These are symbolic themes, not a schedule of inevitable events. Asteria uses the UTC calendar year; some readers instead change the personal year at the birthday.",
        },
      ],
    },
  ];
  const repeated = result.lifePath === result.birthday;
  const synthesis = [
    `Your life path ${result.lifePath} introduces ${numberMeanings[result.lifePath].title.toLowerCase()} as the broad theme. Your birthday talent ${result.birthday} contributes ${numberMeanings[result.birthday].title.toLowerCase()} as a possible resource. ${repeated ? "Because these values repeat, explore one theme in two roles: the long-running lesson and the specific skill. Repetition does not measure how strongly a trait must appear." : "Because these values differ, ask how the birthday talent might support the life-path theme. Difference is not automatically conflict; the same situation can benefit from more than one approach."}`,
    `In ${result.year}, personal year ${result.personalYear} adds the focus “${cycle.title.toLowerCase()}.” Use this as a question about timing and attention: how could you apply the birthday resource to the life-path theme while exploring this year’s focus? Start with the actual situation you want to understand, rather than assuming the numbers describe everything about you.`,
    `A possible opening: “We can explore ${numberMeanings[result.lifePath].title.toLowerCase()} as a broad theme, with ${numberMeanings[result.birthday].title.toLowerCase()} as a resource. This year’s lens is ${cycle.title.toLowerCase()}. Which part feels relevant to your question, and which part does not?” This is a conversation starter, not a claim about someone’s private history.`,
  ];
  return { sections, synthesis };
}

export function numerologyReportMarkdown(
  date: string,
  result: ReturnType<typeof numerology>,
  notes: string,
  t: (text: string) => string = (text) => text,
) {
  const report = buildNumerologyReading(result);
  return [
    `# ${t("Asteria numerology reading")}`,
    `${t("Birth date")}: ${date}\n${t("Calendar year")}: ${result.year}`,
    ...report.sections.map(
      (s) =>
        `## ${t(s.label)}: ${s.number} — ${t(s.title)}\n\n${t(s.introduction)}\n\n${s.paragraphs.map(t).join("\n\n")}\n\n${s.details.map((d) => `### ${t(d.title)}\n\n${t(d.text)}`).join("\n\n")}`,
    ),
    `## ${t("Read your numbers together")}\n\n${report.synthesis.map(t).join("\n\n")}`,
    `## ${t("Calculation")}\n\n${t(result.steps)}`,
    ...(notes.trim()
      ? [`## ${t("Your session notes")}\n\n${notes.trim()}`]
      : []),
    `## ${t("Method and references")}\n\n${t("Original Asteria editorial interpretations; symbolic reflection, not scientifically validated predictions. Life path preserves 11/22/33; personal year reduces to 1–9 and uses the calendar year.")}\n\nhttps://www.numerology.com/articles/your-numerology-chart/life-path-number-calculator/\nhttps://www.worldnumerology.com/hans-decoz-school-of-numerology/numerology-course-curriculum.html`,
  ].join("\n\n");
}
