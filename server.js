const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// SQLite database
const db = new sqlite3.Database(path.join(__dirname, "character_quiz.db"));

// ============================
// TABLO OLUSTURMA
// ============================
db.serialize(() => {
    // Kullanici cevaplari tablosu
    db.run(`CREATE TABLE IF NOT EXISTS cevaplar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        soru TEXT,
        cevap TEXT,
        tarih DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Karakter quiz sorulari
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS question_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        FOREIGN KEY (question_id) REFERENCES questions(id)
    )`);

    // Arketipler
    db.run(`CREATE TABLE IF NOT EXISTS archetypes (
        id TEXT PRIMARY KEY,
        title TEXT, icon TEXT, description TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS archetype_traits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        archetype_id TEXT, trait TEXT,
        FOREIGN KEY (archetype_id) REFERENCES archetypes(id)
    )`);

    // Kariyer sorulari
    db.run(`CREATE TABLE IF NOT EXISTS career_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        archetype_id TEXT, question TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS career_question_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        career_question_id INTEGER, text TEXT, type TEXT
    )`);

    // Kariyer sonuclari
    db.run(`CREATE TABLE IF NOT EXISTS career_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        archetype_id TEXT, career_type TEXT, result_title TEXT
    )`);

    // Kariyer haritasi sorulari
    db.run(`CREATE TABLE IF NOT EXISTS career_map_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT, snippet TEXT, snippet_type TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS career_map_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER, text TEXT, type TEXT
    )`);

    // Kariyer baslik esleme
    db.run(`CREATE TABLE IF NOT EXISTS career_title_mapping (
        type TEXT PRIMARY KEY, title TEXT
    )`);

    // Kombine meslek esleme
    db.run(`CREATE TABLE IF NOT EXISTS combined_profession_mapping (
        combo_key TEXT PRIMARY KEY, job_title TEXT, description TEXT
    )`);

    // Maas verileri
    db.run(`CREATE TABLE IF NOT EXISTS combined_salary_data (
        combo_key TEXT PRIMARY KEY, salary_tr TEXT, salary_global TEXT
    )`);

    // Egitim yol haritalari
    db.run(`CREATE TABLE IF NOT EXISTS roadmap_data (
        type TEXT PRIMARY KEY, fundamentals TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS roadmap_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT, text TEXT, url TEXT
    )`);
});

// ============================
// VERI EKLEME (SEED)
// ============================
function seedDatabase() {
    db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
        if (err || (row && row.count > 0)) {
            if (!err) console.log("Veriler zaten mevcut, seed atlanıyor.");
            return;
        }
        console.log("Veriler ekleniyor...");
        db.serialize(() => {
            seedQuestions();
            seedArchetypes();
            seedCareerQuestions();
            seedCareerResults();
            seedCareerMapQuestions();
            seedCareerTitleMapping();
            seedCombinedProfession();
            seedSalaryData();
            seedRoadmapData();
            console.log("Tum veriler basariyla eklendi!");
        });
    });
}

