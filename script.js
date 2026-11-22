/* =========================================================
   Transit Hub Malaysia — application logic
   Shared by index.html (cardholder portal) and admin.html.
   Requires fares.js to be loaded first.
   ========================================================= */

// ---------- Translations ----------
const translations = {
    en: {
        appTitle: "Transit Hub", navPortal: "My Card", navFares: "Fare Calculator", navFeatures: "Features", adminPanel: "Admin",
        heroEyebrow: "Live simulator · Klang Valley rail", landingTitle: "Your physical card,", landingTitle2: "now fully online.",
        landingSub: "Register your non-NFC Touch 'n Go or concession card to reload, transfer balance, tap through gates and download receipts without queueing at a kiosk.",
        regBtn: "Register card", ctaFare: "Check a fare", statStationsLbl: "stations covered", statLinesLbl: "LRT, MRT & Monorail lines", statConcLbl: "concession discount",
        loginBtn: "Sign in", regTabText: "Register", modalLoginTitle: "Welcome back", loginSubText: "Sign in with your card number and 4-digit PIN.",
        lblLoginCardNo: "Card number", lblLoginPin: "4-digit PIN", btnLoginSubmit: "Sign in", secureNote: "Your data stays in this browser.",
        modalRegTitle: "Register your card", regSubText: "Link a physical card in under a minute.", lblCardNo: "Card number (printed on the back)",
        lblHolder: "Holder name", lblPhone: "Phone number", lblPin: "4-digit PIN", lblCategory: "Category / concession", btnNextOtp: "Continue to verification",
        logoutBtnText: "Sign out / switch card", balanceLabelText: "Balance", reloadActionBtn: "Reload", transferActionBtn: "Transfer", gateTapActionBtn: "Tap gate",
        blockCardBtn: "Report lost", totalReloadedLabel: "Total reloaded", tripsLabel: "Trips", spentLabel: "Spent on fares",
        contactTitleText: "Need help?", contactSub: "Our support team replies within one working day.",
        txHistoryTitle: "Transaction history", pdfBtnText: "PDF statement", optAll: "All types", optReload: "Reloads", optTransfer: "Transfers", optFare: "Gate fares", optAdjust: "Adjustments", optPass: "Passes",
        noTxText: "No transactions yet.",
        fcEyebrow: "Fare calculator", fcTitle: "Any station to any station",
        fcSub: "Every LRT, MRT and Monorail station in the Klang Valley. Pick a start and end point to see the fare, route, changes and travel time.",
        fcFromLbl: "From", fcToLbl: "To", fcCatLbl: "Passenger type", fcCatHint: "Students, seniors and OKU pay 50% with a registered concession card.",
        featTitle: "Everything a kiosk does, from your phone", featSub: "Built for students, seniors and OKU cardholders who rely on physical cards.",
        f1t: "Instant reload", f1d: "Top up with DuitNow QR, FPX online banking or a debit / credit card.",
        f2t: "Card-to-card transfer", f2d: "Parents can send balance straight to a child's student card.",
        f3t: "Concession fares", f3d: "Student, senior and OKU cards are charged 50% automatically at the gate.",
        f4t: "PDF receipts", f4d: "Download a slip for any trip or a full statement for allowance claims.",
        footNote: "A student simulator. Not affiliated with Prasarana, Rapid KL or Touch 'n Go.",
        modalOtpTitle: "Verify your phone", lblEnterOtp: "Enter 4-digit code", btnVerifyAct: "Verify & activate",
        modalReloadTitle: "Reload card", reloadSub: "Maximum card balance is RM 1,500.00.", lblGateway: "Payment method", lblAmount: "Amount", btnConfirmTopup: "Confirm top-up",
        modalTransferTitle: "Card-to-card transfer", transferSub: "Minimum RM 5.00. You'll confirm with your PIN.", lblTargetCard: "Recipient card number",
        lblTransferAmount: "Amount (RM)", lblTransferPin: "Your PIN", btnTransferConfirm: "Transfer funds",
       
        lblStdFare: "Standard fare", btnTapPay: "Tap out & pay",
        _youPay: "Estimated fare", _was: "Standard", _conc: "50% concession", _distance: "Distance", _stops: "Stops", _changes: "Changes", _time: "Time",
        _change: "Change here", _same: "Pick two different stations.", _stopsN: "stops", _toward: "to",
        _est: "Estimate from a distance-based model of Rapid KL card fares. The gate's actual fare may differ by a few sen. KTM, ERL and BRT are not included.",
        _morning: "Good morning", _afternoon: "Good afternoon", _evening: "Good evening", _std: "Standard rate", _concRate: "50% concession",
        passActionBtn: "30-day pass", autoActionBtn: "Auto reload", forgotPinLink: "Forgot PIN?",
        monthTitle: "This month", monthSub: "Spending on fares, last 6 months", mFareLbl: "Fares", mReloadLbl: "Reloads", mTripsLbl: "Trips", mSavedLbl: "Concession saved",
        savedRoutesLbl: "Saved routes", installBtnText: "Install app", btnTapIn: "Tap in", lblTapFrom: "Entry station", lblTapTo: "Exit station",
        gateInSub: "You need at least RM 1.00 to enter the paid area.", forgotTapOut: "Forgot to tap out? Close this trip (penalty fare)",
        _tapInTitle: "Tap in at the gate", _tapOutTitle: "Tap out at the gate", _onTrip: "On a trip", _enteredAt: "Entered at", _lowBal: "Low balance",
        _lowBalText: "Top up before your next trip.", _reloadNow: "Reload now", _passActive: "30-day pass active", _daysLeft: "days left", _saveRoute: "Save route", _savedRoute: "Saved", _tapOutNow: "Tap out",
        _free: "Covered by pass"
    },
    ms: {
        appTitle: "Hab Transit", navPortal: "Kad Saya", navFares: "Kalkulator Tambang", navFeatures: "Ciri-ciri", adminPanel: "Admin",
        heroEyebrow: "Simulator langsung · Rel Lembah Klang", landingTitle: "Kad fizikal anda,", landingTitle2: "kini sepenuhnya dalam talian.",
        landingSub: "Daftar kad Touch 'n Go bukan NFC atau kad konsesi anda untuk tambah nilai, pindah baki, melalui pintu tambang dan muat turun resit tanpa beratur di kiosk.",
        regBtn: "Daftar kad", ctaFare: "Semak tambang", statStationsLbl: "stesen diliputi", statLinesLbl: "laluan LRT, MRT & Monorel", statConcLbl: "diskaun konsesi",
        loginBtn: "Log masuk", regTabText: "Daftar", modalLoginTitle: "Selamat kembali", loginSubText: "Log masuk dengan nombor kad dan PIN 4 digit.",
        lblLoginCardNo: "Nombor kad", lblLoginPin: "PIN 4 digit", btnLoginSubmit: "Log masuk", secureNote: "Data anda kekal dalam pelayar ini.",
        modalRegTitle: "Daftar kad anda", regSubText: "Pautkan kad fizikal dalam masa kurang seminit.", lblCardNo: "Nombor kad (di belakang kad)",
        lblHolder: "Nama pemegang", lblPhone: "Nombor telefon", lblPin: "PIN 4 digit", lblCategory: "Kategori / konsesi", btnNextOtp: "Teruskan ke pengesahan",
        logoutBtnText: "Log keluar / tukar kad", balanceLabelText: "Baki", reloadActionBtn: "Tambah nilai", transferActionBtn: "Pindah", gateTapActionBtn: "Tap pintu",
        blockCardBtn: "Lapor hilang", totalReloadedLabel: "Jumlah tambah nilai", tripsLabel: "Perjalanan", spentLabel: "Belanja tambang",
        contactTitleText: "Perlukan bantuan?", contactSub: "Pasukan sokongan kami membalas dalam satu hari bekerja.",
        txHistoryTitle: "Sejarah transaksi", pdfBtnText: "Penyata PDF", optAll: "Semua jenis", optReload: "Tambah nilai", optTransfer: "Pindahan", optFare: "Tambang pintu", optAdjust: "Pelarasan", optPass: "Pas",
        noTxText: "Tiada transaksi lagi.",
        fcEyebrow: "Kalkulator tambang", fcTitle: "Mana-mana stesen ke mana-mana stesen",
        fcSub: "Setiap stesen LRT, MRT dan Monorel di Lembah Klang. Pilih titik mula dan akhir untuk melihat tambang, laluan, pertukaran dan masa perjalanan.",
        fcFromLbl: "Dari", fcToLbl: "Ke", fcCatLbl: "Jenis penumpang", fcCatHint: "Pelajar, warga emas dan OKU membayar 50% dengan kad konsesi berdaftar.",
        featTitle: "Semua fungsi kiosk, dari telefon anda", featSub: "Dibina untuk pelajar, warga emas dan pemegang kad OKU yang bergantung pada kad fizikal.",
        f1t: "Tambah nilai segera", f1d: "Tambah nilai dengan DuitNow QR, perbankan dalam talian FPX atau kad debit / kredit.",
        f2t: "Pindahan kad ke kad", f2d: "Ibu bapa boleh menghantar baki terus ke kad pelajar anak.",
        f3t: "Tambang konsesi", f3d: "Kad pelajar, warga emas dan OKU dicaj 50% secara automatik di pintu.",
        f4t: "Resit PDF", f4d: "Muat turun slip untuk sebarang perjalanan atau penyata penuh untuk tuntutan elaun.",
        footNote: "Simulator pelajar. Tiada kaitan dengan Prasarana, Rapid KL atau Touch 'n Go.",
        modalOtpTitle: "Sahkan telefon anda", lblEnterOtp: "Masukkan kod 4 digit", btnVerifyAct: "Sahkan & aktifkan",
        modalReloadTitle: "Tambah nilai kad", reloadSub: "Baki maksimum kad ialah RM 1,500.00.", lblGateway: "Kaedah pembayaran", lblAmount: "Jumlah", btnConfirmTopup: "Sahkan tambah nilai",
        modalTransferTitle: "Pindahan kad ke kad", transferSub: "Minimum RM 5.00. Sahkan dengan PIN anda.", lblTargetCard: "Nombor kad penerima",
        lblTransferAmount: "Jumlah (RM)", lblTransferPin: "PIN anda", btnTransferConfirm: "Pindahkan dana",
       
        lblStdFare: "Tambang biasa", btnTapPay: "Tap keluar & bayar",
        _youPay: "Anggaran tambang", _was: "Biasa", _conc: "Konsesi 50%", _distance: "Jarak", _stops: "Hentian", _changes: "Pertukaran", _time: "Masa",
        _change: "Tukar di sini", _same: "Pilih dua stesen yang berbeza.", _stopsN: "hentian", _toward: "ke",
        _est: "Anggaran berdasarkan model jarak tambang kad Rapid KL. Tambang sebenar di pintu mungkin berbeza beberapa sen. KTM, ERL dan BRT tidak termasuk.",
        _morning: "Selamat pagi", _afternoon: "Selamat petang", _evening: "Selamat malam", _std: "Kadar biasa", _concRate: "Konsesi 50%",
        passActionBtn: "Pas 30 hari", autoActionBtn: "Tambah nilai auto", forgotPinLink: "Lupa PIN?",
        monthTitle: "Bulan ini", monthSub: "Perbelanjaan tambang, 6 bulan lepas", mFareLbl: "Tambang", mReloadLbl: "Tambah nilai", mTripsLbl: "Perjalanan", mSavedLbl: "Jimat konsesi",
        savedRoutesLbl: "Laluan disimpan", installBtnText: "Pasang aplikasi", btnTapIn: "Tap masuk", lblTapFrom: "Stesen masuk", lblTapTo: "Stesen keluar",
        gateInSub: "Anda perlukan sekurang-kurangnya RM 1.00 untuk masuk ke kawasan berbayar.", forgotTapOut: "Terlupa tap keluar? Tutup perjalanan ini (tambang penalti)",
        _tapInTitle: "Tap masuk di pintu", _tapOutTitle: "Tap keluar di pintu", _onTrip: "Dalam perjalanan", _enteredAt: "Masuk di", _lowBal: "Baki rendah",
        _lowBalText: "Tambah nilai sebelum perjalanan seterusnya.", _reloadNow: "Tambah nilai", _passActive: "Pas 30 hari aktif", _daysLeft: "hari lagi", _saveRoute: "Simpan laluan", _savedRoute: "Disimpan", _tapOutNow: "Tap keluar",
        _free: "Ditanggung pas"
    },
    bn: {
        appTitle: "ট্রানজিট হাব", navPortal: "আমার কার্ড", navFares: "ভাড়া ক্যালকুলেটর", navFeatures: "ফিচার", adminPanel: "অ্যাডমিন",
        heroEyebrow: "লাইভ সিমুলেটর · ক্লাং ভ্যালি রেল", landingTitle: "আপনার ফিজিক্যাল কার্ড,", landingTitle2: "এখন সম্পূর্ণ অনলাইনে।",
        landingSub: "রিলোড, ব্যালেন্স ট্রান্সফার, গেট ট্যাপ এবং রসিদ ডাউনলোড করতে আপনার নন-NFC টাচ 'এন গো বা কনসেশন কার্ড রেজিস্টার করুন। কিয়স্কে লাইনে দাঁড়াতে হবে না।",
        regBtn: "কার্ড রেজিস্টার", ctaFare: "ভাড়া দেখুন", statStationsLbl: "স্টেশন", statLinesLbl: "এলআরটি, এমআরটি ও মনোরেল লাইন", statConcLbl: "কনসেশন ছাড়",
        loginBtn: "সাইন ইন", regTabText: "রেজিস্টার", modalLoginTitle: "আবার স্বাগতম", loginSubText: "কার্ড নম্বর ও ৪-সংখ্যার পিন দিয়ে সাইন ইন করুন।",
        lblLoginCardNo: "কার্ড নম্বর", lblLoginPin: "৪-সংখ্যার পিন", btnLoginSubmit: "সাইন ইন", secureNote: "আপনার তথ্য এই ব্রাউজারেই থাকে।",
        modalRegTitle: "আপনার কার্ড রেজিস্টার করুন", regSubText: "এক মিনিটের মধ্যে ফিজিক্যাল কার্ড যুক্ত করুন।", lblCardNo: "কার্ড নম্বর (পেছনে ছাপা)",
        lblHolder: "ধারকের নাম", lblPhone: "ফোন নম্বর", lblPin: "৪-সংখ্যার পিন", lblCategory: "ক্যাটাগরি / কনসেশন", btnNextOtp: "যাচাইয়ে এগিয়ে যান",
        logoutBtnText: "সাইন আউট / কার্ড বদল", balanceLabelText: "ব্যালেন্স", reloadActionBtn: "রিলোড", transferActionBtn: "ট্রান্সফার", gateTapActionBtn: "গেট ট্যাপ",
        blockCardBtn: "হারানো রিপোর্ট", totalReloadedLabel: "মোট রিলোড", tripsLabel: "ট্রিপ", spentLabel: "ভাড়ায় খরচ",
        contactTitleText: "সাহায্য দরকার?", contactSub: "আমাদের সাপোর্ট টিম এক কর্মদিবসের মধ্যে উত্তর দেয়।",
        txHistoryTitle: "লেনদেনের ইতিহাস", pdfBtnText: "পিডিএফ স্টেটমেন্ট", optAll: "সব ধরন", optReload: "রিলোড", optTransfer: "ট্রান্সফার", optFare: "গেট ভাড়া", optAdjust: "সমন্বয়", optPass: "পাস",
        noTxText: "কোনো লেনদেন নেই।",
        fcEyebrow: "ভাড়া ক্যালকুলেটর", fcTitle: "যেকোনো স্টেশন থেকে যেকোনো স্টেশন",
        fcSub: "ক্লাং ভ্যালির প্রতিটি এলআরটি, এমআরটি ও মনোরেল স্টেশন। ভাড়া, রুট, লাইন বদল ও সময় দেখতে শুরু ও শেষ স্টেশন বেছে নিন।",
        fcFromLbl: "থেকে", fcToLbl: "পর্যন্ত", fcCatLbl: "যাত্রীর ধরন", fcCatHint: "নিবন্ধিত কনসেশন কার্ডে শিক্ষার্থী, প্রবীণ ও ওকেইউ যাত্রীরা ৫০% ভাড়া দেন।",
        featTitle: "কিয়স্কের সব কাজ, আপনার ফোন থেকে", featSub: "ফিজিক্যাল কার্ডের উপর নির্ভরশীল শিক্ষার্থী, প্রবীণ ও ওকেইউ কার্ডধারীদের জন্য তৈরি।",
        f1t: "তাৎক্ষণিক রিলোড", f1d: "ডুইটনাউ কিউআর, এফপিএক্স অনলাইন ব্যাংকিং বা ডেবিট / ক্রেডিট কার্ডে টপ আপ করুন।",
        f2t: "কার্ড থেকে কার্ডে ট্রান্সফার", f2d: "অভিভাবকরা সরাসরি সন্তানের স্টুডেন্ট কার্ডে ব্যালেন্স পাঠাতে পারেন।",
        f3t: "কনসেশন ভাড়া", f3d: "শিক্ষার্থী, প্রবীণ ও ওকেইউ কার্ডে গেটে স্বয়ংক্রিয়ভাবে ৫০% ভাড়া কাটা হয়।",
        f4t: "পিডিএফ রসিদ", f4d: "যেকোনো ট্রিপের স্লিপ বা ভাতা দাবির জন্য পূর্ণ স্টেটমেন্ট ডাউনলোড করুন।",
        footNote: "একটি শিক্ষার্থী সিমুলেটর। প্রাসারানা, র‍্যাপিড কেএল বা টাচ 'এন গো-র সাথে সম্পর্কিত নয়।",
        modalOtpTitle: "আপনার ফোন যাচাই করুন", lblEnterOtp: "৪-সংখ্যার কোড দিন", btnVerifyAct: "যাচাই ও সক্রিয় করুন",
        modalReloadTitle: "কার্ড রিলোড", reloadSub: "কার্ডে সর্বোচ্চ ব্যালেন্স RM 1,500.00।", lblGateway: "পেমেন্ট পদ্ধতি", lblAmount: "পরিমাণ", btnConfirmTopup: "টপ-আপ নিশ্চিত করুন",
        modalTransferTitle: "কার্ড থেকে কার্ডে ট্রান্সফার", transferSub: "সর্বনিম্ন RM 5.00। পিন দিয়ে নিশ্চিত করবেন।", lblTargetCard: "প্রাপকের কার্ড নম্বর",
        lblTransferAmount: "পরিমাণ (RM)", lblTransferPin: "আপনার পিন", btnTransferConfirm: "ফান্ড ট্রান্সফার করুন",
       
        lblStdFare: "সাধারণ ভাড়া", btnTapPay: "ট্যাপ আউট ও পরিশোধ",
        _youPay: "আনুমানিক ভাড়া", _was: "সাধারণ", _conc: "৫০% কনসেশন", _distance: "দূরত্ব", _stops: "স্টপ", _changes: "লাইন বদল", _time: "সময়",
        _change: "এখানে লাইন বদলান", _same: "দুটি আলাদা স্টেশন বেছে নিন।", _stopsN: "স্টপ", _toward: "পর্যন্ত",
        _est: "র‍্যাপিড কেএল কার্ড ভাড়ার দূরত্বভিত্তিক মডেল থেকে আনুমানিক হিসাব। গেটের প্রকৃত ভাড়া কয়েক সেন আলাদা হতে পারে। কেটিএম, ইআরএল ও বিআরটি অন্তর্ভুক্ত নয়।",
        _morning: "সুপ্রভাত", _afternoon: "শুভ অপরাহ্ন", _evening: "শুভ সন্ধ্যা", _std: "সাধারণ রেট", _concRate: "৫০% কনসেশন",
        passActionBtn: "৩০ দিনের পাস", autoActionBtn: "অটো রিলোড", forgotPinLink: "পিন ভুলে গেছেন?",
        monthTitle: "এই মাস", monthSub: "ভাড়ায় খরচ, গত ৬ মাস", mFareLbl: "ভাড়া", mReloadLbl: "রিলোড", mTripsLbl: "ট্রিপ", mSavedLbl: "কনসেশনে সাশ্রয়",
        savedRoutesLbl: "সংরক্ষিত রুট", installBtnText: "অ্যাপ ইনস্টল", btnTapIn: "ট্যাপ ইন", lblTapFrom: "প্রবেশ স্টেশন", lblTapTo: "বাহির স্টেশন",
        gateInSub: "পেইড এলাকায় ঢুকতে কমপক্ষে RM 1.00 প্রয়োজন।", forgotTapOut: "ট্যাপ আউট করতে ভুলে গেছেন? ট্রিপ বন্ধ করুন (জরিমানা ভাড়া)",
        _tapInTitle: "গেটে ট্যাপ ইন", _tapOutTitle: "গেটে ট্যাপ আউট", _onTrip: "যাত্রায় আছেন", _enteredAt: "প্রবেশ", _lowBal: "কম ব্যালেন্স",
        _lowBalText: "পরের ট্রিপের আগে টপ আপ করুন।", _reloadNow: "এখন রিলোড", _passActive: "৩০ দিনের পাস সক্রিয়", _daysLeft: "দিন বাকি", _saveRoute: "রুট সংরক্ষণ", _savedRoute: "সংরক্ষিত", _tapOutNow: "ট্যাপ আউট",
        _free: "পাসে অন্তর্ভুক্ত"
    }
};

