/* ==========================================================================
   CRYPTOZOOLOGY: AN ADVANCED EXPLORATION FOR COLLEGE GRADUATES
   Handles interactive textbook navigation (now with 20 pages per chapter),
   codex database, map plots, Web Audio growl synthesizer, canvas-based lab,
   and certificate exports under the Institute of Hidden Spice Expeditions (IHSE).
   ========================================================================== */

// Preload the official seal for high-res canvas rendering
const sealImage = new Image();
sealImage.src = "seal.png";

// --- ACADEMIC TEXTBOOK DATABASE (EXPANDED TO 110 PAGES TOTAL) ---
const TEXTBOOK_DB = {
    preface: [
        {
            title: "Cryptozoology: An Advanced Exploration for College Graduates",
            content: `
                <div style="text-align:center; padding: 2rem 0;">
                    <h3 style="font-family:var(--font-ui); font-size:1rem; letter-spacing:3px; text-transform:uppercase; color:var(--text-muted); margin-bottom:1.5rem;">Official Academic Compendium</h3>
                    <h1 style="font-family:var(--font-header); font-size:2.2rem; line-height:1.3; color:#2b2319; margin-bottom:1rem;">Cryptozoology: An Advanced Exploration for College Graduates</h1>
                    <div style="margin: 2rem 0; height:2px; background-color:#8d7657; opacity:0.3;"></div>
                    <p style="font-family:var(--font-body); font-style:italic; font-size:1.1rem; color:#5a4b37; text-align:center; text-indent:0; margin-bottom:2rem;">By</p>
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; font-weight:600; color:#2b2319; margin-bottom:0.5rem; text-align:center;">Dr. Joseph Bryan Thornburg, PhD (Cryptozoology)</h2>
                    <p style="font-family:var(--font-ui); font-size:0.85rem; line-height:1.6; color:#5a4b37; text-align:center; text-indent:0;">
                        Ordained Minister<br>
                        Founder & Expedition Architect, Institute of Hidden Spice Expeditions
                    </p>
                    <div style="margin-top: 3rem;" class="cover-seal-icon">IHSE</div>
                </div>
            `
        },
        {
            title: "Copyright & Licensing",
            content: `
                <div style="font-family:var(--font-ui); font-size:0.8rem; line-height:1.6; color:#5a4b37; padding: 1rem 0;">
                    <p style="text-indent:0; margin-bottom:1rem;"><strong>Copyright</strong><br>
                    &copy; 2026 Joseph Bryan Thornburg. All rights reserved.</p>
                    <p style="text-indent:0; margin-bottom:1.5rem; text-align:justify;">No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the author, except in the case of brief quotations embodied in critical reviews, academic analysis, or permitted by copyright law.</p>
                    <p style="text-indent:0; margin-bottom:1rem;"><strong>Published by:</strong><br>
                    Smokeline Press<br>
                    Norwalk, Iowa</p>
                    <p style="text-indent:0; margin-bottom:1rem;"><strong>Library of Congress Control Number:</strong> 2026908250<br>
                    <strong>ISBN:</strong> 978-1-105-47315-9</p>
                    <div style="margin: 1.5rem 0; border-top:1px dashed #8d7657; opacity:0.3;"></div>
                    <p style="text-indent:0; font-style:italic; text-align:justify;">This book is a work of scholarly nonfiction. All research, analysis, and interpretations are presented for educational and academic purposes. Field methods, investigative procedures, and expeditionary recommendations are intended for trained professionals and advanced students.</p>
                    <p style="text-indent:0; margin-top:2rem; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Printed in the United States of America</p>
                </div>
            `
        },
        {
            title: "Dedication",
            content: `
                <div style="height:100%; display:flex; flex-direction:column; justify-content:center; padding: 2rem 0; font-family:var(--font-body); font-size:0.95rem; line-height:1.8; color:#2b2319;">
                    <p style="text-indent:0; margin-bottom:1.5rem; text-align:left;">
                        To my wife, <strong>Darlene</strong>, whose love, strength, and unwavering belief have carried me farther than any map or compass ever could.
                    </p>
                    <p style="text-indent:0; margin-bottom:1.5rem; text-align:left;">
                        To my brothers &mdash; <strong>Randy, Johnny, and Doug</strong> &mdash; and to my sister, <strong>Debbie</strong>, whose shared history, resilience, and spirit shaped the foundation of my journey.
                    </p>
                    <p style="text-indent:0; margin-bottom:1.5rem; text-align:left;">
                        To my brother-in-law, <strong>Carl Holleman</strong>, for his steadfast support and presence along the way.
                    </p>
                    <p style="text-indent:0; margin-bottom:1.5rem; text-align:left; font-style:italic; border-left: 3px solid #8d7657; padding-left: 1rem; color:#5a4b37;">
                        And to all who carry a spark of curiosity for the unknown &mdash; the explorers, the dreamers, the skeptics, and the believers &mdash; this work is for everyone who looks into the wilderness and wonders what still walks unseen.
                    </p>
                </div>
            `
        },
        {
            title: "Epigraph",
            content: `
                <div style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding: 4rem 1rem;">
                    <div style="font-family:var(--font-header); font-size:1.4rem; font-style:italic; line-height:1.6; color:#5a4b37; margin-bottom:2rem; position:relative;">
                        &ldquo;The unknown is not a void. It is simply the part of the world that has not yet learned our name.&rdquo;
                    </div>
                    <div style="width: 50px; height: 1px; background-color: #8d7657; margin-bottom: 2rem;"></div>
                </div>
            `
        },
        {
            title: "The Boundaries of Zoology",
            content: `
                <p>Cryptozoology&mdash;derived from the Greek <em>kryptos</em> (hidden), <em>zoon</em> (animal), and <em>logos</em> (discourse)&mdash;stands at a controversial junction in modern scientific thought. Often dismissed as a pseudoscience, its formal definition remains the study of hidden animals: creatures whose existence is suggested by folklore, oral histories, or circumstantial evidence, but which remain unverified by formal zoological nomenclature.</p>
                <p>This volume is compiled not to advocate for blind belief, but to introduce the academic framework necessary to evaluate anomalous biological claims. The history of science is replete with examples of creatures that transitioned from mythical beasts to cataloged species. The Giant Squid (<em>Architeuthis dux</em>), once dismissed as the sailor's Kraken, was only photographed alive in 2004. The Okapi (<em>Okapia johnstoni</em>), termed the "African unicorn," was unknown to European science until 1901. Thus, the intellectual posture of the researcher must be one of critical, structured inquiry: maintaining open-mindedness while demanding empirical, verifiable evidence.</p>
                <div class="academic-note">
                    "In science, the omission of an anomaly is as dangerous as the premature acceptance of an unverified phenomenon." <br>&mdash; Dr. Bernard Heuvelmans, Founder of Cryptozoology
                </div>
            `
        },
        {
            title: "The Criterion of Holotypes: Registering New Taxa",
            content: `
                <p>In formal biology, a species cannot be officially recognized without a designated <strong>holotype</strong>&mdash;a single physical specimen deposited in a recognized museum or research institution. This specimen serves as the physical benchmark for the species' anatomical description, genetic sequencing, and morphological comparison.</p>
                <p>In cryptozoological investigations, the lack of a holotype is the primary barrier to scientific validation. Eye-witness accounts, footprints, and photographic evidence, while valuable for planning expeditions, do not constitute a holotype under the rules of the International Commission on Zoological Nomenclature (ICZN). Researchers must strive to obtain verifiable physical remains (such as bones, tissue, or skin) or, in modern contexts, high-coverage genetic sequences that can be duplicated across independent laboratories.</p>
            `
        },
        {
            title: "Paradigm Shifts: Historical Precedents of Discovery",
            content: `
                <p>Skepticism is the cornerstone of scientific progress, yet history shows that scientific consensus can be slow to accept radical zoological discoveries. In 1812, Georges Cuvier, the father of paleontology, famously declared that the discovery of any new large land mammal was highly improbable. Decades later, the mountain gorilla, the giant panda, and the okapi were all formally described by Western science, proving Cuvier's declaration premature.</p>
                <p>These historical precedents demonstrate that ecosystems can conceal large creatures, especially in regions with dense canopy cover, complex terrain, or low human population density. The role of the IHSE is to systematically apply modern forensic tools to these remaining wilderness pockets, ensuring that no potential biological discovery is ignored due to academic inertia.</p>
            `
        },
        {
            title: "Ockham's Razor vs. Anomalous Conservation",
            content: `
                <p>When evaluating cryptid reports, scientists rely on <strong>Ockham's Razor</strong>: the principle that the simplest explanation containing the fewest assumptions is usually the correct one. For example, if a large, hairy figure is sighted in a North American forest, the simplest explanation is a misidentified black bear (<em>Ursus americanus</em>) walking upright, rather than a surviving lineage of prehistoric hominids.</p>
                <p>However, Ockham's Razor must not be misused to suppress anomalous data. If footprint casts, hair samples, and bioacoustic recordings consistently display traits that deviate from known regional fauna, the hypothesis of a new species may eventually require fewer assumptions than invoking a complex, multi-decade conspiracy of hoaxers. The IHSE seeks to balance these principles, demanding rigorous verification while remaining open to anomalous evidence.</p>
            `
        },
        {
            title: "Ethical Guidelines for Cryptid Field Research",
            content: `
                <p>Field research in remote environments demands strict adherence to ethical standards. IHSE investigators must prioritize the preservation of local ecosystems and respect the cultural heritage of indigenous populations. Many cryptid legends are deeply woven into the spiritual and social fabric of local communities; dismissing these stories as mere folklore or exploiting them for commercial gain violates research ethics.</p>
                <p>Furthermore, if an undocumented megafauna population is discovered, researchers must immediately transition from collection to conservation. The introduction of large expeditions, camera traps, and tourist interest can disrupt fragile, low-density breeding populations. The goal of the IHSE is to document and protect hidden species, not to drive them to extinction through invasive research methods.</p>
            `
        }
    ],
    intro: [
        {
            title: "Introduction",
            content: `
                <p>Cryptozoology occupies a unique position within the biological sciences: it is a discipline defined not by what is known, but by what remains unresolved. For generations, researchers, naturalists, and explorers have encountered reports of animals that defy conventional classification&mdash;creatures described in folklore, glimpsed in remote environments, or preserved in cultural memory long before modern science attempted to interpret them. These accounts form the foundation of cryptozoology, a field that challenges students to examine the boundaries of zoology, ecology, anthropology, and human perception.</p>
                <p>This text is designed for advanced learners&mdash;students who have already developed a grounding in biological principles and who are prepared to engage critically with complex, interdisciplinary material. Rather than treating cryptids as mythic curiosities or dismissing them as cultural artifacts, this book approaches them as biological hypotheses: claims that can be evaluated through ecological plausibility, environmental constraints, technological tools, and rigorous scientific methodology.</p>
                <p>The study of cryptozoology requires more than cataloguing sightings or recounting legends. It demands an understanding of how ecosystems function, how species adapt, how human cognition shapes eyewitness testimony, and how cultural narratives influence interpretation. It also requires familiarity with modern investigative tools such as camera trapping, dronebased surveys, acoustic monitoring, and environmental DNA analysis&mdash;technologies that have revolutionized wildlife biology and now offer new avenues for exploring the unknown.</p>
                <p>At the same time, cryptozoology invites students to confront the limitations of scientific knowledge. Vast regions of the planet remain biologically underexplored. New species&mdash;some large, some behaviorally elusive, some hidden in extreme environments&mdash;continue to be discovered each year. These realities remind us that the natural world is not fully mapped, and that scientific humility is as essential as scientific skepticism.</p>
                <p>This book provides a structured, academically rigorous exploration of cryptozoology&rsquo;s history, methods, controversies, and future directions. It challenges readers to evaluate evidence with clarity, to recognize the influence of cultural context, and to approach the unknown with both critical discipline and intellectual curiosity.</p>
                <p>For the advanced student, cryptozoology is not merely the study of hidden animals. It is the study of how science expands&mdash;how questions become hypotheses, how hypotheses become investigations, and how the boundaries of knowledge shift when we dare to examine what lies just beyond them.</p>
            `
        },
        {
            title: "History of Cryptid Studies: From Bestiaries to Science",
            content: `
                <p>To study cryptozoology scientifically, one must understand the epistemological difference between folklore and zoology. Throughout antiquity and the medieval era, bestiaries conflated real animals with mythological symbols. Pliny the Elder's <em>Naturalis Historia</em> cataloged the monoceros alongside the elephant, presenting both as objective realities. It was only during the scientific revolution that biological taxonomy, established by Carl Linnaeus, began to isolate myth from empirical specimen collection.</p>
                <p>In the mid-20th century, Bernard Heuvelmans and Willy Ley attempted to establish cryptozoology as a distinct discipline. Heuvelmans advocated for the systematic analysis of local myths, arguing that persistent folklore across independent cultures often points to a relict population of prehistoric species. However, the field has suffered from a lack of rigorous academic standards, frequently populated by amateur enthusiasts and sensationalized media.</p>
            `
        },
        {
            title: "Bernard Heuvelmans and the Birth of Cryptozoology",
            content: `
                <p>In 1955, Belgian zoologist Bernard Heuvelmans published <em>Sur la piste des bêtes ignorées</em> (On the Track of Unknown Animals), establishing the intellectual foundation of modern cryptozoology. Heuvelmans argued that local names, native drawings, and traditional lore were not random fabrications but valuable clues. He classified reports into distinct morphological categories, laying out a systematic framework for searching for unknown species.</p>
                <p>Heuvelmans' work inspired a generation of researchers, leading to the creation of the International Society of Cryptozoology (ISC) in 1982. The society's journal, <em>Cryptozoology</em>, attempted to bring academic peer-review to the field. Despite these efforts, the lack of verifiable physical evidence and the rise of sensationalized television documentaries led to a decline in mainstream scientific participation by the late 1990s.</p>
            `
        },
        {
            title: "The Skeptical Movement and Scientific Backlash",
            content: `
                <p>Mainstream zoology's rejection of cryptozoology is rooted in the lack of empirical results. Skeptics point out that despite decades of searching, no physical remains of Bigfoot, the Loch Ness Monster, or the Yeti have ever been verified. The field is often criticized for its reliance on anecdotal reports, poor-quality photographs, and a tendency to ignore ecological realities, such as food web constraints and minimum viable population sizes.</p>
                <p>This backlash is necessary for scientific integrity. Without critical scrutiny, biology would be flooded with unverified claims. The IHSE addresses this by adopting the same forensic standards as criminal investigators. By proving that specific reports are hoaxes or misidentifications, we can eliminate the noise and isolate the few cases that warrant genuine scientific interest.</p>
            `
        },
        {
            title: "Metagenomics and the eDNA Revolution",
            content: `
                <p>The introduction of **Environmental DNA (eDNA)** has revolutionized the search for elusive species. Organisms shed cellular material (skin, scales, mucus, waste) into their environment. By filtering water from lakes, rivers, or soil from forest floors, researchers can extract this genetic material and sequence it using high-throughput metagenomic platforms.</p>
                <p>This methodology allows scientists to inventory entire ecosystems without ever seeing or capturing the target animals. In cryptozoology, eDNA acts as a rapid assessment tool. Instead of launching expensive, multi-year expeditions, researchers can analyze water samples to determine if an unknown primate or reptilian genetic signature is present in a specific watershed, transforming how we hunt for hidden species.</p>
            `
        },
        {
            title: "Cognitive Bias and Folkloric Anchoring",
            content: `
                <p>Human perception is highly subjective and easily influenced by expectation. **Pareidolia** leads people to see recognizable shapes (such as a humanoid figure or a long-necked animal) in random arrangements of shadows, branches, or water ripples. Once a belief in a local cryptid is established, it acts as a cognitive anchor, causing witnesses to interpret ordinary sights through the lens of that legend.</p>
                <p>Understanding these psychological phenomena is crucial for the field researcher. By analyzing sighting reports alongside weather conditions, lighting angles, and the witness's familiarity with local wildlife, investigators can filter out reports caused by cognitive bias, leaving a cleaner dataset of unexplained encounters.</p>
            `
        }
    ],
    ch1: [
        {
            title: "Relict Hominoids: Global Distribution Patterns",
            content: `
                <p>Of all cryptids, none occupy a larger space in global folklore than relict hominids. Across various continents, tales of large, hairy, bipedal primates persist. In North America, the Sasquatch or Bigfoot; in the Himalayas, the Yeti; in China, the Yeren. Academically, the primary hypothesis put forward by proponents is the survival of a relict lineage of <em>Gigantopithecus blacki</em>, a massive ape that inhabited Southeast Asia during the Pleistocene epoch, or an offshoot of early hominins such as <em>Homo erectus</em> or <em>Homo neanderthalensis</em>.</p>
                <p>Skeptics, conversely, highlight the lack of skeletal remains or fossil evidence supporting the existence of such a creature in North America. North American ecosystems contain no native hominid fossils. Biologists argue that sightings are overwhelmingly misidentifications of the American Black Bear (<em>Ursus americanus</em>) walking bipedally, or deliberate hoaxes.</p>
            `
        },
        {
            title: "The Fossil Gap: Gigantopithecus blacki",
            content: `
                <p><em>Gigantopithecus blacki</em> was the largest primate to ever walk the Earth, standing up to 10 feet tall and estimated to weigh over 800 pounds. First discovered in 1935 by G.H.R. von Koenigswald in a Hong Kong apothecary, the species is known only from fossilized teeth and a few jawbones. The fossil record indicates that <em>Gigantopithecus</em> went extinct approximately 300,000 years ago, likely due to climate shifts that replaced its forest habitat with savannahs.</p>
                <p>Proponents of the Sasquatch hypothesis argue that a relict population of <em>Gigantopithecus</em> could have adapted to temperate climates and migrated across the Bering land bridge during the late Pleistocene. However, the complete absence of hominid fossils in the Americas—aside from modern humans—remains a major hurdle for this theory, requiring a ghost lineage spanning hundreds of thousands of years.</p>
            `
        },
        {
            title: "Biomechanical Analysis of Patterson-Gimlin Film",
            content: `
                <p>The Patterson-Gimlin film, captured on October 20, 1967, at Bluff Creek, California, remains the most analyzed piece of cryptozoological footage. The 16mm film depicts a large, hairy, bipedal figure walking away from the camera. In 1999, biomechanical analyses by researchers like Dr. Jeff Meldrum highlighted several features that would have been difficult to replicate with 1960s suit technology.</p>
                <p>These features include a distinct mid-tarsal break (flexibility in the middle of the foot), compliant gait (walking with bent knees), and visible muscle contraction under the fur. Critics, however, argue that a skilled actor or stuntman wearing a custom-made suit could replicate these movements, and highlight inconsistencies in the filmmakers' accounts as evidence of a hoax.</p>
            `
        },
        {
            title: "Mid-tarsal Break: Primates Foot Morphology",
            content: `
                <p>Unlike humans, who have a rigid arch in their feet to facilitate efficient long-distance bipedal running, non-human primates possess a **mid-tarsal break**—a joint that allows the foot to flex in the middle. This flexibility is crucial for climbing and grasping branches, but it is rarely seen in bipedal locomotion.</p>
                <p>Analysis of several Bigfoot footprint casts, particularly the "Cripplefoot" track found in Bossburg, Washington, in 1969, reveals a distinct indentation indicative of a mid-tarsal break. Dr. Jeff Meldrum argues that this morphology would be highly difficult for a hoaxer to design, suggesting that if the tracks are real, they belong to an evolutionary branch that developed bipedalism independently of humans.</p>
            `
        },
        {
            title: "Bioacoustics: The Sierra Sounds Vocal Frequency",
            content: `
                <p>In the early 1970s, researchers Alan Berry and Ron Morehead recorded a series of unusual vocalizations in the Sierra Nevada mountains. Known as the "Sierra Sounds," these recordings feature low-frequency growls, high-pitched whistles, and rapid, complex vocal exchanges that do not match any known North American wildlife.</p>
                <p>Acoustic analysis performed by engineering consultants indicated that the vocalizations exhibited formant frequencies that fell outside the normal human range, suggesting a vocal tract larger than that of an average human. Critics argue that the recordings could have been faked using vocal techniques or audio modification, but the complexity of the acoustic patterns remains a subject of study.</p>
            `
        },
        {
            title: "DNA Analysis of Hominoid Hair Specimens",
            content: `
                <p>Over the years, numerous hair samples attributed to Bigfoot have been collected by field researchers. In 2014, a genetic study led by Professor Bryan Sykes of Oxford University analyzed 36 hair samples from around the world. The results showed that the majority of samples belonged to known native species, including bears, wolves, cows, and raccoons.</p>
                <p>Interestingly, two samples from the Himalayas matched a 40,000-year-old fossilized jawbone of a polar bear, suggesting a potential undiscovered sub-species of bear. While this study did not find evidence of a new hominoid, it demonstrated how DNA analysis can reveal unexpected biological facts from anomalous hair samples.</p>
            `
        },
        {
            title: "Yeti Folklore vs. Himalayan Bear DNA Relics",
            content: `
                <p>The Yeti, or "Abominable Snowman," is a central figure in Sherpa folklore, described as a wild man of the mountains. Monasteries in Nepal and Tibet hold relics, such as scalps and hand bones, said to belong to the creature. In 2017, a comprehensive genetic analysis of nine "Yeti" samples, including bones and skin, was conducted by Dr. Charlotte Lindqvist.</p>
                <p>The study concluded that eight of the samples belonged to local bear species, specifically the Himalayan brown bear (<em>Ursus arctos isabellinus</em>) and the Asian black bear (<em>Ursus thibetanus</em>), while one belonged to a dog. This research suggests that the Yeti legend is closely tied to local bear populations, which sometimes walk upright, creating the illusion of a bipedal ape.</p>
            `
        },
        {
            title: "Yeren: Wildman Expeditions in Central China",
            content: `
                <p>The Yeren, or "Wildman," is a cryptid reported from the mountainous Shennongjia region of Hubei Province, China. Described as standing 6 to 8 feet tall and covered in reddish-brown hair, it has been the subject of several government-sponsored expeditions since the 1970s.</p>
                <p>Chinese researchers have collected footprints, hair samples, and nests, but no physical carcass or skeletal remains have been recovered. Mainstream scientists suggest that Yeren sightings may be attributed to the endangered Golden Snub-nosed Monkey (<em>Rhinopithecus roxellana</em>), which has reddish fur and can move bipedally on the ground for short distances.</p>
            `
        },
        {
            title: "Orang Pendek: Sumatran Primary Rainforest Records",
            content: `
                <p>The Orang Pendek ("Short Man") is a cryptid reported from the dense rainforests of Sumatra, Indonesia. Unlike Bigfoot, it is described as relatively small, standing 3 to 5 feet tall, and covered in gray or honey-colored fur. Witness accounts from local farmers, national park rangers, and Western researchers describe it as a bipedal ground-dweller.</p>
                <p>The primary hypothesis is that the Orang Pendek represents an undiscovered species of ape, possibly related to the orangutan (<em>Pongo</em>), but adapted to a ground-dwelling, bipedal lifestyle. Footprints and hair samples collected by researchers have shown traits distinct from known Sumatran fauna, making it one of the most plausible candidates for a new species discovery.</p>
            `
        },
        {
            title: "Almas: Central Asian Hominin Survival Theory",
            content: `
                <p>The Almas is a bipedal cryptid reported from the Caucasus and Altai mountains of Central Asia. Described as more human-like than the North American Bigfoot, it is said to stand 5 to 6.5 feet tall, with a flat face, prominent brow ridges, and a body covered in thin hair. Local accounts describe them as simple, nomadic wild people.</p>
                <p>Some researchers, including the late Soviet historian Boris Porshnev, hypothesized that the Almas could represent a relict population of Neanderthals (<em>Homo neanderthalensis</em>) or <em>Homo erectus</em> that survived in isolation. However, the lack of archaeological or skeletal evidence makes this theory highly speculative.</p>
            `
        },
        {
            title: "Barmanou: The Hindu Kush Hominid Reports",
            content: `
                <p>The Barmanou is a bipedal, ape-like cryptid reported from the mountainous border region between Pakistan and Afghanistan. Sighted primarily by shepherds in the Hindu Kush range, the creature is described as possessing a strong animal odor and a body covered in shaggy hair.</p>
                <p>During the 1990s, French researcher Jordi Magraner conducted extensive interviews with local eyewitnesses, compiling detailed anatomical profiles. Magraner was tragically murdered in the field in 2002, halting systematic research into the creature. Sighting reports have since declined, possibly due to military conflicts in the region.</p>
            `
        },
        {
            title: "Mapimi Silent Zone: Hominid Migration Corridors",
            content: `
                <p>The Mapimí Silent Zone in Durango, Mexico, is a desert region known for unusual electromagnetic phenomena and biological adaptations. It is also the source of periodic reports of tall, bipedal, hairless hominids that travel across the desert plains at night.</p>
                <p>Unlike forest-dwelling hominids, these desert cryptids are described as lean and fast, suggesting adaptations to high temperatures and water scarcity. Researchers speculate that these sightings are either misidentifications of desert wildlife or nomadic groups of humans, as the harsh environment would make it difficult for an undiscovered primate population to survive.</p>
            `
        },
        {
            title: "Nutritional Models: Caloric Density in Coniferous Forests",
            content: `
                <p>A major criticism of the Bigfoot hypothesis is the nutritional requirements of a 700-pound hominid. In the temperate coniferous forests of the Pacific Northwest, caloric density is lower than in tropical rainforests, requiring a large animal to forage continuously or hunt large mammals like deer.</p>
                <p>IHSE researchers have modeled the nutritional carrying capacity of regional forests. The study indicates that if Bigfoot is omnivorous—feeding on berries, shoots, roots, fish, and deer—a single individual would require approximately 5,000 to 8,000 calories per day, indicating that home ranges would need to be extremely large, likely exceeding 50 square miles per individual.</p>
            `
        },
        {
            title: "Nest Construction and Sleeping Platform Analysis",
            content: `
                <p>In 2013, researchers in the Olympic Peninsula of Washington discovered a series of large, woven ground nests. Made from interlaced branches and pine needles, these nests resembled the sleeping platforms constructed by great apes like chimpanzees and gorillas, but were significantly larger, measuring up to 8 feet in diameter.</p>
                <p>Analysis of the structures showed that the branches had been bent and snapped with considerable force, at heights and angles that would be difficult for humans to achieve without tools. Hair samples recovered from the nests were analyzed, but the results were inconclusive, leaving the origin of the structures a mystery.</p>
            `
        },
        {
            title: "Sighting Densities and Rainfall Patterns Correlation",
            content: `
                <p>A 2009 statistical analysis of Bigfoot sighting reports in the United States revealed a strong correlation between sighting density and average annual rainfall. The majority of sightings occurred in regions with high precipitation, such as the Pacific Northwest and the Appalachian mountains.</p>
                <p>This correlation matches the distribution patterns of large mammals, which rely on high rainfall to support the vegetation that forms the base of their food web. Skeptics, however, point out that these regions also have high human population densities and outdoor recreation rates, increasing the probability of both genuine encounters and false reports.</p>
            `
        },
        {
            title: "Vocalization Syntactics: High-frequency Grunts",
            content: `
                <p>While the "Sierra Sounds" are famous for low-frequency growls, other reports of hominid vocalizations describe high-frequency, rapid chatter. These sounds resemble the vocalizations of some baboon species, which use complex sequences of grunts and barks to coordinate group movements in dense vegetation.</p>
                <p>IHSE bioacoustic teams have analyzed these recordings, searching for syntax and grammar patterns. The results show that while the vocalizations have structured pitch changes, they lack the complex acoustic patterns associated with human language, suggesting they are a form of primate communication rather than a dialect of an undiscovered human relative.</p>
            `
        },
        {
            title: "Fecal Sample Analysis: Parasitological Markers",
            content: `
                <p>Recovering physical waste is a goldmine for biologists, providing information on diet, health, and genetics. Several large fecal samples attributed to Bigfoot have been analyzed by veterinary laboratories. While some were identified as bear or elk waste, others contained unique parasite species.</p>
                <p>Specifically, some samples contained nematodes that are typically found in Old World primates, but are not native to North American wildlife. While this is not definitive proof of a new species, it suggests the presence of an animal with an evolutionary history distinct from native North American fauna.</p>
            `
        },
        {
            title: "Pathological Mimicry: Congenital Hypertrichosis",
            content: `
                <p>In historical accounts, some "wild men" captured in remote areas were found to be humans suffering from genetic conditions like **congenital hypertrichosis**, which causes excessive hair growth over the entire body. These individuals, isolated from society due to fear or superstition, lived in the wild, feeding on roots and small animals.</p>
                <p>This condition provides a biological explanation for some historical reports of hairy wild men. However, it cannot account for modern sightings of creatures standing 8 feet tall and possessing non-human biomechanics, suggesting that if a biological cryptid exists, it is a distinct species rather than a human variant.</p>
            `
        },
        {
            title: "Skeptical Consensus: Black Bear Bipedalism",
            content: `
                <p>The primary skeptical explanation for Bigfoot sightings is the bipedal behavior of the American Black Bear (<em>Ursus americanus</em>). When searching for food, investigating scents, or when injured, bears can stand and walk on their hind legs for distances of up to 100 yards, appearing humanoid from a distance.</p>
                <p>Under low-light conditions, a bipedal bear's silhouette matches the description of Bigfoot, with a bulky frame and no visible neck. IHSE field testing has shown that even experienced outdoor enthusiasts can mistake a standing bear for a bipedal primate, highlighting the need for careful visual verification.</p>
            `
        },
        {
            title: "Summary: Evolutionary Positioning of Hominid Cryptids",
            content: `
                <p>In summary, the study of terrestrial hominid cryptids is a search for surviving lineages of our evolutionary past. Whether Sasquatch is a descendant of <em>Gigantopithecus</em> or a relict hominin, its existence would have profound implications for our understanding of primate evolution and human history.</p>
                <p>To move from speculation to science, researchers must focus on collecting genetic evidence and locating skeletal remains. Until a holotype is recovered, the bipedal hominids will remain in the shadows of biology, representing a possibility that continues to capture the scientific imagination.</p>
            `
        }
    ],
    ch2: [
        {
            title: "Marine Megafauna: The Unexplored Abyssal Zone",
            content: `
                <p>Over seventy percent of the Earth's surface is covered by water, making aquatic environments the most plausible refuges for undiscovered megafauna. The ocean contains vast, unexplored depths, such as the abyssal zone, where species like the Coelacanth (<em>Latimeria chalumnae</em>), once thought extinct for 66 million years, survived undetected until 1938.</p>
                <p>In limnology, the study of inland waters, cryptids like the Loch Ness Monster represent a unique ecological paradox. The classic hypothesis suggests that "Nessie" represents a surviving lineage of plesiosaurs, marine reptiles that went extinct at the end of the Cretaceous period. However, this theory faces insurmountable biological hurdles: Plesiosaurs were air-breathing reptiles, meaning they would need to surface constantly, leading to thousands of verified sightings.</p>
            `
        },
        {
            title: "The Coelacanth Precedent: Surviving Extinction Events",
            content: `
                <p>The discovery of the Coelacanth in 1938 off the coast of South Africa is the most famous example of a **Lazarus taxon**—a species that disappears from the fossil record only to reappear alive. Prior to this discovery, coelacanths were believed to have gone extinct at the end of the Cretaceous period, 66 million years ago.</p>
                <p>The coelacanth's survival shows that deep-sea environments can shield species from global extinction events. Cryptozoologists use this precedent to argue that other prehistoric marine creatures, such as plesiosaurs or giant sharks, could have survived in the deep oceans, though marine biologists point out that the coelacanth is a small, deep-water fish rather than a massive surface reptile.</p>
            `
        },
        {
            title: "Plesiosaur Hypothesis: Lung Capacity & Ecology",
            content: `
                <p>The hypothesis that lake monsters are surviving plesiosaurs is popular in folklore, but it fails standard physiological tests. Plesiosaurs were reptiles and possessed lungs, meaning they had to surface to breathe air. In a small, closed ecosystem like Loch Ness, a breeding population of large, air-breathing reptiles would be spotted constantly by locals and tourists.</p>
                <p>Furthermore, plesiosaurs were adapted to warm, tropical seas. Loch Ness is a cold, glacial lake with temperatures averaging 5°C (41°F) year-round. A reptile, being ectothermic (cold-blooded), would be unable to maintain metabolic functions in such cold water, making the plesiosaur hypothesis biologically impossible.</p>
            `
        },
        {
            title: "Sonar Anomalies: Thermoclines and False Echoes",
            content: `
                <p>Over the years, several sonar surveys of Loch Ness have registered large, moving targets in the deep water. Proponents argue these are the monster, but oceanographers point out that Loch Ness is subject to **thermoclines**—layers of water with sharp temperature differences that reflect sonar waves, creating false echo readings.</p>
                <p>These thermoclines, combined with schools of fish or floating debris, can mimic the sonar signature of a large, solid object. Modern surveys use multi-beam sonar and underwater cameras to verify targets, showing that the majority of sonar anomalies are caused by environmental reflections rather than giant animals.</p>
            `
        },
        {
            title: "Loch Ness eDNA Metagenomic Survey Results",
            content: `
                <p>In 2018, an international team led by Professor Neil Gemmell of the University of Otago conducted a comprehensive eDNA survey of Loch Ness. They collected over 250 water samples from different depths and locations, extracting and sequencing the DNA to build a genetic profile of the lake's biodiversity.</p>
                <p>The results, published in 2019, revealed no reptilian DNA, nor any trace of large sharks or sturgeons. However, the study found a high concentration of European Eel (<em>Anguilla anguilla</em>) DNA, leading the researchers to suggest that sightings of long, serpentine shapes could be explained by unusually large eels living in the loch.</p>
            `
        },
        {
            title: "The European Eel Gigantism Theory",
            content: `
                <p>Following the 2019 eDNA study, the "giant eel" theory became the leading biological explanation for the Loch Ness Monster. The European Eel (<em>Anguilla anguilla</em>) is common in the lake. While they typically grow to 2 to 3 feet in length, some individuals can experience genetic anomalies that delay maturation, allowing them to grow much larger.</p>
                <p>An eel measuring 6 to 8 feet in length, swimming near the surface with an undulating motion, could explain sightings of a serpentine monster. While this theory is biologically plausible, the IHSE notes that it would require an extreme case of gigantism to match the larger size estimates reported by witnesses.</p>
            `
        },
        {
            title: "Giant Squid Verification Timeline",
            content: `
                <p>The Giant Squid (<em>Architeuthis dux</em>) was once considered a cryptid, described by sailors as the ship-sinking Kraken. In 1857, Danish zoologist Japetus Steenstrup examined a washed-up beak and officially described the species, moving it from myth to zoology.</p>
                <p>Despite its official recognition, it took nearly 150 years for scientists to capture the first photographs of a live giant squid in its natural habitat, taken in 2004 by Japanese researchers. This timeline highlights how difficult it is to document deep-sea creatures, proving that large marine animals can remain unphotographed for centuries.</p>
            `
        },
        {
            title: "Cadborosaurus: Pacific Northwest Sea Serpents",
            content: `
                <p>Cadborosaurus, nicknamed "Caddy," is a sea serpent reported from the waters of Cadboro Bay in British Columbia, Canada. Described as possessing a camel-like head, long neck, and flippers, it has been sighted by sailors, fishermen, and beachgoers since the 1930s.</p>
                <p>In 1937, a carcass was recovered from the stomach of a sperm whale at the Naden Harbour whaling station. Photographs of the carcass show an elongated body that resembles a sea serpent. While some biologists believe it was a deformed fetal baleen whale or a basking shark carcass, the true identity of the Naden Harbour specimen remains a subject of debate.</p>
            `
        },
        {
            title: "Champ: Lake Champlain Echo-location Recordings",
            content: `
                <p>Champ is a lake cryptid reported from Lake Champlain, a deep freshwater lake between Vermont and New York. Like Nessie, Champ is described as a long-necked animal. In 2003, researchers from the Fauna Communications Research Institute recorded unusual underwater clicking sounds in the lake.</p>
                <p>These sounds resembled the echolocation clicks used by beluga whales and dolphins to navigate and hunt in dark water. Since no cetaceans inhabit Lake Champlain, some researchers argue these recordings are evidence of an undiscovered aquatic mammal or reptile that uses echolocation to navigate the lake's depths.</p>
            `
        },
        {
            title: "Mokele-Mbembe: Congo Basin Swamps Biogeography",
            content: `
                <p>Mokele-Mbembe is a semi-aquatic cryptid reported from the Likouala swamp region of the Congo River basin. Sighted by Pygmy tribes and explorers, the creature is described as resembling a sauropod dinosaur, with a heavy body, long neck, and tail. Local reports state it feeds on river vegetation and kills hippopotamuses.</p>
                <p>The Likouala region contains vast, unexplored swamps that have remained ecologically stable for millions of years. Proponents argue this environment could have supported a relict population of dinosaurs, though biologists point out that the lack of fossil evidence post-Cretaceous makes the survival of sauropods highly improbable.</p>
            `
        },
        {
            title: "Lake Tele Expeditions: Historical Retrospective",
            content: `
                <p>Lake Tele, a shallow circular lake in the heart of the Congo swamps, is the center of Mokele-Mbembe lore. Since the early 20th century, several expeditions have attempted to locate the creature. In 1981, American biologists Roy Mackal and Marcellin Agnagna led expeditions to the lake, reporting footprint tracks and distant water disturbances.</p>
                <p>Agnagna claimed to have briefly sighted the creature, describing a long neck rising from the water, but his photographic equipment was set incorrectly, failing to capture clear evidence. Subsequent expeditions have failed to produce verifiable proof, leaving Mokele-Mbembe as a symbol of deep-jungle mysteries.</p>
            `
        },
        {
            title: "Steller's Sea Ape: Historical Log Analysis",
            content: `
                <p>In 1741, German naturalist Georg Wilhelm Steller, sailing with Vitus Bering's Alaskan expedition, recorded an encounter with an animal he termed the "Sea Ape" off the coast of Shumagin Islands. Steller described a creature about two yards long, with a dog-like head, long whiskers, and a tail divided into two fins.</p>
                <p>Steller was a respected observer, and his descriptions of other marine animals (such as Steller's Sea Cow) were accurate. Because no animal matching the "Sea Ape" has since been described from the North Pacific, some marine biologists believe Steller observed a playfull young fur seal, while others speculate it was an undiscovered species of marine mammal.</p>
            `
        },
        {
            title: "Kraken Myths: Cephalopod Gigantism Limits",
            content: `
                <p>While the giant squid is verified, historical accounts of the Kraken describe a creature much larger, capable of pulling down multi-masted ships. Marine biologists have studied the limits of cephalopod gigantism, looking at oxygen levels, water pressure, and metabolic constraints.</p>
                <p>The maximum size for a squid is believed to be around 60 feet, beyond which the nervous system would be unable to transmit signals fast enough to coordinate the tentacles. Thus, while giant squids are real, the island-sized Kraken of folklore is a mythological exaggeration based on real sightings of floating carcasses.</p>
            `
        },
        {
            title: "Megalodon Survival: Caloric Limits in Deep Oceans",
            content: `
                <p>The theory that the giant prehistoric shark Megalodon (<em>Otodus megalodon</em>) survives in the deep ocean is popular in fiction. However, Megalodon was a warm-water predator that specialized in hunting whales in shallow coastal seas. The deep ocean is cold and has a low concentration of large prey.</p>
                <p>A shark the size of Megalodon (estimated up to 60 feet) would be unable to survive on the scarce resources of the deep-sea plain. Additionally, as a top predator, Megalodon would leave clear signs of its presence, such as bite marks on whales and washed-up teeth, none of which have been found since its extinction 3.6 million years ago.</p>
            `
        },
        {
            title: "Blobfish and Deep-Sea Gelatinous Organisms",
            content: `
                <p>The discovery of the blobfish (<em>Psychrolutes marcidus</em>) and other deep-sea organisms highlights how pressure affects morphology. In its natural deep-water habitat (up to 4,000 feet), the blobfish looks like a typical bony fish. When brought to the surface, the drop in pressure causes its gelatinous body to collapse into a soft blob.</p>
                <p>This morphological change explains why many deep-sea carcasses washed up on beaches look like amorphous "blobs" or sea monsters. Forensic examination of these carcasses, known as **globsters**, has consistently identified them as decomposed whale blubber or shark skins rather than new species.</p>
            `
        },
        {
            title: "Thermal Vents and Chemoautotrophic Ecosystems",
            content: `
                <p>In 1977, oceanographers discovered hydrothermal vents on the ocean floor, surrounded by complex ecosystems that do not rely on sunlight. Instead, bacteria perform **chemosynthesis**, converting hydrogen sulfide from the vents into energy, supporting giant tube worms, blind crabs, and specialized fish.</p>
                <p>The discovery of these hydrothermal ecosystems proved that life can thrive in conditions previously thought uninhabitable. This supports the general cryptozoological argument that the deep ocean could host entirely undiscovered classes of large organisms that remain hidden from surface-based science.</p>
            `
        },
        {
            title: "Hydroacoustic Anomalies: The 'Bloop' Analysis",
            content: `
                <p>In 1997, the U.S. National Oceanic and Atmospheric Administration (NOAA) recorded an ultra-low-frequency underwater sound. Known as the "Bloop," the sound was picked up by hydrophones across the Pacific Ocean, traveling over 3,000 miles. Its acoustic profile resembled that of a living organism, but on a scale far larger than a blue whale.</p>
                <p>Speculation grew that the Bloop was produced by a giant marine cryptid. However, in 2012, NOAA confirmed that the acoustic signature matched that of a **glacierquake**—the cracking and calving of massive icebergs in Antarctica, resolving the mystery with environmental geology.</p>
            `
        },
        {
            title: "Sea Serpent Sightings and Refraction Anomalies",
            content: `
                <p>Many sea serpent reports describe a creature with multiple humps undulating through the water. Metrological analysis shows that some of these sightings are caused by **Fata Morgana**—a complex mirage caused by temperature inversions that bend light rays, distorting distant objects.</p>
                <p>Under these atmospheric conditions, ordinary objects like low-lying islands, rocks, or a line of seabirds can appear elongated and elevated, resembling a giant, multi-humped serpent. IHSE field teams document these conditions to evaluate the reliability of marine sighting reports.</p>
            `
        },
        {
            title: "Limnological Eutrophication and Cryptid Extinction",
            content: `
                <p>Even if a large cryptid population survived in a freshwater lake, modern environmental changes present a serious threat to their survival. **Eutrophication**—caused by agricultural runoff that feeds algae blooms—depletes oxygen levels in the water, leading to massive fish kills.</p>
                <p>For a large aquatic predator, the loss of prey and oxygen would be fatal. This suggests that if some lakes hosted undiscovered megafauna in the early 20th century, human industrial and agricultural activities may have driven them to extinction before they could be documented, highlighting the urgency of conservation biology.</p>
            `
        },
        {
            title: "Summary: Aquatic Cryptids as Bio-Indicators",
            content: `
                <p>In summary, the search for aquatic cryptids is a exploration of the Earth's final frontiers. While lake monsters like Nessie face strong biological and historical arguments, the deep oceans remain a plausible source of major zoological discoveries.</p>
                <p>By studying anomalies in sonar, genetics, and acoustics, researchers can discover new species and monitor the health of deep-water ecosystems, proving that the search for hidden life has practical benefits for modern marine science.</p>
            `
        }
    ],
    ch3: [
        {
            title: "Flight Biomechanics: Wing loading Limits",
            content: `
                <p>The sky presents the hardest medium in which to conceal a breeding population of large creatures. Yet, reports of winged cryptids like the Mothman of Point Pleasant, West Virginia, and the Native American legends of the Thunderbird remain prominent. The Mothman, described as a gray, winged, humanoid figure standing 7 feet tall with glowing red eyes, was sighted repeatedly in 1966–1967.</p>
                <p>From a biological perspective, a humanoid flying creature violates the laws of biomechanics. For a human-sized animal to achieve lift, its pectoralis muscles would need to project outward by several feet to power wings with a span of at least 20 to 25 feet. Humans lack the keeled sternum found in birds and bats that anchors such muscles. Additionally, the metabolic cost of flight for a 200-pound hominid would require an enormous caloric intake, far exceeding what could be obtained covertly in temperate forests.</p>
            `
        },
        {
            title: "Mothman Sighting Chronology: Point Pleasant",
            content: `
                <p>The Mothman sightings began on November 12, 1966, when five gravediggers in Clendenin, West Virginia, reported a brown, winged humanoid rising from the trees. Three days later, two young couples in Point Pleasant reported a large, gray, flying creature with glowing red eyes near the "TNT Area"—an abandoned WWII munitions plant.</p>
                <p>Over the next thirteen months, dozens of sightings were reported, accompanied by reports of electromagnetic interference, animal mutilations, and mysterious visitors. The sightings ended abruptly on December 15, 1967, following the tragic collapse of the Silver Bridge, which killed 46 people, cementing the Mothman's reputation as a harbinger of doom.</p>
            `
        },
        {
            title: "The Silver Bridge Collapse: Folkloric Prophecy",
            content: `
                <p>The connection between the Mothman and the Silver Bridge collapse is a classic example of **retroactive folkloric forecasting**. Following the disaster, witnesses connected the sightings of the winged creature to the bridge failure, suggesting it was either a warning or the cause of the collapse.</p>
                <p>Official investigations by the National Transportation Safety Board (NTSB) identified the cause as a structural failure: a single fracture in an eye-bar joint, exacerbated by corrosion and overloading. While the engineering explanation is clear, the folklore of the Mothman remains a study in how communities cope with sudden tragedy through myth-making.</p>
            `
        },
        {
            title: "Avian Misidentification: The Sandhill Crane",
            content: `
                <p>The leading ornithological explanation for the Mothman is the Sandhill Crane (<em>Antigone canadensis</em>). These large birds stand up to 4 feet tall, have a wingspan of over 6 feet, and feature prominent red patches around their eyes that reflect light intensely at night, creating the appearance of glowing red eyes.</p>
                <p>Additionally, the crane's cry is a loud, metallic shriek that matches descriptions of the Mothman's vocalizations. Sighted in the dense foliage of the TNT Area, a Sandhill Crane could easily be mistaken for a humanoid figure by witnesses primed by fear, showing how easily ordinary wildlife can be misidentified.</p>
            `
        },
        {
            title: "Pterosaur Survival Theories: Papua New Guinea Ropen",
            content: `
                <p>The Ropen is a winged cryptid reported from the island of New Guinea. Described as a featherless, flying reptile with a long tail and a beak filled with teeth, it is said to exhibit bioluminescence when flying at night. Some creationist and cryptozoological groups argue the Ropen is a surviving pterosaur.</p>
                <p>Biologists reject this theory, pointing out that pterosaurs went extinct 66 million years ago. Furthermore, a flying reptile would leave clear skeletal remains and face competition from birds and bats. Sighting reports of the Ropen are generally attributed to large fruit bats, such as the flying fox, or fireflies reflecting off water.</p>
            `
        },
        {
            title: "Thunderbird Legends: Native American Oral History",
            content: `
                <p>The Thunderbird is a powerful spirit in many Native American cultures, described as a giant bird capable of creating thunder by flapping its wings. In the late 19th and 20th centuries, reports of giant birds with wingspans exceeding 15 feet were documented in North America, leading some to argue the legend is based on real animals.</p>
                <p>Anatomically, these reports may refer to extinct Pleistocene birds like <em>Teratornis merriami</em>, which had a wingspan of 12 feet, or surviving populations of the California Condor (<em>Gymnogyps californianus</em>), which has a 9.5-foot wingspan. While these birds are large, their size is often exaggerated in oral histories, transforming a real predator into a mythological spirit.</p>
            `
        },
        {
            title: "Jersey Devil: Pine Barrens Ecological Anomalies",
            content: `
                <p>The Jersey Devil is a legendary creature said to inhabit the Pine Barrens of southern New Jersey. Described as possessing a horse-like head, bat wings, cloven hooves, and a tail, its origin is tied to a 1735 legend of Mother Leeds' cursed 13th child. Sighted repeatedly in 1909, it caused widespread panic.</p>
                <p>The Pine Barrens is a unique, acidic forest ecosystem that covers over a million acres. While it hosts unique flora and fauna, its low nutritional capacity and dense canopy make it an unlikely habitat for a large, flying carnivore. The Jersey Devil is widely regarded as a combination of political hoaxes, ghost stories, and misidentified owls.</p>
            `
        },
        {
            title: "Giant Bats: Megachiroptera in South America",
            content: `
                <p>Reports of human-sized bats, known as the **Ahool** in Indonesia or the **Camazotz** in Mayan mythology, persist in tropical regions. While the largest known bats, the flying foxes, have wingspans of up to 5.5 feet, they are herbivorous, feeding on fruit and nectar, and possess small, non-threatening heads.</p>
                <p>The discovery of fossilized remains of giant vampire bats (<em>Desmodus draculae</em>) in South America, which went extinct recently, suggests that legends of predatory flying mammals may have a historical basis. However, their size was much smaller than the human-sized beasts of folklore, which violate biomechanical weight limits for flight.</p>
            `
        },
        {
            title: "Atmospheric Beasts: Theoretical Aeroplankton",
            content: `
                <p>A fringe theory in cryptozoology suggests the existence of **atmospheric beasts**—low-density, gelatinous organisms that live entirely in the upper atmosphere, floating like jellyfish in the ocean. These creatures, constructed of light, transparent tissues, would be invisible to radar and human eyes under normal conditions.</p>
                <p>While creative, this theory lacks biological basis. The upper atmosphere is cold, dry, and subject to intense solar radiation, providing no food source to support a large organism. Mainstream science attributes "atmospheric beast" reports to meteorological phenomena, weather balloons, or optical lens flares.</p>
            `
        },
        {
            title: "Kongamato: Winged Cryptids of Zambia Swamps",
            content: `
                <p>The Kongamato ("Overturner of Boats") is a flying cryptid reported from the Jiundu swamps of northwestern Zambia. Sighted by locals and explorers like Frank Melland in the 1920s, it is described as a red or black lizard-like creature with leathery wings, a long beak, and teeth.</p>
                <p>Locals, when shown drawings of prehistoric pterosaurs, identified them as the Kongamato. Biologists suggest that sightings are misidentifications of the Shoebill Stork (<em>Balaeniceps rex</em>), a large bird with a massive, boat-shaped bill and a grey silhouette that can appear prehistoric when flying at dusk.</p>
            `
        },
        {
            title: "Nocturnal Raptor Vision and Retinal Reflectivity",
            content: `
                <p>Many winged cryptid sightings describe glowing eyes. In biology, this reflection is caused by the **tapetum lucidum**—a retroreflector layer behind the retina in many nocturnal animals that reflects visible light back through the photoreceptors, increasing sensitivity in low light.</p>
                <p>Birds like owls and nightjars possess highly reflective eyes that appear as bright red or gold disks when illuminated by a flashlight. Sighted in a tree, a large owl's reflective eyes can appear humanoid in height, showing how a simple optical reflection can be misinterpreted as a monster.</p>
            `
        },
        {
            title: "Wing Structures: Pterosaur vs. Chiropteran vs. Avian",
            content: `
                <p>The three groups of vertebrate flyers developed wings independently, using different anatomical adaptations. Pterosaur wings were formed by a membrane stretched from a single, elongated fourth finger. Bat (chiropteran) wings are formed by a membrane supported by four elongated fingers. Bird (avian) wings are formed by feathers attached to fused arm and hand bones.</p>
                <p>Witness descriptions of winged humanoid cryptids often conflate these structures, describing featherless, bat-like wings on a humanoid body. Because such a design lacks the muscle anchor points found in bats and birds, it is structurally inefficient, proving that these descriptions are products of imagination rather than anatomy.</p>
            `
        },
        {
            title: "Aerodynamic Lift Equations for Large Vertebrates",
            content: `
                <p>To evaluate if a cryptid could fly, physicists use the lift equation: <em>L = 0.5 * d * v² * s * Cl</em>, where <em>d</em> is air density, <em>v</em> is velocity, <em>s</em> is wing surface area, and <em>Cl</em> is the lift coefficient. For an animal weighing 200 pounds, the wing area <em>s</em> must be massive to generate sufficient lift at normal flight speeds.</p>
                <p>The largest flying bird in history, the extinct Argentavis, weighed approximately 150 pounds and had a wingspan of 20 feet. It relied on wind currents and thermals to soar, rather than continuous flapping. A humanoid flyer would have to follow similar aerodynamic constraints, making active flight in dense forests impossible.</p>
            `
        },
        {
            title: "Owls and the Psychology of Nighttime Apparitions",
            content: `
                <p>The Great Horned Owl (<em>Bubo virginianus</em>) stands up to 2 feet tall and has a 4-foot wingspan. Sighted at night, their silent flight and flat, round face can appear ghostly and humanoid. The owl's habit of defense—expanding its wings and swaying—can make it appear much larger to a startled observer.</p>
                <p>Psychologists have shown that fear reduces visual acuity and increases suggestibility. An unexpected encounter with a nesting owl at night can trigger a fight-or-flight response, leading the witness to describe a giant, red-eyed demon rather than a bird, explaining many Mothman and Jersey Devil reports.</p>
            `
        },
        {
            title: "Atmospheric Pressure and Avian Sightings",
            content: `
                <p>Changes in atmospheric pressure ahead of storms affect bird behavior. Many large birds, like pelicans and storks, use the rising thermals ahead of a cold front to soar high in the air, seeking to escape the storm. This concentrated group flight, known as **kettling**, can make groups of birds appear anomalous to ground observers.</p>
                <p>During these pressure drops, bird silhouettes can appear larger due to atmospheric distortion, leading to spikes in "Thunderbird" reports. By tracking weather data alongside sighting dates, IHSE researchers can identify these weather-induced biological events.</p>
            `
        },
        {
            title: "The Minotaur-Hawk Folklore of the Andes",
            content: `
                <p>In the high Andes of South America, stories of the "Minotaur-Hawk" describe a creature with the head of a bull and the body of a giant bird. This folklore is believed to be inspired by the Andean Condor (<em>Vultur gryphus</em>), the largest flying bird in the Western Hemisphere.</p>
                <p>Male condors have a fleshy crest, or caruncle, on their heads that resembles a bull's comb. Sighted from below against the bright sky, the condor's silhouette can appear distorted, showing how a distinctive anatomical feature can be transformed into a hybrid monster in local mythology.</p>
            `
        },
        {
            title: "Historical Flying Reptile Woodcuts Analysis",
            content: `
                <p>Some cryptozoological books feature 16th and 17th-century woodcuts depicting dragons and winged serpents as evidence that pterosaurs survived into historical times. IHSE historians have analyzed these woodcuts, looking at the artistic conventions of the era.</p>
                <p>During the Renaissance, artists relied on descriptions from classic authors rather than direct observation, often drawing animal parts from different species (such as bat wings on a snake body) to represent mythical concepts. These woodcuts are valuable historical records of folklore, but they do not constitute anatomical evidence of surviving reptiles.</p>
            `
        },
        {
            title: "Radar Anomalies: Migratory Birds and Stealth Cryptids",
            content: `
                <p>Air traffic control radar sometimes registers unexplained targets, known as **angels**. Proponents of atmospheric cryptids suggest these are biological entities. However, radar technicians have shown that these targets are caused by flocks of migratory birds, swarms of insects, or atmospheric temperature layers.</p>
                <p>Modern weather radar can filter out biological targets, showing that there are no large, unexplained flying organisms in the airspace. This complete absence of radar evidence is a strong argument against the existence of giant, high-altitude winged cryptids.</p>
            `
        },
        {
            title: "Bioluminescence in Flying Hominids",
            content: `
                <p>The "Ropen" of Papua New Guinea is said to emit a bright blue-green light from its tail. While bioluminescence is common in marine organisms and insects (like fireflies), it is extremely rare in terrestrial vertebrates, with no known species of bird, mammal, or reptile possessing this ability.</p>
                <p>For a flying vertebrate, bioluminescence would require specialized photophore organs and a chemical reaction (such as luciferin oxidation). Without a clear evolutionary pathway for this trait in land vertebrates, the Ropen's light is likely an optical illusion caused by reflection off damp feathers or nocturnal insects.</p>
            `
        },
        {
            title: "Summary: Aerial Cryptids and Aerodynamic Realities",
            content: `
                <p>In summary, reports of winged cryptids are heavily constrained by the laws of physics and aerodynamics. While folklore paints a picture of giant birds and flying humanoids, biology demands that any flying organism possess the necessary structures to generate lift and sustain flight.</p>
                <p>By analyzing sightings through the lens of ornithology and biomechanics, researchers can explain most encounters as misidentified native birds, leaving the winged monsters in the realm of cultural myth and psychological projection.</p>
            `
        }
    ],
    ch4: [
        {
            title: "Field Forensics: Preservation of Evidence",
            content: `
                <p>Field research in cryptozoology requires strict adherence to forensic science protocols to avoid contamination and bias. When investigating a potential cryptid site, the researcher focuses on physical trace evidence: footprint tracks, hair samples, vocalizations, and genetic material.</p>
                <h3>Trackway Analysis</h3>
                <p>Footprints are the most common physical evidence. To document a trackway, the researcher must photograph it from multiple angles with a scale marker, measure the stride length, straddle width, and depth of the impression. To calculate weight, the soil compactness must be measured using a penetrometer. Plaster casts must be made using high-quality dental stone (Plaster of Paris) rather than regular plaster to preserve microscopic details, such as dermal ridges (the skin patterns on the soles of feet). The presence of consistent dermal ridges across multiple tracks is a key indicator of authentic biological origins, as duplicating these ridges in artificial molds is extremely difficult.</p>
            `
        },
        {
            title: "Trackway Preservation: Plaster vs. Dental Stone",
            content: `
                <p>When preserving a footprint in the field, the choice of casting material is critical. Common plaster of Paris is cheap and easy to find, but it shrinks slightly as it cures and is brittle, which can erase fine details like skin textures or claw marks.</p>
                <p>IHSE teams use **dental stone** (a type of gypsum plaster). Dental stone has a higher compressive strength and minimal expansion during setting, allowing it to capture microscopic dermal ridges (the skin patterns on the soles of feet). These ridges are crucial for proving a track was made by a living animal rather than an artificial mold.</p>
            `
        },
        {
            title: "Soil Compaction and Weight Estimation Formulas",
            content: `
                <p>To estimate the weight of an animal from its footprint, researchers must measure the depth of the impression and the density of the soil. This is done using a **cone penetrometer**, which measures the force required to push a probe into the soil next to the track.</p>
                <p>Using the formula: <em>Weight = Foot Area * Soil Strength * Depth</em>, physicists can estimate the weight required to make the impression. If a trackway shows a depth that requires a weight of 800 pounds in compact soil, it rules out human hoaxers unless they were carrying heavy weights, helping to filter out hoaxes.</p>
            `
        },
        {
            title: "Microscopic Hair Analysis: Cuticle Scale Patterns",
            content: `
                <p>Hair is a common trace evidence found at suspected cryptid nests or feeding sites. Under a microscope, mammalian hair exhibits three structures: the cuticle (outer scale layer), the cortex (middle color layer), and the medulla (inner core).</p>
                <p>By making a mold of the hair surface in clear lacquer, researchers can analyze the **cuticle scale pattern**. Known species have distinct patterns (such as the mosaic pattern of primates or the coronal pattern of bats). Deviations in these scale patterns can indicate a hair sample belongs to an undescribed species.</p>
            `
        },
        {
            title: "Medulla Indexes: Distinguishing Mammalian Species",
            content: `
                <p>The **medulla index** is the ratio of the medulla's diameter to the total hair shaft diameter. In humans, the medulla is typically narrow or absent (index < 0.33). In most other mammals, the medulla is wide and continuous (index > 0.50).</p>
                <p>When analyzing a hair sample, the medulla structure (continuous, interrupted, or fragmented) and its index help identify the origin. A sample that shows primate-like scale patterns but a wide, continuous medulla (typical of arctic animals) suggest a primate adapted to cold climates, a key signature for the Yeti or Bigfoot.</p>
            `
        },
        {
            title: "eDNA Capture: Water Filtration Protocols",
            content: `
                <p>Collecting environmental DNA (eDNA) from aquatic environments requires sterile protocols to avoid cross-contamination. Field researchers collect water samples using sterile bottles, then pass the water through a **0.22-micrometer filter** using a vacuum pump to capture suspended cells and DNA fragments.</p>
                <p>The filter is then preserved in a lysis buffer or ethanol and shipped to a clean laboratory. Because eDNA is highly sensitive, researchers must wear clean suits and use field controls (filtering sterile water) to verify that no human DNA or contaminants are introduced during the collection process.</p>
            `
        },
        {
            title: "Polymerase Chain Reaction (PCR) in Field Labs",
            content: `
                <p>Once eDNA is extracted, the amount of genetic material is often too small to analyze directly. Researchers use **Polymerase Chain Reaction (PCR)** to amplify specific target genes, such as the mitochondrial cytochrome c oxidase subunit I (COI) gene, which serves as a DNA barcode for animal life.</p>
                <p>By using primers that bind only to mammalian or vertebrate DNA, PCR can amplify target sequences millions of times, making them readable by DNA sequencers. This process allows researchers to identify even low concentrations of genetic material in field samples.</p>
            `
        },
        {
            title: "Metagenomic Sequencing and Bioinformatics",
            content: `
                <p>After PCR amplification, the DNA is sequenced using next-generation platforms. The resulting data is analyzed using **bioinformatics pipelines** that compare the sequences against global databases like GenBank, which contains genetic records for millions of described species.</p>
                <p>If a sequence shows a high match (e.g., 98%) to known primates but does not align with any cataloged species, it indicates an undocumented animal. The researcher must then isolate this sequence and perform phylogenetic analysis to determine its position on the evolutionary tree.</p>
            `
        },
        {
            title: "Bioacoustic Recorder Deployment Strategies",
            content: `
                <p>Passive acoustic monitoring uses Autonomous Recording Units (ARUs) to record environmental sounds over weeks or months. For cryptid research, ARUs are deployed in a grid pattern across a watershed, allowing researchers to triangulate the location of unusual sounds.</p>
                <p>The recorders are set to capture high-frequency and low-frequency sounds, ensuring they can record both the infrasound growls of large mammals and the ultrasonic clicks of bats. By running continuously, ARUs can capture sounds that would be missed by human observers.</p>
            `
        },
        {
            title: "Spectrogram Analysis: Formants & Harmonics",
            content: `
                <p>Spectrograms convert audio recordings into visual displays, showing frequency (pitch) on the vertical axis and time on the horizontal axis. Analyzing these displays allows bioacoustic experts to identify the physical characteristics of the sound source.</p>
                <p>Living organisms produce sounds with structured **harmonics** (overtones) and **formants** (frequency peaks determined by vocal tract shape). Mechanical sounds, like wind or machinery, lack these structures. By analyzing the spacing of harmonics, researchers can estimate the physical size of the animal's vocal tract.</p>
            `
        },
        {
            title: "Camera Trapping: Sensor Sensitivity and Placement",
            content: `
                <p>Camera traps are critical tools for documenting elusive animals. Modern camera traps use **Passive Infrared (PIR) sensors** that trigger the camera when they detect a change in temperature and movement. To capture a cryptid, placement must be carefully planned.</p>
                <p>Cameras are placed along game trails, near water sources, or at bait stations. To avoid detection by animals with sensitive vision or hearing, cameras must be silent and use infrared flashes that are invisible to most species. IHSE teams use multiple cameras to capture different angles, preventing false readings.</p>
            `
        },
        {
            title: "Triangulation: Eye-Shine Heights Measurement",
            content: `
                <p>Many nocturnal eyewitness accounts describe glowing eyes at heights of 7 to 8 feet. To verify these heights, researchers perform **triangulation** at the sighting site. By identifying the exact spot where the creature stood and using a laser rangefinder, they measure the height against tree trunks.</p>
                <p>This measurement helps distinguish between animal encounters and human hoaxes. If a tree trunk shows scratch marks or hair at the same height as the reported eye-shine, it provides physical evidence that supports the witness's account, helping to define the creature's physical size.</p>
            `
        },
        {
            title: "Fecal DNA Analysis: Diet Reconstruction",
            content: `
                <p>Fecal samples, or scat, provide a wealth of information. By extracting DNA from scat and sequencing it, researchers can identify the animal that produced it and reconstruct its diet by analyzing the DNA of the plants and animals it consumed.</p>
                <p>This process, known as **metabarcoding**, allows scientists to understand the ecological niche of an undocumented animal. If a scat sample contains primate DNA alongside the DNA of local forest plants and deer, it provides strong evidence of an omnivorous hominid living in the area.</p>
            `
        },
        {
            title: "Bone Degradation in Acidic Forest Soils",
            content: `
                <p>A common argument against Bigfoot is: "If they are real, why don't we find their bones?" In the temperate forests of the Pacific Northwest, the soil is highly acidic, created by decomposing pine needles. Acidic soil degrades bones rapidly, dissolving calcium carbonate within a few years.</p>
                <p>Additionally, forest scavengers—such as rodents, porcupines, and coyotes—consume bones for their mineral content, chewing them until nothing remains. This rapid degradation explains why skeletal remains of even common wildlife, like bears and cougars, are rarely found by hikers, showing how a population could exist without leaving fossil evidence.</p>
            `
        },
        {
            title: "Differentiating Mechanical Soundscapes",
            content: `
                <p>When analyzing field recordings, researchers must filter out mechanical noises that can mimic animal sounds. For example, a squeaking branch rubbing against another tree can sound like a high-pitched cry, and wind blowing across a hollow log can create a low-frequency hum.</p>
                <p>IHSE acoustic engineers use **cross-correlation algorithms** to compare anomalous recordings against databases of mechanical sounds. By analyzing the stability of the frequency peaks, they can identify mechanical noises, ensuring only biological sounds are analyzed.</p>
            `
        },
        {
            title: "Photographic Parallax and Scale Verification",
            content: `
                <p>To verify the size of a creature in a photograph, researchers use **parallax analysis**. By visiting the exact location where the photo was taken and placing objects of known size (such as a survey rod) at the same distance, they reconstruct the scale.</p>
                <p>This method helps detect hoaxes and misidentifications. If a photo shows a "giant" monster, but parallax analysis reveals the object was only 2 feet long, it proves the sighting was either a hoax or a misidentified small animal, providing a rigorous check on visual evidence.</p>
            `
        },
        {
            title: "GPS Mapping and Spatial Cluster Analysis",
            content: `
                <p>By mapping sighting coordinates using Geographic Information Systems (GIS), researchers perform **spatial cluster analysis** to identify hotspots of activity. These hotspots often align with natural geographic features, such as river valleys, dense forests, or low-human-density zones.</p>
                <p>If sightings cluster in areas with high food resources and minimal human activity, it suggests they reflect a real animal population. If sightings cluster near highways or tourist sites, it suggests they are influenced by human activity and suggestibility, helping researchers plan target areas.</p>
            `
        },
        {
            title: "Drone Lidar: Forest Canopy Penetration",
            content: `
                <p>Lidar (Light Detection and Ranging) uses laser pulses to map the ground surface. When mounted on drones, Lidar can penetrate the dense forest canopy, creating a high-resolution 3D map of the forest floor, revealing hidden structures, cave entrances, or large animal nests.</p>
                <p>IHSE drone teams use Lidar to search for caves and shelters in remote mountainous areas. By mapping these features, researchers can locate potential den sites of elusive animals without needing to traverse hazardous terrain, improving search efficiency.</p>
            `
        },
        {
            title: "Chemical Analysis of Unknown Scents",
            content: `
                <p>Many hominid encounters describe a strong, foul odor. Field teams collect air and soil samples from these sites using **sorbent tubes** that capture volatile organic compounds (VOCs). These tubes are then analyzed in laboratories using gas chromatography-mass spectrometry (GC-MS).</p>
                <p>This analysis identifies the chemical composition of the scent. Primates produce specific pheromones and sulfur compounds. If a sample shows a high concentration of primate-like VOCs that differ from known regional wildlife, it provides chemical evidence of an undocumented animal's presence.</p>
            `
        },
        {
            title: "Summary: Legal and Academic Chain of Custody",
            content: `
                <p>In conclusion, forensic field methodology is what separates cryptozoology from folklore. By applying strict chain-of-custody protocols, using calibrated instruments, and subjecting data to double-blind testing, researchers ensure their findings are scientifically valid.</p>
                <p>The IHSE follows these standards for all evidence collection, ensuring that if a discovery is made, it can stand up to the highest levels of academic and scientific scrutiny, paving the way for official recognition.</p>
            `
        }
    ],
    ch5: [
        {
            title: "The Psychology of Deception: Financial Motivations",
            content: `
                <p>A significant portion of cryptozoology involves the psychology of perception. Human vision is not a camera; it is an interpretive engine. Under low-light conditions, in dense foliage, or when primed by local legends, the brain is highly susceptible to <em>pareidolia</em>—the psychological tendency to perceive meaningful patterns (like faces or bodies) where none exist.</p>
                <p>Historically, hoaxes have plagued the field, motivated by financial gain, notoriety, or humor. The Cardiff Giant of 1869, the Jackalope taxidermy, and the 2008 Bigfoot carcass hoax in Georgia demonstrate that even experienced researchers can be deceived. Hoax detection relies on rigorous forensic examination: checking for artificial adhesives, taxidermy stitching, DNA contaminants, and checking the chain of custody of the evidence.</p>
            `
        },
        {
            title: "Cardiff Giant of 1869: A Case Study in Gullibility",
            content: `
                <p>The Cardiff Giant was a 10-foot-tall petrified stone man discovered in 1869 behind a barn in Cardiff, New York. Created by George Hull, an atheist who wanted to fool a Methodist minister who believed in giants, the "giant" was carved from gypsum and buried. When dug up, it was hailed as a petrified prehistoric giant.</p>
                <p>Despite paleontologists like Othniel C. Marsh declaring it a crude fake, thousands paid to see it. P.T. Barnum even created a copy of the fake giant, exhibiting it as the real thing. The case showed how easily people are deceived when an object aligns with their beliefs, a pattern that repeats in modern cryptozoology.</p>
            `
        },
        {
            title: "Jackalope Taxidermy: Folkloric Art as Science",
            content: `
                <p>The Jackalope is a mythical animal of North American folklore, described as a jackrabbit with antelope horns. In the 1930s, taxidermist Douglas Herrick began grafting deer antlers onto rabbit carcasses, selling them as trophies. These taxidermy mounts became popular, leading tourists to believe the animal was real.</p>
                <p>Biologically, the Jackalope legend may have a basis in reality: rabbits infected with the **Shope papilloma virus** grow horn-like tumors on their heads. This viral infection, combined with taxidermy art, created a persistent myth, showing how folklore can merge with biological anomalies.</p>
            `
        },
        {
            title: "Patterson-Gimlin Film: Costume History Analysis",
            content: `
                <p>To evaluate if the Patterson-Gimlin film is a hoax, historians have studied the history of movie costumes in the late 1960s. In 1967, Hollywood costume technology relied on fur-covered fabrics and foam padding. Notable examples include the apes in <em>2001: A Space Odyssey</em> and <em>Planet of the Apes</em>.</p>
                <p>Critics point out that these Hollywood costumes required professional design and budget, making it unlikely that Patterson, an amateur filmmaker, could construct a superior suit. However, costume historians have shown that custom suits could be made using local taxidermy materials, keeping the possibility of a hoax open.</p>
            `
        },
        {
            title: "The Georgia Bigfoot Carcass Hoax (2008)",
            content: `
                <p>In August 2008, two men from Georgia claimed to have recovered a Bigfoot carcass in the northern forests. They posted photos of a frozen, hairy body in a chest, selling the rights to a cryptozoological group for thousands of dollars and hosting a press conference in New York.</p>
                <p>When the ice thawed, the carcass was revealed to be a rubber Halloween costume stuffed with animal entrails. The hoax was exposed within days, showing how financial greed and media interest can bypass scientific verification, damaging the credibility of serious researchers.</p>
            `
        },
        {
            title: "Photo Analysis: Exposing Shadows and Parallax Errors",
            content: `
                <p>Modern photographic analysis uses digital tools to identify altered or fake images. By analyzing the angle and color of shadows, analysts can determine if an object was pasted into a scene. They also check for **compression artifacts**—telltale patterns of pixels left by image editing software.</p>
                <p>In many cryptid photos, the target is blurry, while the background is sharp. This is often a sign of deliberate alteration or camera movement. By verifying these photographic elements, IHSE analysts can identify fakes before they are publicized, protecting scientific integrity.</p>
            `
        },
        {
            title: "Genetic Contamination: Canine DNA in Bigfoot Samples",
            content: `
                <p>In several cases, hair and saliva samples collected from Bigfoot sighting sites were analyzed in laboratories, returning genetic sequences matching domestic dogs or wolves. This is often a sign of **sample contamination**, where researchers accidentally introduce DNA from pets or native canines.</p>
                <p>Because DNA sequencing is highly sensitive, even a few cells from a researcher's dog can contaminate a sample. This highlights the need for sterile protocols in the field, ensuring that any genetic anomalies are authentic rather than products of contamination.</p>
            `
        },
        {
            title: "Taxidermy Forensic Detection: Stitching & Adhesives",
            content: `
                <p>When evaluating a physical specimen, such as a "mummified cryptid" or "taxidermy oddity," researchers use X-ray imaging and chemical tests to search for signs of artificial assembly. X-rays reveal skeletal structures, showing if bones from different animals were joined using wire or glue.</p>
                <p>Chemical analysis of skin and hair can detect artificial dyes, preservatives, and adhesives. These tests have exposed several historical cryptids, such as the Fiji Mermaid (which was a monkey torso stitched to a fish tail), proving that physical evidence must be verified at the structural level.</p>
            `
        },
        {
            title: "Pareidolia: Low Light Neural Processing",
            content: `
                <p>Human vision evolved to identify threats in the dark. To do this, the brain's visual cortex uses **predictive processing**, filling in gaps in visual data using prior knowledge and expectations. Under low-light conditions, this process can trigger pareidolia, creating the illusion of a face or body.</p>
                <p>This neural processing explains why many cryptid sightings occur at dusk or night. A witness, walking through a forest, sees a dark shape and expects a monster, leading the brain to construct a detailed image of Bigfoot, showing how easily our eyes can be deceived.</p>
            `
        },
        {
            title: "Social Media Virality and Cryptid Myths",
            content: `
                <p>The rise of the internet and social media has changed how folklore spreads. In the past, cryptid legends were localized, shared through oral histories. Today, a single video can go viral within hours, reaching millions of people and creating instant legends.</p>
                <p>This virality makes it difficult to track the origin of a legend. Hoaxes can spread faster than corrections, cementing false beliefs in the public mind. IHSE researchers must navigate this digital landscape, separating organic regional folklore from internet-engineered hoaxes.</p>
            `
        },
        {
            title: "Scientific Consensus: Peer Review and Gatekeepers",
            content: `
                <p>To be accepted by mainstream science, a discovery must be published in a peer-reviewed journal. Peer review acts as a gatekeeper, ensuring that research methodology is correct, data is consistent, and conclusions are supported by evidence.</p>
                <p>For cryptozoological research, this hurdle is high. Many journals reject articles on cryptids due to lack of a holotype or concerns about credibility. While some researchers view this as institutional bias, it is a necessary check to ensure that only verified discoveries are added to the scientific record.</p>
            `
        },
        {
            title: "Hoaxers' Playbook: Footprint Stamps and Molds",
            content: `
                <p>Experienced hoaxers use various tools to create fake evidence. To create footprints, they carve wooden or rubber feet, attaching them to boots to stamp tracks into the soil. Some even use articulation mechanisms to simulate toes flexing.</p>
                <p>Forensic track analysts can detect these fakes. Artificial prints lack the organic variation of a living animal's gait, showing identical shapes and depths across multiple tracks. They also lack dermal ridges and soil displacement patterns, allowing experts to expose them.</p>
            `
        },
        {
            title: "The Piltdown Man Precedent: Scientific Fraud",
            content: `
                <p>In 1912, amateur archaeologist Charles Dawson claimed to have discovered the "missing link" between apes and humans in Piltdown, England. The specimen, consisting of a human-like skull and ape-like jaw, was accepted by the British scientific establishment for forty years.</p>
                <p>In 1953, the Piltdown Man was exposed as a deliberate fraud: it was a modern human skull joined to an orangutan jaw, with the teeth filed down and stained to appear fossilized. The hoax showed that scientists are susceptible to fraud when it aligns with their expectations, reinforcing the need for skepticism.</p>
            `
        },
        {
            title: "Confabulation: Eyewitness Memory Degradation",
            content: `
                <p>Memory is not a static recording; it is reconstructed every time it is recalled. Over time, memories are subject to **confabulation**—the unconscious integration of new information, suggestions, or media images into the original memory.</p>
                <p>A witness who saw a blurry gray shape in the forest may, after reading about Bigfoot, recall seeing fur, glowing eyes, and a bipedal gait. This degradation makes old eyewitness accounts unreliable, highlighting the need for immediate, written statements and physical evidence.</p>
            `
        },
        {
            title: "Cryptids in Pop Culture: The Commodification of Myth",
            content: `
                <p>Cryptids have become lucrative commodities. Towns like Point Pleasant (Mothman) and Willow Creek (Bigfoot) rely on cryptid tourism, hosting festivals, museums, and gift shops. This commercial interest can create conflicts of interest for researchers.</p>
                <p>The need to maintain tourist interest can lead to the promotion of unverified reports and the suppression of hoaxes. Researchers must remain independent of these commercial interests, ensuring that their scientific conclusions are not influenced by tourism economics.</p>
            `
        },
        {
            title: "Institutional Bias: Funding Research on Anomalies",
            content: `
                <p>Research funding is competitive, awarded to projects with high probabilities of success and immediate benefits. Projects that study unverified biological anomalies are viewed as risky and speculative, making it difficult to secure academic grants.</p>
                <p>This bias forces researchers to rely on private donors or independent funding. The IHSE addresses this by operating as an independent research institute, ensuring that field expeditions and forensic lab testing can proceed without the constraints of traditional academic funding.</p>
            `
        },
        {
            title: "Skepticism vs. Cynicism: Defining Scientific Inquiry",
            content: `
                <p>True scientific skepticism is a commitment to evidence-based belief, requiring proof before acceptance. Cynicism is the dismissal of new ideas regardless of the evidence. In cryptozoology, researchers encounter both extremes.</p>
                <p>A scientific approach avoids both blind belief and dogmatic dismissal. By demanding rigorous evidence while remaining open to anomalies, we can investigate the boundaries of biology, ensuring that genuine discoveries are not lost to cynic prejudice.</p>
            `
        },
        {
            title: "Digital Alterations: AI-Generated Cryptids",
            content: `
                <p>The development of generative artificial intelligence (AI) has introduced a new challenge: high-fidelity, synthetic images and videos of cryptids. Today, anyone can generate realistic, vintage-style photos of Bigfoot or the Loch Ness Monster, rendering traditional visual checks obsolete.</p>
                <p>IHSE photo analysts use **digital forensics** to identify AI-generated media. They check for consistency in lighting, lens artifacts, metadata, and structural anomalies. This work is crucial to ensure that synthetic images do not corrupt research databases.</p>
            `
        },
        {
            title: "The Path to Verification: Registering a New Species",
            content: `
                <p>If an IHSE expedition recovers a physical holotype and genetic sequence of a cryptid, the path to verification follows strict scientific rules. First, the discovery must be described in a manuscript detailing the anatomy, genetics, and ecology of the species.</p>
                <p>This manuscript must be peer-reviewed and published in a recognized taxonomic journal. The species must be registered with the ICZN, receiving an official scientific name. Only then does the cryptid transition from folklore to accepted zoology.</p>
            `
        },
        {
            title: "Summary: The Future of Cryptozoological Epistemology",
            content: `
                <p>In conclusion, the study of hoaxes and deception is a crucial part of cryptozoology. By understanding the psychology of perception, the methods of fraud, and the tools of forensic detection, researchers protect the integrity of biology.</p>
                <p>The future of the field lies in the application of rigorous science to anomalous claims. By filtering out the noise of hoaxes and misidentifications, we can focus on those genuine biological mysteries that wait to be discovered.</p>
            `
        },
        {
            title: "About the Author",
            content: `
                <div style="font-family:var(--font-ui); font-size:0.8rem; line-height:1.6; color:#5a4b37; padding: 0.5rem 0;">
                    <p style="text-indent:0; margin-bottom:1rem;"><strong>Dr. Joseph Bryan Thornburg, PhD</strong></p>
                    <p style="text-indent:0; text-align:justify; margin-bottom:1rem;">Joseph Bryan Thornburg was born on December 6, 1967, in Chula Vista, California, and raised in Tampa, Florida. A graduate of Hillsborough Senior High School, he entered the United States Army in 1987, serving as a 13B10 Cannon Crewmember. His military career included active duty during Operation Desert Shield and Operation Desert Storm, where he developed the discipline, fieldcraft, and operational mindset that would later shape his scientific and expeditionary work. After completing his Army service in 1991, he continued to serve his state and community in the Florida Army National Guard until 1995, including deployment during Hurricane Andrew.</p>
                    <p style="text-indent:0; text-align:justify; margin-bottom:1rem;">Following his military career, Thornburg worked as a line chef and personal chef, honing precision, timing, and resource management&mdash;skills that would later influence his expedition planning and methodological rigor. He also worked as an independent contractor with Uber, DoorDash, and Amazon Flex, experiences that deepened his understanding of logistics, adaptability, and modern systems navigation.</p>
                    <p style="text-indent:0; text-align:justify; margin-bottom:1rem;">Thornburg pursued higher education at Thomas Francis University, earning a Bachelor&rsquo;s and Master&rsquo;s degree in Metaphysical Humanistic Science, followed by a Doctor of Philosophy in Metaphysical Humanistic Science with a concentration in Cryptozoology. His academic work blends zoological theory, metaphysical inquiry, and field investigation, forming the foundation of his mythic-scientific approach to cryptid research.</p>
                    <p style="text-indent:0; text-align:justify; margin-bottom:1rem;">In 2001, on the day of Epiphany, he married his wife, Darlene. He is the proud stepfather of two sons who regard him as their father&mdash;a role he considers one of the greatest honors of his life.</p>
                    <p style="text-indent:0; text-align:justify; margin-bottom:1rem;">Today, Dr. Thornburg is recognized for his interdisciplinary approach to cryptozoology, integrating scientific methodology, expeditionary practice, and cultural analysis. His work reflects a lifelong commitment to exploring the boundaries of the known world and encouraging others to approach the unknown with curiosity, discipline, and respect.</p>
                </div>
            `
        }
    ],
    outline: [
        {
            title: "IHSE 101: Introduction to Cryptozoology",
            content: `
                <div style="text-align:center; padding: 2rem 0;">
                    <h3 style="font-family:var(--font-ui); font-size:1rem; letter-spacing:3px; text-transform:uppercase; color:var(--text-muted); margin-bottom:1.5rem;">Official Course Outline</h3>
                    <h1 style="font-family:var(--font-header); font-size:2rem; line-height:1.3; color:#2b2319; margin-bottom:1rem;">IHSE 101 &mdash; INTRODUCTION TO CRYPTOZOOLOGY</h1>
                    <div style="margin: 2rem 0; height:2px; background-color:#8d7657; opacity:0.3;"></div>
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; font-weight:600; color:#2b2319; margin-bottom:1.5rem; text-align:center;">Course Syllabus &amp; Curriculum</h2>
                    <p style="font-family:var(--font-body); font-style:italic; font-size:1rem; color:#5a4b37; line-height:1.6; margin-bottom:2rem; text-align:justify; text-indent:0;">
                        This syllabus outlines the academic, historical, and methodological foundations of cryptozoology as established in the primary textbook. It provides students with a roadmap of the 6-week curriculum.
                    </p>
                    <div class="academic-note" style="margin-top:2rem;">
                        <strong>Enrollment Note:</strong> This course is designed for college graduates seeking professional accreditation in anomalous biology and field metrology.
                    </div>
                </div>
            `
        },
        {
            title: "Table of Contents",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">Table of Contents</h2>
                    <table style="width:100%; border-collapse:collapse; font-size:0.9rem; margin-bottom:1.5rem; border:none;">
                        <tbody>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; font-weight:bold;">IHSE 101 — INTRODUCTION TO CRYPTOZOOLOGY</td><td style="text-align:right; font-weight:bold; color:#8d7657;">3</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; font-weight:bold;">WEEK-BY-WEEK SYLLABUS</td><td style="text-align:right; font-weight:bold; color:#8d7657;">4</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; padding-left:1.5rem; color:#5a4b37;">WEEK 1 — Foundations of Cryptozoological Science</td><td style="text-align:right; color:#8d7657;">7</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; padding-left:1.5rem; color:#5a4b37;">WEEK 2 — Taxonomy, Holotypes & IHSE Protocols</td><td style="text-align:right; color:#8d7657;">10</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; padding-left:1.5rem; color:#5a4b37;">WEEK 3 — Metrology, Calibration & Field Reliability</td><td style="text-align:right; color:#8d7657;">14</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; padding-left:1.5rem; color:#5a4b37;">WEEK 4 — Historical Foundations & Archival Analysis</td><td style="text-align:right; color:#8d7657;">17</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; padding-left:1.5rem; color:#5a4b37;">WEEK 5 — Modern Tools: eDNA, Cognitive Bias & Constraints</td><td style="text-align:right; color:#8d7657;">20</td></tr>
                            <tr style="border-bottom:1px solid #e2ded5;"><td style="padding:0.5rem 0; padding-left:1.5rem; color:#5a4b37;">WEEK 6 — Terrestrial Hominids & the Fossil Gap</td><td style="text-align:right; color:#8d7657;">25</td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        {
            title: "Official Course Syllabus",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">Official Course Syllabus</h2>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify;">
                        <strong>Academic Term:</strong> Fall / Spring / Summer (Flexible Enrollment)<br>
                        <strong>Course Length:</strong> 6 Weeks<br>
                        <strong>Delivery Format:</strong> Online + Optional Field Practicum<br>
                        <strong>Primary Text:</strong> IHSE Cryptozoology Compendium – Print Edition (Smokeline Press, 2026)
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">Course Description</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify;">
                        IHSE 101 introduces students to the scientific, historical, and methodological foundations of cryptozoology as established in the primary textbook. Students learn the academic posture, taxonomic principles, metrology standards, and investigative frameworks required for advanced IHSE coursework and field operations. The course emphasizes critical thinking, evidence evaluation, and the integration of modern tools such as eDNA, metagenomics, LiDAR, and acoustic analysis.
                    </p>
                </div>
            `
        },
        {
            title: "Required Materials & outcomes",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">Required Materials & outcomes</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">Required Texts & Materials</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify;">
                        &bull; Primary Text (Exclusive): <em>IHSE Cryptozoology Compendium – Print Edition</em> &copy; 2026 Joseph Bryan Thornburg, Smokeline Press. ISBN: 978-1-105-47315-9.<br>
                        &bull; IHSE Calibration Log Templates &amp; Evidence Documentation Forms.<br>
                        &bull; Access to IHSE Digital Evidence Vault (Student Tier).<br>
                        &bull; Optional Field Kit: Plaster, evidence bags, gloves, red-light headlamp.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">Course Learning Outcomes</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify;">
                        Upon successful completion of this course, students will be able to explain the scientific foundations of cryptozoology as defined in the Compendium, apply holotype alternative protocols, perform metrology-compliant calibrations, and analyze historical sighting logs.
                    </p>
                </div>
            `
        },
        {
            title: "Syllabus Overview: Weeks 1&ndash;3",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">Syllabus Weeks 1&ndash;3</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">WEEK 1 &mdash; Foundations of Cryptozoological Science</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.5rem; text-align:justify;">
                        Topics include definitions, boundaries, Heuvelmans&rsquo; posture, and ICZN holotype requirements. Readings: Preface, Pages 1-10. Assignment: Reflection Essay on scientific posture.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">WEEK 2 &mdash; Taxonomy, Holotypes & IHSE Protocols</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.5rem; text-align:justify;">
                        Topics include holotype alternative protocols (Protocols 10 & 13), multi-spectral imaging, and genomic validation. Readings: Pages 6, 11, 14. Assignment: Protocol Design Exercise.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">WEEK 3 &mdash; Metrology, Calibration & Field Reliability</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.5rem; text-align:justify;">
                        Topics cover metrology standards, tolerances, auditability, and instrument reliability in extreme field conditions. Readings: Pages 12 & 15. Assignment: Calibration Log submission.
                    </p>
                </div>
            `
        },
        {
            title: "Syllabus Overview: Weeks 4&ndash;6 &amp; Grading",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">Syllabus Weeks 4&ndash;6 &amp; Grading</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">WEEK 4 &mdash; Historical Foundations & Archival Analysis</h4>
                    <p style="font-size:0.85rem; line-height:1.4; margin-bottom:0.4rem; text-align:justify;">
                        Bestiaries vs. Linnaean zoology, historical logs (ARC411, ARC912, ARC181), and transition case studies. Readings: Prolegomena Pages 1-15. Assignment: Archival Analysis.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">WEEK 5 &mdash; eDNA, Cognitive Bias & Constraints</h4>
                    <p style="font-size:0.85rem; line-height:1.4; margin-bottom:0.4rem; text-align:justify;">
                        eDNA sampling, metagenomics, pareidolia, anchoring, witness reliability, and ecological plausibility. Readings: Prolegomena Pages 5-6. Assignment: Sighting Bias-Filtering.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">WEEK 6 &mdash; Terrestrial Hominids & the Fossil Gap</h4>
                    <p style="font-size:0.85rem; line-height:1.4; margin-bottom:0.4rem; text-align:justify;">
                        Relict hominids, Gigantopithecus, taphonomy, and biomechanics. Readings: Chapter I, Pages 1-2. Assignment: Comparative Morphology Paper.
                    </p>
                    <div style="margin: 0.5rem 0; height:1px; background-color:#8d7657; opacity:0.2;"></div>
                    <p style="font-size:0.8rem; line-height:1.4; margin: 0; color:#5a4b37;">
                        <strong>Grading:</strong> Assignments (40%), Calibration Log (10%), Archival Analysis (15%), Final Dossier (25%), Participation (10%). Tuition: $249 (Course) / $149 (Practicum).
                    </p>
                </div>
            `
        },
        {
            title: "Week 1: Definitions & Scope",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 1 &mdash; Definitions &amp; Scope</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1. Definition and Scope of Cryptozoology</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Cryptozoology, as defined in the Compendium, is the scientific investigation of unverified biological taxa whose existence is suggested by persistent regional folklore, repeated eyewitness accounts, physical traces (tracks, scat, hair, nesting sites), environmental DNA anomalies, and historical records. The Compendium emphasizes that cryptozoology is a biological discipline. Its scope includes relict megafauna, ecologically plausible species that remain unclassified, and species known historically but lacking modern physical specimens.
                    </p>
                </div>
            `
        },
        {
            title: "Week 1: Boundaries of Zoology",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 1 &mdash; Boundaries of Zoology</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">2. Boundaries of Zoology vs. Anomalous Biology</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        The Compendium&rsquo;s Page 5 (&ldquo;The Boundaries of Zoology&rdquo;) establishes a scientific tension: Zoology requires physical holotypes, repeatable observations, and formal morphological descriptions. Anomalous Biology, by contrast, must deal with incomplete datasets, often lacking physical specimens, and must integrate ecology, anthropology, cognitive science, and forensics. The Compendium argues that zoology&rsquo;s boundaries are porous: many species (giant squid, mountain gorilla, okapi) were cryptids before formal recognition.
                    </p>
                </div>
            `
        },
        {
            title: "Week 1: Heuvelmans&rsquo; Posture",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 1 &mdash; Posture &amp; Holotypes</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">3. Heuvelmans&rsquo; Scientific Posture</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Bernard Heuvelmans, the founder of modern cryptozoology, advocated a dual-discipline posture. First, <strong>Open-Mindedness</strong>: anomalies should not be dismissed simply because they challenge consensus, and folklore may encode zoological data. Second, <strong>Scientific Rigor</strong>: every claim must be testable, falsifiable, and grounded in biological plausibility, evaluated using forensic standards.
                    </p>
                </div>
            `
        },
        {
            title: "Week 1: ICZN Holotype Requirements",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 1 &mdash; ICZN Standards</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">4. ICZN Holotype Requirements</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        The International Commission on Zoological Nomenclature (ICZN) requires a single physical holotype specimen deposited in a recognized repository, a formal morphological description, genetic sequencing, and repeatability of examination. The Compendium stresses that eyewitness accounts, tracks, and photographs do not qualify, and eDNA alone cannot establish a species. The absence of a physical holotype is the primary barrier preventing cryptids from entering formal taxonomy, justifying IHSE&rsquo;s Holotype Alternatives in Extremis (Protocols 10 & 13).
                    </p>
                </div>
            `
        },
        {
            title: "Week 1: Limits & Assignments",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 1 &mdash; Limits &amp; assignments</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">5. Epistemological Limits (Taxonomic Principle 9)</h4>
                    <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        Principle 9 addresses the philosophy of scientific limits: Failure to recover a specimen is not evidence of nonexistence. Low-density populations in extreme terrain can evade detection for centuries. However, researchers must guard against confirmation bias and cognitive anchoring.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">6. Required Reading</h4>
                    <p style="font-size:0.85rem; margin-bottom:0.8rem;">Page 5 &mdash; The Boundaries of Zoology; Page 6 &mdash; The Criterion of Holotypes; Page 10 &mdash; Taxonomic Principle 9.</p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">7. Assignment</h4>
                    <p style="font-size:0.85rem; line-height:1.4; text-align:justify;">
                        <strong>Reflection Essay (500 words):</strong> Explain how IHSE defines the scientific posture required for cryptozoological research, addressing the balance between skepticism and open-mindedness, holotype limitations, and historical zoological precedents. Cite at least three Compendium passages.
                    </p>
                </div>
            `
        },
        {
            title: "Week 2: Holotype Standards",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 2 &mdash; Holotype Standards</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1. Holotype Standards</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        The Compendium emphasizes that formal zoological recognition requires strict adherence to the International Commission on Zoological Nomenclature (ICZN). A species cannot be named without a holotype.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.02rem; color:#8d7657; margin-bottom:0.4rem;">1.1 Physical Integrity &amp; 1.2 Deposition</h4>
                    <p style="font-size:0.9rem; line-height:1.5; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        A holotype must be a single, intact physical specimen representing the species&rsquo; diagnostic traits (e.g., complete body, partial skeleton, skin, or skull) ensuring anatomical validity. The specimen must be stored in a recognized scientific repository (e.g., natural history museums, accredited research institutions) for permanent accessibility.
                    </p>
                </div>
            `
        },
        {
            title: "Week 2: Descriptions & Genetics",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 2 &mdash; Descriptions &amp; Genetics</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1.3 Morphological Description</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        The holotype must be accompanied by detailed anatomical measurements, high-resolution photographs, comparative morphology with related taxa, and specific diagnostic traits.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1.4 Genetic Sequencing &amp; 1.5 Limitations</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Modern taxonomy requires high-coverage genomic sequencing, independent replication by at least two laboratories, and deposition of sequence data in public databases (e.g., GenBank). Cryptozoological investigations often lack recoverable remains, accessible populations, or ethical/ecological feasibility of specimen collection. This is why holotype alternatives are necessary.
                    </p>
                </div>
            `
        },
        {
            title: "Week 2: Alternatives in Extremis",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 2 &mdash; Holotype Alternatives</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">2. Holotype Alternatives in Extremis (Protocols 10 & 13)</h4>
                    <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        <strong>2.1 Purpose:</strong> Address situations where a species is critically endangered, a population is too small to risk specimen collection, or ethical/environmental constraints prohibit lethal sampling.
                    </p>
                    <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        <strong>2.2 Protocol 10 (Page 11) &mdash; Alternative Nomenclatural Benchmarks:</strong> Allows high-fidelity, non-lethal documentation as a temporary holotype substitute. Acceptable forms include high-definition anatomical photography, 3D laser scans, multi-angle videography, and high-coverage genome sequencing from shed biological traces.
                    </p>
                    <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        <strong>2.3 Protocol 13 (Page 14) &mdash; Validation Requirements:</strong> Expands on Protocol 10 by requiring multi-spectral imaging (visible, IR, UV), structural depth mapping (LiDAR), independent genomic validation from two or more labs, and blind peer review.
                    </p>
                </div>
            `
        },
        {
            title: "Week 2: Verification Methods",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 2 &mdash; Verification Methods</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">3. Multi-Spectral Verification</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        Required to prevent digital manipulation or hoaxes. Uses visible light (400–700 nm), infrared (700–1400 nm) to reveal heat and vascular signatures, ultraviolet (10–400 nm) to highlight biological fluorescence, and LiDAR structural mapping.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">4. Independent Genomic Validation</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        Genomic evidence must be independently replicated across multiple accredited labs. Requires high-coverage sequencing (&ge;30&times; nuclear, &ge;100&times; mitochondrial) and robust phylogenetic placement. eDNA alone is only supporting evidence.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">5. Required Reading &amp; 6. Assignment</h4>
                    <p style="font-size:0.85rem; line-height:1.4; text-align:justify;">
                        Read Pages 11 (Protocol 10) & 14 (Protocol 13) of the Compendium. Assignment: Create a holotype-alternative submission packet for a hypothetical species. Include proposed taxonomic name, diagnostic traits, 3D scan and multispectral plans, genomic sequencing strategy, and ethical justifications.
                    </p>
                </div>
            `
        },
        {
            title: "Week 3: Metrology Standards",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 3 &mdash; Metrology, Calibration & Field Reliability</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1. IHSE Metrology Standards</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        IHSE metrology is built on the principle that data is only as reliable as the instruments that produce it. Calibration tables establish strict tolerances derived from error propagation models, environmental interference studies, and forensic admissibility standards. IHSE metrology values three imperatives: <strong>Precision</strong> (narrow tolerances), <strong>Repeatability</strong> (independent duplication), and <strong>Auditability</strong> (traceable records).
                    </p>
                </div>
            `
        },
        {
            title: "Week 3: Calibration Tolerances",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 3 &mdash; Calibration Tolerances</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">2. Calibration Tolerances</h4>
                    <p style="font-size:0.88rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        &bull; <strong>eDNA Filter Kit:</strong> Pore Size Consistency &plusmn;0.02 microns. Calibration: Pre-expedition. Rationale: Prevent contamination or targeted biological exclusion.<br>
                        &bull; <strong>Acoustic Recorder:</strong> Frequency Response &plusmn;1.5 Hz. Calibration: Every 6 months. Rationale: Avoid distortion of vocal infrasound (10–40 Hz) or harmonics.<br>
                        &bull; <strong>LiDAR Scanner:</strong> Spatial Resolution &plusmn;2 mm. Calibration: Annual. Rationale: Ensure forensic-grade limb and gait reconstruction.
                    </p>
                </div>
            `
        },
        {
            title: "Week 3: Auditability & Reliability",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 3 &mdash; Auditability &amp; reliability</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">3. Auditability Requirements &amp; 4. Instrument Reliability</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        All calibration events must be logged (date, technician, raw vs. corrected values), digitally archived, chain-of-custody compliant, and field-verifiable to meet peer-review and legal standards. Environmental stressors (temperature, humidity, dust, battery voltage) degrade calibration. Spot checks and recalibration are mandatory.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">5. Required Reading &amp; 6. Assignment</h4>
                    <p style="font-size:0.85rem; line-height:1.4; text-align:justify;">
                        Read Reference Guides 11 and 14: Metrology Calibration Tables. Assignment: Submit a complete calibration record for an eDNA kit, acoustic recorder, and LiDAR scanner showing raw errors, corrections, standards, and digital signatures.
                    </p>
                </div>
            `
        },
        {
            title: "Week 4: Bestiaries vs. Zoology",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 4 &mdash; Historical Foundations &amp; Archival Analysis</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1. Bestiaries vs. Scientific Zoology</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Early natural history blurred the line between observation and myth. Medieval bestiaries mixed real and mythic animals, treating folklore as zoological fact. The Scientific Revolution introduced Linnaean taxonomy, requiring physical specimens. Cryptozoology must operate as a scientific discipline, not a folkloric study. It is not the study of myths &mdash; it is the study of unresolved zoological hypotheses.
                    </p>
                </div>
            `
        },
        {
            title: "Week 4: Heuvelmans & Modern Cryptozoology",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 4 &mdash; Birth of Modern Cryptozoology</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">2. Heuvelmans and the Birth of Modern Cryptozoology</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Bernard Heuvelmans reframed the field in 1955 by treating folklore as data: categorizing reports by morphology, comparing traditions for cross-cultural consistency, and evaluating biological plausibility. Persistent descriptions across independent cultures point toward real biological entities. Folklore is not evidence &mdash; but it is a map pointing toward evidence.
                    </p>
                </div>
            `
        },
        {
            title: "Week 4: Skepticism & Sighting Logs",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 4 &mdash; Skepticism &amp; Logs</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">3. Skeptical Movement &amp; 4. Archival Sighting Logs</h4>
                    <p style="font-size:0.9rem; line-height:1.5; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Skepticism is scientifically necessary to weed out misidentifications and hoaxes. However, dogmatic dismissal is anti-empirical. The Compendium includes three archival logs (ARC411, ARC912, ARC181) describing the "Hairy Forest Dweller" over centuries. These logs allow tracking of morphological consistency, identifying range contraction, and detecting cultural patterns. Cross-century consistency suggests a real biological basis.
                    </p>
                </div>
            `
        },
        {
            title: "Week 4: Transitions & Assignments",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 4 &mdash; Transitions &amp; assignments</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">5. Historical Cryptid-to-Species Transitions</h4>
                    <p style="font-size:0.85rem; line-height:1.5; margin-bottom:0.8rem; text-align:justify;">
                        Several species were once considered cryptids: the giant squid (described in 1857 from a carcass), okapi (1901, skin/skull), and mountain gorilla (1902, specimen). Lessons: absence of evidence is not evidence of absence, large animals can hide in dense canopy, and folklore preserves zoological memory.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">6. Required Reading &amp; 7. Assignment</h4>
                    <p style="font-size:0.85rem; line-height:1.4; text-align:justify;">
                        Read Prolegomena Pages 1&ndash;15. Assignment: Compare two archival logs and evaluate morphological consistency (height, proportions, gait, tail). Analyze whether differences are observer bias, environmental distortion, or species variation.
                    </p>
                </div>
            `
        },
        {
            title: "Week 5: eDNA & Metagenomics",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 5 &mdash; Modern Tools: eDNA &amp; Metagenomics</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1. Environmental DNA (eDNA)</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Environmental DNA (eDNA) has revolutionized cryptozoology by allowing the detection of organisms without direct observation. Organisms shed skin, hair, mucus, or fecal matter containing genetic material. eDNA is vital for detecting low-density, nocturnal, or alpine species in extreme terrains.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.02rem; color:#8d7657; margin-bottom:0.4rem;">1.1 eDNA Sampling Workflow &amp; 1.2 Limitations</h4>
                    <p style="font-size:0.9rem; line-height:1.5; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        The workflow includes: sample collection, filtration (&plusmn;0.02 micron pore tolerance), DNA extraction, high-throughput metagenomic sequencing, and bioinformatic database comparison. eDNA degrades under UV/heat, cannot verify morphology, and serves as supporting evidence only.
                    </p>
                </div>
            `
        },
        {
            title: "Week 5: Metagenomics",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 5 &mdash; Metagenomics</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">2. Metagenomics</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Metagenomics sequences all DNA present in a sample, producing a complete ecosystem snapshot. It allows researchers to identify entire food webs, verify ecological carrying capacity, and detect rare or unknown species. If a region repeatedly produces primate sightings, metagenomics can reveal primate DNA or rule out known species.
                    </p>
                </div>
            `
        },
        {
            title: "Week 5: Cognitive Bias & Plausibility",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 5 &mdash; Bias &amp; Plausibility</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">3. Cognitive Bias &amp; 3.1 Cognitive Bias Filtering</h4>
                    <p style="font-size:0.9rem; line-height:1.5; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Human perception is highly unreliable without controls. <strong>Pareidolia</strong> causes the brain to interpret ambiguous shapes (shadows, branches) as faces or animals. <strong>Folkloric Anchoring</strong> occurs when dominant regional narratives cause witnesses to subconsciously reconstruct memories to match famous cryptids. IHSE filters sighting reports by evaluating lighting, angle, distance, observer emotional state/experience, and cultural context.
                    </p>
                </div>
            `
        },
        {
            title: "Week 5: Ecological Plausibility",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 5 &mdash; Ecological Plausibility</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">4. Ecological Plausibility Analysis</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        No cryptid claim is credible unless the ecosystem can support it. Investigators must ask: Is there sufficient biomass and prey? Is there cover for a low-density breeding population? Has human encroachment altered range boundaries? IHSE uses GIS mapping, range overlays, and predator-prey models to verify environmental sustainability.
                    </p>
                </div>
            `
        },
        {
            title: "Week 5: Readings & Sighting Assignment",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 5 &mdash; Assignments &amp; readings</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">5. Required Reading</h4>
                    <p style="font-size:0.85rem; margin-bottom:1rem;">Prolegomena Page 5 (Metagenomics & eDNA) and Page 6 (Cognitive Bias) of the Compendium.</p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">6. Assignment</h4>
                    <p style="font-size:0.85rem; line-height:1.5; text-align:justify;">
                        <strong>Bias-Filtering Exercise:</strong> Analyze 10 sighting reports. Evaluate environmental conditions, observer wildlife experience, morphological consistency, and ecological carrying capacity. Classify and rank each report from 1 (Hoax) to 5 (Plausible Biological Encounter) using the Compendium matrix.
                    </p>
                </div>
            `
        },
        {
            title: "Week 6: Relict Hominoids & Gigantopithecus",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 6 &mdash; Terrestrial Hominids &amp; the Fossil Gap</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">1. Global Distribution of Relict Hominoids</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Large, bipedal primate reports occur globally, not regionally (e.g. Sasquatch in North America, Yeti in Himalayas, Yeren in China, Orang Pendek in Indonesia). This cross-continental distribution suggests a shared Pleistocene lineage surviving in low-density, high-canopy, low-contact ecosystems. The Compendium frames these global patterns as biological, non-random phenomena.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">2. Gigantopithecus blacki &mdash; The Paleoprimate Candidate</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Gigantopithecus blacki (Southeast Asia, 2M–300k years ago) reached 10 feet in height and 600–1000 lbs. It is the largest known primate. The Compendium notes that its extinction timeline is uncertain, and its morphology and forest habitat match descriptions of Yeti and Yeren, making it a biologically plausible ancestral candidate.
                    </p>
                </div>
            `
        },
        {
            title: "Week 6: North American Fossil Gap",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 6 &mdash; Fossil Gap &amp; Biomechanics</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.4rem;">3. The North American Fossil Gap</h4>
                    <p style="font-size:0.9rem; line-height:1.6; margin-bottom:1rem; text-align:justify; text-indent:1.5rem;">
                        Skeptics argue the lack of North American hominid fossils disproves Sasquatch. The Compendium provides counterpoints: forest primates leave poor fossil records; acidic soils destroy bone rapidly; North American fossil sampling is &lt;1% complete; and large mammals like black bears have extremely sparse fossil records despite huge populations. The fossil gap is taphonomic, not evidentiary proof of nonexistence.
                    </p>
                </div>
            `
        },
        {
            title: "Week 6: Biomechanics & Capstone Assignment",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 6 &mdash; Course Capstone</h2>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">5. Required Reading &amp; 6. Assignment</h4>
                    <p style="font-size:0.85rem; line-height:1.4; margin-bottom:0.6rem; text-align:justify;">
                        Read Chapter I, Pages 1-2. Assignment: Comparative Morphology Paper. Compare hominoid bipedalism, gait pressure ridges, and midtarsal breaks with known primates.
                    </p>
                    <h4 style="font-family:var(--font-header); font-size:1.05rem; color:#8d7657; margin-bottom:0.3rem;">7. Grading Breakdown &amp; 8. Final Project</h4>
                    <p style="font-size:0.85rem; line-height:1.4; text-align:justify; margin:0;">
                        Final project requires producing a full IHSE-standard investigative dossier on a cryptid. Grading: Weekly assignments (40%), Calibration (10%), Archival (15%), Final Dossier (25%), Participation (10%). Tuition: $249 (Course) / $149 (Practicum).
                    </p>
                </div>
            `
        }
    ],
    protocols: [
        {
            title: "Field Protocol Manual: Standard Operating Procedures",
            content: `
                <div style="text-align:center; padding: 2rem 0;">
                    <h3 style="font-family:var(--font-ui); font-size:1rem; letter-spacing:3px; text-transform:uppercase; color:var(--text-muted); margin-bottom:1.5rem;">Official Field Guide</h3>
                    <h1 style="font-family:var(--font-header); font-size:2.2rem; line-height:1.3; color:#2b2319; margin-bottom:1rem;">FIELD PROTOCOL MANUAL</h1>
                    <div style="margin: 2rem 0; height:2px; background-color:#8d7657; opacity:0.3;"></div>
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; font-weight:600; color:#2b2319; margin-bottom:1.5rem; text-align:center;">Standard Operating Procedures</h2>
                    <p style="font-family:var(--font-body); font-style:italic; font-size:1rem; color:#5a4b37; line-height:1.6; margin-bottom:2rem; text-align:justify; text-indent:0;">
                        This protocol manual establishes the mandatory standards of practice for all field investigators and research fellows operating under the auspices of the <strong>Institute of Hidden Spice Expeditions (IHSE)</strong>.
                    </p>
                    <p style="font-family:var(--font-body); font-size:0.95rem; color:#2b2319; line-height:1.7; margin-bottom:2rem; text-align:justify; text-indent:1.5rem;">
                        As cryptozoology matures into an interdisciplinary science, the methods of evidence collection, ecological preservation, witness elicitation, and technological calibration must match or exceed those of traditional field biology and forensics. These 13 core modules provide the theoretical foundation and practical applications required to conduct robust, ethical, and scientifically verifiable investigations.
                    </p>
                    <div class="academic-note" style="margin-top:2rem;">
                        <strong>Notice:</strong> Complete mastery of these protocols is a prerequisite for advanced field assignment and formal taxonomic registration of new species.
                    </div>
                </div>
            `
        },
        {
            title: "Module 1 &mdash; Field Ethics & Ecological Impact Minimization",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 1 &mdash; Field Ethics & Ecological Impact Minimization</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Train investigators to operate in remote wilderness areas and sensitive habitats without disrupting native ecosystems or violating cultural and local community boundaries.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Habitat Fragility:</strong> Target cryptids are, by definition, low-density populations that are highly vulnerable to localized environmental disturbances.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Anthropogenic Pressure:</strong> Uncontrolled or noisy expeditionary footprints introduce olfactory, auditory, and visual stressors that can permanently alter cryptid behaviors or collapse fragile regional populations before formal taxonomic discovery can take place.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Silent Approach Methods:</strong> Implement multi-layered auditory concealment, non-reflective gear, and specialized scent-masking materials during tracking operations.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Zero-Trace Camp Discipline:</strong> Ensure all waste is packed out, cooking odors are contained via sealed canisters, and camp locations are dynamically rotated.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Indigenous Consultation Protocols:</strong> Establish direct communication lines with indigenous guardians, respecting tribal borders and traditional ecological knowledge.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Complete scenario-based ethical decision-making tests and submit a written justification justifying all planned field actions in sensitive tribal zones.
                    </div>
                </div>
            `
        },
        {
            title: "Module 2 &mdash; Evidence Chain-of-Custody",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 2 &mdash; Evidence Chain-of-Custody</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Ensure all physical and biological evidence remains legally admissible, traceably documented, and scientifically valid from the point of origin in the field to final laboratory sequencing.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Sample Contamination:</strong> Biological material exposed to modern human handling, pet dander, or ambient environmental sources without sterile protection renders PCR amplification and DNA sequencing invalid.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Metadata Integrity:</strong> Without permanent, tamper-proof logs specifying geographic coordinates, time of collection, and custody handoffs, the scientific community cannot verify the authenticity of a sample.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Sterile Packing & Sealing:</strong> Use tamper-evident evidence bags, serialized security seals, and cold-storage chambers for biological samples.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Digital Metadata Preservation:</strong> Log collection events with localized GPS coordinate tagging, photo-documentation, and cryptographic timestamps.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Chain-of-Custody Logging:</strong> Complete the custody transfer manifest at every transit step (e.g., field collection, basecamp storage, lab delivery).</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Execute a mock evidence logging exercise, correctly completing custody paperwork for three anomalous forest trace samples.
                    </div>
                </div>
            `
        },
        {
            title: "Module 3 &mdash; Witness Interview Standards",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 3 &mdash; Witness Interview Standards</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Train investigators to extract high-fidelity, unbiased accounts from eyewitnesses while filtering out cognitive bias, post-event suggestions, and cultural priming.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Cognitive Distortion:</strong> Visual and cognitive processes are reconstructive. Features like <em>pareidolia</em> (interpreting faces or human shapes in forest shadows) and <em>anchoring</em> (forcing an unknown animal description to match media portrayals of Bigfoot or Mothman) distort raw memories.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Elicitation Bias:</strong> Leading questions, emotional responses from the interviewer, or public discussions contaminate witness memory, making reliable reconstruction impossible.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Structured Interview Format:</strong> Utilize open-ended, non-leading cognitive interview techniques to let the witness recount events sequentially.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Reliability Scoring:</strong> Grade interviews using the IHSE Reliability Matrix (assessing sight lines, light levels, distance, and witness fatigue).</li>
                        <li style="margin-bottom:0.4rem;"><strong>Environmental Cross-Checking:</strong> Verify astronomical logs, local weather tables, and regional wildlife maps matching the sighting time.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Conduct a mock interview with a simulated witness, document the transcript, and calculate the formal reliability score.
                    </div>
                </div>
            `
        },
        {
            title: "Module 4 &mdash; Track & Trace Documentation",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 4 &mdash; Track & Trace Documentation</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Teach proper morphological identification, field casting, and scale-referenced documentation of physical tracks, paths, and compression markings.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Biomechanical Markers:</strong> Track morphology provides indicators of gait, step frequency, center of gravity, weight distribution, and skeletal structure. Opposable halluces or mid-tarsal breaks leave distinct pressure differences.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Substrate Dynamics:</strong> Track depth and shape are affected by substrate composition (e.g., damp silt, sandy loam, dry clay). Soil water levels and compaction rates must be calculated to estimate footprint age and target mass.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Plaster / Dental Stone Casting:</strong> Apply fine-grade dental stone under optimal water ratios, reinforcing the cast to capture fine dermal friction ridges.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Scale-Referenced Photography:</strong> Position standardized photogrammetry scales parallel to the track axes, capturing multi-angle oblique lighting shots.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Substrate Analysis:</strong> Record moisture content, soil classification, and leaf litter compression indexes at the track site.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Prepare and submit a complete track documentation packet, including cast photos, photogrammetric logs, and soil composition notes.
                    </div>
                </div>
            `
        },
        {
            title: "Module 5 &mdash; Biological Trace Collection",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 5 &mdash; Biological Trace Collection</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Train investigators to recover hair, scat, saliva, and environmental tissue samples in the field without introducing contamination or accelerating sample degradation.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>DNA Degradation:</strong> Extracellular DNA decays rapidly when exposed to ultraviolet radiation, ambient heat, bacteria, and humidity. Prompt, stable preservation is required to protect the long-chain DNA needed for PCR.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Vector Contamination:</strong> Flakes of human skin, clothing fibers, or breath aerosols introduced during sample collection overwrite the trace DNA, producing false positives.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Aseptic Collection:</strong> Employ sterile forcep kits, nitrile gloves, and face masks during collection. Never touch biological traces directly.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Specimen Preservation:</strong> Store hairs dry in paper envelopes; preserve tissue/scat in 95% ethanol vials or lysis buffers to halt decay.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Field Blank Control:</strong> Run negative field control blanks alongside collected traces to identify ambient contamination vectors.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Demonstrate contamination-free sample extraction and sealing during a mock field trace collection drill.
                    </div>
                </div>
            `
        },
        {
            title: "Module 6 &mdash; Digital Evidence Integrity",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 6 &mdash; Digital Evidence Integrity</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Ensure all photographic and videographic files captured on expeditions are authentic, unmanipulated, verifiable, and structurally usable for scientific analysis.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Compression Artifacts:</strong> Image editing or local splicing alters the JPEG quantization table and creates local discrepancies in the noise floor and compression boundaries, visible under Error Level Analysis (ELA).</p>
                    <p style="text-align:justify; text-indent:0;"><strong>EXIF and Sensor Metadata:</strong> Authentic camera sensors embed specific hardware serials, exposure configurations, and sequential frame counts that are difficult to forge without breaking cryptographic hashes.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>RAW-Format Capture:</strong> Set all cameras to capture uncompressed RAW files, retaining original sensor sensor data blocks.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Cryptographic Hash Validation:</strong> Calculate SHA-256 signatures immediately upon transfer from storage cards to preserve files.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Anti-Tamper Camera Settings:</strong> Enable hardware-based photo verification signatures on supporting GPS-synchronized camera units.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Analyze a set of 5 images using digital forensics, correctly identifying spliced and manipulated mock cryptid images from unaltered controls.
                    </div>
                </div>
            `
        },
        {
            title: "Module 7 &mdash; Acoustic & Bioacoustic Recording Standards",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 7 &mdash; Acoustic & Bioacoustic Recording Standards</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Train investigators to deploy recording equipment to capture, isolate, and analyze anomalous biological vocalizations or environmental sounds.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Frequency Response:</strong> Mammalian and avian vocalizations display distinct fundamental frequencies and harmonic spacing governed by vocal tract dimensions and lung volume.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Bioacoustic Analysis:</strong> Spectrograms reveal formant patterns, frequency modulation (FM) rates, and subharmonic vocalizations. These features help identify species, differentiating wild fauna from mechanical sounds.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Recorder Calibration:</strong> Calibrate microphone gains and high-pass filters to establish stable reference noise-floors.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Night-Time Deployment:</strong> Erect tree-mounted parabolic and omnidirectional recorders near feeding or nesting vectors.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Noise-Floor Management:</strong> Minimize local wind and water interference using deadcat windscreens and strategic topography.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Analyze a mock spectrogram recording, filter background noise, and write a classification report identifying the vocal tract anomalies.
                    </div>
                </div>
            `
        },
        {
            title: "Module 8 &mdash; eDNA Sampling & Metagenomic Workflow",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 8 &mdash; eDNA Sampling & Metagenomic Workflow</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Teach proper filtration, preservation, and database comparison protocols for environmental DNA (eDNA) collected from aquatic and terrestrial soils.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Shedding and Persistence:</strong> Animals constantly shed cells, waste, and saliva into their environment. These cellular fragments can be concentrated through fine-pore filters and amplified using target barcoded primers.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Metagenomic Sequencing:</strong> By comparing amplified environmental sequences against databases like GenBank, researchers can identify the species present in an area, even if they never see them.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Water/Soil Filtration:</strong> Pump standardized volumes (e.g., 2 liters) of water through sterile 0.22-micrometer pore filters.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Sterile Handling Protocols:</strong> Conduct all filtration steps inside closed, clean chambers to prevent human DNA contamination.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Sample Preservation:</strong> Immediately seal filters in tubes containing silica desiccant gel or Longmire buffer for transit.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Draft and submit a mock eDNA sampling plan, detailing filtration steps and primer choices for a target lake habitat.
                    </div>
                </div>
            `
        },
        {
            title: "Module 9 &mdash; Expedition Metrology & Instrument Calibration",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 9 &mdash; Expedition Metrology & Instrument Calibration</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Ensure all electronic, acoustic, and spatial field sensors conform to IHSE metrological tolerances, preventing data anomalies and false readings.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Error Propagation:</strong> Minor instrument offsets or calibration drifts multiply during spatial and mathematical model reconstructions, leading to incorrect calculations of animal height, mass, or frequency.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Environmental Drift:</strong> Temperature fluctuations, atmospheric pressure shifts, and humidity affect sensor parameters, requiring regular field calibrations.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Filter Pore-Size Verification:</strong> Perform bubble-point pressure tests on eDNA filtration membranes to verify structural integrity.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Frequency Response Sweep:</strong> Run calibrated signal generators to verify the flat frequency response of acoustic microphones.</li>
                        <li style="margin-bottom:0.4rem;"><strong>LiDAR Resolution Checks:</strong> Calibrate spatial scanners using geometric calibration targets of known size at various distances.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Complete and submit a standard IHSE Calibration Log, validating the accuracy of field sensors under simulated shifts.
                    </div>
                </div>
            `
        },
        {
            title: "Module 10 &mdash; Holotype Alternatives in Extremis (Primary)",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 10 &mdash; Holotype Alternatives in Extremis (Primary)</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Train investigators to document newly discovered biological entities without lethal collection, utilizing non-invasive digital and genetic techniques.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Taxonomic Standards:</strong> Under the rules of the International Commission on Zoological Nomenclature (ICZN), descriptions of new species historically required a preserved holotype specimen.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Conservation Imperative:</strong> If a species is endangered, collecting a physical specimen is unethical and could push the population to extinction. Non-invasive alternatives must be used to describe the species.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>High-Definition Anatomical Imaging:</strong> Capture high-resolution photographs and video showing diagnostic anatomical details.</li>
                        <li style="margin-bottom:0.4rem;"><strong>3D Photogrammetric Scanning:</strong> Use LiDAR or multi-angle photos to build detailed three-dimensional models of the live animal.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Non-Invasive Genomic Sampling:</strong> Collect hairs, saliva, or blood traces to sequence the species' complete mitochondrial genome.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Create a holotype-alternative documentation packet, combining high-resolution photos, 3D scans, and genomic data.
                    </div>
                </div>
            `
        },
        {
            title: "Module 11 &mdash; Multi-Spectral Imaging Standards",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 11 &mdash; Multi-Spectral Imaging Standards</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Teach investigators to capture anatomical data across multiple spectral bands, highlighting features hidden under visible light.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Spectral Signatures:</strong> Different biological tissues exhibit unique reflectance and fluorescence properties under infrared (IR) and ultraviolet (UV) wavelengths.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Anatomical Validation:</strong> Sub-surface vascular structures reflect IR light, while keratinous hair and feathers fluoresce under UV, helping verify that a subject is biological rather than a synthetic costume.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Visible / IR / UV Capture:</strong> Use modified camera sensors with spectral band filters to photograph subjects across the spectrum.</li>
                        <li style="margin-bottom:0.4rem;"><strong>LiDAR Integration:</strong> Combine multi-spectral images with spatial data from 3D scanners to build accurate models.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Photogrammetric Reconstruction:</strong> Stitch multi-spectral images together to map surface textures and reflectance.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Design and submit a multi-spectral imaging plan for a field survey, specifying the camera and light configurations to be used.
                    </div>
                </div>
            `
        },
        {
            title: "Module 12 &mdash; Structural Morphology Verification",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 12 &mdash; Structural Morphology Verification</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Train students to analyze 3D models and spatial data to verify structural morphology and rule out costume-based hoaxes.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Musculoskeletal Dynamics:</strong> Live animals display complex muscle contractions, skin sliding, and bone rotations during motion that cannot be replicated by rigid props or synthetic suits.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Morphometric Consistency:</strong> Analyzing the ratios between bone lengths and muscle insertions helps verify that a subject has a functioning, natural skeletal structure.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>3D Model Analysis:</strong> Inspect 3D models from photogrammetry for anatomical consistency and details like skin wrinkles.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Dynamic Joint Tracking:</strong> Track joint rotations and body movements during motion sequences.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Oblique Angle Auditing:</strong> Compare photos taken from different angles to detect perspective distortion or flat props.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Audit a 3D model of a suspected cryptid, identifying structural inconsistencies that point to a costume or prop-based hoax.
                    </div>
                </div>
            `
        },
        {
            title: "Module 13 &mdash; Holotype Alternatives in Extremis (Advanced Validation)",
            content: `
                <div style="padding: 1rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.4rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.5rem; margin-bottom:1.5rem;">MODULE 13 &mdash; Holotype Alternatives in Extremis (Advanced Validation)</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Objective</h3>
                    <p style="text-align:justify;">Teach investigators to compile advanced validation datasets required to secure provisional taxonomic recognition from the scientific community.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Scientific Foundations</h3>
                    <p style="text-align:justify; text-indent:0; margin-bottom:0.5rem;"><strong>Taxonomic Standards:</strong> For a description based on holotype-alternative data to be accepted, the evidence must be replicated and validated by independent institutions.</p>
                    <p style="text-align:justify; text-indent:0;"><strong>Replication Metrics:</strong> Validation requires DNA replication across independent laboratories, matching morphological parameters across multiple sightings, and reviews by zoological experts.</p>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Field Applications</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.6; font-family:var(--font-body); font-size:0.95rem; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Genomic Validation:</strong> Split genomic samples and send them to independent laboratories for blind sequencing and replication.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Multi-Spectral + Structural Integration:</strong> Combine multi-spectral photos and 3D models into a single, cohesive dataset.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Taxonomic Submission:</strong> Write formal species descriptions outlining morphological and genetic markers, ready for submission to taxonomic journals.</li>
                    </ul>
                    
                    <h3 style="font-family:var(--font-header); font-size:1.15rem; color:#8d7657; border-bottom:1px solid rgba(141,118,87,0.3); padding-bottom:0.3rem; margin-top:1.2rem; margin-bottom:0.5rem;">Assessment</h3>
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; text-indent:0;">
                        <strong>Task:</strong> Assemble and submit a full Protocol 13 validation dossier, combining genetic, structural, and multi-spectral data for a provisional species description.
                    </div>
                </div>
            `
        }
    ],
    workbook: [
        {
            title: "IHSE 101: Field Investigator Student Workbook",
            content: `
                <div style="text-align:center; padding: 2rem 0;">
                    <h3 style="font-family:var(--font-ui); font-size:1rem; letter-spacing:3px; text-transform:uppercase; color:var(--text-muted); margin-bottom:1.5rem;">Official Curriculum</h3>
                    <h1 style="font-family:var(--font-header); font-size:2.2rem; line-height:1.3; color:#2b2319; margin-bottom:1rem;">IHSE 101 &mdash; STUDENT WORKBOOK</h1>
                    <div style="margin: 2rem 0; height:2px; background-color:#8d7657; opacity:0.3;"></div>
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; font-weight:600; color:#2b2319; margin-bottom:1.5rem; text-align:center;">Course Workbook: Weeks 1&ndash;6 &amp; Final Project</h2>
                    <p style="font-family:var(--font-body); font-style:italic; font-size:1rem; color:#5a4b37; line-height:1.6; margin-bottom:2rem; text-align:justify; text-indent:0;">
                        This workbook is the mandatory companion guide to the textbook <em>"Cryptozoology: An Advanced Exploration for College Graduates"</em>. It guides students through the practical applications of taxonomic criteria, calibration metrology, archival analysis, and multi-spectral forensics.
                    </p>
                    <p style="font-family:var(--font-body); font-size:0.95rem; color:#2b2319; line-height:1.7; margin-bottom:2rem; text-align:justify; text-indent:1.5rem;">
                        Each week, students must review the designated compendium readings, complete the corresponding analytical worksheets, and submit their written reflections and designs. Completion of all exercises culminate in the submission of the Final IHSE Investigative Dossier.
                    </p>
                    <div class="academic-note" style="margin-top:2rem;">
                        <strong>Curriculum Advisory:</strong> All assignments must meet the scientific standards of the Institute of Hidden Species Expeditions (IHSE) to qualify for graduation.
                    </div>
                </div>
            `
        },
        {
            title: "Week 1 &mdash; Foundations of Cryptozoological Science",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 1 &mdash; Foundations of Cryptozoological Science</h2>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; font-style:italic;">Compendium Sections: Preface; Pages 1&ndash;10</p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Learning Objectives</h4>
                    <ul style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Understand the scientific definition, methodologies, and limitations of cryptozoology.</li>
                        <li>Distinguish systematic zoology from anomalous biology and folkloric narrative patterns.</li>
                        <li>Explain Bernard Heuvelmans' posture of scientific skepticism and empirical inquiry.</li>
                        <li>Describe the International Code of Zoological Nomenclature (ICZN) holotype specimen regulations.</li>
                        <li>Apply Taxonomic Principle 9 regarding the epistemological limits of biological searches.</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Guided Reading Questions</h4>
                    <ol style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>What core criteria distinguish cryptozoology from cultural folklore and mythology studies?</li>
                        <li>Why does the Compendium argue that zoological boundaries are "porous" rather than static?</li>
                        <li>How does Heuvelmans balance open-mindedness toward anomalies with empirical scientific rigor?</li>
                        <li>Why are physical holotype specimens considered the absolute gold standard for species recognition?</li>
                        <li>What does Taxonomic Principle 9 warn against regarding the "carrying capacity" of evidence?</li>
                    </ol>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Worksheet: Scientific Posture Analysis</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Concept</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Definition (Student Entry)</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Field Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Open-mindedness</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Write definition...]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Accepting the possibility of surviving Pleistocene megamammals.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Skepticism</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Write definition...]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Exposing the Georgia Bigfoot carcass as a rubber Halloween costume.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Empirical evidence</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Write definition...]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Analyzing eDNA sequencing data from target water bodies.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Confirmation bias</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Write definition...]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Interpreting every stick structure as evidence of primate nesting.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Epistemological humility</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Write definition...]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Acknowledging that low-density cryptid populations are difficult to detect.</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Short Exercise</h4>
                    <p style="font-size:0.9rem; margin-bottom:0.5rem; text-align:justify;"><strong>Scenario A:</strong> Describe a situation where a researcher might prematurely dismiss an anomaly (e.g., throwing out genuine hair samples due to poor microscope focus).</p>
                    <p style="font-size:0.9rem; margin-bottom:1rem; text-align:justify;"><strong>Scenario B:</strong> Describe a situation where a researcher might prematurely accept an anomaly (e.g., mistaking a mangy coyote for a Chupacabra without genetic confirmation).</p>
                    
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; font-size:0.85rem;">
                        <strong>Week 1 Assignment:</strong> Submit a 500-word Reflection Essay explaining the required scientific posture for cryptozoological research.
                    </div>
                </div>
            `
        },
        {
            title: "Week 2 &mdash; Taxonomy, Holotypes & IHSE Protocols",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 2 &mdash; Taxonomy, Holotypes &amp; IHSE Protocols</h2>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; font-style:italic;">Compendium Sections: Pages 6, 11, 14; Field Protocols 10 &amp; 13</p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Learning Objectives</h4>
                    <ul style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Analyze ICZN holotype requirements under Article 72.5.1.</li>
                        <li>Differentiate and apply IHSE Protocol 10 (Primary Holotype Alternatives) and Protocol 13 (Advanced Validation).</li>
                        <li>Explain how multi-spectral imaging verifies biological structure and exposes synthetic hoaxes.</li>
                        <li>Describe the process of independent genomic sequencing and database registration.</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Guided Reading Questions</h4>
                    <ol style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Why is a physical holotype specimen the scientific gold standard in biological taxonomy?</li>
                        <li>Under what specific conditions does IHSE permit holotype alternatives (non-invasive documentation)?</li>
                        <li>What specific forms of digital and biological evidence are required to substitute for a specimen?</li>
                        <li>Why must genomic sequences be replicated across independent laboratories before validation?</li>
                        <li>How does multi-spectral imaging reveal sub-surface vascular networks, exposing costumes?</li>
                    </ol>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Worksheet: Holotype vs. Holotype Alternative</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Requirement</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Physical Holotype</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Protocol 10 Alternative</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Protocol 13 Validation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Physical specimen</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Mandatory</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Not Required</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Not Required</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">3D structural data</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Optional</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">LiDAR/Photogrammetry</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">3D musculoskeletal scans</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Multi-spectral</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Optional</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Visible/IR/UV photography</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Full vascular IR mapping</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Genomic sequencing</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Optional</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">mtDNA sequencing</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Full genomic sequencing</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Verification</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Peer review</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">IHSE registry approval</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Independent genomic replication</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Design Exercise</h4>
                    <p style="font-size:0.9rem; margin-bottom:1rem; text-align:justify;">Draft a holotype-alternative evidence plan for a hypothetical species (e.g., a relict hominid). Include multi-spectral imaging methods, 3D scanning approaches, genomic sampling strategy, and an ethical justification for non-lethal collection.</p>
                    
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; font-size:0.85rem;">
                        <strong>Week 2 Assignment:</strong> Create a prototype holotype-alternative submission packet for your target species, outlining the documentation layout.
                    </div>
                </div>
            `
        },
        {
            title: "Week 3 &mdash; Metrology, Calibration & Field Reliability",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 3 &mdash; Metrology, Calibration &amp; Field Reliability</h2>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; font-style:italic;">Compendium Sections: Pages 12 &amp; 15; Field Protocols 2, 7, 8, 9</p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Learning Objectives</h4>
                    <ul style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Understand IHSE metrology standards and measurement error propagation.</li>
                        <li>Apply calibration tolerances across electronic, acoustic, and spatial field sensors.</li>
                        <li>Maintain audit-ready field calibration logs to verify data integrity.</li>
                        <li>Evaluate instrument reliability under extreme wilderness conditions (temperature, humidity).</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Guided Reading Questions</h4>
                    <ol style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Why does IHSE enforce strict calibration tolerances on all electronic and spatial sensors?</li>
                        <li>What specific environmental factors (e.g., altitude, temperature) degrade instrument accuracy?</li>
                        <li>Why must field calibration logs be audit-ready for peer-reviewed publication review?</li>
                        <li>How does calibration drift affect the scientific validity of eDNA, acoustic, and LiDAR data?</li>
                    </ol>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Worksheet: Calibration Tolerance Table</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Instrument</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Target Parameter</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Tolerances</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Calibration Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">eDNA Filter Kit</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Flow rate / Filter pore size</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">&plusmn; 0.05 L/min; 0.22 &mu;m</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Every 10 samples</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Acoustic Recorder</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Frequency response sweep</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">&plusmn; 0.1 dB gain flatness</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Every 30 deployment days</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">LiDAR Scanner</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Spatial coordinate resolution</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">&plusmn; 2.0 mm at 100 meters</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Pre- and post-expedition</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Calibration Log Template (Student Version)</h4>
                    <div style="font-family:monospace; font-size:0.8rem; background-color:#eae6df; padding:0.8rem; border-radius:4px; margin-bottom:1rem; border:1px solid #8d7657;">
                        Instrument: [e.g., Acoustic Recorder AR-401]<br>
                        Serial Number: [e.g., SN-994827]<br>
                        Technician: [Student Name]<br>
                        Date: [YYYY-MM-DD]<br>
                        Environmental Conditions: Temp: [ ] / Humidity: [ ] / Altitude: [ ]<br>
                        Pre-Calibration Values: [Frequency response sweeps]<br>
                        Post-Calibration Values: [Aligned gain levels]<br>
                        Within Tolerance? (Yes/No) / Upload Confirmation ID: [IHSE-XXXX]
                    </div>
                    
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; font-size:0.85rem;">
                        <strong>Week 3 Assignment:</strong> Submit a complete calibration log for three field instruments, showing calibration metrics within IHSE tolerances.
                    </div>
                </div>
            `
        },
        {
            title: "Week 4 &mdash; Historical Foundations & Archival Analysis",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 4 &mdash; Historical Foundations &amp; Archival Analysis</h2>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; font-style:italic;">Compendium Sections: Prolegomena Pages 1&ndash;15; Sighting Map Coordinates</p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Learning Objectives</h4>
                    <ul style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Distinguish medieval bestiary folklore from empirical zoological cataloging.</li>
                        <li>Understand Bernard Heuvelmans' historical role in establishing cryptozoological science.</li>
                        <li>Evaluate skeptical arguments regarding fossil abundance and visual errors.</li>
                        <li>Analyze historical archival sighting logs to extract consistent morphological data.</li>
                        <li>Interpret the pathways of historic cryptid-to-species transitions (e.g., mountain gorilla, coelacanth).</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Guided Reading Questions</h4>
                    <ol style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>How did bestiaries differ from the empirical focus of Carl Linnaeus and modern zoology?</li>
                        <li>What was Heuvelmans' primary contribution to modern cryptozoological methodology?</li>
                        <li>Why is scientific skepticism necessary when evaluating historical eyewitness reports?</li>
                        <li>What patterns of body proportions, foot structure, and behavior repeat across archival logs?</li>
                        <li>What lessons do past transitions of "mythical animals" into cataloged species teach researchers?</li>
                    </ol>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Worksheet: Archival Log Comparison</h4>
                    <p style="font-size:0.85rem; margin-bottom:0.5rem;">Select and analyze any two historical log records from the IHSE archives (e.g., ARC-411, ARC-912, ARC-181):</p>
                    <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Feature</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Log 1 Sighting</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Log 2 Sighting</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Consistent? (Yes/No/Partial)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Estimated Height</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Check]</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Gait description</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Check]</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Head / Neck posture</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Check]</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Limb proportions</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Check]</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Animal behavior</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Enter data]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; color:#8d7657; font-style:italic;">[Check]</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Historical Timeline Exercise</h4>
                    <p style="font-size:0.9rem; margin-bottom:1rem; text-align:justify;">Research and list three animal species once rejected as folkloric myths by mainstream science, detailing the specific physical evidence that confirmed their existence (e.g., Giant Squid, Okapi, Platypus).</p>
                    
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; font-size:0.85rem;">
                        <strong>Week 4 Assignment:</strong> Submit an Archival Analysis Report comparing two historical logs, evaluating morphological consistency and potential species origins.
                    </div>
                </div>
            `
        },
        {
            title: "Week 5 &mdash; Modern Tools: eDNA, Cognitive Bias & Ecological Constraints",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 5 &mdash; Modern Tools: eDNA, Cognitive Bias &amp; Ecological Constraints</h2>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; font-style:italic;">Compendium Sections: Prolegomena Pages 5&ndash;6; Field Protocols 3, 5, 8</p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Learning Objectives</h4>
                    <ul style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Understand environmental DNA (eDNA) concentration and metagenomic sequencing workflows.</li>
                        <li>Identify cognitive biases (pareidolia, confirmation bias, anchoring) in eyewitness reports.</li>
                        <li>Evaluate ecological carry capacity, predator-prey biomass ratios, and food web limitations.</li>
                        <li>Apply the IHSE Bias-Filtering Matrix to extract real signal from noise.</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Guided Reading Questions</h4>
                    <ol style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>What makes environmental DNA (eDNA) highly valuable for detecting low-density, elusive species?</li>
                        <li>How does metagenomic sequencing reveal complete ecosystem profiles from a single sample?</li>
                        <li>How does the neurological Fusiform Face Area trigger pareidolia in forest environments?</li>
                        <li>How does historical folkloric anchoring skew a witness's reconstruction of size and shape?</li>
                        <li>What ecological factors determine whether a regional ecosystem can support a large cryptid?</li>
                    </ol>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Worksheet: Bias-Filtering Table</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.75rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Report</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Environmental Variables</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Observer Reliability</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Cognitive Bias Indicators</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Ecological Plausibility</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Class (1&ndash;5)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">#1</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Dusk, dense pine cover, fog.</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Low (fatigued hunter).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">High (pareidolia from shadows).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">High (abundant water/prey).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">2</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">#2</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Mid-day, clear lake margins.</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">High (trained biologist).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Low (objective descriptions).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Moderate (lake fish biomass).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">4</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">#3</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Night, suburban highway.</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Low (passing driver).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">High (anchoring to local myth).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Low (heavy human traffic).</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">1</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Ecological Modeling Exercise</h4>
                    <p style="font-size:0.9rem; margin-bottom:1rem; text-align:justify;">For a chosen biome (e.g., the Pacific Northwest coniferous forest), list primary prey species, vegetation density, water sources, and human encroachment patterns. Evaluate whether it could support a breeding group of 800-lb primates.</p>
                    
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; font-size:0.85rem;">
                        <strong>Week 5 Assignment:</strong> Apply the IHSE bias-filtering matrix to 10 sighting reports, cataloging environment, bias, and ecological plausibility.
                    </div>
                </div>
            `
        },
        {
            title: "Week 6 &mdash; Terrestrial Hominids & the Fossil Gap",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 WEEK 6 &mdash; Terrestrial Hominids &amp; the Fossil Gap</h2>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; font-style:italic;">Compendium Sections: Chapter I, Pages 1&ndash;20; Field Protocols 4, 12</p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Learning Objectives</h4>
                    <ul style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>Analyze global distribution patterns of relict hominoid sighting reports.</li>
                        <li>Evaluate <em>Gigantopithecus blacki</em> fossil records and morphological traits.</li>
                        <li>Examine the taphonomic causes of the North American fossil gap.</li>
                        <li>Differentiate bear misidentifications from bipedal biological hypotheses.</li>
                        <li>Conduct comparative morphometric analysis of hominoid tracks and gait.</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Guided Reading Questions</h4>
                    <ol style="margin-left: 1.2rem; margin-bottom: 1rem; font-size:0.9rem; line-height:1.5; color:#2b2319;">
                        <li>What geographic trends correlate with global relict hominoid reports?</li>
                        <li>Why is <em>Gigantopithecus blacki</em> considered a key candidate ancestor?</li>
                        <li>How do soil acidity, humidity, and scavengers explain the lack of primate fossils in forests?</li>
                        <li>What behavioral and anatomical features distinguish a relict hominoid from a standing bear?</li>
                        <li>What elements are required to construct a testable, falsifiable hominoid hypothesis?</li>
                    </ol>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Worksheet: Comparative Morphology Table</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.75rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Trait</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Relict Hominoids</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Homo sapiens</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Gorilla gorilla</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Gigantopithecus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Height</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">6.5 &ndash; 9.0 ft</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">5.0 &ndash; 6.5 ft</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">4.5 &ndash; 6.0 ft</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Estimated 9.0+ ft</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Gait</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Bipedal (Compliant)</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Bipedal (Heel-strike)</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Knuckle-walking</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Quadrupedal / Facultative</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Arm/Leg Ratio</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Elongated arms (intermembral 80-90)</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Intermembral ratio ~70</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Intermembral ratio ~115</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Extremely robust arms</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Foot morphology</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Flexible mid-tarsal joint</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Rigid longitudinal arch</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Opposable hallux</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Robust, planar structure</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Cranial posture</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Forward-set foramen magnum</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Centered foramen magnum</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Rearward foramen magnum</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Low-angled occipital</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.4rem;">Biomechanics Exercise</h4>
                    <p style="font-size:0.9rem; margin-bottom:0.5rem; text-align:justify;"><strong>1. Compliant Gait:</strong> Explain how a compliant gait (bent-knee, bent-hip locomotion) differs from human heel-strike walk, and how this reduces vertical displacement of the torso.</p>
                    <p style="font-size:0.9rem; margin-bottom:1rem; text-align:justify;"><strong>2. Trackway Analysis:</strong> Why does this distinction matter when auditing trackways, specifically regarding foot flexibility and mud slippage markings?</p>
                    
                    <div class="academic-note" style="margin-top:0.5rem; margin-bottom:0.5rem; font-size:0.85rem;">
                        <strong>Week 6 Assignment:</strong> Write a comparative morphology paper proposing a testable hypothesis regarding the biomechanical feasibility of Sasquatch.
                    </div>
                </div>
            `
        },
        {
            title: "Final Project &mdash; IHSE Investigative Dossier",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1.2rem;">📘 FINAL PROJECT &mdash; IHSE Investigative Dossier</h2>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.5rem;">Dossier Requirements</h4>
                    <p style="font-size:0.95rem; line-height:1.6; text-align:justify; margin-bottom:1rem;">
                        To complete the course, students must submit a comprehensive, scientific field dossier detailing an anomalous biological investigation. The dossier must demonstrate adherence to all IHSE metrological, forensic, and ethical protocols, and contain the following sections:
                    </p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; font-size:0.9rem; line-height:1.6; color:#2b2319;">
                        <li style="margin-bottom:0.4rem;"><strong>Section 1: Ecological Plausibility:</strong> Map out local flora, water distribution, predator-prey biomass, and carrying capacity parameters within a 100 sq km zone.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Section 2: Historical Record Analysis:</strong> Critically audit regional folklore records, comparing sightings for morphological consistency and identifying biases.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Section 3: Evidence Evaluation:</strong> Document physical evidence (e.g., hair, cast, audio recording) and detail chain-of-custody logs and integrity hashes.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Section 4: Protocol 10/13 Proposal:</strong> Formulate a detailed, non-invasive holotype alternative plan (multi-spectral, 3D structural model, independent genomic validation).</li>
                        <li style="margin-bottom:0.4rem;"><strong>Section 5: Calibration Documentation:</strong> Provide complete metrological calibration logs for all field equipment used during the investigation.</li>
                        <li style="margin-bottom:0.4rem;"><strong>Section 6: Cognitive-Bias Filtering:</strong> Document and filter witness accounts, separating pareidolia and anchoring from objective physical observations.</li>
                    </ul>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.5rem;">Final Dossier Checklist</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:1.5rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Component</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem; text-align:center;">Completed? (Yes/No)</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem;">Review Notes / Sign-Off</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Ecological analysis</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Verifies local prey biomass levels.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Historical analysis</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Validates morphological patterns.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Evidence evaluation</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Includes chain-of-custody log.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Protocol 10/13 proposal</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Non-invasive holotype submission format.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; font-weight:600;">Calibration logs</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Auditable logs within tolerances.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Bias-filtering</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Filters eyewitness testimonies.</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.4rem; font-weight:600;">Final synthesis</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem; text-align:center; color:#8d7657; font-style:italic;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.4rem;">Proves final species taxonomic validity.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        }
    ],
    project: [
        {
            title: "IHSE Field Project Dossier &mdash; Cover Page",
            content: `
                <div style="text-align:center; padding: 1.5rem 0;">
                    <h3 style="font-family:var(--font-ui); font-size:0.8rem; letter-spacing:4px; text-transform:uppercase; color:var(--text-muted); margin-bottom:1.5rem;">Institute of Hidden Species Expeditions</h3>
                    <div style="margin: 1.5rem auto; width: 80px; height: 80px; border: 2px solid #8d7657; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative;">
                        <div style="width: 60px; height: 60px; border: 1px dashed #8d7657; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="font-family:var(--font-header); font-size:1.4rem; font-weight:bold; color:#8d7657;">IHSE</span>
                        </div>
                    </div>
                    <h1 style="font-family:var(--font-header); font-size:2rem; line-height:1.3; color:#2b2319; margin-bottom:0.5rem;">FIELD EXPEDITION DOSSIER</h1>
                    <h2 style="font-family:var(--font-header); font-size:1.15rem; font-weight:600; color:#5a4b37; margin-bottom:2.5rem; letter-spacing:1px;">Introductory Cryptozoology &mdash; Level 1</h2>
                    
                    <div style="max-width: 420px; margin: 0 auto; text-align: left; background-color: rgba(141,118,87,0.03); padding: 1.5rem; border: 1px solid rgba(141,118,87,0.2); border-radius: 4px;">
                        <div style="display: flex; align-items: baseline; margin-bottom: 1rem;">
                            <span style="font-family:var(--font-ui); font-size: 0.75rem; font-weight:600; color:#8d7657; width: 130px; letter-spacing: 1px;">INVESTIGATOR:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 1rem;">
                            <span style="font-family:var(--font-ui); font-size: 0.75rem; font-weight:600; color:#8d7657; width: 130px; letter-spacing: 1px;">FIELD RANK:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 1rem;">
                            <span style="font-family:var(--font-ui); font-size: 0.75rem; font-weight:600; color:#8d7657; width: 130px; letter-spacing: 1px;">COMMENCE DATE:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline;">
                            <span style="font-family:var(--font-ui); font-size: 0.75rem; font-weight:600; color:#8d7657; width: 130px; letter-spacing: 1px;">RESEARCH SECTOR:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 3rem; font-family:var(--font-body); font-size: 0.8rem; font-style: italic; color: var(--text-muted);">
                        Notice: This document is the property of the Institute of Hidden Species Expeditions (IHSE). Copying or unauthorized dissemination of classified cryptid records is strictly prohibited under Protocol 9.
                    </div>
                </div>
            `
        },
        {
            title: "Field Project Guidelines",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.3rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:12rem;">📋 IHSE Dossier Guidelines</h2>
                    <p style="font-size:0.9rem; line-height:1.6; text-align:justify; margin-bottom:1rem; text-indent: 1.5rem;">
                        This workbook template constitutes the final practical examination for <strong>Introductory Cryptozoology (Level 1)</strong>. Student investigators are required to compile a rigorous, scientific field dossier evaluating a candidate anomalous species of their choosing.
                    </p>
                    <p style="font-size:0.9rem; line-height:1.6; text-align:justify; margin-bottom:1rem; text-indent: 1.5rem;">
                        All research and evidence submissions must strictly adhere to the academic standards of the Institute of Hidden Species Expeditions. Hypothetical classifications, ecological data, and physical evidence evaluations must be documented clearly without copyrighted text or unsubstantiated claims.
                    </p>
                    
                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.5rem; margin-top:1.2rem;">Evaluation Criteria</h4>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; font-size:0.85rem; line-height:1.5; color:#2b2319;">
                        <li style="margin-bottom:0.3rem;"><strong>Scientific Rigor (25%):</strong> Standardized classification and biomechanical plausibility.</li>
                        <li style="margin-bottom:0.3rem;"><strong>Ecological Integration (25%):</strong> Biomass calculations and human encroachment models.</li>
                        <li style="margin-bottom:0.3rem;"><strong>Evidence Auditing (25%):</strong> Integrity hashes, metrology records, and Protocol 13 compliance.</li>
                        <li style="margin-bottom:0.3rem;"><strong>Cognitive Filtering (25%):</strong> Misidentification lists and witness reliability ratings.</li>
                    </ul>

                    <h4 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.5rem;">Dossier Structure</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.8rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Section</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Description</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">Page</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">0 &amp; 1</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Cryptid Selection &amp; Executive Summary</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">3</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">2</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Scientific Classification &amp; Morphology</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">4</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">3</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Ecological Plausibility Analysis</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">5</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">4</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Historical Record &amp; Consistency Table</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">6</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">5</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Evidence Evaluation (Trackway, eDNA)</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">7</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">6</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Cognitive-Bias &amp; Witness Reliability</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">8</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">7</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Comparative Morphology &amp; Biomechanics</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">9</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">8</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Protocol 10 Holotype Alternatives</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">10</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">9</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Field Instrument Calibration Logs</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">11</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">10</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;">Final Assessment &amp; Verdict</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        {
            title: "0. Cryptid Selection &amp; 1. Executive Summary",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">📌 0. Cryptid Selection Page</h2>
                    
                    <div style="margin-bottom: 0.8rem;">
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.6rem;">
                            <span style="font-weight: 600; font-size: 0.85rem; color:#2b2319; width: 120px;">Cryptid Name:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.6rem;">
                            <span style="font-weight: 600; font-size: 0.85rem; color:#2b2319; width: 120px;">Alternate Names:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.6rem;">
                            <span style="font-weight: 600; font-size: 0.85rem; color:#2b2319; width: 120px;">Geographic Region:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        </div>
                    </div>
                    
                    <h4 style="font-family:var(--font-header); font-size:0.9rem; color:#8d7657; margin-bottom:0.4rem;">Cryptid Category</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.8rem; margin-bottom: 1.2rem;">
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Relict Hominid</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Aquatic Cryptid</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Winged Cryptid</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Terrestrial Quadruped</div>
                        <div style="display: flex; align-items: center; grid-column: span 2;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Other: <span style="flex-grow: 1; border-bottom: 1px dotted #8d7657; margin-left: 5px; height: 1rem;"></span></div>
                    </div>

                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:0.6rem; margin-top:1.2rem;">📝 1. Executive Summary</h2>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.6rem; font-style:italic;">Provide a concise overview of the cryptid and your investigative goals (150&ndash;250 words).</p>
                    
                    <div style="border: 1px dashed rgba(141,118,87,0.4); padding: 0.5rem; border-radius: 4px; background-color: rgba(141,118,87,0.02); min-height: 180px;">
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.5rem;"></div>
                    </div>
                </div>
            `
        },
        {
            title: "2. Species Candidate Overview",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">🧬 2. Species Candidate Overview</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.6rem;">2.1 Proposed Scientific Classification (Hypothetical)</h3>
                    <div style="margin-left: 1rem; margin-bottom: 1.2rem; font-size: 0.85rem;">
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Kingdom:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Phylum:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Class:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Order:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Family:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Genus:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.4rem;">
                            <span style="width: 150px; font-weight: 600; color:#5a4b37;">Species (proposed):</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                    </div>

                    <h3 style="font-family:var(--font-header); font-size:1rem; color:#8d7657; margin-bottom:0.6rem;">2.2 General Morphological Description</h3>
                    <div style="font-size: 0.85rem;">
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.5rem;">
                            <span style="width: 130px; font-weight: 600; color:#5a4b37;">Key Traits:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                            <div style="display: flex; align-items: baseline; flex-grow: 1;">
                                <span style="width: 130px; font-weight: 600; color:#5a4b37;">Height/Length:</span>
                                <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                            </div>
                            <div style="display: flex; align-items: baseline; flex-grow: 1;">
                                <span style="width: 100px; font-weight: 600; color:#5a4b37;">Weight Est:</span>
                                <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: baseline; margin-bottom: 0.5rem;">
                            <span style="width: 130px; font-weight: 600; color:#5a4b37;">Locomotion:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                        <div style="margin-bottom: 0.5rem;">
                            <span style="font-weight: 600; color:#5a4b37; display:block; margin-bottom:0.2rem;">Distinguishing Features:</span>
                            <div style="border-bottom: 1px dotted #8d7657; height: 1.3rem;"></div>
                            <div style="border-bottom: 1px dotted #8d7657; height: 1.3rem;"></div>
                        </div>
                        <div>
                            <span style="font-weight: 600; color:#5a4b37; display:block; margin-bottom:0.2rem;">Behavioral Notes:</span>
                            <div style="border-bottom: 1px dotted #8d7657; height: 1.3rem;"></div>
                            <div style="border-bottom: 1px dotted #8d7657; height: 1.3rem;"></div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: "3. Ecological Plausibility Analysis",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">🌲 3. Ecological Plausibility Analysis</h2>
                    
                    <div style="font-size: 0.85rem; margin-bottom: 1rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">3.1 Habitat Region</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem; font-style:italic;">Describe the environment, flora, elevation, and climate where reported.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 1rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">3.2 Biomass &amp; Food Availability</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem; font-style:italic;">Is there sufficient prey base or vegetational carrying capacity to sustain a breeding population?</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 1rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">3.3 Range Contraction &amp; Human Encroachment</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem; font-style:italic;">Document historical range contraction using geographic barriers or human developmental data.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; border-top: 1px solid rgba(141,118,87,0.2); padding-top: 0.8rem; margin-top: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.4rem;">3.4 IHSE Ecological Assessment</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem; font-style:italic;">Based on the ecological carry limits, rate the biological plausibility of the target cryptid:</p>
                        <div style="display: flex; gap: 2rem; margin-bottom: 0.6rem;">
                            <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> High</div>
                            <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Moderate</div>
                            <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 6px; border-radius: 2px;"></span> Low</div>
                        </div>
                        <div style="display: flex; align-items: baseline;">
                            <span style="font-weight: 600; color:#5a4b37; margin-right: 5px;">Rationale:</span>
                            <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: "4. Historical Record Analysis",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">📜 4. Historical Record Analysis</h2>
                    
                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">4.1 Indigenous or Early Cultural Accounts</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem; font-style:italic;">Summaries only &mdash; do not use copyrighted content or folklore extracts.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">4.2 Archival Logs (If Applicable)</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem; font-style:italic;">List historical database reports, ship logs, or early local newspaper sightings.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.4rem; margin-top:0.8rem;">4.3 Morphological Consistency Table</h3>
                    <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin-bottom:0.8rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Feature</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Source 1</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Source 2</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Source 3</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">Consistent?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Height</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Y [ ] N</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Gait</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Y [ ] N</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Head/Body</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Y [ ] N</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Behavior</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Y [ ] N</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="font-size: 0.85rem; display: flex; align-items: baseline;">
                        <span style="font-weight: 600; color:#5a4b37; margin-right: 5px; white-space:nowrap;">IHSE Historical Assessment:</span>
                        <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                    </div>
                </div>
            `
        },
        {
            title: "5. Evidence Evaluation",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">🔍 5. Evidence Evaluation</h2>
                    
                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">5.1 Trackway Evidence</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem; font-style:italic;">Substrate type, gait cycle measurements, structural toe/heel impressions.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">5.2 Acoustic Evidence</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem; font-style:italic;">Spectrogram parameters, peak frequencies, biophonic vocal patterns.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">5.3 Photographic/Video Evidence</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem; font-style:italic;">Camera metadata, focal lengths, pixel compression analysis (Protocol 13).</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">5.4 eDNA or Biological Samples</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem; font-style:italic;">PCR runs, primer specificity, amplicon sequences, or hair medullary structures.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; border-top: 1px solid rgba(141,118,87,0.2); padding-top: 0.6rem; display: flex; align-items: baseline;">
                        <span style="font-weight: 600; color:#5a4b37; margin-right: 5px; white-space:nowrap;">Conclusion:</span>
                        <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                    </div>
                </div>
            `
        },
        {
            title: "6. Cognitive‑Bias Filtering",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">🧠 6. Cognitive-Bias Filtering</h2>
                    
                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">6.1 Misidentification Candidates</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem; font-style:italic;">Identify local known species or meteorological conditions commonly mistaken for the cryptid.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <div style="font-size: 0.85rem; margin-bottom: 0.8rem;">
                        <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">6.2 Folkloric Anchoring</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem; font-style:italic;">Analyze cultural storytelling, modern media myths, and psychological anchoring biases.</p>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>

                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">6.3 Witness Reliability Scoring</h3>
                    <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin-bottom:0.8rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Witness Name / ID</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Relationship to Sighting</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">Score (1-5)</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">IHSE Criteria Check</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"><span style="border-bottom: 1px dotted #8d7657; display:inline-block; width:100%; height:1rem;"></span></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"><span style="border-bottom: 1px dotted #8d7657; display:inline-block; width:100%; height:1rem;"></span></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Validated</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"><span style="border-bottom: 1px dotted #8d7657; display:inline-block; width:100%; height:1rem;"></span></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"><span style="border-bottom: 1px dotted #8d7657; display:inline-block; width:100%; height:1rem;"></span></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Validated</td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"><span style="border-bottom: 1px dotted #8d7657; display:inline-block; width:100%; height:1rem;"></span></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"><span style="border-bottom: 1px dotted #8d7657; display:inline-block; width:100%; height:1rem;"></span></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ]</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem; text-align:center;">[ ] Validated</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="font-size: 0.85rem; display: flex; align-items: baseline;">
                        <span style="font-weight: 600; color:#5a4b37; margin-right: 5px; white-space:nowrap;">IHSE Cognitive Assessment:</span>
                        <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1.1rem;"></div>
                    </div>
                </div>
            `
        },
        {
            title: "7. Comparative Morphology &amp; Biomechanics",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">🦍 7. Comparative Morphology</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.4rem;">7.1 Comparison Table</h3>
                    <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Trait</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Cryptid Specimen</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Species A (Known)</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Species B (Known)</th>
                                <th style="border:1px solid #8d7657; padding:0.3rem; text-align:left;">Comparative Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Height/Length</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Gait</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Limb Ratio</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Cranial Shape</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr>
                                <td style="border:1px solid #8d7657; padding:0.3rem; font-weight:600;">Foot Morphology</td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">7.2 Biomechanical Analysis</h3>
                    <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.3rem; font-style:italic;">Explain the gait model, weight distribution, or joint angle plausibility for skeletal support.</p>
                    <div style="font-size: 0.85rem;">
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                        <div style="border-bottom: 1px dotted #8d7657; height: 1.2rem;"></div>
                    </div>
                </div>
            `
        },
        {
            title: "8. Holotype or Holotype‑Alternative Proposal",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">📌 8. Holotype or Holotype-Alternative Proposal</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.4rem;">8.1 Proposed Holotype Alternative (Protocol 10)</h3>
                    <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.5rem; font-style:italic;">Select all non-lethal methodologies planned to satisfy species description parameters:</p>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 0.4rem; font-size: 0.8rem; margin-bottom: 1.2rem; margin-left:0.5rem;">
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Multi-spectral imaging (IR/UV spectrum validation)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> 3D LiDAR scan (Skeletal volumetric measurements)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> eDNA sampling (Sanger/Next-Gen metagenomic barcode)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Thermal imaging (Endothermic signature profile)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Trackway casting (Dental stone structural replica)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Acoustic triangulation (Multi-directional microphone array)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Environmental context documentation (Soil/Barometric baseline)</div>
                    </div>

                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.3rem;">8.2 Ethical Considerations</h3>
                    <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem; font-style:italic;">Explain why non-lethal documentation is preferred for low-density cryptid populations (Protocol 10 ethics).</p>
                    <div style="border: 1px dashed rgba(141,118,87,0.4); padding: 0.5rem; border-radius: 4px; background-color: rgba(141,118,87,0.02); min-height: 120px;">
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                    </div>
                </div>
            `
        },
        {
            title: "9. Calibration Documentation Summary",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:1rem;">📐 9. Calibration Documentation Summary</h2>
                    <p style="font-size:0.8rem; line-height:1.5; text-align:justify; margin-bottom:1rem;">
                        All metrological field measurements submitted to the IHSE database must be calibrated against secondary reference standards. List all field instruments used, their respective calibration dates, tolerance values, and certifying officers.
                    </p>

                    <h4 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.5rem;">Instrument Calibration Ledger</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin-bottom:1rem; border:1px solid #8d7657;">
                        <thead>
                            <tr style="background-color:#8d7657; color:#f7f5ef;">
                                <th style="border:1px solid #8d7657; padding:0.4rem; text-align:left;">Instrument</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem; text-align:left;">Calibration Date</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem; text-align:left;">Tolerance</th>
                                <th style="border:1px solid #8d7657; padding:0.4rem; text-align:left;">Verified By</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="height: 1.6rem;">
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr style="height: 1.6rem;">
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr style="height: 1.6rem;">
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr style="height: 1.6rem;">
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                            <tr style="height: 1.6rem;">
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                                <td style="border:1px solid #8d7657; padding:0.3rem;"></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div style="font-family:var(--font-ui); font-size:0.75rem; border:1px solid rgba(141,118,87,0.3); border-radius:4px; padding:0.6rem; background-color:rgba(141,118,87,0.03);">
                        <strong>Calibration Standard Rule:</strong> Tolerances must align with IHSE Metrological Protocol 4. Specimen measurements taken with unverified instruments are classified as anecdotal and cannot be added to the registry.
                    </div>
                </div>
            `
        },
        {
            title: "10. Final Assessment &amp; Verdict",
            content: `
                <div style="padding: 0.5rem 0;">
                    <h2 style="font-family:var(--font-header); font-size:1.2rem; color:#2b2319; border-bottom:2px solid #8d7657; padding-bottom:0.4rem; margin-bottom:0.8rem;">🎓 10. Final Assessment</h2>
                    
                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.4rem;">IHSE Scientific Verdict</h3>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 0.4rem; font-size: 0.8rem; margin-bottom: 0.8rem; margin-left:0.5rem;">
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Confirmed Misidentification (Known species/Phenomenon)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Unresolved Phenomenon (Further evidence required)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> Plausible Biological Species (Taxonomic candidate)</div>
                        <div style="display: flex; align-items: center;"><span style="display: inline-block; width: 12px; height: 12px; border: 1px solid #8d7657; margin-right: 8px; border-radius: 2px;"></span> High-Priority Candidate for Further Study (Funding requested)</div>
                    </div>

                    <h3 style="font-family:var(--font-header); font-size:0.95rem; color:#8d7657; margin-bottom:0.2rem;">Final Justification</h3>
                    <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem; font-style:italic;">Synthesize classification, evidence strength, and ecology (200&ndash;300 words).</p>
                    <div style="border: 1px dashed rgba(141,118,87,0.4); padding: 0.5rem; border-radius: 4px; background-color: rgba(141,118,87,0.02); min-height: 140px; margin-bottom:0.8rem;">
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                        <div style="border-bottom: 1px dotted rgba(141,118,87,0.25); height: 1.4rem;"></div>
                    </div>

                    <div style="display: flex; gap: 1rem; border-top: 1px solid rgba(141,118,87,0.2); padding-top: 0.6rem; font-size:0.75rem;">
                        <div style="flex-grow: 1;">
                            <div style="display: flex; align-items: baseline; margin-bottom:0.3rem;">
                                <span style="font-weight: 600; color:#5a4b37;">Investigator Sign:</span>
                                <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1rem;"></div>
                            </div>
                            <div style="display: flex; align-items: baseline;">
                                <span style="font-weight: 600; color:#5a4b37;">Date:</span>
                                <div style="flex-grow: 1; border-bottom: 1px dotted #8d7657; height: 1rem;"></div>
                            </div>
                        </div>
                        <div style="width: 70px; height: 70px; border: 1px double #8d7657; border-radius:50%; display:flex; align-items:center; justify-content:center; text-align:center; font-family:var(--font-header); font-size:0.5rem; color:#8d7657; font-weight:600; opacity:0.7;">
                            IHSE<br>OFFICIAL<br>SEAL
                        </div>
                    </div>
                </div>
            `
        }
    ]
};

// --- SEEDED RANDOM AND PROCEDURAL CONTENT GENERATOR ENGINE ---
class SeededRandom {
    constructor(seedString) {
        let hash = 0;
        for (let i = 0; i < seedString.length; i++) {
            hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
        }
        this.seed = Math.abs(hash) || 123456789;
    }
    next() {
        this.seed = (1103515245 * this.seed + 12345) % 2147483648;
        return this.seed / 2147483648;
    }
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    pick(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[this.nextInt(0, arr.length - 1)];
    }
}

const PROC_DATA = {
    agents: [
        "Dr. Eleanor Vance", "Prof. Thomas Thorne", "Dr. Sarah Lin", "Col. Marcus Vance",
        "Dr. Jacob Mercer", "Dr. Angela Martinez", "Prof. Alistair Sterling", "Dr. Chloe Zhao",
        "Dr. Nicholas Cross", "Dr. Helen Vance", "Prof. Benjamin Sterling", "Dr. Rebecca Mercer"
    ],
    locations: {
        ch1: [
            "Bluff Creek, California", "Bossburg, Washington", "Shennongjia Forest, Hubei",
            "Mount Everest foothills, Nepal", "Kerinci Seblat, Sumatra", "Altai Mountains, Siberia",
            "Cascade Mountains, Oregon", "Vancouver Island, BC", "Blue Mountains, Australia"
        ],
        ch2: [
            "Loch Ness, Scotland", "Lake Champlain, Vermont", "Congo Basin River System",
            "Mariana Trench margins", "Lake Okanagan, BC", "Sargasso Sea",
            "Great Barrier Reef, Coral Sea", "Lake Baikal, Siberia", "Chesapeake Bay, Maryland"
        ],
        ch3: [
            "Point Pleasant, West Virginia", "Pine Barrens, New Jersey", "Black Forest, Germany",
            "Gobi Desert margins", "Mount Rainier, Washington", "Pennine Alps, Switzerland",
            "Transylvanian Alps", "Death Valley, California", "Nullarbor Plain, Australia"
        ],
        ch4: [
            "IHSE Forensics Lab A, Geneva", "IHSE Field Post 4, British Columbia", "PCR Suite B, Tokyo",
            "Mobile Research Trailer 9", "IHSE Analytical Facility, Seattle", "Quantico Forensic Annex",
            "Svalbard Seed Vault Vault-B", "Manaus River Station, Brazil"
        ],
        ch5: [
            "IHSE Archival Archive 2, London", "Museum of Comparative Zoology, Boston", "IHSE Ethics Committee Room",
            "Media Analysis Suite 4, Paris", "Historical Archives, Vienna", "IHSE Verification Wing, Tokyo"
        ],
        preface: ["Institute Headquarters, Geneva", "Geneva Taxonomic Registry", "Oxford Biological Archive"],
        intro: ["Royal Society Library, London", "Paris Natural History Museum", "British Museum Annex"]
    }
};

function getChapterPageCount(chapId) {
    if (chapId === "preface" || chapId === "intro") return 15;
    if (chapId === "outline") return 28;
    if (chapId === "protocols") return 14;
    if (chapId === "workbook") return 8;
    if (chapId === "project") return 12;
    if (chapId === "ch1" || chapId === "ch2" || chapId === "ch3" || chapId === "ch4" || chapId === "ch5") return 80;
    return 0;
}

function getTextbookPage(chapId, pageIndex) {
    const total = getChapterPageCount(chapId);
    if (pageIndex < 0 || pageIndex >= total) return null;
    
    // If we have a hardcoded page in TEXTBOOK_DB, return it
    if (TEXTBOOK_DB[chapId] && pageIndex < TEXTBOOK_DB[chapId].length) {
        return TEXTBOOK_DB[chapId][pageIndex];
    }
    
    // Otherwise, generate procedurally
    return generateProceduralPage(chapId, pageIndex);
}

function generateProceduralPage(chapId, pageNum) {
    const seedKey = `${chapId}_page_${pageNum}`;
    const rand = new SeededRandom(seedKey);
    
    const year = rand.nextInt(2021, 2026);
    const month = rand.pick(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    const day = rand.nextInt(1, 28);
    const dateStr = `${month} ${day}, ${year}`;
    
    const agent = rand.pick(PROC_DATA.agents);
    const locPool = PROC_DATA.locations[chapId] || PROC_DATA.locations.ch1;
    const location = rand.pick(locPool);
    
    let title = "";
    let content = "";
    
    const templateStyle = pageNum % 3; // 0: Academic essay, 1: Field report/Worksheet, 2: Technical log/Data table
    
    if (chapId === "preface") {
        if (templateStyle === 0) {
            title = `Taxonomic Principle ${pageNum}: Epistemological Limits`;
            content = `
                <p>The academic pursuit of cryptozoology must align with strict taxonomic principles. When evaluating a potential new taxon, we face the challenge of distinguishing authentic anomalies from cognitive noise, misidentification, and fraudulent fabrications. A sound scientific methodology requires that we define the limits of our search and the standard of evidence needed to justify a paradigm shift.</p>
                <p>In this section, we analyze the philosophical foundations of classification. If a species exists only in low-density populations in extreme terrain, our failure to recover a holotype is not proof of non-existence, but rather a reflection of search efficiency. However, the researcher must guard against confirmation bias. Every anomalous signal must be subjected to the same rigorous testing as a standard zoological discovery.</p>
                <div class="academic-note">
                    "A science that rejects anomalies out of hand ceases to be empirical; a science that accepts them without verification ceases to be rational." <br>&mdash; IHSE Academic Charter, Sec. 4.1
                </div>
            `;
        } else if (templateStyle === 1) {
            title = `Protocol ${pageNum}: Holotype Alternatives in Extremis`;
            content = `
                <p>In classical taxonomy, the physical holotype is the absolute standard. However, in cases involving critically endangered or elusive cryptid populations, the physical collection of a specimen may be ecologically damaging or practically impossible. This protocol outlines the criteria for accepting alternative nomenclatural benchmarks, such as high-definition anatomical photography, 3D laser scans, and high-coverage genome sequencing.</p>
                <p>These alternatives must only be utilized when the physical collection would jeopardize the survival of the target population. Under these rules, established by the IHSE Board of Taxonomy on ${dateStr}, any proposed alternative description must be accompanied by independent validation of the genetic sequences and multi-spectral structural verification to rule out digital manipulation.</p>
            `;
        } else {
            title = `Reference Guide ${pageNum}: Key Metrology Calibrations`;
            content = `
                <p>The reliability of field measurements depends entirely on the calibration of our analytical instruments. Before embarking on an expedition, researchers must verify that their field kits conform to IHSE standards. The table below lists the required tolerances and calibration frequencies for primary field tools.</p>
                <div style="overflow-x:auto; margin: 1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">Instrument</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Target Parameter</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Tolerance</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Calibration Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">eDNA Filter Kit</td>
                                <td style="padding:0.4rem;">Pore Size Consistency</td>
                                <td style="padding:0.4rem;">&plusmn;0.02 microns</td>
                                <td style="padding:0.4rem;">Pre-expeditions</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Acoustic Recorder</td>
                                <td style="padding:0.4rem;">Frequency Response</td>
                                <td style="padding:0.4rem;">&plusmn;1.5 Hz</td>
                                <td style="padding:0.4rem;">Every 6 months</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">LiDAR Scanner</td>
                                <td style="padding:0.4rem;">Spatial Resolution</td>
                                <td style="padding:0.4rem;">&plusmn;2 mm</td>
                                <td style="padding:0.4rem;">Annual</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>All calibration records must be uploaded to the IHSE central database prior to departure to ensure the data's auditability.</p>
            `;
        }
    } else if (chapId === "intro") {
        if (templateStyle === 0) {
            title = `Historical Essay: The ${rand.pick(["18th Century", "19th Century", "Early 20th Century"])} Expeditions`;
            content = `
                <p>The history of anomalous biology is punctuated by expeditions that sought to cross the boundary between myth and science. In the late ${rand.pick(["1800s", "1900s"])}, naturalists traveled to remote basins in search of specimens rumored by local populations. Many of these early efforts were under-funded and suffered from a lack of standard scientific equipment, relying instead on hunter guides and hearsay.</p>
                <p>Yet, these archives contain valuable baseline observations. By comparing modern sighting coordinates with historical records, we can trace potential habitat contraction over the past century. This historical mapping indicates that several target species have experienced severe range restrictions, withdrawing into high-altitude forests or inaccessible swamp networks as human encroachment expanded.</p>
            `;
        } else if (templateStyle === 1) {
            title = `Archival Record: Sighting Log ref. ARC-${rand.nextInt(100, 999)}`;
            content = `
                <p><strong>Archive Date:</strong> ${dateStr}<br>
                <strong>Origin:</strong> ${location}<br>
                <strong>Source:</strong> Historical Correspondence File #${rand.nextInt(1000, 9999)}<br>
                <strong>Assessed by:</strong> ${agent}</p>
                <p>An audit of historical reports from this region reveals a consistent description of a creature known locally as the "Hairy Forest Dweller." Sighting notes describe a creature with a low-slung head, no tail, and a peculiar bipedal gait. The report matches contemporary field accounts, suggesting that a small, stable population has inhabited the watershed for at least two centuries.</p>
                <div class="academic-note">
                    "The persistent matching of morphological descriptions across centuries strongly suggests a real biological basis rather than folklore." <br>&mdash; ${agent}
                </div>
            `;
        } else {
            title = `Historical Timeline: Cryptid Discoveries`;
            content = `
                <p>To put our current investigations into perspective, we must examine the timeline of transition, where folklore became recognized biology. The table below lists several species that were once dismissed as cryptids before their scientific validation.</p>
                <div style="overflow-x:auto; margin:1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">Cryptid Description</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Scientific Taxon</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Year Described</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Key Proof</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">Deep sea kraken</td>
                                <td style="padding:0.4rem;">Architeuthis dux</td>
                                <td style="padding:0.4rem;">1857</td>
                                <td style="padding:0.4rem;">Beached carcass</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">African unicorn</td>
                                <td style="padding:0.4rem;">Okapia johnstoni</td>
                                <td style="padding:0.4rem;">1901</td>
                                <td style="padding:0.4rem;">Skin and skull</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Mountain ape-man</td>
                                <td style="padding:0.4rem;">Gorilla beringei</td>
                                <td style="padding:0.4rem;">1902</td>
                                <td style="padding:0.4rem;">Shot specimen</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>This timeline serves as a warning against scientific arrogance. The wilderness still holds secrets for those with the patience to look.</p>
            `;
        }
    } else if (chapId === "ch1") { // Terrestrial Hominids
        const idStr = `H-${rand.nextInt(100, 999)}`;
        if (templateStyle === 0) {
            title = `Field Report: Encounter Sighting Ref ${idStr}`;
            content = `
                <p><strong>Field Sighting Log</strong><br>
                <strong>Date:</strong> ${dateStr}<br>
                <strong>Location:</strong> ${location}<br>
                <strong>Lead Investigator:</strong> ${agent}<br>
                <strong>Status:</strong> Filed in Archive Hominidae</p>
                <p>While conducting a nocturnal search along the upper ridge of the forest, the team observed a massive bipedal figure using FLIR thermal cameras. The subject was estimated to stand approximately ${rand.nextInt(7, 10)} feet tall. It exhibited a prominent sagittal crest and long arms that extended past its knees. The subject was moving with a fluid, compliant gait through dense undergrowth, showing no signs of difficulty in the steep terrain.</p>
                <p>We collected hair samples and fresh footprint casts from the site the following morning. Dermal friction ridges are visible on the lateral margin of the tracks, indicating an active primate footprint. The search will continue at dawn.</p>
            `;
        } else if (templateStyle === 1) {
            title = `Technical Log: Trackway Parameters ${idStr}`;
            content = `
                <p>This log details the physical parameters of a footprint trackway discovered at ${location}. The tracks were preserved in damp silt along a river bank, allowing for high-resolution plaster casts.</p>
                <div style="overflow-x:auto; margin:1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">Parameter</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Measurement</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Implication</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">Footprint Length</td>
                                <td style="padding:0.4rem;">${rand.nextInt(14, 18)} inches</td>
                                <td style="padding:0.4rem;">Indicates huge height</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Width (Forefoot)</td>
                                <td style="padding:0.4rem;">${rand.nextInt(6, 8)} inches</td>
                                <td style="padding:0.4rem;">Broad weight distribution</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Stride Length</td>
                                <td style="padding:0.4rem;">${rand.nextInt(50, 75)} inches</td>
                                <td style="padding:0.4rem;">Exceeds human stride by 50%</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Mid-tarsal Break</td>
                                <td style="padding:0.4rem;">Visible flexion</td>
                                <td style="padding:0.4rem;">Primate foot adaptability</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>The depth of the impressions indicates a total body weight exceeding 650 pounds. Comparison with local black bear footprints shows no claw marks and a clear pentadactyl structure with a distinct heel shape.</p>
            `;
        } else {
            title = `Primate Migration Study: ${location}`;
            content = `
                <p>The presence of large hominids in the temperate forests of ${location} raises serious ecological questions regarding food availability and seasonal migration. Primate physiology generally requires high-caloric food sources. During the winter, these hominoids must either adapt their diet to low-grade browse or migrate to lower elevations.</p>
                <p>Our bioacoustic monitoring network has detected a downward shift in low-frequency vocalizations during early November, suggesting a seasonal migration pattern. This migration corresponds with the movements of elk herds, which may serve as a major food source. We hypothesize that these creatures follow game trails, avoiding human settlements by utilizing deep river canyons.</p>
                <div class="academic-note">
                    "The correlation between elk movements and cryptid sightings suggests a predator-prey relationship in these forest ecosystems." <br>&mdash; Dr. Sarah Lin
                </div>
            `;
        }
    } else if (chapId === "ch2") { // Marine
        const idStr = `M-${rand.nextInt(100, 999)}`;
        if (templateStyle === 0) {
            title = `Sonar Analysis: Scan Ref ${idStr}`;
            content = `
                <p><strong>Sonar Sounding Log</strong><br>
                <strong>Date:</strong> ${dateStr}<br>
                <strong>Target Water Body:</strong> ${location}<br>
                <strong>Equipment:</strong> Dual-Beam Sonar Sounder<br>
                <strong>Lead Analyst:</strong> ${agent}</p>
                <p>During a deep-water grid sweep at ${location}, the sonar array detected a large, moving target at a depth of ${rand.nextInt(80, 150)} meters. The target was tracked for over ${rand.nextInt(10, 45)} minutes. Its acoustic signature indicated a length of approximately ${rand.nextInt(25, 40)} feet, moving at a speed of ${rand.nextInt(6, 12)} knots. The movement pattern displayed vertical undulation, typical of marine mammals, but distinct from local fish or seals.</p>
                <p>Water samples were collected immediately from the target's wake to conduct eDNA analysis. We hope to isolate cellular materials that can be sequenced for identification.</p>
            `;
        } else if (templateStyle === 1) {
            title = `eDNA PCR Assay: Sample ${idStr}`;
            content = `
                <p>This report documents the genetic sequencing of water samples retrieved from ${location}. Environmental DNA was filtered and amplified using high-throughput thermocyclers.</p>
                <div style="overflow-x:auto; margin:1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">Marker</th>
                                <th style="padding:0.4rem; color: #5a4b37;">PCR Cycle Threshold</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Sequence Matching</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Phylogeny</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">16S rRNA</td>
                                <td style="padding:0.4rem;">Cycle 28</td>
                                <td style="padding:0.4rem;">86% Cetacean</td>
                                <td style="padding:0.4rem;">Relict Basilosaurid?</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">COI Gene</td>
                                <td style="padding:0.4rem;">Cycle 31</td>
                                <td style="padding:0.4rem;">82% Elasmobranch</td>
                                <td style="padding:0.4rem;">Giant Selachian branch</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Cytb</td>
                                <td style="padding:0.4rem;">Cycle 29</td>
                                <td style="padding:0.4rem;">91% Reptilian</td>
                                <td style="padding:0.4rem;">Undescribed Sauropterygia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>The presence of these unique genetic signatures, consistently showing significant divergence from cataloged databases, supports the existence of an undescribed megafauna lineage in this deep-water system.</p>
            `;
        } else {
            title = `Acoustic Signature Study: Aquatic Anomalies`;
            content = `
                <p>Hydrophone recordings in the deep waters of ${location} have captured anomalous, low-frequency vocalizations. These sounds, colloquially referred to as "The Deep Click," consist of a series of rapid broadband pulses followed by a long, descending sweep. The acoustic power of the clicks is comparable to that of sperm whales (<em>Physeter macrocephalus</em>), yet the frequency modulation matches no known cetacean species.</p>
                <p>Analysis of the sound files indicates a sound source moving through deep trenches. We hypothesize that these creatures utilize echo-location to hunt in pitch-black depths, where light does not penetrate. This adaptation would explain why sightings at the surface are so rare, occurring mostly during periods of intense calm or during deep-water breeding cycles.</p>
                <div class="academic-note">
                    "The acoustic profile suggests a massive sonar projection organ, likely evolved for hunting in deep-water trenches." <br>&mdash; Dr. Rebecca Mercer
                </div>
            `;
        }
    } else if (chapId === "ch3") { // Aerial
        const idStr = `A-${rand.nextInt(100, 999)}`;
        if (templateStyle === 0) {
            title = `Flight Dynamics: Incident Sighting ${idStr}`;
            content = `
                <p><strong>Aviation Sighting File</strong><br>
                <strong>Date:</strong> ${dateStr}<br>
                <strong>Airspace:</strong> ${location}<br>
                <strong>Lead Analyst:</strong> ${agent}<br>
                <strong>Classification:</strong> Unidentified Aerial Organism</p>
                <p>At approximately 22:45, radar stations at ${location} detected a high-speed target displaying unusual flight dynamics. The target dropped from an altitude of 3,000 meters to 150 meters in less than ${rand.nextInt(5, 15)} seconds, exhibiting an acceleration curve that would cause structural failure in conventional aircraft. Visual witnesses described a large, winged figure with an estimated wingspan of ${rand.nextInt(15, 25)} feet and glowing red eye-shine.</p>
                <p>Thermal tracking confirmed the presence of a biological heat signature, ruling out mechanical drones. The flight trajectory indicates a high wing-loading ratio, suggesting a powerful glider capable of utilizing thermals and wind currents.</p>
            `;
        } else if (templateStyle === 1) {
            title = `Aerodynamic Profile: Wingspan Calculations ${idStr}`;
            content = `
                <p>This report compiles the wing-loading calculations and aerodynamic parameters of the aerial organism sighted at ${location}. The data is derived from radar tracking and visual size estimation.</p>
                <div style="overflow-x:auto; margin:1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">Aerodynamic Metric</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Calculated Value</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Comparison (Avian)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">Wingspan</td>
                                <td style="padding:0.4rem;">${rand.nextInt(15, 25)} feet</td>
                                <td style="padding:0.4rem;">Double the Andean Condor</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Wing Area</td>
                                <td style="padding:0.4rem;">${rand.nextInt(45, 75)} sq. ft</td>
                                <td style="padding:0.4rem;">Large aspect ratio glide design</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Wing Loading</td>
                                <td style="padding:0.4rem;">${rand.nextInt(12, 18)} kg/m&sup2;</td>
                                <td style="padding:0.4rem;">Requires high-velocity takeoffs</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Eye-Shine Wavelength</td>
                                <td style="padding:0.4rem;">650-680 nm (Red)</td>
                                <td style="padding:0.4rem;">Highly specialized tapetum lucidum</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>The structural demands of this wing loading suggest a highly specialized skeletal system, likely utilizing hollow bones reinforced with internal struts, similar to extinct pterosaurs. This structural design enables flight in heavy winds.</p>
            `;
        } else {
            title = `Bio-Luminescence study: Tapetum Lucidum`;
            content = `
                <p>The persistent reports of glowing red eyes in aerial cryptids at ${location} point to a highly specialized ocular anatomy. In known nocturnal animals, eye-shine is caused by the **tapetum lucidum**—a reflective layer behind the retina that increases light sensitivity by reflecting light back through the photoreceptors.</p>
                <p>However, the intensity and red coloration of the eye-shine reported in these sightings suggest a bio-luminescent component. It is possible that the organism possesses light-producing photophores within the ocular cavity, used for hunting or territorial display. This illumination would provide a significant advantage in low-visibility environments.</p>
                <div class="academic-note">
                    "The red ocular reflection is likely a result of blood-vessel rich tapetal retro-reflection, enhanced by high-density rod cells." <br>&mdash; Col. Marcus Vance
                </div>
            `;
        }
    } else if (chapId === "ch4") { // Forensic Field Methods
        const idStr = `F-${rand.nextInt(100, 999)}`;
        if (templateStyle === 0) {
            title = `Forensics Protocol: DNA Isolation ${idStr}`;
            content = `
                <p><strong>IHSE Forensics Lab Manual</strong><br>
                <strong>Date:</strong> ${dateStr}<br>
                <strong>Location:</strong> ${location}<br>
                <strong>Lead Forensic Scientist:</strong> ${agent}<br>
                <strong>Protocol:</strong> Extraction of degraded environmental DNA</p>
                <p>Field research often recovers highly degraded genetic material, contaminated with soil humic acids or exposed to solar ultraviolet radiation. This protocol details the extraction steps required to isolate clean DNA samples from environmental substrates. We utilize silica-column binding alongside specific PCR inhibitors blockers to maximize DNA yield.</p>
                <p>All laboratory technicians must follow these procedures to prevent cross-contamination. A negative control sample must be run alongside every extraction to verify the purity of our reagents.</p>
            `;
        } else if (templateStyle === 1) {
            title = `Gas Chromatography: VOC Signature Log ${idStr}`;
            content = `
                <p>This report details the gas chromatography analysis of volatile organic compounds (VOCs) isolated from soil samples at ${location}. The sample was collected near a suspected hominid bedding site.</p>
                <div style="overflow-x:auto; margin:1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">VOC Compound Peak</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Retention Time</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Concentration</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Biological Origin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">3-Methylbutanoic Acid</td>
                                <td style="padding:0.4rem;">14.2 min</td>
                                <td style="padding:0.4rem;">High</td>
                                <td style="padding:0.4rem;">Peculiar musk secretion</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Dimethyl Disulfide</td>
                                <td style="padding:0.4rem;">8.7 min</td>
                                <td style="padding:0.4rem;">Medium</td>
                                <td style="padding:0.4rem;">Organic decay marker</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Unidentified Primate Pheromone</td>
                                <td style="padding:0.4rem;">22.1 min</td>
                                <td style="padding:0.4rem;">Low</td>
                                <td style="padding:0.4rem;">Undescribed scent gland output</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>The concentration of 3-methylbutanoic acid explains the intense, musky odor reported by witnesses. The presence of this compound at the site confirms that a large mammal occupied the nest bedding within the last 24 hours.</p>
            `;
        } else {
            title = `Medullary Index Analysis: Primate Hair`;
            content = `
                <p>Hair analysis remains a vital forensic tool for identifying unknown mammalian species. When analyzing hair samples recovered from ${location}, technicians must calculate the **medullary index**—the ratio of the medulla's diameter to the hair shaft's total diameter.</p>
                <p>In humans, the medullary index is typically under 0.33. In most non-human mammals, it exceeds 0.50. The samples recovered from the site display a medullary index of 0.42, falling in the gap between humans and typical quadrupeds. The scale pattern is imbricate, matching the characteristics of higher primates while showing a thick cortex typical of cold-climate animals.</p>
                <div class="academic-note">
                    "The transitional medullary index of 0.42 is a persistent feature of these hair specimens, suggesting a unique primate lineage." <br>&mdash; Dr. Angela Martinez
                </div>
            `;
        }
    } else if (chapId === "ch5") { // Epistemology and Hoaxes
        const idStr = `H-${rand.nextInt(100, 999)}`;
        if (templateStyle === 0) {
            title = `Hoax Analysis: Digital Compression Audit ${idStr}`;
            content = `
                <p><strong>Digital Forensics Report</strong><br>
                <strong>Date:</strong> ${dateStr}<br>
                <strong>Investigated Image:</strong> Sighting Photo Ref ${idStr}<br>
                <strong>Lead Analyst:</strong> ${agent}<br>
                <strong>Verdict:</strong> Confirmed Digital Modification</p>
                <p>This report details the image forensics of a photograph showing a large creature in a forest. We applied **Error Level Analysis (ELA)** to check for inconsistencies in JPEG compression rates. ELA highlights pixels that have been resaved at different quality levels, indicating post-capture editing.</p>
                <p>Our analysis revealed a significant error spike around the creature's outline, indicating that the figure was spliced into the forest background from another image. This finding confirms the photograph is a hoax. The case has been closed, and the image has been removed from active databases.</p>
            `;
        } else if (templateStyle === 1) {
            title = `Taxidermy Analysis: Seam Check ${idStr}`;
            content = `
                <p>This document details the physical inspection of a "cryptid specimen" deposited at ${location}. The specimen was claimed to represent a small winged hominoid.</p>
                <div style="overflow-x:auto; margin:1rem 0;">
                    <table class="modal-data-table" style="width:100%; border-collapse:collapse; font-size:0.8rem; text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #8d7657;">
                                <th style="padding:0.4rem; color: #5a4b37;">Anatomical Area</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Physical Examination</th>
                                <th style="padding:0.4rem; color: #5a4b37;">X-Ray Imaging</th>
                                <th style="padding:0.4rem; color: #5a4b37;">Taxonomic Origin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0.4rem;">Cranial Joint</td>
                                <td style="padding:0.4rem;">Discolored fur layer</td>
                                <td style="padding:0.4rem;">Adhesive residue visible</td>
                                <td style="padding:0.4rem;">Domestic feline skull (Felis catus)</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Dorsal Wings</td>
                                <td style="padding:0.4rem;">Stitching line present</td>
                                <td style="padding:0.4rem;">Metal wire support structure</td>
                                <td style="padding:0.4rem;">Fruit bat wings (Pteropodidae)</td>
                            </tr>
                            <tr>
                                <td style="padding:0.4rem;">Pectoral Girdle</td>
                                <td style="padding:0.4rem;">Disjointed bones</td>
                                <td style="padding:0.4rem;">Plaster filler core</td>
                                <td style="padding:0.4rem;">Artificial construction</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>This specimen is a classic example of "mermaid taxidermy," where parts of different animals are stitched together to create a mythological beast. The anatomical components are identified as domestic feline and bat, confirming that the specimen is a deliberate fabrication.</p>
            `;
        } else {
            title = `Psychology of Perception: Pareidolia`;
            content = `
                <p>To understand the high volume of false cryptid reports, we must study the psychology of human perception. The brain is wired to find patterns, a phenomenon known as **pareidolia**. In low-light conditions, the visual cortex often interprets ambiguous shapes (such as tree stumps, swaying branches, or shadow patterns) as familiar figures (such as a large primate or animal face).</p>
                <p>Once a witness has formed a mental model of a regional cryptid, this belief acts as a cognitive anchor. Every subsequent sound or sight is interpreted through the lens of that legend. This anchoring effect explains why many reports from ${location} are filed by well-meaning but mistaken witnesses, rather than intentional hoaxers.</p>
                <div class="academic-note">
                    "Field researchers must treat eyewitness accounts as psychological data, not zoological evidence." <br>&mdash; Prof. Alistair Sterling
                </div>
            `;
        }
    }
    
    return { title, content };
}

// --- CRYPTID CODEX DATABASE ---
const CRYPTID_CODEX = [
    {
        id: "bigfoot",
        name: "Bigfoot (Sasquatch)",
        scientific: "Gigantopithecus relictus (Hypothetical)",
        group: "Terrestrial",
        region: "North America (Pacific Northwest)",
        status: "Unverified (Anecdotal / Physical Traces)",
        habitat: "Temperate Rainforest / Dense Coniferous Forests",
        summary: "A large, hairy, bipedal hominid reported to inhabit the dense forests of North America.",
        description: "Reports of Bigfoot describe a bipedal primate standing 7 to 10 feet tall, covered in dark brown or reddish hair. Witnesses report a strong, musky odor and a heavy, ape-like face. Footprint casts reveal lengths of 14 to 18 inches, with some showing dermal ridges. Theories suggest it could be a surviving population of Gigantopithecus that crossed the Bering land bridge.",
        diet: "Omnivorous (berries, shoots, fish, small mammals)",
        size: "7–10 ft tall, 500–800 lbs",
        img: "assets/bigfoot.png",
        lat: 48.0,
        lng: -122.0
    },
    {
        id: "nessie",
        name: "Loch Ness Monster",
        scientific: "Nessiteras rhombopteryx (Proposed)",
        group: "Marine",
        region: "Scotland (Loch Ness)",
        status: "Highly Improbable (eDNA Debunked)",
        habitat: "Deep, Cold Freshwater Loch",
        summary: "A long-necked aquatic creature reported to dwell in the deep waters of Loch Ness.",
        description: "The Loch Ness Monster is famously described as looking like a plesiosaur, with a long neck, small head, and flippers. The myth gained global fame in 1933. While sonar surveys have occasionally registered large moving objects, eDNA surveys in 2019 suggested a complete lack of reptilian DNA, proposing instead that sightings may be giant eels, swimming sturgeons, or boat wakes.",
        diet: "Piscivorous (fish, eels)",
        size: "15–30 ft long, 2–4 tons",
        img: "assets/nessie.png",
        lat: 57.3,
        lng: -4.4
    },
    {
        id: "mothman",
        name: "Mothman",
        scientific: "Anomalous Lepidoptera (Folklore)",
        group: "Aerial",
        region: "West Virginia, USA (Point Pleasant)",
        status: "Folklore / Misidentification",
        habitat: "Abandoned Industrial / Wooded Areas",
        summary: "A winged humanoid creature with glowing red eyes, sighted in West Virginia in the late 1960s.",
        description: "Mothman is described as a wingless/winged humanoid standing over 6 feet tall, possessing a wingspan of 10 feet, and having large, reflective red eyes set in its chest. Sighted prior to the collapse of the Silver Bridge in 1967, it has been associated with disaster folklore. Biologists attribute it to misidentified Sandhill Cranes or Barn Owls.",
        diet: "Unknown (presumably insectivorous or nocturnal carnivore)",
        size: "6–7 ft tall, 10 ft wingspan",
        img: "assets/mothman.png",
        lat: 38.8,
        lng: -82.1
    },
    {
        id: "chupacabra",
        name: "Chupacabra",
        scientific: "Canis parasiticus (Hypothetical)",
        group: "Terrestrial",
        region: "Puerto Rico / Latin America / Texas",
        status: "Debunked (Sarcoptic Mange Coyote)",
        habitat: "Farmland / Arid Scrubland",
        summary: "A legendary cryptid known for attacking livestock and draining their blood.",
        description: "Originally described in Puerto Rico as a reptilian, bipedal creature with spikes on its back. In the southern US, it is described as a hairless, canine-like creature. Forensic analysis of captured 'Chupacabras' in Texas has consistently identified them as coyotes or feral dogs suffering from severe sarcoptic mange, which accounts for their hairless, blue-gray skin.",
        diet: "Carnivorous (primarily livestock blood)",
        size: "3–4 ft long, 30–50 lbs",
        img: "assets/chupacabra.png",
        lat: 18.2,
        lng: -66.5
    },
    {
        id: "yeti",
        name: "Yeti (Abominable Snowman)",
        scientific: "Ursus arctos thibetanus (Cryptid)",
        group: "Terrestrial",
        region: "Himalayas (Nepal / Tibet)",
        status: "Unverified (Genetic tests indicate bear species)",
        habitat: "High Altitude Snowy Mountains / Pine Forests",
        summary: "An ape-like cryptid said to inhabit the high altitudes of the Himalayan mountain range.",
        description: "The Yeti has been part of Sherpa folklore for centuries. Described as a large, shaggy creature walking upright. Famous expeditions have collected footprints and hair samples. Recent DNA analysis of Yeti relics (scalps, bones, hair) held in monasteries revealed they belong to Himalayan brown bears and Tibetan blue bears.",
        diet: "Omnivorous",
        size: "6–8 ft tall, 300–500 lbs",
        img: "assets/bigfoot.png",
        lat: 28.0,
        lng: 86.9
    },
    {
        id: "kraken",
        name: "The Kraken",
        scientific: "Architeuthis dux (Verified)",
        group: "Marine",
        region: "North Atlantic Ocean",
        status: "Verified (Transitioned to Zoology)",
        habitat: "Deep Bathypelagic Ocean",
        summary: "A legendary giant sea monster of massive proportions, now recognized as the Giant Squid.",
        description: "Descibed by Nordic sailors as a giant island-sized beast with tentacles capable of dragging down ships. In the 19th century, washed-up carcasses proved the existence of the Giant Squid and Colossal Squid. This represents the ultimate example of a cryptid transitioning to verified scientific fact through physical evidence.",
        diet: "Carnivorous (deep-sea fish, other squid)",
        size: "Up to 40–50 ft long, 1000 lbs",
        img: "assets/nessie.png",
        lat: 64.0,
        lng: -20.0
    },
    {
        id: "mokele",
        name: "Mokele-Mbembe",
        scientific: "Sauropoda relictus (Hypothetical)",
        group: "Marine",
        region: "Congo River Basin (Tele Lake)",
        status: "Unverified (Likely folklore/myth)",
        habitat: "Tropical Swamp / Riverine Systems",
        summary: "A water-dwelling creature of the Congo, described as resembling a small sauropod dinosaur.",
        description: "Folklore of the Pygmy tribes describes a semi-aquatic beast with a long neck and a single horn or tooth, known to block rivers and kill hippopotamuses. Cryptozoologists argue it is a surviving sauropod dinosaur. Skeptics suggest it is a cultural myth representing the spirit of the river, or misidentified elephants swimming with their trunks raised.",
        diet: "Herbivorous (specific river plants)",
        size: "15–30 ft long, 5–8 tons",
        img: "assets/nessie.png",
        lat: -1.5,
        lng: 17.0
    },
    {
        id: "jersey_devil",
        name: "Jersey Devil",
        scientific: "Pteropus anomalus (Folklore)",
        group: "Aerial",
        region: "New Jersey, USA (Pine Barrens)",
        status: "Folklore / Legend",
        habitat: "Dense Pine Forests / Swamps",
        summary: "A legendary flying creature with a horse-like head, bat wings, and hooves.",
        description: "According to legend, the creature was born in 1735 as the 13th child of Mother Leeds and cursed. Sighted across New Jersey in 1909, prompting school closures. Scientifically, it is viewed as a combination of political hoaxes, regional ghost stories, and misidentified Sandhill Cranes or Great Horned Owls.",
        diet: "Omnivorous / Carnivorous",
        size: "3–5 ft tall, 6 ft wingspan",
        img: "assets/mothman.png",
        lat: 39.7,
        lng: -74.5
    }
];

// --- ACADEMIC EXAM QUESTIONS ---
const QUIZ_QUESTIONS = [
    {
        question: "What is the primary biological carrying capacity hurdle for the 'relict Plesiosaur' hypothesis in Loch Ness?",
        options: [
            "Plesiosaurs were air-breathers and would surface constantly, making visual concealment impossible.",
            "Loch Ness was carved by glaciation 10,000 years ago, requiring post-glacial migration from the ocean.",
            "The lake does not contain enough biomass (fish) to support a breeding population of large reptiles.",
            "All of the above statements are correct."
        ],
        correct: 3
    },
    {
        question: "Which genetic methodology was utilized in Neil Gemmell's 2019 Loch Ness study?",
        options: [
            "Polymerase Chain Reaction (PCR) on physical tissue samples.",
            "Environmental DNA (eDNA) metabarcoding of water samples.",
            "Whole-genome sequencing of local brown trout.",
            "Microscopic follicular cell structure analysis."
        ],
        correct: 1
    },
    {
        question: "The presence of which feature on a footprint cast is considered a key signature of authentic biological origin?",
        options: [
            "A distinct five-toed claw shape.",
            "Deep indentations in the heel area.",
            "Microscopic dermal friction ridges along the sole.",
            "Traces of organic pine needles embedded in the cast."
        ],
        correct: 2
    },
    {
        question: "Which extinct animal is most commonly cited by cryptozoologists as the ancestor of Bigfoot/Sasquatch?",
        options: [
            "Gigantopithecus blacki",
            "Megatherium americanum",
            "Australopithecus afarensis",
            "Homo neanderthalensis"
        ],
        correct: 0
    },
    {
        question: "What is the term for the psychological tendency to perceive meaningful patterns, such as human shapes or faces, in random stimuli?",
        options: [
            "Epistemological dissonance",
            "Pareidolia",
            "Confirmation Bias",
            "Ockham's projection"
        ],
        correct: 1
    },
    {
        question: "Which cryptid successfully transitioned from folklore to accepted zoological science in the 19th/20th century?",
        options: [
            "The Chupacabra",
            "The Giant Squid (Kraken)",
            "The Mothman",
            "The Ropen"
        ],
        correct: 1
    },
    {
        question: "Why does the biomechanics of flying humanoids (e.g., Mothman) fail standard evolutionary biology parameters?",
        options: [
            "Human arms are structurally homologous to wings already, preventing secondary wing sets.",
            "Humans lack a keeled sternum to anchor powerful pectoralis flight muscles.",
            "The metabolic cost of flight for a 200-lb organism is energetically unsustainable.",
            "All of the above."
        ],
        correct: 3
    },
    {
        question: "If a canine specimen suspected of being a 'Chupacabra' exhibits hairless, blue-gray skin, veterinary analysis usually identifies it as:",
        options: [
            "A rare genetic mutation of the red fox.",
            "A coyote suffering from severe sarcoptic mange.",
            "A relict population of the thylacine.",
            "An exotic species of African wild dog."
        ],
        correct: 1
    },
    {
        question: "Under the rules of the International Commission on Zoological Nomenclature (ICZN), what serves as the absolute standard of evidence for a new species?",
        options: [
            "High-resolution multi-spectral photographs.",
            "A designated physical holotype specimen deposited in a museum.",
            "Multiple independent eyewitness sighting reports.",
            "A complete environmental DNA metagenomic profile."
        ],
        correct: 1
    },
    {
        question: "What does the 'mid-tarsal break' in track casts suggest about the foot morphology of Sasquatch?",
        options: [
            "It is a rigid arch designed for high-speed running, identical to humans.",
            "It represents a flexible joint in the middle of the foot, typical of climbing primates.",
            "It is an artifact caused by foot slippage in soft mud.",
            "It indicates the foot had an opposable hallux (big toe)."
        ],
        correct: 1
    },
    {
        question: "Formant frequency analysis of the 'Sierra Sounds' suggested the vocal tract of the source was:",
        options: [
            "Smaller than that of an average human.",
            "Larger than that of an average human, suggesting a massive chest cavity.",
            "Identical to that of a grizzly bear (Ursus arctos).",
            "Consistent with electronic pitch-shifting modulation."
        ],
        correct: 1
    },
    {
        question: "The 2014 hair study led by Professor Bryan Sykes concluded that two Himalayan Yeti samples matched:",
        options: [
            "An undescribed subspecies of orangutan.",
            "An ancient polar bear lineage from the Pleistocene epoch.",
            "A modern Himalayan brown bear.",
            "A domestic Tibetan mastiff."
        ],
        correct: 1
    },
    {
        question: "Charlotte Lindqvist's 2017 genetic study of Yeti relics (scalps and bones) demonstrated that they belonged to:",
        options: [
            "Local bear species (Ursus arctos isabellinus and Ursus thibetanus).",
            "A surviving lineage of Homo floresiensis.",
            "An unknown gibbon species.",
            "A collection of goat bones."
        ],
        correct: 0
    },
    {
        question: "In environmental DNA (eDNA) research, 'metabarcoding' refers to:",
        options: [
            "Sequencing DNA from a single captured individual.",
            "Amplifying and sequencing taxonomic marker genes from a bulk environmental sample.",
            "Applying barcodes to laboratory sample vials to prevent mix-ups.",
            "Scanning animal hides under ultraviolet light."
        ],
        correct: 1
    },
    {
        question: "The principle of Ockham's Razor states that when evaluating anomalous biological claims, we should:",
        options: [
            "Always accept the explanation that requires the fewest assumptions.",
            "Discard all eyewitness testimony as unscientific.",
            "Assume that the most complex explanation is correct.",
            "Refuse to investigate until a physical holotype is recovered."
        ],
        correct: 0
    },
    {
        question: "Who is considered the founding father of modern cryptozoology, publishing 'On the Track of Unknown Animals' in 1955?",
        options: [
            "Dr. Jeff Meldrum",
            "Dr. Bernard Heuvelmans",
            "Willy Ley",
            "Ivan T. Sanderson"
        ],
        correct: 1
    },
    {
        question: "The 'Shope papilloma virus' in wild rabbits is scientifically significant in cryptozoology because:",
        options: [
            "It causes them to grow feather-like scales.",
            "It triggers hairlessness, resembling a Chupacabra.",
            "It causes keratinous horn-like tumors, likely originating the Jackalope myth.",
            "It is the primary target of forest soil PCR assays."
        ],
        correct: 2
    },
    {
        question: "George Hull carved the famous 10-foot Cardiff Giant in 1869 out of which material?",
        options: [
            "Gypsum block",
            "Granite bedrock",
            "Petrified oak wood",
            "Plaster of Paris"
        ],
        correct: 0
    },
    {
        question: "The 2008 Georgia Bigfoot carcass hoax was exposed as:",
        options: [
            "A taxidermy monkey joined to a bear skin.",
            "A rubber Halloween costume stuffed with animal entrails.",
            "A misidentified black bear cub carcass.",
            "A digital collage created using image splicing."
        ],
        correct: 1
    },
    {
        question: "In digital image forensics, Error Level Analysis (ELA) works by:",
        options: [
            "Analyzing the focal length and depth of field of the lens.",
            "Highlighting areas that have different JPEG compression error levels.",
            "Checking the metadata headers for software signatures.",
            "Enhancing the brightness and contrast curves of the pixels."
        ],
        correct: 1
    },
    {
        question: "Under a microscope, a mammalian hair specimen with an 'imbricate' scale pattern displays cuticle scales that resemble:",
        options: [
            "Overlapping roof shingles.",
            "Circular flower petals.",
            "Continuous parallel grooves.",
            "A smooth, glass-like sheath."
        ],
        correct: 0
    },
    {
        question: "In forensic hair analysis, the 'medullary index' of a human hair is typically:",
        options: [
            "Greater than 0.50.",
            "Between 0.33 and 0.50.",
            "Under 0.33.",
            "Exactly 1.0."
        ],
        correct: 2
    },
    {
        question: "A forensic inspection of the famous Fiji Mermaid specimen revealed it was a composite of:",
        options: [
            "A monkey torso stitched to a fish tail.",
            "A cat skull joined to bat wings.",
            "A dog skeleton filled with plaster.",
            "Paper-mache and dried fish skin."
        ],
        correct: 0
    },
    {
        question: "In psychology, the unconscious integration of post-event suggestions or media images into one's memory is called:",
        options: [
            "Pareidolia",
            "Confabulation",
            "Cognitive Anchoring",
            "Skeptical Projection"
        ],
        correct: 1
    },
    {
        question: "In gas chromatography, the detection of dimethyl disulfide in a soil sample is a chemical marker for:",
        options: [
            "Active primate sweat glands.",
            "Organic tissue decomposition (decay).",
            "Synthetic adhesives used in hoaxes.",
            "Pine needle VOC contamination."
        ],
        correct: 1
    },
    {
        question: "To isolate clean eDNA from forest soil, PCR protocols must block which common environmental inhibitor?",
        options: [
            "Silica residue",
            "Humic acids",
            "Sodium chloride",
            "Calcium carbonate"
        ],
        correct: 1
    },
    {
        question: "What is the primary function of the 'sagittal crest' in large male primates?",
        options: [
            "It houses scent glands used for territorial marking.",
            "It acts as a thermoregulation radiator.",
            "It anchors massive chewing muscles (temporalis).",
            "It provides structural protection for the brain."
        ],
        correct: 2
    },
    {
        question: "The 'Bering Land Bridge' is geological evidence that supports which hominid migration hypothesis?",
        options: [
            "Gigantopithecus blacki migration from Asia to North America.",
            "Homo floresiensis migration from Indonesia to Australia.",
            "Neanderthal retreat into the Altai mountains.",
            "Yeren expansion into Central China."
        ],
        correct: 0
    },
    {
        question: "What is the key difference between scientific skepticism and cynicism?",
        options: [
            "Skepticism demands evidence before acceptance; cynicism dismisses claims regardless of evidence.",
            "Skepticism is amateur; cynicism is academic.",
            "Skepticism accepts folklore; cynicism rejects all cultural narratives.",
            "There is no difference; they are synonymous."
        ],
        correct: 0
    },
    {
        question: "Neuroscientists have determined that pareidolia (seeing faces in objects) is processed in which brain area?",
        options: [
            "Visual cortex V1 exclusively.",
            "Fusiform Face Area (FFA).",
            "Amygdala and hippocampus.",
            "Prefrontal lobe decision nodes."
        ],
        correct: 1
    },
    {
        question: "The coelacanth (Latimeria chalumnae) discovery in 1938 is celebrated in cryptozoology because:",
        options: [
            "It proved that large animals can remain hidden for 66 million years (ghost lineage).",
            "It was the first cryptid identified using eDNA.",
            "It confirmed the existence of the Loch Ness Monster.",
            "It was described by Bernard Heuvelmans."
        ],
        correct: 0
    },
    {
        question: "The Mapinguari, a cryptid of the Amazon rainforest, is hypothesized by some researchers to be a relict population of:",
        options: [
            "Extinct giant ground sloths (Megatherium).",
            "A surviving dinosaur lineage.",
            "An undescribed gorilla subspecies.",
            "A giant freshwater turtle."
        ],
        correct: 0
    },
    {
        question: "What does a lower Cycle Threshold (Ct) value in an eDNA PCR run indicate?",
        options: [
            "The sample is contaminated with humic acids.",
            "A higher concentration of the target DNA was present in the sample.",
            "The sequencing run was a failure.",
            "The DNA has degraded entirely."
        ],
        correct: 1
    },
    {
        question: "Formant frequencies represent:",
        options: [
            "The absolute pitch of a vocal growl in decibels.",
            "The acoustic resonance peaks of the vocal tract filter.",
            "The sound frequency of echo-location clicks.",
            "The background noise level in bioacoustic recordings."
        ],
        correct: 1
    },
    {
        question: "The International Society of Cryptozoology (ISC) was founded in which year?",
        options: [
            "1955",
            "1982",
            "1999",
            "2004"
        ],
        correct: 1
    },
    {
        question: "Which famous anatomist declared in 1812 that discovering any new large land mammal was highly improbable?",
        options: [
            "Georges Cuvier",
            "Carl Linnaeus",
            "Charles Darwin",
            "Richard Owen"
        ],
        correct: 0
    },
    {
        question: "In hair microscopy, 'spinous' scale patterns are petal-like and typical of which animal group?",
        options: [
            "Primates and humans.",
            "Bats, mink, and some rodents.",
            "Bears and wolves.",
            "Cats and dogs."
        ],
        correct: 1
    },
    {
        question: "Why do forensic track experts prefer dental stone over plaster of Paris for field casts?",
        options: [
            "It is lighter to carry on expeditions.",
            "It expands less and cures into a harder cast, capturing finer details like dermal ridges.",
            "It reacts chemically with soil to reveal organic compounds.",
            "It dries instantly under water."
        ],
        correct: 1
    },
    {
        question: "The reflecting layer behind the retina that increases light sensitivity in nocturnal animals is called:",
        options: [
            "Tapetum lucidum",
            "Iris diaphragm",
            "Sclera reflective index",
            "Cornea filter"
        ],
        correct: 0
    },
    {
        question: "Charles Dawson fooled the British Museum for forty years with Piltdown Man, which was a composite of:",
        options: [
            "A human skull and an orangutan jaw.",
            "A chimpanzee skull and a domestic dog jaw.",
            "Plaster molds filled with chimpanzee teeth.",
            "A gibbon skull and a Neanderthal jaw."
        ],
        correct: 0
    },
    {
        question: "In gas chromatography, what VOC compound is isolated as the key indicator of peculiar hominid musk?",
        options: [
            "Dimethyl disulfide",
            "3-Methylbutanoic acid",
            "Sodium chloride",
            "Benzene ring structures"
        ],
        correct: 1
    },
    {
        question: "The 'Basilosaurid relict' hypothesis suggests that sea serpents are surviving lineages of:",
        options: [
            "Prehistoric snake-like whales.",
            "Giant marine iguanas.",
            "Relict Plesiosaurs.",
            "Extinct giant sharks."
        ],
        correct: 0
    },
    {
        question: "Reports of Orang Pendek describe it as standing approximately how tall?",
        options: [
            "1 to 2 feet tall.",
            "3 to 5 feet tall.",
            "6 to 8 feet tall.",
            "9 to 10 feet tall."
        ],
        correct: 1
    },
    {
        question: "The Yeren is reported to inhabit which mountainous forest region of China?",
        options: [
            "Himalayan plateau",
            "Shennongjia Forest, Hubei Province",
            "Gobi Desert margins",
            "Yunnan rainforests"
        ],
        correct: 1
    },
    {
        question: "The Almasty is a cryptid hominid reported from which geographic region?",
        options: [
            "Sumatran rainforests",
            "Caucasus and Altai Mountains",
            "Australian outback",
            "Pacific Northwest"
        ],
        correct: 1
    },
    {
        question: "Double-blind protocols are crucial in forensic hair analysis because they:",
        options: [
            "Speed up the DNA sequencing runtime.",
            "Prevent examiner confirmation bias by keeping the sample origin anonymous.",
            "Identify the species automatically without a microscope.",
            "Eliminate humic acid contamination."
        ],
        correct: 1
    },
    {
        question: "Pneumatic bone structures in birds and pterosaurs are characterized by:",
        options: [
            "Solid, dense bone tissue designed for impact.",
            "Hollow centers reinforced with internal bone struts, reducing weight for flight.",
            "A thick layer of external cartilage.",
            "Heavy calcium deposits to withstand wind shear."
        ],
        correct: 1
    },
    {
        question: "The tapetum lucidum of nocturnal animals typically reflects red light because of:",
        options: [
            "High concentrations of vitamin A in the rods.",
            "Vascularization (blood vessels) retro-reflection combined with rod density.",
            "Bioluminescent chemicals inside the iris.",
            "The refraction of blue light by the lens."
        ],
        correct: 1
    },
    {
        question: "What is the primary method used to detect taxidermy seams in suspected cryptid specimens?",
        options: [
            "Error Level Analysis of digital photos.",
            "X-ray imaging and ultraviolet light inspection.",
            "PCR assay run runs.",
            "Hydrophone bioacoustic sweeps."
        ],
        correct: 1
    },
    {
        question: "The Bunyip is a famous water cryptid in the folklore of which country?",
        options: [
            "Canada",
            "Australia",
            "Scotland",
            "Congo"
        ],
        correct: 1
    },
    {
        question: "The thylacine (Tasmanian tiger) officially went extinct when the last known specimen died in Hobart Zoo in which year?",
        options: [
            "1912",
            "1936",
            "1967",
            "1985"
        ],
        correct: 1
    },
    {
        question: "Mokele-Mbembe is a rumored dinosaur-like cryptid reported from which region?",
        options: [
            "Congo River Basin swamps",
            "Lake Okanagan, British Columbia",
            "Sargasso Sea trenches",
            "Gobi Desert"
        ],
        correct: 0
    },
    {
        question: "What is the primary target of environmental DNA (eDNA) sampling in lake ecosystems?",
        options: [
            "Living fish specimens captured in nets.",
            "Cellular material (skin, scales, waste) shed by organisms into the water column.",
            "Fossilized skeletal remains on the lakebed.",
            "Chemical pollution levels."
        ],
        correct: 1
    },
    {
        question: "What biochemical component is typically found in the tapetum lucidum of mammals to reflect light?",
        options: [
            "Guanin or zinc-cysteine crystals",
            "Melanin pigment granules",
            "Keratin proteins",
            "Hemoglobin iron rings"
        ],
        correct: 0
    },
    {
        question: "The 'Bloop' was an ultra-low-frequency underwater sound recorded in 1997, later identified as:",
        options: [
            "A vocalization from a giant squid.",
            "An icequake generated by a fracturing iceberg.",
            "The acoustic echo of a basaltic volcano eruption.",
            "A military submarine sonar sweep."
        ],
        correct: 1
    },
    {
        question: "In hair microscopy, the outer layer of the hair shaft containing scale patterns is called the:",
        options: [
            "Medulla",
            "Cortex",
            "Cuticle",
            "Follicle"
        ],
        correct: 2
    },
    {
        question: "The middle layer of a hair shaft, which contains pigment granules, is called the:",
        options: [
            "Medulla",
            "Cortex",
            "Cuticle",
            "Root"
        ],
        correct: 1
    },
    {
        question: "In photo analysis, what does 'parallax error' refer to?",
        options: [
            "The distortion of colors in JPEG files.",
            "The apparent displacement of an object when viewed along two different lines of sight.",
            "The failure of auto-focus sensors in low light.",
            "The reflection of flash bulbs in glass."
        ],
        correct: 1
    },
    {
        question: "Why do cryptozoologists study regional native folklore?",
        options: [
            "To gather empirical biological holotypes.",
            "To identify persistent descriptions that may indicate real historical encounters.",
            "To prove that all legends are zoologically accurate.",
            "To replace DNA sequencing entirely."
        ],
        correct: 1
    },
    {
        question: "Which primate species is famous for moving bipedally on the ground for short distances, sometimes triggering Wildman reports in Asia?",
        options: [
            "Golden Snub-nosed Monkey (Rhinopithecus roxellana)",
            "Gibbon (Hylobatidae)",
            "Chimpanzee (Pan troglodytes)",
            "Ring-tailed Lemur (Lemur catta)"
        ],
        correct: 0
    },
    {
        question: "What type of camera is used in nocturnal field surveys to capture heat signatures of elusive wildlife?",
        options: [
            "Multispectral LiDAR camera",
            "FLIR thermal imaging camera",
            "High-speed strobe camera",
            "Ultraviolet mapping camera"
        ],
        correct: 1
    },
    {
        question: "The Ropen of Papua New Guinea is reported to exhibit what unusual biological characteristic?",
        options: [
            "Bioluminescence during nocturnal flight.",
            "The ability to breathe underwater.",
            "A venomous bite.",
            "A triple-jointed leg structure."
        ],
        correct: 0
    },
    {
        question: "The study of metaphysical humanistic science in Dr. Thornburg's background focuses on:",
        options: [
            "Blending humanistic inquiry, metaphysical concepts, and scientific methodology.",
            "Replacing physics with psychic divination.",
            "Studying fossilized marine plants.",
            "Performing religious ceremonies in the field."
        ],
        correct: 0
    },
    {
        question: "What is the primary role of a 'holotype' in biological taxonomy?",
        options: [
            "To serve as a genetic sequencer calibration template.",
            "To act as the physical specimen that anchors a species' scientific name and description.",
            "To represent the average size of a breeding group.",
            "To document the geological layer where a fossil was found."
        ],
        correct: 1
    },
    {
        question: "Which technology has revolutionized wildlife monitoring by capturing pictures triggered by heat or motion sensors?",
        options: [
            "LiDAR drones",
            "Camera traps (trail cams)",
            "Metagenomic filtration pumps",
            "Acoustic hydrophones"
        ],
        correct: 1
    },
    {
        question: "According to IHSE Protocol 1 (Field Ethics), why are target cryptid populations particularly sensitive to auditory and visual disturbances?",
        options: [
            "They occupy low-density populations, making any disruption to their mating or feeding behaviors highly dangerous.",
            "They possess larger auditory nerves than common mammals.",
            "They are highly aggressive and will attack noisy camps.",
            "Their habitats are always located in low-oxygen alpine zones."
        ],
        correct: 0
    },
    {
        question: "Under IHSE Protocol 2 (Chain-of-Custody), what is the consequence of failing to record geographic coordinates or custody signatures for a sample?",
        options: [
            "The laboratory will charge double for sequencing.",
            "The sample's scientific validity is lost, preventing peer-reviewed validation.",
            "The sample must be washed in humic acid.",
            "The investigator's security clearance is upgraded."
        ],
        correct: 1
    },
    {
        question: "What does IHSE Protocol 3 identify as the main cause of 'anchoring' in eyewitness testimonies?",
        options: [
            "The observer's visual fatigue under low light.",
            "A subconscious tendency to force an unknown biological sighting to match media descriptions of famous cryptids.",
            "The magnetic fields of geographic anomalies.",
            "The physical proximity of the witness to water bodies."
        ],
        correct: 1
    },
    {
        question: "Why does IHSE Protocol 4 recommend using dental stone over standard plaster of Paris for field casts?",
        options: [
            "Dental stone is lighter to carry on long hikes.",
            "Dental stone expands less and cures harder, preserving fine details like dermal friction ridges.",
            "Dental stone cures in under 10 seconds in any weather.",
            "Standard plaster of Paris dissolves in damp soils."
        ],
        correct: 1
    },
    {
        question: "How does IHSE Protocol 5 recommend preserving tissue or scat samples for DNA analysis in the field?",
        options: [
            "Freezing them in forest ice.",
            "Sealing them in paper bags without desiccant.",
            "Submerging them in 95% ethanol or a designated lysis buffer to prevent degradation.",
            "Boiling them to sterilize bacteria before sequencing."
        ],
        correct: 2
    },
    {
        question: "Under IHSE Protocol 6, which image format is mandatory for high-integrity digital evidence, and why?",
        options: [
            "JPEG, because it compresses image size for quick upload.",
            "RAW, because it preserves uncompressed sensor pixels, preventing editing software tampering.",
            "PNG, because it supports transparent backdrops.",
            "TIFF, because it automatically generates GPS metadata headers."
        ],
        correct: 1
    },
    {
        question: "What is the primary function of a 'deadcat' windscreen filter in bioacoustic recordings under Protocol 7?",
        options: [
            "To screen out high-frequency insect chatter.",
            "To reduce wind-induced noise floors, preventing low-frequency clipping of anomalous growls.",
            "To camouflage the recorder from forest primates.",
            "To absorb damp humidity from the microphone diaphragm."
        ],
        correct: 1
    },
    {
        question: "Under IHSE Protocol 8, what filter pore size is specified for environmental DNA (eDNA) water filtration?",
        options: [
            "2.2 micrometers",
            "0.22 micrometers",
            "10.0 micrometers",
            "0.02 micrometers"
        ],
        correct: 1
    },
    {
        question: "Under IHSE Protocol 9, how does calibration drift in LiDAR sensors affect morphometric calculations?",
        options: [
            "It amplifies errors down the line, yielding incorrect height, mass, or distance estimates.",
            "It shifts the sensor wavelength from infrared to visible light.",
            "It forces the system to delete files automatically.",
            "It disables the GPS coordinate logger."
        ],
        correct: 0
    },
    {
        question: "Under IHSE Protocol 10, what serves as a valid substitute for a physical holotype specimen when describing a species?",
        options: [
            "A signed affidavit from three independent witnesses.",
            "A complete dataset comprising high-definition images, 3D photogrammetric scans, and genomic samples.",
            "A detailed taxidermy cast of the cryptid.",
            "An environmental impact assessment log."
        ],
        correct: 1
    },
    {
        question: "According to IHSE Protocol 11, how does multi-spectral imaging identify synthetic suits?",
        options: [
            "By measuring the weight of the subject remotely.",
            "By analyzing the UV fluorescence of keratin and the IR reflectance of subcutaneous vascular networks.",
            "By checking the JPEG compression error levels.",
            "By recording low-frequency vocal resonances."
        ],
        correct: 1
    },
    {
        question: "Why does IHSE Protocol 12 mandate 3D musculoskeletal motion analysis?",
        options: [
            "To determine the speed of the animal.",
            "To distinguish authentic muscle sliding and joint rotations from rigid padding or costume suits.",
            "To estimate the dietary calories consumed by the subject.",
            "To calibrate the focal length of the camera."
        ],
        correct: 1
    },
    {
        question: "What is the key requirement for advanced validation under IHSE Protocol 13?",
        options: [
            "Replicating genomic sequencing findings across multiple independent laboratories.",
            "Recovering a physical skeleton.",
            "Obtaining a signature from the ICZN President.",
            "Performing a multi-spectral LiDAR drone scan."
        ],
        correct: 0
    },
    {
        question: "In the IHSE Workbook Week 1, which concept represents the commitment to base beliefs strictly on verifiable data while checking biases?",
        options: [
            "Dogmatic skepticism",
            "Scientific skepticism",
            "Epistemological credulity",
            "Pareidolic projection"
        ],
        correct: 1
    },
    {
        question: "According to Heuvelmans' postures discussed in Week 1, what is 'dogmatic rejection'?",
        options: [
            "Demanding DNA replication for all claims.",
            "Dismissing an anomalous report instantly because it contradicts mainstream zoological consensus.",
            "Accepting all folklore stories as biological fact.",
            "Preserving evidence in desiccant envelopes."
        ],
        correct: 1
    },
    {
        question: "What does Taxonomic Principle 9 in Workbook Week 1 warn researchers against?",
        options: [
            "Using digital camera traps in wet forests.",
            "Prejudging evidence or accepting anomalous claims without meeting the threshold of proof.",
            "Sequencing DNA without PCR blockers.",
            "Conducting witness interviews in public places."
        ],
        correct: 1
    },
    {
        question: "In the Week 2 Workbook, which data is optional for a physical holotype but mandatory for a Protocol 10 validation?",
        options: [
            "3D structural data and genomic sequences.",
            "Detailed notes of the geographical coordinates.",
            "Peer reviews from local zoologists.",
            "A signed witness reliability report."
        ],
        correct: 0
    },
    {
        question: "What is the IHSE metrology standard tolerance for eDNA filter kit flow rates under Week 3 guidelines?",
        options: [
            "&plusmn; 0.5 L/min",
            "&plusmn; 0.05 L/min",
            "&plusmn; 1.0 L/min",
            "&plusmn; 0.005 L/min"
        ],
        correct: 1
    },
    {
        question: "Under the Week 3 Metrology workbook, what calibration gain tolerance is specified for acoustic recorders?",
        options: [
            "&plusmn; 0.5 dB gain flatness",
            "&plusmn; 0.1 dB gain flatness",
            "&plusmn; 1.0 dB gain flatness",
            "&plusmn; 0.01 dB gain flatness"
        ],
        correct: 1
    },
    {
        question: "What is the spatial coordinate tolerance for an IHSE LiDAR scanner at 100 meters, according to Week 3 metrology standards?",
        options: [
            "&plusmn; 10.0 mm",
            "&plusmn; 2.0 mm",
            "&plusmn; 5.0 mm",
            "&plusmn; 0.2 mm"
        ],
        correct: 1
    },
    {
        question: "Which species, considered a mythical cryptid in 19th-century African folklore, was formally described in 1901?",
        options: [
            "The Giant Squid",
            "The Okapi (Okapia johnstoni)",
            "The Coelacanth",
            "The Platypus"
        ],
        correct: 1
    },
    {
        question: "How did medieval bestiaries differ from Linnaean taxonomy, as studied in Week 4?",
        options: [
            "Linnaean taxonomy focused on genetic barcoding.",
            "Bestiaries mixed moral allegory and folklore with zoology, whereas Linnaeus introduced systematic classification.",
            "Bestiaries used double-blind interview standards.",
            "Linnaeus rejected all physical holotype specimens."
        ],
        correct: 1
    },
    {
        question: "In Week 5 eDNA analysis, a higher Cycle Threshold (Ct) value in PCR amplification indicates:",
        options: [
            "A higher concentration of the target DNA in the sample.",
            "A lower concentration or lack of target DNA in the sample.",
            "A higher presence of humic acid inhibitors.",
            "A successful sequencing run."
        ],
        correct: 1
    },
    {
        question: "Under the Week 5 Bias-Filtering Matrix, which witness sighting reports receive the lowest reliability classification (Class 1)?",
        options: [
            "Sightings under ideal lighting with physical trace backing.",
            "Sightings at night with passing observers and clear signs of folkloric anchoring.",
            "Sightings by trained biologists with calibrated instruments.",
            "Sightings verified by eDNA sequencing."
        ],
        correct: 1
    },
    {
        question: "How does a compliant gait differ from a standard human heel-strike walk under Week 6 analysis?",
        options: [
            "It involves walking with bent knees and hips, reducing vertical torso movement and altering trackway pressure points.",
            "It is a rigid, high-speed sprint identical to canines.",
            "It is a knuckle-walking gait.",
            "It involves walking exclusively on the toes."
        ],
        correct: 0
    },
    {
        question: "Why is the Pacific Northwest coniferous forest subject to a massive fossil gap for terrestrial primates, as studied in Week 6?",
        options: [
            "No primates ever entered the region.",
            "The highly acidic soil conditions dissolve bones rapidly, preventing fossilization.",
            "The cold winter temperatures freeze bones, causing them to explode.",
            "Regional scavengers consume bones entirely within 24 hours."
        ],
        correct: 1
    },
    {
        question: "To prevent ecological pressure on target cryptids under Protocol 1, what camp odor control is mandated?",
        options: [
            "Burning pine wood to mask camp smells.",
            "Sealing all organic waste in airtight, non-permeable canisters.",
            "Burying waste 10 feet deep in forest soil.",
            "Washing camps with chlorine bleach."
        ],
        correct: 1
    },
    {
        question: "What specific security feature is required on biological evidence envelopes under Protocol 2?",
        options: [
            "They must be colored red for safety.",
            "They must feature tamper-evident, serialized adhesive security seals.",
            "They must be made of clear glass.",
            "They must be waterproofed with beeswax."
        ],
        correct: 1
    },
    {
        question: "Under Protocol 3, visual pareidolia is defined as a cognitive bias where the brain:",
        options: [
            "Projects its expectations onto an image, seeing familiar shapes (like human shapes) in random forest shadows.",
            "Forgets details of events after 24 hours.",
            "Cannot distinguish red from green light.",
            "Alters memory based on post-event suggestion."
        ],
        correct: 0
    },
    {
        question: "What specific chemical compound in forest soils must be removed during Protocol 5 PCR purification to prevent enzyme inhibition?",
        options: [
            "Silica residue",
            "Humic acids",
            "Calcium carbonate",
            "Sodium chloride"
        ],
        correct: 1
    },
    {
        question: "In digital image audits under Protocol 6, Error Level Analysis (ELA) identifies manipulation by:",
        options: [
            "Extracting the photo metadata headers.",
            "Highlighting areas with differing JPEG compression ratios, showing where adjustments occurred.",
            "Measuring the height of pixel grids.",
            "Analyzing shadow angles mathematically."
        ],
        correct: 1
    },
    {
        question: "Why must field blanks be run alongside environmental DNA samples under Protocol 8?",
        options: [
            "To clean the filter pump between operations.",
            "To identify any DNA contaminants introduced by the collector or field gear.",
            "To calibrate the flow rate sensor.",
            "To reduce sequencing cycle runtime."
        ],
        correct: 1
    },
    {
        question: "Under Protocol 10, how is a 3D structural model assembled from a live cryptid?",
        options: [
            "By using LiDAR spatial scans combined with multi-angle photogrammetry.",
            "By drawing anatomical blueprints by hand.",
            "By measuring trackways in damp mud.",
            "By using audio sonar signals."
        ],
        correct: 0
    },
    {
        question: "In Protocol 11, infrared (IR) vascular mapping is used to verify that a subject is biological by:",
        options: [
            "Detecting heat emissions from synthetic fur.",
            "Imaging subcutaneous warm blood flow patterns that cannot be replicated by costume padding.",
            "Analyzing structural medullary indexes.",
            "Measuring joint angles during locomotion."
        ],
        correct: 1
    },
    {
        question: "Under Protocol 13, independent genomic validation requires that splits of the same sequence return identical species descriptions from:",
        options: [
            "The same lab run three times.",
            "Two or more independent laboratories using double-blind sequencing.",
            "A single library matching the okapi genome.",
            "The ICZN executive committee registry."
        ],
        correct: 1
    }
];

// --- CONFIGURATION ---
const IHSE_CONFIG = {
    paypalClientId: "sb", // Swap with your live Client ID for production
    cashAppTag: "ihse",   // Cash App $Cashtag (without $)
    tuitionFee: "249.00", // Tuition fee in USD
    currency: "USD"
};

// --- APP STATE ---
let currentState = {
    currentTab: "textbook",
    currentChapter: "preface",
    currentBookPage: 0, // 0-indexed page within the active chapter
    codexSearch: "",
    codexFilter: "All",
    selectedMapCryptid: null,
    currentLabTab: "footprint",
    microscopeFocused: false,
    microscopeFocusVal: 20,
    microscopeSample: "evidence",
    audioDecoded: false,
    audioSliders: { freq: 400, gain: 0, gate: -60 },
    footprintBrushedPercent: 0,
    quizActive: false,
    quizCurrentIndex: 0,
    activeQuizQuestions: [],
    quizAnswers: [],
    quizSubmitted: false,
    userName: "",
    userRole: "guest",
    paymentMethod: "paypal",
    isAdmin: false,
    adminBypassAll: false
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initTextbook();
    initCodex();
    initMap();
    initLab();
    initExam();
    loadUserSession();
    updateAccessGates();
});

// --- NAVIGATION SYSTEM ---
function initNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    currentState.currentTab = tabId;
    
    // Update active nav buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update active sections
    document.querySelectorAll(".page-section").forEach(sec => {
        if (sec.id === `${tabId}-section`) {
            sec.classList.add("active");
        } else {
            sec.classList.remove("active");
        }
    });

    if (tabId === "lab") {
        resetLabSimulators();
    }
    
    updateAccessGates();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- TEXTBOOK PAGINATED MODULE ---
function initTextbook() {
    const syllabusItems = document.querySelectorAll(".syllabus-item");
    syllabusItems.forEach(item => {
        item.addEventListener("click", () => {
            const chapId = item.getAttribute("data-chapter");
            loadChapter(chapId, true);
        });
    });

    // Load initial chapter without automatically opening cover
    loadChapter("preface", false);
}

function loadChapter(chapId, autoOpen = true) {
    currentState.currentChapter = chapId;
    currentState.currentBookPage = 0; // Reset to page spread 1 (index 0)
    
    const cover = document.getElementById("book-cover-panel");
    const pagesPanel = document.getElementById("book-pages-panel");

    if (autoOpen && cover && pagesPanel && cover.style.display !== "none") {
        cover.classList.add("open");
        cover.style.display = "none";
        pagesPanel.style.display = "flex";
    }

    // Update active item in syllabus list
    document.querySelectorAll(".syllabus-item").forEach(item => {
        if (item.getAttribute("data-chapter") === chapId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    renderBookPage();
}

function renderBookPage() {
    const chapId = currentState.currentChapter;
    const pageIdx = currentState.currentBookPage; // 0-indexed left page index
    const totalPages = getChapterPageCount(chapId);
    
    if (totalPages === 0) return;

    const leftPageData = getTextbookPage(chapId, pageIdx);
    const rightPageData = getTextbookPage(chapId, pageIdx + 1);

    const leftContent = document.getElementById("left-page-content");
    const rightContent = document.getElementById("right-page-content");
    
    const leftNum = document.getElementById("left-page-num");
    const rightNum = document.getElementById("right-page-num");
    
    const leftHeader = document.getElementById("left-page-header");
    const rightHeader = document.getElementById("right-page-header");

    let romanNumerals = { preface: "Preface", intro: "Prolegomena", ch1: "Chapter I", ch2: "Chapter II", ch3: "Chapter III", ch4: "Chapter IV", ch5: "Chapter V", outline: "Course Outline", protocols: "Field Protocols", workbook: "Student Workbook", project: "Field Project Template" };
    let chapterTitleStr = romanNumerals[chapId] || "IHSE Compendium";
    
    leftHeader.innerText = `IHSE Compendium — ${chapterTitleStr}`;
    rightHeader.innerText = rightPageData ? `${rightPageData.title}` : `IHSE Field Archives`;

    const RESTRICTED_CHAPTERS = ["preface", "intro", "ch1", "ch2", "ch3", "ch4", "ch5", "outline", "protocols", "workbook", "project"];
    if (RESTRICTED_CHAPTERS.includes(chapId) && currentState.userRole !== "investigator" && !currentState.adminBypassAll) {
        const isPending = (currentState.userRole === "pending");
        leftContent.innerHTML = `
            <div style="text-align: center; padding: 2rem 1.5rem;">
                <div style="font-size: 2.2rem; margin-bottom: 0.8rem; color: var(--accent-red);">🔒</div>
                <h3 style="font-family: var(--font-header); font-size: 1.1rem; color: #2b2319; margin-bottom: 0.5rem; border:none; padding:0; text-transform:uppercase;">Clearance Required</h3>
                <div style="width: 50px; height: 1px; background: #8d7657; margin: 1rem auto; opacity:0.5;"></div>
                <p style="font-family: var(--font-body); font-size: 0.82rem; color: #5a4b37; line-height: 1.6; text-align: justify; text-indent:0; margin-bottom: 1.5rem;">
                    ${isPending ? 'Your membership request is currently pending verification of PayPal or Cash App receipt logs. Once verified, full clearance will be granted instantly.' : 'This archive contains advanced field intelligence and standard operating procedures. Access is restricted to registered members.'}
                </p>
                <button class="primary-btn" onclick="openJoinModal()" style="font-size:0.75rem; padding: 0.5rem 1.2rem; margin:0;">
                    ${isPending ? 'Check Receipt Status' : 'Submit Access Application'}
                </button>
            </div>
        `;
        rightContent.innerHTML = `
            <div style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; opacity:0.08; padding-top:4rem;">
                <div class="cover-seal-icon" style="width:100px; height:100px; border-width:4px; font-size:1.2rem; margin: 0 auto; color: #2b2319; border-color: #2b2319;">IHSE</div>
                <div style="font-family:var(--font-header); font-size:0.8rem; margin-top:1rem; letter-spacing:2px; color: #2b2319;">Access Restricted</div>
            </div>
        `;
        leftNum.innerText = "-";
        rightNum.innerText = "-";
        rightNum.style.display = "inline";
        updatePaginationUI(totalPages);
        return;
    }

    // Render Left Page
    let leftHtml = `<h2>${leftPageData.title}</h2>`;
    if (pageIdx === 0 && chapId !== "preface" && chapId !== "intro" && chapId !== "protocols" && chapId !== "workbook" && chapId !== "outline" && chapId !== "project") {
        // First page of textbook chapters receives a drop-cap
        leftHtml += leftPageData.content.replace("<p>", '<p class="page-drop-cap">');
    } else {
        leftHtml += leftPageData.content;
    }
    leftContent.innerHTML = leftHtml;
    leftNum.innerText = `${pageIdx + 1}`;

    // Render Right Page
    if (rightPageData) {
        let rightHtml = `<h2>${rightPageData.title}</h2>`;
        rightHtml += rightPageData.content;
        rightContent.innerHTML = rightHtml;
        rightNum.innerText = `${pageIdx + 2}`;
        rightNum.style.display = "inline";
    } else {
        // Empty page indicating end of chapter
        rightContent.innerHTML = `
            <div style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; opacity:0.15; padding-top:4rem;">
                <div class="cover-seal-icon" style="width:100px; height:100px; border-width:4px; font-size:1.2rem; margin: 0 auto;">IHSE</div>
                <div style="font-family:var(--font-header); font-size:0.8rem; margin-top:1rem; letter-spacing:2px;">End of Chapter</div>
            </div>
        `;
        rightNum.innerText = "";
        rightNum.style.display = "none";
    }

    updatePaginationUI(totalPages);
}

function updatePaginationUI(totalPages) {
    const prevTop = document.getElementById("pag-prev-top");
    const nextTop = document.getElementById("pag-next-top");
    const dropdown = document.getElementById("pag-select-dropdown");
    const totalDisplay = document.getElementById("pag-total-display");

    const pageIdx = currentState.currentBookPage;

    // Set enabled/disabled states
    if (pageIdx === 0) {
        prevTop.setAttribute("disabled", "true");
    } else {
        prevTop.removeAttribute("disabled");
    }

    if (pageIdx >= totalPages - 2) {
        nextTop.setAttribute("disabled", "true");
    } else {
        nextTop.removeAttribute("disabled");
    }

    // Set displays (showing spreads instead of singular pages)
    const totalSpreads = Math.ceil(totalPages / 2);
    totalDisplay.innerText = ` of ${totalSpreads}`;

    // Populate dropdown selection
    dropdown.innerHTML = "";
    for (let i = 0; i < totalPages; i += 2) {
        const opt = document.createElement("option");
        opt.value = i;
        let pageLabel = `${i + 1} & ${i + 2}`;
        if (i + 1 === totalPages) {
            pageLabel = `${i + 1}`;
        }
        opt.innerText = `Pages ${pageLabel}`;
        if (i === pageIdx) opt.selected = true;
        dropdown.appendChild(opt);
    }
}

// Global scope paginator buttons access
window.prevBookPage = function() {
    if (currentState.currentBookPage > 0) {
        currentState.currentBookPage -= 2;
        renderBookPage();
    }
};

window.nextBookPage = function() {
    const totalPages = getChapterPageCount(currentState.currentChapter);
    if (currentState.currentBookPage < totalPages - 2) {
        currentState.currentBookPage += 2;
        renderBookPage();
    }
};

window.goToBookPage = function(pageIndex) {
    const totalPages = getChapterPageCount(currentState.currentChapter);
    if (pageIndex >= 0 && pageIndex < totalPages) {
        currentState.currentBookPage = pageIndex;
        renderBookPage();
    }
};

// Skeuomorphic Cover Opening
window.openBook = function() {
    const cover = document.getElementById("book-cover-panel");
    const pagesPanel = document.getElementById("book-pages-panel");

    if (cover && pagesPanel) {
        cover.classList.add("open");
        setTimeout(() => {
            cover.style.display = "none";
            pagesPanel.style.display = "flex";
            currentState.currentBookPage = 0;
            renderBookPage();
        }, 650);
    }
};

// Page margin click detection
window.pageClickLeft = function() {
    window.prevBookPage();
};

window.pageClickRight = function() {
    window.nextBookPage();
};

// --- CODEX MODULE ---
function initCodex() {
    const searchBar = document.getElementById("codex-search");
    const filterSelect = document.getElementById("codex-filter");

    searchBar.addEventListener("input", (e) => {
        currentState.codexSearch = e.target.value.toLowerCase();
        renderCodexGrid();
    });

    filterSelect.addEventListener("change", (e) => {
        currentState.codexFilter = e.target.value;
        renderCodexGrid();
    });

    // Render initial grid
    renderCodexGrid();
    initModal();
}

function renderCodexGrid() {
    const grid = document.getElementById("codex-grid-container");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = CRYPTID_CODEX.filter(cryptid => {
        const matchesSearch = cryptid.name.toLowerCase().includes(currentState.codexSearch) || 
                              cryptid.scientific.toLowerCase().includes(currentState.codexSearch) ||
                              cryptid.summary.toLowerCase().includes(currentState.codexSearch);
        
        const matchesFilter = currentState.codexFilter === "All" || cryptid.group === currentState.codexFilter;
        
        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-family: var(--font-ui); padding: 3rem;">No academic profiles match the search parameters.</p>`;
        return;
    }

    filtered.forEach(cryptid => {
        const card = document.createElement("div");
        card.className = "cryptid-card";
        card.innerHTML = `
            <div class="cryptid-img-container">
                <img src="${cryptid.img}" alt="${cryptid.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Illustration+Unavailable'">
                <span class="cryptid-tag">${cryptid.group}</span>
            </div>
            <div class="cryptid-info">
                <h3 class="cryptid-name">${cryptid.name}</h3>
                <div class="cryptid-scientific">${cryptid.scientific}</div>
                <p class="cryptid-summary">${cryptid.summary}</p>
                <div class="cryptid-meta">
                    <span>Region: ${cryptid.region}</span>
                </div>
            </div>
        `;
        card.addEventListener("click", () => openCodexModal(cryptid));
        grid.appendChild(card);
    });
}

function initModal() {
    const closeBtn = document.getElementById("modal-close");
    const overlay = document.getElementById("codex-modal-overlay");

    closeBtn.addEventListener("click", closeCodexModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeCodexModal();
    });
}