function seedQuestions() {
    const questions = [
        ["Büyük bir hayal kırıklığı yaşadığında, içindeki acıyla nasıl başa çıkarsın?", [
            ["Duygularımı bir kenara bırakıp hızla yeni bir hedefe odaklanırım. Durmak bana göre değil.", "A"],
            ["Neden böyle olduğunu uzun uzun analiz eder, bu deneyimden felsefi bir ders çıkarırım.", "B"],
            ["Bulunduğum ortamdan tamamen uzaklaşır, yeni bir yere giderek zihnimi sıfırlarım.", "C"],
            ["Acımı en yakınlarımla paylaşır, onların destek ve şefkatiyle iyileşmeye çalışırım.", "D"]
        ]],
        ["Bir odada herkesin tartıştığı ve ortamın iyice gerildiği bir an düşün. Böyle bir durumda ne yaparsın?", [
            ["Otoritemi hissettirerek kontrolü elime alır ve tartışmayı net bir kararla sonlandırırım.", "A"],
            ["Sessizce gözlem yapar, iki tarafın da asıl sorununu tespit edip mantıklı bir çözüm sunarım.", "B"],
            ["Bu negatif enerji bana fazla gelir, kimseye çaktırmadan ortamdan uzaklaşırım.", "C"],
            ["Araya girip ortamı yumuşatacak bir espri yapar veya tarafları sakinleştirmeye çalışırım.", "D"]
        ]],
        ["Gece yatağa yattığında uykudan önce aklından geçen en baskın düşünce genellikle nedir?", [
            ["Yarın halletmem gereken işler, stratejilerim ve sıradaki büyük adımlarım.", "A"],
            ["Bugün ne öğrendim? İnsan doğasının ve hayatın o tuhaf karmaşıklığı...", "B"],
            ["Gitmek istediğim yeni ülkeler, denemek istediğim farklı ve çılgın şeyler.", "C"],
            ["Bugün sevdiklerimi mutlu edebildim mi? Acaba bilmeden birini kırdım mı?", "D"]
        ]],
        ["Biri sana haksız ve oldukça sert bir eleştiri yaptığında ilk içsel tepkin ne olur?", [
            ["'Benim kim olduğumu bilmiyor, ona gücümü ve haklılığımı er ya da geç kanıtlayacağım.'", "A"],
            ["'Bu eleştirinin arkasında yatan asıl psikolojik sebep veya kendi güvensizliği ne olabilir?'", "B"],
            ["Umursamam. Başkalarının benim hakkımda ne düşündüğüne takılmak büyük bir zaman kaybı.", "C"],
            ["Gerçekten hatalı mıyım diye kendimi derinden sorgular ve içten içe üzüntü duyarım.", "D"]
        ]],
        ["Hayatta seni en çok korkutan, içten içe kabusun olabilecek şey aşağıdakilerden hangisidir?", [
            ["Kontrolü tamamen kaybetmek ve başkalarının yönetimi altına girmek.", "A"],
            ["Gerçekleri görememek, cehalet içinde yaşamak ve kandırılmak.", "B"],
            ["Sıradan, rutin ve hiçbir heyecanı olmayan sıkıcı bir hayata hapsolmak.", "C"],
            ["Tamamen yalnız kalmak ve değer verdiğim insanların beni terk etmesi.", "D"]
        ]],
        ["Eğer dünyada tek bir şeyi değiştirme gücün olsaydı, bu ne olurdu?", [
            ["Küresel ve mükemmel işleyen bir düzen kurar, tüm kaosu ve verimsizliği silerdim.", "A"],
            ["Tüm insanların gerçeği arayan, bilinçli ve çok daha derin varlıklar olmasını sağlardım.", "B"],
            ["Fiziksel ve zihinsel tüm sınırları kaldırır, insanlığa sınır tanımaz mutlak özgürlüğü verirdim.", "C"],
            ["Dünyadaki tüm acıları, nefreti ve eşitsizliği yok eder, saf şefkati hakim kılardım.", "D"]
        ]],
        ["Gizli bir yeteneğin olsaydı, bunun hangisi olmasını isterdin?", [
            ["İnsanların zihnine girip onları gizlice yönlendirebilmek veya kararlarını etkileyebilmek.", "A"],
            ["Geçmişteki ve gelecekteki tüm sırları görebilmek, evrenin mutlak bilgisine erişmek.", "B"],
            ["Gözümü kapattığım an, uzay ve zaman tanımaksızın evrenin herhangi bir yerine ışınlanabilmek.", "C"],
            ["Dokunduğum insanların fiziksel veya ruhsal tüm yaralarını, acılarını anında iyileştirebilmek.", "D"]
        ]],
        ["Sana devasa bir servet miras kalsaydı, paranın kontrolünü eline aldığında yapacağın ilk şey ne olurdu?", [
            ["Bu serveti daha da katlayacak devasa bir iş, sistem veya imparatorluk kurmak.", "A"],
            ["Bilimsel araştırmalara, laboratuvarlara ve büyük kütüphanelere sonsuz bir fon sağlamak.", "B"],
            ["Hiçbir plan yapmadan, sorumluluk almadan dünyayı uçtan uca gezmek için bir bütçe ayırmak.", "C"],
            ["İhtiyacı olanlara, çocuklara veya savunmasızlara adanmış devasa bir yardım ağı kurmak.", "D"]
        ]],
        ["Kendini bir doğa elementi ile karakterize edecek olsaydın, hangisini seçerdin?", [
            ["Ateş: Yakıcı, dönüştürücü, güçlü, enerjik ve bazen de yok edici.", "A"],
            ["Toprak: Sabit, dayanıklı, kökleri derinde, besleyici ve bilge.", "B"],
            ["Rüzgar: Ele avuca sığmaz, yönü belirsiz, sınır tanımaz, özgür ve hızlı.", "C"],
            ["Su: Uyumlu, girdiği kabın şeklini alan, şifa veren, derin ve birleştirici.", "D"]
        ]],
        ["Bir gün bu dünyadan ayrıldığında, insanlar seni en çok hangi cümlen veya duruşunla hatırlasın istersin?", [
            ["'O, her zaman en öndeydi ve imkansız denileni başaran büyük bir öncü/liderdi.'", "A"],
            ["'O, kimsenin göremediği gerçekleri gören, anlayan çok derin bir bilgeydi.'", "B"],
            ["'O, hiçbir kurala sığmayan, hayatı sonuna kadar yaşayan cesur bir maceraperestti.'", "C"],
            ["'O, hayatına dokunduğu herkesi iyileştiren, kocaman kalpli bir kahramandı.'", "D"]
        ]]
    ];
    questions.forEach(([qText, opts]) => {
        db.run("INSERT INTO questions (question) VALUES (?)", [qText], function () {
            const qid = this.lastID;
            opts.forEach(([oText, oType]) => {
                db.run("INSERT INTO question_options (question_id, text, type) VALUES (?,?,?)", [qid, oText, oType]);
            });
        });
    });
}

function seedArchetypes() {
    const data = [
        ["A", "Lider (The Ruler)", "👑", "Kararlı, cesur ve vizyoner bir ruha sahipsin.", ["Kriz anlarında soğukkanlı", "Doğuştan yönetici", "Hedef odaklı"]],
        ["B", "Bilge (The Sage)", "🦉", "Analitik, derin düşünceli ve bilgiye açsın.", ["Sorgulayıcı zihin", "Mantıklı kararlar", "Sürekli öğrenen"]],
        ["C", "Kaşif (The Explorer)", "🧭", "Maceraperest, yenilikçi ve özgürlüğüne aşıksın.", ["Risk almayı seven", "Özgür ruhlu", "Yeni deneyimler arayan"]],
        ["D", "Koruyucu (The Caregiver)", "🛡️", "Şefkatli, fedakar ve son derece güvenilir birisin.", ["Empati ustası", "İyi bir dinleyici", "Sevdiklerine sadık"]]
    ];
    data.forEach(([id, title, icon, desc, traits]) => {
        db.run("INSERT INTO archetypes VALUES (?,?,?,?)", [id, title, icon, desc]);
        traits.forEach(t => db.run("INSERT INTO archetype_traits (archetype_id, trait) VALUES (?,?)", [id, t]));
    });
}

