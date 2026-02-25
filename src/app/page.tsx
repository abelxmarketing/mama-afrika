import Image from "next/image";
import Link from "next/link";

// --- DATA ---
const signatureDishes = [
  {
    emoji: "🍛",
    name: "Jollof Rice",
    description:
      "Das Herzstück der westafrikanischen Küche – langsam in Tomaten, Paprika und Gewürzen geköchelter Reis. Rauchig, würzig, unvergleichlich.",
    tag: "Klassiker",
  },
  {
    emoji: "🥩",
    name: "Suya Spieße",
    description:
      "Zartes, mariniertes Rindfleisch auf Holzkohle gegrillt. Mit Yajichili und frischen Zwiebeln – ein nigerianisches Straßenfood-Erlebnis.",
    tag: "Vom Grill",
  },
  {
    emoji: "🥜",
    name: "Erdnuss-Eintopf",
    description:
      "Reichhaltiger Erdnuss-Eintopf mit Hühnchen und frischem Blattgemüse. Ein Gericht voller Wärme und Tradition aus Westafrika.",
    tag: "Wärmt die Seele",
  },
  {
    emoji: "🌿",
    name: "Egusi Suppe",
    description:
      "Melonenkernsupe mit Blattspinat, geräuchertem Fisch und würzigen Gewürzen. Vegane Variante auf Anfrage erhältlich.",
    tag: "Vegetarisch möglich",
  },
  {
    emoji: "🍌",
    name: "Gebratene Kochbananen",
    description:
      "Goldbraun gebratene Plantains – süßlich, karamellisiert und perfekt als Beilage oder Snack. Einfach und köstlich.",
    tag: "Vegan",
  },
  {
    emoji: "🐠",
    name: "Pescado al Piri Piri",
    description:
      "Ganzer Fisch in unserer hausgemachten Piri-Piri-Marinade. Knusprig gegrillt und mit frischer Zitronen-Chimichurri serviert.",
    tag: "Frisch vom Grill",
  },
];

const testimonials = [
  {
    name: "Sandra M.",
    rating: 5,
    text: "Wir haben Mama Afrika für eine Geburtstagsfeier gebucht – das beste Erlebnis! Das Essen war unglaublich würzig und authentisch. Der Jollof Rice ist einfach Pflicht!",
    location: "Hamburg-Eppendorf",
  },
  {
    name: "Tobias K.",
    rating: 5,
    text: "Endlich ein echtes afrikanisches Restaurant in Hamburg! Die Suya-Spieße waren so zart und aromatisch. Das Personal war herzlich und aufmerksam. Definitiv kein letztes Mal!",
    location: "Hamburg-Altona",
  },
  {
    name: "Layla A.",
    rating: 5,
    text: "Als Nigerianerin bin ich sehr kritisch – aber hier habe ich mich wie zu Hause gefühlt. Der Geschmack ist authentisch, die Atmosphäre warm und einladend. Absolute Empfehlung!",
    location: "Hamburg-Mitte",
  },
  {
    name: "Markus W.",
    rating: 5,
    text: "Wir haben die Erdnusssuppe ausprobiert und waren völlig begeistert. So etwas Reichhaltiges und Aromatisches habe ich in Hamburg noch nirgendwo gefunden. Top!",
    location: "Hamburg-Eimsbüttel",
  },
];

const faqs = [
  {
    q: "Wo befindet sich Mama Afrika in Hamburg?",
    a: "Mama Afrika ist zentral in Hamburg gelegen. Die genaue Adresse: Musterstraße 123, 20099 Hamburg. Gut erreichbar mit der U-Bahn (Haltestelle: XY) und verfügt über Parkplätze in der Nähe.",
  },
  {
    q: "Ist das Essen bei Mama Afrika scharf?",
    a: "Westafrikanische Küche kann würzig sein, aber wir passen den Schärfegrad gerne an Ihre Wünsche an. Viele unserer Gerichte sind mild und für das gesamte Spektrum der Geschmäcker geeignet. Fragen Sie einfach unser Team!",
  },
  {
    q: "Bietet Mama Afrika vegane und vegetarische Optionen?",
    a: "Ja! Ein Großteil unserer Speisekarte ist von Natur aus pflanzenbasiert – von gebratenen Plantains über Erdnuss-Eintopf bis hin zu unserer Egusi-Suppe (auf Anfrage vegan). Wir kennzeichnen alle Gerichte entsprechend.",
  },
  {
    q: "Kann ich bei Mama Afrika für eine Gruppe reservieren?",
    a: "Sehr gerne! Wir empfangen Gruppen bis zu 20 Personen und bieten auf Anfrage auch exklusive Catering-Events an. Für größere Gruppen kontaktieren Sie uns bitte direkt per Telefon oder E-Mail.",
  },
  {
    q: "Bietet ihr auch afrikanisches Catering in Hamburg an?",
    a: "Ja! Mama Afrika bietet professionelles afrikanisches Catering für Firmenevents, Hochzeiten, Geburtstage und mehr in Hamburg und Umgebung. Kontaktieren Sie uns für ein individuelles Angebot.",
  },
  {
    q: "Was ist Jollof Rice und warum ist es so beliebt?",
    a: "Jollof Rice ist das wohl berühmteste Gericht Westafrikas – ein würziger Tomatenreis mit einer charakteristischen Rauchnote. Er gilt als kulinarisches Symbol für Gemeinschaft und wird bei Festen und Familientreffen serviert. Bei uns nach traditionellem Originalrezept zubereitet.",
  },
];