function openCodexModal(cryptid) {
    const overlay = document.getElementById("codex-modal-overlay");
    
    document.getElementById("modal-title").innerText = cryptid.name;
    document.getElementById("modal-img").src = cryptid.img;
    document.getElementById("modal-img").onerror = function() {
        this.src = 'https://via.placeholder.com/600x350?text=Illustration+Unavailable';
    };
    
    document.getElementById("modal-desc-body").innerHTML = `
        <table class="modal-data-table">
            <tr>
                <th>Scientific Classification</th>
                <td>${cryptid.scientific}</td>
            </tr>
            <tr>
                <th>Primary Habitats</th>
                <td>${cryptid.habitat}</td>
            </tr>
            <tr>
                <th>Sighting Regions</th>
                <td>${cryptid.region}</td>
            </tr>
            <tr>
                <th>Estimated Physical Size</th>
                <td>${cryptid.size}</td>
            </tr>
            <tr>
                <th>Postulated Diet</th>
                <td>${cryptid.diet}</td>
            </tr>
            <tr>
                <th>Evidence Status</th>
                <td>${cryptid.status}</td>
            </tr>
        </table>
        <h4 class="modal-desc-heading">Field Observations & Profile</h4>
        <p style="text-align: justify; line-height: 1.8;">${cryptid.description}</p>
    `;

    overlay.classList.add("active");
}