function seedCareerQuestions() {
    const data = {
        A: ["Lider ruhlu biri olarak, kariyerinde hangi ortam seni daha çok tatmin eder?", [
            ["Büyük bir şirketin zirvesine tırmanıp CEO koltuğuna oturmak.", "C1"],
            ["Kendi girişimimi kurup sıfırdan devasa bir imparatorluk yaratmak.", "C2"],
            ["Siyasete veya kamu yönetimine atılıp geniş kitleleri yönetmek.", "C3"],
            ["Askeriye veya kriz yönetimi gibi disiplin ve otorite gerektiren alanlar.", "C4"]
        ]],
        B: ["Bilgiye bu kadar aç biri olarak, mesleki hayatını neye adamak istersin?", [
            ["Akademiye katılıp araştırma görevlisi, profesör veya yazar olmak.", "C1"],
            ["Veri bilimi, analiz veya teknoloji alanlarında derin uzmanlık kazanmak.", "C2"],
            ["İnsanların sorunlarını kökten çözen bir terapist veya psikolog olmak.", "C3"],
            ["Adaletin ve mantığın savunucusu olarak iyi bir avukat veya hakim olmak.", "C4"]
        ]],
        C: ["Özgürlüğüne düşkün keşifçi ruhun, hangi kariyer yolunda parlayabilir?", [
            ["Dünyayı gezerek belgesel veya seyahat içerikleri üreten bir yaratıcı olmak.", "C1"],
            ["Sürekli sahada olacağım arkeoloji, jeoloji veya doğa araştırmacılığı.", "C2"],
            ["Masa başı olmayan, serbest çalışan bir dijital göçebe, sanatçı veya tasarımcı.", "C3"],
            ["Adrenalin dolu bir meslek; pilot, dalgıç veya ekstrem spor eğitmeni.", "C4"]
        ]],
        D: ["Şefkatli ve yardımsever doğan, profesyonel hayatta nasıl vücut bulmalı?", [
            ["Hayat kurtaran bir doktor, hemşire veya sağlık çalışanı olmak.", "C1"],
            ["Yeni nesilleri yetiştiren öğretmen, eğitmen veya pedagog olmak.", "C2"],
            ["Toplumsal eşitsizliklere savaş açan bir sosyal hizmet uzmanı veya aktivist.", "C3"],
            ["İnsan kaynakları veya takım koçluğu yaparak kurum içi huzuru sağlamak.", "C4"]
        ]]
    };
    Object.entries(data).forEach(([archId, [qText, opts]]) => {
        db.run("INSERT INTO career_questions (archetype_id, question) VALUES (?,?)", [archId, qText], function () {
            const cqid = this.lastID;
            opts.forEach(([oText, oType]) => {
                db.run("INSERT INTO career_question_options (career_question_id, text, type) VALUES (?,?,?)", [cqid, oText, oType]);
            });
        });
    });
}

function seedCareerResults() {
    const data = {
        A: { C1: "Kurumsal Lider / CEO", C2: "Girişimci / Kurucu", C3: "Siyasetçi / Bürokrat", C4: "Kriz Yöneticisi / Komutan" },
        B: { C1: "Akademisyen / Yazar", C2: "Veri Analisti / Sistem Mimarı", C3: "Psikolog / Terapist", C4: "Avukat / Hakim" },
        C: { C1: "Seyahat Yazarı / İçerik Üreticisi", C2: "Araştırmacı / Arkeolog", C3: "Dijital Göçebe / Freelancer", C4: "Pilot / Ekstrem Spor Eğitmeni" },
        D: { C1: "Doktor / Sağlık Uzmanı", C2: "Öğretmen / Eğitimci", C3: "Sosyal Hizmet Uzmanı", C4: "İnsan Kaynakları Uzmanı / Koç" }
    };
    Object.entries(data).forEach(([archId, results]) => {
        Object.entries(results).forEach(([ct, title]) => {
            db.run("INSERT INTO career_results (archetype_id, career_type, result_title) VALUES (?,?,?)", [archId, ct, title]);
        });
    });
}

