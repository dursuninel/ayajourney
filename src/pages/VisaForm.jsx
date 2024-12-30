import React from "react";
import VisaStepForm from "../components/forms/VisaStepForm";
export default function VisaForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>Birleşik Krallık Vize Başvuru Formu</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="page-description">
            Birleşik Krallık vize başvurularında istenen formu dikkatlice
            doldurunuz. <br />
            Lütfen bilgilerinizde Türkçe karakterler kullanmayınız.
          </p>
        </div>
      </section>

      {/* 
AYA Journey ile Adım Adım İngiltere
Yurt dışı seyahat planı yapan pek çok kişi için İngiltere, eskiye dayanan tarihi, modern yapıları ve turistik yerleri ile popüler bir durak olmaya devam ediyor. Ancak, İngiltere'ye seyahat etmek isteyen Türk vatandaşlarının ilk olarak vize alması gerekiyor. Gelin birlikte İngiltere vizesi başvurusunda izlemeniz gereken adımları detaylı bir şekilde inceleyelim.

1. İhtiyacınıza uygun doğru vize türü
İngiltere'ye gidiş amacınıza göre turistik vize, skilled worker vize, uzun dönem öğrenci vizesi gibi birçok farklı vize türleri bulunmaktadır ancak bunlar arasında en çok tercih edilen vize türü turistik vize türüdür. İster tatil amaçlı olsun ister aile arkadaş ziyareti olsun, isterseniz işinizle alakalı fuar, toplantı veya bir etkinlik olsun, hatta kısa süreli eğitim programları için bile doğru vize kategorisi turistik vize türüdür. Skilled worker vizesi ise İngiltere’de çalışmak isteyen nitelikli işçilere yönelik bir vize türüyken, 6 aydan fazla bir sürede eğitim almayı hedefleyen kişiler için ise uzun dönem öğrenci vizesi uygun olan vize türüdür. Bu örneklendirdiğimiz vize türleri seyahat amacınıza uymuyorsa endişelenmeyin, İngiltere daha birçok farklı vize türü seçeneği sunuyor. Detaylar için alo AYA Journey!
2. Online Vize Başvuru Formunu birlikte dolduralım
İngiltere vize başvuruları konsolosluğun resmi web sitesi üzerinden yapılmaktadır. Bu noktada AYA Journey uzman vize danışmanları imdadınıza koşuyor.
1.	Başvuru formunuzu online bir şekilde detaylıca dolduruyoruz.
2.	Ardından ödeme işlemini gerçekleştiriyoruz. İngiltere vizesi için başvuru ücreti vize türüne göre değişiyor; 6 aylık,	2 yıllık, 5 yıllık ve 10 yıllık olarak vize talebinde bulunabiliyorsunuz.

3. Gerekli Belgeleri Hazırlayın, biz de kontrol edelim
Eksiksiz ve doğru belge teslimi, vize sürecinin olumlu ilerlemesi için kritik öneme sahiptir. Genel olarak istenen temel belgeler şunlardır:
•	Pasaportunuzun ön yüzünün taratılmış hali
•	Eski pasaport veya pasaportunuzun ön yüzü dahil tüm vize ve damgaları içeren sayfaların taranmış hali
•	Biyometrik Fotoğraf: Son 6 ay içinde çektirilmiş olması beklenir
•	Maddi Durumu Gösteren Belgeler: Banka hesap dökümü, maaş bordrosu, tapu ya da ruhsat
•	Şirket Evrakları: İzin/ görev yazısı gibi belgeler, şirkete ait şirketin faaliyetini kanıtlayan belgeler.
Bu belgelere ek niyet mektubu, sponsorluk mektubu gibi ekstra belgeler de gerekmektedir. Bu belgeler tarafımızca hazırlanır ve sizden gelecek belgeler ile birlikte online sistemde yüklenir.


4. Randevu Alın ve Biyometrik Verilerinizi Verin
Online başvuru işlemi tamamlandıktan sonra, Vize Başvuru Merkezlerinden (Kasım 2024 tarihi itibariyle VFS Global İngiltere’nin Vize merkezi olmuştur) randevu alınması gerekmektedir. Bu randevu sırasında parmak iziniz alınır ve vizeye basılmak üzere biyometrik fotoğrafınız çekilir.

5. Vize Sonucunu Bekleyin
Tüm bu aşamalardan sonra vize sonucunun açıklanma süreci ortalama 15 iş günü sürebilmektedir. Ancak, bu süre konsolosluğun yoğunluğuna bağlı olarak uzayabilir veya kısalabilir. Vizenizin sonuçlanmadığı malinize gelen bildirim ile anlaşılır ve eğer mailin ekinde bir mektup yoksa tebrikler, vizeniz onaylanmış!
Ekspres Vize Hizmeti: Seyahat tarihi yaklaşanlar için ek ücret ödeyerek sonucun daha hızlı açıklanmasını talep edebildiğiniz bir hizmet de sağlamaktadır.
Pasaportum Bende Kalsın Seçeneği: Normal şartlarda başvurunuzu yaparken pasaportu teslim etmeniz beklenir ancak bu esnada katılmanız gereken başka bir seyahat var ise ve pasaportunuzu teslim edebilecek bir durumda değilseniz yine ek ücret ödeyerek pasaportunuzun sizde kalmasını sağlayabilirsiniz. Vize sonucu maili tarafınıza ulaştığı takdirde pasaportunuzu aracı vize merkezine (VFS Global) iletip birkaç gün içinde vizeniz basılmış şekilde geri teslim alabilirsiniz. 

	İngiltere vize süreci, doğru bir başvuru ile sorunsuz geçecek bir süreçtir. Evraklarınızın doğru hazırlanması, başvuru formuyla evraklarınız arasında bir çelişki olmaması, istenilen tüm bilgilerin eksiksiz verilmesi sizi güzel sonuca yönlendirecektir. Bu noktada doğru başvuru ile güzel sonuçlara ulaşmanız için AYA Journey ailesi olarak biz buradayız, her zaman bekleriz. 
Unutmayın, hayalinizdeki İngiltere seyahati sadece bir vize uzaklığında!
Hadi Topla Bavulları!

*/}

      <section>
        <div className="container">
          <VisaStepForm />
        </div>
        <div className="container">
          <h2>AYA Journey ile Adım Adım İngiltere</h2>
          <p>
            Yurt dışı seyahat planı yapan pek çok kişi için İngiltere, eskiye
            dayanan tarihi, modern yapıları ve turistik yerleri ile popüler bir
            durak olmaya devam ediyor. Ancak, İngiltere'ye seyahat etmek isteyen
            Türk vatandaşlarının ilk olarak vize alması gerekiyor. Gelin
            birlikte İngiltere vizesi başvurusunda izlemeniz gereken adımları
            detaylı bir şekilde inceleyelim.
          </p>
          <h3>1. İhtiyacınıza uygun doğru vize türü</h3>
          <p>
            İngiltere'ye gidiş amacınıza göre turistik vize, skilled worker
            vize, uzun dönem öğrenci vizesi gibi birçok farklı vize türleri
            bulunmaktadır ancak bunlar arasında en çok tercih edilen vize türü
            turistik vize türüdür. İster tatil amaçlı olsun ister aile arkadaş
            ziyareti olsun, isterseniz işinizle alakalı fuar, toplantı veya bir
            etkinlik olsun, hatta kısa süreli eğitim programları için bile doğru
            vize kategorisi turistik vize türüdür. Skilled worker vizesi ise
            İngiltere’de çalışmak isteyen nitelikli işçilere yönelik bir vize
            türüyken, 6 aydan fazla bir sürede eğitim almayı hedefleyen kişiler
            için ise uzun dönem öğrenci vizesi uygun olan vize türüdür. Bu
            örneklendirdiğimiz vize türleri seyahat amacınıza uymuyorsa
            endişelenmeyin, İngiltere daha birçok farklı vize türü seçeneği
            sunuyor. Detaylar için alo AYA Journey!
          </p>
          <h3>2. Online Vize Başvuru Formunu birlikte dolduralım</h3>
          <p>
            İngiltere vize başvuruları konsolosluğun resmi web sitesi üzerinden
            yapılmaktadır. Bu noktada AYA Journey uzman vize danışmanları
            imdadınıza koşuyor.
            <ol>
              <li>
                Başvuru formunuzu online bir şekilde detaylıca dolduruyoruz.
              </li>
              <li>
                Ardından ödeme işlemini gerçekleştiriyoruz. İngiltere vizesi
                için başvuru ücreti vize türüne göre değişiyor; 6 aylık, 2
                yıllık, 5 yıllık ve 10 yıllık olarak vize talebinde
                bulunabiliyorsunuz.
              </li>
            </ol>
          </p>
          <h3>3. Gerekli Belgeleri Hazırlayın, biz de kontrol edelim</h3>
          <p>
            Eksiksiz ve doğru belge teslimi, vize sürecinin olumlu ilerlemesi
            için kritik öneme sahiptir. Genel olarak istenen temel belgeler
            şunlardır:
            <ul>
              <li>Pasaportunuzun ön yüzünün taratılmış hali</li>
              <li>
                Eski pasaport veya pasaportunuzun ön yüzü dahil tüm vize ve
                damgaları içeren sayfaların taranmış hali
              </li>
              <li>
                Biyometrik Fotoğraf: Son 6 ay içinde çektirilmiş olması beklenir
              </li>
              <li>
                Maddi Durumu Gösteren Belgeler: Banka hesap dökümü, maaş
                bordrosu, tapu ya da ruhsat
              </li>
              <li>
                Şirket Evrakları: İzin/ görev yazısı gibi belgeler, şirkete ait
                şirketin faaliyetini kanıtlayan belgeler.
              </li>
            </ul>
            Bu belgelere ek niyet mektubu, sponsorluk mektubu gibi ekstra
            belgeler de gerekmektedir. Bu belgeler tarafımızca hazırlanır ve
            sizden gelecek belgeler ile birlikte online sistemde yüklenir.
          </p>
          <h3>4. Randevu Alın ve Biyometrik Verilerinizi Verin</h3>
          <p>
            Online başvuru işlemi tamamlandıktan sonra, Vize Başvuru
            Merkezlerinden (Kasım 2024 tarihi itibariyle VFS Global
            İngiltere’nin Vize merkezi olmuştur) randevu alınması gerekmektedir.
            Bu randevu sırasında parmak iziniz alınır ve vizeye basılmak üzere
            biyometrik fotoğrafınız çekilir.
          </p>
          <h3>5. Vize Sonucunu Bekleyin</h3>
          <p>
            Tüm bu aşamalardan sonra vize sonucunun açıklanma süreci ortalama 15
            iş günü sürebilmektedir. Ancak, bu süre konsolosluğun yoğunluğuna
            bağlı olarak uzayabilir veya kısalabilir. Vizenizin sonuçlanmadığı
            malinize gelen bildirim ile anlaşılır ve eğer mailin ekinde bir
            mektup yoksa tebrikler, vizeniz onaylanmış!
          </p>
          <h3>Ekspres Vize Hizmeti</h3>
          <p>
            Seyahat tarihi yaklaşanlar için ek ücret ödeyerek sonucun daha hızlı
            açıklanmasını talep edebildiğiniz bir hizmet de sağlamaktadır.
          </p>
          <h3>Pasaportum Bende Kalsın Seçeneği</h3>
          <p>
            Normal şartlarda başvurunuzu yaparken pasaportu teslim etmeniz
            beklenir ancak bu esnada katılmanız gereken başka bir seyahat var
            ise ve pasaportunuzu teslim edebilecek bir durumda değilseniz yine
            ek ücret ödeyerek pasaportunuzun sizde kalmasını sağlayabilirsiniz.
            Vize sonucu maili tarafınıza ulaştığı takdirde pasaportunuzu aracı
            vize merkezine (VFS Global) iletip birkaç gün içinde vizeniz
            basılmış şekilde geri teslim alabilirsiniz.
          </p>
          <span>
            İngiltere vize süreci, doğru bir başvuru ile sorunsuz geçecek bir
            süreçtir. Evraklarınızın doğru hazırlanması, başvuru formuyla
            evraklarınız arasında bir çelişki olmaması, istenilen tüm bilgilerin
            eksiksiz verilmesi sizi güzel sonuca yönlendirecektir. Bu noktada
            doğru başvuru ile güzel sonuçlara ulaşmanız için AYA Journey ailesi
            olarak biz buradayız, her zaman bekleriz.
          </span>
          <p>
            Unutmayın, hayalinizdeki İngiltere seyahati sadece bir vize
            uzaklığında!
          </p>
          <p>
            <strong>Hadi Topla Bavulları!</strong>
          </p>
        </div>
      </section>
    </>
  );
}