function closeCodexModal() {
    document.getElementById("codex-modal-overlay").classList.remove("active");
}

// --- SIGHTINGS MAP MODULE ---
function initMap() {
    const mapSvg = document.getElementById("world-map-svg");
    if (!mapSvg) return;
    
    // Draw map pins dynamically based on coordinates
    CRYPTID_CODEX.forEach(cryptid => {
        const coords = latLngToXY(cryptid.lat, cryptid.lng, 900, 480);
        
        const pin = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pin.setAttribute("cx", coords.x);
        pin.setAttribute("cy", coords.y);
        pin.setAttribute("r", "5.5");
        pin.setAttribute("class", "map-pin");
        pin.setAttribute("id", `map-pin-${cryptid.id}`);
        
        pin.addEventListener("click", () => selectMapCryptid(cryptid));
        mapSvg.appendChild(pin);
    });
}

function latLngToXY(lat, lng, width, height) {
    const x = (lng + 180) * (width / 360);
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const y = (height / 2) - (width * mercN / (2 * Math.PI));
    
    const clampedY = Math.max(20, Math.min(height - 20, y));
    return { x: x, y: clampedY };
}

function selectMapCryptid(cryptid) {
    document.querySelectorAll(".map-pin").forEach(p => p.classList.remove("active"));
    
    const activePin = document.getElementById(`map-pin-${cryptid.id}`);
    if (activePin) activePin.classList.add("active");

    currentState.selectedMapCryptid = cryptid;
    const sidebarContent = document.getElementById("map-sidebar-data");
    
    sidebarContent.innerHTML = `
        <div class="map-detail-card">
            <div class="map-detail-cryptid">${cryptid.name}</div>
            <div class="map-detail-loc">${cryptid.region}</div>
            
            <div class="map-detail-meta-row"><strong>Latitude:</strong> ${cryptid.lat.toFixed(4)}°N</div>
            <div class="map-detail-meta-row"><strong>Longitude:</strong> ${cryptid.lng.toFixed(4)}°E</div>
            <div class="map-detail-meta-row"><strong>Taxon:</strong> ${cryptid.group}</div>
            
            <p class="map-detail-spec">${cryptid.summary}</p>
            
            <button class="primary-btn" style="width:100%; padding: 0.6rem; font-size:0.8rem; margin-top:0.5rem;" onclick="viewCryptidDetails('${cryptid.id}')">
                Open Full Dossier
            </button>
        </div>
    `;
}

