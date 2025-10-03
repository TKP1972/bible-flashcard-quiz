import { QuizItemType } from './types.js';

const introductionToGodsWordSubGroups = [
    {
        title: "Foundational Beliefs",
        items: [
            {
                id: 1,
                question: "Who is God?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Psalm 83:18", text: "May people know that you, whose name is Jehovah, You alone are the Most High over all the earth." },
                    { reference: "Psalm 100:3", text: "Know that Jehovah is God. He is the one who made us, and we belong to him." },
                    { reference: "Isaiah 42:8", text: "“I am Jehovah. That is my name; I give my glory to no one else, Nor my praise to carved images.”" },
                    { reference: "Romans 10:13", text: "For “everyone who calls on the name of Jehovah will be saved.”" },
                    { reference: "Hebrews 3:4", text: "Of course, every house is constructed by someone, but the one who constructed all things is God." },
                    { reference: "Isaiah 40:26", text: "“Lift up your eyes to heaven and see. Who has created these things? It is the One who brings out their army by number; He calls them all by name. Because of his vast dynamic energy and his awe-inspiring power, Not one of them is missing.”" }
                ]
            },
            {
                id: 3,
                question: "Who wrote the Bible?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Exodus 24:4", text: "So Moses wrote down all the words of Jehovah." },
                    { reference: "Daniel 7:1", text: "Daniel saw a dream and visions of his head as he lay on his bed. Then he wrote down the dream; he recorded a complete account of the matters." },
                    { reference: "1 Thessalonians 2:13", text: "...when you received God’s word, which you heard from us, you accepted it not as the word of men but, just as it truthfully is, as the word of God, which is also at work in you believers." },
                    { reference: "2 Timothy 3:16", text: "All Scripture is inspired of God and beneficial for teaching, for reproving, for setting things straight, for disciplining in righteousness," },
                    { reference: "2 Peter 1:21", text: "For prophecy was at no time brought by man’s will, but men spoke from God as they were moved by holy spirit." }
                ]
            },
            {
                id: 4,
                question: "Is the Bible scientifically accurate?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Job 26:7", text: "He stretches out the northern sky over empty space, Suspending the earth upon nothing." },
                    { reference: "Ecclesiastes 1:7", text: "All the streams flow into the sea, yet the sea is not full. To the place from which the streams flow, there they return so as to flow again." },
                    { reference: "Isaiah 40:22", text: "There is One who dwells above the circle of the earth, And its inhabitants are like grasshoppers. He is stretching out the heavens like a fine gauze, And he spreads them out like a tent to dwell in." }
                ]
            },
            {
                id: 5,
                question: "What is the Bible’s message?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Genesis 3:15", text: "And I will put enmity between you and the woman and between your offspring and her offspring. He will crush your head, and you will strike him in the heel." },
                    { reference: "Genesis 22:18", text: "And by means of your offspring all nations of the earth will obtain a blessing for themselves because you have listened to my voice." },
                    { reference: "Matthew 6:10", text: "Let your Kingdom come. Let your will take place, as in heaven, also on earth." },
                    { reference: "Romans 16:20", text: "For his part, the God who gives peace will crush Satan under your feet shortly." },
                    { reference: "1 Corinthians 15:28", text: "But when all things will have been subjected to him, then the Son himself will also subject himself to the One who subjected all things to him, that God may be all things to everyone." },
                    { reference: "Galatians 3:16", text: "Now the promises were spoken to Abraham and to his offspring. It does not say, “and to your offsprings,” as if to many, but as to one, “and to your offspring,” who is Christ." },
                    { reference: "Galatians 3:29", text: "Moreover, if you belong to Christ, you are really Abraham’s offspring, heirs with reference to a promise." },
                    { reference: "Revelation 11:15", text: "...“The kingdom of the world has become the Kingdom of our Lord and of his Christ, and he will rule as king forever and ever.”" },
                    { reference: "Revelation 12:9", text: "So down the great dragon was hurled, the original serpent, the one called Devil and Satan, who is misleading the entire inhabited earth; he was hurled down to the earth, and his angels were hurled down with him." },
                    { reference: "Revelation 20:2", text: "He seized the dragon, the original serpent, who is the Devil and Satan, and bound him for 1,000 years." }
                ]
            },
        ]
    },
    {
        title: "Prophecy",
        items: [
            {
                id: 6,
                question: "What did the Bible foretell about the Messiah?",
                type: QuizItemType.PROPHECY,
                pairs: [
                    { prophecy: { reference: "Micah 5:2", text: "And you, O Bethlehem Ephrathah, the one too little to be among the thousands of Judah, from you will come out for me the one to be ruler in Israel, whose origin is from ancient times, from the days of long ago." }, fulfillment: { reference: "Matthew 2:1", text: "After Jesus had been born in Bethlehem of Judea in the days of Herod the king, look! astrologers from the East came to Jerusalem," } },
                    { prophecy: { reference: "Psalm 22:18", text: "They divide my garments among themselves, And they cast lots for my clothing." }, fulfillment: { reference: "John 19:23, 24", text: "Now when the soldiers had nailed Jesus to the stake, they took his outer garments and divided them into four parts, one for each soldier, and they also took the inner garment. But the inner garment was without a seam, being woven from top to bottom. So they said to one another: “Let us not tear it, but let us cast lots over it to decide whose it will be.” This was to fulfill the scripture: “They divided my garments among themselves, and they cast lots for my clothing.” So the soldiers actually did these things." } },
                    { prophecy: { reference: "Psalm 34:20", text: "He is guarding all his bones; Not one of them has been broken." }, fulfillment: { reference: "John 19:33", text: "But on coming to Jesus, they saw that he was already dead, so they did not break his legs." } },
                    { prophecy: { reference: "Isaiah 53:5", text: "But he was pierced for our transgression; He was crushed for our errors. The punishment for our peace was upon him, And because of his wounds we were healed." }, fulfillment: { reference: "John 19:34", text: "But one of the soldiers jabbed his side with a spear, and immediately blood and water came out." } },
                    { prophecy: { reference: "Zechariah 11:12, 13", text: "Then I said to them: “If it seems right to you, give me my wages; but if not, keep them.” So they paid my wages, 30 pieces of silver. Then Jehovah said to me: “Throw it to the treasury—the majestic value at which I have been valued by them.” So I took the 30 pieces of silver and threw it into the treasury at the house of Jehovah." }, fulfillment: { reference: "Matthew 26:14, 15", text: "Then one of the Twelve, the one called Judas Iscariot, went to the chief priests and said: “What will you give me to betray him to you?” They stipulated to him 30 silver pieces." } }
                ]
            },
            {
                id: 7,
                question: "What does the Bible foretell about our day?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Matthew 24:7, 8", text: "For nation will rise against nation and kingdom against kingdom... All these things are a beginning of pangs of distress." },
                    { reference: "Matthew 24:11, 12", text: "And many false prophets will arise and mislead many; and because of the increasing of lawlessness, the love of the greater number will grow cold." },
                    { reference: "Mark 13:7", text: "And when you hear of wars and reports of wars, do not be alarmed; these things must take place, but the end is not yet." },
                    { reference: "Luke 21:11", text: "there will be great earthquakes, and in one place after another food shortages and pestilences; and there will be fearful sights and from heaven great signs." },
                    { reference: "2 Timothy 3:1-5", text: "But know this, that in the last days critical times hard to deal with will be here. For men will be lovers of themselves, lovers of money, boastful, haughty, blasphemers, disobedient to parents, unthankful, disloyal, having no natural affection, not open to any agreement, slanderers, without self-control, fierce, without love of goodness, betrayers, headstrong, puffed up with pride, lovers of pleasures rather than lovers of God, having an appearance of godliness but proving false to its power." }
                ]
            },
        ]
    },
    {
        title: "God's Promises & Purpose",
        items: [
            {
                id: 8,
                question: "Is God to blame for human suffering?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Job 34:10", text: "It is unthinkable for the true God to act wickedly, For the Almighty to do wrong!" },
                    { reference: "James 1:13", text: "When under trial, let no one say: “I am being tried by God.” For with evil things God cannot be tried, nor does he himself try anyone." },
                    { reference: "1 Peter 5:7", text: "while you throw all your anxiety on him, because he cares for you." },
                    { reference: "2 Peter 3:9", text: "Jehovah is not slow concerning his promise, as some people consider slowness, but he is patient with you because he does not desire anyone to be destroyed but desires all to attain to repentance." }
                ]
            },
            {
                id: 9,
                question: "Why do humans suffer?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Ecclesiastes 9:11", text: "The swift do not always win the race, nor do the mighty win the battle, nor do the wise always have the food, nor do the intelligent always have the riches, nor do those with knowledge always have success, because time and unexpected events overtake them all." },
                    { reference: "Romans 5:12", text: "That is why, just as through one man sin entered into the world and death through sin, and so death spread to all men because they had all sinned—." },
                    { reference: "1 John 3:8", text: "For this purpose the Son of God was made manifest, to break up the works of the Devil." },
                    { reference: "1 John 5:19", text: "We know that we originate with God, but the whole world is lying in the power of the wicked one." }
                ]
            },
            {
                id: 10,
                question: "What does the Bible promise for the future?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Psalm 37:29", text: "The righteous will possess the earth, And they will live forever on it." },
                    { reference: "Ecclesiastes 1:4", text: "A generation is going, and a generation is coming, But the earth remains forever." },
                    { reference: "Isaiah 25:8", text: "He will swallow up death forever, And the Sovereign Lord Jehovah will wipe away the tears from all faces." },
                    { reference: "Isaiah 35:5, 6", text: "At that time the eyes of the blind will be opened, And the ears of the deaf will be unstopped. At that time the lame will leap like the deer, And the tongue of the speechless will shout for joy. For waters will burst forth in the wilderness, And streams in the desert plain." },
                    { reference: "Revelation 21:4", text: "And he will wipe out every tear from their eyes, and death will be no more, neither will mourning nor outcry nor pain be anymore. The former things have passed away." },
                    { reference: "Isaiah 65:21, 22", text: "They will build houses and live in them, And they will plant vineyards and eat their fruitage. They will not build for someone else to inhabit, Nor will they plant for others to eat. For the days of my people will be like the days of a tree, And the work of their hands my chosen ones will enjoy to the full." }
                ]
            },
            {
                id: 11,
                question: "What happens when someone dies?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Psalm 146:4", text: "His spirit goes out, he returns to the ground; On that very day his thoughts perish." },
                    { reference: "Ecclesiastes 9:5, 10", text: "For the living know that they will die, but the dead know nothing at all... Whatever your hand finds to do, do with all your might, for there is no work nor planning nor knowledge nor wisdom in the Grave, where you are going." },
                    { reference: "John 11:11, 13, 14", text: "...“Lazarus our friend has fallen asleep, but I am traveling there to awaken him.” Jesus, however, had spoken about his death. But they imagined he was speaking about taking rest in sleep. Then Jesus said to them plainly: “Lazarus has died.”" }
                ]
            },
            {
                id: 12,
                question: "What hope can we have for the dead?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "John 5:28, 29", text: "Do not be amazed at this, for the hour is coming in which all those in the memorial tombs will hear his voice and come out." },
                    { reference: "Acts 24:15", text: "And I have hope toward God, which hope these men also look forward to, that there is going to be a resurrection of both the righteous and the unrighteous." },
                    { reference: "Revelation 20:12, 13", text: "And I saw the dead, the great and the small, standing before the throne, and scrolls were opened. But another scroll was opened; it is the scroll of life. The dead were judged out of those things written in the scrolls according to their deeds. And the sea gave up the dead in it, and death and the Grave gave up the dead in them, and they were judged individually according to their deeds." }
                ]
            },
        ]
    },
    {
        title: "Practical Bible Principles",
        items: [
            {
                id: 13,
                question: "What does the Bible say about work?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Proverbs 22:29", text: "Have you seen a man skillful at his work? He will stand before kings; He will not stand before common men." },
                    { reference: "Ephesians 4:28", text: "Let the one who steals steal no more; rather, let him do hard work, doing good work with his hands, so that he may have something to share with someone in need." },
                    { reference: "Ecclesiastes 3:13", text: "everyone should eat and drink and find enjoyment for all his hard work. It is the gift of God." }
                ]
            },
            {
                id: 14,
                question: "How can you manage your assets?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Proverbs 21:17", text: "The one who loves having a good time will come to poverty; The one who loves wine and oil will not grow rich." },
                    { reference: "Proverbs 22:7", text: "The borrower is a slave to the lender." },
                    { reference: "Luke 14:28-30", text: "For example, who of you wanting to build a tower does not first sit down and calculate the expense to see if he has enough to complete it? Otherwise, he might lay its foundation but not be able to finish it, and all the onlookers would start to ridicule him, saying: ‘This man started to build but was not able to finish.’" },
                    { reference: "John 6:12", text: "When they had eaten their fill, he said to his disciples: “Gather together the fragments left over, so that nothing is wasted.”" }
                ]
            },
            {
                id: 15,
                question: "How can you find happiness?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Proverbs 15:17", text: "Better is a dish of vegetables where there is love Than a fattened bull where there is hatred." },
                    { reference: "Isaiah 48:17", text: "I, Jehovah, am your God, the One teaching you to benefit yourself, the One guiding you in the way you should walk." },
                    { reference: "Matthew 5:3", text: "“Happy are those conscious of their spiritual need, since the Kingdom of the heavens belongs to them." },
                    { reference: "Matthew 22:39", text: "You must love your neighbor as yourself." },
                    { reference: "Luke 6:31", text: "Also, just as you want men to do to you, do the same way to them." },
                    { reference: "Luke 11:28", text: "“No, rather, happy are those hearing the word of God and keeping it!”" },
                    { reference: "Luke 12:15", text: "Even when a person has an abundance, his life does not result from the things he possesses." },
                    { reference: "1 Timothy 6:8", text: "So, having food and clothing, we will be content with these things." },
                    { reference: "Acts 20:35", text: "‘There is more happiness in giving than there is in receiving.’”" }
                ]
            },
            {
                id: 16,
                question: "How can you cope with anxiety?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Psalm 55:22", text: "Throw your burden on Jehovah, and he will sustain you. Never will he allow the righteous one to fall." },
                    { reference: "Proverbs 21:5", text: "The plans of the diligent surely lead to success, But all who are hasty surely head for poverty." },
                    { reference: "Isaiah 41:10", text: "Do not be afraid, for I am with you. Do not be anxious, for I am your God. I will fortify you, yes, I will help you, I will really hold on to you with my right hand of righteousness." },
                    { reference: "Matthew 6:27", text: "Who of you by being anxious can add one cubit to his life span?" },
                    { reference: "Matthew 6:34", text: "So never be anxious about the next day, for the next day will have its own anxieties. Each day has enough of its own troubles." },
                    { reference: "Philippians 1:10", text: "that you may make sure of the more important things," },
                    { reference: "Philippians 4:6, 7", text: "Do not be anxious over anything, but in everything by prayer and supplication along with thanksgiving, let your petitions be made known to God; and the peace of God that surpasses all understanding will guard your hearts and your mental powers by means of Christ Jesus." }
                ]
            },
            {
                id: 17,
                question: "How can the Bible help your family?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "HUSBANDS/FATHERS - Ephesians 5:28, 29", text: "In the same way, husbands should love their wives as their own bodies. A man who loves his wife loves himself, for no man ever hated his own body, but he feeds and cherishes it," },
                    { reference: "FATHERS - Ephesians 6:4", text: "And you, fathers, do not be irritating your children, but go on bringing them up in the discipline and admonition of Jehovah." },
                    { reference: "WIVES - Ephesians 5:33", text: "...the wife should have deep respect for her husband." },
                    { reference: "WIVES - Colossians 3:18", text: "You wives, be in subjection to your husbands, as it is becoming in the Lord." },
                    { reference: "CHILDREN - Ephesians 6:1-3", text: "Children, be obedient to your parents in union with the Lord, for this is righteous. “Honor your father and your mother” is the first command with a promise: “That it may go well with you and you may remain a long time on the earth.”" },
                    { reference: "CHILDREN - Colossians 3:20", text: "You children, be obedient to your parents in everything, for this is well-pleasing to the Lord." }
                ]
            },
        ]
    },
    {
        title: "Personal Study & Relationship with God",
        items: [
            {
                id: 2,
                question: "How can you learn about God?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Joshua 1:8", text: "This book of the Law should not depart from your mouth, and you must read it in an undertone day and night, in order to observe carefully all that is written in it; for then your way will be successful and then you will act wisely." },
                    { reference: "Nehemiah 8:8", text: "And they continued reading aloud from the book, from the Law of the true God, clearly explaining it and putting meaning into it; so they helped the people to understand what was being read." },
                    { reference: "Psalm 1:1-3", text: "Happy is the man who does not walk according to the advice of the wicked... but his delight is in the law of Jehovah, And he reads His law in an undertone day and night... Everything he does will succeed." },
                    { reference: "Acts 8:30, 31", text: "Philip ran alongside and heard him reading aloud Isaiah the prophet, and he said: “Do you actually know what you are reading?” He said: “Really, how could I ever do so unless someone guided me?”" },
                    { reference: "Romans 1:20", text: "For his invisible qualities are clearly seen from the world’s creation onward, because they are perceived by the things made, even his eternal power and Godship, so that they are inexcusable." },
                    { reference: "1 Timothy 4:15", text: "Ponder over these things; be absorbed in them, so that your advancement may be plainly seen by all people." },
                    { reference: "Hebrews 10:24, 25", text: "And let us consider one another so as to incite to love and fine works, not forsaking our meeting together," },
                    { reference: "James 1:5", text: "So if any one of you is lacking in wisdom, let him keep asking God, for he gives generously to all and without reproaching, and it will be given him." }
                ]
            },
            {
                id: 18,
                question: "How can you draw close to God?",
                type: QuizItemType.QA,
                answers: [
                    { reference: "Psalm 65:2", text: "O Hearer of prayer, to you people of all sorts will come." },
                    { reference: "Proverbs 3:5, 6", text: "Trust in Jehovah with all your heart, And do not rely on your own understanding. In all your ways take notice of him, And he will make your paths straight." },
                    { reference: "John 17:3", text: "This means everlasting life, their coming to know you, the only true God, and the one whom you sent, Jesus Christ." },
                    { reference: "Acts 17:27", text: "...in fact, he is not far off from each one of us." },
                    { reference: "Philippians 1:9", text: "And this is what I continue praying, that your love may abound still more and more with accurate knowledge and full discernment;" },
                    { reference: "James 1:5", text: "So if any one of you is lacking in wisdom, let him keep asking God, for he gives generously to all and without reproaching, and it will be given him." },
                    { reference: "James 4:8", text: "Draw close to God, and he will draw close to you. Cleanse your hands, you sinners, and purify your hearts, you indecisive ones." },
                    { reference: "1 John 5:3", text: "For this is what the love of God means, that we observe his commandments; and yet his commandments are not burdensome." }
                ]
            },
            {
                id: 19,
                question: "Identify the Bible Book Collections",
                type: QuizItemType.BOOK_QUIZ,
                quiz: [
                    { questionText: "Genesis, Exodus, Leviticus, Numbers, and Deuteronomy are known as the:", correctAnswer: "PENTATEUCH", options: ["PENTATEUCH", "HISTORICAL BOOKS", "POETIC BOOKS", "PROPHETIC BOOKS"], },
                    { questionText: "The collection including Joshua, Judges, and Ruth is referred to as the:", correctAnswer: "HISTORICAL BOOKS", options: ["PENTATEUCH", "HISTORICAL BOOKS", "POETIC BOOKS", "PROPHETIC BOOKS"], },
                    { questionText: "Job, Psalms, and Proverbs are part of which collection of inspired writings?", correctAnswer: "POETIC BOOKS", options: ["PENTATEUCH", "HISTORICAL BOOKS", "POETIC BOOKS", "PROPHETIC BOOKS"], },
                    { questionText: "The books of Isaiah, Jeremiah, and Daniel are part of which collection?", correctAnswer: "PROPHETIC BOOKS", options: ["PENTATEUCH", "HISTORICAL BOOKS", "POETIC BOOKS", "PROPHETIC BOOKS"], },
                    { questionText: "Matthew, Mark, Luke, and John are collectively referred to as:", correctAnswer: "THE FOUR GOSPELS", options: ["THE FOUR GOSPELS", "ACTS OF APOSTLES", "LETTERS", "REVELATION"], },
                    { questionText: "Which book documents the history of the early Christian congregation's formation and missionary work?", correctAnswer: "ACTS OF APOSTLES", options: ["THE FOUR GOSPELS", "ACTS OF APOSTLES", "LETTERS", "REVELATION"], },
                    { questionText: "The inspired writings from Romans to Jude are known as the:", correctAnswer: "LETTERS", options: ["THE FOUR GOSPELS", "ACTS OF APOSTLES", "LETTERS", "REVELATION"], },
                    { questionText: "Which book is composed of a series of prophetic visions given to the apostle John?", correctAnswer: "REVELATION", options: ["THE FOUR GOSPELS", "ACTS OF APOSTLES", "LETTERS", "REVELATION"], }
                ]
            },
            {
                id: 20,
                question: "How can you get the most out of your Bible reading?",
                type: QuizItemType.HOW_TO,
                points: [
                    { title: "About Jehovah God", text: "What does this tell me about Jehovah God?" },
                    { title: "Contribution to Bible's Message", text: "How does this section of the Scriptures contribute to the Bible’s message?" },
                    { title: "Personal Application", text: "How can I apply this in my life?" },
                    { title: "Helping Others", text: "How can I use these verses to help others?" }
                ],
                conclusion: { reference: "Psalm 119:105", text: "Your word is a lamp to my foot, And a light for my path." }
            }
        ]
    }
];