function seedCareerMapQuestions() {
    const qs = [
        ["1. Aşağıdaki Python koduna bak. Sence burada bariz bir hata var mı?", "def hesapla(a, b):\n    return a + b\n\nsonuc = hesapla(5)\nprint(sonuc)", "code", [
            ["Evet, fonksiyona 2 parametre verilmiş ama sadece 1 tane gönderilmiş.", "YAZILIM"],
            ["Hata falan umurumda değil, kod bloğunun renkleri ve yerleşimi çok sıkıcı.", "TASARIM"],
            ["Kodda hata var ama asıl soru bu fonksiyon tam olarak ne hesaplıyor?", "ANALITIK"],
            ["Takımımdaki yazılımcıya sorarım, benim işim kodu değil ekibi yönetmek.", "LIDERLIK"]
        ]],
        ["2. Bir ürün lansmanı metninde şu cümleyi gördün. Ekibe ne söylersin?", "'Kullanıcılarımızın %80'i belki bu ürünü çok sevebilir.'", "text", [
            ["Bunun arkasındaki sistem hatalı, ürünü seviyorlarsa net bir metrik döner.", "YAZILIM"],
            ["Bu çok zayıf bir kelime ('belki'). Daha iddialı bir kampanya metni yazmalıyız.", "TASARIM"],
            ["'%80' verisine nasıl ulaştık? A/B test sonuçlarını acilen görmek istiyorum.", "ANALITIK"],
            ["Metni yazan kişiyi motive edici bir toplantıya çağırırım.", "LIDERLIK"]
        ]],
        ["3. Bir mobil uygulama arayüzünde 'Satın Al' butonu gri renkte ve sayfanın en altında gizlenmiş. Tepkin?", "Buton: [SATIN AL] (Renk: #cccccc, Konum: Sayfa sonu)", "text", [
            ["Butonun tıklanma event'i doğru bağlanmış mı diye kod tarafını kontrol ederim.", "YAZILIM"],
            ["Facia! Buton canlı bir renkte ve kullanıcının göz hizasında olmalı.", "TASARIM"],
            ["Kullanıcıların bu gri butona tıklama davranış raporlarını inceleyelim.", "ANALITIK"],
            ["UX tasarımcısını yanıma çağırıp satış hedeflerimizi tartışırım.", "LIDERLIK"]
        ]],
        ["4. Önüne şöyle tuhaf bir veri tablosu geldi. Bu tablo sence ne işe yarıyor?", "ID | AGE | CTR (%) | REVENUE\n1  | 24  | 5.2     | $120\n2  | 35  | 2.1     | $45\n3  | 19  | 8.4     | $210", "code", [
            ["Bu SQL'den çekilmiş bir tablo. Hemen bir INNER JOIN yazıp birleştirmek isterim.", "YAZILIM"],
            ["Bu sayılar çok kuru. Bunları şık bir grafiğe dönüştürsek harika olur.", "TASARIM"],
            ["19-24 yaş arası CTR ve getirisi çok yüksek, stratejiyi o yöne kaydırmalıyız.", "ANALITIK"],
            ["Pazarlama ekibini toplantıya çağırıp genç kitleye agresif satış talimatını veririm.", "LIDERLIK"]
        ]],
        ["5. Şirketin ana sunucusu aniden çöktü. Çalışan ekranında hata var:", "Error 502 Bad Gateway / Connection Refused", "code", [
            ["Hemen sunucu loglarına girer, reverse proxy ve firewall ayarlarını incelerim.", "YAZILIM"],
            ["Hata sayfasının tasarımını sevimli bir illüstrasyonla değiştirmek isterdim.", "TASARIM"],
            ["Geçen ayın trafik verilerini çıkarıp, sunucunun ne zaman çöktüğünü hesaplarım.", "ANALITIK"],
            ["Müşterilere acil bir 'Bakımdayız' maili attırır ve ekibi koordine ederim.", "LIDERLIK"]
        ]],
        ["6. Bir projede kullanılacak logo için iki seçenek geldi:", "Logo A: Çok karmaşık, 7 farklı renk.\nLogo B: 2 renk, minimalist çizim.", "text", [
            ["Hangisinin dosya boyutu daha küçükse ve siteyi daha hızlı yükleyecekse onu seçerim.", "YAZILIM"],
            ["Kesinlikle Logo B! Modern tasarım 'Az çoktur' felsefesine dayanır.", "TASARIM"],
            ["A/B testi yaparız. 10.000 kullanıcıya gösterip tıklama verilerine göre karar veririz.", "ANALITIK"],
            ["Hangi logo markamızın misyonunu daha iyi yansıtıyorsa onu seçerim.", "LIDERLIK"]
        ]],
        ["7. Sosyal medyada markanızla ilgili bir kriz patlak verdi:", "Trend Topic: #SirketinizBoykot", "text", [
            ["Derhal sistemi kapatıp güvenlik açıklarını yamamaya başlarım.", "YAZILIM"],
            ["Empati dolu, şık tasarlanmış bir özür metni/görseli hazırlarım.", "TASARIM"],
            ["Bu tweetlerin yüzde kaçının bot hesaplardan geldiğini tespit ederim.", "ANALITIK"],
            ["Basın sözcüsü olarak resmi bir canlı yayın açıklaması yaparım.", "LIDERLIK"]
        ]],
        ["8. Aşağıdaki CSS kodu ne işe yarıyor olabilir?", ".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}", "code", [
            ["Bir elementi ekranın hem dikey hem yatay tam ortasına hizalamak için yazılmış.", "YAZILIM"],
            ["Bu kod sayesinde tasarladığım objeler altın oran estetiğiyle hizalanıyor.", "TASARIM"],
            ["Grid mi flexbox mı daha performanslı diye test edilmelidir.", "ANALITIK"],
            ["Ne işe yaradığını bilmem ama ekibe 'Her şey simetrik dursun!' talimatını veren benim.", "LIDERLIK"]
        ]],
        ["9. E-Ticaret sitenizin yıllık satış grafiğini incelediğinizde:", "Ocak: 100K | Nisan: 120K | Ağustos: 50K (Düşüş!) | Kasım: 300K", "text", [
            ["Ağustos'ta ödeme sistemlerinde bir çökme mi oldu diye loglara bakarım.", "YAZILIM"],
            ["Belki yaz kampanyasının banner tasarımları yeterince iştah açıcı değildi.", "TASARIM"],
            ["Rakiplerin fiyat indirimlerini ve müşteri kayıp oranını analiz etmeliyim.", "ANALITIK"],
            ["Kriz masası kurar, satış müdüründen savunma isterim.", "LIDERLIK"]
        ]],
        ["10. Şirketin yeni bir akıllı saat üretecek. İlk karar mekanizmasını sen kuracaksın:", "Proje Önceliği Ne Olmalı?", "text", [
            ["İşlemcisi mükemmel çalışmalı, kasmamalı ve pili 30 gün gitmeli.", "YAZILIM"],
            ["İncecik kasası, harika kayış renkleri ve kavisli ekranı olmalı.", "TASARIM"],
            ["Kullanıcının nabız, uyku ve kalori verilerini mükemmel toplayabilmeli.", "ANALITIK"],
            ["Öyle bir reklam hikayesi yaratmalıyız ki insanlar ön sipariş için sıraya girmeli.", "LIDERLIK"]
        ]],
        ["11. Ödeme sayfanızda çok yüksek bir terk etme oranıyla karşılaştın.", "Gelen kullanıcıların %85'i sepeti terk ediyor.", "text", [
            ["Ödeme API'lerinden dönen hata loglarını inceleyerek teknik arıza ararım.", "YAZILIM"],
            ["Gereksiz form elemanlarını siler ve güven veren bir tasarım kurgularım.", "TASARIM"],
            ["Funnel analizi yaparak kullanıcıların nerede kaçtığını verilerle bulurum.", "ANALITIK"],
            ["Terk eden kullanıcılara %10 indirim içeren kurtarma mailleri attırırım.", "LIDERLIK"]
        ]],
        ["12. Sana bir web sitesinin ilk tasarımı geldi ve şöyle bir kod gördün:", "<div style=\"color: #f1f1f1; background: #ffffff;\">Bu metin okunabilir mi?</div>", "code", [
            ["Inline CSS kullanılması iyi bir pratik değil. Class yapısına geçiririm.", "YAZILIM"],
            ["Bu korkunç! Beyaz üstüne açık gri font asla okunmaz. Kontrast düzeltmeliyiz.", "TASARIM"],
            ["Kötü kontrastın bounce rate'i nasıl etkilediğinin verisini çıkarırım.", "ANALITIK"],
            ["Accessibility vizyonu için tasarım ekibine bir brief yazarım.", "LIDERLIK"]
        ]],
        ["13. Ekibindeki iki üst düzey çalışan şiddetli bir teknik tartışmaya girdi.", "\"React mı kullanalım, Vue mu? Hangisi daha iyi?\"", "text", [
            ["Hangi kütüphanenin Virtual DOM'da daha yüksek hız sunduğuna teknik olarak bakarım.", "YAZILIM"],
            ["Hangisinin UI Libraries ve akıcı animasyonları entegre etmesi daha kolaysa onu seçerim.", "TASARIM"],
            ["GitHub'da her iki kütüphanenin community desteğini ve performans skorlarını analiz ederim.", "ANALITIK"],
            ["İki uzmanı masaya oturtur, projenin deadline'ına göre mantıklı bir orta yol bulurum.", "LIDERLIK"]
        ]],
        ["14. Uygulama kullanıcıları her butona bastığında donduğundan şikayet ediyor. Konsolda:", "{ \"error\": \"Timeout\", \"latency\": \"5500ms\" }", "code", [
            ["Veritabanı sorgularının indekslerini kontrol eder ve timeout sorununu çözerim.", "YAZILIM"],
            ["Kullanıcı 5 saniye beklerken hipnotize edici bir animasyon tasarlarım.", "TASARIM"],
            ["Bu gecikmenin günün hangi saatlerinde daha çok yaşandığını istatistiklerle bulurum.", "ANALITIK"],
            ["Müşteri memnuniyetine etkisini hesaplar, acil bir özür mesajı yayınlatırım.", "LIDERLIK"]
        ]],
        ["15. Yönetim kurulu mevcut markayı rakiplerine göre eski bulduğunu söyledi:", "\"Markamızın vizyonu 90'lardan kalma gibi hissediliyor.\"", "text", [
            ["Sitenin mimarisini en yeni teknolojilerle sıfırdan kurup hızını zirveye çekerim.", "YAZILIM"],
            ["Modern, minimalist ve akıllara kazınacak yepyeni bir marka kimliği tasarlarım.", "TASARIM"],
            ["Hedef kitlenin etkileşime girdiği trendleri ve rakiplerin stratejik hamlelerini haritalandırırım.", "ANALITIK"],
            ["Şirket vizyonunu tazelemek için devasa bir 'Yeniden Doğuş' lansmanı planlarım.", "LIDERLIK"]
        ]],
        ["16. Şirket yapay zeka trenine katılmak istedi ve sana şöyle bir kod geldi:", "import tensorflow as tf\nmodel.fit(x_train, y_train, epochs=100)", "code", [
            ["Bu modelin GPU üzerinde hatasız ve optimize çalışması için kodları düzenlerim.", "YAZILIM"],
            ["Son kullanıcının bu zeka ile iletişim kurduğu arayüz mükemmel hissettirmeli.", "TASARIM"],
            ["Bu modelin tahmin doğruluk oranını büyük veri setlerinde derinlemesine test ederim.", "ANALITIK"],
            ["Bu yapay zekanın şirket hedeflerine nasıl uyacağını yönetim kuruluna sunarım.", "LIDERLIK"]
        ]],
        ["17. Dev projenin teslimine 1 gün kaldı ama en hayati özellik henüz bitmedi.", "KRİTİK UYARI: Özellik entegrasyonu tamamlanamadı.", "text", [
            ["Sabaha kadar uyumam, bilgisayar başına kilitlenir o özelliği kodlar ve bitiririm.", "YAZILIM"],
            ["Uygulama o kadar kusursuz görünmeli ki kimse eksikliğe takılmamalı.", "TASARIM"],
            ["Eksik özelliğin ilk 1 ayda kaç kullanıcının gerçekten işine yarayacağını hesaplarım.", "ANALITIK"],
            ["Müşteriyi dürüstçe bilgilendirip ek süre için ikna ederim.", "LIDERLIK"]
        ]],
        ["18. Hazır bir açık kaynak kütüphane buldun ama sayfasında şunu gördün:", "GitHub Repository: 0 Stars | Last Commit: 3 Years Ago", "code", [
            ["Bunu projeye ASLA eklemem. Güncellenmeyen kod güvenlik zafiyeti yaratır.", "YAZILIM"],
            ["Bunun arkadaki teknik umrumda değil, ön tarafta tasarımımı bozmayacaksa sorun yok.", "TASARIM"],
            ["Bu kütüphanenin bağımlılık ağacını çıkarır, hata frekansını analiz ederim.", "ANALITIK"],
            ["Bu araç ekibime 1 aylık zaman ve bütçe tasarrufu sağlayacaksa riski üstlenirim.", "LIDERLIK"]
        ]],
        ["19. Beta testinde kullanıcılardan ortak bir şikayet belirdi:", "\"Uygulamanız harika ama ekranda nerede ne var bulamıyorum, çok kalabalık!\"", "text", [
            ["Gereksiz tüm DOM elemanlarını silerek hafıza kullanımını düşürürüm.", "YAZILIM"],
            ["Navigasyonu ve bilgi mimarisini en sade şekilde baştan tasarlarım.", "TASARIM"],
            ["Kullanıcıların hangi ekranlarda kaybolduğunu Heatmap üzerinden kanıtlarım.", "ANALITIK"],
            ["Yönetimi toplayarak 'Müşteri Daima Haklıdır' ilkesini hatırlatırım.", "LIDERLIK"]
        ]],
        ["20. Şirketiniz 10 Milyon Dolar yatırım aldı. İlk odağın ne olur?", "Bütçe Onaylandı: 10,000,000 $", "text", [
            ["En iyi serverları kiralamak ve ölçeklenebilir bir sistem kurmak.", "YAZILIM"],
            ["Dünyaca ünlü tasarım ofisleriyle çalışarak vizyonumuzu estetize etmek.", "TASARIM"],
            ["En büyük veri bilimcilerini kadroya bağlamak ve devasa algoritmalar satın almak.", "ANALITIK"],
            ["Muazzam bir yetenek havuzu kurmak ve üst düzey bir lansman başlatmak.", "LIDERLIK"]
        ]]
    ];
    qs.forEach(([qText, snippet, sType, opts]) => {
        db.run("INSERT INTO career_map_questions (question, snippet, snippet_type) VALUES (?,?,?)", [qText, snippet, sType], function () {
            const qid = this.lastID;
            opts.forEach(([oText, oType]) => {
                db.run("INSERT INTO career_map_options (question_id, text, type) VALUES (?,?,?)", [qid, oText, oType]);
            });
        });
    });
}