// Global scope access wrapper for dynamic button clicks
window.viewCryptidDetails = function(cryptidId) {
    const cryptid = CRYPTID_CODEX.find(c => c.id === cryptidId);
    if (cryptid) openCodexModal(cryptid);
};

// --- FIELD LABORATORY MODULE ---
function initLab() {
    const labTabs = document.querySelectorAll(".lab-tab-btn");
    labTabs.forEach(btn => {
        btn.addEventListener("click", () => {
            const labTabId = btn.getAttribute("data-lab-tab");
            switchLabTab(labTabId);
        });
    });

    initFootprintCanvas();
    initAudioSimulator();
    initMicroscopeSimulator();
}

function switchLabTab(labTabId) {
    currentState.currentLabTab = labTabId;
    
    // Update active lab button
    document.querySelectorAll(".lab-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-lab-tab") === labTabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update active panels
    document.querySelectorAll(".lab-panel").forEach(p => {
        if (p.id === `lab-${labTabId}`) {
            p.classList.add("active");
        } else {
            p.classList.remove("active");
        }
    });

    resetLabSimulators();
}

function resetLabSimulators() {
    if (currentState.currentLabTab === "footprint") {
        resetFootprintCanvas();
    } else if (currentState.currentLabTab === "spectrogram") {
        resetAudioSimulator();
    } else if (currentState.currentLabTab === "microscope") {
        resetMicroscopeSimulator();
    }
}

