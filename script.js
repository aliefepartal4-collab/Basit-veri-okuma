
// --- 1. CHARACTER QUIZ DATA ---
const questions = [
    {
        question: "Büyük bir hayal kırıklığı yaşadığında, içindeki acıyla nasıl başa çıkarsın?",
        options: [
            { text: "Duygularımı bir kenara bırakıp hızla yeni bir hedefe odaklanırım. Durmak bana göre değil.", type: "A" },
            { text: "Neden böyle olduğunu uzun uzun analiz eder, bu deneyimden felsefi bir ders çıkarırım.", type: "B" },
            { text: "Bulunduğum ortamdan tamamen uzaklaşır, yeni bir yere giderek zihnimi sıfırlarım.", type: "C" },
            { text: "Acımı en yakınlarımla paylaşır, onların destek ve şefkatiyle iyileşmeye çalışırım.", type: "D" }
        ]
    },
    {
        question: "Bir odada herkesin tartıştığı ve ortamın iyice gerildiği bir an düşün. Böyle bir durumda ne yaparsın?",
        options: [
            { text: "Otoritemi hissettirerek kontrolü elime alır ve tartışmayı net bir kararla sonlandırırım.", type: "A" },
            { text: "Sessizce gözlem yapar, iki tarafın da asıl sorununu tespit edip mantıklı bir çözüm sunarım.", type: "B" },
            { text: "Bu negatif enerji bana fazla gelir, kimseye çaktırmadan ortamdan uzaklaşırım.", type: "C" },
            { text: "Araya girip ortamı yumuşatacak bir espri yapar veya tarafları sakinleştirmeye çalışırım.", type: "D" }
        ]
    },
    {
        question: "Gece yatağa yattığında uykudan önce aklından geçen en baskın düşünce genellikle nedir?",
        options: [
            { text: "Yarın halletmem gereken işler, stratejilerim ve sıradaki büyük adımlarım.", type: "A" },
            { text: "Bugün ne öğrendim? İnsan doğasının ve hayatın o tuhaf karmaşıklığı...", type: "B" },
            { text: "Gitmek istediğim yeni ülkeler, denemek istediğim farklı ve çılgın şeyler.", type: "C" },
            { text: "Bugün sevdiklerimi mutlu edebildim mi? Acaba bilmeden birini kırdım mı?", type: "D" }
        ]
    },
    {
        question: "Biri sana haksız ve oldukça sert bir eleştiri yaptığında ilk içsel tepkin ne olur?",
        options: [
            { text: "'Benim kim olduğumu bilmiyor, ona gücümü ve haklılığımı er ya da geç kanıtlayacağım.'", type: "A" },
            { text: "'Bu eleştirinin arkasında yatan asıl psikolojik sebep veya kendi güvensizliği ne olabilir?'", type: "B" },
            { text: "Umursamam. Başkalarının benim hakkımda ne düşündüğüne takılmak büyük bir zaman kaybı.", type: "C" },
            { text: "Gerçekten hatalı mıyım diye kendimi derinden sorgular ve içten içe üzüntü duyarım.", type: "D" }
        ]
    },
    {
        question: "Hayatta seni en çok korkutan, içten içe kabusun olabilecek şey aşağıdakilerden hangisidir?",
        options: [
            { text: "Kontrolü tamamen kaybetmek ve başkalarının yönetimi altına girmek.", type: "A" },
            { text: "Gerçekleri görememek, cehalet içinde yaşamak ve kandırılmak.", type: "B" },
            { text: "Sıradan, rutin ve hiçbir heyecanı olmayan sıkıcı bir hayata hapsolmak.", type: "C" },
            { text: "Tamamen yalnız kalmak ve değer verdiğim insanların beni terk etmesi.", type: "D" }
        ]
    },
    {
        question: "Eğer dünyada tek bir şeyi değiştirme gücün olsaydı, bu ne olurdu?",
        options: [
            { text: "Küresel ve mükemmel işleyen bir düzen kurar, tüm kaosu ve verimsizliği silerdim.", type: "A" },
            { text: "Tüm insanların gerçeği arayan, bilinçli ve çok daha derin varlıklar olmasını sağlardım.", type: "B" },
            { text: "Fiziksel ve zihinsel tüm sınırları kaldırır, insanlığa sınır tanımaz mutlak özgürlüğü verirdim.", type: "C" },
            { text: "Dünyadaki tüm acıları, nefreti ve eşitsizliği yok eder, saf şefkati hakim kılardım.", type: "D" }
        ]
    },
    {
        question: "Gizli bir yeteneğin olsaydı, bunun hangisi olmasını isterdin?",
        options: [
            { text: "İnsanların zihnine girip onları gizlice yönlendirebilmek veya kararlarını etkileyebilmek.", type: "A" },
            { text: "Geçmişteki ve gelecekteki tüm sırları görebilmek, evrenin mutlak bilgisine erişmek.", type: "B" },
            { text: "Gözümü kapattığım an, uzay ve zaman tanımaksızın evrenin herhangi bir yerine ışınlanabilmek.", type: "C" },
            { text: "Dokunduğum insanların fiziksel veya ruhsal tüm yaralarını, acılarını anında iyileştirebilmek.", type: "D" }
        ]
    },
    {
        question: "Sana devasa bir servet miras kalsaydı, paranın kontrolünü eline aldığında yapacağın ilk şey ne olurdu?",
        options: [
            { text: "Bu serveti daha da katlayacak devasa bir iş, sistem veya imparatorluk kurmak.", type: "A" },
            { text: "Bilimsel araştırmalara, laboratuvarlara ve büyük kütüphanelere sonsuz bir fon sağlamak.", type: "B" },
            { text: "Hiçbir plan yapmadan, sorumluluk almadan dünyayı uçtan uca gezmek için bir bütçe ayırmak.", type: "C" },
            { text: "İhtiyacı olanlara, çocuklara veya savunmasızlara adanmış devasa bir yardım ağı kurmak.", type: "D" }
        ]
    },
    {
        question: "Kendini bir doğa elementi ile karakterize edecek olsaydın, hangisini seçerdin?",
        options: [
            { text: "Ateş: Yakıcı, dönüştürücü, güçlü, enerjik ve bazen de yok edici.", type: "A" },
            { text: "Toprak: Sabit, dayanıklı, kökleri derinde, besleyici ve bilge.", type: "B" },
            { text: "Rüzgar: Ele avuca sığmaz, yönü belirsiz, sınır tanımaz, özgür ve hızlı.", type: "C" },
            { text: "Su: Uyumlu, girdiği kabın şeklini alan, şifa veren, derin ve birleştirici.", type: "D" }
        ]
    },
    {
        question: "Bir gün bu dünyadan ayrıldığında, insanlar seni en çok hangi cümlen veya duruşunla hatırlasın istersin?",
        options: [
            { text: "'O, her zaman en öndeydi ve imkansız denileni başaran büyük bir öncü/liderdi.'", type: "A" },
            { text: "'O, kimsenin göremediği gerçekleri gören, anlayan çok derin bir bilgeydi.'", type: "B" },
            { text: "'O, hiçbir kurala sığmayan, hayatı sonuna kadar yaşayan cesur bir maceraperestti.'", type: "C" },
            { text: "'O, hayatına dokunduğu herkesi iyileştiren, kocaman kalpli bir kahramandı.'", type: "D" }
        ]
    }
];