// --- COMPONENTS ---
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < rating ? 'text-orange-500' : 'text-white/20'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Mama Afrika – Afrikanisches Restaurant Hamburg – authentische Küche aus Westafrika"
            fill
            className="object-cover opacity-60 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start mt-20">
          <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Afrikanisches Restaurant Hamburg
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-6">
            AUTHENTISCHE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-orange-400">AFRIKANISCHE</span><br />
            KÜCHE.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light">
            Eine kulinarische Reise durch das Herz Afrikas – mitten in Hamburg. Erleben Sie traditionelle Rezepte, herzliche Gastfreundschaft und unvergessliche Aromen.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/menu"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Speisekarte ansehen
            </Link>
            <Link
              href="/reservations"
              className="px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-[0_0_30px_rgba(255,106,0,0.4)]"
            >
              Tisch reservieren
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════
          ÜBER UNS
      ═══════════════════════════════════ */}
      <section className="py-32 px-6 max-w-7xl mx-auto" id="ueber-uns" aria-label="Über uns">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm block mb-4">
              Unsere Geschichte
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              Mama Afrikas <span className="text-[var(--color-accent)]">Herzstück</span> schlägt in Hamburg
            </h2>
            <div className="space-y-5 text-white/70 text-lg leading-relaxed">
              <p>
                Mama Afrika entstand aus einer tiefen Leidenschaft für das kulinarische Erbe Westafrikas. Was als Familienrezepte und gemeinsame Mahlzeiten begann, ist heute eines der authentischsten afrikanischen Restaurants in Hamburg.
              </p>
              <p>
                Jeder Bissen bei uns trägt die Geschichte eines Kontinents – von den belebten Märkten Nigerias über die Steppen Ghanas bis zu den Stränden Senegals. Wir kochen mit frischen, sorgfältig ausgewählten Zutaten und traditionellen Methoden, die über Generationen weitergegeben wurden.
              </p>
              <p>
                Hamburg ist unsere Heimat. Afrika ist unsere Seele. Willkommen an unserem Tisch.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { value: "2018", label: "Gegründet" },
                { value: "500+", label: "Gerichte serviert täglich" },
                { value: "4.9★", label: "Google Bewertung" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-[var(--color-accent)]">{stat.value}</div>
                  <div className="text-white/40 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden">
              <Image
                src="/hero.png"
                alt="Authentische westafrikanische Küche bei Mama Afrika in Hamburg"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--color-accent)] text-black rounded-2xl p-5 shadow-2xl">
              <div className="text-2xl font-black">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider">Authentisch</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SIGNATURE DISHES
      ═══════════════════════════════════ */}
      <section className="py-32 px-6 bg-zinc-950" id="gerichte" aria-label="Signature Dishes">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm block mb-4">
              Unsere Küche
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Westafrikanisches Essen in <span className="text-[var(--color-accent)]">Hamburg</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Von Klassikern wie Jollof Rice bis zu gegrillten Suya-Spießen – jedes Gericht erzählt eine Geschichte und ist mit Liebe zubereitet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureDishes.map((dish) => (
              <article
                key={dish.name}
                className="bg-black border border-white/5 rounded-[1.5rem] p-6 hover:border-[var(--color-accent)]/50 transition-all group"
              >
                <div className="text-5xl mb-4">{dish.emoji}</div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-bold">{dish.tag}</span>
                <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-[var(--color-accent)] transition-colors">{dish.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{dish.description}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all font-semibold"
            >
              Vollständige Speisekarte ansehen
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          ATMOSPHÄRE / ERLEBNIS
      ═══════════════════════════════════ */}
      <section className="py-32 px-6" aria-label="Atmosphäre und Erlebnis">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative rounded-2xl overflow-hidden">
                  <Image src="/hero.png" alt="Afrikanisches Restaurant Atmosphäre Hamburg" fill className="object-cover" />
                </div>
                <div className="aspect-square relative rounded-2xl overflow-hidden mt-8">
                  <Image src="/hero.png" alt="Westafrikanisches Essen Hamburg" fill className="object-cover" />
                </div>
                <div className="aspect-square relative rounded-2xl overflow-hidden -mt-8">
                  <Image src="/hero.png" alt="Afrikanische Dekoration Hamburg Restaurant" fill className="object-cover" />
                </div>
                <div className="aspect-square relative rounded-2xl overflow-hidden">
                  <Image src="/hero.png" alt="Mama Afrika Innenraum Hamburg" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm block mb-4">
                Das Erlebnis
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                Mehr als nur <span className="text-[var(--color-accent)]">Essen.</span><br />
                Ein Erlebnis.
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "🎵", title: "Lebendige Atmosphäre", text: "Afrobeats, Jazz und traditionelle Trommeln schaffen eine Stimmung, die Sie direkt nach Lagos, Accra oder Dakar entführt." },
                  { icon: "🌍", title: "Authentische Dekoration", text: "Handgemachte Kunstwerke, bunte Textilien und natürliche Materialien aus ganz Afrika schmücken jeden Winkel unseres Restaurants." },
                  { icon: "🤝", title: "Herzliche Gastfreundschaft", text: "Bei uns sind Gäste Familie. Unser Team nimmt sich Zeit für Sie – beim Empfehlen von Gerichten, beim Erzählen ihrer Geschichte." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-bold mb-1">{item.title}</div>
                      <div className="text-white/60 text-sm leading-relaxed">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════ */}
      <section className="py-32 px-6 bg-zinc-950" id="bewertungen" aria-label="Kundenbewertungen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm block mb-4">
              Was unsere Gäste sagen
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Echte Bewertungen.<br />
              <span className="text-[var(--color-accent)]">Echte Begeisterung.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((review) => (
              <article
                key={review.name}
                className="bg-black border border-white/5 rounded-[1.5rem] p-8"
                itemScope
                itemType="https://schema.org/Review"
              >
                <StarRating rating={review.rating} />
                <p className="text-white/80 leading-relaxed mb-6 italic" itemProp="reviewBody">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] font-black text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm" itemProp="author">{review.name}</div>
                    <div className="text-white/40 text-xs">{review.location}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-white/40">Google</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FAQ
      ═══════════════════════════════════ */}
      <section className="py-32 px-6" id="faq" aria-label="Häufige Fragen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm block mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              Häufige <span className="text-[var(--color-accent)]">Fragen</span>
            </h2>
          </div>
          <div
            className="space-y-4"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-zinc-900 border border-white/5 rounded-2xl p-6"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3 className="font-bold text-lg mb-3 flex items-start gap-3" itemProp="name">
                  <span className="text-[var(--color-accent)] flex-shrink-0 mt-1">?</span>
                  {faq.q}
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-white/60 leading-relaxed pl-6" itemProp="text">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════ */}
      <section className="py-32 px-6" aria-label="Jetzt reservieren">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-[var(--color-accent)] p-14 md:p-20 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-white" />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-black" />
            </div>
            <div className="relative z-10">
              <span className="text-black/60 font-semibold tracking-[0.2em] uppercase text-sm block mb-4">
                Hamburgs afrikanisches Restaurant
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-black leading-tight mb-6">
                Reservieren Sie Ihren<br />Tisch bei Mama Afrika
              </h2>
              <p className="text-black/70 text-lg mb-10 max-w-xl mx-auto">
                Erleben Sie die Aromen Afrikas mitten in Hamburg. Für Paare, Familien, Freundesgruppen und Firmenfeiern.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/reservations"
                  className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-zinc-900 transition-all text-lg shadow-xl"
                >
                  Jetzt reservieren →
                </Link>
                <a
                  href="tel:+494012345678"
                  className="px-10 py-5 bg-white/20 text-black font-bold rounded-2xl hover:bg-white/30 transition-all text-lg backdrop-blur-sm"
                >
                  📞 +49 40 123 456789
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
