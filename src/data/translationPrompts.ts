import { lessons } from "./lessons";
import type { TranslationPrompt } from "../types";

const extraPrompts: TranslationPrompt[] = [
  {
    id: "extra-family-dinner",
    english: "Tonight I will eat dinner with my family and then I will read a book.",
    punjabi: "Aj raat mein apni family naal raat da khana khaun ga ty phir kitab parrun ga.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-morning-routine",
    english: "I wake up early, brush my teeth, take a shower, and go to work at seven o'clock.",
    punjabi: "Mein subha jldi uthda aa, apnay dand saaf krda aa, nanda aa, ty sat wajay kam ty janda aa.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-like-books",
    english: "I like reading books, but my brother likes watching movies.",
    punjabi: "Menu kittaban prrna passand aa, lakin meray pra nu movie dekhna passand aa.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-friday-plan",
    english: "On Friday I will meet my mom and book the next Punjabi lesson.",
    punjabi: "Mein jummay nu apni ami nu milun ga ty agla Punjabi lesson book krun ga.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-possessions",
    english: "My dad has a house in Lahore, but I have one house in London.",
    punjabi: "Meray abu kol Lahore vich ghar aa, lakin meray kol London vich aik ghar aa.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-office-day",
    english: "Yesterday I went to the office, worked hard, and came back home in the evening.",
    punjabi: "Kal mein office gya c, mehnat kiti c, ty sham nu ghar wapas aya c.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-questions",
    english: "At what time do you eat breakfast and when do you go to the gym?",
    punjabi: "Tusi kinnay wajay nashta krdy oo ty tusi gym kido janday oo?",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-punjabi-study",
    english: "I am learning Punjabi because I want to speak with my relatives in Pakistan.",
    punjabi: "Mein Punjabi seekh rya aa kyun ke mein Pakistan vich apnay rishtaydaran naal gal krna chaunda aa.",
    level: "sentence",
    source: "extra practice",
  },
  {
    id: "extra-previous-day-short",
    english:
      "Yesterday was a busy day. I woke up early, had breakfast, went to work, and completed everything on time.",
    punjabi:
      "Kal busy din c. Mein subha jldi uthya c, nashta kita c, kam ty gya c, ty sara kuch time ty pura kita c.",
    level: "paragraph",
    source: "extra practice",
  },
  {
    id: "extra-weekend-paragraph",
    english:
      "On Saturday I do not work. I spend time with my family, watch Formula 1, and practise Punjabi for my next lesson.",
    punjabi:
      "Haftay nu mein kam nae krda. Mein apni family naal time guzarda aa, Formula 1 dekhda aa, ty aglay lesson lae Punjabi practice krda aa.",
    level: "paragraph",
    source: "extra practice",
  },
  {
    id: "extra-conversation-paragraph",
    english:
      "My name is Adam. I live in London with my family. I work in an office and I study Punjabi every day.",
    punjabi:
      "Mera naam Adam ae. Main London vich apni family de naal rehnda haan. Main office vich kam karda haan ty har roz Punjabi sikhda haan.",
    level: "paragraph",
    source: "extra practice",
  },
  {
    id: "extra-food-paragraph",
    english:
      "I like Pakistani food very much. I especially like biryani, but today I will eat chicken and rice at home.",
    punjabi:
      "Menu Pakistani khana bohat passand aa. Menu khas taur ty biryani passand aa, lakin aj mein ghar vich chicken ty chawal khaun ga.",
    level: "paragraph",
    source: "extra practice",
  },
  {
    id: "connected-daily-routine-1",
    english:
      "In the morning I wake up early, then I brush my teeth, and after that I take a shower before I go to work.",
    punjabi:
      "Subha mein jldi uthda aa, phir mein apnay dand saaf krda aa, ty oday baad kam ty jaan to pehlan mein nanda aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-daily-routine-2",
    english:
      "After I eat breakfast, I leave the house at seven o'clock, but sometimes I go a little later.",
    punjabi:
      "Nashta khanay to baad, mein sat wajay ghar to nikalda aa, lakin kadi kadi mein thorra baad vich janda aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-family-evening",
    english:
      "When I come back home in the evening, I eat dinner with my family and then I practise Punjabi for half an hour.",
    punjabi:
      "Jadon mein sham nu ghar wapas anda aa, mein apni family naal raat da khana khanda aa ty phir adha ghanta Punjabi practice krda aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-mum-cooking",
    english:
      "My mum cooks food at five o'clock, and after that we all eat together in the kitchen.",
    punjabi:
      "Meri ami panj wajay khana pakandi aa, ty oday baad asi saray kitchen vich mil k khana khanday aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-workday",
    english:
      "Today I am not working because it is Sunday, so after breakfast I will relax and watch a match.",
    punjabi:
      "Aj mein kam nae kr rya aa kyun ke aj atwar aa, is karke nashtay to baad mein aram krun ga ty match dekha ga.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-shopping-plan",
    english:
      "Next Friday I will go to the bazar with my wife, then we will buy clothes for my mum.",
    punjabi:
      "Aglay jummay nu mein apni biwi naal bazar jaun ga, phir asi meri ami lae kapray khareedan gay.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-day-question",
    english:
      "Which day is it in London today, and what will you do after your Punjabi lesson?",
    punjabi:
      "Aj London vich kerra din aa, ty tusi apnay Punjabi lesson to baad ki kro gay?",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-gym-time",
    english:
      "I go to the gym at eight o'clock at night, but before that I eat dinner at home.",
    punjabi:
      "Mein raat nu ath wajay gym janda aa, lakin osto pehlan mein ghar vich raat da khana khanda aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-relatives",
    english:
      "My relatives live in Pakistan, and when I speak Punjabi with them, I feel more confident.",
    punjabi:
      "Meray rishtaydar Pakistan vich renday aa, ty jadon mein ona naal Punjabi bolda aa, menu zyada confidence mehsoos hunda aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-like-contrast",
    english:
      "I like spicy food, but my sister does not like it, so we usually cook two different dishes.",
    punjabi:
      "Menu mirch ala khana passand aa, lakin meri pan nu eh passand nae, is karke asi aam tor ty do wakhriyan dishes pakanday aa.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-study-plan",
    english:
      "Before my next lesson, I will review the vocabulary, write five sentences, and practise speaking out loud.",
    punjabi:
      "Apnay aglay lesson to pehlan, mein vocabulary review krun ga, panj sentences likhun ga, ty zor naal bolan di practice krun ga.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-past-sequence",
    english:
      "Yesterday I woke up late, but after that I got ready quickly and reached work on time.",
    punjabi:
      "Kal mein der naal uthya c, lakin oday baad mein jldi tayar hoya c ty time ty kam ty pohanch gya c.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-past-family",
    english:
      "Last night I ate dinner with my family, then we watched TV, and after that I went to sleep.",
    punjabi:
      "Kal raat mein apni family naal raat da khana khada c, phir asi TV dekhya c, ty oday baad mein so gya c.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-question-chain",
    english:
      "Where is your mum, what is she doing, and when will she come back home?",
    punjabi:
      "Tuhadi ami kithay aa, oh ki kr rahi aa, ty oh kido ghar wapas aay gi?",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-week-plan",
    english:
      "On Monday I will go to work, on Friday I will meet my mum, and on Saturday I will rest.",
    punjabi:
      "Peer nu mein kam ty jaun ga, jummay nu mein apni ami nu milun ga, ty haftay nu mein aram krun ga.",
    level: "sentence",
    source: "connected sentence practice",
  },
  {
    id: "connected-office-paragraph",
    english:
      "Today was a long day at the office. In the morning I had many meetings, then I ate lunch with my colleagues, and after that I finished my work before going home.",
    punjabi:
      "Aj office vich lamba din c. Subha merian bohat meetings san, phir mein apnay colleagues naal dupaher da khana khada c, ty oday baad ghar jaan to pehlan mein apna kam mukammal kita c.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-routine-paragraph",
    english:
      "Every morning I wake up early and get ready for work. After breakfast I leave the house, but if I have time, I revise Punjabi sentences on my phone.",
    punjabi:
      "Har subha mein jldi uthda aa ty kam lae tayar hunda aa. Nashtay to baad mein ghar to nikalda aa, lakin je meray kol time hove, mein apnay phone ty Punjabi sentences revise krda aa.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-family-paragraph",
    english:
      "In the evening my family sits together. My mum cooks food, my dad watches the news, and after dinner we talk for a little while.",
    punjabi:
      "Sham nu meri family mil k baithdi aa. Meri ami khana pakandi aa, meray abu khabran dekhday aa, ty raat da khana khanay to baad asi thori der gal krday aa.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-study-paragraph",
    english:
      "I want to speak Punjabi more naturally. That is why I listen to sentences, write my own answers, and then practise saying them again and again.",
    punjabi:
      "Mein Punjabi zyada natural tareeqay naal bolna chaunda aa. Is karke mein sentences sunda aa, apnay jawab likhda aa, ty phir ona nu baar baar bolan di practice krda aa.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-weekend-paragraph",
    english:
      "On the weekend I usually wake up later than normal. After that I drink tea, spend time with my family, and then study Punjabi before dinner.",
    punjabi:
      "Weekend ty mein aam tor ty normal to der naal uthda aa. Oday baad mein chae peenda aa, apni family naal time guzarda aa, ty phir raat da khana khanay to pehlan Punjabi parhda aa.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-past-paragraph",
    english:
      "Yesterday I was tired, but I still practised Punjabi. First I reviewed vocabulary, then I translated five sentences, and after that I wrote notes for my tutor.",
    punjabi:
      "Kal mein thakya hoya c, lakin phir vi mein Punjabi practice kiti c. Pehlan mein vocabulary review kiti, phir mein panj sentences translate kite, ty oday baad mein apnay tutor lae notes likhe.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-travel-paragraph",
    english:
      "When I went to Pakistan, I met my relatives and spoke Punjabi with them. At first it was difficult, but after a few days I felt more comfortable.",
    punjabi:
      "Jadon mein Pakistan gya c, mein apnay rishtaydaran nu milya c ty ona naal Punjabi boli c. Shuru vich eh mushkil c, lakin kuj dinan to baad menu zyada asani mehsoos hoi.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
  {
    id: "connected-food-paragraph",
    english:
      "Tonight my mum will cook rice and chicken. After that we will eat together, but I will not eat too much because I want to go to the gym later.",
    punjabi:
      "Aj raat meri ami chawal ty chicken pakaa gi. Oday baad asi mil k khana khawan gay, lakin mein zyada nae khawan ga kyun ke baad vich mein gym jana chaunda aa.",
    level: "paragraph",
    source: "connected paragraph practice",
  },
];

export const translationPrompts: TranslationPrompt[] = [
  ...lessons.flatMap((lesson) =>
    lesson.sentences.map((sentence, index) => ({
      id: `${lesson.id}-sentence-${index}`,
      english: sentence.english,
      punjabi: sentence.punjabi,
      level: "sentence" as const,
      source: lesson.title,
    })),
  ),
  ...lessons
    .filter((lesson) => lesson.passage)
    .map((lesson) => ({
      id: `${lesson.id}-passage`,
      english: lesson.passage?.english ?? "",
      punjabi: lesson.passage?.punjabi ?? "",
      level: "paragraph" as const,
      source: lesson.title,
    })),
  ...extraPrompts,
];