const truthsWeLoveToTeachSubGroups = [
    {
        title: "The Future",
        items: [
            { id: 21, question: "Current events and attitudes indicate a change is near.", type: QuizItemType.QA, answers: [ { reference: "Matthew 24:3", text: "While he was sitting on the Mount of Olives, the disciples approached him privately, saying: “Tell us, when will these things be, and what will be the sign of your presence and of the conclusion of the system of things?”" }, { reference: "Matthew 24:7, 8", text: "“For nation will rise against nation and kingdom against kingdom, and there will be food shortages and earthquakes in one place after another. All these things are a beginning of pangs of distress." }, { reference: "Luke 21:10, 11", text: "Then he said to them: “Nation will rise against nation, and kingdom against kingdom. There will be great earthquakes, and in one place after another food shortages and pestilences; and there will be fearful sights and from heaven great signs.”" }, { reference: "2 Timothy 3:1-5", text: "But know this, that in the last days critical times hard to deal with will be here. For men will be lovers of themselves, lovers of money, boastful, haughty, blasphemers, disobedient to parents, unthankful, disloyal, having no natural affection, not open to any agreement, slanderers, without self-control, fierce, without love of goodness, betrayers, headstrong, puffed up with pride, lovers of pleasures rather than lovers of God, having an appearance of godliness but proving false to its power." } ] },
            { id: 22, question: "The earth will never be destroyed.", type: QuizItemType.QA, answers: [ { reference: "Psalm 104:5", text: "He has founded the earth on its foundations; It will not be moved from its place forever and ever." }, { reference: "Ecclesiastes 1:4", text: "A generation is going, and a generation is coming, But the earth remains forever." } ] },
            { id: 23, question: "The earth’s environment will be restored.", type: QuizItemType.QA, answers: [ { reference: "Isaiah 35:1, 2", text: "The wilderness and the parched land will exult, And the desert plain will be joyful and blossom as the saffron. It will without fail blossom, And it will rejoice with joy and with joyful shouting. The glory of Lebanon will be given to it, The splendor of Carmel and of Sharon. They will see the glory of Jehovah, the splendor of our God." }, { reference: "Revelation 11:18", text: "But the nations became wrathful, and your own wrath came, and the appointed time came for the dead to be judged and to reward your slaves the prophets and the holy ones and those fearing your name, the small and the great, and to bring to ruin those ruining the earth." } ] },
            { id: 24, question: "Everyone will have perfect health.", type: QuizItemType.QA, answers: [ { reference: "Isaiah 33:24", text: "And no resident will say: “I am sick.” The people dwelling in the land will be pardoned for their error." }, { reference: "Isaiah 35:5, 6", text: "At that time the eyes of the blind will be opened, And the ears of the deaf will be unstopped. At that time the lame will leap like the deer, And the tongue of the speechless will shout for joy. For waters will burst forth in the wilderness, And streams in the desert plain." } ] },
            { id: 25, question: "You can live forever on earth.", type: QuizItemType.QA, answers: [ { reference: "Psalm 37:29", text: "The righteous will possess the earth, And they will live forever on it." }, { reference: "Matthew 5:5", text: "“Happy are the mild-tempered, since they will inherit the earth." } ] }
        ]
    },
    {
        title: "Family",
        items: [
            { id: 26, question: "A husband should 'love his wife as he does himself.'", type: QuizItemType.QA, answers: [ { reference: "Ephesians 5:33", text: "Nevertheless, each one of you must love his wife as he does himself; on the other hand, the wife should have deep respect for her husband." }, { reference: "Colossians 3:19", text: "You husbands, continue loving your wives and do not be bitterly angry with them." } ] },
            { id: 27, question: "A wife should deeply respect her husband.", type: QuizItemType.QA, answers: [ { reference: "Ephesians 5:33", text: "Nevertheless, each one of you must love his wife as he does himself; on the other hand, the wife should have deep respect for her husband." }, { reference: "Colossians 3:18", text: "You wives, be in subjection to your husbands, as it is becoming in the Lord." } ] },
            { id: 28, question: "A husband and a wife should be loyal to each other.", type: QuizItemType.QA, answers: [ { reference: "Malachi 2:16", text: "“For I hate divorce,” says Jehovah the God of Israel." }, { reference: "Matthew 19:4-6, 9", text: "In reply he said: “Have you not read that the one who created them from the beginning made them male and female and said: ‘For this reason a man will leave his father and his mother and will stick to his wife, and the two will be one flesh’? So that they are no longer two, but one flesh. Therefore, what God has yoked together, let no man put apart.” ... I say to you that whoever divorces his wife, except on the grounds of sexual immorality, and marries another commits adultery." }, { reference: "Hebrews 13:4", text: "Let marriage be honorable among all, and let the marriage bed be without defilement, for God will judge sexually immoral people and adulterers." } ] },
            { id: 29, question: "Children who respect and obey their parents will succeed.", type: QuizItemType.QA, answers: [ { reference: "Proverbs 1:8, 9", text: "Listen, my son, to the discipline of your father, And do not forsake the instruction of your mother. For they are a graceful garland for your head And a fine ornament for your neck." }, { reference: "Ephesians 6:1-3", text: "Children, be obedient to your parents in union with the Lord, for this is righteous. “Honor your father and your mother” is the first command with a promise: “That it may go well with you and you may remain a long time on the earth.”" } ] }
        ]
    },
    {
        title: "God",
        items: [
            { id: 30, question: "God has a name.", type: QuizItemType.QA, answers: [ { reference: "Psalm 83:18", text: "May people know that you, whose name is Jehovah, You alone are the Most High over all the earth." }, { reference: "Jeremiah 10:10", text: "But Jehovah is in truth God. He is the living God and the eternal King." } ] },
            { id: 31, question: "God communicates with us.", type: QuizItemType.QA, answers: [ { reference: "2 Timothy 3:16, 17", text: "All Scripture is inspired of God and beneficial for teaching, for reproving, for setting things straight, for disciplining in righteousness, so that the man of God may be fully competent, completely equipped for every good work." }, { reference: "2 Peter 1:20, 21", text: "For you know this first, that no prophecy of Scripture springs from any private interpretation. For prophecy was at no time brought by man’s will, but men spoke from God as they were moved by holy spirit." } ] },
            { id: 32, question: "God is fair and unbiased.", type: QuizItemType.QA, answers: [ { reference: "Deuteronomy 10:17", text: "For Jehovah your God is the God of gods and the Lord of lords, the great, mighty, and awe-inspiring God, who treats no one with partiality and does not accept a bribe." }, { reference: "Acts 10:34, 35", text: "At this Peter began to speak, and he said: “Now I truly understand that God is not partial, but in every nation the man who fears him and does what is right is acceptable to him.”" } ] },
            { id: 33, question: "God wants to help us.", type: QuizItemType.QA, answers: [ { reference: "Psalm 46:1", text: "God is our refuge and strength, A help that is readily found in times of distress." }, { reference: "Psalm 145:18, 19", text: "Jehovah is near to all those calling on him, To all who call on him in truth. He satisfies the desire of those who fear him; He hears their cry for help, and he saves them." } ] }
        ]
    },
    {
        title: "Prayer",
        items: [
            { id: 34, question: "God wants us to pray to him.", type: QuizItemType.QA, answers: [ { reference: "Psalm 62:8", text: "Trust in him at all times, O people. Pour out your hearts before him. God is a refuge for us." }, { reference: "Psalm 65:2", text: "O Hearer of prayer, to you people of all sorts will come." }, { reference: "1 Peter 5:7", text: "while you throw all your anxiety on him, because he cares for you." } ] },
            { id: 35, question: "The Bible teaches us how to pray.", type: QuizItemType.QA, answers: [ { reference: "Matthew 6:7-13", text: "When praying, do not say the same things over and over again as the people of the nations do, for they imagine they will get a hearing for their use of many words. So do not be like them, for your Father knows what you need even before you ask him. “You must pray, then, this way: “‘Our Father in the heavens, let your name be sanctified. Let your Kingdom come. Let your will take place, as in heaven, also on earth. Give us today our bread for this day; and forgive us our debts, as we also have forgiven our debtors. And do not bring us into temptation, but deliver us from the wicked one.’”" }, { reference: "Luke 11:1-4", text: "Now he was in a certain place praying, and when he stopped, one of his disciples said to him: “Lord, teach us how to pray, just as John also taught his disciples.” So he said to them: “Whenever you pray, say: ‘Father, let your name be sanctified. Let your Kingdom come. Give us our bread for the day according to our daily need. And forgive us our sins, for we ourselves also forgive everyone who is in debt to us. And do not bring us into temptation.’”" } ] },
            { id: 36, question: "We should pray often.", type: QuizItemType.QA, answers: [ { reference: "Matthew 7:7, 8", text: "“Keep on asking, and it will be given you; keep on seeking, and you will find; keep on knocking, and it will be opened to you. For everyone asking receives, and everyone seeking finds, and to everyone knocking, it will be opened." }, { reference: "1 Thessalonians 5:17", text: "Pray constantly." } ] }
        ]
    },
    {
        title: "Jesus",
        items: [
            { id: 37, question: "Jesus was a great teacher whose advice always works.", type: QuizItemType.QA, answers: [ { reference: "Matthew 6:14, 15, 34", text: "“For if you forgive men their trespasses, your heavenly Father will also forgive you; whereas if you do not forgive men their trespasses, neither will your Father forgive your trespasses. So never be anxious about the next day, for the next day will have its own anxieties. Each day has enough of its own troubles." }, { reference: "Matthew 7:12", text: "“All things, therefore, that you want men to do to you, you also must do to them. This, in fact, is what the Law and the Prophets mean." } ] },
            { id: 38, question: "Jesus foretold events we see today.", type: QuizItemType.QA, answers: [ { reference: "Matthew 24:3, 7, 8, 14", text: "While he was sitting on the Mount of Olives, the disciples approached him privately, saying: “Tell us, when will these things be, and what will be the sign of your presence and of the conclusion of the system of things?” ... “For nation will rise against nation and kingdom against kingdom, and there will be food shortages and earthquakes in one place after another. All these things are a beginning of pangs of distress. And this good news of the Kingdom will be preached in all the inhabited earth for a witness to all the nations, and then the end will come." }, { reference: "Luke 21:10, 11", text: "Then he said to them: “Nation will rise against nation, and kingdom against kingdom. There will be great earthquakes, and in one place after another food shortages and pestilences; and there will be fearful sights and from heaven great signs.”" } ] },
            { id: 39, question: "Jesus is God’s Son.", type: QuizItemType.QA, answers: [ { reference: "Matthew 16:16", text: "Simon Peter answered: “You are the Christ, the Son of the living God.”" }, { reference: "John 3:16", text: "“For God loved the world so much that he gave his only-begotten Son, so that everyone exercising faith in him might not be destroyed but have everlasting life." }, { reference: "1 John 4:15", text: "Whoever acknowledges that Jesus is the Son of God, God remains in union with such one and he in union with God." } ] },
            { id: 40, question: "Jesus is not God Almighty.", type: QuizItemType.QA, answers: [ { reference: "John 14:28", text: "You heard that I said to you, ‘I am going away and I am coming back to you.’ If you loved me, you would rejoice that I am going to the Father, for the Father is greater than I am." }, { reference: "1 Corinthians 11:3", text: "But I want you to know that the head of every man is the Christ; in turn, the head of a woman is the man; in turn, the head of the Christ is God." } ] }
        ]
    },
    {
        title: "God's Kingdom",
        items: [
            { id: 41, question: "God’s Kingdom is a real government in heaven.", type: QuizItemType.QA, answers: [ { reference: "Daniel 2:44", text: "“In the days of those kings the God of heaven will set up a kingdom that will never be destroyed. And this kingdom will not be passed on to any other people. It will crush and put an end to all these kingdoms, and it alone will stand forever." }, { reference: "Daniel 7:13, 14", text: "“I kept watching in the visions of the night, and look! with the clouds of the heavens, someone like a son of man was coming; and he gained access to the Ancient of Days, and they brought him up close before that One. And to him there were given rulership, honor, and a kingdom, that the peoples, nations, and language groups should all serve him. His rulership is an everlasting rulership that will not pass away, and his kingdom is one that will not be destroyed." }, { reference: "Matthew 6:9, 10", text: "“You must pray, then, this way: “‘Our Father in the heavens, let your name be sanctified. Let your Kingdom come. Let your will take place, as in heaven, also on earth.’" }, { reference: "Revelation 11:15", text: "The seventh angel blew his trumpet. And there were loud voices in heaven, saying: “The kingdom of the world has become the Kingdom of our Lord and of his Christ, and he will rule as king forever and ever.”" } ] },
            { id: 42, question: "God’s Kingdom will replace human governments.", type: QuizItemType.QA, answers: [ { reference: "Psalm 2:7-9", text: "Let me proclaim the decree of Jehovah; He said to me: “You are my son; Today I have become your father. Ask of me, and I will give nations as your inheritance And the ends of the earth as your possession. You will break them with an iron scepter, As though a potter’s vessel you will dash them to pieces.”" }, { reference: "Daniel 2:44", text: "“In the days of those kings the God of heaven will set up a kingdom that will never be destroyed. And this kingdom will not be passed on to any other people. It will crush and put an end to all these kingdoms, and it alone will stand forever." } ] },
            { id: 43, question: "God’s Kingdom is the only solution to mankind’s problems.", type: QuizItemType.QA, answers: [ { reference: "Psalm 37:10, 11", text: "Just a little while longer, and the wicked will be no more; You will look at where they were, And they will not be there. But the meek will possess the earth, And they will find exquisite delight in the abundance of peace." }, { reference: "Psalm 46:9", text: "He is making wars cease to the ends of the earth. He breaks the bow and shatters the spear; He burns the military wagons with fire." }, { reference: "Isaiah 65:21-23", text: "They will build houses and live in them, And they will plant vineyards and eat their fruitage. They will not build for someone else to inhabit, Nor will they plant for others to eat. For the days of my people will be like the days of a tree, And the work of their hands my chosen ones will enjoy to the full. They will not toil for nothing, Nor will they bear children for distress, Because they are the offspring made up of the chosen ones of Jehovah, And their descendants with them." } ] }
        ]
    },
    {
        title: "Suffering",
        items: [
            { id: 44, question: "God does not cause our suffering.", type: QuizItemType.QA, answers: [ { reference: "Deuteronomy 32:4", text: "The Rock, perfect is his activity, For all his ways are justice. A God of faithfulness who is never unjust; Righteous and upright is he." }, { reference: "James 1:13", text: "When under trial, let no one say: “I am being tried by God.” For with evil things God cannot be tried, nor does he himself try anyone." } ] },
            { id: 45, question: "Satan rules this world.", type: QuizItemType.QA, answers: [ { reference: "Luke 4:5, 6", text: "So he brought him up and showed him all the kingdoms of the inhabited earth in an instant of time. Then the Devil said to him: “I will give you all this authority and their glory, because it has been handed over to me, and I give it to whomever I wish.”" }, { reference: "1 John 5:19", text: "We know that we originate with God, but the whole world is lying in the power of the wicked one." } ] },
            { id: 46, question: "God cares about your suffering.", type: QuizItemType.QA, answers: [ { reference: "Psalm 34:17-19", text: "They cried out, and Jehovah heard; He rescued them from all their distresses. Jehovah is close to the brokenhearted; He saves those who are crushed in spirit. Many are the hardships of the righteous one, But Jehovah rescues him from them all." }, { reference: "Isaiah 41:10, 13", text: "Do not be afraid, for I am with you. Do not be anxious, for I am your God. I will fortify you, yes, I will help you, I will really hold on to you with my right hand of righteousness. For I, Jehovah your God, am grasping your right hand, The One saying to you, ‘Do not be afraid. I will help you.’" } ] },
            { id: 47, question: "God will soon end suffering.", type: QuizItemType.QA, answers: [ { reference: "Isaiah 65:17", text: "For look! I am creating new heavens and a new earth; And the former things will not be called to mind, Nor will they come up into the heart." }, { reference: "Revelation 21:3, 4", text: "With that I heard a loud voice from the throne say: “Look! The tent of God is with mankind, and he will reside with them, and they will be his people. And God himself will be with them. And he will wipe out every tear from their eyes, and death will be no more, neither will mourning nor outcry nor pain be anymore. The former things have passed away.”" } ] }
        ]
    },
    {
        title: "Death",
        items: [
            { id: 48, question: "The dead are unconscious; they are not suffering.", type: QuizItemType.QA, answers: [ { reference: "Ecclesiastes 9:5", text: "For the living know that they will die, but the dead know nothing at all, nor do they have any more reward, because all memory of them is forgotten." }, { reference: "John 11:11-14", text: "After he said these things, he added: “Lazarus our friend has fallen asleep, but I am traveling there to awaken him.” The disciples then said to him: “Lord, if he is sleeping, he will get well.” Jesus, however, had spoken about his death. But they imagined he was speaking about taking rest in sleep. Then Jesus said to them plainly: “Lazarus has died.”" } ] },
            { id: 49, question: "The dead cannot help us or harm us.", type: QuizItemType.QA, answers: [ { reference: "Psalm 146:4", text: "His spirit goes out, he returns to the ground; On that very day his thoughts perish." }, { reference: "Ecclesiastes 9:6, 10", text: "Also, their love and their hate and their jealousy have already perished, and they no longer have any share in what is done under the sun. ... Whatever your hand finds to do, do with all your might, for there is no work nor planning nor knowledge nor wisdom in the Grave, where you are going." } ] },
            { id: 50, question: "Dead loved ones will be resurrected.", type: QuizItemType.QA, answers: [ { reference: "Job 14:13-15", text: "O that in the Grave you would conceal me, That you would hide me until your anger passes by, That you would set a time limit for me and remember me! If a man dies, can he live again? I will wait all the days of my compulsory service Until my relief comes. You will call, and I will answer you. You will long for the work of your hands." }, { reference: "John 5:28, 29", text: "Do not be amazed at this, for the hour is coming in which all those in the memorial tombs will hear his voice and come out, those who did good things to a resurrection of life, and those who practiced vile things to a resurrection of judgment." }, { reference: "Acts 24:15", text: "And I have hope toward God, which hope these men also look forward to, that there is going to be a resurrection of both the righteous and the unrighteous." } ] },
            { id: 51, question: "“Death will be no more.”", type: QuizItemType.QA, answers: [ { reference: "Revelation 21:3, 4", text: "With that I heard a loud voice from the throne say: “Look! The tent of God is with mankind, and he will reside with them, and they will be his people. And God himself will be with them. And he will wipe out every tear from their eyes, and death will be no more, neither will mourning nor outcry nor pain be anymore. The former things have passed away.”" }, { reference: "Isaiah 25:8", text: "He will swallow up death forever, And the Sovereign Lord Jehovah will wipe away the tears from all faces. The reproach of his people he will take away from all the earth, For Jehovah himself has spoken." } ] }
        ]
    },
    {
        title: "Religion",
        items: [
            { id: 52, question: "Not all religions please God.", type: QuizItemType.QA, answers: [ { reference: "Jeremiah 7:11", text: "Has this house that is called by my name become just a cave of robbers in your eyes? Here I myself have seen it,” declares Jehovah." }, { reference: "Matthew 7:13, 14, 21-23", text: "“Go in through the narrow gate, because broad is the gate and spacious is the road leading off into destruction, and many are going in through it; whereas narrow is the gate and cramped the road leading off into life, and few are finding it. “Not everyone saying to me, ‘Lord, Lord,’ will enter into the Kingdom of the heavens, but only the one doing the will of my Father who is in the heavens will. Many will say to me in that day: ‘Lord, Lord, did we not prophesy in your name, and expel demons in your name, and perform many powerful works in your name?’ And then I will declare to them: ‘I never knew you! Get away from me, you workers of lawlessness!’" } ] },
            { id: 53, question: "God hates hypocrisy.", type: QuizItemType.QA, answers: [ { reference: "Isaiah 29:13", text: "Jehovah says: “This people approaches me with their mouth And they honor me with their lips, But their heart is far removed from me; And their fear of me is based on commands of men that they have been taught.”" }, { reference: "Micah 3:11", text: "Her head ones judge for a bribe, Her priests instruct for a price, And her prophets practice divination for money. Yet, they lean on Jehovah, saying: “Is not Jehovah in our midst? No calamity will come upon us.”" }, { reference: "Mark 7:6-8", text: "He said to them: “Isaiah aptly prophesied about you hypocrites, as it is written: ‘This people honor me with their lips, but their hearts are far removed from me. It is in vain that they keep worshipping me, for they teach commands of men as doctrines.’ You let go of the commandment of God and cling to the tradition of men.”" } ] },
            { id: 54, question: "Genuine love identifies true religion.", type: QuizItemType.QA, answers: [ { reference: "Micah 4:3", text: "He will render judgment among many peoples And set matters straight respecting mighty nations far away. They will beat their swords into plowshares And their spears into pruning shears. Nation will not lift up sword against nation, Nor will they learn war anymore." }, { reference: "John 13:34, 35", text: "I am giving you a new commandment, that you love one another; just as I have loved you, you also love one another. By this all will know that you are my disciples—if you have love among yourselves.”" } ] }
        ]
    }
];

export const quizTopicGroups = [
    {
        title: "An Introduction to God's Word (NWT 2013)",
        subGroups: introductionToGodsWordSubGroups
    },
    {
        title: "Truths We Love To Teach (lmd Appendix A)",
        subGroups: truthsWeLoveToTeachSubGroups
    }
];