let currentLang = "en";

// ---------- Config ----------
const ADMIN_IDS = ["admin@transit.my", "+601112215903"];
const DEFAULT_ADMIN_PASS = "admin123";
const MAX_BALANCE = 1500;
const PAGE_SIZE = 10;
const LOW_BALANCE = 5;
const MIN_ENTRY_BALANCE = 1;
const MAX_TRIP_HOURS = 3;
const PASS = { days: 30, standard: 50, concession: 25 };

// ---------- Helpers ----------
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = n => "RM " + Number(n || 0).toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = n => Math.round(n * 100) / 100;
const fmtDate = d => { if (!d) return ""; const x = new Date(d); return isNaN(x) ? String(d) : x.toLocaleString("en-MY", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); };
const nowISO = () => new Date().toISOString();

// ---------- SHA-256 (sync, no dependencies) for PIN hashing ----------
function sha256(ascii) {
    const rotr = (v, n) => (v >>> n) | (v << (32 - n));
    const K = [], H = [];
    let p = 2;
    for (let found = 0; found < 64; p++) {
        let prime = true;
        for (let f = 2; f * f <= p; f++) if (p % f === 0) { prime = false; break; }
        if (!prime) continue;
        if (found < 8) H[found] = (Math.pow(p, 1 / 2) * 4294967296) | 0;
        K[found++] = (Math.pow(p, 1 / 3) * 4294967296) | 0;
    }
    const bytes = Array.from(new TextEncoder().encode(ascii));
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (bitLen >>> (i * 8)) & 255);
    const h = H.slice(0, 8);
    for (let i = 0; i < bytes.length; i += 64) {
        const w = [];
        for (let j = 0; j < 16; j++) w[j] = (bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3];
        for (let j = 16; j < 64; j++) {
            const s0 = rotr(w[j - 15], 7) ^ rotr(w[j - 15], 18) ^ (w[j - 15] >>> 3);
            const s1 = rotr(w[j - 2], 17) ^ rotr(w[j - 2], 19) ^ (w[j - 2] >>> 10);
            w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let j = 0; j < 64; j++) {
            const t1 = (hh + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[j] + w[j]) | 0;
            const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
            hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        [a, b, c, d, e, f, g, hh].forEach((v, k) => h[k] = (h[k] + v) | 0);
    }
    return h.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
}
// Salted with the card number so identical PINs give different hashes
const pinHashFor = (cardNo, pin) => sha256("transit-hub:" + String(cardNo).toLowerCase() + ":" + String(pin));
const checkPin = (card, pin) => !!card && card.pinHash === pinHashFor(card.cardNumber, pin);

// One-time upgrade of older records that still hold a plain-text PIN
function migratePins() {
    let raw;
    try { raw = JSON.parse(localStorage.getItem("all_transit_cards")); } catch (e) { return; }
    if (!Array.isArray(raw)) return;
    let changed = false;
    raw.forEach(c => {
        if (c && c.pin !== undefined) {
            if (!c.pinHash) c.pinHash = pinHashFor(c.cardNumber, c.pin);
            delete c.pin;
            changed = true;
        }
    });
    if (changed) localStorage.setItem("all_transit_cards", JSON.stringify(raw));
}
const T = key => (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
const ICON = (name, cls = "ic") => `<svg class="${cls}"><use href="#i-${name}"/></svg>`;
const isAdminPage = () => !!$("adminDashboardContainer");

function showToast(msg, type = "info") {
    let box = $("toastContainer");
    if (!box) { box = document.createElement("div"); box.id = "toastContainer"; box.setAttribute("role", "status"); document.body.appendChild(box); }
    const el = document.createElement("div");
    el.className = "toast toast-" + type;
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => { el.classList.add("hide"); setTimeout(() => el.remove(), 300); }, 3200);
}

// ---------- Icon sprite ----------
function mountIcons() {
    if ($("iconSprite")) return;
    const p = {
        train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l1.5-4M15 21l-1.5-4M9 7h6"/><circle cx="8.5" cy="14" r=".6"/><circle cx="15.5" cy="14" r=".6"/>',
        bus: '<rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 10h16M7 21v-4M17 21v-4"/>',
        card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
        lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
        shield: '<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8.2-7.5 9.5-4.3-1.3-7.5-5-7.5-9.5V6z"/><path d="M9 12l2 2 4-4"/>',
        plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
        transfer: '<path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/>',
        gate: '<path d="M4 21V5a2 2 0 0 1 2-2h3v18M15 21V3h3a2 2 0 0 1 2 2v16M9 12h6"/>',
        logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>',
        download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 20h14"/>',
        upload: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5M5 20h14"/>',
        search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
        swap: '<path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"/>',
        route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
        moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
        receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3"/>',
        percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
        chat: '<path d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',
        mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
        qr: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM18 14h2.5M14 18v2.5"/>',
        bank: '<path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
        chart: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
        users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
        list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
        settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
        wallet: '<path d="M4 7a2 2 0 0 1 2-2h11v4"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 13.5h2"/>',
        file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
        key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2.5 2.5M14.5 8.5L16 10"/>',
        info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
        tool: '<path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12"/>',
        star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
        bolt: '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>',
        phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18h2"/>'
    };
    const svg = `<svg id="iconSprite" xmlns="http://www.w3.org/2000/svg" style="display:none">${Object.entries(p).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join("")}</svg>`;
    document.body.insertAdjacentHTML("afterbegin", svg);
}

