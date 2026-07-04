const translations = {
    kz: {
        heroIntro: "Біз үйленеміз",
        names: "Alexandr мен Adina",
        heroDate: "15 қыркүйек 2024",
        heroCity: "Алматы",
        heroBtn: "Қатысуды растау",
        aboutTitle: "Біз туралы",
        aboutText: "Біздің махаббат тарихымыз бізді осы сәтке әкелді, және біз оны ең жақын жандарымызбен атап өткіміз келеді.",
        timingTitle: "Күн тәртібі",
        timeGuests: "Қонақтардың жиналуы",
        timeCeremony: "Салтанатты рәсім",
        timeBanquet: "Банкет",
        timeCake: "Той торты",
        locationTitle: "Локация",
        locationName: "Qorzhyn Grand",
        locationAddress: "Құрамыс ш/а, Балбырауын көшесі, 2А",
        btnMap: "Картадан ашу",
        dresscodeTitle: "Дресс-код",
        dresscodeText: "Black Tie Optional. Ханымдарға пастельді түстерді таңдауды сұраймыз.",
        rsvpTitle: "RSVP",
        rsvpText: "Тойға қатысуыңызды 1 қыркүйекке дейін растауыңызды сұраймыз.",
        formName: "Аты-жөніңіз",
        formAttendance: "Тойға келесіз бе?",
        formYes: "Қуана келемін",
        formNo: "Өкінішке орай, келе алмаймын",
        formGuests: "Қонақтар саны",
        formComment: "Тілектер / Аллергия",
        formSubmit: "Жіберу",
        faqTitle: "Жиі қойылатын сұрақтар",
        faq1Q: "Балалармен келуге бола ма?",
        faq1A: "Біз балаларды жақсы көреміз, бірақ кеш тек ересектерге арналған форматта өтеді.",
        faq2Q: "Не сыйлауға болады?",
        faq2A: "Ең басты сыйлық - сіздің қатысуыңыз. Құттықтағыңыз келсе, конверт сыйласаңыз риза боламыз.",
        contactsTitle: "Байланыс",
        contactsText: "Сұрақтарыңыз болса, хабарласыңыз:"
    },
    ru: {
        heroIntro: "Мы женимся",
        names: "Александр и Адина",
        heroDate: "15 сентября 2024",
        heroCity: "Алматы",
        heroBtn: "Подтвердить участие",
        aboutTitle: "О нас",
        aboutText: "История нашей любви привела нас к этому моменту, и мы хотим отпраздновать его в кругу самых близких.",
        timingTitle: "Тайминг дня",
        timeGuests: "Сбор гостей",
        timeCeremony: "Церемония",
        timeBanquet: "Банкет",
        timeCake: "Торт",
        locationTitle: "Локация",
        locationName: "Qorzhyn Grand",
        locationAddress: "мкр. Курамыс, Улица Балбырауын, 2А",
        btnMap: "Открыть в картах",
        dresscodeTitle: "Дресс-код",
        dresscodeText: "Black Tie Optional. Просим дам выбрать платья в пастельных тонах.",
        rsvpTitle: "RSVP",
        rsvpText: "Пожалуйста, подтвердите ваше присутствие до 1 сентября.",
        formName: "Имя и Фамилия",
        formAttendance: "Планируете ли вы быть?",
        formYes: "С удовольствием приду",
        formNo: "К сожалению, не смогу",
        formGuests: "Количество персон",
        formComment: "Комментарий / Аллергии",
        formSubmit: "Отправить",
        faqTitle: "FAQ",
        faq1Q: "Можно ли с детьми?",
        faq1A: "Мы очень любим детей, но формат вечера предполагает присутствие только взрослых.",
        faq2Q: "Что дарить?",
        faq2A: "Ваше присутствие - главный подарок. Но если вы хотите нас поздравить, мы будем рады вкладу в наше будущее.",
        contactsTitle: "Контакты",
        contactsText: "Если у вас возникли вопросы, свяжитесь с нашим организатором:"
    },
    en: {
        heroIntro: "We are getting married",
        names: "Alexandr & Adina",
        heroDate: "September 15, 2024",
        heroCity: "Almaty",
        heroBtn: "RSVP",
        aboutTitle: "About Us",
        aboutText: "Our love story has led us to this moment, and we want to celebrate it with our closest ones.",
        timingTitle: "Schedule",
        timeGuests: "Welcome Drink",
        timeCeremony: "Ceremony",
        timeBanquet: "Reception",
        timeCake: "Wedding Cake",
        locationTitle: "Location",
        locationName: "Qorzhyn Grand",
        locationAddress: "mkr. Kuramys, Balbyrauyn Street 2A",
        btnMap: "Open in Maps",
        dresscodeTitle: "Dress Code",
        dresscodeText: "Black Tie Optional. Ladies are kindly requested to wear pastel colors.",
        rsvpTitle: "RSVP",
        rsvpText: "Please confirm your attendance by September 1st.",
        formName: "Full Name",
        formAttendance: "Will you attend?",
        formYes: "Joyfully Accept",
        formNo: "Regretfully Decline",
        formGuests: "Number of Guests",
        formComment: "Comments / Allergies",
        formSubmit: "Send",
        faqTitle: "FAQ",
        faq1Q: "Are children invited?",
        faq1A: "We love children, but this will be an adults-only celebration.",
        faq2Q: "What about gifts?",
        faq2A: "Your presence is the best gift. However, we would appreciate a contribution to our future.",
        contactsTitle: "Contacts",
        contactsText: "If you have any questions, please contact our planner:"
    }
};

// Functions
function setTheme(lang) {
    // 1. Update Body Attribute
    document.body.setAttribute('data-theme', lang);

    // 2. Update Active Button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
    });

    // 3. Translate Content
    const data = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) el.innerText = data[key];
    });

    // 4. Save Preference
    localStorage.setItem('wedding-theme', lang);
}

function submitForm(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        guests: document.getElementById('guests').value,
        comment: document.getElementById('comment').value
    };

    alert('Thank you! This is a demo form. \nData: ' + JSON.stringify(formData));
    console.log('Form Submit:', formData);
    // Integration point: fetch('https://api.sheet/or/supabase', { method: 'POST', body: ... })
}

// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Load saved or default theme
    const savedTheme = localStorage.getItem('wedding-theme') || 'kz';
    setTheme(savedTheme);

    // Attach observers
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