function seedCareerTitleMapping() {
    const data = [
        ["YAZILIM", "Yazılım ve Teknoloji Uzmanı"],
        ["TASARIM", "Kreatif Tasarımcı & Sanatçı"],
        ["ANALITIK", "Veri Analisti & Stratejist"],
        ["LIDERLIK", "Yönetici & İletişim Ustası"]
    ];
    data.forEach(([t, title]) => db.run("INSERT INTO career_title_mapping VALUES (?,?)", [t, title]));
}

function seedCombinedProfession() {
    const data = [
        ["A-YAZILIM", "Teknoloji CEO'su / CTO", "Teknik zekanla doğuştan gelen yönetim becerilerini birleştiriyorsun."],
        ["A-TASARIM", "Kreatif Direktör / Ajans Kurucusu", "Estetik vizyonun ve güçlü lidelik vasıfların seni bir ajansın zirvesine taşıyor."],
        ["A-ANALITIK", "Veri Odaklı Strateji Müdürü", "Rakamları okuma yeteneğini kararlı duruşunla harmanlıyorsun."],
        ["A-LIDERLIK", "Şirket Kurucusu / Üst Düzey Yönetici", "Saf bir yönetim gücüsün."],
        ["B-YAZILIM", "Sistem Mimarı / Kıdemli Mühendis", "Sistemin en derinine inen bilgisayar bilimcisisin."],
        ["B-TASARIM", "UX/UI Araştırmacısı / Tasarım Teorisyeni", "İnsan psikolojisine en uygun olanı arayan derin bir araştırmacısın."],
        ["B-ANALITIK", "Veri Bilimcisi / Baş Analist", "Gerçekleri verilerle ortaya çıkaran bilge bir analistsin."],
        ["B-LIDERLIK", "Danışman / Şirket Mentoru", "İnsanlara yolu gösteren bilge bir danışmansın."],
        ["C-YAZILIM", "Bağımsız Yazılım Geliştirici", "Dünyanın neresinde olursa olsun kod üretebilen bir bağımsızsın."],
        ["C-TASARIM", "Dijital Sanatçı / Göçebe Tasarımcı", "İlhamını dünyayı gezerek alan özgür bir sanatçısın."],
        ["C-ANALITIK", "Growth Hacker / Pazar Araştırmacısı", "Verileri yepyeni büyüme hileleriyle yorumluyorsun."],
        ["C-LIDERLIK", "Proje Yöneticisi / Ürün Evangelisti", "İnsanları yeni vizyonlara ikna eden bir öncüsün."],
        ["D-YAZILIM", "Erişilebilirlik Uzmanı", "Teknolojiyi herkesin kullanabileceği şekilde geliştiriyorsun."],
        ["D-TASARIM", "Kullanıcı Deneyimi Odaklı Hizmet Tasarımcısı", "İnsan odaklı hizmet tasarımının kalbisin."],
        ["D-ANALITIK", "İnsan Kaynakları Veri Analisti", "Verileri çalışan refahı için kullanıyorsun."],
        ["D-LIDERLIK", "Topluluk Yöneticisi / Ekip Koçu", "Herkesin potansiyeline ulaşmasını sağlayan bir koçsun."]
    ];
    data.forEach(([key, title, desc]) => {
        db.run("INSERT INTO combined_profession_mapping VALUES (?,?,?)", [key, title, desc]);
    });
}