// 1. Footprint Cast Canvas Logic
let fpCanvas, fpCtx, fpDrawing = false;

function initFootprintCanvas() {
    fpCanvas = document.getElementById("dirt-overlay-canvas");
    if (!fpCanvas) return;
    fpCtx = fpCanvas.getContext("2d");
    
    // Register touch/mouse events
    fpCanvas.addEventListener("mousedown", startBrushing);
    fpCanvas.addEventListener("mousemove", brushDirt);
    fpCanvas.addEventListener("mouseup", stopBrushing);
    fpCanvas.addEventListener("mouseleave", stopBrushing);
    
    fpCanvas.addEventListener("touchstart", (e) => { startBrushing(e.touches[0]); e.preventDefault(); });
    fpCanvas.addEventListener("touchmove", (e) => { brushDirt(e.touches[0]); e.preventDefault(); });
    fpCanvas.addEventListener("touchend", stopBrushing);

    resetFootprintCanvas();
}

function resetFootprintCanvas() {
    if (!fpCtx) return;
    currentState.footprintBrushedPercent = 0;
    
    // Update DOM
    document.getElementById("brush-fill").style.width = "0%";
    document.getElementById("brush-percent").innerText = "0%";
    document.getElementById("footprint-cast-image").style.opacity = "0.05";
    document.getElementById("footprint-analysis").classList.remove("active");
    
    // Draw soil on canvas
    fpCtx.globalCompositeOperation = "source-over";
    fpCtx.fillStyle = "#3e3226"; // Soil color
    fpCtx.fillRect(0, 0, fpCanvas.width, fpCanvas.height);
    
    // Draw some noise/dirt texture onto soil
    fpCtx.fillStyle = "#2b221a";
    for(let i=0; i<150; i++) {
        const rx = Math.random() * fpCanvas.width;
        const ry = Math.random() * fpCanvas.height;
        const rr = Math.random() * 8 + 4;
        fpCtx.beginPath();
        fpCtx.arc(rx, ry, rr, 0, Math.PI * 2);
        fpCtx.fill();
    }
}

