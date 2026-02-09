function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function syncProjectBadges(d) {
    const pr = document.querySelector('.project[data-vis][data-stage]');
    if (!pr) return;

    const vis = pr.dataset.vis;     // public | private
    const stage = pr.dataset.stage; // done | progress

    const visWrap = document.getElementById("visBadgeWrap");
    const stageWrap = document.getElementById("stageBadgeWrap");

    // badges text
    setText("visBadge", vis === "public" ? d.visPublic : d.visPrivate);
    setText("stageBadge", stage === "progress" ? d.stageProgress : d.stageDone);

    // badges colors
    if (visWrap) {
        visWrap.classList.toggle("pbadge--public", vis === "public");
        visWrap.classList.toggle("pbadge--private", vis === "private");
    }

    if (stageWrap) {
        stageWrap.classList.toggle("pbadge--progress", stage === "progress");
        stageWrap.classList.toggle("pbadge--done", stage === "done");
    }

    // legend
    setText("lgPublic", d.lgPublic);
    setText("lgPrivate", d.lgPrivate);
    setText("lgLive", d.lgLive);
    setText("lgSoon", d.lgSoon);
    setText("lgOff", d.lgOff);

    // tags
    setText("tgDesktop", d.tgDesktop);
    setText("tgAndroid", d.tgAndroid);
    setText("tgIos", d.tgIos);
    setText("tgWeb", d.tgWeb);
}

// ===== Utilities =====
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

const toast = $("#toast");
const toastText = $("#toastText");
let toastTimer = null;

function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

$("#toastClose").addEventListener("click", () => toast.classList.remove("show"));

// ===== Mobile menu =====
const hamb = $("#hamb");
const mobileMenu = $("#mobileMenu");

hamb.addEventListener("click", () => {
    const active = hamb.classList.toggle("active");
    mobileMenu.hidden = !active;
});

$$("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
    hamb.classList.remove("active");
    mobileMenu.hidden = true;
}));

// ===== Smooth scroll =====
document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});