// ---------- Animated background scene ----------
function mountScene() {
    const host = $("scene");
    if (!host || host.dataset.ready) return;
    host.dataset.ready = "1";
    let seed = 7;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const W = 1600, BASE = 470;
    let out = "";

    // stars
    out += `<g class="px" data-depth="0.03">`;
    for (let i = 0; i < 60; i++) out += `<circle class="star" cx="${(rnd() * W).toFixed(0)}" cy="${(rnd() * 260).toFixed(0)}" r="${(rnd() * 1.4 + .4).toFixed(1)}" style="animation-delay:${(rnd() * 4).toFixed(1)}s"/>`;
    // clouds
    [[120, 120, 1], [700, 70, .8], [1250, 150, 1.2]].forEach(([x, y, s], i) => {
        out += `<g class="cloud" style="animation-delay:-${i * 30}s"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="70" ry="18"/><ellipse cx="35" cy="-12" rx="40" ry="18"/><ellipse cx="-30" cy="-8" rx="32" ry="14"/></g></g>`;
    });
    out += `</g><g class="px" data-depth="0.12">`;
    // far skyline
    let x = -20;
    while (x < W) {
        const w = 40 + rnd() * 70, h = 120 + rnd() * 200;
        out += `<rect class="city-far" x="${x.toFixed(0)}" y="${(BASE - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}"/>`;
        if (rnd() > .8) out += `<rect class="city-far" x="${(x + w / 2 - 2).toFixed(0)}" y="${(BASE - h - 40).toFixed(0)}" width="4" height="40"/>`;
        x += w + 4;
    }
    // landmark-style tall towers (generic)
    out += `<path class="city-far" d="M1140 470V170l18-30 18 30v300zM1200 470V170l18-30 18 30v300zM1176 260h24v12h-24z"/>`;
    out += `<path class="city-far" d="M380 470V200h6v-60h4v60h6v270zM372 205h32l-6-14h-20z"/>`;
    out += `</g><g class="px" data-depth="0.06">`;
    // near skyline with windows
    x = -10;
    while (x < W) {
        const w = 60 + rnd() * 80, h = 50 + rnd() * 140;
        const top = BASE - h;
        out += `<rect class="city-near" x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="2"/>`;
        for (let wy = top + 12; wy < BASE - 14; wy += 16) {
            for (let wx = x + 8; wx < x + w - 10; wx += 14) {
                if (rnd() > .55) out += `<rect class="win${rnd() > .93 ? " blink" : ""}" x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="6" height="8" style="animation-delay:${(rnd() * 6).toFixed(1)}s"/>`;
            }
        }
        x += w + 10 + rnd() * 30;
    }
    out += `</g>`;

    const trainCar = (cx, stripe, front, back) => {
        let g = `<rect x="${cx}" y="0" width="196" height="44" rx="${front || back ? 14 : 6}" fill="#e9eef7"/>`;
        g += `<rect x="${cx}" y="30" width="196" height="6" fill="${stripe}"/>`;
        for (let i = 0; i < 6; i++) g += `<rect x="${cx + 18 + i * 28}" y="9" width="20" height="14" rx="3" fill="#1d2b4f"/>`;
        if (front) g += `<path d="M${cx + 176} 4h10a10 10 0 0 1 10 10v12h-20z" fill="#1d2b4f"/><circle cx="${cx + 192}" cy="34" r="3" fill="#fff7c2"/>`;
        return g;
    };
    const train = (stripe, n) => {
        let g = "";
        for (let i = 0; i < n; i++) g += trainCar(i * 200, stripe, i === n - 1, i === 0);
        return g;
    };

    // back track + train (smaller, heading left)
    out += `<rect class="track-beam" x="0" y="404" width="${W}" height="7" opacity=".7"/>`;
    out += `<g class="vehicle train-b"><g transform="translate(0 373) scale(.7)" opacity=".85">${train("#e3a700", 4)}</g></g>`;
    // front track
    for (let px = 40; px < W; px += 150) out += `<rect class="track-pillar" x="${px}" y="452" width="16" height="80"/>`;
    out += `<g class="vehicle train-a"><g transform="translate(0 396)">${train("#d50032", 3)}</g></g>`;
    out += `<rect class="track-beam" x="0" y="440" width="${W}" height="14" rx="2"/>`;
    // road
    out += `<rect class="road" x="0" y="520" width="${W}" height="80"/><line class="lane" x1="0" y1="560" x2="${W}" y2="560"/>`;
    // bus
    out += `<g class="vehicle bus-a"><g transform="translate(0 496)">
        <rect x="0" y="0" width="170" height="52" rx="10" fill="#f1f5f9"/>
        <rect x="0" y="34" width="170" height="8" fill="#ef4444"/>
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${12 + i * 28}" y="9" width="22" height="18" rx="3" fill="#1d2b4f"/>`).join("")}
        <rect x="152" y="9" width="14" height="24" rx="3" fill="#1d2b4f"/>
        <circle cx="38" cy="54" r="9" fill="#0b1020"/><circle cx="135" cy="54" r="9" fill="#0b1020"/>
        <circle cx="168" cy="44" r="3" fill="#fff7c2"/></g></g>`;
    // car (heading left)
    out += `<g class="vehicle car-a"><g transform="translate(0 548)">
        <path d="M10 22l14-14h40l16 14h12v16H0V22z" fill="#2dd4bf"/>
        <path d="M28 11h16v11H18zM48 11h14l12 11H48z" fill="#1d2b4f"/>
        <circle cx="22" cy="38" r="7" fill="#0b1020"/><circle cx="78" cy="38" r="7" fill="#0b1020"/>
        <circle cx="2" cy="28" r="2.5" fill="#fff7c2"/></g></g>`;

    host.innerHTML = `<div class="glow g1"></div><div class="glow g2"></div><svg viewBox="0 0 ${W} 600" preserveAspectRatio="xMidYMax slice">${out}</svg>`;
}

// ---------- Language & theme ----------
const ID_ALIASES = { adminPanel: "adminPanelText" };
const statusLabels = {
    en: { active: "Active", blocked: "Blocked" },
    ms: { active: "Aktif", blocked: "Disekat" },
    bn: { active: "সক্রিয়", blocked: "ব্লকড" }
};

function changeLanguage(lang) {
    if (!translations[lang]) lang = "en";
    currentLang = lang;
    try { localStorage.setItem("transit_lang", lang); } catch (e) { }
    document.documentElement.lang = lang === "ms" ? "ms" : lang === "bn" ? "bn" : "en";
    for (const key in translations[lang]) {
        if (key.startsWith("_")) continue;
        const el = $(ID_ALIASES[key] || key);
        if (el) el.innerText = translations[lang][key];
    }
    loadActiveCardData();
    renderFareCalc();
    updateFarePreview();
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    ["themeToggleBtn", "themeToggleBtn2"].forEach(id => {
        const btn = $(id);
        if (btn) btn.innerHTML = ICON(theme === "dark" ? "sun" : "moon");
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#070c1a" : "#eef3fb";
}

function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem("transit_theme", next); } catch (e) { }
    applyTheme(next);
    if (isAdminPage() && sessionStorage.getItem("admin_logged_in") === "true") {
        destroyCharts();
        loadAdminData();
    }
}

window.onload = function () {
    migratePins();
    mountIcons();
    applyTheme(localStorage.getItem("transit_theme") || "dark");
    mountScene();

    document.querySelectorAll("#year, .yr").forEach(el => el.textContent = new Date().getFullYear());
    initFareCalc();
    initGateSelects();

    const savedLang = localStorage.getItem("transit_lang") || "en";
    const langSelect = $("langSelect");
    if (langSelect) langSelect.value = savedLang;
    changeLanguage(savedLang);

    setTimeout(() => {
        const splash = $("splashScreen");
        if (splash) { splash.style.opacity = "0"; setTimeout(() => splash.style.display = "none", 600); }
    }, 900);

    const body = $("adminCardTableBody");
    if (body) {
        body.addEventListener("click", e => {
            const b = e.target.closest("button[data-action]");
            if (!b) return;
            if (b.dataset.action === "delete") adminDeleteCard(b.dataset.card);
            else if (b.dataset.action === "view") openCardDetail(b.dataset.card);
            else adminToggleBlock(b.dataset.card);
        });
        const today = $("adminToday");
        if (today) today.textContent = new Date().toLocaleDateString("en-MY", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        document.querySelectorAll(".side-link[href^='#']").forEach(a => a.addEventListener("click", () => {
            document.querySelectorAll(".side-link").forEach(x => x.classList.toggle("active", x === a));
        }));
        checkAdminAuthStatus();
    }

    // keep tabs in sync when another tab changes data
    window.addEventListener("storage", e => {
        if (e.key === "all_transit_cards" || e.key === "audit_logs" || e.key === "active_card_no") {
            loadActiveCardData();
            if (isAdminPage() && sessionStorage.getItem("admin_logged_in") === "true") loadAdminData();
        }
    });
};

document.addEventListener("keydown", e => {
    if (e.key === "Escape") document.querySelectorAll(".modal").forEach(m => { if (m.style.display === "flex") closeModal(m.id); });
});
document.addEventListener("click", e => {
    if (e.target.classList && e.target.classList.contains("modal")) closeModal(e.target.id);
});

// ---------- Storage ----------
function readJSON(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch (e) { return fallback; }
}

function normalizeTx(tx) {
    if (tx && typeof tx === "object") return tx;
    const s = String(tx);
    const parts = s.split(" — ");
    const head = parts[0];
    const type = (head.match(/^\[(Reload|Transfer|Fare)\]/) || [])[1] || "Info";
    const a = head.match(/([+-])RM\s*([\d.]+)/);
    return {
        type,
        amount: a ? (a[1] === "-" ? -1 : 1) * parseFloat(a[2]) : 0,
        desc: head.replace(/^\[(Reload|Transfer|Fare)\]\s*/, ""),
        date: parts[1] ? parts[1].replace(/^[\(\[]|[\)\]]$/g, "") : ""
    };
}

function getAllCards() {
    return readJSON("all_transit_cards", []).map(c => {
        c.balance = Number(c.balance) || 0;
        c.totalReloaded = Number(c.totalReloaded) || 0;
        c.transactions = (c.transactions || []).map(normalizeTx);
        return c;
    });
}
function saveAllCards(cards) { localStorage.setItem("all_transit_cards", JSON.stringify(cards)); }
function getActiveCardNumber() { return localStorage.getItem("active_card_no"); }
function setActiveCardNumber(no) { localStorage.setItem("active_card_no", no); }
function getActiveCard() {
    const no = getActiveCardNumber();
    return no ? (getAllCards().find(c => c.cardNumber === no) || null) : null;
}
const findCard = (cards, no) => cards.find(c => c.cardNumber.toLowerCase() === String(no).toLowerCase());
const newTxId = () => "TXN-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");

function addTx(card, type, amount, desc, extra) {
    card.transactions.unshift(Object.assign({ id: newTxId(), type, amount, desc, date: nowISO(), balanceAfter: card.balance }, extra || {}));
}

function addAuditLog(text) {
    const logs = readJSON("audit_logs", []);
    logs.unshift({ ts: nowISO(), text });
    localStorage.setItem("audit_logs", JSON.stringify(logs.slice(0, 500)));
}

// ---------- Modals ----------
function openModal(id) { const m = $(id); if (m) { m.style.display = "flex"; const f = m.querySelector("input:not([type=hidden]):not([type=radio]), select, button.btn"); if (f) setTimeout(() => f.focus(), 50); } }
function openRegisterModal() { showAuthTab("register"); }
function openLoginModal() { showAuthTab("login"); }
function openReloadModal() { if (!getActiveCard()) return showToast("Please sign in first.", "error"); openModal("reloadModal"); }
function openTransferModal() { if (!getActiveCard()) return showToast("Please sign in first.", "error"); $("transferPin").value = ""; openModal("transferModal"); }
function closeModal(id) {
    const m = $(id);
    if (!m) return;
    m.style.display = "none";
    if (id === "confirmModal" && confirmResolver) { const r = confirmResolver; confirmResolver = null; r(false); }
}

function showAuthTab(which) {
    const login = which !== "register";
    if (!$("loginPane")) return;
    $("loginPane").hidden = !login;
    $("registerPane").hidden = login;
    $("tabLogin").classList.toggle("active", login);
    $("tabRegister").classList.toggle("active", !login);
    const card = $("authCard");
    if (card && window.innerWidth < 920) card.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { const f = $(login ? "loginCardNo" : "regCardNo"); if (f) f.focus(); }, 60);
}

// Custom confirm dialog (window.confirm is blocked in some embedded viewers)
let confirmResolver = null;
function askConfirm(text, { title = "Are you sure?", yes = "Confirm", danger = false } = {}) {
    const m = $("confirmModal");
    if (!m) return Promise.resolve(window.confirm(text));
    $("confirmTitle").textContent = title;
    $("confirmText").textContent = text;
    const yesBtn = $("confirmYes");
    yesBtn.textContent = yes;
    yesBtn.className = "btn " + (danger ? "btn-danger" : "btn-primary");
    m.style.display = "flex";
    setTimeout(() => $("confirmNo").focus(), 50);
    return new Promise(resolve => {
        confirmResolver = resolve;
        yesBtn.onclick = () => { confirmResolver = null; m.style.display = "none"; resolve(true); };
        $("confirmNo").onclick = () => closeModal("confirmModal");
    });
}

// ---------- Register / login ----------
let pendingCardData = null;
let generatedOtp = null;

function submitRegistration() {
    const cardNo = $("regCardNo").value.trim();
    const holder = $("regHolder").value.trim();
    const phone = $("regPhone").value.trim().replace(/[\s-]/g, "");
    const pin = $("regPin").value.trim();
    const category = $("regCategory").value;

    if (!/^[A-Za-z0-9-]{4,20}$/.test(cardNo)) return showToast("Card number: 4–20 letters, digits or dashes.", "error");
    if (holder.length < 2 || holder.length > 50) return showToast("Enter the holder's full name (2–50 characters).", "error");
    if (!/^\+?\d{9,15}$/.test(phone)) return showToast("Enter a valid phone number, e.g. +60123456789.", "error");
    if (!/^\d{4}$/.test(pin)) return showToast("PIN must be exactly 4 digits.", "error");
    if (findCard(getAllCards(), cardNo)) return showToast("This card number is already registered.", "error");

    pendingCardData = {
        cardNumber: cardNo, holderName: holder, phone, pinHash: pinHashFor(cardNo, pin), cardCategory: category,
        balance: 0, totalReloaded: 0, isBlocked: false, blockedBy: null, tapIn: null, pass: null,
        autoReload: { enabled: false, threshold: 5, amount: 20 },
        reportStatus: "Normal / Active", registeredAt: nowISO(), transactions: []
    };

    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    $("otpMsg").innerHTML = `SMS simulation: your code is <b class="mono">${generatedOtp}</b>`;
    $("enteredOtp").value = "";
    openModal("otpModal");
}

function verifyOtpAndRegister() {
    const entered = $("enteredOtp").value.trim();
    if (!pendingCardData || generatedOtp === null || entered !== String(generatedOtp)) return showToast("Incorrect code. Check the SMS and try again.", "error");

    const card = pendingCardData;
    addTx(card, "Info", 0, `Card registered [${card.cardNumber}]`);
    const cards = getAllCards();
    cards.push(card);
    saveAllCards(cards);
    setActiveCardNumber(card.cardNumber);
    addAuditLog(`New card registered: ${card.cardNumber} (${card.holderName})`);

    pendingCardData = null; generatedOtp = null;
    ["regCardNo", "regHolder", "regPhone", "regPin"].forEach(id => $(id).value = "");
    closeModal("otpModal");
    loadActiveCardData();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Card registered. You're signed in.", "success");
}

function getLock() { return readJSON("login_lock", { fails: 0, until: 0 }); }
function setLock(v) { localStorage.setItem("login_lock", JSON.stringify(v)); }

function submitLogin() {
    const lock = getLock();
    if (Date.now() < lock.until) return showToast(`Too many attempts. Try again in ${Math.ceil((lock.until - Date.now()) / 1000)}s.`, "error");

    const cardNo = $("loginCardNo").value.trim();
    const pin = $("loginPin").value.trim();
    const found = findCard(getAllCards(), cardNo);

    if (!found || !checkPin(found, pin)) {
        lock.fails = (lock.fails || 0) + 1;
        if (lock.fails >= 5) { lock.until = Date.now() + 30000; lock.fails = 0; }
        setLock(lock);
        return showToast("Invalid card number or PIN.", "error");
    }
    if (found.isBlocked) return showToast("This card is blocked. Contact support.", "error");

    setLock({ fails: 0, until: 0 });
    $("loginPin").value = "";
    setActiveCardNumber(found.cardNumber);
    loadActiveCardData();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Welcome back, ${found.holderName.split(" ")[0]}.`, "success");
}