function startBrushing(e) {
    fpDrawing = true;
    brushDirt(e);
}

function brushDirt(e) {
    if (!fpDrawing) return;
    
    const rect = fpCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    fpCtx.globalCompositeOperation = "destination-out";
    fpCtx.beginPath();
    fpCtx.arc(x, y, 32, 0, Math.PI * 2);
    fpCtx.fill();
    
    calculateBrushedPercentage();
}

function stopBrushing() {
    fpDrawing = false;
}

function calculateBrushedPercentage() {
    const imgData = fpCtx.getImageData(0, 0, fpCanvas.width, fpCanvas.height);
    const totalPixels = imgData.width * imgData.height;
    let transparentCount = 0;
    
    for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) {
            transparentCount++;
        }
    }
    
    const percent = Math.round((transparentCount / totalPixels) * 100);
    currentState.footprintBrushedPercent = percent;
    
    // Update progress bar
    document.getElementById("brush-fill").style.width = `${percent}%`;
    document.getElementById("brush-percent").innerText = `${percent}%`;
    
    // Gradually blend out image opacity
    const castImg = document.getElementById("footprint-cast-image");
    castImg.style.opacity = Math.max(0.05, percent / 100).toString();

    // Trigger completion
    if (percent >= 75) {
        document.getElementById("footprint-analysis").classList.add("active");
        castImg.style.opacity = "1";
    }
}

