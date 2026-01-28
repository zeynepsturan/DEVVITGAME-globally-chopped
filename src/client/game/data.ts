// src/client/game/data.ts

// 1. COVER IMAGE IMPORTING
const coverImages = import.meta.glob<{ default: string }>('../../assets/covers/*', { eager: true });

export const getCoverUrl = (filename: string) => {
  // try .jpg first
  let path = `../../assets/covers/${filename}.jpg`;
  let module = coverImages[path];
  
  // if not found, try .png
  if (!module) {
    path = `../../assets/covers/${filename}.png`;
    module = coverImages[path];
  }
  
  // return url or null
  return module ? (module as any).default : null;
};

// album data type definition
export interface Album {
  id: number;
  artist: string;
  album: string;
  fileName: string;
}

export const ALBUMS: Album[] = [
  { id: 0, artist: "Eminem", album: "The Slim Shady LP", fileName: "eminem_sslp" },
  { id: 1, artist: "Eminem", album: "Music To Be Murdered By", fileName: "eminem_mtbmb" },
  { id: 2, artist: "Eminem", album: "Music To Be Murdered By - Side B", fileName: "eminem_mtbmbsideb" },
  { id: 3, artist: "Eminem", album: "Kamikaze", fileName: "eminem_kamikaze" },
  { id: 4, artist: "Eminem, Beyoncé", album: "Revival", fileName: "eminem_revival" },
  { id: 5, artist: "Eminem", album: "The Marshall Mathers LP 2", fileName: "eminem_mmlp2" },
  { id: 6, artist: "Eminem", album: "Recovery", fileName: "eminem_recovery" },
  { id: 7, artist: "Eminem", album: "Relapse", fileName: "eminem_relapse" },
  { id: 8, artist: "Eminem", album: "Encore (Deluxe Version)", fileName: "eminem_encore" },
  { id: 9, artist: "Eminem", album: "The Eminem Show", fileName: "eminem_tes" },
  { id: 10, artist: "Eminem", album: "The Marshall Mathers LP", fileName: "eminem_mmlp" },

  // --- DR. DRE, 50 CENT, JAY-Z (11-22) ---
  { id: 11, artist: "Dr. Dre, Snoop Dogg", album: "The Chronic", fileName: "dre_chronic" },
  { id: 12, artist: "Dr. Dre, Xzibit", album: "2001", fileName: "dre_2001" },
  { id: 13, artist: "Dr. Dre", album: "Compton", fileName: "dre_compton" },
  { id: 14, artist: "Snoop Dogg, Dr. Dre", album: "Missionary", fileName: "snoop_missionary" },
  { id: 15, artist: "50 Cent", album: "Get Rich Or Die Tryin'", fileName: "50cent_grodt" },
  { id: 16, artist: "50 Cent", album: "The Massacre", fileName: "50cent_massacre" },
  { id: 17, artist: "50 Cent", album: "Before I Self-Destruct", fileName: "50cent_bisd" },
  { id: 18, artist: "JAY-Z", album: "The Blueprint", fileName: "jayz_blueprint" },
  { id: 19, artist: "JAY-Z, Faith Evans", album: "The Blueprint 2: The Gift & The Curse", fileName: "jayz_blueprint2" },
  { id: 20, artist: "JAY-Z", album: "The Black Album", fileName: "jayz_blackalbum" },
  { id: 21, artist: "JAY-Z, Luke Steele", album: "The Blueprint 3", fileName: "jayz_blueprint3" },
  { id: 22, artist: "JAY-Z, Kanye West", album: "Watch The Throne", fileName: "watchthethrone" },

  // --- KANYE WEST (23-34) ---
  { id: 23, artist: "JAY-Z", album: "4:44", fileName: "jayz_444" },
  { id: 24, artist: "Kanye West", album: "The College Dropout", fileName: "kanye_tcd" },
  { id: 25, artist: "Kanye West", album: "Late Registration", fileName: "kanye_lr" },
  { id: 26, artist: "Kanye West", album: "Graduation", fileName: "kanye_graduation" },
  { id: 27, artist: "Kanye West", album: "808s & Heartbreak", fileName: "kanye_808s" },
  { id: 28, artist: "Kanye West", album: "My Beautiful Dark Twisted Fantasy", fileName: "kanye_mbdtf" },
  { id: 29, artist: "Kanye West", album: "Yeezus", fileName: "kanye_yeezus" },
  { id: 30, artist: "Kanye West", album: "The Life Of Pablo", fileName: "kanye_tlop" },
  { id: 31, artist: "Kanye West", album: "ye", fileName: "kanye_ye" },
  { id: 32, artist: "KIDS SEE GHOSTS", album: "KIDS SEE GHOSTS", fileName: "kidsseeghosts" },
  { id: 33, artist: "Kanye West", album: "JESUS IS KING", fileName: "kanye_jik" },
  { id: 34, artist: "Kanye West", album: "Donda", fileName: "kanye_donda" },

  // --- KANYE, KENDRICK (35-46) ---
  { id: 35, artist: "¥$, Kanye West, Ty Dolla $ign", album: "VULTURES 1", fileName: "vultures1" },
  { id: 36, artist: "¥$, Kanye West, Ty Dolla $ign", album: "VULTURES 2", fileName: "vultures2" },
  { id: 37, artist: "Donda, Kanye West", album: "DONDA 2", fileName: "kanye_donda2" },
  { id: 38, artist: "Ye, Kanye West", album: "BULLY", fileName: "kanye_bully" },
  { id: 39, artist: "Kendrick Lamar", album: "Overly Dedicated", fileName: "kendrick_od" },
  { id: 40, artist: "Kendrick Lamar", album: "Section.80", fileName: "kendrick_section80" },
  { id: 41, artist: "Kendrick Lamar", album: "good kid, m.A.A.d city", fileName: "kendrick_gkmc" },
  { id: 42, artist: "Kendrick Lamar", album: "To Pimp A Butterfly", fileName: "kendrick_tpab" },
  { id: 43, artist: "Kendrick Lamar", album: "untitled unmastered.", fileName: "kendrick_untitled" },
  { id: 44, artist: "Kendrick Lamar", album: "DAMN.", fileName: "kendrick_damn" },
  { id: 45, artist: "Kendrick Lamar", album: "Black Panther The Album", fileName: "kendrick_blackpanther" },
  { id: 46, artist: "Kendrick Lamar", album: "Mr. Morale & The Big Steppers", fileName: "kendrick_mrmorale" },

  // --- KENDRICK, TRAVIS, METRO (47-58) ---
  { id: 47, artist: "Kendrick Lamar", album: "GNX", fileName: "kendrick_gnx" },
  { id: 48, artist: "Travis Scott", album: "DAYS BEFORE RODEO", fileName: "travis_dbr" },
  { id: 49, artist: "Travis Scott", album: "Rodeo", fileName: "travis_rodeo" },
  { id: 50, artist: "Travis Scott", album: "Birds In The Trap Sing McKnight", fileName: "travis_birds" },
  { id: 51, artist: "Travis Scott", album: "ASTROWORLD", fileName: "travis_astro" },
  { id: 52, artist: "Travis Scott, ROSALÍA", album: "JACKBOYS", fileName: "jackboys" },
  { id: 53, artist: "Travis Scott", album: "UTOPIA", fileName: "travis_utopia" },
  { id: 54, artist: "JACKBOYS", album: "JACKBOYS 2", fileName: "jackboys_2" },
  { id: 55, artist: "21 Savage, Metro Boomin", album: "Savage Mode", fileName: "savagemode" },
  { id: 56, artist: "NAV, Metro Boomin", album: "Perfect Timing", fileName: "perfecttiming" },
  { id: 57, artist: "21 Savage, Offset, Metro Boomin", album: "Without Warning", fileName: "withoutwarning" },
  { id: 58, artist: "Big Sean, Metro Boomin", album: "Double Or Nothing", fileName: "doubleornothing" },

  // --- METRO, FUTURE (59-70) ---
  { id: 59, artist: "Metro Boomin", album: "NOT ALL HEROES WEAR CAPES", fileName: "nahwc" },
  { id: 60, artist: "21 Savage, Metro Boomin", album: "SAVAGE MODE II", fileName: "savagemode2" },
  { id: 61, artist: "Metro Boomin, John Legend", album: "HEROES & VILLAINS", fileName: "heroesvillains" },
  { id: 62, artist: "Metro Boomin, Swae Lee", album: "METRO BOOMIN PRESENTS SPIDER-MAN", fileName: "metro_spiderman" },
  { id: 63, artist: "Future, Metro Boomin", album: "WE DON'T TRUST YOU", fileName: "wdty" },
  { id: 64, artist: "Future, Metro Boomin", album: "WE STILL DON'T TRUST YOU", fileName: "wsdty" },
  { id: 65, artist: "Future, Big Rube", album: "Pluto", fileName: "future_pluto" },
  { id: 66, artist: "Future", album: "Future", fileName: "future_chosen_one" },
  { id: 67, artist: "Future", album: "Monster", fileName: "future_monster" },
  { id: 68, artist: "Future, Young Scooter", album: "Beast Mode", fileName: "future_beastmode" },
  { id: 69, artist: "Future", album: "56 Nights", fileName: "future_56nights" },
  { id: 70, artist: "Future", album: "DS2 (Deluxe)", fileName: "future_ds2" },

  // --- FUTURE (71-81) ---
  { id: 71, artist: "Drake, Future", album: "What A Time To Be Alive", fileName: "wattba" },
  { id: 72, artist: "Future", album: "Purple Reign", fileName: "future_purplereign" },
  { id: 73, artist: "Future", album: "EVOL", fileName: "future_evol" },
  { id: 74, artist: "Future", album: "FUTURE", fileName: "future_self" },
  { id: 75, artist: "Future", album: "HNDRXX", fileName: "future_hndrxx" },
  { id: 76, artist: "Future, Young Thug", album: "SUPER SLIMEY", fileName: "superslimey" },
  { id: 77, artist: "Future", album: "BEASTMODE 2", fileName: "future_beastmode2" },
  { id: 78, artist: "Future, Juice WRLD", album: "WRLD ON DRUGS", fileName: "wrldondrugs" },
  { id: 79, artist: "Future", album: "High Off Life", fileName: "future_hol" },
  { id: 80, artist: "Future, Lil Uzi Vert", album: "Pluto x Baby Pluto", fileName: "plutoxbabypluto" },
  { id: 81, artist: "Future", album: "I NEVER LIKED YOU", fileName: "future_inly" },

  // --- FUTURE, 21 SAVAGE, DRAKE (82-93) ---
  { id: 82, artist: "Future", album: "MIXTAPE PLUTO", fileName: "future_mixtapepluto" },
  { id: 83, artist: "21 Savage", album: "The Slaughter Tape", fileName: "21savage_slaughtertape" },
  { id: 84, artist: "21 Savage", album: "Slaughter King", fileName: "21savage_slaughterking" },
  { id: 85, artist: "21 Savage", album: "Issa Album", fileName: "21savage_issa" },
  { id: 86, artist: "21 Savage", album: "i am > i was", fileName: "21savage_iam" },
  { id: 87, artist: "Drake, 21 Savage", album: "Her Loss", fileName: "herloss" },
  { id: 88, artist: "21 Savage", album: "american dream", fileName: "21savage_americandream" },
  { id: 89, artist: "21 Savage", album: "WHAT HAPPENED TO THE STREETS", fileName: "21savage_whathappenedto" },
  { id: 90, artist: "PARTYNEXTDOOR, Drake", album: "$ome $exy $ongs 4 U", fileName: "drake_somesexysongs" },
  { id: 91, artist: "Drake", album: "For All The Dogs", fileName: "drake_fatd" },
  { id: 92, artist: "Drake", album: "Honestly, Nevermind", fileName: "drake_honestlynevermind" },
  { id: 93, artist: "Drake", album: "Certified Lover Boy", fileName: "drake_clb" },

  // --- DRAKE (Devam) (94-105) ---
  { id: 94, artist: "Drake", album: "Dark Lane Demo Tapes", fileName: "drake_darklane" },
  { id: 95, artist: "Drake", album: "Care Package", fileName: "drake_carepackage" },
  { id: 96, artist: "Drake", album: "Scorpion", fileName: "drake_scorpion" },
  { id: 97, artist: "Drake", album: "More Life", fileName: "drake_morelife" },
  { id: 98, artist: "Drake", album: "Views", fileName: "drake_views" },
  { id: 99, artist: "Drake", album: "If You're Reading This It's Too Late", fileName: "drake_iyrtitl" },
  { id: 100, artist: "Drake", album: "Nothing Was The Same", fileName: "drake_nwts" },
  { id: 101, artist: "Drake", album: "Take Care (Deluxe)", fileName: "drake_takecare" },
  { id: 102, artist: "Drake", album: "Thank Me Later", fileName: "drake_thankmelater" },
  { id: 103, artist: "J. Cole", album: "Cole World: The Sideline Story", fileName: "jcole_coleworld" },
  { id: 104, artist: "J. Cole", album: "Born Sinner", fileName: "jcole_bornsinner" },
  { id: 105, artist: "J. Cole", album: "2014 Forest Hills Drive", fileName: "jcole_2014fhd" },

  // --- J. COLE & LIL WAYNE (106-117) ---
  { id: 106, artist: "J. Cole", album: "4 Your Eyez Only", fileName: "jcole_4yeo" },
  { id: 107, artist: "J. Cole", album: "KOD", fileName: "jcole_kod" },
  { id: 108, artist: "Dreamville, J. Cole", album: "Revenge Of The Dreamers III", fileName: "dreamville_rotd3" },
  { id: 109, artist: "J. Cole", album: "The Off-Season", fileName: "jcole_offseason" },
  { id: 110, artist: "J. Cole", album: "Might Delete Later", fileName: "jcole_mdl" },
  { id: 111, artist: "Lil Wayne", album: "Tha Carter", fileName: "lilwayne_tha1" },
  { id: 112, artist: "Lil Wayne", album: "Tha Carter II", fileName: "lilwayne_tha2" },
  { id: 113, artist: "Birdman, Lil Wayne", album: "Like Father Like Son", fileName: "lilwayne_lfls" },
  { id: 114, artist: "Lil Wayne", album: "Tha Carter III", fileName: "lilwayne_tha3" },
  { id: 115, artist: "Lil Wayne", album: "Rebirth", fileName: "lilwayne_rebirth" },
  { id: 116, artist: "Lil Wayne", album: "I Am Not A Human Being", fileName: "lilwayne_ianahb" },
  { id: 117, artist: "Lil Wayne", album: "Tha Carter IV", fileName: "lilwayne_tha4" },

  // --- LIL WAYNE (Devam) (118-129) ---
  { id: 118, artist: "Lil Wayne", album: "I Am Not A Human Being II", fileName: "lilwayne_ianahb2" },
  { id: 119, artist: "Lil Wayne", album: "FWA", fileName: "lilwayne_fwa" },
  { id: 120, artist: "Lil Wayne", album: "Tha Carter V", fileName: "lilwayne_tha5" },
  { id: 121, artist: "Lil Wayne", album: "Funeral", fileName: "lilwayne_funeral" },
  { id: 122, artist: "Lil Wayne, Rich The Kid", album: "Trust Fund Babies", fileName: "lilwayne_trustfund" },
  { id: 123, artist: "Lil Wayne", album: "Sorry 4 The Wait", fileName: "lilwayne_s4tw" },
  { id: 124, artist: "Lil Wayne", album: "I Am Music", fileName: "lilwayne_iammusic" },
  { id: 125, artist: "Lil Wayne", album: "Tha Fix Before Tha VI", fileName: "lilwayne_tha6fix" },
  { id: 126, artist: "2 Chainz, Lil Wayne", album: "Welcome 2 Collegrove", fileName: "2chainz_collegrove2" },
  { id: 127, artist: "Lil Wayne", album: "Tha Carter VI", fileName: "lilwayne_tha6" },
  { id: 128, artist: "Big Sean", album: "Hall Of Fame", fileName: "bigsean_hof" },
  { id: 129, artist: "Big Sean", album: "Dark Sky Paradise", fileName: "bigsean_dsp" },

  // --- BIG SEAN & TY DOLLA $IGN (130-141) ---
  { id: 130, artist: "Big Sean", album: "I Decided.", fileName: "bigsean_idecided" },
  { id: 131, artist: "Big Sean", album: "Detroit 2", fileName: "bigsean_detroit2" },
  { id: 132, artist: "Big Sean", album: "Detroit", fileName: "bigsean_detroit" },
  { id: 133, artist: "Big Sean", album: "Better Me Than You", fileName: "bigsean_bmty" },
  { id: 134, artist: "Ty Dolla $ign", album: "TYCOON", fileName: "tydolla_tycoon" },
  { id: 135, artist: "Ty Dolla $ign", album: "Beach House 3", fileName: "tydolla_beachhouse3" },
  { id: 136, artist: "Tyler, The Creator", album: "Goblin", fileName: "tyler_goblin" },
  { id: 137, artist: "Tyler, The Creator", album: "Wolf", fileName: "tyler_wolf" },
  { id: 138, artist: "Tyler, The Creator", album: "Cherry Bomb", fileName: "tyler_cherrybomb" },
  { id: 139, artist: "Tyler, The Creator", album: "Flower Boy", fileName: "tyler_flowerboy" },
  { id: 140, artist: "Tyler, The Creator", album: "IGOR", fileName: "tyler_igor" },
  { id: 141, artist: "Tyler, The Creator", album: "CALL ME IF YOU GET LOST", fileName: "tyler_cmiygl" },

  // --- TYLER, THE CREATOR & CHILDISH GAMBINO (142-153) ---
  { id: 142, artist: "Tyler, The Creator", album: "CHROMAKOPIA", fileName: "tyler_chromakopia" },
  { id: 143, artist: "Tyler, The Creator", album: "DON'T TAP THE GLASS", fileName: "tyler_donttap" },
  { id: 144, artist: "Childish Gambino", album: "Camp", fileName: "gambino_camp" },
  { id: 145, artist: "Childish Gambino", album: "Because the Internet", fileName: "gambino_bti" },
  { id: 146, artist: "Childish Gambino", album: "Kauai", fileName: "gambino_kauai" },
  { id: 147, artist: "Childish Gambino", album: "\"Awaken, My Love!\"", fileName: "gambino_awaken" },
  { id: 148, artist: "Childish Gambino", album: "Bando Stone and The New World", fileName: "gambino_bando" },
  { id: 149, artist: "Kid Cudi", album: "Man On The Moon: The End Of Day", fileName: "kidcudi_motm" },
  { id: 150, artist: "Kid Cudi", album: "Man On The Moon II: The Legend Of Mr. Rager", fileName: "kidcudi_motm2" },
  { id: 151, artist: "Kid Cudi", album: "Indicud", fileName: "kidcudi_indicud" },
  { id: 152, artist: "Kid Cudi", album: "KiD CuDi presents SATELLITE FLIGHT", fileName: "kidcudi_satellite" },
  { id: 153, artist: "Kid Cudi", album: "Speedin' Bullet 2 Heaven", fileName: "kidcudi_sb2h" },

  // --- KID CUDI & A$AP ROCKY (154-165) ---
  { id: 154, artist: "Kid Cudi", album: "Man On The Moon III: The Chosen", fileName: "kidcudi_motm3" },
  { id: 155, artist: "Kid Cudi", album: "The Boy Who Flew To The Moon", fileName: "kidcudi_compilation" },
  { id: 156, artist: "Kid Cudi", album: "A Kid Named Cudi", fileName: "kidcudi_aknc" },
  { id: 157, artist: "Kid Cudi", album: "Entergalactic", fileName: "kidcudi_entergalactic" },
  { id: 158, artist: "Kid Cudi", album: "INSANO", fileName: "kidcudi_insano" },
  { id: 159, artist: "A$AP Rocky", album: "LIVE.LOVE.A$AP", fileName: "asap_livelove" },
  { id: 160, artist: "A$AP Rocky", album: "LONG.LIVE.A$AP", fileName: "asap_longlive" },
  { id: 161, artist: "A$AP Rocky", album: "AT.LONG.LAST.A$AP", fileName: "asap_alla" },
  { id: 162, artist: "A$AP Rocky", album: "TESTING", fileName: "asap_testing" },
  { id: 163, artist: "A$AP Rocky", album: "Don't Be Dumb", fileName: "asap_dontbedumb" },
  { id: 164, artist: "Playboi Carti", album: "Playboi Carti", fileName: "carti_self" },
  { id: 165, artist: "Playboi Carti", album: "Die Lit", fileName: "carti_dielit" },

  // --- A$AP, CARTI, UZI (166-177) ---
  { id: 166, artist: "Playboi Carti", album: "Whole Lotta Red", fileName: "carti_wlr" },
  { id: 167, artist: "Playboi Carti", album: "MUSIC", fileName: "carti_music" },
  { id: 168, artist: "Lil Uzi Vert", album: "Lil Uzi Vert vs. The World", fileName: "uzi_vstheworld" },
  { id: 169, artist: "Lil Uzi Vert", album: "Luv Is Rage", fileName: "uzi_luvisrage" },
  { id: 170, artist: "Lil Uzi Vert", album: "The Perfect LUV Tape", fileName: "uzi_perfectluv" },
  { id: 171, artist: "Lil Uzi Vert", album: "Luv Is Rage 2", fileName: "uzi_luvisrage2" },
  { id: 172, artist: "Lil Uzi Vert", album: "Eternal Atake", fileName: "uzi_ea" },
  { id: 173, artist: "Lil Uzi Vert", album: "Pink Tape", fileName: "uzi_pinktape" },
  { id: 174, artist: "Lil Uzi Vert", album: "Eternal Atake 2", fileName: "uzi_ea2" },
  { id: 175, artist: "Young Thug", album: "Barter 6", fileName: "youngthug_barter6" },
  // 176 (Purple Album) SİLİNDİ, ID'ler KAYDI
  { id: 176, artist: "Young Thug", album: "I'm Up", fileName: "youngthug_imup" },
  { id: 177, artist: "Young Thug", album: "1017 Thug", fileName: "youngthug_1017thug" },

  // --- YOUNG THUG (178-187) ---
  { id: 178, artist: "Migos, Young Thug", album: "MigoThuggin", fileName: "migothuggin" },
  { id: 179, artist: "Young Thug", album: "Slime Season 3", fileName: "youngthug_ss3" },
  { id: 180, artist: "Young Thug", album: "JEFFERY", fileName: "youngthug_jeffery" },
  { id: 181, artist: "Young Thug", album: "Slime Season 4", fileName: "youngthug_ss4" },
  { id: 182, artist: "Young Thug", album: "Slime Language", fileName: "youngthug_sl1" },
  { id: 183, artist: "Young Thug", album: "So Much Fun", fileName: "youngthug_somuchfun" },
  { id: 184, artist: "Young Stoner Life, Young Thug", album: "Slime Language 2", fileName: "youngthug_sl2" },
  { id: 185, artist: "Young Thug", album: "Punk", fileName: "youngthug_punk" },
  { id: 186, artist: "Young Thug", album: "BUSINESS IS BUSINESS", fileName: "youngthug_bib" },
  { id: 187, artist: "Young Thug", album: "Slime Season 2", fileName: "youngthug_ss2" },

  // --- YOUNG THUG & GUNNA (188-199) ---
  { id: 188, artist: "Young Thug", album: "Slime Season", fileName: "youngthug_ss1" },
  { id: 189, artist: "Young Thug", album: "UY SCUTI", fileName: "youngthug_uyscuti" },
  { id: 190, artist: "Gunna", album: "Drip Season", fileName: "gunna_dripseason" },
  { id: 191, artist: "Gunna", album: "Drip Season 2", fileName: "gunna_dripseason2" },
  { id: 192, artist: "Gunna", album: "Drip or Drown", fileName: "gunna_dripordrown" },
  { id: 193, artist: "Gunna", album: "Drip Season 3 (Deluxe)", fileName: "gunna_dripseason3" },
  { id: 194, artist: "Lil Baby, Gunna", album: "Drip Harder", fileName: "gunna_dripharder" },
  { id: 195, artist: "Gunna", album: "Drip or Drown 2", fileName: "gunna_dripordrown2" },
  { id: 196, artist: "Gunna", album: "WUNNA", fileName: "gunna_wunna" },
  { id: 197, artist: "Gunna", album: "DS4EVER", fileName: "gunna_ds4ever" },
  { id: 198, artist: "Gunna", album: "One of Wun", fileName: "gunna_oneofwun" },
  { id: 199, artist: "Gunna", album: "a Gift & a Curse", fileName: "gunna_giftandcurse" },

  // --- GUNNA & MAC MILLER (200-211) ---
  { id: 200, artist: "Mac Miller", album: "K.I.D.S.", fileName: "macmiller_kids" },
  { id: 201, artist: "Mac Miller", album: "Blue Slide Park", fileName: "macmiller_bsp" },
  { id: 202, artist: "Mac Miller", album: "Macadelic", fileName: "macmiller_macadelic" },
  { id: 203, artist: "Mac Miller", album: "GO:OD AM", fileName: "macmiller_goodam" },
  { id: 204, artist: "Mac Miller", album: "Best Day Ever", fileName: "macmiller_bestdayever" },
  { id: 205, artist: "Mac Miller", album: "The Divine Feminine", fileName: "macmiller_divinefeminine" },
  { id: 206, artist: "Mac Miller", album: "Swimming", fileName: "macmiller_swimming" },
  { id: 207, artist: "Mac Miller", album: "Circles", fileName: "macmiller_circles" },
  { id: 208, artist: "Mac Miller", album: "Faces", fileName: "macmiller_faces" },
  { id: 209, artist: "Mac Miller", album: "I Love Life, Thank You", fileName: "macmiller_illty" },
  { id: 210, artist: "Mac Miller", album: "Watching Movies with the Sound Off", fileName: "macmiller_wmwtso" },
  { id: 211, artist: "Mac Miller", album: "Balloonerism", fileName: "macmiller_balloonerism" },

  // --- MAC MILLER, JOEY BADA$$ & A TRIBE CALLED QUEST (212-223) ---
  { id: 212, artist: "Joey Bada$$", album: "1999", fileName: "joey_1999" },
  { id: 213, artist: "Joey Bada$$", album: "ALL-AMERIKKKAN BADA$$", fileName: "joey_aaba" },
  { id: 214, artist: "Joey Bada$$", album: "2000", fileName: "joey_2000" },
  { id: 215, artist: "Joey Bada$$", album: "Lonely At The Top", fileName: "joey_lonelyatthetop" },
  { id: 216, artist: "A Tribe Called Quest", album: "People's Instinctive Travels and the Paths of Rhythm", fileName: "atcq_peoples" },
  { id: 217, artist: "A Tribe Called Quest", album: "The Low End Theory", fileName: "atcq_lowendtheory" },
  { id: 218, artist: "A Tribe Called Quest", album: "Midnight Marauders", fileName: "atcq_midnight" },
  { id: 219, artist: "A Tribe Called Quest", album: "Beats, Rhymes & Life", fileName: "atcq_beatsrhymes" },
  { id: 220, artist: "A Tribe Called Quest", album: "The Love Movement", fileName: "atcq_lovemovement" },
  { id: 221, artist: "A Tribe Called Quest", album: "We got it from Here... Thank You 4 Your service", fileName: "atcq_wegotit" },
  { id: 222, artist: "Don Toliver", album: "HARDSTONE PSYCHO", fileName: "dontoliver_hardstone" },
  { id: 223, artist: "Don Toliver", album: "Love Sick", fileName: "dontoliver_lovesick" },

  // --- ATCQ, DON TOLIVER, DENZEL, OFFSET (224-235) ---
  { id: 224, artist: "Don Toliver", album: "Life of a DON", fileName: "dontoliver_lifeofadon" },
  { id: 225, artist: "Don Toliver", album: "Heaven Or Hell", fileName: "dontoliver_heavenorhell" },
  { id: 226, artist: "Denzel Curry", album: "TA13OO", fileName: "denzel_ta13oo" },
  { id: 227, artist: "Denzel Curry", album: "Melt My Eyez See Your Future", fileName: "denzel_meltmyeyez" },
  { id: 228, artist: "Denzel Curry", album: "King Of The Mischievous South Vol. 1", fileName: "denzel_kotms1" },
  { id: 229, artist: "Denzel Curry", album: "King Of The Mischievous South Vol. 2", fileName: "denzel_kotms2" },
  { id: 230, artist: "Offset", album: "SET IT OFF", fileName: "offset_setitoff" },
  { id: 231, artist: "Offset", album: "FATHER OF 4", fileName: "offset_fatherof4" },
  { id: 232, artist: "Lil Tecca", album: "We Love You Tecca", fileName: "liltecca_wlyt" },
  { id: 233, artist: "Lil Tecca", album: "TEC", fileName: "liltecca_tec" },
  { id: 234, artist: "Lil Tecca", album: "PLAN A", fileName: "liltecca_plana" },
  { id: 235, artist: "Lil Tecca", album: "DOPAMINE", fileName: "liltecca_dopamine" },

  // --- LIL TECCA, JID, NAS (236-247) ---
  { id: 236, artist: "JID", album: "God Does Like Ugly", fileName: "jid_goddoeslikeugly" },
  { id: 237, artist: "JID", album: "The Forever Story", fileName: "jid_foreverstory" },
  { id: 238, artist: "Spillage Village", album: "Spilligion", fileName: "spillage_spilligion" },
  { id: 239, artist: "JID", album: "DiCaprio 2", fileName: "jid_dicaprio2" },
  { id: 240, artist: "JID", album: "The Never Story", fileName: "jid_neverstory" },
  { id: 241, artist: "Nas", album: "Light-Years", fileName: "nas_lightyears" },
  { id: 242, artist: "Nas", album: "Magic 3", fileName: "nas_magic3" },
  { id: 243, artist: "Nas", album: "Magic 2", fileName: "nas_magic2" },
  { id: 244, artist: "Nas", album: "King's Disease III", fileName: "nas_kd3" },
  { id: 245, artist: "Nas", album: "Magic", fileName: "nas_magic" },
  { id: 246, artist: "Nas", album: "King's Disease II", fileName: "nas_kd2" },
  { id: 247, artist: "Nas", album: "King's Disease", fileName: "nas_kd1" },

  // --- NAS (248-259) ---
  { id: 248, artist: "Nas", album: "The Lost Tapes 2", fileName: "nas_losttapes2" },
  { id: 249, artist: "Nas", album: "Life Is Good", fileName: "nas_lifeisgood" },
  { id: 250, artist: "Nas, Damian Marley", album: "Distant Relatives", fileName: "nas_distantrelatives" },
  { id: 251, artist: "Nas", album: "Untitled", fileName: "nas_untitled" },
  { id: 252, artist: "Nas", album: "Hip Hop Is Dead", fileName: "nas_hiphopisdead" },
  { id: 253, artist: "Nas", album: "Street's Disciple", fileName: "nas_streetsdisciple" },
  { id: 254, artist: "Nas", album: "God's Son", fileName: "nas_godsson" },
  { id: 255, artist: "Nas", album: "The Lost Tapes", fileName: "nas_losttapes" },
  { id: 256, artist: "Nas", album: "Stillmatic", fileName: "nas_stillmatic" },
  { id: 257, artist: "Nas", album: "Nastradamus", fileName: "nas_nastradamus" },
  { id: 258, artist: "Nas", album: "I Am...", fileName: "nas_iam" },
  { id: 259, artist: "Nas", album: "It Was Written", fileName: "nas_itwaswritten" },

  // --- NAS (Devam) & D12 (260-266) ---
  { id: 260, artist: "Nas", album: "Illmatic", fileName: "nas_illmatic" },
  { id: 261, artist: "D12", album: "D-12 World", fileName: "d12_world" },
  { id: 262, artist: "D12", album: "Devils Night", fileName: "d12_devilsnight" },
  { id: 263, artist: "2Pac", album: "2Pacalypse Now", fileName: "2pac_2pacalypse" },
  { id: 264, artist: "2Pac", album: "Strictly 4 My N.I.G.G.A.Z...", fileName: "2pac_strictly" },
  { id: 265, artist: "2Pac", album: "Me Against The World", fileName: "2pac_meagainst" },
  { id: 266, artist: "2Pac", album: "All Eyez On Me", fileName: "2pac_alleyez" },

  // --- 2PAC (267-277) ---
  { id: 267, artist: "2Pac", album: "R U Still Down? [Remember Me]", fileName: "2pac_rustilldown" },
  { id: 268, artist: "2Pac, Outlawz", album: "Still I Rise", fileName: "2pac_stillirise" },
  { id: 269, artist: "2Pac", album: "Until The End Of Time", fileName: "2pac_untiltheend" },
  { id: 270, artist: "2Pac", album: "Better Dayz", fileName: "2pac_betterdayz" },
  { id: 271, artist: "2Pac", album: "Loyal To The Game", fileName: "2pac_loyal" },
  { id: 272, artist: "2Pac", album: "Pac's Life", fileName: "2pac_pacslife" },
  { id: 273, artist: "MF DOOM", album: "MM..FOOD", fileName: "mfdoom_mmfood" },
  { id: 274, artist: "Madvillain", album: "Madvillainy", fileName: "mfdoom_madvillainy" },
  { id: 275, artist: "MF DOOM", album: "Operation: Doomsday", fileName: "mfdoom_doomsday" },
  { id: 276, artist: "JPEGMAFIA", album: "I LAY DOWN MY LIFE FOR YOU", fileName: "jpeg_laydown" },
  { id: 277, artist: "JPEGMAFIA, Danny Brown", album: "SCARING THE HOES", fileName: "jpeg_scaring" },

  // --- MF DOOM, JPEGMAFIA, DANNY BROWN (278-284) ---
  { id: 278, artist: "Danny Brown", album: "Atrocity Exhibition", fileName: "danny_atrocity" },
  { id: 279, artist: "McKinley Dixon", album: "Magic, Alive!", fileName: "mckinley_magicalive" },
  { id: 280, artist: "The Notorious B.I.G.", album: "Ready to Die", fileName: "biggie_readytodie" },
  { id: 281, artist: "The Notorious B.I.G.", album: "Life After Death", fileName: "biggie_lifeafterdeath" },
  { id: 282, artist: "The Notorious B.I.G.", album: "Born Again", fileName: "biggie_bornagain" },
  { id: 283, artist: "Faith Evans, The Notorious B.I.G.", album: "The King & I", fileName: "biggie_kingandi" },
  { id: 284, artist: "The Notorious B.I.G.", album: "Duets: The Final Chapter", fileName: "biggie_duets" },

  // --- NOTORIOUS B.I.G. & THE ROOTS (285-290) ---
  { id: 285, artist: "The Roots", album: "Things Fall Apart", fileName: "roots_thingsfallapart" },
  { id: 286, artist: "Snoop Dogg", album: "Doggystyle", fileName: "snoop_doggystyle" },
  { id: 287, artist: "Snoop Dogg", album: "The Snoop Story", fileName: "snoop_story" },
  { id: 288, artist: "Snoop Dogg", album: "Neva Left", fileName: "snoop_nevaleft" },
  { id: 289, artist: "Snoop Dogg", album: "COOLAID", fileName: "snoop_coolaid" },
  { id: 290, artist: "7 Days Of Funk", album: "7 Days of Funk", fileName: "snoop_7days" },

  // --- SNOOP DOGG & OUTKAST (291-302) ---
  { id: 291, artist: "Snoop Dogg", album: "Doggumentary", fileName: "snoop_doggumentary" },
  { id: 292, artist: "Snoop Dogg", album: "Malice 'N Wonderland", fileName: "snoop_malice" },
  { id: 293, artist: "Snoop Dogg", album: "Tha Blue Carpet Treatment", fileName: "snoop_bluecarpet" },
  { id: 294, artist: "Snoop Dogg", album: "Tha Doggfather", fileName: "snoop_doggfather" },
  { id: 295, artist: "Outkast", album: "ATLiens", fileName: "outkast_atliens" },
  { id: 296, artist: "Outkast", album: "Aquemini", fileName: "outkast_aquemini" },
  { id: 297, artist: "Outkast", album: "Stankonia", fileName: "outkast_stankonia" },
  { id: 298, artist: "Denzel Curry", album: "ZUU", fileName: "denzel_zuu" },
  { id: 299, artist: "Clipse", album: "Let God Sort Em Out", fileName: "clipse_letgod" },
  { id: 300, artist: "Baby Keem", album: "The Melodic Blue", fileName: "babykeem_melodic" },
  { id: 301, artist: "Baby Keem", album: "DIE FOR MY BITCH", fileName: "babykeem_diefor" },
  { id: 302, artist: "Homixide Gang", album: "Snotty World (Deluxe)", fileName: "homixide_snotty" },

  // --- DENZEL, BABY KEEM, HOMIXIDE, KEN CARSON (303-311) ---
  { id: 303, artist: "Homixide Gang", album: "Homixide Lifestyle", fileName: "homixide_lifestyle" },
  { id: 304, artist: "Denzel Curry", album: "ZUU", fileName: "denzel_zuu" },
  { id: 305, artist: "Ken Carson", album: "A Great Chaos", fileName: "ken_greatchaos" },
  { id: 306, artist: "Doechii", album: "Alligator Bites Never Heal", fileName: "doechii_alligator" },
  { id: 307, artist: "The Game", album: "The Documentary", fileName: "game_documentary" },
  { id: 308, artist: "Migos", album: "Culture III", fileName: "migos_culture3" },
  { id: 309, artist: "Migos", album: "Culture II", fileName: "migos_culture2" },
  { id: 310, artist: "Migos", album: "Culture", fileName: "migos_culture1" },
  { id: 311, artist: "XXXTENTACION", album: "LOOK AT ME: THE ALBUM", fileName: "x_lookatme" },

  // --- THE GAME, MIGOS (312-315) ---
  { id: 312, artist: "XXXTENTACION", album: "Bad Vibes Forever", fileName: "x_badvibes" },
  { id: 313, artist: "XXXTENTACION", album: "SKINS", fileName: "x_skins" },
  { id: 314, artist: "XXXTENTACION", album: "?", fileName: "x_question" },
  { id: 315, artist: "XXXTENTACION", album: "17", fileName: "x_17" },

  // --- XXXTENTACION & JUICE WRLD (316-325) ---
  { id: 316, artist: "Juice WRLD", album: "Goodbye & Good Riddance", fileName: "juice_goodbye" },
  { id: 317, artist: "Juice WRLD", album: "Death Race For Love", fileName: "juice_deathrace" },
  { id: 318, artist: "Juice WRLD", album: "Legends Never Die", fileName: "juice_legends" },
  { id: 319, artist: "Juice WRLD", album: "Fighting Demons", fileName: "juice_fighting" },
  { id: 320, artist: "Juice WRLD", album: "The Party Never Ends", fileName: "juice_party" },
  { id: 321, artist: "Megan Thee Stallion", album: "MEGAN", fileName: "megan_self" },
  { id: 322, artist: "Megan Thee Stallion", album: "Traumazine", fileName: "megan_traumazine" },
  { id: 323, artist: "Megan Thee Stallion", album: "MEGAN: ACT II", fileName: "megan_act2" },
  { id: 324, artist: "Cardi B", album: "AM I THE DRAMA?", fileName: "cardi_drama" },
  { id: 325, artist: "Cardi B", album: "Invasion of Privacy", fileName: "cardi_privacy" },

  // --- MEGAN, CARDI, DOJA, NICKI (326-336) ---
  { id: 326, artist: "Doja Cat", album: "Planet Her", fileName: "doja_planether" },
  { id: 327, artist: "Nicki Minaj", album: "Pink Friday", fileName: "nicki_pinkfriday" },
  { id: 328, artist: "Nicki Minaj", album: "The Pinkprint", fileName: "nicki_pinkprint" },
  { id: 329, artist: "Nicki Minaj", album: "Queen", fileName: "nicki_queen" },
  { id: 330, artist: "Nicki Minaj", album: "Pink Friday 2", fileName: "nicki_pinkfriday2" },
  { id: 331, artist: "Ms. Lauryn Hill", album: "The Miseducation of Lauryn Hill", fileName: "lauryn_miseducation" },
  { id: 332, artist: "Mobb Deep", album: "The Infamous", fileName: "mobb_infamous" },
  { id: 333, artist: "Mobb Deep", album: "Hell On Earth", fileName: "mobb_hellonearth" },
  { id: 334, artist: "Pusha T", album: "It's Almost Dry", fileName: "pusha_almostdry" },
  { id: 335, artist: "Pusha T", album: "My Name Is My Name", fileName: "pusha_myname" },
  { id: 336, artist: "Freddie Gibbs", album: "Alfredo 2", fileName: "freddie_alfredo2" },

  // --- MOBB DEEP, PUSHA T, FREDDIE GIBBS, EARL (337-346) ---
  { id: 337, artist: "Freddie Gibbs", album: "You Only Die 1nce", fileName: "freddie_youonly" },
  { id: 338, artist: "Freddie Gibbs", album: "$oul $old $eparately", fileName: "freddie_sss" },
  { id: 339, artist: "Freddie Gibbs", album: "Piñata", fileName: "freddie_pinata" },
  { id: 340, artist: "Freddie Gibbs", album: "Alfredo", fileName: "freddie_alfredo" },
  { id: 341, artist: "Earl Sweatshirt", album: "Some Rap Songs", fileName: "earl_somerapsongs" },
  { id: 342, artist: "Earl Sweatshirt", album: "Live Laugh Love", fileName: "earl_livelaughlove" },
  { id: 343, artist: "Vince Staples", album: "Big Fish Theory", fileName: "vince_bigfish" },
  { id: 344, artist: "ScHoolboy Q", album: "BLUE LIPS", fileName: "schoolboy_bluelips" },
  { id: 345, artist: "ScHoolboy Q", album: "CrasH Talk", fileName: "schoolboy_crashtalk" },
  { id: 346, artist: "ScHoolboy Q", album: "Blank Face LP", fileName: "schoolboy_blankface" },

  // --- EARL, VINCE, SCHOOLBOY, PEEP, PND (347-360) ---
  { id: 347, artist: "ScHoolboy Q", album: "Oxymoron", fileName: "schoolboy_oxymoron" },
  { id: 348, artist: "Lil Peep", album: "Come Over When You're Sober, Pt. 2", fileName: "lilpeep_cowys2" },
  { id: 349, artist: "Lil Peep", album: "Come Over When You're Sober, Pt. 1", fileName: "lilpeep_cowys1" },
  { id: 350, artist: "Lil Peep", album: "HELLBOY", fileName: "lilpeep_hellboy" },
  { id: 351, artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR 4", fileName: "pnd_p4" },
  { id: 352, artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR", fileName: "pnd_p1" },
  { id: 353, artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR TWO", fileName: "pnd_p2" },
  { id: 354, artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR 3", fileName: "pnd_p3" },
  { id: 355, artist: "PARTYNEXTDOOR", album: "COLOURS", fileName: "pnd_colours" },
  { id: 356, artist: "Pop Smoke", album: "Shoot For The Stars Aim For The Moon", fileName: "popsmoke_sftsaftm" },
  { id: 357, artist: "Pop Smoke", album: "Faith", fileName: "popsmoke_faith" },
  { id: 358, artist: "Pop Smoke", album: "Meet The Woo 2", fileName: "popsmoke_mtw2" },
  { id: 359, artist: "Pop Smoke", album: "Meet The Woo", fileName: "popsmoke_mtw1" },
  { id: 360, artist: "Roddy Ricch", album: "Please Excuse Me for Being Antisocial", fileName: "roddy_pemfba" },

  // --- POP SMOKE, RODDY, LIL BABY, FERG, KEN, CHIEF KEEF, WU (361-374) ---
  { id: 361, artist: "Lil Baby", album: "My Turn", fileName: "lilbaby_myturn" },
  { id: 362, artist: "A$AP Ferg", album: "Still Striving", fileName: "asapferg_stillstriving" },
  { id: 363, artist: "Destroy Lonely", album: "NS+ (ULTRA)", fileName: "destroy_nsplus" },
  { id: 364, artist: "Ken Carson", album: "More Chaos", fileName: "kencarson_morechaos" },
  { id: 365, artist: "Chief Keef", album: "Finally Rich", fileName: "chiefkeef_finallyrich" },
  { id: 366, artist: "Chief Keef", album: "Back from the Dead 2", fileName: "chiefkeef_bftd2" },
  { id: 367, artist: "Chief Keef", album: "Back from the Dead", fileName: "chiefkeef_bftd" },
  { id: 368, artist: "Wu-Tang Clan", album: "Enter The Wu-Tang (36 Chambers)", fileName: "wutang_36chambers" },
  { id: 369, artist: "Makaveli", album: "The Don Killuminati: The 7 Day Theory", fileName: "2pac_makaveli" },

  // --- LIL YACHTY, YOUNG NUDY, KODAK BLACK (370-381) ---
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

  // --- TRIPPIE REDD, LIL PUMP, TECCA, MUSTARD (382-389) ---
  { id: 382, artist: "Trippie Redd", album: "A Love Letter To You 4", fileName: "trippie_allty4" },
  { id: 383, artist: "Trippie Redd", album: "LIFE'S A TRIP", fileName: "trippie_lifesatrip" },
  { id: 384, artist: "Trippie Redd", album: "Trip At Knight", fileName: "trippie_tripatknight" },
  { id: 385, artist: "Lil Pump", album: "Lil Pump", fileName: "lilpump_lilpump" },
  { id: 386, artist: "Lil Tecca", album: "We Love You Tecca 2", fileName: "liltecca_wlyt2" },
  { id: 387, artist: "Mustard", album: "Faith Of A Mustard Seed", fileName: "mustard_faith" },
  { id: 388, artist: "EsDeeKid", album: "Rebel", fileName: "esdeekid_rebel" },
  { id: 389, artist: "Immortal Technique", album: "Revolutionary Vol. 2", fileName: "immortal_vol2" },

  // --- IMMORTAL TECH, N.W.A, DJ SHADOW, ICE CUBE (390-395) ---
  { id: 390, artist: "Immortal Technique", album: "Revolutionary, Vol. 1", fileName: "immortal_vol1" },
  { id: 391, artist: "N.W.A.", album: "Straight Outta Compton", fileName: "nwa_straightoutta" },
  { id: 392, artist: "N.W.A.", album: "Efil4zaggin", fileName: "nwa_efil4zaggin" },
  { id: 393, artist: "DJ Shadow", album: "Endtroducing.....", fileName: "djshadow_endtroducing" },
  { id: 394, artist: "Ice Cube", album: "The Predator", fileName: "icecube_predator" },
  { id: 395, artist: "Tory Lanez", album: "Alone at Prom (Deluxe)", fileName: "torylanez_aloneatprom" },

  // --- KODAK, MOS DEF, CHIEF KEEF, DEATH GRIPS, ASAP MOB (396-400) ---
  { id: 396, artist: "Kodak Black", album: "Project Baby 2: All Grown Up", fileName: "kodak_projectbaby2" },
  { id: 397, artist: "Mos Def", album: "Black On Both Sides", fileName: "mosdef_blackonbothsides" },
  { id: 398, artist: "Chief Keef", album: "Dedication", fileName: "chiefkeef_dedication" },
  { id: 399, artist: "Death Grips", album: "The Money Store", fileName: "deathgrips_moneystore" },
];