function logoutCard() {
    localStorage.removeItem("active_card_no");
    loadActiveCardData();
}

// ---------- Reload / transfer / report lost ----------
document.addEventListener("change", e => {
    if (e.target.name === "gw" && $("reloadGateway")) $("reloadGateway").value = e.target.value;
    if (e.target.id === "tapOrigin" || e.target.id === "tapDestination") updateFarePreview();
    if (e.target.id === "fcFrom" || e.target.id === "fcTo") renderFareCalc();
});

function submitReload() {
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === getActiveCardNumber());
    if (!card || card.isBlocked) return showToast("This card cannot be reloaded.", "error");

    const gateway = $("reloadGateway").value;
    const amount = parseFloat($("reloadAmount").value);
    if (![10, 20, 50, 100].includes(amount)) return showToast("Choose a valid amount.", "error");
    if (card.balance + amount > MAX_BALANCE) return showToast(`Reload declined: stored value limit of ${money(MAX_BALANCE)} exceeded.`, "error");

    card.balance = round2(card.balance + amount);
    card.totalReloaded = round2(card.totalReloaded + amount);
    addTx(card, "Reload", amount, `Reload via ${gateway}`, { gateway });
    saveAllCards(cards);
    addAuditLog(`Reload +${money(amount)} on ${card.cardNumber} via ${gateway}`);

    closeModal("reloadModal");
    loadActiveCardData();
    showToast(`Reloaded ${money(amount)} successfully.`, "success");
    celebrate();
}

function submitCardTransfer() {
    const cards = getAllCards();
    const sender = cards.find(c => c.cardNumber === getActiveCardNumber());
    const targetNo = $("transferTargetCard").value.trim();
    const amount = round2(parseFloat($("transferAmount").value));
    const pin = $("transferPin").value.trim();

    if (!sender || sender.isBlocked) return showToast("Your card is not active.", "error");
    if (isNaN(amount) || amount < 5) return showToast("Minimum transfer is RM 5.00.", "error");
    if (sender.balance < amount) return showToast("Insufficient balance.", "error");
    const recipient = findCard(cards, targetNo);
    if (!recipient) return showToast("Recipient card not found.", "error");
    if (recipient.cardNumber === sender.cardNumber) return showToast("You cannot transfer to the same card.", "error");
    if (recipient.isBlocked) return showToast("Recipient card is blocked and cannot receive transfers.", "error");
    if (recipient.balance + amount > MAX_BALANCE) return showToast(`Recipient would exceed the ${money(MAX_BALANCE)} limit.`, "error");
    if (!checkPin(sender, pin)) return showToast("Incorrect PIN.", "error");

    sender.balance = round2(sender.balance - amount);
    recipient.balance = round2(recipient.balance + amount);
    const group = newTxId().replace("TXN", "TRF");
    addTx(sender, "Transfer", -amount, `Transfer to ${recipient.cardNumber}`, { counterparty: recipient.cardNumber, transferGroup: group });
    addTx(recipient, "Transfer", amount, `Transfer from ${sender.cardNumber}`, { counterparty: sender.cardNumber, transferGroup: group });
    maybeAutoReload(sender);
    saveAllCards(cards);
    addAuditLog(`Transfer ${money(amount)}: ${sender.cardNumber} → ${recipient.cardNumber}`);

    $("transferTargetCard").value = ""; $("transferAmount").value = ""; $("transferPin").value = "";
    closeModal("transferModal");
    loadActiveCardData();
    showToast(`Transferred ${money(amount)} to ${recipient.cardNumber}.`, "success");
    celebrate();
}

async function toggleCardBlockStatus() {
    if (!getActiveCard()) return;
    const ok = await askConfirm("Your card will be blocked immediately and you'll be signed out. Only an administrator can unblock it.", { title: "Report this card as lost?", yes: "Block my card", danger: true });
    if (!ok) return;
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === getActiveCardNumber());
    if (!card) return;

    card.isBlocked = true;
    card.blockedBy = "user";
    card.reportStatus = "Reported Lost / Blocked";
    addTx(card, "Info", 0, "Card reported lost and blocked");
    saveAllCards(cards);
    addAuditLog(`Card ${card.cardNumber} reported lost by user`);

    localStorage.removeItem("active_card_no");
    loadActiveCardData(true);
    showToast("Card blocked. Contact support to unblock it.", "success");
}

// ---------- Dashboard rendering ----------
let lastQrNo = null;
function cardTheme(category) {
    const c = String(category || "").toLowerCase();
    if (c.includes("student")) return "student";
    if (c.includes("oku") || c.includes("senior")) return "concession";
    return "standard";
}

function loadActiveCardData(silent) {
    const dash = $("userDashboard");
    if (!dash) return;
    const landing = $("authLandingView");
    let card = getActiveCard();

    if (card && card.isBlocked) {
        localStorage.removeItem("active_card_no");
        card = null;
        if (!silent) showToast("This card has been blocked. You were signed out.", "error");
    }

    if (!card) {
        if (landing) landing.style.display = "";
        dash.style.display = "none";
        lastQrNo = null;
        $("cardBalance").dataset.val = 0; $("totalReloaded").dataset.val = 0;
        return;
    }

    if (landing) landing.style.display = "none";
    dash.style.display = "block";

    const h = new Date().getHours();
    $("dashGreeting").innerText = T(h < 12 ? "_morning" : h < 18 ? "_afternoon" : "_evening");
    $("dashName").innerText = card.holderName;
    $("virtualCard").dataset.cat = cardTheme(card.cardCategory);
    $("cardTypeLabel").innerText = card.cardCategory;
    $("cardNoSpan").innerText = card.cardNumber;
    $("cardNameSpan").innerText = card.holderName;
    animateValue($("cardBalance"), card.balance);
    animateValue($("totalReloaded"), card.totalReloaded);
    const fares = card.transactions.filter(t => t.type === "Fare");
    animateValue($("tripCount"), fares.length, n => String(Math.round(n)));
    animateValue($("fareSpent"), round2(card.transactions.filter(t => t.type === "Fare" || t.type === "Pass").reduce((s, t) => s - Number(t.amount || 0), 0)));
    $("statusText").innerText = statusLabels[currentLang].active;
    renderBanners(card);
    renderMonthSummary(card);

    const qrBox = $("cardQrCode");
    if (qrBox && typeof QRCode !== "undefined" && lastQrNo !== card.cardNumber) {
        qrBox.innerHTML = "";
        new QRCode(qrBox, { text: `TRANSIT_CARD:${card.cardNumber}|Active`, width: 54, height: 54 });
        lastQrNo = card.cardNumber;
    }
    renderTransactions();
}

function filterTransactions() { renderTransactions(); }

// ---------- Dashboard extras: banners, pass badge, monthly summary ----------
function renderBanners(card) {
    const box = $("dashBanners");
    if (!box) return;
    const out = [];
    if (card.tapIn) {
        out.push(`<div class="banner trip">${ICON("gate")}<div><b>${esc(T("_onTrip"))}</b><span>${esc(T("_enteredAt"))} ${esc(card.tapIn.station)} · ${esc(fmtDate(card.tapIn.time))}</span></div>
            <button class="btn btn-primary btn-sm" onclick="openGateTapModal()">${esc(T("_tapOutNow"))}</button></div>`);
    }
    const ar = card.autoReload || {};
    if (card.balance < LOW_BALANCE && !passValid(card) && !ar.enabled) {
        out.push(`<div class="banner low">${ICON("wallet")}<div><b>${esc(T("_lowBal"))}: ${money(card.balance)}</b><span>${esc(T("_lowBalText"))}</span></div>
            <button class="btn btn-ghost btn-sm" onclick="openReloadModal()">${esc(T("_reloadNow"))}</button></div>`);
    }
    box.innerHTML = out.join("");
    const badge = $("passBadge");
    if (badge) {
        badge.hidden = !passValid(card);
        badge.innerText = `PASS · ${passDaysLeft(card)} ${T("_daysLeft")}`;
    }
    const arTag = $("autoTag");
    if (arTag) arTag.hidden = !ar.enabled;
}

function renderMonthSummary(card) {
    if (!$("monthStats")) return;
    const now = new Date();
    const sameMonth = (d, y, m) => d.getFullYear() === y && d.getMonth() === m;
    const txs = card.transactions.map(t => Object.assign({}, t, { d: new Date(t.date) })).filter(t => !isNaN(t.d));
    const cur = txs.filter(t => sameMonth(t.d, now.getFullYear(), now.getMonth()));
    const fares = cur.filter(t => t.type === "Fare" || t.type === "Pass");
    const spent = round2(fares.reduce((s, t) => s - Number(t.amount || 0), 0));
    const reloads = round2(cur.filter(t => t.type === "Reload").reduce((s, t) => s + Number(t.amount || 0), 0));
    const trips = cur.filter(t => t.type === "Fare").length;
    const saved = round2(cur.filter(t => t.type === "Fare" && t.baseFare && !t.penalty).reduce((s, t) => s + Math.max(0, t.baseFare + Number(t.amount || 0)), 0));
    $("mFare").innerText = money(spent);
    $("mReload").innerText = money(reloads);
    $("mTrips").innerText = trips;
    $("mSaved").innerText = money(saved);

    const months = [...Array(6)].map((_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1));
    const vals = months.map(m => round2(txs.filter(t => (t.type === "Fare" || t.type === "Pass") && sameMonth(t.d, m.getFullYear(), m.getMonth()))
        .reduce((s, t) => s - Number(t.amount || 0), 0)));
    const max = Math.max(...vals, 1);
    $("monthBars").innerHTML = months.map((m, i) => `
        <div class="mbar${i === 5 ? " current" : ""}" title="${money(vals[i])}">
            <span class="mval">${vals[i] ? "RM " + vals[i].toFixed(vals[i] < 100 ? 2 : 0) : ""}</span>
            <i style="height:${Math.max(3, vals[i] / max * 100)}%"></i>
            <small>${m.toLocaleDateString("en-MY", { month: "short" })}</small>
        </div>`).join("");
}


