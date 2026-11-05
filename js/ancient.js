console.log("ancient.js loaded");

const books = document.querySelectorAll(".book");
const bookModal = document.getElementById("bookModal");
const bookTitle = document.getElementById("bookTitle");
const bookContent = document.getElementById("bookContent");
const closeBook = document.getElementById("closeBook");

const bookStories = {

    kingdoms: {
        title: "The Four Kingdoms",
        content: `
            <p>
                Around three thousand years ago, the magical realm was divided
                into four kingdoms: Water, Fire, Earth and Wind.
            </p>

            <p>
                Each kingdom practiced only the magic of its own element.
                Knowledge was guarded closely, and the four kingdoms lived
                in constant conflict with one another.
            </p>

            <p>
                For generations, the people believed that their own element
                was the only path they should follow. Cooperation between
                the kingdoms seemed impossible.
            </p>

            <p>
                But one extraordinary night, the moon began to shine with
                a mysterious silver light...
            </p>
        `
    },

    children: {
        title: "Children of the Silver Moon",
        content: `
            <p>
                On a night unlike any other, the moon shone with a mysterious
                silver light across all four kingdoms.
            </p>

            <p>
                That same night, four children were born — one in each kingdom.
                None could yet know that their lives would one day change
                the magical realm forever.
            </p>

            <h3>🌊 Aquillia — Witch of Water</h3>

            <p>
                Aquillia grew up in the Water Kingdom. She was intuitive,
                empathetic and deeply connected to the emotions of those
                around her. Her understanding nature would later help her
                see beyond the hatred between the kingdoms.
            </p>

            <h3>🔥 Ingnistil — Wizard of Fire</h3>

            <p>
                Ingnistil was born in the Fire Kingdom. Energetic, passionate
                and courageous, he rarely hesitated to act when he believed
                something was wrong. His determination was powerful, although
                his impatience could sometimes burn as fiercely as his magic.
            </p>

            <h3>🌍 Solumer — Wizard of Earth</h3>

            <p>
                Solumer came from the Earth Kingdom. Patient, practical and
                dependable, he valued stability and careful thought. While
                others rushed forward, Solumer preferred to build something
                that could endure.
            </p>

            <h3>🌪️ Ventlia — Witch of Wind</h3>

            <p>
                Ventlia was born in the Wind Kingdom. Curious, social and
                imaginative, she questioned traditions that others simply
                accepted. She believed knowledge should travel freely, just
                like the winds that crossed the borders between the kingdoms.
            </p>

            <p>
                Though separated by great distances, all four grew up asking
                the same forbidden question: why should the kingdoms remain
                enemies?
            </p>
        `
    },

    meeting: {
    title: "The Meeting of Four",
    content: `
        <p>
            As the four young mages grew older, each became a master
            of the element they had been raised to wield.
        </p>

        <p>
            Their kingdoms expected them to use that power in the
            endless wars. Yet Aquillia, Ingnistil, Solumer and Ventlia
            had all begun to question the same thing: why should their
            magic be used against people they had never even met?
        </p>

        <p>
            When the time came for them to leave their homelands,
            each set out expecting to face enemies. Instead, something
            seemed to pull them toward the same distant place.
        </p>

        <h3>🌙 Elementorumia</h3>

        <p>
            At the point where the borders of Water, Fire, Earth and
            Wind met, the four mages finally encountered one another.
            This place would later become known as Elementorumia.
        </p>

        <p>
            For the first time, they stood face to face with those
            they had been taught to consider enemies.
        </p>

        <p>
            Ingnistil's courage pushed him to approach the others.
            Aquillia quickly sensed that none of them truly wished
            to fight. Ventlia's curiosity turned suspicion into
            conversation, while Solumer's calm nature helped keep
            their uncertain meeting peaceful.
        </p>

        <p>
            They talked for hours and discovered something none of
            their kingdoms had expected: despite growing up far apart,
            all four had questioned the wars and dreamed of a different
            future.
        </p>

        <p>
            What should have been a meeting between enemies instead
            became the beginning of a friendship.
        </p>

        <p>
            None of them knew it yet, but one day an academy would
            stand upon that very ground.
        </p>
    `
},
founding: {
    title: "The Founding of Silvermoon",
    content: `
        <p>
            After their meeting at Elementorumia, Aquillia, Ingnistil,
            Solumer and Ventlia refused to return to the old ways of
            their kingdoms.
        </p>

        <p>
            Their friendship grew stronger, and they began sharing
            the knowledge that had once been guarded within the borders
            of their homelands.
        </p>

        <p>
            For the first time, a mage of Water could study the magic
            of Fire. A mage of Earth could learn from Wind. The four
            discovered that magic became greater through cooperation,
            not isolation.
        </p>

        <h3>🌙 A Dream of Unity</h3>

        <p>
            Changing the four kingdoms was not easy. For many years,
            the founders worked to mediate between their people and
            prove that the elements did not need to remain enemies.
        </p>

        <p>
            Slowly, their ideas began to spread. Mages from different
            kingdoms started to meet, exchange knowledge and see one
            another as something other than enemies.
        </p>

        <h3>🏰 Silvermoon Academy</h3>

        <p>
            Eventually, the four founders returned to the place where
            they had first met: Elementorumia.
        </p>

        <p>
            There they founded Silvermoon Academy, a school where
            magical knowledge would belong to everyone, regardless
            of the kingdom or element into which they had been born.
        </p>

        <p>
            The academy stood where four borders had once divided
            the magical realm. From that day forward, the same place
            would become a symbol of everything that could unite it.
        </p>
    `
},
unity: {
    title: "The Age of Unity",
    content: `
        <p>
            Silvermoon Academy changed the magical realm in ways
            even its four founders could not have imagined.
        </p>

        <p>
            Students arrived from Water, Fire, Earth and Wind,
            but at Silvermoon they were no longer limited to the
            magic of the kingdom in which they had been born.
        </p>

        <h3>✨ A New Understanding of Magic</h3>

        <p>
            As the students studied together, something remarkable
            became clear. A student born in the Fire Kingdom might
            possess an extraordinary talent for Water magic, while
            someone raised among the people of Earth could discover
            a natural connection to Wind.
        </p>

        <p>
            For generations, the kingdoms had believed that their
            people belonged to a single element. Silvermoon proved
            that magical ability could never be defined by borders.
        </p>

        <h3>🌊🔥🌍🌪️ Magic Without Borders</h3>

        <p>
            Students began combining knowledge from different
            traditions. New spells, potions and forms of magic
            emerged that none of the four kingdoms could have
            discovered alone.
        </p>

        <p>
            These discoveries eventually inspired a new tradition
            within Silvermoon Academy: the Houses.
        </p>

        <p>
            Unlike the old kingdoms, the Houses were never intended
            to divide students by where they came from. They were
            created for a new generation of mages who would learn,
            compete and grow together.
        </p>

        <h3>🌙 The Age of Unity</h3>

        <p>
            As generations passed, cooperation replaced conflict.
            The wars between the four kingdoms finally came to an
            end, and the old borders gradually disappeared.
        </p>

        <p>
            Where four rival kingdoms had once stood, one united
            magical realm began to flourish.
        </p>

        <p>
            At the heart of it remained Silvermoon Academy and
            Elementorumia, the place where four supposed enemies
            had chosen friendship instead of war.
        </p>

        <p>
            Thousands of years later, students still walk the same
            grounds. At Elementorumia stands a statue of Aquillia,
            Ingnistil, Solumer and Ventlia — a reminder that the
            greatest magic Silvermoon ever created was not an
            element, but unity.
        </p>
    `
}

};