// ===== Scroll top =====
$("#scrollTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Contact form -> WhatsApp (LIVE) =====
const WA_NUMBER = "201283713447";
const wa = document.getElementById("waLink");
if (wa) wa.href = `https://wa.me/${WA_NUMBER}`;

const projectType = $("#projectType");
const mobileBox = $("#mobileBox");
const mobilePlatform = $("#mobilePlatform");

// show/hide mobile platform dropdown
projectType.addEventListener("change", () => {
    const isMobile = projectType.value === "mobile";
    mobileBox.hidden = !isMobile;

    // reset platform when not mobile
    if (!isMobile) {
        mobilePlatform.value = "";
    }
});

$("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const details = $("#message").value.trim();

    const typeText = projectType.options[projectType.selectedIndex]?.text || "";
    const isMobile = projectType.value === "mobile";
    const platformText = isMobile
        ? (mobilePlatform.options[mobilePlatform.selectedIndex]?.text || "")
        : "";

    // validation
    if (!name || !details || !projectType.value) {
        showToast("اكتب الاسم + اختار نوع المشروع + التفاصيل ✅");
        return;
    }
    if (isMobile && !mobilePlatform.value) {
        showToast("اختار نظام الموبايل (Android / iPhone) ✅");
        return;
    }

    const projectLine = isMobile
        ? `${typeText} (${platformText})`
        : typeText;

    const msg =
        `طلب جديد من موقع Tilvix ✅
الاسم: ${name}
نوع المشروع: ${projectLine}

تفاصيل:
${details}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    showToast("فتحنا واتساب ✅ اضغط إرسال هناك 🚀");
});

// ===== Year =====
$("#year").textContent = new Date().getFullYear();

// ===== AR / EN toggle =====
const dict = {
    ar: {
        dir: "rtl",
        badgeText: "نحوّل أفكارك لتطبيقات فخمة وسريعة",
        title: "نصمّم ونطوّر منتجات رقمية <span class='grad'>تبيع وتكبر</span> 🔥",
        heroSub: "Tilvix شركة سوفت وير متخصصة في <b>Flutter</b>. بنبني تطبيقات <b>موبايل</b> و<b>ديسك توب</b> و<b>ويب</b>، وكمان <b>سيستم كامل</b>—بـ UI فخم، أداء سريع، وكود قابل للتوسع.",

        s1: "+99%", s1t: "رضا العملاء عن التسليم",
        s2: "UI", s2t: "تصميم عصري + Motion",
        s3: "Fast", s3t: "أداء عالي وتجربة سلسة",

        pillText: "منهج Tilvix",
        pillRight: "جاهز للإطلاق",

        chip1: "Flutter Apps",
        chip2: "Design System",
        chip3: "System Apps",
        chip4: "Roles & Reports",
        chip5: "Flutter UI",
        chip6: "Fast Performance",

        c1h: "UI فخم + UX محسوب",
        c1p: "بنبني Design System للبراند: ألوان، خطوط، Motion، وComponents قابلة للتوسع—من غير زحمة.",
        m1b: "Flutter",
        m1s: "Android • iOS",
        m2b: "Desktop",
        m2s: "Windows • macOS • Linux",

        c2h: "سيستم كامل + إدارة شغل",
        c2p: "عملاء/فواتير/مخزون/مبيعات + صلاحيات لكل موظف + تقارير واضحة—تطبيق سريع وثابت وشكله Premium.",
        c3h: "تطبيق Flutter جاهز للتسليم",
        c3p: "واجهة فخمة وسهلة الاستخدام—تجربة سريعة، دعم تحديثات، وتجهيز للنشر (Android / iPhone / Desktop) حسب احتياجك.",

        ft: "ليه Tilvix؟ 💎",
        fp: "3 أسباب تخليك تختارنا: شكل جامد، كود نظيف، وتسليم احترافي.",
        f1h: "Flutter Cross-Platform بخبرة",
        f1p: "تطبيق واحد يشتغل Android / iOS / Desktop بنفس الجودة—UI فخم + تجربة سريعة.",
        f2h: "كود نظيف + أداء ثابت",
        f2p: "Architecture محترمة، Components قابلة لإعادة الاستخدام، وتحسين Performance من أول يوم.",
        f3h: "إطلاق سريع + دعم وتكاملات",
        f3p: "تسليم بمراحل واضحة + توثيق + ربط واتساب/دفع/لوحات تحكم حسب احتياج مشروعك.",

        st: "خدماتنا ⚙️",
        sp: "بنطوّر حلول Flutter حسب احتياجك: موبايل، ديسك توب، ويب، أو سيستم كامل—بـ UI فخم وأداء سريع.",

        b1t: "تطبيقات موبايل Flutter",
        b1d: "Android / iOS (Cross-Platform) — واجهات قوية، تجربة سلسة، وتجهيز للإطلاق.",

        b2t: "تطبيقات ديسك توب Flutter",
        b2d: "Windows / macOS / Linux — أنظمة إدارة، فواتير، مخازن، POS، وأدوات أعمال.",

        b3t: "Web Apps + لوحات تحكم",
        b3d: "مواقع شركات، Landing Pages، Dashboards ولوحات إدارة—سريعة ومتجاوبة.",

        b4t: "سيستم كامل + تكاملات",
        b4d: "API + قواعد بيانات + صلاحيات + ربط دفع/إيميل/واتساب—مع نشر وصيانة عند الطلب.",

        pt: "الفكرة عندنا 🧠",
        pp: "شغلنا بسيط وواضح: بنسمّعك كويس، نبني UI فخم، نطوّر بـ Flutter، ونسلّم منتج جاهز للاستخدام.",

        p1t: "1) نسمع الفكرة",
        p1d: "بنحدد نوع المشروع (موبايل/ويب/ديسك توب/سيستم) + أهم المميزات اللي لازم تنزل أول إصدار.",

        p2t: "2) تصميم UI فخم",
        p2d: "نظبط الستايل: ألوان، خطوط، Components—علشان المنتج يطلع شيك ومحترف.",

        p3t: "3) تطوير Flutter + اختبار",
        p3d: "بنقسم الشغل لخطوات، نطوّر بسرعة وبنختبر كل جزء—علشان الأداء يبقى ثابت وسلس.",

        p4t: "4) تسليم + تشغيل + دعم",
        p4d: "نسلّم نسخة جاهزة، ولو محتاج نشر/متابعة/تعديلات—بنكمّل معاك كدعم مستمر.",
        cta2: "خلّينا نبدأ 🚀",

        wt: "شغلنا حاليًا 🔥",
        wp: "ده أحدث مشروع عندنا. المشاريع الخاصة بنعرضها للعميل فقط.",
        w1h: "فواتيري — نظام فواتير ومبيعات",
        w1p: "إدارة فواتير، عملاء، منتجات، ومديونيات… بواجهة فخمة وأداء سريع (Flutter).",
        w2h: "—", w2p: "—",
        w3h: "—", w3p: "—",

        techBadge: "Flutter",
        visPublic: "عام",
        visPrivate: "خاص",
        stageDone: "جاهز",
        stageProgress: "قيد التطوير",
        lgPublic: "عام (مجاني)",
        lgPrivate: "خاص (مخصوص لي عميل معين)",
        lgLive: "متاح الآن",
        lgSoon: "قريبًا",
        lgOff: "غير مدعوم",
        tgDesktop: "ديسك توب • متاح",
        tgAndroid: "Android • قريبًا",
        tgIos: "iOS • قريبًا",
        tgWeb: "ويب • غير مدعوم",
        followLabel: "تابعنا:",

        phName: "اكتب اسمك",
        phMsg: "اكتب المتطلبات بسرعة 👇",
        ct: "تواصل مع Tilvix 📩",
        cp: "اكتب بياناتك—وهنفتح واتساب برسالة جاهزة.",
        cfh: "ابعت طلبك",
        ln: "الاسم",
        lm: "تفاصيل المشروع",
        hint: "*عند الإرسال هيتفتح واتساب برسالة جاهزة—اضغط إرسال هناك ✅",
        sendBtn: "إرسال 🚀",

        cinfo: "معلومات عن Tilvix",
        cdesc: "Tilvix فريق تطوير متخصص في <b>Flutter</b>. بنبني تطبيقات <b>موبايل</b> و<b>ديسك توب</b> و<b>ويب</b>، وكمان <b>سيستم كامل</b> حسب طلب العميل. شغلنا عن بُعد حاليًا (بدون مقر ثابت).",
        ci1: "واتساب",
        ci1v: "+20 1142076661",
        ci2: "البريد الإلكتروني",
        ci2v: "go.to.2008.6.1@gmail.com",
        ci3: "التخصص",
        ci3v: "Flutter • UI/UX • Performance • Clean Code",
        scrollTop: "فوق ⬆️",

        lType: "نوع المشروع",
        lMobile: "نظام الموبايل",
        typeOpt0: "اختر نوع المشروع",
        typeOpt1: "موبايل",
        typeOpt2: "موقع ويب",
        typeOpt3: "تطبيق ديسك توب",
        typeOpt4: "سيستيم كامل",
        mOpt0: "اختر النظام",
        mOpt1: "Android",
        mOpt2: "iPhone",
        mOpt3: "Android + iPhone",
    },
    en: {
        dir: "ltr",
        badgeText: "We turn ideas into premium, fast software",
        title: "We design & build digital products that <span class='grad'>sell and scale</span> 🔥",
        heroSub: "Tilvix is a software company building <b>desktop</b>, <b>mobile</b>, and <b>web</b> applications with high quality: fast performance, premium UI, and scalable clean code.",

        s1: "+99%", s1t: "Delivery satisfaction",
        s2: "UI", s2t: "Modern design + motion",
        s3: "Fast", s3t: "Smooth high performance",

        pillText: "Tilvix Workflow",
        pillRight: "Production-ready",

        chip1: "Flutter Apps",
        chip2: "Design System",
        chip3: "System Apps",
        chip4: "Roles & Reports",
        chip5: "Flutter UI",
        chip6: "Fast Performance",

        c1h: "Premium UI + Thoughtful UX",
        c1p: "We build a brand-ready design system: colors, typography, motion, and scalable components—clean and consistent.",
        m1b: "Flutter",
        m1s: "Android • iOS",
        m2b: "Desktop",
        m2s: "Windows • macOS • Linux",

        c2h: "Full system for business management",
        c2p: "Customers, invoices, inventory, sales + staff roles & permissions + clear reports—fast, stable, and premium-looking.",
        c3h: "Flutter app ready to ship",
        c3p: "Premium UI with a smooth experience—updates support and launch-ready builds (Android / iOS / Desktop) based on your needs.",

        ft: "Why Tilvix? 💎",
        fp: "Three reasons: premium look, clean code, and professional delivery.",
        f1h: "Flutter cross-platform mastery",
        f1p: "One codebase for mobile + desktop with premium UI and smooth UX.",
        f2h: "Clean architecture, solid performance",
        f2p: "Scalable structure, reusable components, and performance-first delivery.",
        f3h: "Launch-ready with support & integrations",
        f3p: "Clear milestones, documentation, and integrations (WhatsApp, payments, dashboards).",

        st: "Services ⚙️",
        sp: "We build Flutter solutions based on your needs: mobile, desktop, web, or a full system—premium UI and fast performance.",

        b1t: "Flutter Mobile Apps",
        b1d: "Android / iOS (cross-platform) — premium UI, smooth UX, and launch-ready builds.",
        b2t: "Flutter Desktop Apps",
        b2d: "Windows / macOS / Linux — management systems, invoicing, inventory, POS, and business tools.",
        b3t: "Web Apps + Dashboards",
        b3d: "Company websites, landing pages, admin dashboards—fast and fully responsive.",
        b4t: "Full System + Integrations",
        b4d: "APIs, databases, roles/permissions, payments/email/WhatsApp integrations—with deployment & maintenance on request.",

        pt: "How we work 🧠",
        pp: "Simple and clear: we listen first, design premium UI, build in Flutter, and deliver a launch-ready product.",

        p1t: "1) Understand the idea",
        p1d: "Define the project type (mobile/web/desktop/system) and the must-have features for the first release.",
        p2t: "2) Premium UI design",
        p2d: "We craft the style: colors, typography, and reusable components—so it looks professional and modern.",
        p3t: "3) Flutter build + testing",
        p3d: "We ship in milestones, build fast, and test each part to keep performance smooth and stable.",
        p4t: "4) Delivery + run + support",
        p4d: "We deliver a ready version, and if you need deployment/monitoring/changes—we support you ongoing.",
        cta2: "Let’s start 🚀",

        wt: "Current work 🔥",
        wp: "This is our latest public project. Private projects are shown to clients only.",
        w1h: "Fawateery — Invoicing & Sales System",
        w1p: "Manage invoices, customers, products, and debts… premium UI with fast performance (Flutter).",

        techBadge: "Flutter",
        visPublic: "Public",
        visPrivate: "Private",
        stageDone: "Ready",
        stageProgress: "In progress",

        lgPublic: "Public (Free)",
        lgPrivate: "Private (Client-only)",
        lgLive: "Available now",
        lgSoon: "Coming soon",
        lgOff: "Not supported",

        tgDesktop: "Desktop • Available",
        tgAndroid: "Android • Coming soon",
        tgIos: "iOS • Coming soon",
        tgWeb: "Web • Not supported",

        followLabel: "Follow us:",

        phName: "Your name",
        phMsg: "Briefly describe your requirements 👇",
        ct: "Contact Tilvix 📩",
        cp: "Fill your details—we’ll open WhatsApp with a ready message.",
        cfh: "Send a request",
        ln: "Name",
        lm: "Project details",
        hint: "*On submit, WhatsApp will open with a ready message—press Send ✅",
        sendBtn: "Send 🚀",

        cinfo: "About Tilvix",
        cdesc: "Tilvix is a small team specialized in <b>Flutter</b>. We build <b>mobile</b>, <b>desktop</b>, and <b>web</b> apps — and full <b>systems</b> based on your needs. We currently work remotely (no physical office).",
        ci1: "WhatsApp",
        ci1v: "+20 1142076661",
        ci2: "Email",
        ci2v: "go.to.2008.6.1@gmail.com",
        ci3: "Focus",
        ci3v: "Flutter • UI/UX • Performance • Clean Code",
        scrollTop: "Top ⬆️",

        lType: "Project type",
        lMobile: "Mobile platform",
        typeOpt0: "Select project type",
        typeOpt1: "Mobile",
        typeOpt2: "Website",
        typeOpt3: "Desktop app",
        typeOpt4: "Full system",
        mOpt0: "Select platform",
        mOpt1: "Android",
        mOpt2: "iPhone",
        mOpt3: "Android + iPhone",
    }
};

let lang = "ar";

function applyLang(next) {
    lang = next;
    const d = dict[lang];
    document.documentElement.dir = d.dir;
    document.documentElement.lang = lang;

    $("#badgeText").textContent = d.badgeText;
    $(".title").innerHTML = d.title;
    $("#heroSub").innerHTML = d.heroSub;

    $("#s1").textContent = d.s1; $("#s1t").textContent = d.s1t;
    $("#s2").textContent = d.s2; $("#s2t").textContent = d.s2t;
    $("#s3").textContent = d.s3; $("#s3t").textContent = d.s3t;

    $("#pillText").textContent = d.pillText;
    $("#pillRight").textContent = d.pillRight;

    $("#chip1").textContent = d.chip1; $("#chip2").textContent = d.chip2;
    $("#chip3").textContent = d.chip3; $("#chip4").textContent = d.chip4;
    $("#chip5").textContent = d.chip5; $("#chip6").textContent = d.chip6;

    $("#c1h").textContent = d.c1h; $("#c1p").textContent = d.c1p;
    $("#m1b").textContent = d.m1b; $("#m1s").textContent = d.m1s;
    $("#m2b").textContent = d.m2b; $("#m2s").textContent = d.m2s;

    $("#c2h").textContent = d.c2h; $("#c2p").textContent = d.c2p;
    $("#c3h").textContent = d.c3h; $("#c3p").textContent = d.c3p;

    $("#ft").textContent = d.ft; $("#fp").textContent = d.fp;
    $("#f1h").textContent = d.f1h; $("#f1p").textContent = d.f1p;
    $("#f2h").textContent = d.f2h; $("#f2p").textContent = d.f2p;
    $("#f3h").textContent = d.f3h; $("#f3p").textContent = d.f3p;

    $("#st").textContent = d.st; $("#sp").textContent = d.sp;
    $("#b1t").textContent = d.b1t; $("#b1d").textContent = d.b1d;
    $("#b2t").textContent = d.b2t; $("#b2d").textContent = d.b2d;
    $("#b3t").textContent = d.b3t; $("#b3d").textContent = d.b3d;
    $("#b4t").textContent = d.b4t; $("#b4d").textContent = d.b4d;

    $("#pt").textContent = d.pt; $("#pp").textContent = d.pp;
    $("#p1t").textContent = d.p1t; $("#p1d").textContent = d.p1d;
    $("#p2t").textContent = d.p2t; $("#p2d").textContent = d.p2d;
    $("#p3t").textContent = d.p3t; $("#p3d").textContent = d.p3d;
    $("#p4t").textContent = d.p4t; $("#p4d").textContent = d.p4d;

    $("#cta2").textContent = d.cta2;

    $("#name").placeholder = d.phName;
    $("#message").placeholder = d.phMsg;

    $("#wt").textContent = d.wt; $("#wp").textContent = d.wp;
    $("#w1h").textContent = d.w1h; $("#w1p").textContent = d.w1p;
    $("#w2h").textContent = d.w2h; $("#w2p").textContent = d.w2p;
    $("#w3h").textContent = d.w3h; $("#w3p").textContent = d.w3p;

    $("#ct").textContent = d.ct; $("#cp").textContent = d.cp;
    $("#cfh").textContent = d.cfh;
    $("#ln").textContent = d.ln;
    $("#lm").textContent = d.lm;
    $("#hint").textContent = d.hint;
    $("#sendBtn").textContent = d.sendBtn;

    $("#cinfo").textContent = d.cinfo;
    $("#cdesc").innerHTML = d.cdesc;

    $("#ci1").textContent = d.ci1; $("#ci1v").textContent = d.ci1v;
    $("#ci2").textContent = d.ci2; $("#ci2v").textContent = d.ci2v;
    $("#ci3").textContent = d.ci3; $("#ci3v").textContent = d.ci3v;

    $("#scrollTop").textContent = d.scrollTop;

    // dropdown translate
    $("#lType").textContent = d.lType;
    $("#lMobile").textContent = d.lMobile;

    $("#typeOpt0").textContent = d.typeOpt0;
    $("#typeOpt1").textContent = d.typeOpt1;
    $("#typeOpt2").textContent = d.typeOpt2;
    $("#typeOpt3").textContent = d.typeOpt3;
    $("#typeOpt4").textContent = d.typeOpt4;

    $("#mOpt0").textContent = d.mOpt0;
    $("#mOpt1").textContent = d.mOpt1;
    $("#mOpt2").textContent = d.mOpt2;
    $("#mOpt3").textContent = d.mOpt3;

    setText("techBadge", d.techBadge);
    setText("followLabel", d.followLabel);

    syncProjectBadges(d);

    // align toast based on direction
    if (d.dir === "ltr") {
        toast.style.left = "auto";
        toast.style.right = "16px";
    } else {
        toast.style.right = "auto";
        toast.style.left = "16px";
    }

    showToast(lang === "ar" ? "تم التبديل للعربي ✅" : "Switched to English ✅");
}

$("#toggleDir").addEventListener("click", () => {
    applyLang(lang === "ar" ? "en" : "ar");
});

// Start AR
applyLang("ar");
// ===== Projects Data (Unlimited links + images + video) =====
const PROJECTS = {
    my_bills: {
        // وصف عام (fallback)
        desc: {
            ar: "نظام فواتير احترافي لإدارة العملاء والمنتجات والمديونات.",
            en: "A pro billing system for clients, products, and debts."
        },

        // ✅ روابط إضافية واحدة ثابتة لكل التابات
        extras: [
            {
                labelAr: "اطلب شغل 💼",
                labelEn: "Request a Project 💼",
                url: "#contact"
            },
            {
                labelAr: "تواصل واتساب 💚",
                labelEn: "WhatsApp 💚",
                url: "https://wa.me/201283713447"
            },
        ],

        // ✅ كل Tab هنا لوحده
        platforms: {
            mobile: {
                supported: false, // 👈 مش مدعوم => التاب Disabled
                desc: { ar: "نسخة الموبايل غير متاحة حالياً", en: "Phone not available yet." },
                video: null,
                images: [],
                downloads: [],
            },

            web: {
                supported: false, // 👈 مش مدعوم => التاب Disabled
                desc: { ar: "نسخة الويب غير متاحة حالياً.", en: "Web not available yet." },
                video: null,
                images: [],
                downloads: [],
            },

            desktop: {
                supported: true,
                desc: {
                    ar: "نسخة الديسكتوب لإدارة أسرع وتقارير أقوى.",
                    en: "Desktop build with faster admin and stronger reports."
                },
                video: { type: "youtube", youtubeId: "jAG28XExKj8" },
                images: []
                    .concat(
                        imgSeqPad("assets/project/my_bills/images/desktop/screens", 1, 11, "png", 2),
                        imgSeqPad("assets/project/my_bills/images/desktop/screens", 12, 12, "gif", 2),
                        imgSeqPad("assets/project/my_bills/images/desktop/screens", 13, 18, "png", 2),
                    ),

                downloads: [
                    { labelAr: "Windows", labelEn: "Windows", url: "https://apps.microsoft.com/detail/9NBT7PTJB24T?hl=ar-eg&gl=EG&ocid=pdpshare" },
                    { labelAr: "macOS", labelEn: "macOS", url: "" },
                ],
            },
        }
    }
};

// ✅ مولّد صور لو أسماء الصور 1.png, 2.png, 3.png...
function imgSeq(folder, from, to, ext = "png") {
    const out = [];
    for (let i = from; i <= to; i++) out.push(`${folder}/${i}.${ext}`);
    return out;
}
function imgSeqPad(folder, from, to, ext = "png", pad = 2) {
    const out = [];
    for (let i = from; i <= to; i++) {
        const n = String(i).padStart(pad, "0");
        out.push(`${folder}/${n}.${ext}`);
    }
    return out;
}

const tlinksTitle = $("#tlinksTitle");
const textraTitle = $("#textraTitle");
const tmodalTabs = $("#tmodalTabs");

let currentPlatform = null;
let currentProjectData = null;

const PLATFORM_ORDER = [
    { key: "mobile", icon: "📱", ar: "موبايل", en: "Mobile" },
    { key: "desktop", icon: "🖥️", ar: "ديسكتوب", en: "Desktop" },
    { key: "web", icon: "🌐", ar: "ويب", en: "Web" },
];

function isSupported(p) {
    if (!p) return false;
    if (p.supported === false) return false;
    // لو مفيش ولا فيديو ولا صور ولا روابط تحميل، اعتبره غير مدعوم
    const hasMedia = !!p.video || (p.images && p.images.length);
    const hasDownloads = p.downloads && p.downloads.some(x => x?.url);
    return hasMedia || hasDownloads || !!p.desc;
}

function buildTabs(projectData) {
    if (!tmodalTabs) return;

    tmodalTabs.innerHTML = "";

    let supportedCount = 0;

    PLATFORM_ORDER.forEach((pl) => {
        const pdata = projectData?.platforms?.[pl.key];
        const ok = isSupported(pdata);
        if (ok) supportedCount++;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ttab";
        btn.dataset.tab = pl.key;
        btn.role = "tab";
        btn.disabled = !ok;
        btn.setAttribute("aria-selected", "false");
        btn.innerHTML = `<span>${pl.icon}</span><span>${lang === "ar" ? pl.ar : pl.en}</span>`;

        btn.addEventListener("click", () => {
            if (btn.disabled) {
                showToast(lang === "ar" ? "غير مدعوم حالياً" : "Not supported yet");
                return;
            }
            selectPlatform(pl.key);
        });

        tmodalTabs.appendChild(btn);
    });

    // لو واحد بس مدعوم، اخفي التابات
    tmodalTabs.hidden = supportedCount <= 1;
}

function selectPlatform(key) {
    currentPlatform = key;

    // update selected UI
    tmodalTabs?.querySelectorAll(".ttab").forEach((b) => {
        b.setAttribute("aria-selected", b.dataset.tab === key ? "true" : "false");
    });

    const vis = currentProjectEl?.dataset?.vis || "";
    const stage = currentProjectEl?.dataset?.stage || "";

    const metaArBase = `${vis === "public" ? "عام" : "خاص"} • ${stage === "done" ? "جاهز" : "قيد التطوير"}`;
    const metaEnBase = `${vis === "public" ? "Public" : "Private"} • ${stage === "done" ? "Ready" : "In progress"}`;

    const plInfo = PLATFORM_ORDER.find(x => x.key === key);
    const plLabel = lang === "ar" ? plInfo?.ar : plInfo?.en;

    tMeta.textContent = (lang === "ar" ? `${metaArBase} • ${plLabel}` : `${metaEnBase} • ${plLabel}`);

    const pdata = currentProjectData?.platforms?.[key] || null;

    // desc: platform > project > card paragraph
    const fallbackCardDesc = currentProjectEl?.querySelector("p")?.textContent?.trim() || "—";
    tDesc.textContent =
        pdata?.desc?.[lang] ||
        currentProjectData?.desc?.[lang] ||
        fallbackCardDesc;

    renderVideo(pdata?.video);
    renderGallery(pdata?.images || []);

    // downloads (per tab)
    renderLinks(pdata?.downloads || [], tmodalLinks, true);

    // extras (shared واحدة)
    renderLinks(currentProjectData?.extras || [], textraLinks, false);

    // hide titles if empty
    const hasDownloads = (pdata?.downloads || []).some(x => x?.url);
    const hasExtras = (currentProjectData?.extras || []).some(x => x?.url);

    if (tlinksTitle) tlinksTitle.hidden = !hasDownloads;
    if (textraTitle) textraTitle.hidden = !hasExtras;
    if (textraLinks) textraLinks.hidden = !hasExtras;
}

function renderProjectModal(projectEl) {
    const key = projectEl.dataset.project;
    currentProjectData = PROJECTS[key] || null;

    const title = projectEl.querySelector("h4")?.textContent?.trim() || "—";
    tTitle.textContent = title;

    buildTabs(currentProjectData);

    // default tab: أول واحدة مدعومة
    const firstSupported =
        PLATFORM_ORDER.map(x => x.key).find(k => isSupported(currentProjectData?.platforms?.[k])) || "mobile";

    // لو كنت فاتح مودال وبدلت لغة، خليك على نفس التاب لو مدعوم
    const startKey = isSupported(currentProjectData?.platforms?.[currentPlatform]) ? currentPlatform : firstSupported;

    selectPlatform(startKey);
}
const tmodal = document.getElementById("tmodal");
const tTitle = document.getElementById("tmodalTitle");
const tMeta = document.getElementById("tmodalMeta");
const tDesc = document.getElementById("tmodalDesc");

const tvideoWrap = document.getElementById("tvideoWrap");
const tgalleryWrap = document.getElementById("tgalleryWrap");
const tmainImg = document.getElementById("tmainImg");
const tthumbs = document.getElementById("tthumbs");

const tmodalLinks = document.getElementById("tmodalLinks");
const textraLinks = document.getElementById("textraLinks");

let currentProjectEl = null;
function extractYouTubeId(val) {
    if (!val) return null;
    const m = val.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))?([^?&]+)/);
    return m ? m[1] : null;
}

function renderVideo(videoObj) {
    tvideoWrap.innerHTML = "";
    if (!videoObj) { tvideoWrap.hidden = true; return; }

    tvideoWrap.hidden = false;

    // YouTube
    if (videoObj.youtubeId) {
        const id = extractYouTubeId(videoObj.youtubeId);
        if (!id) return;

        const params = new URLSearchParams({
            controls: "0",
            fs: "0",
            modestbranding: "1",
            rel: "0",
            iv_load_policy: "3",
            disablekb: "1",
            playsinline: "1",
        });

        tvideoWrap.innerHTML = `
    <div class="ratio">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${id}?${params.toString()}"
        title="Project video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  `;
        return;
    }


    // MP4 / WebM
    if (videoObj.mp4Url) {
        const v = document.createElement("video");
        v.controls = true;
        v.src = videoObj.mp4Url;
        v.playsInline = true;
        tvideoWrap.appendChild(Object.assign(document.createElement("div"), { className: "ratio" })).appendChild(v);
        return;
    }

    tvideoWrap.hidden = true;
}