// ---------- PDF statement ----------
function downloadPdfReceipt() {
    const card = getActiveCard();
    if (!card) return showToast("Please sign in first.", "error");
    const jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) return showToast("PDF library is still loading. Try again in a moment.", "error");

    try {
        const doc = new jsPDF();
        doc.setFillColor(7, 12, 26); doc.rect(0, 0, 210, 34, "F");
        doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(255, 255, 255);
        doc.text("TRANSIT HUB MALAYSIA", 20, 18);
        doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.setTextColor(148, 161, 191);
        doc.text("Official Transaction & Account Statement", 20, 26);
        doc.text(`Generated ${fmtDate(nowISO())}`, 190, 26, { align: "right" });

        doc.setFillColor(241, 245, 249); doc.roundedRect(20, 42, 170, 30, 3, 3, "F");
        doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(15, 23, 42);
        doc.text("Cardholder", 26, 50);
        doc.setFont("helvetica", "normal"); doc.setFontSize(9);
        doc.text(`Card Number: ${card.cardNumber}`, 26, 58);
        doc.text(`Holder Name: ${card.holderName}`, 110, 58);
        doc.text(`Phone: ${card.phone}`, 26, 65);
        doc.text(`Category: ${card.cardCategory}`, 110, 65);

        doc.setFillColor(204, 251, 241); doc.roundedRect(20, 77, 170, 16, 3, 3, "F");
        doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(13, 148, 136);
        doc.text(`Available Balance: ${money(card.balance)}`, 26, 87);

        doc.setFontSize(12); doc.setTextColor(15, 23, 42);
        doc.text("Transactions", 20, 104);
        doc.setFontSize(8); doc.setTextColor(100, 116, 139);
        doc.text("DATE", 22, 112); doc.text("DESCRIPTION", 70, 112); doc.text("AMOUNT", 188, 112, { align: "right" });

        let y = 120;
        doc.setFont("helvetica", "normal"); doc.setFontSize(9);
        if (!card.transactions.length) doc.text("No transactions recorded yet.", 20, y);

        card.transactions.forEach((tx, i) => {
            const lines = doc.splitTextToSize(String(tx.desc).replace(/➔/g, "->"), 85);
            const h = Math.max(8, lines.length * 5 + 3);
            if (y + h > 275) { doc.addPage(); y = 20; }
            if (i % 2 === 0) { doc.setFillColor(248, 250, 252); doc.rect(20, y - 5, 170, h, "F"); }
            doc.setTextColor(100, 116, 139); doc.text(fmtDate(tx.date), 22, y);
            doc.setTextColor(30, 41, 59); doc.text(lines, 70, y);
            const amt = Number(tx.amount) || 0;
            if (amt) doc.text((amt > 0 ? "+" : "-") + money(Math.abs(amt)), 188, y, { align: "right" });
            y += h;
        });

        doc.setFontSize(8); doc.setTextColor(150, 150, 150);
        doc.text("Computer-generated statement from Transit Hub Malaysia. No signature required.", 20, 288);
        doc.save(`Transit_Statement_${card.cardNumber}.pdf`);
    } catch (e) {
        console.error(e);
        showToast("Could not generate the PDF statement.", "error");
    }
}

// ---------- Admin: login & password reset ----------
let adminForgotOtp = null;
const getAdminPass = () => localStorage.getItem("admin_pass") || DEFAULT_ADMIN_PASS;

function handleAdminLogin() {
    const id = $("adminEmailInput").value.trim();
    const pass = $("adminPassInput").value;
    if (ADMIN_IDS.includes(id) && pass === getAdminPass()) {
        sessionStorage.setItem("admin_logged_in", "true");
        addAuditLog("Admin signed in");
        $("adminPassInput").value = "";
        checkAdminAuthStatus();
        showToast("Signed in to the console.", "success");
    } else {
        showToast("Invalid email/phone or password.", "error");
    }
}

function openAdminForgotModal() { openModal("adminForgotModal"); }

function sendAdminOtp() {
    const id = $("forgotAdminId").value.trim();
    if (!ADMIN_IDS.includes(id)) return showToast("No admin account found with this email/phone.", "error");
    adminForgotOtp = Math.floor(1000 + Math.random() * 9000);
    $("adminOtpBox").style.display = "block";
    $("adminOtpMsg").innerHTML = `Simulation: code sent to ${esc(id)} is <b class="mono">${adminForgotOtp}</b>`;
}

function verifyAndResetAdminPass() {
    if (adminForgotOtp === null) return showToast("Send a code first.", "error");
    const otp = $("enteredAdminOtp").value.trim();
    const newPass = $("newAdminPass").value;
    if (otp !== String(adminForgotOtp)) return showToast("Incorrect code.", "error");
    if (newPass.length < 6) return showToast("Password must be at least 6 characters.", "error");

    localStorage.setItem("admin_pass", newPass);
    addAuditLog("Admin password reset");
    adminForgotOtp = null;
    $("enteredAdminOtp").value = ""; $("newAdminPass").value = "";
    $("adminOtpBox").style.display = "none";
    closeModal("adminForgotModal");
    showToast("Password updated. Sign in with the new password.", "success");
}

function checkAdminAuthStatus() {
    const loggedIn = sessionStorage.getItem("admin_logged_in") === "true";
    const login = $("adminLoginContainer"), dash = $("adminDashboardContainer");
    if (login) login.style.display = loggedIn ? "none" : "grid";
    if (dash) dash.style.display = loggedIn ? "grid" : "none";
    if (loggedIn) loadAdminData();
}

function adminLogout() {
    sessionStorage.removeItem("admin_logged_in");
    window.location.reload();
}

// ---------- Admin: data ----------
let catChart = null, adminChartInstance = null, adminPage = 0;

function statusOf(c) {
    if (!c.isBlocked) return "Active";
    return c.blockedBy === "user" ? "Reported lost" : "Blocked";
}
function statusPill(c) {
    const s = statusOf(c);
    const cls = !c.isBlocked ? "active" : c.blockedBy === "user" ? "lost" : "blocked";
    return `<span class="pill ${cls}">${s}</span>`;
}
const initials = name => String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
const shortCat = c => String(c || "").replace(" Non-NFC Card", "").replace(" Concession", "").replace(" Card", "");

function destroyCharts() {
    if (catChart) { catChart.destroy(); catChart = null; }
    if (adminChartInstance) { adminChartInstance.destroy(); adminChartInstance = null; }
}

function loadAdminData() {
    if (!$("adminCardTableBody")) return;
    const cards = getAllCards();
    animateValue($("adminTotalCards"), cards.length, n => String(Math.round(n)));
    animateValue($("adminTotalBalance"), cards.reduce((s, c) => s + c.balance, 0));
    animateValue($("adminBlockedCards"), cards.filter(c => c.isBlocked).length, n => String(Math.round(n)));
    animateValue($("adminTotalReloaded"), cards.reduce((s, c) => s + c.totalReloaded, 0));
    renderAdminTable(cards);
    renderAdminCharts(cards);
    renderStationStats(cards);
    renderAuditLog();
}

function renderAdminTable(cards) {
    cards = cards || getAllCards();
    const q = String(($("adminSearchInput") || {}).value || "").toLowerCase();
    const st = ($("adminStatusFilter") || {}).value || "all";
    const rows = cards.filter(c => [c.cardNumber, c.holderName, c.phone].some(v => String(v || "").toLowerCase().includes(q)))
        .filter(c => st === "all" || (st === "active" && !c.isBlocked) || (st === "blocked" && c.isBlocked && c.blockedBy !== "user") || (st === "lost" && c.isBlocked && c.blockedBy === "user"))
        .sort((a, b) => String(b.registeredAt).localeCompare(String(a.registeredAt)));

    const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    adminPage = Math.min(Math.max(0, adminPage), pages - 1);
    const slice = rows.slice(adminPage * PAGE_SIZE, adminPage * PAGE_SIZE + PAGE_SIZE);

    $("adminTableCount").textContent = `${rows.length} of ${cards.length} card${cards.length === 1 ? "" : "s"}`;
    $("adminCardTableBody").innerHTML = slice.length ? slice.map(c => `
        <tr>
            <td><div class="holder"><span class="avatar">${esc(initials(c.holderName))}</span><div>${esc(c.holderName)}<small>${esc(c.phone)}</small></div></div></td>
            <td class="mono">${esc(c.cardNumber)}</td>
            <td><span class="cat-tag">${esc(shortCat(c.cardCategory))}</span></td>
            <td class="num">${money(c.balance)}</td>
            <td>${esc(fmtDate(c.registeredAt) || "N/A")}</td>
            <td>${statusPill(c)}</td>
            <td><div class="row-actions">
                <button class="action-btn" data-action="view" data-card="${esc(c.cardNumber)}">View</button>
                <button class="action-btn" data-action="toggle" data-card="${esc(c.cardNumber)}">${c.isBlocked ? "Unblock" : "Block"}</button>
                <button class="action-btn btn-delete" data-action="delete" data-card="${esc(c.cardNumber)}">Delete</button>
            </div></td>
        </tr>`).join("") : `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">No matching cards.</td></tr>`;

    $("pagerInfo").textContent = rows.length ? `Showing ${adminPage * PAGE_SIZE + 1}–${adminPage * PAGE_SIZE + slice.length} of ${rows.length} · page ${adminPage + 1} of ${pages}` : "";
    $("pagePrev").disabled = adminPage === 0;
    $("pageNext").disabled = adminPage >= pages - 1;
}

function changeAdminPage(d) { adminPage += d; renderAdminTable(); }
function filterAdminCards() { adminPage = 0; renderAdminTable(); }

function renderAdminCharts(cards) {
    if (typeof Chart === "undefined") return;
    const css = getComputedStyle(document.documentElement);
    const muted = css.getPropertyValue("--text-muted").trim() || "#94a3b8";
    const grid = css.getPropertyValue("--border").trim() || "rgba(255,255,255,.1)";
    Chart.defaults.color = muted;
    Chart.defaults.font.family = "'Plus Jakarta Sans', system-ui, sans-serif";

    const n = f => cards.filter(f).length;
    const catData = [
        n(c => cardTheme(c.cardCategory) === "standard"), n(c => /student/i.test(c.cardCategory)),
        n(c => /oku/i.test(c.cardCategory)), n(c => /senior/i.test(c.cardCategory))
    ];

    const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - 6 + i); return d; });
    const labels = days.map(d => d.toLocaleDateString("en-MY", { weekday: "short", day: "numeric" }));
    const series = { Reload: Array(7).fill(0), Fare: Array(7).fill(0), Transfer: Array(7).fill(0) };
    cards.forEach(c => c.transactions.forEach(t => {
        if (!series[t.type] || (t.type === "Transfer" && Number(t.amount) > 0)) return;
        const d = new Date(t.date); d.setHours(0, 0, 0, 0);
        const i = days.findIndex(x => x.getTime() === d.getTime());
        if (i >= 0) series[t.type][i]++;
    }));

    const catCanvas = $("adminCatChart");
    if (catCanvas) {
        if (catChart) { catChart.data.datasets[0].data = catData; catChart.update(); }
        else catChart = new Chart(catCanvas, {
            type: "doughnut",
            data: { labels: ["Standard", "Student", "OKU", "Senior"], datasets: [{ data: catData, backgroundColor: ["#0ea5e9", "#8b5cf6", "#2dd4bf", "#f59e0b"], borderWidth: 0, spacing: 3, borderRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: "68%", plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 16 } } } }
        });
    }

    const barCanvas = $("adminChart");
    if (barCanvas) {
        const ds = [["Reloads", series.Reload, "#2dd4bf"], ["Gate fares", series.Fare, "#f59e0b"], ["Transfers", series.Transfer, "#0ea5e9"]]
            .map(([label, data, c]) => ({ label, data, backgroundColor: c, borderRadius: 6, borderSkipped: false, maxBarThickness: 18 }));
        if (adminChartInstance) { adminChartInstance.data.labels = labels; adminChartInstance.data.datasets.forEach((d, i) => d.data = ds[i].data); adminChartInstance.update(); }
        else adminChartInstance = new Chart(barCanvas, {
            type: "bar",
            data: { labels, datasets: ds },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 16 } } },
                scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: grid } } }
            }
        });
    }
}