// 2. Spectrogram Simulator Logic
let audioSynthCtx = null;

function initAudioSimulator() {
    const freqSlider = document.getElementById("audio-freq");
    const gainSlider = document.getElementById("audio-gain");
    const gateSlider = document.getElementById("audio-gate");
    const playBtn = document.getElementById("play-audio-btn");

    const updateControls = () => {
        currentState.audioSliders.freq = parseInt(freqSlider.value);
        currentState.audioSliders.gain = parseInt(gainSlider.value);
        currentState.audioSliders.gate = parseInt(gateSlider.value);
        
        document.getElementById("val-freq").innerText = `${currentState.audioSliders.freq} Hz`;
        document.getElementById("val-gain").innerText = `${currentState.audioSliders.gain} dB`;
        document.getElementById("val-gate").innerText = `${currentState.audioSliders.gate} dB`;
        
        // Target values validation
        const targetFreq = currentState.audioSliders.freq >= 120 && currentState.audioSliders.freq <= 180;
        const targetGain = currentState.audioSliders.gain >= 6 && currentState.audioSliders.gain <= 15;
        const targetGate = currentState.audioSliders.gate >= -25 && currentState.audioSliders.gate <= -15;

        if (targetFreq && targetGain && targetGate) {
            playBtn.removeAttribute("disabled");
            playBtn.innerText = "Analyze Signal";
        } else {
            playBtn.setAttribute("disabled", "true");
            playBtn.innerText = "Calibrating Sliders...";
        }

        renderWaveformDisplay(targetFreq, targetGain, targetGate);
    };

    freqSlider.addEventListener("input", updateControls);
    gainSlider.addEventListener("input", updateControls);
    gateSlider.addEventListener("input", updateControls);

    playBtn.addEventListener("click", () => {
        synthesizeGrowl();
        document.getElementById("audio-analysis").classList.add("active");
    });

    updateControls();
}

function resetAudioSimulator() {
    document.getElementById("audio-freq").value = 400;
    document.getElementById("audio-gain").value = 0;
    document.getElementById("audio-gate").value = -60;
    document.getElementById("audio-analysis").classList.remove("active");
    
    const event = new Event("input");
    document.getElementById("audio-freq").dispatchEvent(event);
}

function renderWaveformDisplay(fMatch, gaMatch, geMatch) {
    const container = document.getElementById("spectrogram-display");
    if (!container) return;
    
    container.innerHTML = "";
    const totalBars = 80;
    
    for(let i=0; i<totalBars; i++) {
        const bar = document.createElement("div");
        bar.className = "spectrogram-wave-bar";
        bar.style.left = `${(i / totalBars) * 100}%`;
        
        let heightVal = 10 + Math.random() * 20;
        if (fMatch) heightVal += 30;
        if (gaMatch) heightVal += 20;
        if (geMatch) heightVal += 20;
        
        bar.style.height = `${heightVal}%`;
        bar.style.transition = "height 0.1s ease";
        
        container.appendChild(bar);
    }
}

function synthesizeGrowl() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        
        audioSynthCtx = new AudioCtx();
        const mainOsc = audioSynthCtx.createOscillator();
        const subOsc = audioSynthCtx.createOscillator();
        const modulator = audioSynthCtx.createOscillator();
        const gainNode = audioSynthCtx.createGain();
        const modGainNode = audioSynthCtx.createGain();
        
        mainOsc.type = "sawtooth";
        mainOsc.frequency.setValueAtTime(80, audioSynthCtx.currentTime);
        
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(40, audioSynthCtx.currentTime);
        
        modulator.type = "sine";
        modulator.frequency.setValueAtTime(8, audioSynthCtx.currentTime);
        
        modGainNode.gain.setValueAtTime(30, audioSynthCtx.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioSynthCtx.currentTime);
        
        modulator.connect(modGainNode);
        modGainNode.connect(mainOsc.frequency);
        modGainNode.connect(subOsc.frequency);
        
        mainOsc.connect(gainNode);
        subOsc.connect(gainNode);
        gainNode.connect(audioSynthCtx.destination);
        
        gainNode.gain.linearRampToValueAtTime(0.35, audioSynthCtx.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioSynthCtx.currentTime + 2.5);
        
        mainOsc.start();
        subOsc.start();
        modulator.start();
        
        mainOsc.stop(audioSynthCtx.currentTime + 2.5);
        subOsc.stop(audioSynthCtx.currentTime + 2.5);
        modulator.stop(audioSynthCtx.currentTime + 2.5);
        
    } catch(err) {
        console.warn("Web Audio API not supported on this browser.", err);
    }
}

// 3. Microscope Simulator Logic
function initMicroscopeSimulator() {
    const focusSlider = document.getElementById("focus-knob");
    const sampleSelect = document.getElementById("sample-select");
    const viewportImg = document.getElementById("microscope-view-img");

    const updateMicroscope = () => {
        currentState.microscopeFocusVal = parseInt(focusSlider.value);
        currentState.microscopeSample = sampleSelect.value;
        
        if (currentState.microscopeSample === "evidence") {
            viewportImg.src = "assets/microscope_hair.png";
            viewportImg.style.transform = "scale(1.2)";
        } else if (currentState.microscopeSample === "bear") {
            viewportImg.src = "assets/microscope_hair.png";
            viewportImg.style.transform = "scale(1.0) rotate(45deg)";
        } else { // Human
            viewportImg.src = "assets/microscope_hair.png";
            viewportImg.style.transform = "scale(0.8) rotate(-90deg)";
        }

        const focusDiff = Math.abs(currentState.microscopeFocusVal - 70);
        let blurVal = focusDiff / 2;
        if (blurVal < 1) blurVal = 0;
        
        viewportImg.style.filter = `blur(${blurVal}px) sepia(0.4) contrast(1.1) brightness(0.9)`;

        const isFocused = blurVal === 0;
        currentState.microscopeFocused = isFocused;

        if (isFocused && currentState.microscopeSample === "evidence") {
            document.getElementById("microscope-analysis").classList.add("active");
        } else {
            document.getElementById("microscope-analysis").classList.remove("active");
        }
    };

    focusSlider.addEventListener("input", updateMicroscope);
    sampleSelect.addEventListener("change", updateMicroscope);

    updateMicroscope();
}

function resetMicroscopeSimulator() {
    document.getElementById("focus-knob").value = 20;
    document.getElementById("sample-select").value = "evidence";
    document.getElementById("microscope-analysis").classList.remove("active");
    
    const event = new Event("input");
    document.getElementById("focus-knob").dispatchEvent(event);
}

// --- UNIVERSITY EXAM MODULE ---
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initExam() {
    const startBtn = document.getElementById("start-exam-btn");
    const studentNameInput = document.getElementById("student-name-input");

    startBtn.addEventListener("click", () => {
        const nameVal = studentNameInput.value.trim();
        if (nameVal === "") {
            alert("Please enter your name to register for the examination.");
            return;
        }
        
        currentState.userName = nameVal;
        startQuiz();
    });

    document.getElementById("quiz-prev-btn").addEventListener("click", () => {
        if (currentState.quizCurrentIndex > 0) {
            currentState.quizCurrentIndex--;
            renderQuizQuestion();
        }
    });

    document.getElementById("quiz-next-btn").addEventListener("click", () => {
        if (currentState.quizCurrentIndex < currentState.activeQuizQuestions.length - 1) {
            currentState.quizCurrentIndex++;
            renderQuizQuestion();
        } else {
            evaluateQuiz();
        }
    });
}

function startQuiz() {
    // Select exactly 50 random questions from the 100 total questions pool
    currentState.activeQuizQuestions = shuffleArray([...QUIZ_QUESTIONS]).slice(0, 50);
    currentState.quizActive = true;
    currentState.quizCurrentIndex = 0;
    currentState.quizAnswers = Array(50).fill(null);
    currentState.quizSubmitted = false;

    document.getElementById("exam-intro-panel").style.display = "none";
    document.getElementById("quiz-panel").style.display = "block";
    document.getElementById("exam-results-panel").style.display = "none";

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const qIndex = currentState.quizCurrentIndex;
    const qData = currentState.activeQuizQuestions[qIndex];
    const totalQ = currentState.activeQuizQuestions.length;
    
    const progressFill = document.getElementById("quiz-progress");
    progressFill.style.width = `${((qIndex + 1) / totalQ) * 100}%`;
    
    document.getElementById("quiz-question-display").innerText = `Question ${qIndex + 1}: ${qData.question}`;
    
    const optionsContainer = document.getElementById("quiz-options-container");
    optionsContainer.innerHTML = "";
    
    qData.options.forEach((opt, idx) => {
        const optionLabel = document.createElement("label");
        optionLabel.className = "quiz-option-label";
        if (currentState.quizAnswers[qIndex] === idx) {
            optionLabel.classList.add("selected");
        }
        
        optionLabel.innerHTML = `
            <input type="radio" class="quiz-option-radio" name="quiz-opt" value="${idx}" ${currentState.quizAnswers[qIndex] === idx ? 'checked' : ''}>
            <span>${opt}</span>
        `;
        
        optionLabel.addEventListener("click", () => {
            const radio = optionLabel.querySelector("input");
            radio.checked = true;
            
            document.querySelectorAll(".quiz-option-label").forEach(l => l.classList.remove("selected"));
            optionLabel.classList.add("selected");
            
            currentState.quizAnswers[qIndex] = idx;
            document.getElementById("quiz-next-btn").removeAttribute("disabled");
        });
        
        optionsContainer.appendChild(optionLabel);
    });

    const prevBtn = document.getElementById("quiz-prev-btn");
    prevBtn.disabled = qIndex === 0;

    const nextBtn = document.getElementById("quiz-next-btn");
    if (currentState.quizAnswers[qIndex] === null) {
        nextBtn.setAttribute("disabled", "true");
    } else {
        nextBtn.removeAttribute("disabled");
    }

    if (qIndex === totalQ - 1) {
        nextBtn.innerText = "Submit Examination";
    } else {
        nextBtn.innerText = "Next Question";
    }
}

function evaluateQuiz() {
    currentState.quizSubmitted = true;
    let score = 0;
    const totalQ = currentState.activeQuizQuestions.length;
    
    currentState.activeQuizQuestions.forEach((q, idx) => {
        if (currentState.quizAnswers[idx] === q.correct) {
            score++;
        }
    });

    const percent = Math.round((score / totalQ) * 100);
    
    document.getElementById("quiz-panel").style.display = "none";
    document.getElementById("exam-results-panel").style.display = "block";
    
    const scoreValText = document.getElementById("results-score-value");
    scoreValText.innerText = `${percent}%`;

    const resultsStatement = document.getElementById("results-statement");
    const certWrapper = document.getElementById("certificate-wrapper");
    const downloadBtn = document.getElementById("download-cert-btn");

    if (percent >= 70) {
        scoreValText.style.color = "var(--accent-green)";
        resultsStatement.innerHTML = `<strong>Congratulations, Researcher!</strong> You have demonstrated a comprehensive academic command of taxonomic cryptozoology and field methodology. The institute herewith awards you the certificate below.`;
        
        // 1. Generate/Retrieve Persistent Certificate ID
        let certId = localStorage.getItem("ihse_certId");
        if (!certId) {
            const randNum = Math.floor(100000 + Math.random() * 900000);
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const randChar = chars.charAt(Math.floor(Math.random() * chars.length));
            certId = `IHSE-101-L1-${randNum}${randChar}`;
            localStorage.setItem("ihse_certId", certId);
        }
        currentState.certId = certId;

        // 2. Format Date (e.g. 8th day of June, 2026)
        const today = new Date();
        const day = today.getDate();
        const year = today.getFullYear();
        const month = today.toLocaleString('default', { month: 'long' });
        
        let suffix = "th";
        if (day < 11 || day > 13) {
            switch (day % 10) {
                case 1:  suffix = "st"; break;
                case 2:  suffix = "nd"; break;
                case 3:  suffix = "rd"; break;
            }
        }
        const ordinalDateString = `Awarded this ${day}${suffix} day of ${month}, ${year}.`;
        
        // 3. Update DOM
        document.getElementById("cert-student-name").innerText = currentState.userName || "FIELD INVESTIGATOR";
        document.getElementById("cert-issue-date").innerText = ordinalDateString;
        document.getElementById("cert-id-display").innerText = `Certificate ID: ${certId}`;
        
        certWrapper.style.display = "block";
        downloadBtn.style.display = "inline-block";
        
        drawCanvasCertificate(currentState.userName || "FIELD INVESTIGATOR", ordinalDateString, certId);
    } else {
        scoreValText.style.color = "var(--accent-red)";
        resultsStatement.innerHTML = `<strong>Examination Incomplete.</strong> Your score of ${percent}% falls short of the required 70% threshold. You are encouraged to re-read the textbook chapters and test again.`;
        certWrapper.style.display = "none";
        downloadBtn.style.display = "none";
    }
}

// Canvas-based High-Res Certificate Generation for Downloading
function drawCanvasCertificate(name, dateStr, certId) {
    const canvas = document.getElementById("cert-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Set high-res dimensions
    canvas.width = 1200;
    canvas.height = 800;
    
    // Background
    ctx.fillStyle = "#f7f5ef";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Double outer borders
    ctx.strokeStyle = "#8d7657";
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    ctx.strokeStyle = "#5a4b37";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);
    
    // Inner thin border
    ctx.strokeStyle = "#5a4b37";
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);
    
    // Header
    ctx.fillStyle = "#5a4b37";
    ctx.textAlign = "center";
    ctx.font = "bold 20px 'Cinzel', Times, serif";
    ctx.fillText("INSTITUTE OF HIDDEN SPECIES EXPEDITIONS", canvas.width / 2, 110);
    
    ctx.font = "normal 14px 'Montserrat', sans-serif";
    ctx.fillText("IHSE ACADEMY", canvas.width / 2, 135);
    
    // Title
    ctx.fillStyle = "#2b2319";
    ctx.font = "bold 38px 'Cinzel', Times, serif";
    ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 210);
    
    // Underline for title
    ctx.strokeStyle = "#8d7657";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 120, 230);
    ctx.lineTo(canvas.width / 2 + 120, 230);
    ctx.stroke();
    
    // Body Text
    ctx.fillStyle = "#5a4b37";
    ctx.font = "italic 18px 'Lora', Georgia, serif";
    ctx.fillText("This certifies that", canvas.width / 2, 280);
    
    // Student Name
    ctx.fillStyle = "#2b2319";
    ctx.font = "bold 32px 'Cinzel', Times, serif";
    ctx.fillText(name.toUpperCase(), canvas.width / 2, 335);
    
    // Name underline
    ctx.strokeStyle = "#c5a880";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 200, 345);
    ctx.lineTo(canvas.width / 2 + 200, 345);
    ctx.stroke();
    
    // Core Course Title
    ctx.fillStyle = "#5a4b37";
    ctx.font = "normal 16px 'Lora', Georgia, serif";
    ctx.fillText("has successfully completed all academic requirements for", canvas.width / 2, 385);
    
    ctx.fillStyle = "#2b2319";
    ctx.font = "bold 18px 'Cinzel', Times, serif";
    ctx.fillText("INTRODUCTORY CRYPTOZOOLOGY — LEVEL 1 (IHSE 101)", canvas.width / 2, 420);
    
    // Curriculum summary box
    const boxWidth = 560;
    const boxHeight = 125;
    const boxX = canvas.width / 2 - boxWidth / 2;
    const boxY = 445;
    
    ctx.fillStyle = "rgba(141, 118, 87, 0.03)";
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    
    ctx.strokeStyle = "rgba(141, 118, 87, 0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    ctx.setLineDash([]); // Reset dash
    
    ctx.fillStyle = "#2b2319";
    ctx.font = "bold 11px 'Montserrat', sans-serif";
    ctx.fillText("FOUNDATIONAL CURRICULUM COVERED:", canvas.width / 2, boxY + 22);
    
    ctx.fillStyle = "#5a4b37";
    ctx.font = "normal 12px 'Lora', Georgia, serif";
    ctx.textAlign = "left";
    
    // List points in two columns
    const col1X = boxX + 25;
    const col2X = boxX + 295;
    
    ctx.fillText("• Scientific cryptozoological methodology", col1X, boxY + 47);
    ctx.fillText("• Holotype & holotype-alternative standards", col1X, boxY + 72);
    ctx.fillText("• Metrology & calibration protocols", col1X, boxY + 97);
    
    ctx.fillText("• Archival & historical analysis", col2X, boxY + 47);
    ctx.fillText("• eDNA & metagenomic investigation", col2X, boxY + 72);
    ctx.fillText("• Cognitive-bias filtering & ecological plausibility", col2X, boxY + 97);
    
    // Reset alignment
    ctx.textAlign = "center";
    
    // Proficiency statement
    ctx.fillStyle = "#5a4b37";
    ctx.font = "normal 15px 'Lora', Georgia, serif";
    ctx.fillText("and has demonstrated proficiency in IHSE-standard investigative practices.", canvas.width / 2, 600);
    
    // Award Date
    ctx.font = "italic 16px 'Lora', Georgia, serif";
    ctx.fillText(dateStr, canvas.width / 2, 635);
    
    // Signature block lines
    ctx.strokeStyle = "rgba(141, 118, 87, 0.5)";
    ctx.lineWidth = 1;
    
    // Left signature line
    ctx.beginPath();
    ctx.moveTo(100, 715);
    ctx.lineTo(380, 715);
    ctx.stroke();
    
    // Right signature line
    ctx.beginPath();
    ctx.moveTo(820, 715);
    ctx.lineTo(1100, 715);
    ctx.stroke();
    
    // Signature text details
    ctx.fillStyle = "#5a4b37";
    ctx.font = "bold 10px 'Montserrat', sans-serif";
    ctx.fillText("ACADEMIC DIRECTOR", 240, 730);
    ctx.fillText("LEAD INSTRUCTOR, IHSE 101", 960, 730);
    
    ctx.fillStyle = "#2b2319";
    ctx.font = "italic 14px 'Lora', Georgia, serif";
    ctx.fillText("Dr. Joseph Bryan Thornburg, PhD.", 240, 710);
    ctx.fillText("Dr. Joseph Bryan Thornburg, PhD.", 960, 710);
    
    ctx.fillStyle = "#8d7657";
    ctx.font = "10px 'Montserrat', sans-serif";
    ctx.fillText("IHSE Board of Trustees", 240, 745);
    ctx.fillText("Anomalous Biological Department", 960, 745);
    
    // Stamp the seal
    const cx = canvas.width / 2;
    const cy = 690;
    
    if (sealImage.complete && sealImage.naturalWidth !== 0) {
        ctx.drawImage(sealImage, cx - 45, cy - 45, 90, 90);
    } else {
        // Fallback: draw gold seal circle
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fillStyle = "#d4b285";
        ctx.fill();
        ctx.strokeStyle = "#8d7657";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = "#5a4b37";
        ctx.font = "bold 9px 'Cinzel', Times, serif";
        ctx.fillText("IHSE", cx, cy - 8);
        ctx.fillText("OFFICIAL", cx, cy + 4);
        ctx.fillText("SEAL", cx, cy + 16);
    }
    
    // Certificate ID at the bottom
    ctx.fillStyle = "#8d7657";
    ctx.font = "10px 'Montserrat', sans-serif";
    ctx.fillText("Certificate ID: " + certId, canvas.width / 2, 775);
}