books.forEach(function(book) {

    book.addEventListener("click", function() {

        console.log("Book clicked:", book.dataset.book);

        const selectedBook = book.dataset.book;
        const story = bookStories[selectedBook];

        
if (story) {
    bookTitle.textContent = story.title;
    bookContent.innerHTML = story.content;
    bookModal.classList.add("show");

    // =====================================
    // KEEPER OF KNOWLEDGE
    // =====================================

    let studiedBooks = [];

    try {
        const savedBooks = JSON.parse(
            localStorage.getItem("studiedAncientBooks") || "[]"
        );

        if (Array.isArray(savedBooks)) {
            studiedBooks = savedBooks;
        }
    } catch (error) {
        console.warn("Could not load studied books.");
    }

    // Register each book only once
    if (!studiedBooks.includes(selectedBook)) {

        studiedBooks.push(selectedBook);

        localStorage.setItem(
            "studiedAncientBooks",
            JSON.stringify(studiedBooks)
        );
    }

    // Unlock after opening all five books
    const allBooks = [
        "kingdoms",
        "children",
        "meeting",
        "founding",
        "unity"
    ];

    if (allBooks.every(id => studiedBooks.includes(id))) {

        localStorage.setItem(
            "achievementKeeperOfKnowledge",
            "true"
        );
    }
}


    });

});

closeBook.addEventListener("click", function() {
    bookModal.classList.remove("show");
});