function seedSalaryData() {
    const data = [
        ["A-YAZILIM", "25.000 - 100.000+ TL / ay", "$120k - $300k+ / yıl"],
        ["A-TASARIM", "20.000 - 80.000 TL / ay", "$80k - $200k / yıl"],
        ["A-ANALITIK", "22.000 - 90.000 TL / ay", "$90k - $220k / yıl"],
        ["A-LIDERLIK", "30.000 - 150.000+ TL / ay", "$100k - $400k+ / yıl"],
        ["B-YAZILIM", "30.000 - 120.000 TL / ay", "$110k - $250k / yıl"],
        ["B-TASARIM", "15.000 - 60.000 TL / ay", "$70k - $150k / yıl"],
        ["B-ANALITIK", "25.000 - 100.000 TL / ay", "$100k - $230k / yıl"],
        ["B-LIDERLIK", "18.000 - 80.000 TL / ay", "$80k - $180k / yıl"],
        ["C-YAZILIM", "10.000 - 70.000 TL / ay (freelance)", "$50k - $150k / yıl"],
        ["C-TASARIM", "8.000 - 50.000 TL / ay", "$40k - $120k / yıl"],
        ["C-ANALITIK", "15.000 - 60.000 TL / ay", "$60k - $150k / yıl"],
        ["C-LIDERLIK", "12.000 - 55.000 TL / ay", "$55k - $130k / yıl"],
        ["D-YAZILIM", "18.000 - 70.000 TL / ay", "$70k - $160k / yıl"],
        ["D-TASARIM", "12.000 - 50.000 TL / ay", "$55k - $120k / yıl"],
        ["D-ANALITIK", "14.000 - 55.000 TL / ay", "$50k - $110k / yıl"],
        ["D-LIDERLIK", "12.000 - 50.000 TL / ay", "$45k - $110k / yıl"]
    ];
    data.forEach(([key, tr, gl]) => db.run("INSERT INTO combined_salary_data VALUES (?,?,?)", [key, tr, gl]));
}