function renderGallery(images = []) {
    tthumbs.innerHTML = "";

    if (!images || images.length === 0) {
        tgalleryWrap.hidden = true;
        return;
    }

    tgalleryWrap.hidden = false;
    tmainImg.src = images[0];

    images.forEach((src, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", "Screenshot " + (idx + 1));

        const img = document.createElement("img");
        img.src = src;

        btn.appendChild(img);
        btn.addEventListener("click", () => { tmainImg.src = src; });

        tthumbs.appendChild(btn);
    });
}

function renderLinks(list = [], container, asButtons = false) {
    container.innerHTML = "";

    const filtered = (list || []).filter(x => x?.url);
    if (filtered.length === 0) return;

    filtered.forEach((lnk) => {
        const a = document.createElement("a");
        a.href = lnk.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = (lang === "ar" ? lnk.labelAr : lnk.labelEn);

        if (asButtons) a.className = "btn primary";

        // ✅ لو لينك داخلي زي #contact => اقفل المودال وروّح للقسم
        if (lnk.url && lnk.url.startsWith("#")) {
            a.target = ""; // مهم: ما تفتحش تبويب جديد
            a.rel = "";

            a.addEventListener("click", (e) => {
                e.preventDefault();

                closeProjectModal(); // ✅ اقفل الديالوج

                // ✅ بعد ما يقفل ويرجع السكرول طبيعي، انزل للقسم
                requestAnimationFrame(() => {
                    const el = document.querySelector(lnk.url);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            });
        }

        container.appendChild(a);
    });
}


function openProjectModal(projectEl) {
    currentProjectEl = projectEl;

    renderProjectModal(projectEl);

    tmodal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => tmodal.classList.add("show"));
}

function closeProjectModal() {
    tmodal.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => (tmodal.hidden = true), 150);
    currentProjectEl = null;
}

// click any project opens modal
document.querySelectorAll(".project").forEach((p) => {
    p.tabIndex = 0;
    p.addEventListener("click", () => openProjectModal(p));
    p.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProjectModal(p);
        }
    });
});

// close modal by clicking backdrop/close
tmodal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
    if (!tmodal.hidden && e.key === "Escape") closeProjectModal();
});

// ✅ لو المستخدم بدّل لغة والديالوج مفتوح: اعمل تحديث
// حط السطرين دول في آخر applyLang(next) قبل showToast أو بعدها:
$("#toggleDir").addEventListener("click", () => {
    applyLang(lang === "ar" ? "en" : "ar");
    if (!tmodal.hidden && currentProjectEl) renderProjectModal(currentProjectEl);
});
