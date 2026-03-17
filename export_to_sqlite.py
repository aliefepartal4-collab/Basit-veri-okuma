# -*- coding: utf-8 -*-
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "character_quiz.db")

def create_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # --- TABLES ---
    c.executescript("""
    DROP TABLE IF EXISTS questions;
    DROP TABLE IF EXISTS question_options;
    DROP TABLE IF EXISTS archetypes;
    DROP TABLE IF EXISTS archetype_traits;
    DROP TABLE IF EXISTS career_questions;
    DROP TABLE IF EXISTS career_question_options;
    DROP TABLE IF EXISTS career_results;
    DROP TABLE IF EXISTS career_map_questions;
    DROP TABLE IF EXISTS career_map_options;
    DROP TABLE IF EXISTS career_title_mapping;
    DROP TABLE IF EXISTS combined_profession_mapping;
    DROP TABLE IF EXISTS combined_salary_data;
    DROP TABLE IF EXISTS roadmap_data;
    DROP TABLE IF EXISTS roadmap_links;

    CREATE TABLE questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL
    );
    CREATE TABLE question_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        FOREIGN KEY (question_id) REFERENCES questions(id)
    );
    CREATE TABLE archetypes (
        id TEXT PRIMARY KEY,
        title TEXT, icon TEXT, description TEXT
    );
    CREATE TABLE archetype_traits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        archetype_id TEXT, trait TEXT,
        FOREIGN KEY (archetype_id) REFERENCES archetypes(id)
    );
    CREATE TABLE career_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        archetype_id TEXT, question TEXT,
        FOREIGN KEY (archetype_id) REFERENCES archetypes(id)
    );
    CREATE TABLE career_question_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        career_question_id INTEGER, text TEXT, type TEXT,
        FOREIGN KEY (career_question_id) REFERENCES career_questions(id)
    );
    CREATE TABLE career_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        archetype_id TEXT, career_type TEXT, result_title TEXT
    );
    CREATE TABLE career_map_questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT, snippet TEXT, snippet_type TEXT
    );
    CREATE TABLE career_map_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER, text TEXT, type TEXT,
        FOREIGN KEY (question_id) REFERENCES career_map_questions(id)
    );
    CREATE TABLE career_title_mapping (
        type TEXT PRIMARY KEY, title TEXT
    );
    CREATE TABLE combined_profession_mapping (
        combo_key TEXT PRIMARY KEY, job_title TEXT, description TEXT
    );
    CREATE TABLE combined_salary_data (
        combo_key TEXT PRIMARY KEY, salary_tr TEXT, salary_global TEXT
    );
    CREATE TABLE roadmap_data (
        type TEXT PRIMARY KEY, fundamentals TEXT
    );
    CREATE TABLE roadmap_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT, text TEXT, url TEXT
    );
    """)

    # --- 1. CHARACTER QUESTIONS ---
    questions = [
        ("Büyük bir hayal kırıklığı yaşadığında, içindeki acıyla nasıl başa çıkarsın?", [
            ("Duygularımı bir kenara bırakıp hızla yeni bir hedefe odaklanırım. Durmak bana göre değil.", "A"),
            ("Neden böyle olduğunu uzun uzun analiz eder, bu deneyimden felsefi bir ders çıkarırım.", "B"),
            ("Bulunduğum ortamdan tamamen uzaklaşır, yeni bir yere giderek zihnimi sıfırlarım.", "C"),
            ("Acımı en yakınlarımla paylaşır, onların destek ve şefkatiyle iyileşmeye çalışırım.", "D"),
        ]),
        ("Bir odada herkesin tartıştığı ve ortamın iyice gerildiği bir an düşün. Böyle bir durumda ne yaparsın?", [
            ("Otoritemi hissettirerek kontrolü elime alır ve tartışmayı net bir kararla sonlandırırım.", "A"),
            ("Sessizce gözlem yapar, iki tarafın da asıl sorununu tespit edip mantıklı bir çözüm sunarım.", "B"),
            ("Bu negatif enerji bana fazla gelir, kimseye çaktırmadan ortamdan uzaklaşırım.", "C"),
            ("Araya girip ortamı yumuşatacak bir espri yapar veya tarafları sakinleştirmeye çalışırım.", "D"),
        ]),
        ("Gece yatağa yattığında uykudan önce aklından geçen en baskın düşünce genellikle nedir?", [
            ("Yarın halletmem gereken işler, stratejilerim ve sıradaki büyük adımlarım.", "A"),
            ("Bugün ne öğrendim? İnsan doğasının ve hayatın o tuhaf karmaşıklığı...", "B"),
            ("Gitmek istediğim yeni ülkeler, denemek istediğim farklı ve çılgın şeyler.", "C"),
            ("Bugün sevdiklerimi mutlu edebildim mi? Acaba bilmeden birini kırdım mı?", "D"),
        ]),
        ("Biri sana haksız ve oldukça sert bir eleştiri yaptığında ilk içsel tepkin ne olur?", [
            ("'Benim kim olduğumu bilmiyor, ona gücümü ve haklılığımı er ya da geç kanıtlayacağım.'", "A"),
            ("'Bu eleştirinin arkasında yatan asıl psikolojik sebep veya kendi güvensizliği ne olabilir?'", "B"),
            ("Umursamam. Başkalarının benim hakkımda ne düşündüğüne takılmak büyük bir zaman kaybı.", "C"),
            ("Gerçekten hatalı mıyım diye kendimi derinden sorgular ve içten içe üzüntü duyarım.", "D"),
        ]),
        ("Hayatta seni en çok korkutan, içten içe kabusun olabilecek şey aşağıdakilerden hangisidir?", [
            ("Kontrolü tamamen kaybetmek ve başkalarının yönetimi altına girmek.", "A"),
            ("Gerçekleri görememek, cehalet içinde yaşamak ve kandırılmak.", "B"),
            ("Sıradan, rutin ve hiçbir heyecanı olmayan sıkıcı bir hayata hapsolmak.", "C"),
            ("Tamamen yalnız kalmak ve değer verdiğim insanların beni terk etmesi.", "D"),
        ]),
        ("Eğer dünyada tek bir şeyi değiştirme gücün olsaydı, bu ne olurdu?", [
            ("Küresel ve mükemmel işleyen bir düzen kurar, tüm kaosu ve verimsizliği silerdim.", "A"),
            ("Tüm insanların gerçeği arayan, bilinçli ve çok daha derin varlıklar olmasını sağlardım.", "B"),
            ("Fiziksel ve zihinsel tüm sınırları kaldırır, insanlığa sınır tanımaz mutlak özgürlüğü verirdim.", "C"),
            ("Dünyadaki tüm acıları, nefreti ve eşitsizliği yok eder, saf şefkati hakim kılardım.", "D"),
        ]),
        ("Gizli bir yeteneğin olsaydı, bunun hangisi olmasını isterdin?", [
            ("İnsanların zihnine girip onları gizlice yönlendirebilmek veya kararlarını etkileyebilmek.", "A"),
            ("Geçmişteki ve gelecekteki tüm sırları görebilmek, evrenin mutlak bilgisine erişmek.", "B"),
            ("Gözümü kapattığım an, uzay ve zaman tanımaksızın evrenin herhangi bir yerine ışınlanabilmek.", "C"),
            ("Dokunduğum insanların fiziksel veya ruhsal tüm yaralarını, acılarını anında iyileştirebilmek.", "D"),
        ]),
        ("Sana devasa bir servet miras kalsaydı, paranın kontrolünü eline aldığında yapacağın ilk şey ne olurdu?", [
            ("Bu serveti daha da katlayacak devasa bir iş, sistem veya imparatorluk kurmak.", "A"),
            ("Bilimsel araştırmalara, laboratuvarlara ve büyük kütüphanelere sonsuz bir fon sağlamak.", "B"),
            ("Hiçbir plan yapmadan, sorumluluk almadan dünyayı uçtan uca gezmek için bir bütçe ayırmak.", "C"),
            ("İhtiyacı olanlara, çocuklara veya savunmasızlara adanmış devasa bir yardım ağı kurmak.", "D"),
        ]),
        ("Kendini bir doğa elementi ile karakterize edecek olsaydın, hangisini seçerdin?", [
            ("Ateş: Yakıcı, dönüştürücü, güçlü, enerjik ve bazen de yok edici.", "A"),
            ("Toprak: Sabit, dayanıklı, kökleri derinde, besleyici ve bilge.", "B"),
            ("Rüzgar: Ele avuca sığmaz, yönü belirsiz, sınır tanımaz, özgür ve hızlı.", "C"),
            ("Su: Uyumlu, girdiği kabın şeklini alan, şifa veren, derin ve birleştirici.", "D"),
        ]),
        ("Bir gün bu dünyadan ayrıldığında, insanlar seni en çok hangi cümlen veya duruşunla hatırlasın istersin?", [
            ("'O, her zaman en öndeydi ve imkansız denileni başaran büyük bir öncü/liderdi.'", "A"),
            ("'O, kimsenin göremediği gerçekleri gören, anlayan çok derin bir bilgeydi.'", "B"),
            ("'O, hiçbir kurala sığmayan, hayatı sonuna kadar yaşayan cesur bir maceraperestti.'", "C"),
            ("'O, hayatına dokunduğu herkesi iyileştiren, kocaman kalpli bir kahramandı.'", "D"),
        ]),
    ]
    for q_text, opts in questions:
        c.execute("INSERT INTO questions (question) VALUES (?)", (q_text,))
        qid = c.lastrowid
        for o_text, o_type in opts:
            c.execute("INSERT INTO question_options (question_id, text, type) VALUES (?,?,?)", (qid, o_text, o_type))

    # --- 2. ARCHETYPES ---
    archetypes = {
        "A": ("Lider (The Ruler)", "👑", "Kararlı, cesur ve vizyoner bir ruha sahipsin. Karmaşanın içinden çıkış yolunu her zaman ilk sen bulursun. Doğal bir otoriten var ve insanlar senin peşinden gelmekte tereddüt etmiyor.",
              ["Kriz anlarında soğukkanlı", "Doğuştan yönetici", "Hedef odaklı"]),
        "B": ("Bilge (The Sage)", "🦉", "Analitik, derin düşünceli ve bilgiye açsın. Dünyayı sadece yaşamakla kalmıyor, anlamak istiyorsun. Olaylara dışarıdan, objektif bir gözle bakabilme yeteneğin seni çok değerli bir danışman yapıyor.",
              ["Sorgulayıcı zihin", "Mantıklı kararlar", "Sürekli öğrenen"]),
        "C": ("Kaşif (The Explorer)", "🧭", "Maceraperest, yenilikçi ve özgürlüğüne kelimenin tam anlamıyla aşıksın. Sınırlandırılmaktan nefret eder, her zaman ufkun ötesindeki o yeni mucizeyi ararsın. Rutinler sana göre değil.",
              ["Risk almayı seven", "Özgür ruhlu", "Yeni deneyimler arayan"]),
        "D": ("Koruyucu (The Caregiver)", "🛡️", "Şefkatli, fedakar ve son derece güvenilir birisin. Sevdiklerin için yapamayacağın hiçbir şey yok. İnsanların duygularını bir radar gibi hisseder ve onlara her zaman güvenli bir liman olursun.",
              ["Empati ustası", "İyi bir dinleyici", "Sevdiklerine sadık"]),
    }
    for aid, (title, icon, desc, traits) in archetypes.items():
        c.execute("INSERT INTO archetypes VALUES (?,?,?,?)", (aid, title, icon, desc))
        for t in traits:
            c.execute("INSERT INTO archetype_traits (archetype_id, trait) VALUES (?,?)", (aid, t))

    # --- 3. CHARACTER CAREER QUESTIONS ---
    career_qs = {
        "A": ("Lider ruhlu biri olarak, kariyerinde hangi ortam seni daha çok tatmin eder?", [
            ("Büyük bir şirketin zirvesine tırmanıp CEO koltuğuna oturmak.", "C1"),
            ("Kendi girişimimi kurup sıfırdan devasa bir imparatorluk yaratmak.", "C2"),
            ("Siyasete veya kamu yönetimine atılıp geniş kitleleri yönetmek.", "C3"),
            ("Askeriye veya kriz yönetimi gibi disiplin ve otorite gerektiren alanlar.", "C4"),
        ]),
        "B": ("Bilgiye bu kadar aç biri olarak, mesleki hayatını neye adamak istersin?", [
            ("Akademiye katılıp araştırma görevlisi, profesör veya yazar olmak.", "C1"),
            ("Veri bilimi, analiz veya teknoloji alanlarında derin uzmanlık kazanmak.", "C2"),
            ("İnsanların sorunlarını kökten çözen bir terapist veya psikolog olmak.", "C3"),
            ("Adaletin ve mantığın savunucusu olarak iyi bir avukat veya hakim olmak.", "C4"),
        ]),
        "C": ("Özgürlüğüne düşkün keşifçi ruhun, hangi kariyer yolunda parlayabilir?", [
            ("Dünyayı gezerek belgesel veya seyahat içerikleri üreten bir yaratıcı olmak.", "C1"),
            ("Sürekli sahada olacağım arkeoloji, jeoloji veya doğa araştırmacılığı.", "C2"),
            ("Masa başı olmayan, serbest çalışan bir dijital göçebe, sanatçı veya tasarımcı.", "C3"),
            ("Adrenalin dolu bir meslek; pilot, dalgıç veya ekstrem spor eğitmeni.", "C4"),
        ]),
        "D": ("Şefkatli ve yardımsever doğan, profesyonel hayatta nasıl vücut bulmalı?", [
            ("Hayat kurtaran bir doktor, hemşire veya sağlık çalışanı olmak.", "C1"),
            ("Yeni nesilleri yetiştiren öğretmen, eğitmen veya pedagog olmak.", "C2"),
            ("Toplumsal eşitsizliklere savaş açan bir sosyal hizmet uzmanı veya aktivist.", "C3"),
            ("İnsan kaynakları veya takım koçluğu yaparak kurum içi huzuru sağlamak.", "C4"),
        ]),
    }
    for arch_id, (q_text, opts) in career_qs.items():
        c.execute("INSERT INTO career_questions (archetype_id, question) VALUES (?,?)", (arch_id, q_text))
        cqid = c.lastrowid
        for o_text, o_type in opts:
            c.execute("INSERT INTO career_question_options (career_question_id, text, type) VALUES (?,?,?)", (cqid, o_text, o_type))

    # --- 4. CAREER RESULTS ---
    career_results = {
        "A": {"C1": "Kurumsal Lider / CEO", "C2": "Girişimci / Kurucu", "C3": "Siyasetçi / Bürokrat", "C4": "Kriz Yöneticisi / Komutan"},
        "B": {"C1": "Akademisyen / Yazar", "C2": "Veri Analisti / Sistem Mimarı", "C3": "Psikolog / Terapist", "C4": "Avukat / Hakim"},
        "C": {"C1": "Seyahat Yazarı / İçerik Üreticisi", "C2": "Araştırmacı / Arkeolog", "C3": "Dijital Göçebe / Freelancer", "C4": "Pilot / Ekstrem Spor Eğitmeni"},
        "D": {"C1": "Doktor / Sağlık Uzmanı", "C2": "Öğretmen / Eğitimci", "C3": "Sosyal Hizmet Uzmanı", "C4": "İnsan Kaynakları Uzmanı / Koç"},
    }
    for arch_id, results in career_results.items():
        for ct, title in results.items():
            c.execute("INSERT INTO career_results (archetype_id, career_type, result_title) VALUES (?,?,?)", (arch_id, ct, title))

    # --- 5. CAREER MAP QUESTIONS (20 questions) ---
    career_map_qs = [
        ("1. Aşağıdaki Python koduna bak. Sence burada bariz bir hata var mı?", "def hesapla(a, b):\n    return a + b\n\nsonuc = hesapla(5)\nprint(sonuc)", "code", [
            ("Evet, fonksiyona 2 parametre verilmiş ama sadece 1 tane gönderilmiş (Syntax/Type Error).", "YAZILIM"),
            ("Hata falan umurumda değil, kod bloğunun renkleri ve yerleşimi çok sıkıcı.", "TASARIM"),
            ("Kodda hata var ama asıl soru bu fonksiyon tam olarak ne hesaplıyor? Veri nerede?", "ANALITIK"),
            ("Takımımdaki yazılımcıya sorarım, benim işim kodu değil ekibi yönetmek.", "LIDERLIK"),
        ]),
        ("2. Bir ürün lansmanı metninde şu cümleyi gördün: 'Kullanıcılarımızın %80'i belki bu ürünü çok sevebilir.' Ekibe ne söylersin?", "'Kullanıcılarımızın %80'i belki bu ürünü çok sevebilir.'", "text", [
            ("Bunun arkasındaki sistem hatalı, ürünü seviyorlarsa net bir metrik döner. Kodu inceleyelim.", "YAZILIM"),
            ("Bu çok zayıf bir kelime ('belki'). Daha iddialı, vurucu ve estetik bir kampanya metni yazmalıyız.", "TASARIM"),
            ("'%80' verisine nasıl ulaştık? A/B test sonuçlarını ve istatistiksel raporları acilen görmek istiyorum.", "ANALITIK"),
            ("Metni yazan kişiyi motive edici bir toplantıya çağırır, markamızın vizyonunu tekrar anlatırım.", "LIDERLIK"),
        ]),
        ("3. Bir mobil uygulama arayüzü (UI) tasarımı inceliyorsun. Ekranda 'Satın Al' butonu gri renkte ve sayfanın en altında gizlenmiş. Tepkin ne olur?", "Buton Görünümü: [SATIN AL] (Renk: #cccccc, Konum: Sayfa sonu)", "text", [
            ("Butonun tıklanma event'i (onClick) doğru bağlanmış mı diye kod tarafını kontrol ederim.", "YAZILIM"),
            ("Facia! Buton canlı bir renkte (örn: turuncu) ve kullanıcının göz hizasında (above the fold) olmalı.", "TASARIM"),
            ("Kullanıcıların bu gri butona tıklama davranış raporlarını ve ısı haritasını (heatmap) inceleyelim.", "ANALITIK"),
            ("UX tasarımcısını yanıma çağırıp satış hedeflerimizi ve kullanıcı psikolojisini tekrar tartışırım.", "LIDERLIK"),
        ]),
        ("4. Önüne şöyle tuhaf bir veri tablosu geldi. Bu tablo sence ne işe yarıyor olabilir?", "ID | AGE | CTR (%) | REVENUE\n1  | 24  | 5.2     | $120\n2  | 35  | 2.1     | $45\n3  | 19  | 8.4     | $210", "code", [
            ("Bu SQL'den çekilmiş bir tablo. Hemen bir INNER JOIN yazıp diğer verilerle birleştirmek isterim.", "YAZILIM"),
            ("Bu sayılar çok kuru. Bunları şık bir pasta grafiğine (pie chart) veya infografiğe dönüştürsek harika olur.", "TASARIM"),
            ("Açıkça 19-24 yaş arası kitlenin Tıklama Oranı (CTR) ve getirisi çok daha yüksek, stratejiyi o yöne kaydırmalıyız.", "ANALITIK"),
            ("Pazarlama ekibini hemen toplantıya çağırıp genç kitleye daha agresif satış yapmaları talimatını veririm.", "LIDERLIK"),
        ]),
        ("5. Şirketin ana sunucusunun aniden çöktüğü söylendi. Çalışan ekranında şu hata var:", "Error 502 Bad Gateway / Connection Refused", "code", [
            ("Hemen sunucu loglarına girer, ters vekil (reverse proxy) ve firewall ayarlarını satır satır incelerim.", "YAZILIM"),
            ("Hata sayfasının tasarımını 'Aman tanrım bir şeyler koptu!' gibi sevimli bir illüstrasyonla değiştirmek isterdim.", "TASARIM"),
            ("Geçen ayın trafik verilerini çıkarıp, sunucunun saat kaçta, hangi yük altında çöktüğünü hesaplamaya başlarım.", "ANALITIK"),
            ("Panik yok! Müşterilere acil bir 'Bakımdayız' maili atılmasını sağlar ve operasyon ekibini koordine ederim.", "LIDERLIK"),
        ]),
        ("6. Bir projede kullanılacak logo için iki seçenek geldi:", "Logo A: Çok karmaşık, 7 farklı renk, 3 ayrı font.\nLogo B: 2 renk, minimalist çizim, tek serif font.", "text", [
            ("Hangisinin dosya boyutu (SVG) daha küçükse ve sitemizi daha hızlı yükleyecekse onu seçerim.", "YAZILIM"),
            ("Kesinlikle Logo B! Modern tasarım 'Az çoktur' (Less is more) felsefesine dayanır, karmaşaya yer yok.", "TASARIM"),
            ("A/B testi yaparız. 10.000 kullanıcıya A'yı, 10.000'ine B'yi gösterir; tıklama verilerine göre karar veririz.", "ANALITIK"),
            ("Hangi logo markamızın gelecekteki misyonunu ve otoritesini daha iyi yansıtıyorsa yatırımcılar ona onay verecektir.", "LIDERLIK"),
        ]),
        ("7. Sosyal medyada markanızla ilgili bir kriz patlak verdi, binlerce kızgın tweet atılıyor.", "Trend Topic: #SirketinizBoykot", "text", [
            ("Derhal sistemi kapatıp dışarıdan gelen trafiği keser ve güvenlik açıklarını yamamaya başlarım.", "YAZILIM"),
            ("Empati dolu, çok şık tasarlanmış ve renkleriyle güven veren bir özür metni/görseli hazırlarım.", "TASARIM"),
            ("Hasar boyutunu ölçer, bu tweetlerin yüzde kaçının bot (sahte) hesaplardan geldiğini algoritmalarla tespit ederim.", "ANALITIK"),
            ("Halkla ilişkiler (PR) departmanının başına geçip basın sözcüsü olarak resmi ve net bir canlı yayın açıklaması yaparım.", "LIDERLIK"),
        ]),
        ("8. Aşağıdaki CSS kodu ne işe yarıyor olabilir?", ".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}", "code", [
            ("Bu çok kolay, bir elementi ekranın hem dikey hem yatay tam ortasına (merkezine) hizalamak için yazılmış.", "YAZILIM"),
            ("Büyüleyici! Bu kod bloğu sayesinde tasarladığım objeler ekranda altın oran estetiğiyle hizalanıyor.", "TASARIM"),
            ("Bu kod sömürdüğü işlemci gücü açısından grid mi flexbox mı daha performanslı diye test edilmelidir.", "ANALITIK"),
            ("Bunun ne işe yaradığını bilmem ama ekibe 'Ekranda her şey simetrik dursun!' talimatını veren benim.", "LIDERLIK"),
        ]),
        ("9. E-Ticaret sitenizin yıllık satış grafiğini incelediğinizde şöyle bir tablo gördünüz:", "Ocak: 100K | Nisan: 120K | Ağustos: 50K (Düşüş!) | Kasım: 300K", "text", [
            ("Ağustos ayında sitemizin altyapısında veya ödeme (odeme API) sistemlerinde bir çökme mi oldu diye loglara bakarım.", "YAZILIM"),
            ("Belki de Ağustos ayındaki yaz kampanyamızın banner tasarımları ve ürün fotoğrafları yeterince iştah açıcı değildi.", "TASARIM"),
            ("Ağustos ayında rakiplerin fiyat indirimlerini, müşteri kayıp oranını (churn rate) ve enflasyon etkisini analiz etmeliyim.", "ANALITIK"),
            ("Hemen bir kriz masası kurar, satış müdüründen Ağustos fiyaskosunun savunmasını ister ve Kasım ekibine prim dağıtırım.", "LIDERLIK"),
        ]),
        ("10. Şirketin yeni bir akıllı saat üretecek. Saat için ilk karar mekanizmasını sen kuracaksın:", "Proje Önceliği Ne Olmalı?", "text", [
            ("İşlemcisi mükemmel çalışmalı, 1 gram bile kasmamalı (Lag olmamalı) ve pili 30 gün gitmeli.", "YAZILIM"),
            ("İncecik bir kasası, harika kayış renkleri ve Apple Watch'u bile kıskandıracak bir kavisli ekranı olmalı.", "TASARIM"),
            ("Kullanıcının nabız, uyku ve kalori verilerini mükemmel sensörlerle saniye saniye toplayıp işleyebilmeli.", "ANALITIK"),
            ("Öyle bir reklam hikayesi ve marka vizyonu yaratmalıyız ki, insanlar daha çıkmadan ön sipariş için sıraya girmeli.", "LIDERLIK"),
        ]),
        ("11. Ödeme sayfanızın (Checkout) istatistiklerini incelerken çok yüksek bir terk etme oranı (Abandonment Rate) ile karşılaştın.", "Gelen kullanıcıların %85'i sepeti terk ediyor.", "text", [
            ("Ödeme API'lerinden dönen hata loglarını inceleyerek sistemde teknik bir arıza ararım.", "YAZILIM"),
            ("Sayfadaki gereksiz form elemanlarını siler ve göz yormayan, güven veren bir tasarım (UI) kurgularım.", "TASARIM"),
            ("Google Analytics'te (Funnel) huni analizi yaparak kullanıcıların tam olarak nerede kaçtığını verilerle bulurum.", "ANALITIK"),
            ("Pazarlama ekibini hemen toplayıp terk eden kullanıcılara %10 indirim içeren kurtarma mailleri attırırım.", "LIDERLIK"),
        ]),
        ("12. Sana bir web sitesinin ilk tasarımı geldi ve şöyle bir kod gördün:", '<div style="color: #f1f1f1; background: #ffffff;">\n    Bu metin okunabilir mi?\n</div>', "code", [
            ("Kodlama açısından doğru olsa da, inline CSS kullanılması iyi bir pratik değil. Class yapısına geçiririm.", "YAZILIM"),
            ("Bu korkunç! Beyaz üstüne açık gri font asla okunmaz. Kontrast oranını (WCAG) acilen düzeltmeliyiz.", "TASARIM"),
            ("Kötü kontrastın ziyaretçilerin sayfada kalma süresini (bounce rate) nasıl etkilediğinin verisini çıkarırım.", "ANALITIK"),
            ("Engellilik dostu (Accessibility) bir vizyon oluşturmak için tasarım ekibine bir brief (talimat) yazarım.", "LIDERLIK"),
        ]),
        ("13. Ekibindeki iki üst düzey çalışan şiddetli bir teknik tartışmaya girdi.", '"React mı kullanalım, Vue mu? Hangisi daha iyi?"', "text", [
            ("Hangi kütüphanenin arka planda (Virtual DOM) daha yüksek hız ve güvenlik sunduğuna teknik olarak bakarım.", "YAZILIM"),
            ("Hangisinin arayüz tasarımlarını (UI Libraries) ve akıcı animasyonları entegre etmesi daha kolaysa onu seçerim.", "TASARIM"),
            ("Github'da her iki kütüphanenin community desteğini, kaynak miktarını ve performans skorlarını analiz ederim.", "ANALITIK"),
            ("Bu iki uzmanı masaya oturtur, yetkinliklerine ve projenin teslim süresine (deadline) göre mantıklı bir orta yol bulurum.", "LIDERLIK"),
        ]),
        ("14. Uygulama kullanıcıları her butona bastığında uygulamanın donduğundan şikayet etmeye başladı. Konsolda şunu gördün:", '{ "error": "Timeout", "latency": "5500ms" }', "code", [
            ("Hemen veritabanı sorgularının indekslerini kontrol eder ve timeout (zaman aşımı) sorununu kökünden çözerim.", "YAZILIM"),
            ("Kullanıcı 5 saniye beklerken ekranda sıkılmaması için hipnotize edici bir animasyon (Loading/Skeleton) tasarlarım.", "TASARIM"),
            ("Bu gecikmenin günün hangi saatlerinde ve hangi cihaz tiplerinde daha çok yaşandığına dair bir istatistik haritası çıkarırım.", "ANALITIK"),
            ("Bu teknik aksaklığın müşteri memnuniyetine etkisini hesaplar, iletişim kanalından acil bir özür ve bilgi mesajı yayınlatırım.", "LIDERLIK"),
        ]),
        ("15. Şirketin yönetim kurulu mevcut markayı rakiplerine göre eski bulduğunu söyledi:", '"Markamızın vizyonu 90\'lardan kalma gibi hissediliyor, rakipler çok önde."', "text", [
            ("Sitenin arka plan mimarisini en yeni teknolojiler (Next.js vs.) ile sıfırdan kurup hızını zirveye çekerim.", "YAZILIM"),
            ("Modern, minimalist ve akıllara kazınacak yepyeni bir marka kimliği, palet ve logo tasarlarım.", "TASARIM"),
            ("Hedef kitlenin en çok etkileşime girdiği trendleri ve rakiplerin stratejik hamlelerini detaylıca haritalandırırım.", "ANALITIK"),
            ("Şirket vizyonunu tazelemek için devasa bir 'Yeniden Doğuş' lansmanı planlar ve basını harekete geçiririm.", "LIDERLIK"),
        ]),
        ("16. Şirket yapay zeka trenine katılmak istedi ve sana şöyle bir kod bloğu geldi:", "import tensorflow as tf\nmodel.fit(x_train, y_train, epochs=100)", "code", [
            ("Bu modelin sunuculardaki ekran kartı (GPU) üzerinde hatasız ve optimize çalışması için kodları hemen düzenlerim.", "YAZILIM"),
            ("Yapay zekanın teknik gücü umrumda değil, son kullanıcının bu zeka ile iletişim kurduğu arayüz mükemmel hissettirmeli.", "TASARIM"),
            ("Bu yapay zeka modelinin tahmin doğruluk oranını ve hata payını büyük veri setlerinde derinlemesine test ederim.", "ANALITIK"),
            ("Bu yapay zekanın şirketimizin hedeflerine nasıl uyacağını ve ne kadar kâr getireceğini yönetim kuruluna sunarım.", "LIDERLIK"),
        ]),
        ("17. Milyon dolarlık dev projenin teslimine tam 1 gün (24 saat) kaldı ama en hayati özellik henüz bitmedi.", "KRİTİK UYARI: Özellik entegrasyonu tamamlanamadı.", "text", [
            ("Sabaha kadar gram uyumam, bilgisayar başına kilitlenir o özelliği tek başıma (veya ekiple) kodlar ve bitiririm.", "YAZILIM"),
            ("Tamamlanmamış olsa da, uygulamanın geri kalanı o kadar kusursuz ve göz alıcı görünmeli ki kimse eksikliğe takılmamalı.", "TASARIM"),
            ("Eksik kalan özelliğin, ilk 1 aydaki aktif kullanıcıların yüzde kaçının 'gerçekten' işine yarayacağını hesaplarım.", "ANALITIK"),
            ("Müşteriyi (veya yatırımcıyı) dürüstçe bilgilendirip ek süre için ikna ederim, ekibi yoğun stresten uzak tutarım.", "LIDERLIK"),
        ]),
        ("18. Projenizi çok hızlandıracak hazır bir açık kaynak kod (kütüphane) buldun ama sayfasında şunu gördün:", "GitHub Repository: 0 Stars | Last Commit: 3 Years Ago", "code", [
            ("Bunu projeye ASLA eklemem. Güncellenmeyen kod güvenlik zafiyeti yaratır ve diğer dosyalarımdaki uyumluluğu kırar.", "YAZILIM"),
            ("Bunun arkadaki teknik ne olduğu umrumda değil, eğer ön tarafta tasarladığım şeyleri bozmayacaksa sorun yok.", "TASARIM"),
            ("Bu kod kütüphanesinin (dependency) bağımlılık ağacını çıkarır, olası hata frekansını ampirik yöntemlerle analiz ederim.", "ANALITIK"),
            ("Eğer bu aracı kullanmak ekibime tam 1 aylık boş zaman ve büyük bütçe tasarrufu sağlayacaksa, teknik riski üstlenip onaylayabilirim.", "LIDERLIK"),
        ]),
        ("19. Beta testine katılan kullanıcılardan gelen geri bildirimlerde ortak bir şikayet belirdi:", '"Uygulamanız fikir olarak harika ama ekranda nerede ne var bulamıyorum, çok kalabalık!"', "text", [
            ("Sayfadaki gereksiz tüm DOM (ve kod) elemanlarını silerek hafıza kullanımını düşürür uygulamanın hızını iki katına çıkarırım.", "YAZILIM"),
            ("Uygulamanın navigasyonunu, boşluk kullanımlarını (White Space) ve bilgi mimarisini en sade ve nefes alacak şekilde baştan tasarlarım.", "TASARIM"),
            ("Kullanıcıların tam olarak hangi ekranlarda kaybolduğunu, hangi butonlara hiç basmadıklarını 'Isı Haritası' (Heatmap) üzerinden kanıtlarım.", "ANALITIK"),
            ("Yönetimi ve ekibi toplayarak 'Müşteri Daima Haklıdır' ilkesini hatırlatır, teknik ekibe özellik geliştirmeyi durdurup bu sorunu çözmeleri emrini veririm.", "LIDERLIK"),
        ]),
        ("20. Müthiş bir haber! Büyüyen şirketiniz aniden 10 Milyon Dolar tutarında dev bir yatırım aldı. İlk odağın ne olur?", "Bütçe Onaylandı: 10,000,000 $", "text", [
            ("Dünyanın en iyi serverlarını kiralamak, siber güvenliği sağlamlaştırmak ve tamamen ölçeklenebilir (scalable) bir sistem kurmak.", "YAZILIM"),
            ("Markamızı küresel bir vizyona kavuşturacak, dünyaca ünlü tasarım ofisleri ve prodüksiyon şirketleriyle çalışarak vizyonumuzu estetize etmek.", "TASARIM"),
            ("Piyasanın en büyük veri bilimcilerini kadroya bağlamak ve rakiplerin tüm verilerini işleyebilecek devasa algoritmalar satın almak.", "ANALITIK"),
            ("Şirket kültürünü inşaa etmek için muazzam bir yetenek ve İnsan Kaynakları havuzu kurmak, üst düzey bir lansman ve yetenek avı başlatmak.", "LIDERLIK"),
        ]),
    ]
    for q_text, snippet, stype, opts in career_map_qs:
        c.execute("INSERT INTO career_map_questions (question, snippet, snippet_type) VALUES (?,?,?)", (q_text, snippet, stype))
        qid = c.lastrowid
        for o_text, o_type in opts:
            c.execute("INSERT INTO career_map_options (question_id, text, type) VALUES (?,?,?)", (qid, o_text, o_type))

    # --- 6. CAREER TITLE MAPPING ---
    for t, title in [("YAZILIM","Yazılım ve Teknoloji Uzmanı"),("TASARIM","Kreatif Tasarımcı & Sanatçı"),("ANALITIK","Veri Analisti & Stratejist"),("LIDERLIK","Yönetici & İletişim Ustası")]:
        c.execute("INSERT INTO career_title_mapping VALUES (?,?)", (t, title))

    # --- 7. COMBINED PROFESSION MAPPING + DESCRIPTIONS ---
    prof_map = {
        "A-YAZILIM": ("Teknoloji CEO'su / CTO", "Teknik zekanla doğuştan gelen yönetim becerilerini birleştiriyorsun. Sadece kod yazmakla kalmıyor, devasa teknik ekiplere ve sistemlere yön veriyorsun."),
        "A-TASARIM": ("Kreatif Direktör / Ajans Kurucusu", "Estetik vizyonun ve güçlü lidelik vasıfların seni bir tasarım imperatorluğunun veya yenilikçi bir ajansın zirvesine taşıyor."),
        "A-ANALITIK": ("Veri Odaklı Strateji Müdürü", "Rakamları okuma yeteneğini kararlı duruşunla harmanlayarak, şirketlerin kaderini çizen devasa stratejik hamlelere imza atıyorsun."),
        "A-LIDERLIK": ("Şirket Kurucusu / Üst Düzey Yönetici", "Saf bir yönetim gücüsün. İnsanları motive etme ve krizleri yönetme konusundaki kusursuz yeteneğin seni doğal bir şirket yüzü yapıyor."),
        "B-YAZILIM": ("Sistem Mimarı / Kıdemli Mühendis", "Sistemin en derinine inen, en karmaşık sorunları çözen bilgisayar bilimcisisin. Kodun arkasındaki felsefeyi ve mimariyi sen kuruyorsun."),
        "B-TASARIM": ("UX/UI Araştırmacısı / Tasarım Teorisyeni", "Sadece güzel olanı değil, insan psikolojisine ve tasarımın temellerine en uygun olanı arayan derin bir tasarım araştırmacısısın."),
        "B-ANALITIK": ("Veri Bilimcisi / Baş Analist", "Gerçekleri verilerle ortaya çıkaran bilge bir analistsin. Duygularla değil, saf mantık ve kesin bilgiyle hareket ediyorsun."),
        "B-LIDERLIK": ("Danışman / Şirket Mentoru", "İnsanlara ne yapacaklarını emretmiyor, onlara yolu gösteriyorsun. Şirketlerin en sıkıştığı anlarda başvurduğu bilge bir danışmansın."),
        "C-YAZILIM": ("Bağımsız (Freelance) Yazılım Geliştirici", "Geleneksel ofis kurallarına sığmayan, dünyanın neresinde olursa olsun kod üretebilen ve hep yeni teknolojileri deneyen bir bağımsızsın."),
        "C-TASARIM": ("Dijital Sanatçı / Göçebe Tasarımcı", "İlhamını dünyayı gezerek ve yeni kültürler tanıyarak alan özgür bir sanatçısın. Kuralları yıkan yenilikçi tasarımlar senin işin."),
        "C-ANALITIK": ("Growth Hacker / Pazar Araştırmacısı", "Verileri klasik yöntemlerle değil, yepyeni büyüme hileleri (growth hacking) ve alışılmadık pazar stratejileri bularak yorumluyorsun."),
        "C-LIDERLIK": ("Proje Yöneticisi / Ürün Evangelisti", "Piyasaları gezerek yeni ürünlerin elçiliğini yapan, sürekli hareket halinde olan ve insanları yeni vizyonlara ikna eden bir öncüsün."),
        "D-YAZILIM": ("Erişilebilirlik (Accessibility) Uzmanı", "Yazdığın kodlarla teknolojiyi dezavantajlı gruplara açan, herkesin kullanabileceği sistemler geliştiren etik ve şefkatli bir yazılımcısın."),
        "D-TASARIM": ("Kullanıcı Deneyimi Odaklı Hizmet Tasarımcısı", "Tasarımların her zaman insanın hayatını kolaylaştırmak ve ruhuna dokunmak üzerine kurulu. İnsan odaklı hizmet tasarımının kalbisin."),
        "D-ANALITIK": ("İnsan Kaynakları Veri Analisti", "Elde ettiğin verileri şirketi daha fazla kâr ettirmekten çok, çalışanların refahı ve mutluluğunu sağlamak (İnsan Kaynakları) için kullanıyorsun."),
        "D-LIDERLIK": ("Topluluk Yöneticisi / Ekip Koçu", "Sert bir yöneticiden ziyade, takımın ruh sağlığını koruyan, uyumu sağlayan ve herkesin potansiyeline ulaşmasını sağlayan bir koçsun."),
    }
    for key, (title, desc) in prof_map.items():
        c.execute("INSERT INTO combined_profession_mapping VALUES (?,?,?)", (key, title, desc))

    # --- 8. SALARY DATA ---
    salary = {
        "A-YAZILIM": ("25.000 - 100.000+ TL / ay", "$120k - $300k+ / yıl"),
        "A-TASARIM": ("20.000 - 80.000 TL / ay", "$80k - $200k / yıl"),
        "A-ANALITIK": ("22.000 - 90.000 TL / ay", "$90k - $220k / yıl"),
        "A-LIDERLIK": ("30.000 - 150.000+ TL / ay", "$100k - $400k+ / yıl"),
        "B-YAZILIM": ("30.000 - 120.000 TL / ay", "$110k - $250k / yıl"),
        "B-TASARIM": ("15.000 - 60.000 TL / ay", "$70k - $150k / yıl"),
        "B-ANALITIK": ("25.000 - 100.000 TL / ay", "$100k - $230k / yıl"),
        "B-LIDERLIK": ("18.000 - 80.000 TL / ay", "$80k - $180k / yıl"),
        "C-YAZILIM": ("10.000 - 70.000 TL / ay (freelance)", "$50k - $150k / yıl"),
        "C-TASARIM": ("8.000 - 50.000 TL / ay", "$40k - $120k / yıl"),
        "C-ANALITIK": ("15.000 - 60.000 TL / ay", "$60k - $150k / yıl"),
        "C-LIDERLIK": ("12.000 - 55.000 TL / ay", "$55k - $130k / yıl"),
        "D-YAZILIM": ("18.000 - 70.000 TL / ay", "$70k - $160k / yıl"),
        "D-TASARIM": ("12.000 - 50.000 TL / ay", "$55k - $120k / yıl"),
        "D-ANALITIK": ("14.000 - 55.000 TL / ay", "$50k - $110k / yıl"),
        "D-LIDERLIK": ("12.000 - 50.000 TL / ay", "$45k - $110k / yıl"),
    }
    for key, (tr, gl) in salary.items():
        c.execute("INSERT INTO combined_salary_data VALUES (?,?,?)", (key, tr, gl))

    # --- 9. ROADMAP DATA ---
    roadmaps = {
        "YAZILIM": "🗺️ Yazılım Başlangıç Paketi (Adım Adım):\n\n1️⃣ TEMEL MANTIK (1-2 ay): Algoritma düşüncesi ve problem çözme. Python veya JavaScript'i seç, günde 1 saat kod yaz.\n2️⃣ WEB TEMELLERİ (1-2 ay): HTML, CSS ve JavaScript ile statik sayfa yapısı öğren.\n3️⃣ BACKEND VEYA FRONTEND (2-3 ay): Frontend için React/Vue, Backend için Node.js veya Django öğren.\n4️⃣ VERİTABANI: SQL (PostgreSQL) ile veri saklama ve sorgulama öğren.\n5️⃣ GİT & GITHUB: Kodunu yedekle ve dünya ile paylaş.\n6️⃣ PROJELERİNİ YAY: GitHub'a koy, LinkedIn'e ekle ve freelance işler almaya çalış.",
        "TASARIM": "🗺️ Tasarım Başlangıç Paketi (Adım Adım):\n\n1️⃣ ARAÇ ÖĞREN (2-4 hafta): Figma'yı ücretsiz hesapla indir ve temel araçlarını öğren.\n2️⃣ TASARIM TEMELLERİ (1-2 ay): Renk teorisi, tipografi, kontrast oranları ve boşluk kullanımı çalış.\n3️⃣ UX ARAŞTIRMASI (1 ay): Kullanıcı görüşmeleri, wireframe ve kullanıcı akışı kavramlarını öğren.\n4️⃣ UI PRATİĞİ: Sevdiğin uygulamaları Figma'da birebir kopyala.\n5️⃣ PORTFOLYO: Behance veya Dribbble'a en az 3 proje yükle.\n6️⃣ TREND TAKİBİ: Laws of UX, Awwwards ve Muzli Design gibi kaynakları gündelik izle.",
        "ANALITIK": "🗺️ Veri Analizi Başlangıç Paketi (Adım Adım):\n\n1️⃣ EXCEL / GOOGLE SHEETS (2-4 hafta): VLOOKUP, Pivot Tablo ve temel formülleri öğren.\n2️⃣ TEMEL İSTATİSTİK (1 ay): Ortalama, medyan, standart sapma ve temel olasılık mantığını kavra.\n3️⃣ SQL (1-2 ay): Bir veritabanına veri çekebilmek ve filtreleyebilmek her analistin olmazmazı.\n4️⃣ PYTHON (2-3 ay): Pandas kütüphanesiyle veri temizleme, Matplotlib ile görselleştirme öğren.\n5️⃣ ARAÇ: Tableau Public veya Power BI ile görsel dashboard'lar oluşturmayı öğren.\n6️⃣ PROJELERİNİ YAY: Kaggle'daki gerçek veri setleriyle analizler yap ve LinkedIn'de paylaş.",
        "LIDERLIK": "🗺️ Liderlik & Yönetim Başlangıç Paketi (Adım Adım):\n\n1️⃣ KENDİNİ TANI (Sürekli): DISC, MBTI veya Enneagram kişilik testlerini çöz.\n2️⃣ AGILE / SCRUM ÖĞRENİ (2-4 hafta): Scrum.org'daki ücretsiz materyalleri oku.\n3️⃣ İLETİŞİM BECERİLERİ (Sürekli): TED Talks izle ve her fırsatta sunum yap.\n4️⃣ DUYGUSAL ZEKA (EQ) GELİŞTİR: Daniel Goleman'ın Emotional Intelligence kitabını oku.\n5️⃣ PROJE YÖNETİMİ ARAÇLARI: Jira, Notion veya Trello kullanmayı öğren.\n6️⃣ KİTAP & PODCAST: Good to Great (Collins), The Manager's Path (Fournier) dinle.",
    }
    roadmap_links = {
        "YAZILIM": [
            ("🎓 CS50: Harvard'ın Ücretsiz Bilgisayar Bilimi Kursu", "https://pll.harvard.edu/course/cs50-introduction-computer-science"),
            ("💻 FreeCodeCamp (Sıfırdan Web Geliştirme, Tamamen Ücretsiz)", "https://www.freecodecamp.org/"),
            ("🇹🇷 Patika.dev (Türkçe Bootcamp ve Kurs Platformu)", "https://www.patika.dev/"),
            ("🗺️ Roadmap.sh (Frontend, Backend, DevOps Yol Haritaları)", "https://roadmap.sh/"),
            ("🐍 Python.org Başlangıç Rehberi (Resmi Dokümantasyon)", "https://wiki.python.org/moin/BeginnersGuide"),
            ("📹 The Odin Project (Kapsamlı Ücretsiz Web Kursu)", "https://www.theodinproject.com/"),
        ],
        "TASARIM": [
            ("🎨 Figma Eğitimleri (Resmi YouTube Kanalı)", "https://www.youtube.com/c/Figmadesign"),
            ("🎓 Google UX Design Certificate (Coursera - Başlangıç)", "https://grow.google/certificates/ux-design/"),
            ("🧠 Laws of UX (Kullanıcı Davranış Psikolojisi)", "https://lawsofux.com/"),
            ("🌟 Awwwards (Dünyanın En İyi Tasarımlarından İlham Al)", "https://www.awwwards.com/"),
            ("📂 Behance (Portfolyo Yayınlama ve Sektörel İlham)", "https://www.behance.net/"),
            ("🇹🇷 Tasarım Okulu YouTube (Türkçe UI/UX İçerikleri)", "https://www.youtube.com/@tasarimokulu"),
        ],
        "ANALITIK": [
            ("📊 Kaggle Learn (Ücretsiz Veri Bilimi Mini Kursları)", "https://www.kaggle.com/learn"),
            ("🎓 Google Data Analytics Certificate (Coursera)", "https://grow.google/certificates/data-analytics/"),
            ("🐍 DataCamp (İnteraktif Python ve SQL Kursları)", "https://www.datacamp.com/"),
            ("🗄️ Mode Analytics SQL Tutorial (Pratik SQL Öğrenme)", "https://mode.com/sql-tutorial/"),
            ("📈 Tableau Public (Ücretsiz Görselleştirme Aracı)", "https://public.tableau.com/"),
            ("🇹🇷 Veri Bilimi Okulu (Türkçe İçerik ve Topluluk)", "https://www.veribilimiokulu.com/"),
        ],
        "LIDERLIK": [
            ("📋 Scrum.org (Ücretsiz Scrum Guide ve Eğitimler)", "https://www.scrum.org/resources/scrum-guide"),
            ("🎓 Google Project Management Certificate (Coursera)", "https://grow.google/certificates/project-management/"),
            ("🎤 TED Talks: Liderlik ve Motivasyon Seçkileri", "https://www.ted.com/topics/leadership"),
            ("📰 Harvard Business Review (Strateji ve Yönetim)", "https://hbr.org/"),
            ("🧠 MindTools (Pratikte Liderlik ve Ekip Yönetimi)", "https://www.mindtools.com/"),
            ("🇹🇷 Yönetim ve Organizasyon Derneği (Türkiye)", "https://www.yod.org.tr/"),
        ],
    }
    for rtype, fund in roadmaps.items():
        c.execute("INSERT INTO roadmap_data VALUES (?,?)", (rtype, fund))
    for rtype, links in roadmap_links.items():
        for text, url in links:
            c.execute("INSERT INTO roadmap_links (type, text, url) VALUES (?,?,?)", (rtype, text, url))

    conn.commit()
    print(f"✅ Veritabanı başarıyla oluşturuldu: {DB_PATH}")

    # Verification
    tables = c.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").fetchall()
    print(f"\n📋 Oluşturulan tablolar ({len(tables)}):")
    for t in tables:
        count = c.execute(f"SELECT COUNT(*) FROM [{t[0]}]").fetchone()[0]
        print(f"   - {t[0]}: {count} kayıt")

    conn.close()

if __name__ == "__main__":
    create_db()