function seedRoadmapData() {
    const roadmaps = [
        ["YAZILIM", "1- TEMEL MANTIK (1-2 ay): Algoritma ve problem cozme.\n2- WEB TEMELLERI (1-2 ay): HTML, CSS, JavaScript.\n3- BACKEND/FRONTEND (2-3 ay): React/Vue veya Node.js/Django.\n4- VERITABANI: SQL ile veri saklama.\n5- GIT & GITHUB: Kodunu yedekle ve paylas.\n6- PROJELERINI YAY: GitHub ve LinkedIn."],
        ["TASARIM", "1- ARAC OGREN (2-4 hafta): Figma ogren.\n2- TASARIM TEMELLERI (1-2 ay): Renk teorisi, tipografi.\n3- UX ARASTIRMASI (1 ay): Wireframe ve kullanici akisi.\n4- UI PRATIGI: Uygulamalari Figma'da kopyala.\n5- PORTFOLYO: Behance veya Dribbble'a proje yukle.\n6- TREND TAKIBI: Laws of UX, Awwwards."],
        ["ANALITIK", "1- EXCEL (2-4 hafta): VLOOKUP, Pivot Tablo.\n2- ISTATISTIK (1 ay): Ortalama, medyan, standart sapma.\n3- SQL (1-2 ay): Veri cek ve filtrele.\n4- PYTHON (2-3 ay): Pandas ve Matplotlib.\n5- ARAC: Tableau Public veya Power BI.\n6- PROJELERINI YAY: Kaggle veri setleriyle analiz yap."],
        ["LIDERLIK", "1- KENDINI TANI: DISC, MBTI, Enneagram.\n2- AGILE/SCRUM (2-4 hafta): Scrum Guide oku.\n3- ILETISIM BECERILERI: TED Talks izle, sunum yap.\n4- DUYGUSAL ZEKA: Emotional Intelligence kitabini oku.\n5- PROJE YONETIMI ARACLARI: Jira, Notion, Trello.\n6- KITAP & PODCAST: Good to Great, The Manager's Path."]
    ];
    roadmaps.forEach(([type, fund]) => db.run("INSERT INTO roadmap_data VALUES (?,?)", [type, fund]));

    const links = [
        ["YAZILIM", "CS50: Harvard Bilgisayar Bilimi Kursu", "https://pll.harvard.edu/course/cs50-introduction-computer-science"],
        ["YAZILIM", "FreeCodeCamp", "https://www.freecodecamp.org/"],
        ["YAZILIM", "Patika.dev (Turkce)", "https://www.patika.dev/"],
        ["YAZILIM", "Roadmap.sh", "https://roadmap.sh/"],
        ["TASARIM", "Figma Egitimleri", "https://www.youtube.com/c/Figmadesign"],
        ["TASARIM", "Google UX Design Certificate", "https://grow.google/certificates/ux-design/"],
        ["TASARIM", "Laws of UX", "https://lawsofux.com/"],
        ["TASARIM", "Awwwards", "https://www.awwwards.com/"],
        ["ANALITIK", "Kaggle Learn", "https://www.kaggle.com/learn"],
        ["ANALITIK", "Google Data Analytics Certificate", "https://grow.google/certificates/data-analytics/"],
        ["ANALITIK", "DataCamp", "https://www.datacamp.com/"],
        ["ANALITIK", "Tableau Public", "https://public.tableau.com/"],
        ["LIDERLIK", "Scrum.org", "https://www.scrum.org/resources/scrum-guide"],
        ["LIDERLIK", "Google Project Management Certificate", "https://grow.google/certificates/project-management/"],
        ["LIDERLIK", "TED Talks: Liderlik", "https://www.ted.com/topics/leadership"],
        ["LIDERLIK", "Harvard Business Review", "https://hbr.org/"]
    ];
    links.forEach(([type, text, url]) => db.run("INSERT INTO roadmap_links (type, text, url) VALUES (?,?,?)", [type, text, url]));
}