function renderAuditLog() {
    const el = $("adminAuditList");
    if (!el) return;
    const logs = readJSON("audit_logs", []);
    el.innerHTML = logs.length
        ? logs.slice(0, 100).map(l => typeof l === "string" ? `<li>${esc(l)}</li>` : `<li><time>${esc(fmtDate(l.ts))}</time>${esc(l.text)}</li>`).join("")
        : "<li>No system logs recorded.</li>";
}

async function adminToggleBlock(cardNo) {
    if (!requireAdmin()) return;
    const cards = getAllCards();
    const c = cards.find(x => x.cardNumber === cardNo);
    if (!c) return;
    const blocking = !c.isBlocked;
    const ok = await askConfirm(blocking ? `Card ${cardNo} will be blocked from gates, reloads and transfers.` : `Card ${cardNo} will be able to travel and transact again.`,
        { title: blocking ? "Block this card?" : "Unblock this card?", yes: blocking ? "Block card" : "Unblock card", danger: blocking });
    if (!ok) return;
    c.isBlocked = blocking;
    c.blockedBy = blocking ? "admin" : null;
    c.reportStatus = blocking ? "Blocked by Admin" : "Normal / Active";
    addTx(c, "Info", 0, blocking ? "Card blocked by admin" : "Card unblocked by admin");
    saveAllCards(cards);
    addAuditLog(`Admin ${blocking ? "blocked" : "unblocked"} card ${c.cardNumber}`);
    loadAdminData();
    if ($("cardDetailModal").style.display === "flex") renderCardDetail();
    showToast(`Card ${blocking ? "blocked" : "unblocked"}.`, "success");
}

async function adminDeleteCard(cardNo) {
    if (!requireAdmin()) return;
    const ok = await askConfirm(`Card ${cardNo} and its full transaction history will be removed. This cannot be undone.`, { title: "Delete this card?", yes: "Delete card", danger: true });
    if (!ok) return;
    saveAllCards(getAllCards().filter(c => c.cardNumber !== cardNo));
    addAuditLog(`Admin deleted card ${cardNo}`);
    loadAdminData();
    showToast("Card deleted.", "success");
}

// ---------- CSV export ----------
function csvCell(v) {
    let s = String(v ?? "");
    if (/^[=+\-@\t\r]/.test(s) && !/^[+-]?\d[\d.]*$/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
}

function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportCardsToCSV() {
    if (!requireAdmin()) return;
    const rows = [["CardNumber", "HolderName", "Phone", "Category", "Balance", "TotalReloaded", "RegistrationDate", "Status"]]
        .concat(getAllCards().map(c => [c.cardNumber, c.holderName, c.phone, c.cardCategory, c.balance.toFixed(2), c.totalReloaded.toFixed(2), fmtDate(c.registeredAt) || "N/A", statusOf(c)]));
    const csv = "﻿" + rows.map(r => r.map(csvCell).join(",")).join("\r\n");
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), "transit_cards_database.csv");
    addAuditLog("Cardholder CSV exported");
    renderAuditLog();
}

// ---------- Animations ----------
const reducedMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateValue(el, target, fmt = money) {
    if (!el) return;
    const from = parseFloat(el.dataset.val || "0") || 0;
    el.dataset.val = target;
    if (from === target || reducedMotion) { el.innerText = fmt(target); return; }
    const t0 = performance.now(), dur = 700;
    (function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        el.innerText = fmt(from + (target - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
    })(t0);
}

function celebrate() {
    const c = document.querySelector(".transit-card-preview");
    if (!c) return;
    c.classList.remove("glow"); void c.offsetWidth; c.classList.add("glow");
}

document.addEventListener("pointerdown", e => {
    const b = e.target.closest(".btn, .transit-btn");
    if (!b || reducedMotion) return;
    const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement("span");
    s.className = "ripple";
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(s);
    setTimeout(() => s.remove(), 600);
});

document.addEventListener("click", e => {
    const chip = e.target.closest(".amount-chip");
    if (chip) {
        document.querySelectorAll(".amount-chip").forEach(c => c.classList.toggle("active", c === chip));
        $("reloadAmount").value = chip.dataset.v;
    }
    const pill = e.target.closest(".cat-pill");
    if (pill) {
        document.querySelectorAll(".cat-pill").forEach(c => c.classList.toggle("active", c === pill));
        renderFareCalc();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".transit-card-preview");
    if (!card || reducedMotion) return;
    card.addEventListener("pointermove", e => {
        if (e.pointerType !== "mouse") return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg");
        card.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 10 + "deg");
    });
    card.addEventListener("pointerleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
});

// ---------- Admin tools: detail, adjust, PIN reset, backup ----------
function requireAdmin() {
    if (sessionStorage.getItem("admin_logged_in") === "true") return true;
    showToast("Admin sign-in required.", "error");
    return false;
}

let detailCardNo = null;

function openCardDetail(cardNo) {
    if (!requireAdmin()) return;
    detailCardNo = cardNo;
    $("tempPinBox").style.display = "none";
    ["adjustAmount", "adjustReason"].forEach(id => $(id).value = "");
    renderCardDetail();
    openModal("cardDetailModal");
}

function renderCardDetail() {
    const c = getAllCards().find(x => x.cardNumber === detailCardNo);
    if (!c) return closeModal("cardDetailModal");
    $("detailTitle").innerText = c.holderName + " · " + c.cardNumber;
    const info = [
        ["Holder", c.holderName], ["Phone", c.phone], ["Category", shortCat(c.cardCategory)], ["Status", statusOf(c)],
        ["Balance", money(c.balance)], ["Total reloaded", money(c.totalReloaded)],
        ["Registered", fmtDate(c.registeredAt) || "N/A"], ["Transactions", c.transactions.length],
        ["30-day pass", passValid(c) ? `${passDaysLeft(c)} days left` : "None"], ["Trip", c.tapIn ? `In at ${c.tapIn.station}` : "Not travelling"],
        ["Auto reload", c.autoReload && c.autoReload.enabled ? `+${money(c.autoReload.amount)} < ${money(c.autoReload.threshold)}` : "Off"], ["PIN", c.pinHash ? "SHA-256 hashed" : "Not set"]
    ];
    $("detailInfo").innerHTML = info.map(([k, v]) => `<div class="detail-item"><small>${k}</small><span>${esc(v)}</span></div>`).join("");
    $("detailTxList").innerHTML = c.transactions.length ? c.transactions.map(tx => txItemHtml(tx, -1)).join("") : `<li class="no-data-item">No transactions yet.</li>`;
    const bb = $("detailBlockBtn");
    if (bb) { bb.innerHTML = ICON("lock") + (c.isBlocked ? "Unblock card" : "Block card"); bb.className = "btn " + (c.isBlocked ? "btn-ghost" : "btn-danger"); }
}

function adminAdjustBalance() {
    if (!requireAdmin()) return;
    const cards = getAllCards();
    const c = cards.find(x => x.cardNumber === detailCardNo);
    if (!c) return;

    const amount = round2(parseFloat($("adjustAmount").value));
    const reason = $("adjustReason").value.trim();
    const sign = $("adjustType").value === "debit" ? -1 : 1;

    if (isNaN(amount) || amount <= 0) return showToast("Enter an amount greater than 0.", "error");
    if (amount > 1000) return showToast("Maximum adjustment is RM 1,000.00.", "error");
    if (reason.length < 3) return showToast("A reason is required.", "error");
    if (sign < 0 && c.balance < amount) return showToast("Debit is larger than the card balance.", "error");
    if (sign > 0 && c.balance + amount > MAX_BALANCE) return showToast(`Credit would exceed the ${money(MAX_BALANCE)} card limit.`, "error");

    c.balance = round2(c.balance + sign * amount);
    addTx(c, "Adjustment", sign * amount, `Admin adjustment: ${reason}`, { reason });
    saveAllCards(cards);
    addAuditLog(`Balance ${sign > 0 ? "credited" : "debited"} ${money(amount)} on ${c.cardNumber}. Reason: ${reason}`);

    ["adjustAmount", "adjustReason"].forEach(id => $(id).value = "");
    loadAdminData();
    renderCardDetail();
    showToast("Balance updated.", "success");
}

async function adminResetPin() {
    if (!requireAdmin()) return;
    const cards = getAllCards();
    const c = cards.find(x => x.cardNumber === detailCardNo);
    if (!c) return;
    const ok = await askConfirm(`A new temporary PIN will replace the current PIN for card ${c.cardNumber}.`, { title: "Reset PIN?", yes: "Reset PIN" });
    if (!ok) return;

    const tmp = String(crypto.getRandomValues(new Uint32Array(1))[0] % 10000).padStart(4, "0");
    c.pinHash = pinHashFor(c.cardNumber, tmp);
    delete c.pin;
    addTx(c, "Info", 0, "PIN reset by admin");
    saveAllCards(cards);
    addAuditLog(`PIN reset for card ${c.cardNumber}`);

    renderCardDetail();
    const box = $("tempPinBox");
    box.innerHTML = `Temporary PIN. Give it to the cardholder:<b>${tmp}</b>`;
    box.style.display = "block";
    renderAuditLog();
}

function exportBackup() {
    if (!requireAdmin()) return;
    const data = { version: 2, exportedAt: nowISO(), cards: getAllCards(), audit_logs: readJSON("audit_logs", []) };
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `transit_backup_${new Date().toISOString().slice(0, 10)}.json`);
    addAuditLog("Backup exported");
    renderAuditLog();
    showToast("Backup downloaded. PINs are stored as hashes; still keep it private.", "success");
}

function restoreBackup(input) {
    const file = input.files[0];
    input.value = "";
    if (!file || !requireAdmin()) return;
    const reader = new FileReader();
    reader.onload = async () => {
        try {
            const data = JSON.parse(reader.result);
            const valid = data && Array.isArray(data.cards) && data.cards.every(c =>
                c && typeof c.cardNumber === "string" && typeof c.holderName === "string" && (/^\d{4}$/.test(String(c.pin)) || /^[0-9a-f]{64}$/.test(String(c.pinHash))));
            if (!valid) return showToast("This is not a valid backup file.", "error");
            const ok = await askConfirm(`All current data will be replaced with ${data.cards.length} cards from this backup.`, { title: "Restore backup?", yes: "Replace data", danger: true });
            if (!ok) return;

            saveAllCards(data.cards);
            migratePins();
            localStorage.setItem("audit_logs", JSON.stringify(Array.isArray(data.audit_logs) ? data.audit_logs.slice(0, 500) : []));
            addAuditLog(`Backup restored (${data.cards.length} cards)`);
            adminPage = 0;
            loadAdminData();
            showToast("Backup restored.", "success");
        } catch (e) {
            showToast("Could not read the backup file.", "error");
        }
    };
    reader.readAsText(file);
}

// ==========================================
// GATE TAP (uses the network fare engine in fares.js)
// ==========================================
function initGateSelects() {
    const o = $("tapOrigin"), d = $("tapDestination");
    if (!o || !d || typeof Fares === "undefined") return;
    o.innerHTML = Fares.optionsHtml("KL Sentral");
    d.innerHTML = Fares.optionsHtml("KLCC");
    o.value = "KL Sentral"; d.value = "KLCC";
}

function passValid(card) {
    return !!(card && card.pass && new Date(card.pass.end).getTime() > Date.now());
}
const passDaysLeft = card => passValid(card) ? Math.ceil((new Date(card.pass.end).getTime() - Date.now()) / 86400000) : 0;

// Top up automatically when the balance falls below the card's threshold
function maybeAutoReload(card) {
    const ar = card.autoReload;
    if (!ar || !ar.enabled || card.isBlocked) return false;
    if (card.balance >= ar.threshold) return false;
    if (card.balance + ar.amount > MAX_BALANCE) return false;
    card.balance = round2(card.balance + ar.amount);
    card.totalReloaded = round2(card.totalReloaded + ar.amount);
    addTx(card, "Reload", ar.amount, `Auto reload (balance below ${money(ar.threshold)})`, { gateway: "Auto reload" });
    addAuditLog(`Auto reload +${money(ar.amount)} on ${card.cardNumber}`);
    return true;
}

function openGateTapModal() {
    const card = getActiveCard();
    if (!card) return showToast("Please sign in first.", "error");
    if (card.isBlocked) return showToast("This card is blocked.", "error");
    const inTrip = !!card.tapIn;
    $("gateInPane").hidden = inTrip;
    $("gateOutPane").hidden = !inTrip;
    $("gateTitle").innerText = T(inTrip ? "_tapOutTitle" : "_tapInTitle");
    if (inTrip) {
        $("gateEntryInfo").innerHTML = `${ICON("gate", "ic sm")} ${esc(T("_enteredAt"))} <b>${esc(card.tapIn.station)}</b> · ${esc(fmtDate(card.tapIn.time))}`;
        if ($("tapDestination").value === card.tapIn.station) {
            const other = Fares.ALL_STATIONS.find(s => s !== card.tapIn.station);
            $("tapDestination").value = other;
        }
    }
    updateFarePreview();
    openModal("gateTapModal");
}

function routeSummary(q) {
    if (!q.legs.length) return "Same-station entry and exit: minimum fare.";
    const parts = q.legs.map(l => `${Fares.lineByCode[l.line].short} (${l.stops} ${T("_stopsN")})`);
    return `${q.km} km · ${parts.join(" → ")} · ~${q.minutes} min`;
}

