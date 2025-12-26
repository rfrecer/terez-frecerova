import React, { useState, useEffect, useMemo } from 'react';
import { Music, BookOpen, Mic, ArrowUpRight, Mail, Instagram, Facebook, Calendar, Disc, MapPin, ExternalLink, Camera, Headphones, X, ChevronLeft, ChevronRight, Star, Heart, Zap, FileText, Anchor,QlCloud, Cloud } from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);

  // --- IMAGE CONFIGURATION ---
  // Replace the empty strings "" with your image paths (e.g., "/terez-frecerova/images/my-photo.jpg")
  const projectImages = {
    hero: {
      titleImage: "hero.jpg"  // Main title image replacing the bio text (Aspect ratio 3:2)
    },
    malaBySom: {
      background: "album_background.jpg", // Background for the left side of the Music section
      cover: "album.jpg"       // Album cover image inside the tile
    },
    rapiky: {
      background: "rapiky_background.JPG", // Background for the Rapíky section
      cover: "rapiky.JPG"       // Book cover image inside the tile
    },
    lsdolina: {
      background: "lsdolina.jpeg"  // Background image for the podcast section
    },
    smiesna: {
      background: "smiesnaosobnadrama.jpg"  // Background image for the diagonal green section
    }
  };

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data
  const artistName = "Terez Frecerová";
  
  // Raw Concert Data
  // Add 'photoUrl' for past concerts to appear in the archive grid
  const rawConcerts = [
    { venue: "Beseda u Bigbítu", city: "Tasov, CZ", date: "2026-07-31", link: "https://besedaubigbitu.cz/program", imgColor: "bg-teal-200", photoUrl: "" },
    { venue: "WiFič VEN!_na poli", city: "Bílovice, CZ", date: "2026-08-28", link: "https://www.wificven.cz/", imgColor: "bg-violet-200", photoUrl: "" },
    { venue: "Anežka (CZ krst albumu)", city: "Praha, CZ", date: "2025-12-13", link: "https://www.facebook.com/events/1676961323261958", imgColor: "bg-purple-200", photoUrl: "2025-12-13 anezka.jpg" },
    { venue: "Pink Whale (SK krst albumu)", city: "Bratislava, SK", date: "2025-11-06", link: "https://koncerty.slnkorecords.sk/event-detail/68dd2aa6ec2eb8327e9f7eb2/", imgColor: "bg-pink-300", photoUrl: "" },
    { venue: "Wave", city: "Prešov, SK", date: "2025-12-05", link: "https://www.wave.sk/event-detail/68e7a143370bcafa026c654c/?lang=sk_SK", imgColor: "bg-blue-200", photoUrl: "" },
    { venue: "Beseda u Bigbítu", city: "Tasov, CZ", date: "2025-08-02", link: "https://besedaubigbitu.cz/program/rok/2025", imgColor: "bg-yellow-200", photoUrl: "" },
    { venue: "MFDF Ji.hlava", city: "Jihlava, CZ", date: "2025-10-26", link: "https://www.ji-hlava.cz/akce/terez-frecerova", imgColor: "bg-red-200", photoUrl: "" },
    { venue: "Trnavský rínek", city: "Trnava, SK", date: "2025-12-06", link: "https://www.facebook.com/events/3293671617474544/", imgColor: "bg-orange-200", photoUrl: "" },
    { venue: "Tužina Groove", city: "Tužina, SK", date: "2025-07-26", link: "https://www.tuzinagroove.sk/program/sobota/", imgColor: "bg-green-200", photoUrl: "" },
    { venue: "Prüger-Wallnerova záhrada (Letorast)", city: "Bratislava, SK", date: "2024-08-28", link: "https://www.instagram.com/reel/C_F-IMxq1rb/?utm_source=ig_web_copy_link", imgColor: "bg-emerald-200", photoUrl: "" },
    { venue: "Fuga (Poeti z ulice)", city: "Bratislava, SK", date: "2025-03-20", link: "https://www.facebook.com/events/n%C3%A1mestie-snp-24-81101-bratislava-slovakia/poeti-z-ulice-fragmenty-svetla/1837139687060250/", imgColor: "bg-indigo-200", photoUrl: "" },
    { venue: "Manifest Bohéma (Srdcové záležitosti)", city: "Bratislava, SK", date: "2024-12-18", link: "https://www.facebook.com/events/1716159449240360/", imgColor: "bg-rose-200", photoUrl: "" },
    { venue: "Koncertná sieň Klarisiek", city: "Bratislava, SK", date: "2024-05-12", link: "https://goout.net/sk/srdcove-zalezitosti-matky-vsemohuce/szxqxcx/", imgColor: "bg-cyan-200", photoUrl: "" },
    { venue: "Šafko Klub (Tepláreň Kabaret)", city: "Bratislava, SK", date: "2024-11-23", link: "https://tootoot.fm/en/events/65af9de81b234e174cefe18d", imgColor: "bg-lime-200", photoUrl: "" },
    { venue: "Nová Cvernovka", city: "Bratislava, SK", date: "2024-12-07", link: "https://goout.net/uk/kaery-ann%2Bterez-frecerova/szetynx/", imgColor: "bg-fuchsia-200", photoUrl: "" }
  ];

  // Logic to split and sort concerts
  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const up = [];
    const p = [];

    rawConcerts.forEach(concert => {
      const concertDate = new Date(concert.date);
      // Format date for display (e.g., "13 DEC")
      const displayDate = concertDate.toLocaleDateString('sk-SK', { day: 'numeric', month: 'short' }).toUpperCase();
      // Format year for display
      const displayYear = concertDate.getFullYear();
      
      const enhancedConcert = { ...concert, displayDate, displayYear };

      if (concertDate >= now) {
        up.push(enhancedConcert);
      } else {
        p.push(enhancedConcert);
      }
    });

    //ZS Sort Upcoming: Ascending (Soonest first)
    up.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Sort Past: Descending (Most recent first)
    p.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcoming: up, past: p };
  }, []);


  const album = {
    title: "Mala by som niečo robiť",
    label: "Slnko Records",
    year: "2025",
    desc: "'...je plnotučným songwriterským svědectvím čerstvé matky, která dává průchod svojí únavě, rozčarování, střetům s realitou, nasranosti, kletbám, naději, únikům.' -Pavel Klusák",
    color: "bg-orange-300",
    link: "https://www.slnkorecords.sk/terez-frecerova/mala-by-som-nieco-robit",
    tidalLink: "https://tidal.com/album/456287612/u"
  };

  const projects = [
    {
      id: "book1",
      category: "Kniha",
      title: "Smiešna osobná dráma",
      publisher: "Tatran, 2016",
      desc: "Debutový román. Autentická satira o generácii Y, uväznenej medzi študentskou slobodou a absurditou prvého korporátneho jobu. Príbeh plný irónie a slangu o hľadaní zmyslu v banalitách dospelého života.",
      link: "https://www.martinus.sk/777931-smiesna-osobna-drama/260353",
      style: "comic", 
      theme: { bg: "bg-emerald-300", text: "text-black", accent: "bg-black text-emerald-300" }
    },
    {
      id: "podcast",
      category: "Podcast",
      title: "LSDolina",
      publisher: "Spotify",
      desc: "Dospelácka relácia o psychedelikách a dolinách ľudskej mysle.",
      link: "https://open.spotify.com/show/4VPddgb3iQSskvQy3touHg",
      soundcloudLink: "https://soundcloud.com/terezia-frecerova",
      style: "psychedelic",
      theme: { bg: "bg-indigo-900", text: "text-indigo-100", accent: "bg-indigo-400" }
    },
    {
      id: "book2",
      category: "Poézia",
      title: "Rapíky mladej matere",
      publisher: "Ursa Minor",
      desc: "'Freska o moderných ženách, modernom konzume, je to trip do vesmírnej petriho misky, na ktorú mieri galaktický snajper. Melodráma o kojení sveta, ktorý sa vám prisal na prsník cez uzlíček šťastia okolo ktorého číhajú vlásočnice depky.' -Lyrik",
      link: "https://www.ursa-minor.sk/rapiky-mladej-matere/",
      style: "manuscript",
      theme: { bg: "bg-[#f4e4bc]", text: "text-rose-900", accent: "bg-rose-500" }
    }
  ];

  const navItems = [
    { id: 'home', label: 'domov' },
    { id: 'music', label: 'hudba' },
    { id: 'concerts', label: 'koncerty' },
    { id: 'projects', label: 'projekty' },
    { id: 'contact', label: 'kontakt' },
  ];

  // Helper for scrolling
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-gray-900 font-sans selection:bg-lime-300 selection:text-black overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Modak&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');
        
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .font-bubbly { font-family: 'Modak', system-ui; }
        
        .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
        .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
        .neo-shadow-hover:hover {
          box-shadow: 6px 6px 0px 0px #000000;
          transform: translate(-2px, -2px);
        }
        
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }

        .pattern-grid {
          background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center center;
          opacity: 0.1;
        }
        
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }

        .text-stroke-black {
          -webkit-text-stroke: 1px black;
          color: transparent;
        }

        .float-anim { animation: float 6s ease-in-out infinite; }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        /* Blob Shape for LSDolina tag */
        .blob-shape {
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: blob-pulse 4s ease-in-out infinite alternate;
        }
        @keyframes blob-pulse {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
        }

        /* Hide Scrollbar for Archive */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Top Marquee */}
      <div className="bg-lime-300 text-black py-2 font-mono text-sm border-b-2 border-black overflow-hidden relative z-50">
        <div className="marquee-container">
          <div className="marquee-content font-bold flex items-center">
            <span className="mx-4">✿ NOVÝ ALBUM "MALA BY SOM NIEČO ROBIŤ" PRÁVE VYŠIEL V SLNKO RECORDS</span>
            
            <a href="https://soundcloud.com/terezia-frecerova/lsdolina-katarina-janeckova-walshe-trip-nam-pomohol-vo-vztahu-35" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
              ✿ VYPOČUJ SI LSDOLINU S KATARÍNOU JANEČKOVOU WALSHE
            </a>
            
            <a href="https://www.mujrozhlas.cz/artcafe/debut-hudebnice-terez-frecerove-prinasi-autenticitu-zivota-lehouckou-ironii-i-trapove-beaty" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
              ✿ ROZHOVOR V ARTCAFÉ NA RÁDIU VLTAVA
            </a>

            <span className="mx-4">✿ NOVÝ ALBUM "MALA BY SOM NIEČO ROBIŤ" PRÁVE VYŠIEL V SLNKO RECORDS</span>
            
            <a href="https://soundcloud.com/terezia-frecerova/lsdolina-katarina-janeckova-walshe-trip-nam-pomohol-vo-vztahu-35" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
              ✿ VYPOČUJ SI LSDOLINU S KATARÍNOU JANEČKOVOU WALSHE
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 flex justify-center pointer-events-none`}>
        <div className={`
          pointer-events-auto
          bg-white border-2 border-black px-6 py-3 
          flex flex-wrap justify-center items-center gap-4 md:gap-8 
          neo-shadow rounded-full
          transition-all duration-300
          ${scrolled ? 'scale-90 bg-white/90 backdrop-blur' : 'scale-100'}
        `}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-mono text-xs md:text-sm uppercase tracking-wide hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-colors ${activeSection === item.id ? 'text-blue-600 font-bold' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 border-b-2 border-black overflow-hidden noise-bg">
        <div className="absolute top-20 left-10 md:left-20 animate-bounce delay-100">
           <div className="w-12 h-12 bg-yellow-400 rounded-full border-2 border-black"></div>
        </div>
        <div className="absolute bottom-40 right-10 md:right-20 animate-pulse">
           <div className="w-16 h-16 bg-blue-400 rotate-45 border-2 border-black"></div>
        </div>

        <div className="relative z-10 text-center w-full max-w-7xl">
          <h1 className="font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-8 text-black drop-shadow-sm">
            TEREZ <br /> FRECEROVÁ
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="bg-white border-2 border-black px-6 py-2 rounded-full font-mono text-sm md:text-base font-bold neo-shadow-sm rotate-[-2deg] hover:rotate-0 transition-transform cursor-default">
              Spisovateľka
            </span>
            <span className="bg-lime-300 border-2 border-black px-6 py-2 rounded-full font-mono text-sm md:text-base font-bold neo-shadow-sm rotate-[1deg] hover:rotate-0 transition-transform cursor-default">
              Pesničkárka
            </span>
            <span className="bg-purple-300 border-2 border-black px-6 py-2 rounded-full font-mono text-sm md:text-base font-bold neo-shadow-sm rotate-[-1deg] hover:rotate-0 transition-transform cursor-default">
              Textárka
            </span>
          </div>

          {/* Title Image Container */}
          <div className="max-w-md mx-auto md:translate-x-12 bg-white border-2 border-black neo-shadow rotate-[2deg] overflow-hidden">
             {projectImages.hero.titleImage ? (
                <img src={projectImages.hero.titleImage} alt="Terez Frecerová" className="w-full h-auto aspect-[3/2] object-cover" />
             ) : (
                <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center p-6 text-center border border-dashed border-gray-300">
                   <p className="font-mono text-sm text-gray-500">
                     Title Image Placeholder (3:2 Aspect Ratio)
                   </p>
                </div>
             )}
          </div>
        </div>
      </section>

      {/* 2. LATEST ALBUM (Mala by som nieco robit) */}
      <section id="music" className="border-b-2 border-black">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Visual Side */}
          <div className={`md:w-1/2 p-10 flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black ${album.color} relative overflow-hidden`}>
            {projectImages.malaBySom.background ? (
              <img src={projectImages.malaBySom.background} alt="Album Background" className="absolute inset-0 w-full h-full object-cover z-0" />
            ) : (
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Disc size={400} className="absolute -right-20 -bottom-20 animate-spin-slow" />
              </div>
            )}
            
            <div className="relative w-full max-w-md aspect-square bg-white border-2 border-black neo-shadow-lg flex items-center justify-center group overflow-hidden z-10">
               {/* Album Art Placeholder or Image */}
               {projectImages.malaBySom.cover ? (
                 <img src={projectImages.malaBySom.cover} alt="Album Cover" className="w-full h-full object-cover" />
               ) : (
                 <div className="text-center p-8">
                   <Disc size={80} className="mx-auto mb-4" />
                   <h3 className="font-syne font-bold text-3xl uppercase leading-none mb-2">{album.title}</h3>
                   <p className="font-mono text-xs uppercase tracking-widest">Slnko Records</p>
                 </div>
               )}
               
               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <a href={album.link} target="_blank" rel="noreferrer" className="bg-lime-300 text-black font-mono font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                   Kúpiť <ExternalLink size={16}/>
                 </a>
               </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="md:w-1/2 p-10 md:p-20 bg-white flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 font-mono font-bold text-sm mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              NAJNOVŠÍ ALBUM ({album.year})
            </div>
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl mb-6 leading-none">
              Mala by som niečo robiť
            </h2>
            <p className="font-mono text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {album.desc}
            </p>
            <div className="flex flex-wrap gap-4">
               <a href={album.link} target="_blank" rel="noreferrer" className="bg-black text-white font-mono px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all neo-shadow-sm">
                 Spotify
               </a>
               <a href={album.tidalLink} target="_blank" rel="noreferrer" className="bg-black text-white font-mono px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all neo-shadow-sm">
                 Tidal
               </a>
               <a href={album.link} target="_blank" rel="noreferrer" className="bg-white text-black font-mono px-6 py-3 border-2 border-black hover:bg-orange-100 transition-all neo-shadow-sm">
                 Kúpiť na Slnko Records
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONCERTS SECTION (Upcoming & Archive) */}
      <section id="concerts" className="py-20 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Upcoming Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6" />
                <span className="font-mono font-bold text-sm tracking-widest text-blue-600 uppercase">Tour</span>
              </div>
              <h2 className="font-syne font-extrabold text-5xl md:text-7xl">Najbližšie koncerty</h2>
            </div>
            <div className="font-mono text-sm text-gray-500 max-w-xs text-right hidden md:block">
              Lístky dostupné aj na mieste.
            </div>
          </div>

          {/* Upcoming List */}
          <div className="mb-24">
            {upcoming.length > 0 ? (
              <>
                {upcoming.map((gig, idx) => (
                  <div 
                    key={idx} 
                    className="group relative border-t-2 border-black py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-lime-50 transition-colors"
                  >
                    <div className="md:w-1/4">
                      <span className="font-syne font-bold text-3xl md:text-4xl">{gig.displayDate}</span>
                      <span className="font-mono text-sm text-gray-500 block">{gig.displayYear}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-mono font-bold text-xl md:text-2xl uppercase mb-1">{gig.venue}</h3>
                      <div className="flex items-center gap-2 text-gray-600 font-sans">
                        <MapPin size={16} />
                        {gig.city}
                      </div>
                    </div>

                    <div className="md:w-1/4 flex justify-start md:justify-end">
                      <a href={gig.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono font-bold border-2 border-black bg-white px-6 py-2 hover:bg-black hover:text-white transition-all neo-shadow-sm group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]">
                        Lístky <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                ))}
                <div className="border-t-2 border-black"></div>
              </>
            ) : (
              <div className="py-8 text-center font-mono text-gray-500 border-t-2 border-b-2 border-black">
                Momentálne nie sú naplánované žiadne koncerty.
              </div>
            )}
          </div>

          {/* Past Archive Header */}
          <div className="flex items-center gap-4 mb-8">
            <Camera className="w-8 h-8" />
            <h2 className="font-syne font-bold text-3xl md:text-4xl">Archív</h2>
          </div>

          {/* Past Archive Grid - Horizontal Scroll */}
          <div className="w-full overflow-x-auto no-scrollbar pb-6">
            <div className="flex gap-4 min-w-full w-max">
              {past.map((gig, idx) => (
                <a key={idx} href={gig.link} target="_blank" rel="noreferrer" className="group relative cursor-pointer min-w-[280px] md:min-w-[320px] shrink-0 block">
                  {/* Clean Image Container */}
                  <div className={`w-full aspect-square ${gig.imgColor} border-2 border-black flex items-center justify-center overflow-hidden relative transition-all group-hover:neo-shadow`}>
                     {/* Image Placeholder - User can replace bg color with <img src={gig.photoUrl} /> */}
                     {gig.photoUrl ? (
                        <img src={gig.photoUrl} alt={gig.venue} className="absolute inset-0 w-full h-full object-cover z-10"/>
                     ) : (
                       <>
                         <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
                         <Music className="opacity-20 text-black group-hover:scale-110 transition-transform" size={40} />
                       </>
                     )}
                     
                     {/* Overlay Text */}
                     <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t-2 border-black translate-y-full group-hover:translate-y-0 transition-transform z-20">
                       <p className="font-mono font-bold text-xs">{gig.displayDate} {gig.displayYear}</p>
                       <p className="font-syne font-bold text-sm truncate">{gig.venue}</p>
                     </div>
                     
                     {/* Gallery Icon Indicator */}
                     <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-black p-1">
                       <ArrowUpRight size={14} />
                     </div>
                  </div>
                </a>
              ))}
            </div>
            {/* Scroll hint if needed */}
            <div className="hidden md:flex justify-end mt-2 font-mono text-xs text-gray-500 animate-pulse">
              Scroll pre viac →
            </div>
          </div>

        </div>
      </section>

      {/* Projects Container (Reordered & Resized) */}
      <div id="projects">

        {/* 4. RAPIKY MLADEJ MATERE (Redesigned: Clean Manuscript Style) */}
        <section className="relative min-h-[50vh] bg-[#fdf8e8] border-b-2 border-black flex flex-col md:flex-row overflow-hidden">
           {/* Decorative Typewriter Elements - Visible if no bg, or on top */}
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <FileText size={300} strokeWidth={0.5} />
           </div>
           
           <div className="md:w-1/2 p-12 flex flex-col justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-black z-10">
             <div className="relative z-10">
               <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 mb-4 block">
                 Básnická zbierka • {projects[2].publisher}
               </span>
               <h2 className="font-mono font-bold text-4xl md:text-6xl mb-6 tracking-tight text-gray-900 leading-tight">
                 Rapíky <br/> mladej matere
               </h2>
               <div className="w-12 h-1 bg-black mb-6"></div>
               <p className="font-serif italic text-xl leading-relaxed text-gray-700 mb-8 max-w-md">
                 {projects[2].desc}
               </p>
               <a href={projects[2].link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm font-bold border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
                 To chcem <ArrowUpRight size={16} />
               </a>
             </div>
           </div>

           <div className="md:w-1/2 relative flex items-center justify-center p-12 overflow-hidden">
             {/* EDIT 1: Background image moved HERE to be under the right-hand photo only */}
             {projectImages.rapiky.background && (
                <img src={projectImages.rapiky.background} alt="Rapiky Background" className="absolute inset-0 w-full h-full object-cover opacity-50 z-0" />
             )}

             {/* Abstract visual: Book/Page or Image */}
             <div className="relative z-10 w-64 h-80 bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(200,200,200,1)] flex flex-col items-center justify-center p-0 text-center overflow-hidden">
                {projectImages.rapiky.cover ? (
                  <img src={projectImages.rapiky.cover} alt="Rapiky Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden p-6">
                     <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 to-transparent"></div>
                     <BookOpen size={48} className="text-gray-300 mb-4" />
                     <p className="font-mono text-[10px] text-gray-400">STRANA 42</p>
                  </div>
                )}
             </div>
           </div>
        </section>

        {/* 5. LSDOLINA (Slightly Smaller) */}
        <section className="relative min-h-[60vh] text-indigo-100 border-b-2 border-black overflow-hidden flex flex-col md:flex-row items-center">
          
          {/* Decoupled Background Layer - Image Placeholder */}
          <div className="absolute inset-0 z-0">
             {projectImages.lsdolina.background ? (
               <img src={projectImages.lsdolina.background} alt="LSDolina Background" className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full bg-indigo-900">
                 {/* Background FX */}
                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-purple-600 rounded-full blur-[80px] opacity-30 mix-blend-screen animate-pulse"></div>
                 </div>
               </div>
             )}
          </div>

          {/* Massive Background Title Layer - Sitting behind everything */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
             <h2 className="font-bubbly text-[23vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-900 opacity-60 transform -rotate-3 blur-[1px] w-full text-center">
               LSDOLINA
             </h2>
          </div>

          <div className="md:w-2/5 p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-10 min-h-[400px]">
             
             {/* Header Group with Icon + Blob Tag */}
             <div className="flex items-center justify-center md:justify-start gap-4 mb-12 float-anim bg-indigo-900/40 backdrop-blur-sm p-4 rounded-full">
               <Headphones size={48} className="text-pink-300" />
               
               <div className="blob-shape bg-indigo-800/80 border-2 border-indigo-400 px-4 py-1">
                 <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-200">
                   Podcast
                 </span>
               </div>
             </div>
             
             {/* Compact Buttons */}
             <div className="flex flex-col gap-3 w-auto items-center md:items-start mt-auto">
               <a href={projects[1].link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-full font-mono text-sm font-bold transition-all hover:scale-105 w-full md:w-auto shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                 Spotify <Zap size={14} className="fill-black text-black"/>
               </a>
               <a href={projects[1].soundcloudLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-full font-mono text-sm font-bold transition-all hover:scale-105 border-2 border-transparent w-full md:w-auto shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                 Soundcloud <Cloud size={14} className="fill-orange-500 text-orange-500"/>
               </a>
             </div>
          </div>

          <div className="md:w-3/5 p-12 flex items-center relative z-10">
             {/* Highlighted text directly using a span with background color */}
             <p className="font-mono text-lg md:text-2xl font-bold leading-[2.3] max-w-xl">
               <span className="bg-lime-300 text-black px-2 py-0.5 box-decoration-clone">
                 {projects[1].desc}
               </span>
             </p>
          </div>
        </section>

        {/* 6. SMIESNA OSOBNA DRAMA (Slightly Smaller) */}
        <section className="relative min-h-[50vh] flex flex-col md:flex-row border-b-2 border-black overflow-hidden bg-white">
           {/* Background Image Placeholder for Green Area */}
           <div className="absolute top-0 right-0 w-full h-full md:w-1/2 bg-emerald-300 md:clip-diagonal z-0 overflow-hidden">
             {projectImages.smiesna.background && (
               <img src={projectImages.smiesna.background} alt="Drama Background" className="w-full h-full object-cover" />
             )}
           </div>

           <div className="relative z-10 w-full flex flex-col md:flex-row">
             <div className="md:w-1/2 p-10 flex flex-col justify-center">
               <div className="bg-black text-white inline-block self-start px-3 py-1 font-mono font-bold text-sm mb-4 rotate-[-2deg]">
                 {projects[0].category}
               </div>
               <h2 className="font-syne font-extrabold text-4xl md:text-6xl leading-[0.9] mb-6 text-black">
                 SMIEŠNA <br/> OSOBNÁ <br/> <span className="text-stroke-black">DRÁMA</span>
               </h2>
               <p className="font-mono text-sm bg-white/90 p-4 border-2 border-black neo-shadow max-w-sm mb-6">
                 {projects[0].desc}
               </p>
               <a href={projects[0].link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold font-mono hover:underline decoration-2">
                 Chcem pre kamaráta <ArrowUpRight size={18} />
               </a>
             </div>
             
             {/* EDIT 3: Removed BookOpen symbol */}
             <div className="md:w-1/2 relative flex items-center justify-center p-10 pointer-events-none">
             </div>
           </div>
        </section>

      </div>

      {/* 7. FOOTER / CONTACT */}
      <section id="contact" className="py-20 px-6 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-300 via-purple-300 to-blue-300"></div>

        <h2 className="font-syne font-bold text-5xl md:text-8xl mb-12 leading-tight">
          Booking
        </h2>

        <div className="flex flex-col items-center gap-6 mb-16">
           <a href="mailto:terez.frecerova@gmail.com" className="group flex items-center gap-3 text-xl md:text-3xl font-mono transition-colors border-2 border-white px-8 py-4 rounded-full hover:bg-lime-300 hover:border-lime-300 hover:text-black">
             <Mail className="group-hover:animate-bounce" /> terez.frecerova@gmail.com
           </a>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          <a href="https://www.instagram.com/cincin.terezit/" target="_blank" rel="noreferrer" className="hover:text-purple-300 transition-transform hover:scale-110"><Instagram size={32} /></a>
          <a href="https://www.facebook.com/terezia.frecerova" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-transform hover:scale-110"><Facebook size={32} /></a>
          <a href="https://open.spotify.com/artist/43CJ3Ot90JF7M2j1wTAYlf" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-transform hover:scale-110"><Headphones size={32} /></a>
        </div>

        <footer className="font-mono text-xs text-gray-500 flex flex-col md:flex-row justify-center items-center gap-4">
          <p>© {new Date().getFullYear()} Terez Frecerová.</p>
          <span className="hidden md:inline">•</span>
          <p>Praha & Špania Dolina</p>
        </footer>
      </section>

      {/* Simple Image Modal Placeholder */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-8 right-8 text-white hover:text-lime-300" onClick={() => setSelectedImage(null)}>
            <X size={40} />
          </button>
          <div className="max-w-4xl w-full bg-white border-2 border-lime-300 p-2" onClick={(e) => e.stopPropagation()}>
             <div className={`aspect-video w-full ${selectedImage.imgColor} flex items-center justify-center overflow-hidden`}>
                {/* Modal Image */}
                {selectedImage.photoUrl ? (
                  <img src={selectedImage.photoUrl} alt={selectedImage.venue} className="w-full h-full object-cover" />
                ) : (
                  <p className="font-mono font-bold text-xl">Galéria obrázkov pre {selectedImage.venue}</p>
                )}
             </div>
             <div className="bg-black text-white p-4 font-mono flex justify-between items-center">
               <span>{selectedImage.displayDate} {selectedImage.displayYear} - {selectedImage.venue}</span>
               <div className="flex gap-4">
                 <ChevronLeft className="cursor-pointer hover:text-lime-300"/>
                 <ChevronRight className="cursor-pointer hover:text-lime-300"/>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;