window.downloadCertificate = function() {
    const canvas = document.getElementById("cert-canvas");
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = `IHSE_Cryptozoology_Certificate_${currentState.userName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
};

window.restartExam = function() {
    document.getElementById("exam-intro-panel").style.display = "block";
    document.getElementById("quiz-panel").style.display = "none";
    document.getElementById("exam-results-panel").style.display = "none";
    document.getElementById("student-name-input").value = "";
    currentState.quizActive = false;
};

// --- MANUAL COMPILING & DOWNLOAD / PRINT UTILITIES ---
window.downloadHtmlBook = function() {
    if (currentState.userRole !== "investigator" && !currentState.adminBypassAll) {
        alert("Access Denied: Clearance required to download the E-Book. Please apply for Investigator Status.");
        openJoinModal();
        return;
    }
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptozoology: An Advanced Exploration for College Graduates</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Lora:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent-gold: #c5a880;
            --border-gold: #8d7657;
            --text-primary: #2b2319;
            --text-muted: #8d7657;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: #16120e;
            color: var(--text-primary);
            font-family: 'Lora', serif;
            line-height: 1.8;
            padding: 3rem 1.5rem;
        }
        .book-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #fbf6ec;
            border: 8px solid #231610;
            border-radius: 8px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            padding: 4rem 5rem;
        }
        .page-break {
            page-break-before: always;
            margin-top: 5rem;
            border-top: 2px double var(--border-gold);
            padding-top: 3rem;
        }
        h1, h2, h3 {
            font-family: 'Cinzel', serif;
            color: #2b2319;
            page-break-after: avoid;
        }
        h1 {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 2rem;
            border-bottom: 2px solid var(--border-gold);
            padding-bottom: 1rem;
        }
        h2 {
            font-size: 1.4rem;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            border-bottom: 1px dashed rgba(141,118,87,0.3);
            padding-bottom: 0.3rem;
        }
        p {
            text-align: justify;
            margin-bottom: 1.2rem;
            text-indent: 1.5rem;
        }
        p.first-p, p.page-drop-cap {
            text-indent: 0;
        }
        .academic-note {
            background-color: rgba(141, 118, 87, 0.05);
            border-left: 4px solid var(--border-gold);
            padding: 1rem 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            font-size: 0.9rem;
            text-indent: 0;
        }
        .cover-page {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 8rem 2rem;
            min-height: 70vh;
        }
        .cover-border {
            border: 2px double var(--accent-gold);
            padding: 4rem 3rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .cover-institute {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: var(--text-muted);
            margin-bottom: 2rem;
        }
        .cover-title {
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 1rem;
            color: #2b2319;
        }
        .cover-subtitle {
            font-size: 1.4rem;
            letter-spacing: 1px;
            margin-bottom: 4rem;
            color: var(--text-muted);
        }
        .cover-seal {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid var(--accent-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            font-weight: bold;
            color: var(--text-muted);
        }
        .chapter-illustration {
            display: block;
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            border: 1px solid var(--border-gold);
            margin: 2rem 0;
            filter: sepia(0.3) contrast(1.1) brightness(0.9);
        }
        .page-drop-cap::first-letter {
            font-family: 'Cinzel', serif;
            font-size: 3.5rem;
            float: left;
            line-height: 0.8;
            margin-right: 0.5rem;
            margin-top: 0.15rem;
            color: var(--border-gold);
            font-weight: 700;
            border: 1px solid rgba(141, 118, 87, 0.3);
            padding: 2px 6px;
            background-color: rgba(141, 118, 87, 0.03);
        }
        @media print {
            body { background: #fff; padding: 0; }
            .book-container { border: none; box-shadow: none; padding: 0; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="book-container">
        <!-- Cover Page -->
        <div class="cover-page">
            <div class="cover-border">
                <div class="cover-institute">Institute of Hidden Spice Expeditions</div>
                <div class="cover-title" style="font-size:2.2rem; font-weight:900; margin-bottom:0.5rem;">CRYPTOZOOLOGY</div>
                <div class="cover-subtitle" style="font-size:1.1rem; margin-bottom:1.5rem; letter-spacing:1px;">An Advanced Exploration for College Graduates</div>
                <div style="font-family:'Montserrat', sans-serif; font-size:1.1rem; font-weight:600; margin-bottom:0.5rem; color:#2b2319;">Dr. Joseph Bryan Thornburg, PhD (Cryptozoology)</div>
                <div style="font-family:'Lora', serif; font-size:0.8rem; line-height:1.4; font-style:italic; margin-bottom:3rem; color:#5a4b37;">
                    Ordained Minister<br>
                    Founder &amp; Expedition Architect, Institute of Hidden Spice Expeditions
                </div>
                <div class="cover-seal">IHSE</div>
                <div style="margin-top: 4rem; font-family:'Montserrat', sans-serif; font-size:0.8rem; letter-spacing:2px; color:var(--text-muted);">
                    OFFICIAL COMPENDIUM EDITION
                </div>
            </div>
        </div>
`;

    const keys = ["preface", "intro", "ch1", "ch2", "ch3", "ch4", "ch5", "outline", "protocols", "workbook", "project"];
    const romanNumerals = { preface: "Preface: The Science", intro: "Prolegomena: History", ch1: "Chapter I: Terrestrial Hominids", ch2: "Chapter II: Aquatic and Marine", ch3: "Chapter III: Aerial Cryptids", ch4: "Chapter IV: Forensic Field Methods", ch5: "Chapter V: Epistemology and Hoaxes", outline: "Course Outline", protocols: "Field Protocol Manual", workbook: "Student Workbook", project: "Field Project Template" };
    
    const illustrations = {
        ch1: "assets/bigfoot.png",
        ch2: "assets/nessie.png",
        ch3: "assets/mothman.png",
        ch4: "assets/chupacabra.png"
    };

    keys.forEach(chapId => {
        htmlContent += `
        <div class="page-break">
            <h1>${romanNumerals[chapId]}</h1>
        `;

        if (illustrations[chapId]) {
            htmlContent += `<img src="${illustrations[chapId]}" class="chapter-illustration" alt="${romanNumerals[chapId]} Illustration" onerror="this.style.display='none'">`;
        }

        const pageCount = getChapterPageCount(chapId);
        for (let index = 0; index < pageCount; index++) {
            const page = getTextbookPage(chapId, index);
            if (!page) continue;
            htmlContent += `<h2>${page.title}</h2>`;
            let contentHtml = page.content;
            if (index === 0 && chapId !== "preface" && chapId !== "intro" && chapId !== "protocols" && chapId !== "workbook" && chapId !== "outline" && chapId !== "project") {
                contentHtml = contentHtml.replace("<p>", '<p class="page-drop-cap">');
            } else {
                contentHtml = contentHtml.replace("<p>", '<p class="first-p">');
            }
            htmlContent += contentHtml;
        }

        htmlContent += `</div>`;
    });

    htmlContent += `
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "IHSE_Cryptozoology_Textbook_Edition.html";
    link.click();
};

window.printFullManual = function() {
    if (currentState.userRole !== "investigator" && !currentState.adminBypassAll) {
        alert("Access Denied: Clearance required to print or save the Compendium. Please apply for Investigator Status.");
        openJoinModal();
        return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
        alert("Pop-up blocker is preventing opening the print view. Please allow popups for this site.");
        return;
    }
    
    let htmlContent = `
    <html>
    <head>
        <title>IHSE Cryptozoology Compendium - Print Edition</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Lora', serif;
                color: #1a1a1a;
                background: #fff;
                line-height: 1.8;
                padding: 1.5in 1in;
                max-width: 8.5in;
                margin: 0 auto;
            }
            h1, h2, h3 {
                font-family: 'Cinzel', serif;
                color: #2b2319;
                page-break-after: avoid;
            }
            h1 {
                font-size: 2.2rem;
                text-align: center;
                margin-top: 3rem;
                border-bottom: 2px solid #8d7657;
                padding-bottom: 1rem;
            }
            h2 {
                font-size: 1.4rem;
                margin-top: 2.5rem;
                border-bottom: 1px solid #ccc;
                padding-bottom: 0.5rem;
            }
            p {
                text-align: justify;
                margin-bottom: 1.2rem;
            }
            .academic-note {
                background-color: #f7f5ef;
                border-left: 4px solid #8d7657;
                padding: 1rem 1.5rem;
                margin: 2rem 0;
                font-style: italic;
            }
            .page-break {
                page-break-before: always;
            }
            .cover-page {
                height: 85vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding-top: 15%;
            }
            .cover-title {
                font-size: 3rem;
                font-weight: 700;
                color: #2b2319;
                margin-bottom: 1.5rem;
                margin-top: 2rem;
            }
            .cover-subtitle {
                font-family: 'Montserrat', sans-serif;
                font-size: 1.2rem;
                text-transform: uppercase;
                letter-spacing: 4px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="cover-page">
            <div class="cover-subtitle">Institute of Hidden Spice Expeditions</div>
            <div class="cover-title" style="font-size: 2.5rem;">CRYPTOZOOLOGY</div>
            <div class="cover-subtitle" style="font-size: 1.1rem; margin-top: 0.5rem; letter-spacing: 2px;">An Advanced Exploration for College Graduates</div>
            <div style="font-family:'Montserrat', sans-serif; font-size:1.3rem; font-weight:600; margin-top: 2rem; color:#2b2319;">Dr. Joseph Bryan Thornburg, PhD (Cryptozoology)</div>
            <div style="font-family:'Lora', serif; font-size:0.95rem; line-height:1.5; font-style:italic; margin-top:0.5rem; margin-bottom:2rem; color:#5a4b37;">
                Ordained Minister<br>
                Founder &amp; Expedition Architect, Institute of Hidden Spice Expeditions
            </div>
            <div style="margin-top: 4rem; font-family:'Montserrat', sans-serif; font-size:0.9rem; color:#888;">© 2026 Joseph Bryan Thornburg. All rights reserved.</div>
        </div>
    `;

    const keys = ["preface", "intro", "ch1", "ch2", "ch3", "ch4", "ch5", "outline", "protocols", "workbook", "project"];
    const romanNumerals = { preface: "Preface: The Science", intro: "Prolegomena: History", ch1: "Chapter I: Terrestrial Hominids", ch2: "Chapter II: Aquatic and Marine", ch3: "Chapter III: Aerial Cryptids", ch4: "Chapter IV: Forensic Field Methods", ch5: "Chapter V: Epistemology and Hoaxes", outline: "Course Outline", protocols: "Field Protocol Manual", workbook: "Student Workbook", project: "Field Project Template" };

    keys.forEach(chapId => {
        htmlContent += `<div class="page-break">`;
        htmlContent += `<h1>${romanNumerals[chapId]}</h1>`;
        
        const pageCount = getChapterPageCount(chapId);
        for (let index = 0; index < pageCount; index++) {
            const page = getTextbookPage(chapId, index);
            if (!page) continue;
            htmlContent += `<h2>Page ${index + 1}: ${page.title}</h2>`;
            htmlContent += page.content;
        }
        htmlContent += `</div>`;
    });

    htmlContent += `
        <script>
            window.onload = function() {
                setTimeout(function() {
                    window.print();
                }, 500);
            };
        </script>
    </body>
    </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
};

window.downloadProjectTemplate = function() {
    if (currentState.userRole !== "investigator" && !currentState.adminBypassAll) {
        alert("Access Denied: Clearance required to download the Field Project Dossier. Please apply for Investigator Status.");
        openJoinModal();
        return;
    }
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IHSE Final Project Dossier Template</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Lora:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent-gold: #c5a880;
            --border-gold: #8d7657;
            --text-primary: #2b2319;
            --text-muted: #8d7657;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: #16120e;
            color: var(--text-primary);
            font-family: 'Lora', serif;
            line-height: 1.8;
            padding: 0;
        }
        .book-container {
            max-width: 800px;
            margin: 2rem auto;
            background-color: #fbf6ec;
            border: 8px solid #231610;
            border-radius: 8px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            padding: 4rem 5rem;
        }
        .page-break {
            page-break-before: always;
            margin-top: 5rem;
            border-top: 2px double var(--border-gold);
            padding-top: 3rem;
        }
        .page-break:first-of-type {
            page-break-before: avoid;
            margin-top: 0;
            border-top: none;
            padding-top: 0;
        }
        h1, h2, h3, h4 {
            font-family: 'Cinzel', serif;
            color: #2b2319;
            page-break-after: avoid;
        }
        h1 {
            font-size: 2.2rem;
            text-align: center;
            margin-bottom: 2rem;
            border-bottom: 2px solid var(--border-gold);
            padding-bottom: 1rem;
        }
        h2 {
            font-size: 1.4rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-bottom: 1px dashed rgba(141,118,87,0.3);
            padding-bottom: 0.3rem;
        }
        h3 {
            font-size: 1.1rem;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #8d7657;
        }
        p {
            margin-bottom: 1.2rem;
            text-align: justify;
        }
        ul, ol {
            margin-left: 2rem;
            margin-bottom: 1.5rem;
        }
        li {
            margin-bottom: 0.5rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.9rem;
        }
        th, td {
            border: 1px solid var(--border-gold);
            padding: 0.6rem;
            text-align: left;
        }
        th {
            background-color: var(--border-gold);
            color: #fbf6ec;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        @media print {
            body { background: #fff; padding: 0; }
            .book-container { border: none; box-shadow: none; padding: 0; max-width: 100%; margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="position: sticky; top: 0; left: 0; right: 0; background: #231610; color: #f5f2eb; padding: 0.75rem 1.5rem; display: flex; justify-content: space-between; align-items: center; font-family: 'Montserrat', sans-serif; font-size: 0.85rem; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 1000;">
        <span>IHSE Field Project Dossier &mdash; Interactive Template</span>
        <button onclick="window.print()" style="background: #c5a880; color: #231610; border: none; padding: 0.4rem 1rem; font-weight: 600; cursor: pointer; border-radius: 4px; font-family: 'Montserrat', sans-serif; transition: background 0.2s;" onmouseover="this.style.background='#e0c29b'" onmouseout="this.style.background='#c5a880'">Print / Save to PDF</button>
    </div>
    
    <div class="book-container">
`;

    const pageCount = getChapterPageCount("project");
    for (let index = 0; index < pageCount; index++) {
        const page = getTextbookPage("project", index);
        if (!page) continue;
        htmlContent += `
        <div class="page-break">
            <h1>${page.title}</h1>
            \${page.content}
        </div>
        `;
    }

    htmlContent += `
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "IHSE_Field_Project_Dossier_Template.html";
    link.click();
};

// --- USER ROLE ACCESS & MEMBERSHIP GATES ---
// --- SESSION HELPERS & PERSISTENCE ---
function saveUserSession(name, role, method, txId, cashtag) {
    localStorage.setItem("ihse_userName", name || "");
    localStorage.setItem("ihse_userRole", role || "guest");
    localStorage.setItem("ihse_paymentMethod", method || "");
    localStorage.setItem("ihse_paymentTxId", txId || "");
    localStorage.setItem("ihse_cashappTag", cashtag || "");
}

function loadUserSession() {
    const role = localStorage.getItem("ihse_userRole") || "guest";
    const name = localStorage.getItem("ihse_userName") || "";
    const method = localStorage.getItem("ihse_paymentMethod") || "paypal";
    const txId = localStorage.getItem("ihse_paymentTxId") || "";
    const cashtag = localStorage.getItem("ihse_cashappTag") || "";
    
    currentState.userRole = role;
    currentState.userName = name;
    currentState.paymentMethod = method;
    currentState.paymentTxId = txId;
    currentState.cashappTag = cashtag;
    
    // Sync name to exam input
    const examName = document.getElementById("student-name-input");
    if (examName && name) {
        examName.value = name;
    }

    // Load Admin credentials
    const adminSession = sessionStorage.getItem("ihse_isAdmin");
    if (adminSession === "true") {
        currentState.isAdmin = true;
        // Display panel
        const panel = document.getElementById("admin-floating-panel");
        if (panel) {
            panel.style.display = "block";
        }
        // Style toggle button
        const toggleBtn = document.getElementById("admin-toggle-btn");
        if (toggleBtn) {
            toggleBtn.style.borderColor = "var(--accent-green)";
            toggleBtn.style.color = "var(--accent-green)";
            toggleBtn.style.background = "rgba(63,110,82,0.08)";
        }
    }
}

window.resetUserSession = function() {
    localStorage.removeItem("ihse_userRole");
    localStorage.removeItem("ihse_userName");
    localStorage.removeItem("ihse_paymentMethod");
    localStorage.removeItem("ihse_paymentTxId");
    localStorage.removeItem("ihse_cashappTag");
    
    currentState.userRole = "guest";
    currentState.userName = "";
    currentState.paymentMethod = "paypal";
    currentState.paymentTxId = "";
    currentState.cashappTag = "";
    
    // Clear inputs in modal
    const nameIn = document.getElementById("join-name-input");
    if (nameIn) nameIn.value = "";
    const emailIn = document.getElementById("join-email-input");
    if (emailIn) emailIn.value = "";
    const tagIn = document.getElementById("join-cashapp-tag");
    if (tagIn) tagIn.value = "";
    const txIn = document.getElementById("join-cashapp-txid");
    if (txIn) txIn.value = "";
    
    const examName = document.getElementById("student-name-input");
    if (examName) {
        examName.value = "";
    }
    
    updateAccessGates();
    
    // Switch views
    document.getElementById("join-form-view").style.display = "block";
    document.getElementById("join-pending-view").style.display = "none";
    document.getElementById("join-success-view").style.display = "none";
    
    // Re-initialize paypal buttons
    initPaypalPayment();
    
    renderBookPage();
    alert("Session reset successfully. Returned to Guest status.");
};

// --- DYNAMIC PAYPAL BUTTONS RENDERING ---
function initPaypalPayment() {
    const container = document.getElementById("paypal-button-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (typeof paypal === 'undefined') {
        container.innerHTML = `
            <div style="background: rgba(235,87,87,0.1); border: 1px solid var(--accent-red); padding: 0.8rem; border-radius: 4px; font-size: 0.8rem; color: #ff5e5e; margin-bottom: 0.8rem; text-align: left; line-height: 1.4;">
                <strong>Offline Mode:</strong> PayPal JS SDK failed to load. A simulation checkout button is provided for testing.
            </div>
            <button class="primary-btn" onclick="submitSimulatedPaypal()" style="width: 100%; margin: 0; padding: 0.9rem; background: #0070ba; border-color: #0070ba;">Simulate PayPal Payment</button>
        `;
        return;
    }
    
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'gold',
            shape:  'rect',
            label:  'paypal'
        },
        createOrder: function(data, actions) {
            const name = document.getElementById("join-name-input").value.trim();
            const email = document.getElementById("join-email-input").value.trim();
            if (!name || !email) {
                alert("Please enter your Full Name and Email Address before proceeding to payment.");
                return Promise.reject(new Error("Name or Email missing"));
            }
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: IHSE_CONFIG.currency,
                        value: IHSE_CONFIG.tuitionFee
                    },
                    description: "IHSE Cryptozoology Course Tuition & Registration"
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                const name = document.getElementById("join-name-input").value.trim() || (details.payer.name.given_name + " " + details.payer.name.surname);
                
                currentState.userName = name;
                currentState.userRole = "investigator";
                currentState.paymentMethod = "paypal";
                currentState.paymentTxId = details.id;
                
                // Save session
                saveUserSession(name, "investigator", "paypal", details.id, "");
                
                // Sync name to exam input
                const examNameInput = document.getElementById("student-name-input");
                if (examNameInput) {
                    examNameInput.value = name;
                }
                
                updateAccessGates();
                
                // Switch views
                document.getElementById("join-form-view").style.display = "none";
                document.getElementById("join-pending-view").style.display = "none";
                const successView = document.getElementById("join-success-view");
                successView.style.display = "block";
                document.getElementById("success-welcome-text").innerHTML = `
                    Welcome to the Institute, Investigator <strong>${name}</strong>!<br><br>
                    Your PayPal payment has been successfully processed.<br>
                    <strong>Transaction ID:</strong> ${details.id}<br><br>
                    All content gates have been unlocked.
                `;
                
                renderBookPage();
            });
        },
        onError: function(err) {
            console.error(err);
            alert("An error occurred during the PayPal transaction. Please try again.");
        }
    }).render('#paypal-button-container');
}

window.submitSimulatedPaypal = function() {
    const name = document.getElementById("join-name-input").value.trim();
    const email = document.getElementById("join-email-input").value.trim();
    if (!name || !email) {
        alert("Please enter your Full Name and Email Address.");
        return;
    }
    
    currentState.userName = name;
    currentState.paymentMethod = "paypal";
    currentState.userRole = "pending";
    
    saveUserSession(name, "pending", "paypal", "SIMULATED-TX-12345", "");
    updateAccessGates();
    
    // Switch views
    document.getElementById("join-form-view").style.display = "none";
    const pendingView = document.getElementById("join-pending-view");
    pendingView.style.display = "block";
    document.getElementById("pending-status-text").innerText = `Your request is currently under administrative audit. We are verifying the simulated PayPal payment on your account.`;
    
    // Animate the audit bar
    const timerBar = document.getElementById("audit-timer-bar");
    timerBar.style.width = "0%";
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        timerBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            mockApproveRequest();
        }
    }, 100); // 5 seconds total
    currentState.auditInterval = interval;
};

// --- USER ROLE ACCESS & MEMBERSHIP GATES ---
window.openJoinModal = function() {
    const modal = document.getElementById("join-modal-overlay");
    if (modal) {
        modal.classList.add("active");
        
        // Reset modal views based on current state
        const formView = document.getElementById("join-form-view");
        const pendingView = document.getElementById("join-pending-view");
        const successView = document.getElementById("join-success-view");
        
        if (currentState.userRole === "investigator") {
            formView.style.display = "none";
            pendingView.style.display = "none";
            successView.style.display = "block";
            document.getElementById("success-welcome-text").innerHTML = `Welcome to the Institute of Hidden Species Expeditions, Investigator <strong>${currentState.userName}</strong>!<br><br>Your credentials have been authenticated. You have full clearance.`;
        } else if (currentState.userRole === "pending") {
            formView.style.display = "none";
            pendingView.style.display = "block";
            successView.style.display = "none";
            
            if (currentState.paymentMethod === "cashapp") {
                const txId = localStorage.getItem("ihse_paymentTxId") || "";
                const tag = localStorage.getItem("ihse_cashappTag") || "";
                document.getElementById("pending-status-text").innerHTML = `
                    Your payment of <strong>$249.00 USD</strong> is pending manual verification.<br>
                    <strong>$Cashtag:</strong> ${tag}<br>
                    <strong>Transaction ID:</strong> ${txId}<br><br>
                    Please allow up to 24 hours for the registrar to verify the receipt. For testing/evaluation, you may bypass this check using the Administrator Control Console below.
                `;
            } else {
                document.getElementById("pending-status-text").innerText = `Your request is currently under administrative audit. We are verifying the $249 USD payment on your PayPal account.`;
            }
            document.getElementById("audit-timer-bar").style.width = "100%";
        } else {
            formView.style.display = "block";
            pendingView.style.display = "none";
            successView.style.display = "none";
            
            // Populate fields if name is already set
            document.getElementById("join-name-input").value = currentState.userName || "";
            
            // Set up Cash App URL
            const cashappLink = document.getElementById("cashapp-pay-link");
            if (cashappLink) {
                cashappLink.href = `https://cash.app/$${IHSE_CONFIG.cashAppTag}/${IHSE_CONFIG.tuitionFee}`;
            }
            
            selectPaymentMethod(currentState.paymentMethod);
        }
    }
};

window.closeJoinModal = function() {
    const modal = document.getElementById("join-modal-overlay");
    if (modal) {
        modal.classList.remove("active");
    }
};

window.selectPaymentMethod = function(method) {
    currentState.paymentMethod = method;
    const paypalBtn = document.getElementById("pay-method-paypal");
    const cashappBtn = document.getElementById("pay-method-cashapp");
    const paypalDetails = document.getElementById("paypal-details-view");
    const cashappDetails = document.getElementById("cashapp-details-view");
    const submitBtn = document.getElementById("submit-tuition-btn");
    
    if (method === "paypal") {
        paypalBtn.style.borderColor = "var(--accent-gold)";
        paypalBtn.style.color = "var(--accent-gold)";
        paypalBtn.style.background = "rgba(197, 168, 128, 0.15)";
        
        cashappBtn.style.borderColor = "var(--border-color)";
        cashappBtn.style.color = "var(--text-secondary)";
        cashappBtn.style.background = "none";
        
        paypalDetails.style.display = "block";
        cashappDetails.style.display = "none";
        
        if (submitBtn) submitBtn.style.display = "none";
        
        // Render buttons
        initPaypalPayment();
    } else {
        cashappBtn.style.borderColor = "#00D632";
        cashappBtn.style.color = "#00D632";
        cashappBtn.style.background = "rgba(0, 214, 50, 0.08)";
        
        paypalBtn.style.borderColor = "var(--border-color)";
        paypalBtn.style.color = "var(--text-secondary)";
        paypalBtn.style.background = "none";
        
        paypalDetails.style.display = "none";
        cashappDetails.style.display = "block";
        
        if (submitBtn) submitBtn.style.display = "block";
    }
};

window.submitJoinRequest = function() {
    const nameInput = document.getElementById("join-name-input").value.trim();
    const emailInput = document.getElementById("join-email-input").value.trim();
    
    if (!nameInput) {
        alert("Please enter your name to apply.");
        return;
    }
    if (!emailInput) {
        alert("Please enter your email to apply.");
        return;
    }
    
    if (currentState.paymentMethod === "paypal") {
        submitSimulatedPaypal();
        return;
    }
    
    // Cash App Flow
    const cashappTag = document.getElementById("join-cashapp-tag").value.trim();
    const cashappTxId = document.getElementById("join-cashapp-txid").value.trim();
    
    if (!cashappTag) {
        alert("Please enter your Cash App $Cashtag.");
        return;
    }
    if (!cashappTxId) {
        alert("Please enter your Cash App Transaction ID.");
        return;
    }
    
    currentState.userName = nameInput;
    currentState.userRole = "pending";
    
    saveUserSession(nameInput, "pending", "cashapp", cashappTxId, cashappTag);
    updateAccessGates();
    
    // Switch views
    document.getElementById("join-form-view").style.display = "none";
    const pendingView = document.getElementById("join-pending-view");
    pendingView.style.display = "block";
    document.getElementById("pending-status-text").innerHTML = `
        Your membership request is currently under administrative audit.<br><br>
        We are verifying the payment of <strong>$249.00 USD</strong> via Cash App.<br>
        <strong>$Cashtag:</strong> ${cashappTag}<br>
        <strong>Transaction ID:</strong> ${cashappTxId}<br><br>
        The IHSE Registrar will review the transaction logs. Your access will remain gated until approved.
    `;
    
    // Animate the audit bar
    const timerBar = document.getElementById("audit-timer-bar");
    timerBar.style.width = "0%";
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        timerBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            // DO NOT auto-approve Cash App since payment is real.
            // Just display that it is pending manual review.
            document.getElementById("pending-status-text").innerHTML = `
                Your payment of <strong>$249.00 USD</strong> is pending manual verification.<br>
                <strong>$Cashtag:</strong> ${cashappTag}<br>
                <strong>Transaction ID:</strong> ${cashappTxId}<br><br>
                Please allow up to 24 hours for the registrar to verify the receipt. For testing/evaluation, you may bypass this check using the Administrator Control Console below.
            `;
        }
    }, 100); // 5 seconds total
    currentState.auditInterval = interval;
};

window.mockApproveRequest = function() {
    if (currentState.auditInterval) {
        clearInterval(currentState.auditInterval);
    }
    currentState.userRole = "investigator";
    if (!currentState.userName) {
        currentState.userName = document.getElementById("join-name-input").value.trim() || "Field Investigator";
    }
    
    saveUserSession(currentState.userName, "investigator", currentState.paymentMethod, currentState.paymentTxId || "MOCK-TX-12345", currentState.cashappTag || "");
    updateAccessGates();
    
    // Update the exam name input field automatically to save typing!
    const examName = document.getElementById("student-name-input");
    if (examName) {
        examName.value = currentState.userName;
    }
    
    // Switch to success view
    document.getElementById("join-form-view").style.display = "none";
    document.getElementById("join-pending-view").style.display = "none";
    const successView = document.getElementById("join-success-view");
    successView.style.display = "block";
    document.getElementById("success-welcome-text").innerHTML = `
        Welcome to the Institute of Hidden Species Expeditions!<br><br>
        Your credentials have been authenticated. You now have full clearance to view chapters, workbooks, and sit for the exam.
    `;
    
    // Refresh active book page to unlock it if currently on a restricted page
    renderBookPage();
};

window.mockRejectRequest = function() {
    if (currentState.auditInterval) {
        clearInterval(currentState.auditInterval);
    }
    currentState.userRole = "guest";
    saveUserSession("", "guest", "paypal", "", "");
    updateAccessGates();
    
    alert("Application rejected by administrator. Reverting status to Guest.");
    
    // Switch back to form view
    document.getElementById("join-form-view").style.display = "block";
    document.getElementById("join-pending-view").style.display = "none";
    document.getElementById("join-success-view").style.display = "none";
    
    renderBookPage();
};

function renderClearanceGate(isPending) {
    if (isPending) {
        return `
            <div class="clearance-gate-overlay" style="max-width: 600px; margin: 3rem auto; padding: 3rem; background-color: var(--bg-card); border: 2px solid var(--accent-gold); border-radius: var(--border-radius); text-align: center; box-shadow: var(--box-shadow);">
                <div style="font-size: 3rem; margin-bottom: 1rem; animation: pulse 2s infinite;">⏳</div>
                <h2 style="font-family: var(--font-header); font-size: 1.8rem; color: var(--text-primary); margin-bottom: 1.5rem; border: none; padding: 0;">MEMBERSHIP REQUEST PENDING</h2>
                <div style="width: 80px; height: 2px; background: var(--accent-gold); margin: 1.5rem auto;"></div>
                <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem;">
                    Your application for <strong>Field Investigator Status</strong> has been received. 
                    We are currently verifying the tuition payment of <strong>$249 USD</strong> via <strong>${currentState.paymentMethod === 'paypal' ? 'PayPal' : 'Cash App'}</strong>.
                </p>
                <div style="background: rgba(141,118,87,0.08); border: 1px dashed var(--accent-gold); padding: 1rem; border-radius: 4px; font-family: var(--font-ui); font-size: 0.8rem; color: var(--accent-gold); margin-bottom: 2rem;">
                    <strong>Current Status:</strong> Verifying Receipt & Credentials
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="secondary-btn" onclick="openJoinModal()" style="margin:0; font-size: 0.8rem; padding: 0.5rem 1rem;">View Payment Info</button>
                    <button class="primary-btn" onclick="mockApproveRequest()" style="margin:0; font-size: 0.8rem; padding: 0.5rem 1rem; background: var(--accent-green); border-color: var(--accent-green); color: white;">[Mock Admin: Approve Now]</button>
                </div>
            </div>
        `;
    }

    return `
        <div class="clearance-gate-overlay" style="max-width: 600px; margin: 3rem auto; padding: 3rem; background-color: var(--bg-card); border: 2px solid var(--accent-gold); border-radius: var(--border-radius); text-align: center; box-shadow: var(--box-shadow);">
            <div style="font-size: 3rem; margin-bottom: 1.5rem; color: var(--accent-red);">🔒</div>
            <h2 style="font-family: var(--font-header); font-size: 1.8rem; color: var(--text-primary); margin-bottom: 1rem; border: none; padding: 0;">IHSE CLEARANCE LEVEL REQUIRED</h2>
            <div style="width: 80px; height: 2px; background: var(--accent-gold); margin: 1.5rem auto;"></div>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem;">
                You are currently accessing the Institute's network under a <strong>Guest Profile</strong>. 
                Advanced field methodologies, laboratory simulators, and the certification exam are restricted to registered investigators.
            </p>
            <div style="background: rgba(197, 168, 128, 0.04); border: 1px solid rgba(197, 168, 128, 0.15); padding: 1.2rem; border-radius: 4px; margin-bottom: 2rem; text-align: left; font-size: 0.85rem;">
                <strong style="color: var(--accent-gold); display: block; margin-bottom: 0.4rem;">Membership Benefits:</strong>
                <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.5;">
                    <li>Unlock Textbook Chapters I &mdash; V (Hominids, Marine, Aerial, etc.)</li>
                    <li>Access the Field Protocol Manual &amp; Student Workbook</li>
                    <li>Download/Print the 12-page Final Field Project Dossier template</li>
                    <li>Use interactive DNA sequencing &amp; micro-optics simulators</li>
                    <li>Take the 50-question comprehensive certification exam for official credentials</li>
                </ul>
            </div>
            <button class="primary-btn" onclick="openJoinModal()" style="margin:0; font-size: 0.9rem; padding: 0.75rem 2rem;">Apply for Investigator Status</button>
        </div>
    `;
}

function updateAccessGates() {
    const isApproved = (currentState.userRole === "investigator" || currentState.adminBypassAll);
    const isPending = (currentState.userRole === "pending");

    // Handle Exam Section
    const examGate = document.getElementById("exam-access-gate");
    const examContent = document.getElementById("exam-main-content");
    if (examGate && examContent) {
        if (isApproved) {
            examGate.style.display = "none";
            examContent.style.display = "block";
        } else {
            examGate.style.display = "block";
            examContent.style.display = "none";
            examGate.innerHTML = renderClearanceGate(isPending);
        }
    }

    // Handle Lab Section
    const labGate = document.getElementById("lab-access-gate");
    const labContent = document.getElementById("lab-main-content");
    if (labGate && labContent) {
        if (isApproved) {
            labGate.style.display = "none";
            labContent.style.display = "block";
        } else {
            labGate.style.display = "block";
            labContent.style.display = "none";
            labGate.innerHTML = renderClearanceGate(isPending);
        }
    }

    // Update Header Status Widget
    const roleBadge = document.getElementById("user-role-badge");
    const actionLink = document.getElementById("user-action-link");
    const statusWidget = document.getElementById("user-status-widget");
    if (roleBadge && actionLink && statusWidget) {
        if (isApproved) {
            roleBadge.innerText = `Investigator: ${currentState.userName || "Approved"}`;
            actionLink.innerText = "View Profile";
            statusWidget.style.borderColor = "var(--accent-green)";
            statusWidget.style.color = "var(--accent-green)";
            statusWidget.style.background = "rgba(63,110,82,0.08)";
        } else if (isPending) {
            roleBadge.innerText = "Request Pending";
            actionLink.innerText = "View Status";
            statusWidget.style.borderColor = "var(--accent-gold)";
            statusWidget.style.color = "var(--accent-gold)";
            statusWidget.style.background = "rgba(197,168,128,0.15)";
        } else {
            roleBadge.innerText = "Guest Access";
            actionLink.innerText = "Join IHSE";
            statusWidget.style.borderColor = "var(--accent-gold)";
            statusWidget.style.color = "var(--accent-gold)";
            statusWidget.style.background = "rgba(197,168,128,0.08)";
        }
    }
}

// --- ADMIN CONTROL SYSTEM ---
window.toggleAdminPanel = function() {
    if (currentState.isAdmin) {
        // Toggle floating panel visibility
        const panel = document.getElementById("admin-floating-panel");
        if (panel) {
            panel.style.display = (panel.style.display === "none") ? "block" : "none";
        }
    } else {
        // Open admin login modal
        const overlay = document.getElementById("admin-login-overlay");
        if (overlay) {
            overlay.classList.add("active");
            document.getElementById("admin-username-input").value = "";
            document.getElementById("admin-password-input").value = "";
        }
    }
};

window.closeAdminLoginModal = function() {
    const overlay = document.getElementById("admin-login-overlay");
    if (overlay) {
        overlay.classList.remove("active");
    }
};

window.submitAdminLogin = function() {
    const user = document.getElementById("admin-username-input").value.trim();
    const pass = document.getElementById("admin-password-input").value.trim();
    
    if (user === "admin" && pass === "admin") {
        currentState.isAdmin = true;
        sessionStorage.setItem("ihse_isAdmin", "true");
        closeAdminLoginModal();
        
        const panel = document.getElementById("admin-floating-panel");
        if (panel) {
            panel.style.display = "block";
        }
        
        // Style the toggle button as active/logged-in admin
        const toggleBtn = document.getElementById("admin-toggle-btn");
        if (toggleBtn) {
            toggleBtn.style.borderColor = "var(--accent-green)";
            toggleBtn.style.color = "var(--accent-green)";
            toggleBtn.style.background = "rgba(63,110,82,0.08)";
        }
        
        alert("Authenticated as Administrator. Access control panel unlocked.");
    } else {
        alert("Invalid admin credentials. Access Denied.");
    }
};

window.adminLogout = function() {
    currentState.isAdmin = false;
    currentState.adminBypassAll = false;
    sessionStorage.removeItem("ihse_isAdmin");
    
    const panel = document.getElementById("admin-floating-panel");
    if (panel) {
        panel.style.display = "none";
    }
    
    const toggleBtn = document.getElementById("admin-toggle-btn");
    if (toggleBtn) {
        toggleBtn.style.borderColor = "var(--accent-red)";
        toggleBtn.style.color = "var(--accent-red)";
        toggleBtn.style.background = "rgba(235,87,87,0.08)";
    }
    
    updateAccessGates();
    renderBookPage();
    alert("Logged out of Administrator Control Panel.");
};

window.minimizeAdminPanel = function() {
    const panel = document.getElementById("admin-floating-panel");
    if (panel) {
        panel.style.display = "none";
    }
};

window.adminSetRole = function(role) {
    currentState.userRole = role;
    if (role === "guest") {
        currentState.userName = "";
        saveUserSession("", "guest", "paypal", "", "");
    } else if (role === "pending") {
        if (!currentState.userName) currentState.userName = "Field Candidate";
        saveUserSession(currentState.userName, "pending", "paypal", "PENDING-TX-88888", "");
    } else if (role === "investigator") {
        if (!currentState.userName) currentState.userName = "Field Investigator";
        saveUserSession(currentState.userName, "investigator", "paypal", "ADMIN-TX-99999", "");
        
        // Sync name to exam input
        const examName = document.getElementById("student-name-input");
        if (examName) {
            examName.value = currentState.userName;
        }
    }
    
    updateAccessGates();
    renderBookPage();
};

window.adminToggleAllLocks = function() {
    currentState.adminBypassAll = !currentState.adminBypassAll;
    updateAccessGates();
    renderBookPage();
    alert(`Gated access bypass is now ${currentState.adminBypassAll ? "ENABLED (everything unlocked)" : "DISABLED (gates active)"}.`);
};

window.adminPreviewCertificate = function() {
    // 1. Enforce investigator role so we can bypass gates and see the exam
    if (currentState.userRole !== "investigator") {
        adminSetRole("investigator");
    }
    
    // 2. Ensure we have a valid userName (default to "Field Investigator" if empty)
    if (!currentState.userName) {
        currentState.userName = "Field Investigator";
    }
    
    // 3. Switch to the exam tab
    switchTab("exam");
    
    // 4. Update the exam panels to show the results (simulating a passing score)
    document.getElementById("exam-intro-panel").style.display = "none";
    document.getElementById("quiz-panel").style.display = "none";
    document.getElementById("exam-results-panel").style.display = "block";
    
    const scoreValText = document.getElementById("results-score-value");
    if (scoreValText) {
        scoreValText.innerText = "100%";
        scoreValText.style.color = "var(--accent-green)";
    }
    
    const resultsStatement = document.getElementById("results-statement");
    if (resultsStatement) {
        resultsStatement.innerHTML = `<strong>Congratulations, Researcher!</strong> You have demonstrated a comprehensive academic command of taxonomic cryptozoology and field methodology. The institute herewith awards you the certificate below.`;
    }
    
    // 5. Generate/Retrieve Persistent Certificate ID
    let certId = localStorage.getItem("ihse_certId");
    if (!certId) {
        const randNum = Math.floor(100000 + Math.random() * 900000);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randChar = chars.charAt(Math.floor(Math.random() * chars.length));
        certId = `IHSE-101-L1-${randNum}${randChar}`;
        localStorage.setItem("ihse_certId", certId);
    }
    currentState.certId = certId;

    // 6. Format Date (e.g. 8th day of June, 2026)
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    
    let suffix = "th";
    if (day < 11 || day > 13) {
        switch (day % 10) {
            case 1:  suffix = "st"; break;
            case 2:  suffix = "nd"; break;
            case 3:  suffix = "rd"; break;
        }
    }
    const ordinalDateString = `Awarded this ${day}${suffix} day of ${month}, ${year}.`;
    
    // 7. Update DOM certificate elements
    document.getElementById("cert-student-name").innerText = currentState.userName;
    document.getElementById("cert-issue-date").innerText = ordinalDateString;
    document.getElementById("cert-id-display").innerText = `Certificate ID: ${certId}`;
    
    const certWrapper = document.getElementById("certificate-wrapper");
    if (certWrapper) {
        certWrapper.style.display = "block";
    }
    const downloadBtn = document.getElementById("download-cert-btn");
    if (downloadBtn) {
        downloadBtn.style.display = "inline-block";
    }
    
    // 8. Draw certificate on canvas
    drawCanvasCertificate(currentState.userName, ordinalDateString, certId);
    
    // 9. Minimize/hide the admin floating panel so the user can see the certificate clearly
    minimizeAdminPanel();
};