function updateFarePreview() {
    const card = getActiveCard();
    if (!card || !$("tapDestination") || typeof Fares === "undefined" || !card.tapIn) return;
    const q = Fares.quote(card.tapIn.station, $("tapDestination").value, card.cardCategory);
    if (!q) return;
    const covered = passValid(card);
    $("tapStandardFare").innerText = money(q.standardFare);
    $("tapFinalFare").innerText = covered ? money(0) : money(q.finalFare);
    $("tapConcessionRate").innerText = covered ? T("_free") : q.concession ? T("_concRate") : T("_std");
    $("tapRouteInfo").innerText = routeSummary(q);
}

function submitTapIn() {
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === getActiveCardNumber());
    if (!card || card.isBlocked) return showToast("Card is inactive or blocked.", "error");
    if (card.tapIn) return showToast("You're already inside. Tap out first.", "error");
    if (!passValid(card) && card.balance < MIN_ENTRY_BALANCE) {
        return showToast(`Gate entry denied: you need at least ${money(MIN_ENTRY_BALANCE)}. Please reload.`, "error");
    }
    const station = $("tapOrigin").value;
    card.tapIn = { station, time: nowISO() };
    saveAllCards(cards);
    addAuditLog(`Tap in at ${station} on card ${card.cardNumber}`);
    closeModal("gateTapModal");
    loadActiveCardData();
    showToast(`Tapped in at ${station}. Have a safe trip.`, "success");
    celebrate();
}

function chargeTrip(card, dest, opts = {}) {
    const origin = card.tapIn.station;
    const q = Fares.quote(origin, dest, card.cardCategory);
    const covered = passValid(card) && !opts.penalty;
    let fare = covered ? 0 : (opts.penalty ? (Fares.isConcession(card.cardCategory) ? round2(Fares.FARE.max * Fares.FARE.concession) : Fares.FARE.max) : q.finalFare);
    fare = Math.min(fare, card.balance); // never go negative; real gates would ask you to pay the difference at the counter
    card.balance = round2(card.balance - fare);
    const note = opts.penalty ? " (incomplete journey: maximum fare)" : covered ? " (30-day pass)" : q.concession ? ` (50% concession, base ${money(q.standardFare)})` : "";
    const label = opts.noExit ? `Penalty: entered ${origin}, no tap out (maximum fare)` : `${opts.penalty ? "Penalty" : "Trip"}: ${origin} ➔ ${dest}${note}`;
    addTx(card, "Fare", -fare, label, {
        origin, destination: dest, baseFare: q.standardFare, distanceKm: q.km, tapInAt: card.tapIn.time, penalty: !!opts.penalty, pass: covered
    });
    card.tapIn = null;
    maybeAutoReload(card);
    return fare;
}

function submitGateTap() {
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === getActiveCardNumber());
    if (!card || card.isBlocked) return showToast("Card is inactive or blocked.", "error");
    if (!card.tapIn) return openGateTapModal();

    const dest = $("tapDestination").value;
    const overTime = Date.now() - new Date(card.tapIn.time).getTime() > MAX_TRIP_HOURS * 3600000;
    const q = Fares.quote(card.tapIn.station, dest, card.cardCategory);
    if (!q) return showToast("Route not found.", "error");
    if (!overTime && !passValid(card) && card.balance < q.finalFare) {
        return showToast(`Exit denied: fare ${money(q.finalFare)}, balance ${money(card.balance)}. Reload, then tap out.`, "error");
    }
    const fare = chargeTrip(card, dest, { penalty: overTime });
    saveAllCards(cards);
    addAuditLog(`Tap out at ${dest} -${money(fare)} on card ${card.cardNumber}${overTime ? " (time limit exceeded)" : ""}`);

    closeModal("gateTapModal");
    loadActiveCardData();
    const msg = overTime ? `Trip over ${MAX_TRIP_HOURS} hours: maximum fare ${money(fare)} charged.` : fare === 0 && passValid(card) ? "Gate opened. Trip covered by your 30-day pass." : `Gate opened. ${money(fare)} deducted.`;
    showToast(msg, overTime ? "error" : "success");
    celebrate();
}

async function forgotTapOutTrip() {
    const card = getActiveCard();
    if (!card || !card.tapIn) return;
    const ok = await askConfirm(`Your open trip from ${card.tapIn.station} will be closed and the maximum fare charged, as a station gate would do.`, { title: "Close this trip?", yes: "Close trip", danger: true });
    if (!ok) return;
    const cards = getAllCards();
    const c = cards.find(x => x.cardNumber === card.cardNumber);
    const fare = chargeTrip(c, c.tapIn.station, { penalty: true, noExit: true });
    saveAllCards(cards);
    addAuditLog(`Incomplete journey closed on ${c.cardNumber} (-${money(fare)})`);
    closeModal("gateTapModal");
    loadActiveCardData();
    showToast(`Trip closed. Penalty ${money(fare)} charged.`, "success");
}

// ---------- 30-day pass ----------
function passPrice(card) { return Fares.isConcession(card.cardCategory) ? PASS.concession : PASS.standard; }

function openPassModal() {
    const card = getActiveCard();
    if (!card) return showToast("Please sign in first.", "error");
    const price = passPrice(card);
    $("passPrice").innerText = money(price);
    $("passPriceNote").innerText = Fares.isConcession(card.cardCategory) ? "Concession price (50% off)" : "Standard price";
    const active = passValid(card);
    $("passStatus").innerHTML = active
        ? `${ICON("shield", "ic sm")} Active until <b>${esc(new Date(card.pass.end).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" }))}</b> · ${passDaysLeft(card)} ${esc(T("_daysLeft"))}`
        : "No active pass on this card.";
    $("btnBuyPass").innerText = active ? `Extend 30 days for ${money(price)}` : `Buy for ${money(price)}`;
    openModal("passModal");
}

function buyPass() {
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === getActiveCardNumber());
    if (!card || card.isBlocked) return showToast("This card is not active.", "error");
    const price = passPrice(card);
    if (card.balance < price) return showToast(`Not enough balance. The pass costs ${money(price)}; please reload first.`, "error");
    const start = passValid(card) ? new Date(card.pass.end) : new Date();
    const end = new Date(start.getTime() + PASS.days * 86400000);
    card.balance = round2(card.balance - price);
    card.pass = { start: (passValid(card) ? card.pass.start : start.toISOString()), end: end.toISOString(), price };
    addTx(card, "Pass", -price, `30-day unlimited rail pass (until ${end.toLocaleDateString("en-MY", { day: "numeric", month: "short" })})`);
    maybeAutoReload(card);
    saveAllCards(cards);
    addAuditLog(`30-day pass bought on ${card.cardNumber} (${money(price)})`);
    closeModal("passModal");
    loadActiveCardData();
    showToast("Pass activated. Rail trips are now free until it expires.", "success");
    celebrate();
}

// ---------- Auto reload settings ----------
function openAutoReloadModal() {
    const card = getActiveCard();
    if (!card) return showToast("Please sign in first.", "error");
    const ar = card.autoReload || { enabled: false, threshold: 5, amount: 20 };
    $("arEnabled").checked = !!ar.enabled;
    $("arThreshold").value = String(ar.threshold);
    $("arAmount").value = String(ar.amount);
    openModal("autoReloadModal");
}

function saveAutoReload() {
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === getActiveCardNumber());
    if (!card) return;
    card.autoReload = { enabled: $("arEnabled").checked, threshold: Number($("arThreshold").value), amount: Number($("arAmount").value) };
    const topped = maybeAutoReload(card);
    saveAllCards(cards);
    addAuditLog(`Auto reload ${card.autoReload.enabled ? "on" : "off"} for ${card.cardNumber}`);
    closeModal("autoReloadModal");
    loadActiveCardData();
    showToast(card.autoReload.enabled ? `Auto reload on: +${money(card.autoReload.amount)} when below ${money(card.autoReload.threshold)}.${topped ? " Topped up now." : ""}` : "Auto reload turned off.", "success");
}

// =========================================================
// FARE CALCULATOR
// =========================================================
function initFareCalc() {
    const f = $("fcFrom"), t = $("fcTo");
    if (!f || !t || typeof Fares === "undefined") return;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem("fare_calc_last")) || {}; } catch (e) { }
    const from = Fares.stationLines.has(saved.from) ? saved.from : "KL Sentral";
    const to = Fares.stationLines.has(saved.to) ? saved.to : "Kajang";
    f.innerHTML = Fares.optionsHtml(from); t.innerHTML = Fares.optionsHtml(to);
    f.value = from; t.value = to;
    if ($("statStations")) $("statStations").textContent = Fares.ALL_STATIONS.length;

    const chips = Fares.LINES.map(l => `<span class="line-dot"><i style="background:${l.color}"></i>${esc(l.name)}</span>`).join("");
    if ($("fcLegend")) $("fcLegend").innerHTML = chips;
    if ($("heroLines")) $("heroLines").innerHTML = chips;
    renderFavs();
}

function swapFareStations() {
    const f = $("fcFrom"), t = $("fcTo");
    const a = f.value; f.value = t.value; t.value = a;
    renderFareCalc();
}

function renderFareCalc() {
    const box = $("fcResult");
    if (!box || typeof Fares === "undefined" || !$("fcFrom").value) return;
    const from = $("fcFrom").value, to = $("fcTo").value;
    const pill = document.querySelector(".cat-pill.active");
    const cat = pill ? pill.dataset.cat : "Standard";
    try { localStorage.setItem("fare_calc_last", JSON.stringify({ from, to })); } catch (e) { }

    if (from === to) {
        box.innerHTML = `<p class="muted" style="margin:auto;text-align:center;">${esc(T("_same"))}</p>`;
        return;
    }
    const q = Fares.quote(from, to, cat);
    if (!q) { box.innerHTML = `<p class="muted">Route not found.</p>`; return; }

    const lineChip = code => { const l = Fares.lineByCode[code]; return `<span class="line-chip" style="background:${l.color}">${l.code}</span>`; };
    const legs = q.legs.map((l, i) => {
        const line = Fares.lineByCode[l.line];
        const xfer = i < q.legs.length - 1 ? `<div class="xfer">${ICON("transfer", "ic sm")}${esc(T("_change"))}: ${esc(l.to)}</div>` : "";
        return `<li style="--c:${line.color}">
            <div class="leg-name">${lineChip(l.line)}${esc(l.from)}</div>
            <div class="leg-meta">${esc(line.name)} ${esc(T("_toward"))} ${esc(l.to)} · ${l.stops} ${esc(T("_stopsN"))} · ${l.km.toFixed(1)} km</div>
            ${xfer}
        </li>`;
    }).join("") + `<li style="--c:${Fares.lineByCode[q.legs[q.legs.length - 1].line].color}"><div class="leg-name">${lineChip(q.legs[q.legs.length - 1].line)}${esc(to)}</div></li>`;

    const fav = isFav(from, to);
    box.innerHTML = `
        <div class="result-top"><p class="muted" style="font-size:13px;font-weight:600;">${esc(T("_youPay"))}</p>
        <button type="button" class="btn btn-ghost btn-sm fav-btn${fav ? " on" : ""}" onclick="toggleFavRoute()">${ICON("star", "ic sm")}${esc(T(fav ? "_savedRoute" : "_saveRoute"))}</button></div>
        <div class="fare-big"><b>${money(q.finalFare)}</b>${q.concession ? `<s>${money(q.standardFare)}</s><span class="fare-tag">${esc(T("_conc"))}</span>` : ""}</div>
        <div class="metrics">
            <div class="metric"><span>${esc(T("_distance"))}</span><b>${q.km} km</b></div>
            <div class="metric"><span>${esc(T("_stops"))}</span><b>${q.stops}</b></div>
            <div class="metric"><span>${esc(T("_changes"))}</span><b>${q.transfers}</b></div>
            <div class="metric"><span>${esc(T("_time"))}</span><b>~${q.minutes} min</b></div>
        </div>
        <ol class="route">${legs}</ol>
        <p class="calc-note">${ICON("info", "ic sm")} ${esc(T("_est"))}</p>`;
}

// =========================================================
// TRANSACTION LIST & RECEIPTS
// =========================================================
let activeReceiptTx = null;

function renderTransactions() {
    const list = $("transactionList");
    if (!list) return;
    const card = getActiveCard();
    const q = (($("txSearchInput") || {}).value || "").toLowerCase();
    const type = ($("txTypeFilter") || {}).value || "all";

    // keep each transaction's real position so the receipt opens the right one
    const items = (card ? card.transactions : [])
        .map((tx, idx) => ({ tx, idx }))
        .filter(({ tx }) => (type === "all" || tx.type === type) && String(tx.desc || "").toLowerCase().includes(q));

    if (!items.length) {
        list.innerHTML = `<li class="no-data-item">${esc(T("noTxText"))}</li>`;
        return;
    }
    list.innerHTML = items.map(({ tx, idx }) => txItemHtml(tx, idx)).join("");
}

