// اللغة الفرنسية
SUBJECTS.push({
    id: 'french',
    name: 'اللغة الفرنسية',
    short: 'فرنسية',
    icon: '🇫🇷',
    color: '#2563eb',
    coef: 4,
    desc: 'القواعد (Les temps، la voix passive…)، المفردات، والتعبير الكتابي.',
    units: [
        {
            id: 'fr-grammar',
            title: 'Grammaire & Conjugaison',
            topics: [
                {
                    id: 'fr-times',
                    title: 'Les temps du récit',
                    summary: `<p>Le <b>passé composé</b> (action terminée) : j'ai fini, il est allé. L'<b>imparfait</b> (description, habitude) : je finissais. Le <b>plus-que-parfait</b> : j'avais fini. Le <b>futur simple</b> : je finirai. Le <b>conditionnel présent</b> : je finirais.</p>`,
                    rules: [
                        'Passé composé : auxiliaire avoir/être au présent + participe passé.',
                        'Être au passé composé : verbes de mouvement (aller, venir, sortir…) + accord.',
                        'Imparfait : nous finissions / ils finissaient (radical des terminaisons -ions, -iez, -aient).',
                        'Plus-que-parfait : imparfait de l\'auxiliaire + participe passé.',
                        'Conditionnel : futur simple + imparfait (je finirais).'
                    ],
                    review: [
                        'Conjuguez au passé composé : il partir, nous arriver, elle naître.',
                        'Remplacez par l\'imparfait : Nous jouions (habitude).',
                        'Traduisez : \"Si j\'avais le temps, je viendrais.\"'
                    ],
                    videoQuery: 'Les temps du récit 3ème année moyenne'
                },
                {
                    id: 'fr-passive',
                    title: 'La voix passive & le discours indirect',
                    summary: `<p><b>Voix passive</b> : être + participe passé (+ par). <b>Discours indirect</b> : rapporter une phrase avec \"que\" + temps adapté (présent → imparfait).</p>`,
                    rules: [
                        'Active : Le garçon mange une pomme → Passive : La pomme est mangée par le garçon.',
                        'Discours direct → indirect : Il dit : « Je viens » → Il dit qu\'il vient.',
                        'Le gérondif : en + participe présent (En arrivant…).',
                        'Les expansions du nom : épithète, apposition, complément du nom.'
                    ],
                    review: [
                        'Passez à la voix passive : On répare la route.',
                        'Racontez indirectement : « Je réussirai demain. »',
                        'Distinguez : une porte en bois (CN) / une porte bleue (épithète).'
                    ],
                    videoQuery: 'voix passive discours indirect français 3AM'
                }
            ]
        },
        {
            id: 'fr-production',
            title: 'Compréhension & Production écrite',
            topics: [
                {
                    id: 'fr-writing',
                    title: 'Les textes : récit, dialogue, compte-rendu',
                    summary: `<p>Le <b>récit</b> utilise l\'imparfait et le passé simple/composé. Le <b>dialogue</b> respecte les guillemets et le tiret. Le <b>compte-rendu</b> est objectif et utilise le présent ou le passé composé.</p>`,
                    rules: [
                        'Récit : situer l\'action (hier, soudain), employer les temps du passé.',
                        'Dialogue : une prise de parole par tiret (—).',
                        'Compte-rendu : phrases affirmatives, vocabulaire neutre, impersonnel.',
                        'Respecter l\'orthographe et la ponctuation.'
                    ],
                    review: [
                        'Rédigez un court dialogue (8 répliques) à l\'école.',
                        'Comptez-rendu d\'une activité sportive en classe.',
                        'Résumez un texte en 5 phrases.'
                    ],
                    videoQuery: 'production écrite français 3ème année moyenne'
                }
            ]
        }
    ],
    quiz: [
        { q: 'Choisissez : Hier, je ___ au marché.', options: ['vais', 'allais', 'suis allé', 'irai'], a: 2, ex: 'Action terminée au passé composé : je suis allé.' },
        { q: 'L\'imparfait de « finir » à la 1ère personne :', options: ['je finis', 'je finissais', 'j\'ai fini', 'je finirai'], a: 1, ex: 'Terminaison -ais : je finissais.' },
        { q: 'Passez à la voix passive : « On répare la route ».', options: ['La route est réparée.', 'La route répare.', 'La route a réparé.', 'La route sera réparer.'], a: 0, ex: 'être + participe passé : est réparée.' },
        { q: 'Le COD dans « Je le vois » est :', options: ['Je', 'le', 'vois', 'aucun'], a: 1, ex: '« le » remplace un nom masculin COD.' },
        { q: 'Conditionnel : si j\'avais le temps, je ___ .', options: ['viendrai', 'viendrais', 'viens', 'venais'], a: 1, ex: 'Conditionnel présent : je viendrais.' },
        { q: 'Plus-que-parfait de « finir » :', options: ['j\'ai fini', 'j\'avais fini', 'je finis', 'je finirais'], a: 1, ex: 'Imparfait de l\'auxiliaire + participe.' },
        { q: 'Discours indirect de « Il dit : Je viendrai » :', options: ['Il dit qu\'il viendra.', 'Il dit qu\'il vienne.', 'Il dit : il vient.', 'Il dit venir.'], a: 0, ex: 'Le futur simple devient conditionnel ou reste futur selon le contexte.' },
        { q: 'Expansion du nom dans « une maison en bois » :', options: ['épithète', 'complément du nom', 'apposition', 'gérondif'], a: 1, ex: '« en bois » complète le nom maison.' },
        { q: 'Futur simple de « être » :', options: ['je serai', 'j\'étais', 'je suis', 'je fus'], a: 0, ex: 'Je serai (futur).' },
        { q: 'Gérondif de « arriver » :', options: ['en arrivant', 'en arrive', 'arrivé', 'à arriver'], a: 0, ex: 'en + participe présent.' },
        { q: '« Elle est allée » : l\'auxiliaire est :', options: ['avoir', 'être', 'faire', 'avoir été'], a: 1, ex: 'Aller se conjugue avec être.' },
        { q: 'Choisissez la phrase correcte :', options: ['Il a écrit une lettre.', 'Il écris une lettre.', 'Il a écrit une lettre par lui.', 'Il est écrire.'], a: 0, ex: 'Participe passé avec avoir : a écrit.' }
    ],
    exams: [
        {
            id: 'french-model-1',
            title: 'Devoir de français – modèle',
            meta: { duration: '2h', coef: 4, total: '20 pts' },
            parts: [
                {
                    title: 'Partie I – Compréhension (6 pts)',
                    tasks: [
                        {
                            text: 'Lisez le texte du manuel, puis :\n1) Citez deux actions du passé composé (1 pt)\n2) Citez deux phrases à l\'imparfait (1 pt)\n3) Donnez le thème du texte (2 pts)\n4) Traduisez : « Si j\'étais riche, je voyagerais. » (2 pts)',
                            solution: `<p><b>1–2)</b> Repérez dans le texte : actions terminées (passé composé) vs descriptions (imparfait).</p>
                            <p><b>3)</b> Le thème se déduit de l\'idée générale du texte.</p>
                            <p><b>4)</b> « لو كنتُ غنياً لسافرتُ » (conditionnel : احتمال غير واقعي).</p>`
                        }
                    ]
                },
                {
                    title: 'Partie II – Grammaire (8 pts)',
                    tasks: [
                        {
                            text: '1) Conjuguez au plus-que-parfait : nous finir, elle partir (2 pts)\n2) Passez à la voix passive : « L\'élève écrit la leçon » (2 pts)\n3) Transformez en discours indirect : « Je réussirai. » (2 pts)\n4) Complétez : En ___ (arriver), il a salué ses amis. (2 pts)',
                            solution: `<p><b>1)</b> Nous avions fini / Elle était partie.</p>
                            <p><b>2)</b> La leçon est écrite par l\'élève.</p>
                            <p><b>3)</b> Il dit qu\'il réussira (ou : il annonçait qu\'il réussirait).</p>
                            <p><b>4)</b> En arrivant (gérondif).</p>`
                        }
                    ]
                },
                {
                    title: 'Partie III – Production écrite (6 pts)',
                    tasks: [
                        {
                            text: 'Rédigez un texte (10 à 12 lignes) : « Une journée mémorable de ma vie » en utilisant les temps du passé. (6 pts)',
                            solution: `<p><b>Barème :</b> compréhension du thème (2), maîtrise des temps du passé (2), orthographe et ponctuation (1), originalité (1).</p>`
                        }
                    ]
                }
            ]
        }
    ]
});

