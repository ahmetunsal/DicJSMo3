module.exports = async (message) => {
var random = [
    "Oha bu çocuk Türk müüüüüüüüüüüü?",
    "dur beynimi çıkarayım, eşit şartlarda konuşalım",
    "gitsen tek kaybım mal kaybı olur hahaha",
    "bunun adı kalp güzelim. Tersten okuduğun gibi plak değil ki sürekli sende takılı kalsın.",
    "kafamı yaşasan kafana sıkarsın",
    "sanırım seni getiren leyleğin bıraktığı izdi, kuş beyinli olman.",
    "senin için savaşırdım ama verimsiz toprakları feth etmeye gerek yok",
    "birbirimizi çift görmem için kaç duble daha içmeliyim?",
    "azrail bile ayağıma geliyor ne bu tripler?",
    "Buralarda yeniyim de kalbinin yolunu tarif eder misin?",
    "Nasıl yani şimdi sen gerçek misin?",
    "Bunca zaman neredeydin ?",
    "seni seviyorum.",
    "Allah seni yaratmış fakat takip etmiyor sanırım, bu tip ne?",
    "sarılalım mı?",
    "benimle evlenir misin?",
    "azıcık beynini kullan diyeceğim fakat seni zor durumda bırakmak istemiyorum.",
    "akıllara zarar bi mükemmelliğin var",
    "attan indiysek leopar falan gelmiştir ben anlamam eşekten",
    "dedikodu yapalım mı?",
    "iyi ki varsın 💕",
    "şu üstteki aptik ne anlatıyor ya?",
    "o kadar haklısın ki... seni öpesim var",
    "öpşuelimi? çabuk!",
    "yavrum hepsi senin mi?",
    "bi alo de gelmezsem gençliğim solsun.",
    "çok şişkosun.",
    "sevgilim var yazma?",
    "zenginsen evlenelim mi?",
    "halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
    "o kadar çok meslek türü varken neden şerefsizlik tatlım?",
    "bu güne aynayı öperek başladım",
    "çok bereketli topraklarımız yok mu? her türlü şerefsiz yetişiyor",
    "taş gibisin!",
    "kalitesizliğinin kokusu geldi...",
    "Şey gözlerin çok güzelmiş tanışalım mı ?",
    "Kalbinin yolunu gösterir misin...",
    "Corona olsan bile sana sarılırdım",
    "Oha sen gerçek misin ?",
    "kahveyi sütsüz seni tereddütsüz seviyorum",
    "senin hava attığın yerde benim rüzgarım esiyor",
    "çok güzel bi tablo gördüm tam alacaktım ama aynaymış...",
    "canım haddin hariç her şeyi biliyorsun",
    "havalar alev gibii, tatile serin bi yerlere gitsene mesela morg?",
    "tavla oynayalım ama sen beni tavla",
    "hava sıcak değil aşkından yanıyorum",
    "konum atta belamızı bulalım bebeğim",
    "üşüdüysen sana abayı yakayım mı?",
    "gel biraz otur yanıma ölünce gidersin",
    "sütüm yarım yağlı mutluluğum sana bağlı",
    "eğer ahtapot olsaydım üç kalbimi de sana verirdim",
    "salağa yatarken uyuya falan mı kaldın?",
    "meleksin ama canımı alıyorsun yoksa Azrailim misin?",
    "ben varya fay hattı olsam kesin daha az kırılırdım",
    "iban at hayallerimi yollayayım harcarsın",
    "ankarada deniz sende karakter",
    "sana hayatım diyorum çünkü o kadar kötüsün",
    "görüşelim mi? mahşer yeri uygun mu?",
    "eşekten yarış atı olmaz ama sen genede koş spor yaparsın",
    "Anlatsana biraz neden bu kadar mükemmelsin?",
    "Nasılsın diye sorma bebeğim, sana göreyim kıpss",
    "Kakaolu sütsün seni sevmeyen ölsün",
    "Ya sen hep böyle hoşuma mı gideceksin ?",
    "Çikolatalı keksin bu alemde teksin",
    "8 milyar gülüş varken seninki favorim",
    "dalin gibi kokuyorsun",
    "seni her gün görenlerin şansından istiyorum",
    "en iyisine layıksın yani bana hıh",
    "ateşimin çıkma sebebi corona değil, sensin",
    "yemeğimi yedim şimdi seni yeme vakti",
    "beni biraz takar mısın?",
    "aklın başına gelir ama ben sana gelmem",
    "sen beni birde sevgilinken gör",
    "naber lan karakter kanseri",
    "soğuk davranacaksan üzerime bir şey alayım?",
    "sana beyin alacam",
    "Allah belanı vermiyor artık ben bir şey yapacağım",
    "artık benimsin",
    "o kadar pubg oynadım böyle vurulmadım",
    "canın yandı mı? cenneten düşerken?",
    "seni mumla ararken elektrikler geldi",
    "burnunda sümük var",
    "Suyun içinde klorür senin kalbinde bir ömür...",
    "Çok tatlı olmayı bırak artık... Kalbim başa çıkamıyor !",
    "Kalbini dinle dediklerinde seni dinleyesim geliyor",
    "Polisi arıyorum çünkü bu kadar tatlı olman yasadışı !",
    "Ölüm ani dünya fani bi kere sevsen nolur ki yani ?",
    "Bana yüzünü dönme gece oluyor sanıyorum.",
    "Güneş aya ben sana tutuldum.",
    "Sana gemi alalım dümende bir numarasın.",
    "AÇILIN DÜNYANIN 8.HARİKASI GELDİ !",
    "Ben küçücük bi botum ama sana kocaman sarılırım",
    "Kafam çok güzel çünkü içinde sen varsın.",
    "Alnın güzelmiş yazısı olabilir miyim ?",
    "Gülüşün şimşek içermiyiz birer milkşeyk ?"
  ]
  if (message.channel.id == "854966613308735511") {
    var randomlaananaısikerim =
      random[Math.floor(Math.random() * random.length)];
    let no = Math.floor(Math.random() * 1)
    if (no == 1) {
      message.channel.send("<@" + message.author.id + "> " + randomlaananaısikerim + " ");
    }}

module.exports.conf = {
    name: "message",
  }};