function txItemHtml(tx, idx) {
    const amt = Number(tx.amount) || 0;
    const icon = { Reload: "plus", Transfer: "transfer", Adjustment: "tool", Fare: "gate", Pass: "ticket" }[tx.type] || "info";
    const amtHtml = amt ? `<span class="tx-amt ${amt > 0 ? "plus" : "minus"}">${amt > 0 ? "+" : "−"}${money(Math.abs(amt))}</span>` : "";
    const clickable = idx >= 0;
    return `<li class="tx-item${clickable ? " clickable" : ""}"${clickable ? ` onclick="openTxReceiptModal(${idx})" tabindex="0" role="button" onkeydown="if(event.key==='Enter')openTxReceiptModal(${idx})"` : ""}>
        <span class="tx-icon ${esc(tx.type)}">${ICON(icon)}</span>
        <div class="tx-main">
            <div class="tx-title">${esc(tx.desc)}</div>
            <div class="tx-date">${esc(fmtDate(tx.date))}</div>
        </div>
        ${amtHtml}
    </li>`;
}

function receiptRef(tx) {
    if (tx.id) return tx.id;
    // older records without an id: derive a stable reference from the date
    return "TXN-" + String(tx.date || "").replace(/\D/g, "").slice(0, 14);
}

function openTxReceiptModal(idx) {
    const card = getActiveCard();
    if (!card || !card.transactions[idx] || !$("receiptSlipBody")) return;

    activeReceiptTx = card.transactions[idx];
    const tx = activeReceiptTx;
    const amt = Number(tx.amount) || 0;
    const row = (k, v) => `<div class="receipt-row"><span>${k}</span><span style="text-align:right;overflow-wrap:anywhere;">${esc(v)}</span></div>`;

    $("receiptSlipBody").innerHTML =
        row("Reference", receiptRef(tx)) +
        row("Card number", card.cardNumber) +
        row("Holder", card.holderName) +
        row("Date & time", fmtDate(tx.date)) +
        row("Type", tx.type) +
        row("Description", tx.desc) +
        (tx.baseFare ? row("Base fare", money(tx.baseFare)) : "") +
        (tx.distanceKm ? row("Distance", tx.distanceKm + " km") : "") +
        `<hr class="receipt-divider">
        <div class="receipt-total"><span>Amount</span><span style="color:${amt >= 0 ? "var(--success)" : "var(--text)"}">${amt >= 0 ? "+" : "−"}${money(Math.abs(amt))}</span></div>` +
        (tx.balanceAfter !== undefined ? row("Balance after", money(tx.balanceAfter)) : "");

    openModal("txReceiptModal");
}

function downloadSingleReceiptPdf() {
    const card = getActiveCard();
    if (!card || !activeReceiptTx) return;
    const jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) return showToast("PDF engine loading…", "error");

    const doc = new jsPDF({ unit: "mm", format: [80, 130] });
    const tx = activeReceiptTx;
    const amt = Number(tx.amount) || 0;

    doc.setFillColor(7, 12, 26); doc.rect(0, 0, 80, 22, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(255, 255, 255);
    doc.text("TRANSIT HUB MALAYSIA", 40, 11, { align: "center" });
    doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(148, 161, 191);
    doc.text("Official Transaction Receipt", 40, 16, { align: "center" });

    doc.setTextColor(15, 23, 42); doc.setFontSize(8);
    let y = 30;
    const line = (k, v) => { doc.setTextColor(100, 116, 139); doc.text(k, 8, y); doc.setTextColor(15, 23, 42); doc.text(String(v), 72, y, { align: "right" }); y += 6; };
    line("Reference", receiptRef(tx));
    line("Card No", card.cardNumber);
    line("Holder", card.holderName);
    line("Category", shortCat(card.cardCategory));
    line("Date", fmtDate(tx.date));
    line("Type", tx.type);
    if (tx.baseFare) line("Base fare", money(tx.baseFare));
    const descLines = doc.splitTextToSize(String(tx.desc).replace(/➔/g, "->"), 64);
    doc.setTextColor(30, 41, 59); doc.text(descLines, 8, y + 1); y += descLines.length * 4 + 4;

    doc.setDrawColor(200, 200, 200); doc.setLineDashPattern([1, 1], 0); doc.line(8, y, 72, y); y += 8;
    doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    doc.text("Amount", 8, y); doc.text((amt >= 0 ? "+" : "-") + money(Math.abs(amt)), 72, y, { align: "right" }); y += 7;
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    const bal = tx.balanceAfter !== undefined ? tx.balanceAfter : null;
    if (bal !== null) { doc.text("Balance after", 8, y); doc.text(money(bal), 72, y, { align: "right" }); }

    doc.setFontSize(7); doc.setTextColor(120, 120, 120);
    doc.text("Thank you for travelling with Transit Hub.", 40, 122, { align: "center" });
    doc.save(`Receipt_${receiptRef(tx)}.pdf`);
}

// =========================================================
// SAVED ROUTES (fare calculator favourites)
// =========================================================
const getFavs = () => readJSON("fare_favs", []);
const isFav = (from, to) => getFavs().some(f => f.from === from && f.to === to);

function toggleFavRoute() {
    const from = $("fcFrom").value, to = $("fcTo").value;
    if (from === to) return;
    let favs = getFavs();
    if (isFav(from, to)) favs = favs.filter(f => !(f.from === from && f.to === to));
    else {
        favs.unshift({ from, to });
        favs = favs.slice(0, 8);
        showToast("Route saved.", "success");
    }
    localStorage.setItem("fare_favs", JSON.stringify(favs));
    renderFavs();
    renderFareCalc();
}

function useFavRoute(i) {
    const f = getFavs()[i];
    if (!f) return;
    $("fcFrom").value = f.from; $("fcTo").value = f.to;
    renderFareCalc();
}

function removeFavRoute(i, e) {
    e.stopPropagation();
    const favs = getFavs();
    favs.splice(i, 1);
    localStorage.setItem("fare_favs", JSON.stringify(favs));
    renderFavs();
    renderFareCalc();
}

function renderFavs() {
    const box = $("savedRoutes");
    if (!box) return;
    const favs = getFavs();
    box.hidden = !favs.length;
    $("savedRoutesList").innerHTML = favs.map((f, i) => `
        <button type="button" class="fav-chip" onclick="useFavRoute(${i})">${ICON("star", "ic sm")}<span>${esc(f.from)} → ${esc(f.to)}</span>
        <span class="fav-x" role="button" aria-label="Remove" onclick="removeFavRoute(${i}, event)">×</span></button>`).join("");
}

// =========================================================
// SELF-SERVICE PIN RESET
// =========================================================
let fpOtp = null, fpCardNo = null;

function openForgotPinModal() {
    fpOtp = null; fpCardNo = null;
    ["fpCard", "fpPhone", "fpCode", "fpNewPin"].forEach(id => $(id).value = "");
    $("fpCard").value = $("loginCardNo").value.trim();
    $("fpStep2").hidden = true;
    openModal("forgotPinModal");
}

function sendPinResetCode() {
    const card = findCard(getAllCards(), $("fpCard").value.trim());
    const phone = $("fpPhone").value.trim().replace(/[\s-]/g, "");
    if (!card || card.phone.replace(/[\s-]/g, "") !== phone) return showToast("Card number and phone number don't match our records.", "error");
    fpCardNo = card.cardNumber;
    fpOtp = Math.floor(1000 + Math.random() * 9000);
    $("fpOtpMsg").innerHTML = `SMS simulation: code sent to ${esc(card.phone.slice(0, 4))}••••${esc(card.phone.slice(-3))} is <b class="mono">${fpOtp}</b>`;
    $("fpStep2").hidden = false;
    $("fpCode").focus();
}

function confirmPinReset() {
    if (!fpOtp) return showToast("Request a code first.", "error");
    if ($("fpCode").value.trim() !== String(fpOtp)) return showToast("Incorrect code.", "error");
    const pin = $("fpNewPin").value.trim();
    if (!/^\d{4}$/.test(pin)) return showToast("New PIN must be exactly 4 digits.", "error");
    const cards = getAllCards();
    const card = cards.find(c => c.cardNumber === fpCardNo);
    if (!card) return;
    card.pinHash = pinHashFor(card.cardNumber, pin);
    delete card.pin;
    addTx(card, "Info", 0, "PIN changed by cardholder (SMS verified)");
    saveAllCards(cards);
    setLock({ fails: 0, until: 0 });
    addAuditLog(`Self-service PIN reset for ${card.cardNumber}`);
    fpOtp = null;
    closeModal("forgotPinModal");
    $("loginCardNo").value = card.cardNumber;
    $("loginPin").value = "";
    $("loginPin").focus();
    showToast("PIN updated. Sign in with your new PIN.", "success");
}

// =========================================================
// INSTALLABLE APP (PWA)
// =========================================================
let installPrompt = null;
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => { }));
}
window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    installPrompt = e;
    const b = $("installBtn");
    if (b) b.hidden = false;
});
window.addEventListener("appinstalled", () => {
    const b = $("installBtn");
    if (b) b.hidden = true;
    showToast("Transit Hub installed.", "success");
});
async function installApp() {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    $("installBtn").hidden = true;
}

// =========================================================
// ADMIN: BUSIEST STATIONS
// =========================================================
function renderStationStats(cards) {
    const box = $("stationStats");
    if (!box) return;
    const counts = {};
    cards.forEach(c => c.transactions.forEach(t => {
        if (t.type !== "Fare") return;
        let o = t.origin, d = t.destination;
        if (!o) { const m = String(t.desc).match(/:\s*(.+?)\s*➔\s*(.+?)(\s*\(|$)/); if (m) { o = m[1]; d = m[2]; } }
        [o, d].forEach(s => { if (s) counts[s] = (counts[s] || 0) + 1; });
    }));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const max = top.length ? top[0][1] : 1;
    const lineColor = st => { const ls = Fares.stationLines.get(st); return ls ? Fares.lineByCode[[...ls][0]].color : "var(--primary)"; };
    box.innerHTML = top.length ? top.map(([st, n]) => `
        <div class="st-row"><span class="st-name"><i style="background:${lineColor(st)}"></i>${esc(st)}</span>
        <span class="st-bar"><i style="width:${n / max * 100}%;background:${lineColor(st)}"></i></span><b>${n}</b></div>`).join("")
        : `<p class="muted" style="font-size:14px;">No gate taps recorded yet.</p>`;
}


// =========================================================
// SCROLL ANIMATIONS
// Reveal-on-scroll, parallax city, progress bar, shrinking top bar,
// and counters that count up when they come into view.
// =========================================================
(function scrollFx() {
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Progress bar along the top of the page
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    // What animates in, and how. Children of a group appear one after another.
    const groups = [
        [".hero > div:first-child > *", "up"],
        [".auth-card", "right"],
        [".section-head", "up"],
        [".calc-form", "left"],
        [".calc-result", "right"],
        [".feature", "up"],
        [".dash-head", "up"],
        ["#virtualCard", "zoom"],
        [".action", "up"],
        [".mini-stat", "up"],
        [".dash-grid .panel", "up"],
        [".kpi", "up"],
        [".chart-card", "up"],
        [".table-card", "up"],
        [".tool", "up"],
        [".footer .container", "fade"]
    ];

    let io = null;
    function tag() {
        if (reduce || !("IntersectionObserver" in window)) return;
        groups.forEach(([sel, kind]) => {
            const seen = new Map();
            document.querySelectorAll(sel).forEach(el => {
                if (el.dataset.reveal) return;
                const parent = el.parentElement;
                const i = seen.get(parent) || 0;
                seen.set(parent, i + 1);
                el.dataset.reveal = kind;
                el.style.setProperty("--d", Math.min(i, 8) * 70 + "ms");
                io.observe(el);
            });
        });
    }

    if (!reduce && "IntersectionObserver" in window) {
        io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add("in");
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    }

    // Count up numbers such as "134" and "50%" in the hero when they appear
    function countUp(el) {
        const m = el.textContent.trim().match(/^(\d+)(.*)$/);
        if (!m || reduce) return;
        const target = +m[1], suffix = m[2], t0 = performance.now();
        (function step(now) {
            const p = Math.min(1, (now - t0) / 1200);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(step);
        })(t0);
    }

    // Parallax + progress + top bar, throttled to one update per frame
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - innerHeight;
            bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
            const top = document.querySelector(".topbar");
            if (top) top.classList.toggle("scrolled", y > 20);
            if (!reduce) {
                document.querySelectorAll(".scene .px").forEach(g => {
                    g.style.transform = `translateY(${Math.min(y * parseFloat(g.dataset.depth), 160)}px)`;
                });
                const glow = document.querySelector(".scene .glow.g2");
                if (glow) glow.style.transform = `translateY(${-y * 0.08}px)`;
            }
            ticking = false;
        });
    }

    window.addEventListener("load", () => {
        tag();
        const stats = document.querySelectorAll(".hero-stats b");
        if (stats.length && "IntersectionObserver" in window) {
            const so = new IntersectionObserver(es => es.forEach(e => {
                if (e.isIntersecting) { countUp(e.target); so.unobserve(e.target); }
            }), { threshold: 0.6 });
            stats.forEach(s => so.observe(s));
        }
        onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Sections that appear later (dashboard after sign-in, admin after login) get tagged too
    const mo = new MutationObserver(() => tag());
    ["userDashboard", "authLandingView", "adminDashboardContainer", "adminLoginContainer"].forEach(id => {
        const el = document.getElementById(id);
        if (el) mo.observe(el, { attributes: true, attributeFilter: ["style"] });
    });
})();