const archetypes = {
    A: {
        id: "A",
        title: "Lider (The Ruler)",
        icon: "👑",
        description: "Kararlı, cesur ve vizyoner bir ruha sahipsin. Karmaşanın içinden çıkış yolunu her zaman ilk sen bulursun. Doğal bir otoriten var ve insanlar senin peşinden gelmekte tereddüt etmiyor.",
        traits: ["Kriz anlarında soğukkanlı", "Doğuştan yönetici", "Hedef odaklı"]
    },
    B: {
        id: "B",
        title: "Bilge (The Sage)",
        icon: "🦉",
        description: "Analitik, derin düşünceli ve bilgiye açsın. Dünyayı sadece yaşamakla kalmıyor, anlamak istiyorsun. Olaylara dışarıdan, objektif bir gözle bakabilme yeteneğin seni çok değerli bir danışman yapıyor.",
        traits: ["Sorgulayıcı zihin", "Mantıklı kararlar", "Sürekli öğrenen"]
    },
    C: {
        id: "C",
        title: "Kaşif (The Explorer)",
        icon: "🧭",
        description: "Maceraperest, yenilikçi ve özgürlüğüne kelimenin tam anlamıyla aşıksın. Sınırlandırılmaktan nefret eder, her zaman ufkun ötesindeki o yeni mucizeyi ararsın. Rutinler sana göre değil.",
        traits: ["Risk almayı seven", "Özgür ruhlu", "Yeni deneyimler arayan"]
    },
    D: {
        id: "D",
        title: "Koruyucu (The Caregiver)",
        icon: "🛡️",
        description: "Şefkatli, fedakar ve son derece güvenilir birisin. Sevdiklerin için yapamayacağın hiçbir şey yok. İnsanların duygularını bir radar gibi hisseder ve onlara her zaman güvenli bir liman olursun.",
        traits: ["Empati ustası", "İyi bir dinleyici", "Sevdiklerine sadık"]
    }
};

const characterCareerQuestions = {
    A: [{ question: "Lider ruhlu biri olarak, kariyerinde hangi ortam seni daha çok tatmin eder?", options: [{ text: "Büyük bir şirketin zirvesine tırmanıp CEO koltuğuna oturmak.", type: "C1" }, { text: "Kendi girişimimi kurup sıfırdan devasa bir imparatorluk yaratmak.", type: "C2" }, { text: "Siyasete veya kamu yönetimine atılıp geniş kitleleri yönetmek.", type: "C3" }, { text: "Askeriye veya kriz yönetimi gibi disiplin ve otorite gerektiren alanlar.", type: "C4" }] }],
    B: [{ question: "Bilgiye bu kadar aç biri olarak, mesleki hayatını neye adamak istersin?", options: [{ text: "Akademiye katılıp araştırma görevlisi, profesör veya yazar olmak.", type: "C1" }, { text: "Veri bilimi, analiz veya teknoloji alanlarında derin uzmanlık kazanmak.", type: "C2" }, { text: "İnsanların sorunlarını kökten çözen bir terapist veya psikolog olmak.", type: "C3" }, { text: "Adaletin ve mantığın savunucusu olarak iyi bir avukat veya hakim olmak.", type: "C4" }] }],
    C: [{ question: "Özgürlüğüne düşkün keşifçi ruhun, hangi kariyer yolunda parlayabilir?", options: [{ text: "Dünyayı gezerek belgesel veya seyahat içerikleri üreten bir yaratıcı olmak.", type: "C1" }, { text: "Sürekli sahada olacağım arkeoloji, jeoloji veya doğa araştırmacılığı.", type: "C2" }, { text: "Masa başı olmayan, serbest çalışan bir dijital göçebe, sanatçı veya tasarımcı.", type: "C3" }, { text: "Adrenalin dolu bir meslek; pilot, dalgıç veya ekstrem spor eğitmeni.", type: "C4" }] }],
    D: [{ question: "Şefkatli ve yardımsever doğan, profesyonel hayatta nasıl vücut bulmalı?", options: [{ text: "Hayat kurtaran bir doktor, hemşire veya sağlık çalışanı olmak.", type: "C1" }, { text: "Yeni nesilleri yetiştiren öğretmen, eğitmen veya pedagog olmak.", type: "C2" }, { text: "Toplumsal eşitsizliklere savaş açan bir sosyal hizmet uzmanı veya aktivist.", type: "C3" }, { text: "İnsan kaynakları veya takım koçluğu yaparak kurum içi huzuru sağlamak.", type: "C4" }] }]
};

const characterCareerResults = {
    A: { C1: "Kurumsal Lider / CEO", C2: "Girişimci / Kurucu", C3: "Siyasetçi / Bürokrat", C4: "Kriz Yöneticisi / Komutan" },
    B: { C1: "Akademisyen / Yazar", C2: "Veri Analisti / Sistem Mimarı", C3: "Psikolog / Terapist", C4: "Avukat / Hakim" },
    C: { C1: "Seyahat Yazarı / İçerik Üreticisi", C2: "Araştırmacı / Arkeolog", C3: "Dijital Göçebe / Freelancer", C4: "Pilot / Ekstrem Spor Eğitmeni" },
    D: { C1: "Doktor / Sağlık Uzmanı", C2: "Öğretmen / Eğitimci", C3: "Sosyal Hizmet Uzmanı", C4: "İnsan Kaynakları Uzmanı / Koç" }
};

