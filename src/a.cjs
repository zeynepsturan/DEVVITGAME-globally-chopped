const fs = require('fs');
const path = require('path');
const https = require('https');


// --- İNDİRİLECEK YENİ ALBÜMLER (370 - 401) ---
const NEW_ALBUMS = [
  // --- LIL YACHTY, YOUNG NUDY, KODAK BLACK ---
  { id: 370, artist: "Lil Yachty", album: "Lil Boat", fileName: "lilyachty_lilboat" },
  { id: 371, artist: "Lil Yachty", album: "Lil Boat 2", fileName: "lilyachty_lilboat2" },
  { id: 372, artist: "Lil Yachty", album: "Lil Boat 3", fileName: "lilyachty_lilboat3" },
  { id: 373, artist: "Lil Yachty", album: "Lil Boat 3.5", fileName: "lilyachty_lilboat35" },
  { id: 374, artist: "James Blake, Lil Yachty", album: "Bad Cameo", fileName: "jamesblake_badcameo" },
  { id: 375, artist: "Young Nudy", album: "PARADISE", fileName: "youngnudy_paradise" },
  { id: 376, artist: "Young Nudy", album: "Gumbo", fileName: "youngnudy_gumbo" },
  { id: 377, artist: "Kodak Black", album: "Gift For The Streets", fileName: "kodak_giftforthestreets" },
  { id: 378, artist: "Kodak Black", album: "Just Getting Started", fileName: "kodak_justgettingstarted" },
  { id: 379, artist: "Kodak Black", album: "Painting Pictures", fileName: "kodak_paintingpictures" },
  { id: 380, artist: "Kodak Black", album: "Lil Big Pac", fileName: "kodak_lilbigpac" },
  { id: 381, artist: "6ix9ine", album: "TattleTales", fileName: "6ix9ine_tattletales" },

  // --- TRIPPIE REDD, LIL PUMP, TECCA, MUSTARD ---
  { id: 382, artist: "Trippie Redd", album: "A Love Letter To You 4", fileName: "trippie_allty4" },
  { id: 383, artist: "Trippie Redd", album: "LIFE'S A TRIP", fileName: "trippie_lifesatrip" },
  { id: 384, artist: "Trippie Redd", album: "Trip At Knight", fileName: "trippie_tripatknight" },
  { id: 385, artist: "Lil Pump", album: "Lil Pump", fileName: "lilpump_lilpump" },
  { id: 386, artist: "Lil Tecca", album: "We Love You Tecca 2", fileName: "liltecca_wlyt2" },
  { id: 387, artist: "Mustard", album: "Faith Of A Mustard Seed", fileName: "mustard_faith" },
  { id: 388, artist: "EsDeeKid", album: "Rebel", fileName: "esdeekid_rebel" },
  { id: 389, artist: "Immortal Technique", album: "Revolutionary Vol. 2", fileName: "immortal_vol2" },

  // --- IMMORTAL TECH, N.W.A, DJ SHADOW, ICE CUBE ---
  { id: 390, artist: "Immortal Technique", album: "Revolutionary Vol. 1", fileName: "immortal_vol1" },
  { id: 391, artist: "N.W.A.", album: "Straight Outta Compton", fileName: "nwa_straightoutta" },
  { id: 392, artist: "N.W.A.", album: "Efil4zaggin", fileName: "nwa_efil4zaggin" },
  { id: 393, artist: "DJ Shadow", album: "Endtroducing", fileName: "djshadow_endtroducing" },
  { id: 394, artist: "Ice Cube", album: "The Predator", fileName: "icecube_predator" },
  { id: 395, artist: "Tory Lanez", album: "Alone at Prom", fileName: "torylanez_aloneatprom" },

  // --- KODAK, MOS DEF, CHIEF KEEF, DEATH GRIPS, ASAP MOB ---
  { id: 396, artist: "Kodak Black", album: "Project Baby 2 All Grown Up", fileName: "kodak_projectbaby2" },
  { id: 397, artist: "Mos Def", album: "Black On Both Sides", fileName: "mosdef_blackonbothsides" },
  { id: 398, artist: "Chief Keef", album: "Dedication", fileName: "chiefkeef_dedication" },
  { id: 399, artist: "Death Grips", album: "The Money Store", fileName: "deathgrips_moneystore" },
  { id: 400, artist: "ASAP Mob", album: "Cozy Tapes Vol 2", fileName: "asapmob_cozytapes2" }
];

const COVERS_DIR = './covers';

// Klasör yoksa oluştur
if (!fs.existsSync(COVERS_DIR)) {
  fs.mkdirSync(COVERS_DIR);
}

// iTunes API'den kapak bulma ve indirme
async function downloadCover(albumData) {
  const searchTerm = `${albumData.artist} ${albumData.album}`;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music&entity=album&limit=1`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.resultCount > 0) {
            // 100x100 resim URL'ini 600x600 yap
            const artworkUrl = json.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
            const filePath = path.join(COVERS_DIR, `${albumData.fileName}.jpg`);

            // Resmi indir
            const file = fs.createWriteStream(filePath);
            https.get(artworkUrl, (imgRes) => {
              imgRes.pipe(file);
              file.on('finish', () => {
                file.close();
                console.log(`✅ İNDİRİLDİ: ${albumData.fileName}.jpg`);
                resolve();
              });
            }).on('error', (err) => {
              console.log(`❌ HATA (İndirme): ${albumData.artist} - ${albumData.album}`);
              resolve();
            });
          } else {
            console.log(`❌ BULUNAMADI: ${albumData.artist} - ${albumData.album}`);
            resolve();
          }
        } catch (e) {
          console.log(`❌ HATA (API): ${albumData.artist} - ${albumData.album}`);
          resolve();
        }
      });
    }).on('error', (e) => {
      console.log(`❌ HATA (Bağlantı): ${e.message}`);
      resolve();
    });
  });
}

// Sırayla indir (Rate limit yememek için)
async function startDownload() {
  console.log(`Toplam ${NEW_ALBUMS.length} albüm indirilecek...\n`);
  for (const album of NEW_ALBUMS) {
    await downloadCover(album);
    // Her indirme arasında 500ms bekle
    await new Promise(r => setTimeout(r, 500));
  }
  console.log("\n--- İŞLEM TAMAMLANDI ---");
}

startDownload();
