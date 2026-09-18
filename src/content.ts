// Všechny statické texty a cesty k assetům aplikace
import type { AuthField, NavSectionData } from './types'

// Externí rezervační systém
const RESERVATION_URL = 'https://rezervace.restaart.cz/login'

// Odkaz na detail aktivity
const activity = (label: string, slug: string) => ({ label, href: `/aktivity/${slug}` })
// Odkaz na službu (stránka zatím není navržená)
const service = (label: string, slug: string) => ({ label, href: `/sluzby/${slug}` })

export const content = {
  brand: {
    name: 'Restaart',
    logoAlt: 'Restaart – sportovní centrum',
    logo: '/icons/brand_logo.svg',
  },

  header: {
    openMenu: 'Otevřít menu',
    closeMenu: 'Zavřít menu',
    menuLabel: 'Hlavní menu',
    menuIcon: '/icons/header_menu.svg',
    // Desktop: tlačítko v hlavičce – rezervační systém
    reservation: { label: 'rezervovat', icon: '/icons/button_arrow.svg', href: RESERVATION_URL },
    // Desktop: varianta tlačítka na stránkách účtu
    backToWeb: { label: 'zpět na web', icon: '/icons/button_arrow.svg', href: '/' },
  },

  contact: {
    email: 'info@restaart.cz',
    phone: '+420 608 197 964',
    phoneHref: 'tel:+420608197964',
    reservationUrl: RESERVATION_URL,
    addressTitle: 'Adresa',
    addressLines: ['Přerovská 503', '530 06 Pardubice - Svítkov'],
    mapUrl: 'https://maps.google.com/?q=P%C5%99erovsk%C3%A1+503,+Pardubice',
    parkingTitle: 'Parkování',
    parkingLines: ['Podélné parkování před', 'a v okolí sportovního centra'],
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/', icon: '/icons/social_instagram.svg' },
      { label: 'Facebook', href: 'https://www.facebook.com/', icon: '/icons/social_facebook.svg' },
    ],
  },

  openingHours: [
    { days: 'PO, ST, PÁ', hours: '7:00 - 11:00, 15:00 - 21:00' },
    { days: 'ÚT, ČT', hours: '15:00 - 21:00' },
    { days: 'SOBOTA', hours: '8:00 - 12:00' },
    { days: 'NEDĚLE', hours: '15:00 - 21:00' },
  ],

  quickNav: {
    reservation: { label: 'rezervace', icon: '/icons/quick_nav_reservation.svg' },
    events: { label: 'akce', icon: '/icons/quick_nav_events.svg', href: '/akce' },
    activities: {
      label: 'aktivity',
      icon: '/icons/quick_nav_activities.svg',
      // Sekce navigace v rozbalovacím panelu
      sections: ['SPORT', 'REGENERACE'],
    },
    reception: { label: 'recepce', icon: '/icons/reception_call.svg' },
  },

  hero: {
    lines: ['sportovní centrum', 'pro celou rodinu'],
    image: '/images/home_hero.webp',
    // Desktop: nápis „akce“ v pravém dolním rohu hera
    eventsLabel: { icon: '/icons/hero_events_label.svg', alt: 'akce', href: '/akce' },
  },

  eventPill: {
    // false = tlačítko se nevykreslí, místo zůstane
    enabled: true,
    text: '28/9 Den otevřených dveří',
    href: '/akce/restaart-day',
    arrowIcon: '/icons/event_pill_arrow.svg',
  },

  googleRating: {
    logo: '/icons/google_rating_logo.svg',
    logoAlt: 'Google',
    starIcon: '/icons/google_rating_star.svg',
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
    credit: { label: 'Tvoříme weby s radostí', href: 'https://matfix.cz', logo: '/icons/footer_credit_logo.svg', logoAlt: 'Matfix', logoIcon: '/icons/footer_credit_icon.svg', logoIconAlt: 'Matfix – ikona' },
  },

  menu: {
    closeIcon: '/icons/menu_close.svg',
    closeIconDesktop: '/icons/menu_close_desktop.svg',
    phoneIcon: '/icons/reception_call.svg',
    callReception: 'Volat na recepci',
    callNote: 'Na telefonu jsme v otevíračce',
  },

  // Struktura navigace (menu a rozbalovací seznam aktivit)
  navSections: [
    {
      label: 'SPORT',
      items: [
        activity('skupinová cvičení', 'skupinova-cviceni'),
        activity('dětské kroužky', 'detske-krouzky'),
        activity('squash', 'squash'),
        activity('badminton', 'badminton'),
        activity('stolní tenis', 'stolni-tenis'),
        activity('posilovna', 'posilovna'),
        activity('fitzóna', 'fitzona'),
        activity('vacushape', 'vacushape'),
      ],
    },
    {
      label: 'REGENERACE',
      items: [
        activity('soukromá sauna', 'soukroma-sauna'),
        activity('maderoterapie', 'maderoterapie'),
        activity('BodyWraps', 'bodywraps'),
        activity('lymfodrenáž', 'lymfodrenaz'),
        activity('masáže', 'masaze'),
        activity('tejpování', 'tejpovani'),
        activity('výživa', 'vyziva'),
      ],
    },
    {
      label: 'SLUŽBY',
      items: [
        service('rezervační systém', 'rezervacni-system'),
        service('pro firmy', 'pro-firmy'),
        service('pro kluby', 'pro-kluby'),
        service('pronájem prostor', 'pronajem-prostor'),
        service('reklamní plochy / partneři', 'reklamni-plochy'),
        service('dárkové poukazy', 'darkove-poukazy'),
        service('věrnostní program', 'vernostni-program'),
        service('platební možnosti', 'platebni-moznosti'),
        service('ceník', 'cenik'),
      ],
    },
    { label: 'AKCE', href: '/akce' },
    { label: 'REZERVACE', href: RESERVATION_URL, external: true },
    { label: 'KONTAKT', href: '/kontakt' },
  ] satisfies NavSectionData[],

  pages: {
    events: { title: 'akce', image: '/images/events_bg.webp' },
    eventDetail: { back: 'zpět na výpis', backIcon: '/icons/back_link_arrow.svg', image: '/images/events_bg.webp' },
    activity: {
      classListButton: 'Popis všech cvičení',
      openIcon: '/icons/class_list_open.svg',
      closeIcon: '/icons/class_list_close.svg',
      prevIcon: '/icons/gallery_prev.svg',
      nextIcon: '/icons/gallery_next.svg',
      prevLabel: 'Předchozí fotka',
      nextLabel: 'Další fotka',
    },
    contact: { image: '/images/contact_bg.webp' },
    // Statická stránka přihlášení
    login: {
      title: 'přihlášení',
      emailLabel: 'Email',
      passwordLabel: 'Heslo',
      submit: 'přihlásit',
      submitIcon: '/icons/button_arrow.svg',
      noAccount: 'Nemáte účet?',
      register: 'Registrovat',
      registerHref: '/registrace',
      image: '/images/home_hero.webp',
    },
    // Statická stránka registrace
    register: {
      title: 'registrace',
      fields: [
        { type: 'text', name: 'firstName', label: 'Jméno', autoComplete: 'given-name' },
        { type: 'text', name: 'lastName', label: 'Příjmení', autoComplete: 'family-name' },
        { type: 'email', name: 'email', label: 'Email', autoComplete: 'email' },
        { type: 'tel', name: 'phone', label: 'Telefon', autoComplete: 'tel' },
        { type: 'password', name: 'password', label: 'Heslo', autoComplete: 'new-password' },
        { type: 'password', name: 'passwordConfirm', label: 'Heslo znovu', autoComplete: 'new-password' },
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
      submitIcon: '/icons/button_arrow.svg',
      haveAccount: 'Máte účet?',
      login: 'Přihlásit',
      loginHref: '/prihlaseni',
      image: '/images/home_hero.webp',
    },
    notFound: { title: 'Stránka se připravuje', back: 'Zpět na úvod' },
    loading: 'Načítání…',
    loadError: 'Data se nepodařilo načíst.',
    notFoundItem: 'Položka nebyla nalezena.',
  },

  // Právní stránky – zástupné texty do dodání finálního znění
  legal: {
    terms: {
      title: 'Obchodní podmínky',
      updated: 'Platné od 1. 1. 2026',
      sections: [
        {
          heading: '1. Úvodní ustanovení',
          paragraphs: [
            'Tyto obchodní podmínky (dále jen „podmínky“) upravují vztahy mezi společností RESTAART SPORTOVNÍ CENTRUM s.r.o., IČ: 08609306, se sídlem Pražská 195, 530 06 Pardubice (dále jen „provozovatel“), a fyzickými či právnickými osobami, které využívají služby sportovního centra Restaart na adrese Přerovská 503, 530 06 Pardubice – Svítkov (dále jen „zákazník“).',
            'Vstupem do prostor sportovního centra, vytvořením rezervace nebo zakoupením kterékoli služby zákazník potvrzuje, že se s těmito podmínkami seznámil a souhlasí s nimi. Podmínky jsou k dispozici na recepci a na webových stránkách provozovatele.',
          ],
        },
        {
          heading: '2. Nabízené služby',
          paragraphs: [
            'Provozovatel nabízí zejména pronájem sportovišť (squash, badminton, stolní tenis), vstup do posilovny a fitzóny, skupinová cvičení, dětské kroužky a regenerační služby (soukromá sauna, masáže, lymfodrenáž, maderoterapie, BodyWraps, tejpování a výživové poradenství).',
            'Aktuální nabídka, rozsah služeb a otevírací doba jsou uvedeny na webových stránkách a na recepci. Provozovatel si vyhrazuje právo nabídku služeb a otevírací dobu upravit, zejména v období svátků, prázdnin, sportovních akcí nebo z technických důvodů.',
          ],
        },
        {
          heading: '3. Rezervace a její zrušení',
          paragraphs: [
            'Sportoviště a regenerační služby lze rezervovat prostřednictvím online rezervačního systému, telefonicky na recepci nebo osobně. Rezervace je závazná okamžikem jejího potvrzení provozovatelem.',
            'Rezervaci lze bezplatně zrušit nejpozději 24 hodin před jejím začátkem. Při pozdějším zrušení nebo nedostavení se na rezervovaný termín je provozovatel oprávněn účtovat storno poplatek ve výši 100 % ceny rezervované služby, případně odečíst odpovídající vstup z permanentky nebo kreditu.',
            'Provozovatel může rezervaci zrušit z provozních či technických důvodů. V takovém případě zákazníka neprodleně informuje a nabídne náhradní termín nebo vrácení uhrazené částky.',
          ],
        },
        {
          heading: '4. Ceny a platební podmínky',
          paragraphs: [
            'Ceny služeb se řídí platným ceníkem zveřejněným na webových stránkách a na recepci. Všechny ceny jsou uvedeny včetně DPH.',
            'Služby lze hradit v hotovosti, platební kartou, prostřednictvím kreditu v rezervačním systému, permanentkou nebo dárkovým poukazem. Zaměstnanecké benefitní programy jsou přijímány v rozsahu uvedeném na recepci.',
            'Permanentky a kredity jsou nepřenosné, pokud není výslovně uvedeno jinak, a mají omezenou platnost uvedenou při jejich zakoupení. Nevyčerpaná hodnota po skončení platnosti propadá bez nároku na náhradu.',
          ],
        },
        {
          heading: '5. Provozní řád a pravidla chování',
          paragraphs: [
            'Zákazník je povinen dodržovat provozní řád sportovního centra, pokyny personálu a používat sportoviště pouze k účelu, ke kterému jsou určena. Na sportoviště je povolen vstup pouze v čisté sportovní obuvi s nebarvící podrážkou.',
            'Do prostor sportovního centra je zakázán vstup osobám pod vlivem alkoholu nebo návykových látek. Provozovatel je oprávněn takovou osobu bez náhrady vykázat.',
            'Osoby mladší 15 let mohou využívat posilovnu a fitzónu pouze v doprovodu dospělé osoby nebo v rámci organizovaného kroužku pod vedením instruktora.',
          ],
        },
        {
          heading: '6. Odpovědnost za škodu',
          paragraphs: [
            'Zákazník provozuje sportovní aktivity na vlastní odpovědnost a s ohledem na svůj zdravotní stav. Provozovatel doporučuje před zahájením náročnějších aktivit konzultaci s lékařem.',
            'Za odložené věci odpovídá provozovatel pouze v rozsahu stanoveném právními předpisy. Cennosti doporučujeme ukládat do uzamykatelných skříněk nebo předat na recepci.',
            'Zákazník odpovídá za škodu, kterou způsobí na vybavení nebo prostorách sportovního centra porušením provozního řádu nebo těchto podmínek.',
          ],
        },
        {
          heading: '7. Reklamace',
          paragraphs: [
            'Případné vady poskytnuté služby je zákazník povinen uplatnit bez zbytečného odkladu, nejlépe ihned na recepci nebo e-mailem na adresu info@restaart.cz. Provozovatel reklamaci vyřídí nejpozději do 30 dnů od jejího uplatnění.',
            'V případě spotřebitelského sporu, který se nepodaří vyřešit dohodou, je možné obrátit se na Českou obchodní inspekci jako subjekt mimosoudního řešení spotřebitelských sporů.',
          ],
        },
        {
          heading: '8. Závěrečná ustanovení',
          paragraphs: [
            'Provozovatel je oprávněn tyto podmínky jednostranně měnit. Nové znění podmínek nabývá účinnosti dnem jeho zveřejnění na webových stránkách, přičemž na již potvrzené rezervace se použije znění účinné v době jejich potvrzení.',
            'Právní vztahy neupravené těmito podmínkami se řídí právním řádem České republiky, zejména občanským zákoníkem.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Zásady ochrany osobních údajů',
      updated: 'Platné od 1. 1. 2026',
      sections: [
        {
          heading: '1. Správce osobních údajů',
          paragraphs: [
            'Správcem osobních údajů je společnost RESTAART SPORTOVNÍ CENTRUM s.r.o., IČ: 08609306, se sídlem Pražská 195, 530 06 Pardubice (dále jen „správce“). Ve věcech ochrany osobních údajů nás můžete kontaktovat e-mailem na adrese info@restaart.cz nebo telefonicky na čísle +420 608 197 964.',
            'Tyto zásady popisují, jaké osobní údaje zpracováváme, za jakým účelem, na jakém právním základě, jak dlouho je uchováváme a jaká práva vám v souvislosti se zpracováním náleží.',
          ],
        },
        {
          heading: '2. Jaké údaje zpracováváme',
          paragraphs: [
            'Při vytvoření účtu v rezervačním systému nebo při rezervaci zpracováváme vaše jméno a příjmení, e-mailovou adresu, telefonní číslo a údaje o provedených rezervacích a platbách.',
            'Při nákupu permanentky, kreditu nebo dárkového poukazu zpracováváme dále fakturační údaje. U dětských kroužků zpracováváme jméno a datum narození dítěte a kontaktní údaje zákonného zástupce.',
            'Při návštěvě našich webových stránek můžeme zpracovávat technické údaje, jako je IP adresa, typ prohlížeče a záznamy o používání stránek, a to prostřednictvím souborů cookies.',
          ],
        },
        {
          heading: '3. Účely a právní základ zpracování',
          paragraphs: [
            'Osobní údaje zpracováváme především za účelem plnění smlouvy – tedy pro vedení rezervací, poskytování služeb, vystavování dokladů a komunikaci s vámi ohledně vašich rezervací.',
            'Některé údaje zpracováváme z důvodu plnění právních povinností, zejména účetních a daňových. Na základě oprávněného zájmu zpracováváme údaje pro ochranu majetku (kamerový systém v prostorách centra) a pro zasílání informací o novinkách stávajícím zákazníkům.',
            'Marketingová sdělení zasíláme osobám, které nejsou našimi zákazníky, pouze na základě jejich souhlasu, který lze kdykoli odvolat.',
          ],
        },
        {
          heading: '4. Doba uchování údajů',
          paragraphs: [
            'Údaje spojené s vaším účtem v rezervačním systému uchováváme po dobu trvání účtu a dále 3 roky od jeho zrušení. Účetní a daňové doklady uchováváme po dobu stanovenou právními předpisy, zpravidla 10 let.',
            'Záznamy z kamerového systému uchováváme nejdéle 14 dní, pokud nejsou potřebné pro řešení konkrétního incidentu. Údaje zpracovávané na základě souhlasu uchováváme do jeho odvolání.',
          ],
        },
        {
          heading: '5. Příjemci osobních údajů',
          paragraphs: [
            'Vaše osobní údaje předáváme pouze zpracovatelům, kteří nám poskytují služby nezbytné pro náš provoz – zejména provozovateli rezervačního systému, poskytovateli účetních služeb, poskytovateli webhostingu a poskytovatelům platebních služeb.',
            'Se všemi zpracovateli máme uzavřeny smlouvy o zpracování osobních údajů. Osobní údaje nepředáváme do zemí mimo Evropskou unii.',
          ],
        },
        {
          heading: '6. Soubory cookies',
          paragraphs: [
            'Naše webové stránky používají nezbytné cookies, které zajišťují jejich správné fungování, a případně analytické cookies, které nám pomáhají pochopit, jak návštěvníci stránky používají. Analytické cookies používáme pouze s vaším souhlasem.',
            'Nastavení cookies můžete kdykoli změnit v nastavení svého prohlížeče. Odmítnutí nezbytných cookies může omezit funkčnost stránek.',
          ],
        },
        {
          heading: '7. Vaše práva',
          paragraphs: [
            'Máte právo na přístup ke svým osobním údajům, na jejich opravu nebo výmaz, na omezení zpracování, na přenositelnost údajů a právo vznést námitku proti zpracování založenému na oprávněném zájmu.',
            'Pokud je zpracování založeno na souhlasu, máte právo jej kdykoli odvolat, aniž by tím byla dotčena zákonnost zpracování před jeho odvoláním. Máte rovněž právo podat stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7.',
            'Svá práva můžete uplatnit e-mailem na adrese info@restaart.cz. Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.',
          ],
        },
        {
          heading: '8. Změny těchto zásad',
          paragraphs: [
            'Tyto zásady můžeme průběžně aktualizovat, zejména v návaznosti na změny právních předpisů nebo rozsahu poskytovaných služeb. Aktuální znění je vždy dostupné na našich webových stránkách.',
          ],
        },
      ],
    },
  },

  // Cesty k datům (mock JSON, později API)
  api: {
    activities: '/activities.json',
    events: '/events.json',
    // Serverless funkce api/google-rating.ts
    googleRating: '/api/google-rating',
  },
}

export default content