// --- 2. CAREER MAP QUIZ DATA ---
const careerMapQuestions = [
    {
        question: "1. Aşağıdaki Python koduna bak. Sence burada bariz bir hata var mı?",
        snippet: "def hesapla(a, b):\n    return a + b\n\nsonuc = hesapla(5)\nprint(sonuc)",
        snippetType: "code",
        options: [
            { text: "Evet, fonksiyona 2 parametre verilmiş ama sadece 1 tane gönderilmiş (Syntax/Type Error).", type: "YAZILIM" },
            { text: "Hata falan umurumda değil, kod bloğunun renkleri ve yerleşimi çok sıkıcı.", type: "TASARIM" },
            { text: "Kodda hata var ama asıl soru bu fonksiyon tam olarak ne hesaplıyor? Veri nerede?", type: "ANALITIK" },
            { text: "Takımımdaki yazılımcıya sorarım, benim işim kodu değil ekibi yönetmek.", type: "LIDERLIK" }
        ]
    },
    {
        question: "2. Bir ürün lansmanı metninde şu cümleyi gördün: 'Kullanıcılarımızın %80'i belki bu ürünü çok sevebilir.' Ekibe ne söylersin?",
        snippet: "'Kullanıcılarımızın %80'i belki bu ürünü çok sevebilir.'",
        snippetType: "text",
        options: [
            { text: "Bunun arkasındaki sistem hatalı, ürünü seviyorlarsa net bir metrik döner. Kodu inceleyelim.", type: "YAZILIM" },
            { text: "Bu çok zayıf bir kelime ('belki'). Daha iddialı, vurucu ve estetik bir kampanya metni yazmalıyız.", type: "TASARIM" },
            { text: "'%80' verisine nasıl ulaştık? A/B test sonuçlarını ve istatistiksel raporları acilen görmek istiyorum.", type: "ANALITIK" },
            { text: "Metni yazan kişiyi motive edici bir toplantıya çağırır, markamızın vizyonunu tekrar anlatırım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "3. Bir mobil uygulama arayüzü (UI) tasarımı inceliyorsun. Ekranda 'Satın Al' butonu gri renkte ve sayfanın en altında gizlenmiş. Tepkin ne olur?",
        snippet: "Buton Görünümü: [SATIN AL] (Renk: #cccccc, Konum: Sayfa sonu)",
        snippetType: "text",
        options: [
            { text: "Butonun tıklanma event'i (onClick) doğru bağlanmış mı diye kod tarafını kontrol ederim.", type: "YAZILIM" },
            { text: "Facia! Buton canlı bir renkte (örn: turuncu) ve kullanıcının göz hizasında (above the fold) olmalı.", type: "TASARIM" },
            { text: "Kullanıcıların bu gri butona tıklama davranış raporlarını ve ısı haritasını (heatmap) inceleyelim.", type: "ANALITIK" },
            { text: "UX tasarımcısını yanıma çağırıp satış hedeflerimizi ve kullanıcı psikolojisini tekrar tartışırım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "4. Önüne şöyle tuhaf bir veri tablosu geldi. Bu tablo sence ne işe yarıyor olabilir?",
        snippet: "ID | AGE | CTR (%) | REVENUE\n1  | 24  | 5.2     | $120\n2  | 35  | 2.1     | $45\n3  | 19  | 8.4     | $210",
        snippetType: "code",
        options: [
            { text: "Bu SQL'den çekilmiş bir tablo. Hemen bir INNER JOIN yazıp diğer verilerle birleştirmek isterim.", type: "YAZILIM" },
            { text: "Bu sayılar çok kuru. Bunları şık bir pasta grafiğine (pie chart) veya infografiğe dönüştürsek harika olur.", type: "TASARIM" },
            { text: "Açıkça 19-24 yaş arası kitlenin Tıklama Oranı (CTR) ve getirisi çok daha yüksek, stratejiyi o yöne kaydırmalıyız.", type: "ANALITIK" },
            { text: "Pazarlama ekibini hemen toplantıya çağırıp genç kitleye daha agresif satış yapmaları talimatını veririm.", type: "LIDERLIK" }
        ]
    },
    {
        question: "5. Şirketin ana sunucusunun aniden çöktüğü söylendi. Çalışan ekranında şu hata var:",
        snippet: "Error 502 Bad Gateway / Connection Refused",
        snippetType: "code",
        options: [
            { text: "Hemen sunucu loglarına girer, ters vekil (reverse proxy) ve firewall ayarlarını satır satır incelerim.", type: "YAZILIM" },
            { text: "Hata sayfasının tasarımını 'Aman tanrım bir şeyler koptu!' gibi sevimli bir illüstrasyonla değiştirmek isterdim.", type: "TASARIM" },
            { text: "Geçen ayın trafik verilerini çıkarıp, sunucunun saat kaçta, hangi yük altında çöktüğünü hesaplamaya başlarım.", type: "ANALITIK" },
            { text: "Panik yok! Müşterilere acil bir 'Bakımdayız' maili atılmasını sağlar ve operasyon ekibini koordine ederim.", type: "LIDERLIK" }
        ]
    },
    {
        question: "6. Bir projede kullanılacak logo için iki seçenek geldi:",
        snippet: "Logo A: Çok karmaşık, 7 farklı renk, 3 ayrı font.\nLogo B: 2 renk, minimalist çizim, tek serif font.",
        snippetType: "text",
        options: [
            { text: "Hangisinin dosya boyutu (SVG) daha küçükse ve sitemizi daha hızlı yükleyecekse onu seçerim.", type: "YAZILIM" },
            { text: "Kesinlikle Logo B! Modern tasarım 'Az çoktur' (Less is more) felsefesine dayanır, karmaşaya yer yok.", type: "TASARIM" },
            { text: "A/B testi yaparız. 10.000 kullanıcıya A'yı, 10.000'ine B'yi gösterir; tıklama verilerine göre karar veririz.", type: "ANALITIK" },
            { text: "Hangi logo markamızın gelecekteki misyonunu ve otoritesini daha iyi yansıtıyorsa yatırımcılar ona onay verecektir.", type: "LIDERLIK" }
        ]
    },
    {
        question: "7. Sosyal medyada markanızla ilgili bir kriz patlak verdi, binlerce kızgın tweet atılıyor.",
        snippet: "Trend Topic: #SirketinizBoykot",
        snippetType: "text",
        options: [
            { text: "Derhal sistemi kapatıp dışarıdan gelen trafiği keser ve güvenlik açıklarını yamamaya başlarım.", type: "YAZILIM" },
            { text: "Empati dolu, çok şık tasarlanmış ve renkleriyle güven veren bir özür metni/görseli hazırlarım.", type: "TASARIM" },
            { text: "Hasar boyutunu ölçer, bu tweetlerin yüzde kaçının bot (sahte) hesaplardan geldiğini algoritmalarla tespit ederim.", type: "ANALITIK" },
            { text: "Halkla ilişkiler (PR) departmanının başına geçip basın sözcüsü olarak resmi ve net bir canlı yayın açıklaması yaparım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "8. Aşağıdaki CSS kodu ne işe yarıyor olabilir?",
        snippet: ".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}",
        snippetType: "code",
        options: [
            { text: "Bu çok kolay, bir elementi ekranın hem dikey hem yatay tam ortasına (merkezine) hizalamak için yazılmış.", type: "YAZILIM" },
            { text: "Büyüleyici! Bu kod bloğu sayesinde tasarladığım objeler ekranda altın oran estetiğiyle hizalanıyor.", type: "TASARIM" },
            { text: "Bu kod sömürdüğü işlemci gücü açısından grid mi flexbox mı daha performanslı diye test edilmelidir.", type: "ANALITIK" },
            { text: "Bunun ne işe yaradığını bilmem ama ekibe 'Ekranda her şey simetrik dursun!' talimatını veren benim.", type: "LIDERLIK" }
        ]
    },
    {
        question: "9. E-Ticaret sitenizin yıllık satış grafiğini incelediğinizde şöyle bir tablo gördünüz:",
        snippet: "Ocak: 100K | Nisan: 120K | Ağustos: 50K (Düşüş!) | Kasım: 300K",
        snippetType: "text",
        options: [
            { text: "Ağustos ayında sitemizin altyapısında veya ödeme (odeme API) sistemlerinde bir çökme mi oldu diye loglara bakarım.", type: "YAZILIM" },
            { text: "Belki de Ağustos ayındaki yaz kampanyamızın banner tasarımları ve ürün fotoğrafları yeterince iştah açıcı değildi.", type: "TASARIM" },
            { text: "Ağustos ayında rakiplerin fiyat indirimlerini, müşteri kayıp oranını (churn rate) ve enflasyon etkisini analiz etmeliyim.", type: "ANALITIK" },
            { text: "Hemen bir kriz masası kurar, satış müdüründen Ağustos fiyaskosunun savunmasını ister ve Kasım ekibine prim dağıtırım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "10. Şirketin yeni bir akıllı saat üretecek. Saat için ilk karar mekanizmasını sen kuracaksın:",
        snippet: "Proje Önceliği Ne Olmalı?",
        snippetType: "text",
        options: [
            { text: "İşlemcisi mükemmel çalışmalı, 1 gram bile kasmamalı (Lag olmamalı) ve pili 30 gün gitmeli.", type: "YAZILIM" },
            { text: "İncecik bir kasası, harika kayış renkleri ve Apple Watch'u bile kıskandıracak bir kavisli ekranı olmalı.", type: "TASARIM" },
            { text: "Kullanıcının nabız, uyku ve kalori verilerini mükemmel sensörlerle saniye saniye toplayıp işleyebilmeli.", type: "ANALITIK" },
            { text: "Öyle bir reklam hikayesi ve marka vizyonu yaratmalıyız ki, insanlar daha çıkmadan ön sipariş için sıraya girmeli.", type: "LIDERLIK" }
        ]
    },
    {
        question: "11. Ödeme sayfanızın (Checkout) istatistiklerini incelerken çok yüksek bir terk etme oranı (Abandonment Rate) ile karşılaştın.",
        snippet: "Gelen kullanıcıların %85'i sepeti terk ediyor.",
        snippetType: "text",
        options: [
            { text: "Ödeme API'lerinden dönen hata loglarını inceleyerek sistemde teknik bir arıza ararım.", type: "YAZILIM" },
            { text: "Sayfadaki gereksiz form elemanlarını siler ve göz yormayan, güven veren bir tasarım (UI) kurgularım.", type: "TASARIM" },
            { text: "Google Analytics'te (Funnel) huni analizi yaparak kullanıcıların tam olarak nerede kaçtığını verilerle bulurum.", type: "ANALITIK" },
            { text: "Pazarlama ekibini hemen toplayıp terk eden kullanıcılara %10 indirim içeren kurtarma mailleri attırırım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "12. Sana bir web sitesinin ilk tasarımı geldi ve şöyle bir kod gördün:",
        snippet: "<div style=\"color: #f1f1f1; background: #ffffff;\">\n    Bu metin okunabilir mi?\n</div>",
        snippetType: "code",
        options: [
            { text: "Kodlama açısından doğru olsa da, inline CSS kullanılması iyi bir pratik değil. Class yapısına geçiririm.", type: "YAZILIM" },
            { text: "Bu korkunç! Beyaz üstüne açık gri font asla okunmaz. Kontrast oranını (WCAG) acilen düzeltmeliyiz.", type: "TASARIM" },
            { text: "Kötü kontrastın ziyaretçilerin sayfada kalma süresini (bounce rate) nasıl etkilediğinin verisini çıkarırım.", type: "ANALITIK" },
            { text: "Engellilik dostu (Accessibility) bir vizyon oluşturmak için tasarım ekibine bir brief (talimat) yazarım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "13. Ekibindeki iki üst düzey çalışan şiddetli bir teknik tartışmaya girdi.",
        snippet: "\"React mı kullanalım, Vue mu? Hangisi daha iyi?\"",
        snippetType: "text",
        options: [
            { text: "Hangi kütüphanenin arka planda (Virtual DOM) daha yüksek hız ve güvenlik sunduğuna teknik olarak bakarım.", type: "YAZILIM" },
            { text: "Hangisinin arayüz tasarımlarını (UI Libraries) ve akıcı animasyonları entegre etmesi daha kolaysa onu seçerim.", type: "TASARIM" },
            { text: "Github'da her iki kütüphanenin community desteğini, kaynak miktarını ve performans skorlarını analiz ederim.", type: "ANALITIK" },
            { text: "Bu iki uzmanı masaya oturtur, yetkinliklerine ve projenin teslim süresine (deadline) göre mantıklı bir orta yol bulurum.", type: "LIDERLIK" }
        ]
    },
    {
        question: "14. Uygulama kullanıcıları her butona bastığında uygulamanın donduğundan şikayet etmeye başladı. Konsolda şunu gördün:",
        snippet: "{ \"error\": \"Timeout\", \"latency\": \"5500ms\" }",
        snippetType: "code",
        options: [
            { text: "Hemen veritabanı sorgularının indekslerini kontrol eder ve timeout (zaman aşımı) sorununu kökünden çözerim.", type: "YAZILIM" },
            { text: "Kullanıcı 5 saniye beklerken ekranda sıkılmaması için hipnotize edici bir animasyon (Loading/Skeleton) tasarlarım.", type: "TASARIM" },
            { text: "Bu gecikmenin günün hangi saatlerinde ve hangi cihaz tiplerinde daha çok yaşandığına dair bir istatistik haritası çıkarırım.", type: "ANALITIK" },
            { text: "Bu teknik aksaklığın müşteri memnuniyetine etkisini hesaplar, iletişim kanalından acil bir özür ve bilgi mesajı yayınlatırım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "15. Şirketin yönetim kurulu mevcut markayı rakiplerine göre eski bulduğunu söyledi:",
        snippet: "\"Markamızın vizyonu 90'lardan kalma gibi hissediliyor, rakipler çok önde.\"",
        snippetType: "text",
        options: [
            { text: "Sitenin arka plan mimarisini en yeni teknolojiler (Next.js vs.) ile sıfırdan kurup hızını zirveye çekerim.", type: "YAZILIM" },
            { text: "Modern, minimalist ve akıllara kazınacak yepyeni bir marka kimliği, palet ve logo tasarlarım.", type: "TASARIM" },
            { text: "Hedef kitlenin en çok etkileşime girdiği trendleri ve rakiplerin stratejik hamlelerini detaylıca haritalandırırım.", type: "ANALITIK" },
            { text: "Şirket vizyonunu tazelemek için devasa bir 'Yeniden Doğuş' lansmanı planlar ve basını harekete geçiririm.", type: "LIDERLIK" }
        ]
    },
    {
        question: "16. Şirket yapay zeka trenine katılmak istedi ve sana şöyle bir kod bloğu geldi:",
        snippet: "import tensorflow as tf\nmodel.fit(x_train, y_train, epochs=100)",
        snippetType: "code",
        options: [
            { text: "Bu modelin sunuculardaki ekran kartı (GPU) üzerinde hatasız ve optimize çalışması için kodları hemen düzenlerim.", type: "YAZILIM" },
            { text: "Yapay zekanın teknik gücü umrumda değil, son kullanıcının bu zeka ile iletişim kurduğu arayüz mükemmel hissettirmeli.", type: "TASARIM" },
            { text: "Bu yapay zeka modelinin tahmin doğruluk oranını ve hata payını büyük veri setlerinde derinlemesine test ederim.", type: "ANALITIK" },
            { text: "Bu yapay zekanın şirketimizin hedeflerine nasıl uyacağını ve ne kadar kâr getireceğini yönetim kuruluna sunarım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "17. Milyon dolarlık dev projenin teslimine tam 1 gün (24 saat) kaldı ama en hayati özellik henüz bitmedi.",
        snippet: "KRİTİK UYARI: Özellik entegrasyonu tamamlanamadı.",
        snippetType: "text",
        options: [
            { text: "Sabaha kadar gram uyumam, bilgisayar başına kilitlenir o özelliği tek başıma (veya ekiple) kodlar ve bitiririm.", type: "YAZILIM" },
            { text: "Tamamlanmamış olsa da, uygulamanın geri kalanı o kadar kusursuz ve göz alıcı görünmeli ki kimse eksikliğe takılmamalı.", type: "TASARIM" },
            { text: "Eksik kalan özelliğin, ilk 1 aydaki aktif kullanıcıların yüzde kaçının 'gerçekten' işine yarayacağını hesaplarım.", type: "ANALITIK" },
            { text: "Müşteriyi (veya yatırımcıyı) dürüstçe bilgilendirip ek süre için ikna ederim, ekibi yoğun stresten uzak tutarım.", type: "LIDERLIK" }
        ]
    },
    {
        question: "18. Projenizi çok hızlandıracak hazır bir açık kaynak kod (kütüphane) buldun ama sayfasında şunu gördün:",
        snippet: "GitHub Repository: 0 Stars | Last Commit: 3 Years Ago",
        snippetType: "code",
        options: [
            { text: "Bunu projeye ASLA eklemem. Güncellenmeyen kod güvenlik zafiyeti yaratır ve diğer dosyalarımdaki uyumluluğu kırar.", type: "YAZILIM" },
            { text: "Bunun arkadaki teknik ne olduğu umrumda değil, eğer ön tarafta tasarladığım şeyleri bozmayacaksa sorun yok.", type: "TASARIM" },
            { text: "Bu kod kütüphanesinin (dependency) bağımlılık ağacını çıkarır, olası hata frekansını ampirik yöntemlerle analiz ederim.", type: "ANALITIK" },
            { text: "Eğer bu aracı kullanmak ekibime tam 1 aylık boş zaman ve büyük bütçe tasarrufu sağlayacaksa, teknik riski üstlenip onaylayabilirim.", type: "LIDERLIK" }
        ]
    },
    {
        question: "19. Beta testine katılan kullanıcılardan gelen geri bildirimlerde ortak bir şikayet belirdi:",
        snippet: "\"Uygulamanız fikir olarak harika ama ekranda nerede ne var bulamıyorum, çok kalabalık!\"",
        snippetType: "text",
        options: [
            { text: "Sayfadaki gereksiz tüm DOM (ve kod) elemanlarını silerek hafıza kullanımını düşürür uygulamanın hızını iki katına çıkarırım.", type: "YAZILIM" },
            { text: "Uygulamanın navigasyonunu, boşluk kullanımlarını (White Space) ve bilgi mimarisini en sade ve nefes alacak şekilde baştan tasarlarım.", type: "TASARIM" },
            { text: "Kullanıcıların tam olarak hangi ekranlarda kaybolduğunu, hangi butonlara hiç basmadıklarını 'Isı Haritası' (Heatmap) üzerinden kanıtlarım.", type: "ANALITIK" },
            { text: "Yönetimi ve ekibi toplayarak 'Müşteri Daima Haklıdır' ilkesini hatırlatır, teknik ekibe özellik geliştirmeyi durdurup bu sorunu çözmeleri emrini veririm.", type: "LIDERLIK" }
        ]
    },
    {
        question: "20. Müthiş bir haber! Büyüyen şirketiniz aniden 10 Milyon Dolar tutarında dev bir yatırım aldı. İlk odağın ne olur?",
        snippet: "Bütçe Onaylandı: 10,000,000 $",
        snippetType: "text",
        options: [
            { text: "Dünyanın en iyi serverlarını kiralamak, siber güvenliği sağlamlaştırmak ve tamamen ölçeklenebilir (scalable) bir sistem kurmak.", type: "YAZILIM" },
            { text: "Markamızı küresel bir vizyona kavuşturacak, dünyaca ünlü tasarım ofisleri ve prodüksiyon şirketleriyle çalışarak vizyonumuzu estetize etmek.", type: "TASARIM" },
            { text: "Piyasanın en büyük veri bilimcilerini kadroya bağlamak ve rakiplerin tüm verilerini işleyebilecek devasa algoritmalar satın almak.", type: "ANALITIK" },
            { text: "Şirket kültürünü inşaa etmek için muazzam bir yetenek ve İnsan Kaynakları havuzu kurmak, üst düzey bir lansman ve yetenek avı başlatmak.", type: "LIDERLIK" }
        ]
    }
];

// --- 3. COMBINED PROFESSION DATA ---
const careerTitleMapping = {
    YAZILIM: "Yazılım ve Teknoloji Uzmanı",
    TASARIM: "Kreatif Tasarımcı & Sanatçı",
    ANALITIK: "Veri Analisti & Stratejist",
    LIDERLIK: "Yönetici & İletişim Ustası"
};

const combinedProfessionMapping = {
    // A: LIDER
    "A-YAZILIM": "Teknoloji CEO'su / CTO",
    "A-TASARIM": "Kreatif Direktör / Ajans Kurucusu",
    "A-ANALITIK": "Veri Odaklı Strateji Müdürü",
    "A-LIDERLIK": "Şirket Kurucusu / Üst Düzey Yönetici",
    // B: BİLGE
    "B-YAZILIM": "Sistem Mimarı / Kıdemli Mühendis",
    "B-TASARIM": "UX/UI Araştırmacısı / Tasarım Teorisyeni",
    "B-ANALITIK": "Veri Bilimcisi / Baş Analist",
    "B-LIDERLIK": "Danışman / Şirket Mentoru",
    // C: KAŞİF
    "C-YAZILIM": "Bağımsız (Freelance) Yazılım Geliştirici",
    "C-TASARIM": "Dijital Sanatçı / Göçebe Tasarımcı",
    "C-ANALITIK": "Growth Hacker / Pazar Araştırmacısı",
    "C-LIDERLIK": "Proje Yöneticisi / Ürün Evangelisti",
    // D: KORUYUCU
    "D-YAZILIM": "Erişilebilirlik (Accessibility) Uzmanı",
    "D-TASARIM": "Kullanıcı Deneyimi Odaklı Hizmet Tasarımcısı",
    "D-ANALITIK": "İnsan Kaynakları Veri Analisti",
    "D-LIDERLIK": "Topluluk Yöneticisi / Ekip Koçu"
};

const combinedProfessionDescriptions = {
    "A-YAZILIM": "Teknik zekanla doğuştan gelen yönetim becerilerini birleştiriyorsun. Sadece kod yazmakla kalmıyor, devasa teknik ekiplere ve sistemlere yön veriyorsun.",
    "A-TASARIM": "Estetik vizyonun ve güçlü lidelik vasıfların seni bir tasarım imperatorluğunun veya yenilikçi bir ajansın zirvesine taşıyor.",
    "A-ANALITIK": "Rakamları okuma yeteneğini kararlı duruşunla harmanlayarak, şirketlerin kaderini çizen devasa stratejik hamlelere imza atıyorsun.",
    "A-LIDERLIK": "Saf bir yönetim gücüsün. İnsanları motive etme ve krizleri yönetme konusundaki kusursuz yeteneğin seni doğal bir şirket yüzü yapıyor.",
    "B-YAZILIM": "Sistemin en derinine inen, en karmaşık sorunları çözen bilgisayar bilimcisisin. Kodun arkasındaki felsefeyi ve mimariyi sen kuruyorsun.",
    "B-TASARIM": "Sadece güzel olanı değil, insan psikolojisine ve tasarımın temellerine en uygun olanı arayan derin bir tasarım araştırmacısısın.",
    "B-ANALITIK": "Gerçekleri verilerle ortaya çıkaran bilge bir analistsin. Duygularla değil, saf mantık ve kesin bilgiyle hareket ediyorsun.",
    "B-LIDERLIK": "İnsanlara ne yapacaklarını emretmiyor, onlara yolu gösteriyorsun. Şirketlerin en sıkıştığı anlarda başvurduğu bilge bir danışmansın.",
    "C-YAZILIM": "Geleneksel ofis kurallarına sığmayan, dünyanın neresinde olursa olsun kod üretebilen ve hep yeni teknolojileri deneyen bir bağımsızsın.",
    "C-TASARIM": "İlhamını dünyayı gezerek ve yeni kültürler tanıyarak alan özgür bir sanatçısın. Kuralları yıkan yenilikçi tasarımlar senin işin.",
    "C-ANALITIK": "Verileri klasik yöntemlerle değil, yepyeni büyüme hileleri (growth hacking) ve alışılmadık pazar stratejileri bularak yorumluyorsun.",
    "C-LIDERLIK": "Piyasaları gezerek yeni ürünlerin elçiliğini yapan, sürekli hareket halinde olan ve insanları yeni vizyonlara ikna eden bir öncüsün.",
    "D-YAZILIM": "Yazdığın kodlarla teknolojiyi dezavantajlı gruplara açan, herkesin kullanabileceği sistemler geliştiren etik ve şefkatli bir yazılımcısın.",
    "D-TASARIM": "Tasarımların her zaman insanın hayatını kolaylaştırmak ve ruhuna dokunmak üzerine kurulu. İnsan odaklı hizmet tasarımının kalbisin.",
    "D-ANALITIK": "Elde ettiğin verileri şirketi daha fazla kâr ettirmekten çok, çalışanların refahı ve mutluluğunu sağlamak (İnsan Kaynakları) için kullanıyorsun.",
    "D-LIDERLIK": "Sert bir yöneticiden ziyade, takımın ruh sağlığını koruyan, uyumu sağlayan ve herkesin potansiyeline ulaşmasını sağlayan bir koçsun."
};

// --- 4. LEARNING ROADMAP DATA ---
const roadmapData = {
    YAZILIM: {
        fundamentals: "🗺️ Yazılım Başlangıç Paketi (Adım Adım):\n\n1️⃣ TEMEL MANTIK (1-2 ay): Algoritma düşüncesi ve problem çözme. Python veya JavaScript'i seç, günde 1 saat kod yaz.\n2️⃣ WEB TEMELLERİ (1-2 ay): HTML, CSS ve JavaScript ile statik sayfa yapısı öğren. Küçük projeler yap (portföy sitesi, hesap makinesi).\n3️⃣ BACKEND VEYA FRONTEND (2-3 ay): Frontend için React/Vue, Backend için Node.js veya Django öğren. Kendi seçtiğin alanda uzmanlaş.\n4️⃣ VERİTABANI: SQL (PostgreSQL) ile veri saklama ve sorgulama öğren.\n5️⃣ GİT & GITHUB: Kodunu yedekle ve dünya ile paylaş. İşe alımcılar GitHub profilini inceler.\n6️⃣ PROJELERİNİ YAY: GitHub'a koy, LinkedIn'e ekle ve freelance işler almaya çalış.\n\n💡 İngilizce teknik döküman okuyabilmek bu mesleğin en önemli %50'sidir.",
        links: [
            { text: "🎓 CS50: Harvard'ın Ücretsiz Bilgisayar Bilimi Kursu", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science" },
            { text: "💻 FreeCodeCamp (Sıfırdan Web Geliştirme, Tamamen Ücretsiz)", url: "https://www.freecodecamp.org/" },
            { text: "🇹🇷 Patika.dev (Türkçe Bootcamp ve Kurs Platformu)", url: "https://www.patika.dev/" },
            { text: "🗺️ Roadmap.sh (Frontend, Backend, DevOps Yol Haritaları)", url: "https://roadmap.sh/" },
            { text: "🐍 Python.org Başlangıç Rehberi (Resmi Dokümantasyon)", url: "https://wiki.python.org/moin/BeginnersGuide" },
            { text: "📹 The Odin Project (Kapsamlı Ücretsiz Web Kursu)", url: "https://www.theodinproject.com/" }
        ]
    },
    TASARIM: {
        fundamentals: "🗺️ Tasarım Başlangıç Paketi (Adım Adım):\n\n1️⃣ ARAÇ ÖĞREN (2-4 hafta): Figma'yı ücretsiz hesapla indir ve temel araçlarını öğren (frame, bileşenler, auto layout).\n2️⃣ TASARIM TEMELLERİ (1-2 ay): Renk teorisi, tipografi, kontrast oranları ve boşluk kullanımı (white space) çalış.\n3️⃣ UX ARAŞTIRMASI (1 ay): Kullanıcı görüşmeleri, wireframe ve kullanıcı akışı (user flow) kavramlarını öğren.\n4️⃣ UI PRATİĞİ: Sevdiğin uygulamaları Figma'da birebir kopyala (Recreation). Bu en hızlı öğrenme yöntemidir.\n5️⃣ PORTFOLYO: Behance veya Dribbble'a en az 3 proje yükle, her projenin sürecini anlat (process deck).\n6️⃣ TREND TAKİBİ: Laws of UX, Awwwards ve Muzli Design gibi kaynakları gündelik izle.\n\n💡 İyi bir tasarımcı aynı zamanda kullanıcı psikoloğudur.",
        links: [
            { text: "🎨 Figma Eğitimleri (Resmi YouTube Kanalı)", url: "https://www.youtube.com/c/Figmadesign" },
            { text: "🎓 Google UX Design Certificate (Coursera - Başlangıç)", url: "https://grow.google/certificates/ux-design/" },
            { text: "🧠 Laws of UX (Kullanıcı Davranış Psikolojisi)", url: "https://lawsofux.com/" },
            { text: "🌟 Awwwards (Dünyanın En İyi Tasarımlarından İlham Al)", url: "https://www.awwwards.com/" },
            { text: "📂 Behance (Portfolyo Yayınlama ve Sektörel İlham)", url: "https://www.behance.net/" },
            { text: "🇹🇷 Tasarım Okulu YouTube (Türkçe UI/UX İçerikleri)", url: "https://www.youtube.com/@tasarimokulu" }
        ]
    },
    ANALITIK: {
        fundamentals: "🗺️ Veri Analizi Başlangıç Paketi (Adım Adım):\n\n1️⃣ EXCEL / GOOGLE SHEETS (2-4 hafta): VLOOKUP, Pivot Tablo ve temel formülleri öğren. Hız kazandırır.\n2️⃣ TEMEL İSTATİSTİK (1 ay): Ortalama, medyan, standart sapma ve temel olasılık mantığını kavra.\n3️⃣ SQL (1-2 ay): Bir veritabanına veri çekebilmek ve filtreleyebilmek her analistin olmazmazı.\n4️⃣ PYTHON (2-3 ay): Pandas kütüphanesiyle veri temizleme, Matplotlib ile görselleştirme öğren.\n5️⃣ ARAÇ: Tableau Public (ücretsiz) veya Power BI ile görsel dashboard'lar oluşturmayı öğren.\n6️⃣ PROJELERİNİ YAY: Kaggle'daki gerçek veri setleriyle analizler yap ve LinkedIn'de paylaş.\n\n💡 Her kararın arkasında bir veri vardır. Seni diğerlerinden ayıran, o veriyi yorumlama yeteneğidir.",
        links: [
            { text: "📊 Kaggle Learn (Ücretsiz Veri Bilimi Mini Kursları)", url: "https://www.kaggle.com/learn" },
            { text: "🎓 Google Data Analytics Certificate (Coursera)", url: "https://grow.google/certificates/data-analytics/" },
            { text: "🐍 DataCamp (İnteraktif Python ve SQL Kursları)", url: "https://www.datacamp.com/" },
            { text: "🗄️ Mode Analytics SQL Tutorial (Pratik SQL Öğrenme)", url: "https://mode.com/sql-tutorial/" },
            { text: "📈 Tableau Public (Ücretsiz Görselleştirme Aracı)", url: "https://public.tableau.com/" },
            { text: "🇹🇷 Veri Bilimi Okulu (Türkçe İçerik ve Topluluk)", url: "https://www.veribilimiokulu.com/" }
        ]
    },
    LIDERLIK: {
        fundamentals: "🗺️ Liderlik & Yönetim Başlangıç Paketi (Adım Adım):\n\n1️⃣ KENDİNİ TANI (Sürekli): DISC, MBTI veya Enneagram kişilik testlerini çöz. Liderlik kendini bilmekle başlar.\n2️⃣ AGILE / SCRUM ÖĞRENİ (2-4 hafta): Scrum.org'daki ücretsiz materyalleri ve Scrum Guide'ı oku. PSM I sertifikası al.\n3️⃣ İLETİŞİM BECERİLERİ (Sürekli): TED Talks izle ve her fırsatta sunum yap. Toastmasters'a katıl.\n4️⃣ DUYGUSAL ZEKA (EQ) GELİŞTİR: Daniel Goleman'ın Emotional Intelligence kitabını oku.\n5️⃣ PROJE YÖNETİMİ ARAÇLARI: Jira, Notion veya Trello kullanmayı öğren.\n6️⃣ KİTAP & PODCAST: Good to Great (Collins), The Manager's Path (Fournier) ve Lex Fridman Podcast'i dinle.\n\n💡 Liderlik, insanlara ne yapacaklarını söylemek değil; onların en iyi halini ortaya çıkarmaktır.",
        links: [
            { text: "📋 Scrum.org (Ücretsiz Scrum Guide ve Eğitimler)", url: "https://www.scrum.org/resources/scrum-guide" },
            { text: "🎓 Google Project Management Certificate (Coursera)", url: "https://grow.google/certificates/project-management/" },
            { text: "🎤 TED Talks: Liderlik ve Motivasyon Seçkileri", url: "https://www.ted.com/topics/leadership" },
            { text: "📰 Harvard Business Review (Strateji ve Yönetim)", url: "https://hbr.org/" },
            { text: "🧠 MindTools (Pratikte Liderlik ve Ekip Yönetimi)", url: "https://www.mindtools.com/" },
            { text: "🇹🇷 Yönetim ve Organizasyon Derneği (Türkiye)", url: "https://www.yod.org.tr/" }
        ]
    }
};

// --- 5. SALARY DATA ---
const combinedSalaryData = {
    "A-YAZILIM": { tr: "25.000 - 100.000+ TL / ay", global: "$120k - $300k+ / yıl" },
    "A-TASARIM": { tr: "20.000 - 80.000 TL / ay", global: "$80k - $200k / yıl" },
    "A-ANALITIK": { tr: "22.000 - 90.000 TL / ay", global: "$90k - $220k / yıl" },
    "A-LIDERLIK": { tr: "30.000 - 150.000+ TL / ay", global: "$100k - $400k+ / yıl" },
    "B-YAZILIM": { tr: "30.000 - 120.000 TL / ay", global: "$110k - $250k / yıl" },
    "B-TASARIM": { tr: "15.000 - 60.000 TL / ay", global: "$70k - $150k / yıl" },
    "B-ANALITIK": { tr: "25.000 - 100.000 TL / ay", global: "$100k - $230k / yıl" },
    "B-LIDERLIK": { tr: "18.000 - 80.000 TL / ay", global: "$80k - $180k / yıl" },
    "C-YAZILIM": { tr: "10.000 - 70.000 TL / ay (freelance)", global: "$50k - $150k / yıl" },
    "C-TASARIM": { tr: "8.000 - 50.000 TL / ay", global: "$40k - $120k / yıl" },
    "C-ANALITIK": { tr: "15.000 - 60.000 TL / ay", global: "$60k - $150k / yıl" },
    "C-LIDERLIK": { tr: "12.000 - 55.000 TL / ay", global: "$55k - $130k / yıl" },
    "D-YAZILIM": { tr: "18.000 - 70.000 TL / ay", global: "$70k - $160k / yıl" },
    "D-TASARIM": { tr: "12.000 - 50.000 TL / ay", global: "$55k - $120k / yıl" },
    "D-ANALITIK": { tr: "14.000 - 55.000 TL / ay", global: "$50k - $110k / yıl" },
    "D-LIDERLIK": { tr: "12.000 - 50.000 TL / ay", global: "$45k - $110k / yıl" }
};
let aktifKullaniciId = null; // Testi çözen kullanıcının ID'sini tutacağız
// --- State ---
let currentMode = "NONE"; // "CHARACTER", "CAREER_MAP" or "COMBINED"
let currentQuestionIndex = 0;
let combinedPhase = "CHARACTER"; // Only for COMBINED mode

// Character State
let charScores = { A: 0, B: 0, C: 0, D: 0 };
let isCareerSubPhase = false;
let determinedArchetype = null;

// Career Map State
let mapScores = { YAZILIM: 0, TASARIM: 0, ANALITIK: 0, LIDERLIK: 0 };

// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const charResultScreen = document.getElementById('result-screen');
const careerMapResultScreen = document.getElementById('career-result-screen');
const combinedResultScreen = document.getElementById('combined-result-screen');

// Init Buttons
const startCharacterBtn = document.getElementById('start-character-btn');
const startCareerBtn = document.getElementById('start-career-btn');
const startCombinedBtn = document.getElementById('start-combined-btn');

// Restart Buttons
const restartBtn = document.getElementById('restart-btn');
const careerRestartBtn = document.getElementById('career-restart-btn');
const combinedRestartBtn = document.getElementById('combined-restart-btn');

const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

// Learning UI Elements
const toggleLearningBtn = document.getElementById('toggle-learning-btn');
const learningContent = document.getElementById('learning-content');
const learningFundamentals = document.getElementById('learning-fundamentals');
const learningLinks = document.getElementById('learning-links');

// --- Functions ---
function init() {
    // BURAYI DEĞİŞTİRDİK:
    startCharacterBtn.addEventListener('click', () => kullaniciKaydetVeBasla("CHARACTER"));
    startCareerBtn.addEventListener('click', () => kullaniciKaydetVeBasla("CAREER_MAP"));
    startCombinedBtn.addEventListener('click', () => kullaniciKaydetVeBasla("COMBINED"));

    restartBtn.addEventListener('click', () => switchScreen(charResultScreen, startScreen));
    careerRestartBtn.addEventListener('click', () => switchScreen(careerMapResultScreen, startScreen));
    combinedRestartBtn.addEventListener('click', () => switchScreen(combinedResultScreen, startScreen));
    // ... kodun geri kalanı aynı
}

// Learning Toggle Logic
if (toggleLearningBtn) {
    toggleLearningBtn.addEventListener('click', () => {
        if (learningContent.classList.contains('hidden')) {
            learningContent.classList.remove('hidden');
            toggleLearningBtn.textContent = "📖 Gizle";
        } else {
            learningContent.classList.add('hidden');
            toggleLearningBtn.textContent = "📚 Meslek Bilgisi & Eğitim Yol Haritası İster misin?";
        }
    });
}


function startQuizMode(mode) {
    currentMode = mode;
    currentQuestionIndex = 0;

    // Reset all tracking states
    charScores = { A: 0, B: 0, C: 0, D: 0 };
    mapScores = { YAZILIM: 0, TASARIM: 0, ANALITIK: 0, LIDERLIK: 0 };
    isCareerSubPhase = false;
    determinedArchetype = null;
    combinedPhase = "CHARACTER";

    // Reset learning UI
    if (learningContent && toggleLearningBtn) {
        learningContent.classList.add('hidden');
        toggleLearningBtn.textContent = "📚 Meslek Bilgisi & Eğitim Yol Haritası İster misin?";
    }

    switchScreen(startScreen, questionScreen);
    renderQuestion();
}

function renderQuestion() {
    optionsContainer.innerHTML = '';

    let currentQ;
    let totalQCount;
    let displayQIndex;

    if (currentMode === "CHARACTER") {
        if (!isCareerSubPhase) {
            currentQ = questions[currentQuestionIndex];
            totalQCount = questions.length + 1; // +1 is the final specific archetype career question
            displayQIndex = currentQuestionIndex + 1;
        } else {
            currentQ = characterCareerQuestions[determinedArchetype][0]; // we only have 1 career question subphase for this
            totalQCount = questions.length + 1;
            displayQIndex = questions.length + 1;
        }
    } else if (currentMode === "CAREER_MAP") {
        currentQ = careerMapQuestions[currentQuestionIndex];
        totalQCount = careerMapQuestions.length;
        displayQIndex = currentQuestionIndex + 1;
    } else if (currentMode === "COMBINED") {
        // COMBINED mode: 5 character + 10 career = 15 total
        const combinedCharLimit = 5;
        const combinedCareerLimit = 10;
        totalQCount = combinedCharLimit + combinedCareerLimit;

        if (combinedPhase === "CHARACTER") {
            currentQ = questions[currentQuestionIndex];
            displayQIndex = currentQuestionIndex + 1;
        } else {
            // combinedPhase === "CAREER"
            currentQ = careerMapQuestions[currentQuestionIndex];
            displayQIndex = combinedCharLimit + currentQuestionIndex + 1;
        }
    }

    // Update UI
    questionCounter.textContent = `Soru ${displayQIndex} / ${totalQCount}`;
    progressFill.style.width = `${(displayQIndex / totalQCount) * 100}%`;

    // Handle optional snippets (Code or Text blocks)
    let snippetHTML = "";
    if (currentQ.snippet) {
        if (currentQ.snippetType === "code") {
            // Very simple code formatting
            const formattedCode = currentQ.snippet.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
            snippetHTML = `<div class="snippet code-snippet" style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 12px; margin-bottom: 25px; text-align: left; font-family: monospace; color: #a5b4fc; box-shadow: inset 0 2px 10px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem;">${formattedCode}</div>`;
        } else if (currentQ.snippetType === "text") {
            snippetHTML = `<div class="snippet text-snippet" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; font-style: italic; margin-bottom: 25px; border-left: 4px solid var(--primary-color); font-size: 1.1rem;">${currentQ.snippet}</div>`;
        }
    }

    // Smooth text transition
    questionText.style.opacity = 0;

    // Check if there's an existing snippet container to fade out, or just fade everything
    setTimeout(() => {
        questionText.textContent = currentQ.question;

        // Remove old snippet if exists
        const oldSnippet = document.getElementById('question-snippet');
        if (oldSnippet) oldSnippet.remove();

        // Inject new snippet if needed
        if (snippetHTML) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = snippetHTML;
            const snippetEl = tempDiv.firstChild;
            snippetEl.id = 'question-snippet';
            // Insert after question text
            questionText.parentNode.insertBefore(snippetEl, questionText.nextSibling);
        }

        questionText.style.opacity = 1;
        questionText.style.transition = 'opacity 0.3s ease';
    }, 150);

    // Create buttons
    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';

        const span = document.createElement('span');
        span.textContent = opt.text;
        btn.appendChild(span);

        btn.style.opacity = 0;
        btn.style.transform = 'translateY(10px)';
        btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease, border-color 0.3s';

        btn.onclick = () => selectOption(opt.type);

        optionsContainer.appendChild(btn);

        setTimeout(() => {
            btn.style.opacity = 1;
            btn.style.transform = 'translateY(0)';
        }, 150 + (index * 100)); // Stagger delay
    });
}

function selectOption(type) {
    if (currentMode === "CHARACTER") {
        if (!isCareerSubPhase) {
            charScores[type]++;
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                triggerNextQuestionAnimation();
            } else {
                determinedArchetype = calculateLeadingType(charScores);
                isCareerSubPhase = true;
                currentQuestionIndex = 0; // go to subphase
                triggerNextQuestionAnimation();
            }
        } else {
            // Answered the subphase question
            const recommendedCareer = characterCareerResults[determinedArchetype][type];
            calculateCharacterFinalResult(recommendedCareer);
        }
    } else if (currentMode === "CAREER_MAP") {
        mapScores[type]++;
        if (currentQuestionIndex < careerMapQuestions.length - 1) {
            currentQuestionIndex++;
            triggerNextQuestionAnimation();
        } else {
            calculateCareerMapResult();
        }
    } else if (currentMode === "COMBINED") {
        if (combinedPhase === "CHARACTER") {
            charScores[type]++;
            // COMBINED uses only first 5 character questions
            if (currentQuestionIndex < 4) { // 4 = index of 5th question
                currentQuestionIndex++;
                triggerNextQuestionAnimation();
            } else {
                // Bugfix: Capture character result logic here correctly.
                determinedArchetype = calculateLeadingType(charScores);
                combinedPhase = "CAREER"; // transition!
                currentQuestionIndex = 0;
                triggerNextQuestionAnimation();
            }
        } else {
            // CAREER Phase: COMBINED uses only first 10 career questions
            mapScores[type]++;
            if (currentQuestionIndex < 9) { // 9 = index of 10th question
                currentQuestionIndex++;
                triggerNextQuestionAnimation();
            } else {
                calculateCombinedResult();
            }
        }
    }
}

function triggerNextQuestionAnimation() {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => opt.style.pointerEvents = 'none');
    setTimeout(renderQuestion, 300);
}

function calculateLeadingType(scoreObj) {
    let highestType = '';
    let highestScore = -1;

    for (const [type, score] of Object.entries(scoreObj)) {
        if (score > highestScore) {
            highestScore = score;
            highestType = type;
        }
    }
    return highestType;
}

// --- CHARACTER QUIZ RESULT ---
function calculateCharacterFinalResult(recommendedCareer) {
    const archData = archetypes[determinedArchetype];

    document.getElementById('result-icon').textContent = archData.icon;
    document.getElementById('result-title').textContent = archData.title;

    const finalDesc = `${archData.description} \n\n🎯 İdeal Meslek Rotan: ${recommendedCareer}`;
    document.getElementById('result-desc').innerHTML = finalDesc.replace(/\n\n/g, '<br><br><strong style="color:var(--text-main);">').replace(/Rotan:/g, 'Rotan:</strong>');

    document.getElementById('trait-1').textContent = archData.traits[0];
    document.getElementById('trait-2').textContent = archData.traits[1];
    document.getElementById('trait-3').textContent = archData.traits[2];

    switchScreen(questionScreen, charResultScreen);
}

// --- CAREER MAP RESULT ---
function calculateCareerMapResult() {
    // 10 answers in total
    const totalQuestions = careerMapQuestions.length;

    // Calculate Percentages
    const yazilimPct = (mapScores.YAZILIM / totalQuestions) * 100;
    const tasarimPct = (mapScores.TASARIM / totalQuestions) * 100;
    const analitikPct = (mapScores.ANALITIK / totalQuestions) * 100;
    const liderlikPct = (mapScores.LIDERLIK / totalQuestions) * 100;

    const leadingTrait = calculateLeadingType(mapScores);

    document.getElementById('career-title').textContent = careerTitleMapping[leadingTrait];
    document.getElementById('career-desc').textContent = "Verdiğin cevaplara göre kişisel gelişim haritan şu şekilde şekillendi:";

    const skillsContainer = document.querySelector('#career-result-screen .skills-container');
    skillsContainer.innerHTML = ''; // clear

    const skills = [
        { name: "Yazılım & IT", pct: yazilimPct, class: "fill-yazilim" },
        { name: "Tasarım & Yaratıcılık", pct: tasarimPct, class: "fill-tasarim" },
        { name: "Veri & Analitik", pct: analitikPct, class: "fill-analitik" },
        { name: "Liderlik & Yönetim", pct: liderlikPct, class: "fill-liderlik" }
    ];

    // Sort by highest percentage
    skills.sort((a, b) => b.pct - a.pct);

    skills.forEach((skill, index) => {
        const row = document.createElement('div');
        row.className = 'skill-row';
        row.innerHTML = `
            <div class="skill-header">
                <span>${skill.name}</span>
                <span class="skill-percent">${skill.pct}%</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-fill ${skill.class}" style="width: 0%;"></div>
            </div>
        `;
        skillsContainer.appendChild(row);

        // Animate fill after a tiny delay
        setTimeout(() => {
            const fillParam = row.querySelector('.skill-fill');
            fillParam.style.width = `${skill.pct}%`;
        }, 100 + (index * 200));
    });

    switchScreen(questionScreen, careerMapResultScreen);
}

// --- COMBINED RESULT ---
function calculateCombinedResult() {
    let leadingTrait = calculateLeadingType(mapScores);
    if (!leadingTrait) leadingTrait = "YAZILIM"; // Fallback if scores are empty

    // Fallback if archetype was lost due to state issues
    if (!determinedArchetype || !archetypes[determinedArchetype]) {
        determinedArchetype = calculateLeadingType(charScores);
        if (!determinedArchetype || !archetypes[determinedArchetype]) {
            determinedArchetype = "A"; // Absolute fallback
        }
    }

    const archData = archetypes[determinedArchetype];
    const comboKey = `${determinedArchetype}-${leadingTrait}`; // Ex: "A-YAZILIM"
    const finalJobTitle = combinedProfessionMapping[comboKey] || "Teknoloji Gezgini";
    const finalJobDesc = combinedProfessionDescriptions[comboKey] || "Harika yeteneklerin var, kendi yolunu çizmelisin.";

    // Populate UI Safely
    const titleEl = document.getElementById('combined-title');
    if (titleEl) titleEl.textContent = finalJobTitle;

    const descEl = document.getElementById('combined-desc');
    if (descEl) descEl.textContent = finalJobDesc;

    const archEl = document.getElementById('combined-archetype');
    if (archEl) archEl.textContent = archData.title;

    const traitEl = document.getElementById('combined-trait');
    if (traitEl) traitEl.textContent = careerTitleMapping[leadingTrait] || leadingTrait;

    // Show Salary
    const salaryData = combinedSalaryData[comboKey];
    const salaryEl = document.getElementById('combined-salary');
    if (salaryEl && salaryData) {
        salaryEl.innerHTML = `
            <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                <span>🇾🇳 Türkiye: <strong>${salaryData.tr}</strong></span>
                <span>  🌍 Dünya: <strong>${salaryData.global}</strong></span>
            </div>
        `;
    }

    // Populate Roadmap Elements
    const roadmap = roadmapData[leadingTrait];
    const fundamentalsEl = document.getElementById('learning-fundamentals');
    const linksEl = document.getElementById('learning-links');

    if (roadmap && fundamentalsEl && linksEl) {
        fundamentalsEl.textContent = roadmap.fundamentals;

        linksEl.innerHTML = '';
        roadmap.links.forEach(linkObj => {
            const li = document.createElement('li');
            li.innerHTML = `🔗 <a href="${linkObj.url}" target="_blank" style="color: #a5b4fc; text-decoration: none; border-bottom: 1px dashed rgba(165,180,252,0.4); transition: color 0.2s;">${linkObj.text}</a>`;
            linksEl.appendChild(li);
        });
    }

    // Attempt transition safely
    const qScreen = document.getElementById('question-screen');
    const cResultScreen = document.getElementById('combined-result-screen');
    if (qScreen && cResultScreen) {
        switchScreen(qScreen, cResultScreen);
    }
}


function switchScreen(fromScreen, toScreen) {
    fromScreen.style.opacity = 0;
    fromScreen.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        fromScreen.classList.remove('active');
        fromScreen.classList.add('hidden');
        fromScreen.style.transform = 'translateY(20px)';

        toScreen.classList.remove('hidden');
        toScreen.classList.add('active');

        setTimeout(() => {
            toScreen.style.opacity = 1;
            toScreen.style.transform = 'translateY(0)';
        }, 50);
        function kaydet(soru, cevap) {

            fetch("http://localhost:3000/kaydet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    soru: soru,
                    cevap: cevap
                })
            });

        }
    }, 400);
}
async function kullaniciKaydetVeBasla(mode) {
    const isimInput = document.getElementById('kullanici-isim');
    const isim = isimInput.value.trim();

    // İsim boşsa uyarı ver ve testi başlatma
    if (!isim) {
        alert("Lütfen başlamadan önce adınızı girin! 😊");
        return;
    }

    try {
        // Sunucuya ismi gönderiyoruz
        const response = await fetch("http://localhost:3000/api/kullanici-olustur", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isim: isim })
        });

        const data = await response.json();

        // Veritabanının oluşturduğu ID'yi alıp hafızada tutuyoruz
        aktifKullaniciId = data.id;
        console.log("Kullanıcı başarıyla oluşturuldu! ID:", aktifKullaniciId);

        // Kayıt başarılıysa testi başlat
        startQuizMode(mode);

    } catch (error) {
        console.error("Kullanıcı oluşturulurken hata yaşandı:", error);
        alert("Bağlantı hatası! Lütfen sunucunun çalıştığından emin olun.");
    }
}
// Event Listeners
document.addEventListener('DOMContentLoaded', init);
