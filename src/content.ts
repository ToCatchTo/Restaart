// Všechny statické texty a cesty k assetům aplikace
import type { AuthAside, AuthField, LegalDocument, NavSectionData, ReservationType, ReservationTypeSlug, SlotState } from './types'

// Rezervace vedou na stránku přihlášení
const LOGIN_PATH = '/prihlaseni'
// Dovětek u telefonního čísla
const PHONE_NOTE = '(na tel jsme v otevírací době)'

export const content = {
  brand: {
    name: 'Restaart',
    logoAlt: 'Restaart – sportovní centrum',
    logo: '/static-icons/brand_logo.svg',
  },

  header: {
    openMenu: 'Otevřít menu',
    closeMenu: 'Zavřít menu',
    menuLabel: 'Hlavní menu',
    menuIcon: '/static-icons/header_menu.svg',
    // Desktop: tlačítko v hlavičce – přihlášení k rezervacím
    reservation: { label: 'rezervovat', icon: '/static-icons/button_arrow.svg', href: LOGIN_PATH },
    // Desktop: varianta tlačítka na stránkách účtu
    backToWeb: { label: 'zpět na web', icon: '/static-icons/button_arrow.svg', href: '/' },
  },

  contact: {
    email: 'info@restaart.cz',
    phone: '+420 608 197 964',
    phoneHref: 'tel:+420608197964',
    phoneNote: PHONE_NOTE,
    reservationHref: LOGIN_PATH,
    addressTitle: 'Adresa',
    addressLines: ['Přerovská 503', '530 06 Pardubice - Svítkov'],
    mapUrl: 'https://maps.google.com/?q=P%C5%99erovsk%C3%A1+503,+Pardubice',
    parkingTitle: 'Parkování',
    parkingLines: ['Podélné parkování před', 'a v okolí sportovního centra'],
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/', icon: '/static-icons/social_instagram.svg' },
      { label: 'Facebook', href: 'https://www.facebook.com/', icon: '/static-icons/social_facebook.svg' },
    ],
  },

  quickNav: {
    reservation: { label: 'rezervace', icon: '/static-icons/quick_nav_reservation.svg' },
    events: { label: 'akce', icon: '/static-icons/quick_nav_events.svg', href: '/akce' },
    activities: {
      label: 'aktivity',
      icon: '/static-icons/quick_nav_activities.svg',
      // Kategorie podstránek v rozbalovacím panelu
      categories: ['sport', 'regenerace'],
    },
    reception: { label: 'recepce', icon: '/static-icons/reception_call.svg' },
  },

  hero: {
    lines: ['sportovní centrum', 'pro celou rodinu'],
    image: '/images/home_hero.webp',
    // Desktop: nápis „akce“ v pravém dolním rohu hera
    eventsLabel: { icon: '/static-icons/hero_events_label.svg', alt: 'akce', href: '/akce' },
  },

  // Text a odkaz upoutávky přichází z API (výjimečná událost)
  eventPill: {
    arrowIcon: '/static-icons/event_pill_arrow.svg',
  },

  googleRating: {
    logo: '/static-icons/google_rating_logo.svg',
    logoAlt: 'Google',
    starIcon: '/static-icons/google_rating_star.svg',
    maxStars: 5,
    title: 'Recenze Google',
    buttonLabel: 'Zobrazit všechny recenze',
    // Recenze provozovny na Google
    reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJk98cpq3MDUcRiaNaKGW8I78',
    // Náhradní hodnoty do načtení dat z Places API
    fallbackRating: 4.7,
    fallbackCount: 19517,
  },

  footer: {
    image: '/images/footer_bg.webp',
    operatorTitle: 'Provozovatel a fakturace',
    operatorLines: [
      'RESTAART SPORTOVNÍ CENTRUM s.r.o.',
      'Pražská 195, 530 06 Pardubice.',
      'IČ: 08609306, DIČ: CZ08609306',
    ],
    premisesTitle: 'Provozovna sportovního centra',
    premisesLines: ['Přerovská 503, 530 06 Pardubice'],
    terms: { label: 'Obchodní podmínky', href: '/obchodni-podminky' },
    privacy: { label: 'Zásady ochrany osobních údajů', href: '/ochrana-osobnich-udaju' },
    credit: { label: 'Tvoříme weby s radostí', href: 'https://matfix.cz', logo: '/static-icons/footer_credit_logo.svg', logoAlt: 'Matfix', logoIcon: '/static-icons/footer_credit_icon.svg', logoIconAlt: 'Matfix – ikona' },
  },

  menu: {
    closeIcon: '/static-icons/menu_close.svg',
    closeIconDesktop: '/static-icons/menu_close_desktop.svg',
    phoneIcon: '/static-icons/reception_call.svg',
    callReception: 'Volat na recepci',
    callNote: PHONE_NOTE,
  },

  // Pevné sekce navigace; kategorie s podstránkami před ně doplní API
  navSections: [
    { label: 'AKCE', href: '/akce' },
    { label: 'REZERVACE', href: LOGIN_PATH },
    { label: 'KONTAKT', href: '/kontakt' },
  ] satisfies NavSectionData[],

  pages: {
    events: { title: 'akce', image: '/images/events_bg.webp', empty: 'Momentálně nejsou naplánované žádné akce.' },
    eventDetail: {
      back: 'zpět na výpis',
      backIcon: '/static-icons/back_link_arrow.svg',
      image: '/images/events_bg.webp',
      // Náhradní popisky přílohy a odkazu bez vlastního názvu
      attachmentLabel: 'Příloha ke stažení',
      linkLabel: 'Více informací',
    },
    activity: {
      // Popisek rozbalovacího tlačítka, když ho administrace nevyplní
      ctaButton: 'Více informací',
      openIcon: '/static-icons/class_list_open.svg',
      closeIcon: '/static-icons/class_list_close.svg',
      prevIcon: '/static-icons/gallery_prev.svg',
      nextIcon: '/static-icons/gallery_next.svg',
      prevLabel: 'Předchozí fotka',
      nextLabel: 'Další fotka',
    },
    contact: { image: '/images/contact_bg.webp' },
    // Chyby formulářů přihlášení a registrace (jen kontrola na straně prohlížeče)
    authErrors: {
      required: 'Vyplňte toto pole.',
      email: 'Zadejte platný e-mail.',
      phone: 'Zadejte platné telefonní číslo.',
      minLength: (length: number) => `Zadejte alespoň ${length} znaků.`,
      match: 'Hesla se neshodují.',
      consent: 'Pro registraci je potřeba souhlas s podmínkami.',
    },
    // Statická stránka přihlášení – formulář a druhá část s odkazem na rozpis
    login: {
      title: 'online rezervace',
      emailLabel: 'Email',
      passwordLabel: 'Heslo',
      submit: 'přihlásit',
      submitIcon: '/static-icons/button_arrow.svg',
      noAccount: 'Nemáte účet?',
      register: 'Registrovat',
      registerHref: '/registrace',
      image: '/images/login_bg.webp',
      schedule: {
        lines: ['na rozpis cvičení', 'a volné termíny sauny a', 'sportovišť se můžete', 'kouknout i bez přihlášení'],
        label: 'volné termíny',
        icon: '/static-icons/button_arrow.svg',
        href: '/vypis-rezervaci',
      } satisfies AuthAside,
    },
    // Statická stránka registrace
    register: {
      title: 'registrace',
      fields: [
        { type: 'text', name: 'firstName', label: 'Jméno', autoComplete: 'given-name' },
        { type: 'text', name: 'lastName', label: 'Příjmení', autoComplete: 'family-name' },
        { type: 'email', name: 'email', label: 'Email', autoComplete: 'email' },
        { type: 'tel', name: 'phone', label: 'Telefon', autoComplete: 'tel' },
        { type: 'password', name: 'password', label: 'Heslo', autoComplete: 'new-password', minLength: 8 },
        { type: 'password', name: 'passwordConfirm', label: 'Heslo znovu', autoComplete: 'new-password', matches: 'password' },
      ] satisfies AuthField[],
      // Souhlas s podmínkami – text rozdělený kolem dvou odkazů
      consent: {
        before: 'Souhlasím s ',
        termsLabel: 'obchodními podmínkami',
        termsHref: '/obchodni-podminky',
        between: ' a zpracováním ',
        privacyLabel: 'osobních údajů',
        privacyHref: '/ochrana-osobnich-udaju',
        after: '.',
        ariaLabel: 'Souhlas s obchodními podmínkami a zpracováním osobních údajů',
      },
      submit: 'registrovat',
      submitIcon: '/static-icons/button_arrow.svg',
      haveAccount: 'Máte účet?',
      login: 'Přihlásit',
      loginHref: '/prihlaseni',
      image: '/images/home_hero.webp',
    },
    // Výpis rezervací – týdenní rozvrh podle zdroje
    reservations: {
      title: 'výpis rezervací',
      image: '/images/home_hero.webp',
      tabsLabel: 'Zdroj rezervací',
      dayNames: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
      prevWeek: 'Předchozí týden',
      nextWeek: 'Další týden',
      prevIcon: '/static-icons/gallery_prev.svg',
      nextIcon: '/static-icons/gallery_next.svg',
      emptySlotIcon: '/static-icons/schedule_empty_slot.svg',
      emptySlot: 'Žádný termín',
      // Záložky – API typy nevypisuje, seznam je pevný
      types: [
        { slug: 'skupinovky', name: 'Skupinové lekce' },
        { slug: 'sauna', name: 'Sauna' },
        { slug: 'squash', name: 'Squash' },
        { slug: 'badminton', name: 'Badminton' },
        { slug: 'vacushape', name: 'Vacushape' },
      ] satisfies ReservationType[],
      // Texty stavů termínu – pilulky místností a legenda
      states: { free: 'volno', full: 'obsazeno', cleaning: 'úklid', past: 'proběhlo' } satisfies Record<SlotState, string>,
      legendLabel: 'Legenda',
      priceUnit: 'Kč',
      empty: 'V tomto týdnu nejsou v rozvrhu žádné termíny.',
    },
    // Právní stránky – nadpis obsahu
    legalContents: 'Obsah',
    notFound: { title: 'Stránka se připravuje', back: 'Zpět na úvod' },
    loading: 'Načítání…',
    loadError: 'Data se nepodařilo načíst.',
    notFoundItem: 'Položka nebyla nalezena.',
  },

  // Právní stránky – znění podle dodaných dokumentů
  legal: {
    terms: {
      title: 'Podmínky rezervací sportovního centra RESTAART',
      subtitle: '**Provozovatel:** RESTAART SPORTOVNÍ CENTRUM s.r.o.',
      sections: [
        {
          heading: '1. Provozovatel a vymezení pojmů',
          blocks: [
            {
              type: 'paragraph',
              text: 'Provozovatelem sportovního centra a poskytovatelem rezervovaných služeb je společnost RESTAART SPORTOVNÍ CENTRUM s.r.o., IČO 08609306, se sídlem Pražská 195, Popkovice, 530 06 Pardubice (dále jen „provozovatel“). Rezervace probíhají prostřednictvím rezervačního systému dostupného na adrese [rezervace.restaart.cz](https://rezervace.restaart.cz) (dále jen „rezervační systém“). Sportovní centrum se nachází na adrese provozovny Přerovská 503, 530 05 Pardubice. Uživatelem je osoba, která si v rezervačním systému vytvořila uživatelský účet nebo provedla rezervaci.',
            },
          ],
        },
        {
          heading: '2. Popis služby',
          blocks: [
            {
              type: 'paragraph',
              text: 'Rezervační systém umožňuje online rezervaci sportovišť a služeb centra (např. squash, badminton, stolní tenis, posilovna, privátní sauna, skupinové lekce a další dle aktuální nabídky) na konkrétní termín. Samotná rezervace je bezplatná; cena rezervované služby se hradí při jejím čerpání na místě podle aktuálního ceníku dostupného na webu a recepci sportovního centra. Platba online prostřednictvím rezervačního systému neprobíhá. Při využívání služeb centra je uživatel povinen dodržovat provozní řád centra dostupný na webu a recepci sportovního centra.',
            },
          ],
        },
        {
          heading: '3. Registrace a uživatelský účet',
          blocks: [
            {
              type: 'paragraph',
              text: 'Pro vytvoření rezervace je potřeba registrace, při které uživatel uvádí jméno, příjmení, e-mail a telefonní číslo. Uživatel se zavazuje uvádět údaje pravdivě a chránit své přístupové údaje. Uživatel může svůj účet kdykoli zrušit, a to e-mailem na [info@restaart.cz](mailto:info@restaart.cz); tím nejsou dotčeny již vytvořené rezervace ani povinnost uhradit vzniklé storno poplatky.',
            },
          ],
        },
        {
          heading: '4. Vytvoření rezervace',
          blocks: [
            {
              type: 'paragraph',
              text: 'Rezervace vzniká výběrem služby a termínu v rezervačním systému a jejím potvrzením ze strany systému. Potvrzením se rezervace stává závaznou pro obě strany. Provozovatel si vyhrazuje právo rezervaci odmítnout nebo omezit v případech zneužívání systému.',
            },
          ],
        },
        {
          heading: '5. Cena a platba',
          blocks: [
            {
              type: 'paragraph',
              text: 'Vytvoření a vedení rezervace je bezplatné. Cena rezervované služby se řídí ceníkem platným v den čerpání a hradí se na místě.',
            },
          ],
        },
        {
          heading: '6. Zrušení a změna rezervace',
          blocks: [
            {
              type: 'paragraph',
              text: 'Uživatel může rezervaci bezplatně zrušit v rezervačním systému nejpozději v den rezervace do 13:00 pro odpolední rezervace a do vybraného času rezervace zahájení termínu pro dopolední rezervace. Po této době lze rezervaci zrušit už jen telefonicky na [+420 608 197 964](tel:+420608197964) (v otevírací době centra) nebo e-mailem na [info@restaart.cz](mailto:info@restaart.cz); v takovém případě je účtován storno poplatek ve výši 50 % ceny rezervované služby. Při nezrušení rezervace a nedostavení se je účtován storno poplatek ve výši 100 % ceny rezervované služby. Neuhradí-li uživatel storno poplatek, může mu provozovatel trvale odebrat možnost vytvářet rezervace. Provozovatel může rezervaci zrušit z provozních důvodů (např. porucha, mimořádná událost); v takovém případě uživatele bez zbytečného odkladu vyrozumí a nabídne náhradní termín.',
            },
          ],
        },
        {
          heading: '7. Ochrana osobních údajů',
          blocks: [
            {
              type: 'paragraph',
              text: 'Informace o zpracování osobních údajů uživatelů jsou uvedeny v Zásadách ochrany osobních údajů dostupných na [https://restaart.cz/ochrana-osobnich-udaju](/ochrana-osobnich-udaju).',
            },
          ],
        },
        {
          heading: '8. Práva z vadného plnění',
          blocks: [
            {
              type: 'paragraph',
              text: 'Práva uživatele z vadného plnění se řídí obecně závaznými právními předpisy, zejména občanským zákoníkem. Výhrady k poskytnuté službě může uživatel uplatnit na místě nebo e-mailem na [info@restaart.cz](mailto:info@restaart.cz).',
            },
          ],
        },
        {
          heading: '9. Mimosoudní řešení sporů',
          blocks: [
            {
              type: 'paragraph',
              text: 'K mimosoudnímu řešení spotřebitelských sporů je příslušná zejména Česká obchodní inspekce ([www.coi.cz](https://www.coi.cz)), případně jiný subjekt ze seznamu vedeného Ministerstvem průmyslu a obchodu.',
            },
          ],
        },
        {
          heading: '10. Poučení o odstoupení od smlouvy',
          blocks: [
            {
              type: 'paragraph',
              text: 'Uživatel bere na vědomí, že od smlouvy uzavřené distančním způsobem nelze odstoupit ve 14denní lhůtě, jde-li o využití volného času, pokud má být plněno k určitému datu nebo v určitém období (§ 1837 písm. j) zákona č. 89/2012 Sb., občanský zákoník, aktuální znění: [e-sbirka.gov.cz/sb/2012/89](https://e-sbirka.gov.cz/sb/2012/89)). Tím nejsou dotčena pravidla zrušení rezervace podle článku 6.',
            },
          ],
        },
        {
          heading: '11. Závěrečná ustanovení',
          blocks: [
            {
              type: 'paragraph',
              text: 'Provozovatel může tyto podmínky přiměřeným způsobem měnit; nové znění zveřejní v rezervačním systému a na webu s přiměřeným předstihem před nabytím účinnosti. Uživatel, který se změnou nesouhlasí, může svůj účet zrušit. Rezervace se řídí zněním účinným v okamžiku jejího vytvoření. Tyto podmínky nabývají účinnosti dnem 1. 9. 2026.',
            },
          ],
        },
      ],
    } satisfies LegalDocument,
    privacy: {
      title: 'Zásady ochrany osobních údajů',
      subtitle: '**RESTAART SPORTOVNÍ CENTRUM s.r.o.**',
      contents: true,
      footer: 'Tyto zásady ochrany osobních údajů jsou účinné od **21. září 2026**.',
      sections: [
        {
          id: 'uvodni-ustanoveni',
          heading: 'Úvodní ustanovení',
          blocks: [
            {
              type: 'paragraph',
              text: 'Tyto Zásady ochrany osobních údajů (dále jen „Zásady“) popisují, jakým způsobem společnost **RESTAART SPORTOVNÍ CENTRUM s.r.o.** jako správce osobních údajů shromažďuje, uchovává a zpracovává osobní údaje návštěvníků a zákazníků webových stránek **https://www.restaart.cz** a uživatelů služeb sportovního centra.',
            },
            { type: 'subheading', text: 'Identifikace správce osobních údajů' },
            {
              type: 'table',
              head: ['Údaj', 'Hodnota'],
              rows: [
                ['Obchodní firma', 'RESTAART SPORTOVNÍ CENTRUM s.r.o.'],
                ['IČO', '08609306'],
                ['DIČ', 'CZ08609306'],
                ['Sídlo', 'Pražská 195, Popkovice, 530 06 Pardubice'],
                ['E-mail', 'info@restaart.cz'],
                ['Web', 'https://www.restaart.cz'],
              ],
            },
            {
              type: 'paragraph',
              text: 'RESTAART SPORTOVNÍ CENTRUM s.r.o. (dále jen „správce“ nebo „my“) provozuje multifunkční sportovní centrum nabízející pronájem kurtů pro squash, badminton a stolní tenis, posilovnu, skupinové lekce, vacushape a privátní saunu. Prostřednictvím webu je možné provádět online rezervace sportovišť a služeb na konkrétní termín.',
            },
            {
              type: 'paragraph',
              text: 'Tyto Zásady jsou vydány v souladu s nařízením Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen „GDPR“) a zákonem č. 110/2019 Sb. o zpracování osobních údajů.',
            },
          ],
        },
        {
          id: 'jake-udaje-zpracovavame',
          heading: 'Jaké osobní údaje zpracováváme',
          blocks: [
            {
              type: 'paragraph',
              text: 'V závislosti na způsobu, jakým s námi komunikujete nebo využíváte naše služby, zpracováváme následující kategorie osobních údajů:',
            },
            { type: 'subheading', text: 'Identifikační a kontaktní údaje' },
            {
              type: 'list',
              items: [
                { lead: 'Jméno a příjmení', text: '— zadáváte při registraci uživatelského účtu, vytvoření rezervace nebo odeslání kontaktního formuláře' },
                { lead: 'E-mailová adresa', text: '— zadáváte při registraci, rezervaci, přihlášení k newsletteru nebo kontaktním formuláři' },
                { lead: 'Telefonní číslo', text: '— zadáváte při registraci uživatelského účtu nebo vytvoření rezervace' },
              ],
            },
            { type: 'subheading', text: 'Přihlašovací údaje' },
            {
              type: 'list',
              items: [{ lead: 'Přihlašovací jméno (e-mail) a heslo', text: '(v zahashované podobě) — v rámci uživatelského účtu na webu' }],
            },
            { type: 'subheading', text: 'Údaje o rezervacích a využití služeb' },
            {
              type: 'list',
              items: [
                { lead: 'Záznamy o provedených a plánovaných rezervacích', text: '— datum, čas, druh sportoviště nebo služby (squash, badminton, stolní tenis, posilovna, sauna)' },
                { lead: 'Historie využívání služeb', text: '— přehled rezervací navázaných na uživatelský účet' },
              ],
            },
            { type: 'subheading', text: 'Technické údaje' },
            {
              type: 'list',
              items: [{ lead: 'IP adresa', text: '— zaznamenávána automaticky při každé návštěvě webu serverem' }],
            },
          ],
        },
        {
          id: 'ucely-zpracovani',
          heading: 'Účely zpracování osobních údajů',
          blocks: [
            { type: 'subheading', text: '3.1 Správa uživatelského účtu a online rezervace' },
            { type: 'paragraph', lead: 'Zpracovávané údaje:', text: 'jméno a příjmení, e-mailová adresa, telefonní číslo, přihlašovací údaje, záznamy o rezervacích' },
            {
              type: 'paragraph',
              lead: 'Účel:',
              text: 'Vytvoření a správa uživatelského účtu, umožnění online rezervace sportovišť a služeb (squash, badminton, stolní tenis, posilovna, privátní sauna, vacushape a skupinové lekce) na konkrétní termín, zasílání potvrzení rezervace, upomínek a informací o změnách termínu.',
            },
            {
              type: 'paragraph',
              lead: 'Právní základ:',
              text: 'Plnění smlouvy podle čl. 6 odst. 1 písm. b) GDPR — zpracování je nezbytné pro plnění smluvního vztahu (smlouvy o poskytnutí sportovní služby), jehož jste smluvní stranou, resp. pro provedení opatření přijatých před uzavřením takové smlouvy na vaši žádost.',
            },
            { type: 'subheading', text: '3.2 Komunikace prostřednictvím kontaktního formuláře' },
            { type: 'paragraph', lead: 'Zpracovávané údaje:', text: 'jméno a příjmení, e-mailová adresa, telefonní číslo (pokud ho uvedete), obsah zprávy' },
            { type: 'paragraph', lead: 'Účel:', text: 'Zodpovězení vašich dotazů, podnětů nebo žádostí zaslaných prostřednictvím kontaktního formuláře na webu.' },
            {
              type: 'paragraph',
              lead: 'Právní základ:',
              text: 'Oprávněný zájem správce podle čl. 6 odst. 1 písm. f) GDPR — náš oprávněný zájem spočívá v řádné komunikaci se zákazníky a zodpovídání jejich dotazů. Zpracování je přiměřené a nezasahuje nepřiměřeně do vašich práv a svobod.',
            },
            { type: 'subheading', text: '3.3 Zasílání newsletteru a obchodních sdělení' },
            { type: 'paragraph', lead: 'Zpracovávané údaje:', text: 'e-mailová adresa, jméno (pro personalizaci oslovení)' },
            { type: 'paragraph', lead: 'Účel:', text: 'Zasílání newsletteru s informacemi o novinkách, akcích, slevách a nabídkách RESTAART SPORTOVNÍ CENTRUM s.r.o. elektronickou poštou.' },
            {
              type: 'paragraph',
              lead: 'Právní základ:',
              text: 'Souhlas subjektu údajů podle čl. 6 odst. 1 písm. a) GDPR — zasíláme newsletter výhradně těm, kteří k jeho odběru udělili výslovný souhlas. Souhlas je dobrovolný a lze jej kdykoli odvolat (viz sekce [Práva subjektu údajů](#prava-subjektu-udaju)).',
            },
            {
              type: 'paragraph',
              text: 'Stávajícím zákazníkům, kteří si u nás zarezervovali sportovní službu, můžeme zasílat obchodní sdělení týkající se obdobných služeb také na základě § 7 odst. 3 zákona č. 480/2004 Sb. o některých službách informační společnosti, a to za předpokladu, že jste toto využití svého kontaktu neodmítli. V každém obchodním sdělení máte možnost se z dalšího odběru jednoduše odhlásit.',
            },
            { type: 'subheading', text: '3.4 Provoz a bezpečnost webu' },
            { type: 'paragraph', lead: 'Zpracovávané údaje:', text: 'IP adresa, technické logy serveru' },
            { type: 'paragraph', lead: 'Účel:', text: 'Zajištění technického provozu, dostupnosti a bezpečnosti webu, odhalování a prevence neoprávněných přístupů, útoků nebo technických závad.' },
            {
              type: 'paragraph',
              lead: 'Právní základ:',
              text: 'Oprávněný zájem správce podle čl. 6 odst. 1 písm. f) GDPR — náš oprávněný zájem spočívá v zajištění bezpečného a funkčního provozu webu a ochraně dat uživatelů.',
            },
          ],
        },
        {
          id: 'pravni-zaklady',
          heading: 'Právní základy zpracování',
          blocks: [
            { type: 'paragraph', text: 'Veškeré zpracování osobních údajů provádíme výhradně na základě některého z těchto právních základů dle čl. 6 GDPR:' },
            {
              type: 'list',
              items: [
                {
                  lead: 'Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR):',
                  text: 'Zpracování je nezbytné pro splnění smluvního závazku vůči vám — tedy pro správu vašeho účtu a vyřízení online rezervace sportovní služby. Bez těchto údajů bychom rezervaci nemohli provést.',
                },
                {
                  lead: 'Oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR):',
                  text: 'Zpracování je nezbytné pro účely našich oprávněných zájmů, zejména pro komunikaci se zákazníky a zajištění bezpečného provozu webu — pokud tyto zájmy nepřevažují vaše základní práva a svobody.',
                },
                {
                  lead: 'Souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR):',
                  text: 'Zpracování probíhá na základě vašeho svobodného, konkrétního, informovaného a jednoznačného souhlasu, který jste udělili pro zasílání newsletteru. Souhlas lze kdykoli odvolat, aniž by to mělo vliv na zákonnost zpracování provedeného před jeho odvoláním.',
                },
              ],
            },
          ],
        },
        {
          id: 'doba-uchovavani',
          heading: 'Doba uchovávání údajů',
          blocks: [
            { type: 'paragraph', text: 'Osobní údaje uchováváme pouze po dobu nezbytně nutnou k naplnění příslušného účelu, nebo po dobu stanovenou příslušnými právními předpisy.' },
            {
              type: 'table',
              head: ['Kategorie údajů / Účel', 'Doba uchovávání'],
              rows: [
                ['Uživatelský účet a rezervační záznamy', 'Po dobu trvání uživatelského účtu; po zrušení účtu na žádost nebo z důvodu neaktivity (déle než 3 roky bez přihlášení) budou údaje vymazány do 30 dnů.'],
                ['Záznamy o poskytnutých službách (pro účely případných reklamací a obchodních sporů)', '3 roky od uskutečnění rezervace/služby'],
                ['Kontaktní formulář', '1 rok od vyřízení dotazu, případně po dobu nezbytnou pro řešení sporu, pokud z komunikace vyplynul smluvní vztah'],
                ['Newsletter — souhlas a e-mailová adresa', 'Do odvolání souhlasu; po odvolání bez zbytečného odkladu, nejpozději do 30 dnů'],
                ['IP adresy (technické logy)', 'Zpravidla 90 dní, pokud bezpečnostní incident nevyžaduje delší uchování'],
                ['Daňové a účetní doklady (pokud jsou součástí dokladu o platbě nebo záznamu o plnění)', '10 let od konce příslušného zdaňovacího období v souladu s příslušnými daňovými předpisy'],
              ],
            },
            { type: 'paragraph', text: 'Po uplynutí příslušné doby jsou osobní údaje bezpečně a nevratně vymazány nebo anonymizovány.' },
          ],
        },
        {
          id: 'prijemci-udaju',
          heading: 'Příjemci osobních údajů',
          blocks: [
            {
              type: 'paragraph',
              text: 'Vaše osobní údaje neprodáváme ani neposkytujeme třetím stranám pro jejich vlastní obchodní účely. Údaje však mohou být v nezbytném rozsahu sdíleny s následujícími kategoriemi příjemců:',
            },
            {
              type: 'list',
              items: [
                { lead: 'Poskytovatelé IT služeb a hostingu', text: '— společnosti zajišťující technický provoz webu, správu serverů a rezervačního systému, které osobní údaje zpracovávají výhradně podle pokynů správce' },
                { lead: 'Poskytovatelé e-mailových služeb', text: '— pro zasílání potvrzení rezervací, provozních notifikací a newsletteru' },
                { lead: 'Orgány veřejné moci', text: '— soudy, orgány činné v trestním řízení nebo jiné správní orgány, pokud nám to ukládá právní předpis nebo je to nezbytné pro uplatnění nebo obranu právních nároků' },
              ],
            },
            { type: 'paragraph', text: 'Všechny třetí strany, které se podílejí na zpracování vašich osobních údajů, jsou vázány povinností mlčenlivosti a jsou povinny nakládat s údaji v souladu s GDPR.' },
          ],
        },
        {
          id: 'predavani-do-tretich-zemi',
          heading: 'Předávání údajů do třetích zemí',
          blocks: [
            {
              type: 'paragraph',
              text: 'RESTAART SPORTOVNÍ CENTRUM s.r.o. **nepředává vaše osobní údaje do třetích zemí** (tj. zemí mimo Evropský hospodářský prostor). Veškeré zpracování probíhá v rámci EHP, kde platí jednotná úroveň ochrany osobních údajů zaručená GDPR.',
            },
            {
              type: 'paragraph',
              text: 'Pokud by se tato situace v budoucnu změnila, budeme vás o tom informovat prostřednictvím aktualizace těchto Zásad a zajistíme, aby předávání probíhalo v souladu s čl. 44 a násl. GDPR (například na základě rozhodnutí Evropské komise o odpovídající ochraně nebo standardních smluvních doložek).',
            },
          ],
        },
        {
          id: 'cookies',
          heading: 'Cookies a sledovací technologie',
          blocks: [
            { type: 'paragraph', text: 'Web https://www.restaart.cz používá soubory cookies a podobné technologie pro zajištění základní funkčnosti webu a rezervačního systému.' },
            { type: 'subheading', text: 'Nezbytné cookies' },
            { type: 'paragraph', text: 'Tyto cookies jsou nezbytné pro fungování webu a nelze je vypnout. Zahrnují zejména:' },
            {
              type: 'list',
              items: [
                { lead: 'Cookies pro přihlášení a session', text: '— udržují vaše přihlášení do uživatelského účtu po dobu návštěvy' },
                { lead: 'Cookies rezervačního systému', text: '— umožňují dokončení procesu rezervace' },
                { lead: 'Bezpečnostní cookies', text: '— chrání formuláře před automatizovanými útoky (CSRF ochrana)' },
              ],
            },
            { type: 'subheading', text: 'Vaše možnosti' },
            {
              type: 'paragraph',
              text: 'Nastavení cookies můžete spravovat prostřednictvím nastavení vašeho webového prohlížeče. Upozorňujeme, že zablokování nezbytných cookies může narušit funkčnost webu, přihlašování do uživatelského účtu a proces rezervace.',
            },
            { type: 'paragraph', text: 'Web v současné době nevyužívá analytické, marketingové ani sledovací cookies třetích stran (Google Analytics, Facebook Pixel ani obdobné nástroje).' },
          ],
        },
        {
          id: 'prava-subjektu-udaju',
          heading: 'Práva subjektu údajů',
          blocks: [
            {
              type: 'paragraph',
              text: 'Jako subjekt údajů máte vůči nám následující práva zaručená GDPR. Pro jejich uplatnění nás kontaktujte na e-mailové adrese **[info@restaart.cz](mailto:info@restaart.cz)**.',
            },
            { type: 'subheading', text: 'Právo na přístup (čl. 15 GDPR)' },
            {
              type: 'paragraph',
              text: 'Máte právo získat od nás potvrzení, zda zpracováváme vaše osobní údaje, a pokud ano, máte právo k těmto údajům získat přístup a obdržet jejich kopii spolu s informacemi o účelech, kategoriích, příjemcích a době uchování.',
            },
            { type: 'subheading', text: 'Právo na opravu (čl. 16 GDPR)' },
            { type: 'paragraph', text: 'Máte právo požadovat bez zbytečného odkladu opravu nepřesných osobních údajů, které se vás týkají, nebo doplnění neúplných osobních údajů.' },
            { type: 'subheading', text: 'Právo na výmaz — „právo být zapomenut“ (čl. 17 GDPR)' },
            {
              type: 'paragraph',
              text: 'Máte právo požadovat výmaz vašich osobních údajů, pokud například pominul účel, pro který byly shromážděny, odvolali jste souhlas a neexistuje jiný právní základ pro zpracování, nebo jste vznesli námitku a neexistují převažující oprávněné důvody pro zpracování. Právo na výmaz se neuplatní, pokud je zpracování nezbytné pro splnění zákonné povinnosti nebo pro určení, výkon nebo obhajobu právních nároků.',
            },
            { type: 'subheading', text: 'Právo na omezení zpracování (čl. 18 GDPR)' },
            {
              type: 'paragraph',
              text: 'Máte právo požadovat, abychom omezili zpracování vašich údajů — například pokud popíráte přesnost údajů (po dobu ověření), pokud jste vznesli námitku (po dobu posouzení), nebo pokud je zpracování protiprávní a namísto výmazu žádáte omezení.',
            },
            { type: 'subheading', text: 'Právo na přenositelnost údajů (čl. 20 GDPR)' },
            {
              type: 'paragraph',
              text: 'Máte právo obdržet osobní údaje, které jste nám poskytli, ve strukturovaném, běžně používaném a strojově čitelném formátu, a právo předat tyto údaje jinému správci, pokud je zpracování založeno na souhlasu nebo smlouvě a probíhá automatizovaně.',
            },
            { type: 'subheading', text: 'Právo vznést námitku (čl. 21 GDPR)' },
            {
              type: 'paragraph',
              text: 'Máte právo kdykoli vznést námitku proti zpracování vašich osobních údajů prováděnému na základě oprávněného zájmu správce (čl. 6 odst. 1 písm. f) GDPR). V takovém případě přestaneme údaje zpracovávat, pokud neprokážeme závažné oprávněné důvody pro zpracování, které převažují nad vašimi zájmy, právy a svobodami, nebo pokud to nebude nezbytné pro určení, výkon nebo obhajobu právních nároků.',
            },
            {
              type: 'paragraph',
              lead: 'Námitka proti přímému marketingu:',
              text: 'Pokud jsou vaše osobní údaje zpracovávány pro účely přímého marketingu (zasílání obchodních sdělení), máte právo kdykoli vznést námitku bez udání důvodů. V takovém případě vaše údaje pro tyto účely dále nezpracováváme.',
            },
            { type: 'subheading', text: 'Právo odvolat souhlas (čl. 7 odst. 3 GDPR)' },
            {
              type: 'paragraph',
              text: 'Pokud je zpracování vašich osobních údajů (zasílání newsletteru) založeno na vašem souhlasu, máte právo tento souhlas kdykoli odvolat. Odvolání souhlasu nemá vliv na zákonnost zpracování provedeného před jeho odvoláním. Souhlas lze odvolat:',
            },
            {
              type: 'list',
              items: [
                { text: 'kliknutím na odkaz pro odhlášení v každém zaslaném e-mailu' },
                { text: 'zasláním e-mailu na adresu [info@restaart.cz](mailto:info@restaart.cz)' },
              ],
            },
            { type: 'subheading', text: 'Právo podat stížnost u dozorového úřadu (čl. 77 GDPR)' },
            {
              type: 'paragraph',
              text: 'Máte právo podat stížnost u příslušného dozorového úřadu, pokud se domníváte, že zpracování vašich osobních údajů porušuje GDPR nebo jiné předpisy na ochranu osobních údajů (viz sekce [Kontakt a dozorový úřad](#kontakt-a-dozorovy-urad)).',
            },
            { type: 'subheading', text: 'Lhůta pro vyřízení žádosti' },
            {
              type: 'paragraph',
              text: 'Na vaši žádost týkající se uplatnění práv odpovíme bez zbytečného odkladu, nejpozději do **30 dnů** od jejího obdržení. Ve výjimečných případech (složitost nebo počet žádostí) lze tuto lhůtu prodloužit o další 2 měsíce, o čemž vás předem informujeme.',
            },
          ],
        },
        {
          id: 'zabezpeceni-udaju',
          heading: 'Zabezpečení osobních údajů',
          blocks: [
            {
              type: 'paragraph',
              text: 'RESTAART SPORTOVNÍ CENTRUM s.r.o. přijalo přiměřená technická a organizační opatření k ochraně osobních údajů před neoprávněným přístupem, ztrátou, zničením, změnou nebo zveřejněním. Tato opatření zahrnují zejména:',
            },
            {
              type: 'list',
              items: [
                { lead: 'Šifrování přenosu dat', text: '— web používá protokol HTTPS (TLS) pro šifrování veškeré komunikace mezi vaším prohlížečem a naším serverem' },
                { lead: 'Hashování hesel', text: '— hesla k uživatelským účtům jsou ukládána výhradně v bezpečně zahashované podobě a nejsou nikdy ukládána v čitelné formě' },
                { lead: 'Řízení přístupu', text: '— k osobním údajům mají přístup pouze oprávněné osoby, které jsou vázány povinností mlčenlivosti' },
                { lead: 'Pravidelné aktualizace', text: '— softwarové komponenty webu jsou pravidelně aktualizovány za účelem eliminace bezpečnostních zranitelností' },
                { lead: 'Pravidelné zálohy', text: '— data jsou pravidelně zálohována pro případ technického selhání' },
              ],
            },
            {
              type: 'paragraph',
              text: 'Přes veškerá přijatá opatření nelze zaručit absolutní bezpečnost přenosu dat přes internet. V případě zjištění bezpečnostního incidentu, který by mohl ohrozit vaše práva a svobody, vás budeme informovat v souladu s požadavky GDPR.',
            },
          ],
        },
        {
          id: 'poverenec',
          heading: 'Pověřenec pro ochranu osobních údajů',
          blocks: [
            {
              type: 'paragraph',
              text: 'RESTAART SPORTOVNÍ CENTRUM s.r.o. nemá povinnost jmenovat pověřence pro ochranu osobních údajů (DPO) a pověřenec nebyl jmenován. V záležitostech ochrany osobních údajů se obracejte přímo na správce prostřednictvím kontaktů uvedených v sekci [Kontakt a dozorový úřad](#kontakt-a-dozorovy-urad).',
            },
          ],
        },
        {
          id: 'zmeny-zasad',
          heading: 'Změny těchto zásad',
          blocks: [
            {
              type: 'paragraph',
              text: 'Tyto Zásady ochrany osobních údajů můžeme průběžně aktualizovat, a to zejména v reakci na změny právních předpisů, používaných technologií nebo způsobu zpracování osobních údajů.',
            },
            { type: 'paragraph', text: 'O podstatných změnách vás budeme informovat:' },
            {
              type: 'list',
              items: [
                { text: 'zveřejněním aktualizované verze na webové stránce https://www.restaart.cz s uvedením data účinnosti' },
                { text: 'v případě závažných změn také prostřednictvím e-mailového upozornění zaslaného na adresu uvedenou ve vašem uživatelském účtu' },
              ],
            },
            { type: 'paragraph', text: 'Doporučujeme tyto Zásady pravidelně kontrolovat. Datum poslední aktualizace je vždy uvedeno v zápatí dokumentu.' },
          ],
        },
        {
          id: 'kontakt-a-dozorovy-urad',
          heading: 'Kontakt a dozorový úřad',
          blocks: [
            { type: 'subheading', text: 'Kontakt na správce' },
            { type: 'paragraph', text: 'Veškeré dotazy, žádosti o uplatnění práv nebo stížnosti týkající se ochrany osobních údajů směřujte na:' },
            {
              type: 'lines',
              lines: [
                '**RESTAART SPORTOVNÍ CENTRUM s.r.o.**',
                'Pražská 195, Popkovice, 530 06 Pardubice',
                'E-mail: **[info@restaart.cz](mailto:info@restaart.cz)**',
                'Web: [https://www.restaart.cz](https://www.restaart.cz)',
              ],
            },
            { type: 'subheading', text: 'Dozorový úřad' },
            { type: 'paragraph', text: 'Máte právo podat stížnost u dozorového orgánu pro ochranu osobních údajů v České republice:' },
            {
              type: 'lines',
              lines: [
                '**Úřad pro ochranu osobních údajů (ÚOOÚ)**',
                'Pplk. Sochora 27',
                '170 00 Praha 7',
                'Web: [www.uoou.gov.cz](https://www.uoou.gov.cz)',
                'E-mail: [posta@uoou.gov.cz](mailto:posta@uoou.gov.cz)',
              ],
            },
          ],
        },
      ],
    } satisfies LegalDocument,
  },

  // Endpointy API administrace
  api: {
    homepage: '/api/homepage',
    openingHours: '/api/opening-hours',
    pageCategories: '/api/page-categories',
    page: (slug: string) => `/api/pages/${encodeURIComponent(slug)}`,
    events: '/api/events',
    event: (slug: string) => `/api/events/${encodeURIComponent(slug)}`,
    // Serverless funkce api/google-rating.ts
    googleRating: '/api/google-rating',
    // Týden rozvrhu od pondělí `from` (bez `to` vrací API Po–Ne)
    reservations: (type: ReservationTypeSlug, from: string) => `/api/reservations/${type}?from=${from}`,
  },
}

export default content