// اللغة الإنجليزية
SUBJECTS.push({
    id: 'english',
    name: 'اللغة الإنجليزية',
    short: 'إنجليزية',
    icon: '🇬🇧',
    color: '#7c3aed',
    coef: 3,
    desc: 'Grammar, Vocabulary & Writing حسب وحدات الكتاب المدرسي.',
    units: [
        {
            id: 'en-grammar',
            title: 'Grammar',
            topics: [
                {
                    id: 'en-tenses',
                    title: 'Tenses',
                    summary: `<p><b>Present Simple</b> (habits) : He goes. <b>Present Continuous</b> (now) : He is going. <b>Past Simple</b> : He went. <b>Past Continuous</b> : He was going. <b>Present Perfect</b> : He has gone. <b>Future</b> : He will go / He is going to go.</p>`,
                    rules: [
                        'Present simple : s/es à la 3e personne (he plays).',
                        'Present continuous : am/is/are + -ing (I am reading now).',
                        'Past simple : verbe + ed ou forme irrégulière (went, saw).',
                        'Present perfect : have/has + participe passé (I have finished).',
                        'Future : will + base verbale ; going to pour intention.'
                    ],
                    review: [
                        'Put in the correct tense: Yesterday, I ___ (play) football.',
                        'He ___ to school every day. (go)',
                        'She is ___ a book now. (read)'
                    ],
                    videoQuery: 'English tenses 3rd year middle school Algeria'
                },
                {
                    id: 'en-passive-reported',
                    title: 'Passive Voice & Reported Speech',
                    summary: `<p><b>Passive</b> : be + past participle (The letter was written by him). <b>Reported speech</b> : He said (that) he was tired (tense shift).</p>`,
                    rules: [
                        'Active → Passive : The boy eats an apple → The apple is eaten by the boy.',
                        'Reported: present → past, will → would, am → was.',
                        'Comparatives : bigger than ; Superlatives : the biggest.',
                        'Conditionals type 1 : If + present, will + verb.'
                    ],
                    review: [
                        'Change to passive: "They repair cars."',
                        'Report: "I am tired," he said.',
                        'Write: big → bigger → the biggest.'
                    ],
                    videoQuery: 'passive voice reported speech 3AM English'
                }
            ]
        },
        {
            id: 'en-skills',
            title: 'Reading & Writing',
            topics: [
                {
                    id: 'en-writing',
                    title: 'Reading comprehension & paragraph writing',
                    summary: `<p>Reading: answer questions, find synonyms, main idea. Writing: a paragraph (4–5 sentences) about family, school, health or environment.</p>`,
                    rules: [
                        'Read the questions before the text.',
                        'Underline key words in the text.',
                        'A paragraph has a topic sentence + supporting sentences.',
                        'Use linking words: and, but, because, then.'
                    ],
                    review: [
                        'Write a paragraph about your family (5 sentences).',
                        'Find synonyms: big, happy, quick.',
                        'Answer: What time do you get up every day?'
                    ],
                    videoQuery: 'English writing paragraph 3AM'
                }
            ]
        }
    ],
    quiz: [
        { q: 'He ___ to school every day.', options: ['go', 'goes', 'going', 'is go'], a: 1, ex: 'Present simple, 3rd person: goes.' },
        { q: 'She ___ a book now.', options: ['reads', 'read', 'is reading', 'was reading'], a: 2, ex: 'Present continuous (now).' },
        { q: 'Yesterday, I ___ football.', options: ['play', 'played', 'play', 'am playing'], a: 1, ex: 'Past simple: played.' },
        { q: 'Passive of "The boy writes a letter":', options: ['A letter is written by the boy.', 'A letter writes the boy.', 'The letter was write.', 'A letter is wrote.'], a: 0, ex: 'be + past participle + by + agent.' },
        { q: 'He said he ___ tired.', options: ['is', 'was', 'be', 'will'], a: 1, ex: 'Reported speech: present → past.' },
        { q: 'The comparative of "big":', options: ['bigger', 'biggest', 'more big', 'big'], a: 0, ex: 'CVC word: double consonant + er.' },
        { q: 'If it rains, we ___ at home.', options: ['stayed', 'stay', 'will stay', 'staying'], a: 2, ex: 'Conditional type 1: If + present, will + verb.' },
        { q: 'There ___ two books on the desk.', options: ['is', 'are', 'was', 'has'], a: 1, ex: 'There are + plural.' },
        { q: '"Must" expresses:', options: ['obligation', 'permission', 'possibility', 'advice'], a: 0, ex: 'Must = strong obligation.' },
        { q: 'Present perfect: I ___ my homework.', options: ['did', 'have done', 'do', 'was doing'], a: 1, ex: 'have/has + participle.' },
        { q: 'Synonym of "happy":', options: ['sad', 'glad', 'angry', 'tired'], a: 1, ex: 'Glad ≈ happy.' },
        { q: 'He was playing when I ___ home.', options: ['come', 'came', 'come', 'will come'], a: 1, ex: 'Past simple: came.' }
    ],
    exams: [
        {
            id: 'english-model-1',
            title: 'English test – model',
            meta: { duration: '2h', coef: 3, total: '20 pts' },
            parts: [
                {
                    title: 'Part 1 – Comprehension (6 pts)',
                    tasks: [
                        {
                            text: 'Read the text and answer:\n1) What is the main idea? (2 pts)\n2) Find in the text two words meaning "quickly" and "difficult". (2 pts)\n3) Answer: How often does he play sports? (2 pts)',
                            solution: `<p><b>1)</b> The main idea is found in the topic sentence of the text.</p>
                            <p><b>2)</b> Scan the text for synonyms (e.g., fast ↔ quickly).</p>
                            <p><b>3)</b> Answer with a full sentence (e.g., He plays sports three times a week).</p>`
                        }
                    ]
                },
                {
                    title: 'Part 2 – Language (8 pts)',
                    tasks: [
                        {
                            text: '1) Put in the correct tense: "Yesterday, I ___ (visit) my uncle." (2 pts)\n2) Change to passive: "They clean the classroom." (2 pts)\n3) Report: She said, "I will travel tomorrow." (2 pts)\n4) Make comparative: This road is narrow. That road is ___ (narrow) than this one. (2 pts)',
                            solution: `<p><b>1)</b> visited.</p><p><b>2)</b> The classroom is cleaned by them.</p>
                            <p><b>3)</b> She said that she would travel the next day.</p><p><b>4)</b> narrower.</p>`
                        }
                    ]
                },
                {
                    title: 'Part 3 – Writing (6 pts)',
                    tasks: [
                        {
                            text: 'Write a paragraph (6–8 lines) about "How to keep fit". (6 pts)',
                            solution: `<p><b>Criteria:</b> topic sentence, at least 3 supporting sentences, linking words, correct grammar and spelling.</p>`
                        }
                    ]
                }
            ]
        }
    ]
});