// ============================
// API ENDPOINTS
// ============================
// Kullanıcı oluştur ve ID'sini döndür
app.post("/api/kullanici-olustur", (req, res) => {
    const { isim } = req.body;

    // Şu anki zamanı sayısal (REAL) bir değere dönüştürüyoruz
    const suAnkiZaman = Date.now();

    const sql = `INSERT INTO kullanicilar (isim, tarih) VALUES (?, ?)`;

    db.run(sql, [isim, suAnkiZaman], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // İşlem başarılıysa veritabanının atadığı yeni id'yi geri gönderiyoruz
        res.json({ id: this.lastID, isim: isim, tarih: suAnkiZaman });
    });
});
// Kullanici cevabi kaydet
app.post("/kaydet", (req, res) => {
    const { soru, cevap } = req.body;
    db.run("INSERT INTO cevaplar (soru, cevap) VALUES (?,?)", [soru, cevap], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Kaydedildi" });
    });
});

// Tum sorulari getir
app.get("/api/questions", (req, res) => {
    db.all("SELECT * FROM questions", (err, questions) => {
        if (err) return res.status(500).json({ error: err.message });
        const promises = questions.map(q => new Promise((resolve) => {
            db.all("SELECT * FROM question_options WHERE question_id = ?", [q.id], (err, opts) => {
                resolve({ ...q, options: opts || [] });
            });
        }));
        Promise.all(promises).then(data => res.json(data));
    });
});

// Arketipleri getir
app.get("/api/archetypes", (req, res) => {
    db.all("SELECT * FROM archetypes", (err, archs) => {
        if (err) return res.status(500).json({ error: err.message });
        const promises = archs.map(a => new Promise((resolve) => {
            db.all("SELECT trait FROM archetype_traits WHERE archetype_id = ?", [a.id], (err, traits) => {
                resolve({ ...a, traits: (traits || []).map(t => t.trait) });
            });
        }));
        Promise.all(promises).then(data => res.json(data));
    });
});

// Kariyer haritasi sorularini getir
app.get("/api/career-map-questions", (req, res) => {
    db.all("SELECT * FROM career_map_questions", (err, questions) => {
        if (err) return res.status(500).json({ error: err.message });
        const promises = questions.map(q => new Promise((resolve) => {
            db.all("SELECT * FROM career_map_options WHERE question_id = ?", [q.id], (err, opts) => {
                resolve({ ...q, options: opts || [] });
            });
        }));
        Promise.all(promises).then(data => res.json(data));
    });
});

// Kombine meslek esleme
app.get("/api/combined-professions", (req, res) => {
    db.all("SELECT * FROM combined_profession_mapping", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Maas verileri
app.get("/api/salary-data", (req, res) => {
    db.all("SELECT * FROM combined_salary_data", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Egitim yol haritalari
app.get("/api/roadmap/:type", (req, res) => {
    const type = req.params.type.toUpperCase();
    db.get("SELECT * FROM roadmap_data WHERE type = ?", [type], (err, roadmap) => {
        if (err) return res.status(500).json({ error: err.message });
        db.all("SELECT text, url FROM roadmap_links WHERE type = ?", [type], (err, links) => {
            res.json({ ...roadmap, links: links || [] });
        });
    });
});

// Kayitli cevaplari getir
app.get("/api/cevaplar", (req, res) => {
    db.all("SELECT * FROM cevaplar ORDER BY tarih DESC", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Veritabani istatistikleri
app.get("/api/stats", (req, res) => {
    const tables = ["questions", "archetypes", "career_map_questions", "combined_profession_mapping", "combined_salary_data", "cevaplar"];
    const counts = {};
    let done = 0;
    tables.forEach(t => {
        db.get(`SELECT COUNT(*) as count FROM ${t}`, (err, row) => {
            counts[t] = row ? row.count : 0;
            done++;
            if (done === tables.length) res.json(counts);
        });
    });
});

// ============================
// SUNUCU BASLAT
// ============================
setTimeout(() => seedDatabase(), 1000);

app.listen(3000, () => {
    console.log("Server calisiyor: http://localhost:3000");
    console.log("API Endpoints:");
    console.log("  GET  /api/questions");
    console.log("  GET  /api/archetypes");
    console.log("  GET  /api/career-map-questions");
    console.log("  GET  /api/combined-professions");
    console.log("  GET  /api/salary-data");
    console.log("  GET  /api/roadmap/:type");
    console.log("  GET  /api/cevaplar");
    console.log("  GET  /api/stats");
    console.log("  POST /kaydet");
});