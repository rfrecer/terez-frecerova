import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { Music, BookOpen, ArrowUpRight, Mail, Instagram, Facebook, Calendar, Disc, MapPin, ExternalLink, Camera, Headphones, Zap, Cloud } from 'lucide-react';
import {
  artistName,
  projectImages,
  rawConcerts,
  album,
  getProjectById,
  navItems,
} from './data/siteData';

const Navbar = ({ navItems, activeSection, scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-12 left-0 right-0 z-[60] transition-all duration-300 px-4 md:px-8 flex justify-center pointer-events-none`}>
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
  );
};

const Marquee = () => (
  <div className="bg-lime-300 text-black py-2 font-mono text-sm border-b-2 border-black overflow-hidden relative z-50">
    <div className="marquee-container">
      <div className="marquee-content font-bold flex items-center">
        <a href="https://www.youtube.com/watch?v=dzXfDRHVnE0&list=RDdzXfDRHVnE0&start_radio=1" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ KONCERT S TANTE ELZE v :POPO_FM
        </a>
        <a href="https://www.instagram.com/p/DVRIJX_DKg1/?img_index=1" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ ALBUM "MALA BY SOM NIEČO ROBIŤ" NA RADIO_HEAD AWARDS 2025
        </a>
        <span className="mx-4">✿ ČEKNI JARNÉ KONCERTY</span>
        <a href="https://soundcloud.com/terezia-frecerova/lsdolina-katarina-janeckova-walshe-trip-nam-pomohol-vo-vztahu-35" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ VYPOČUJ SI LSDOLINU S KATARÍNOU JANEČKOVOU WALSHE
        </a>
        <a href="https://www.mujrozhlas.cz/artcafe/debut-hudebnice-terez-frecerove-prinasi-autenticitu-zivota-lehouckou-ironii-i-trapove-beaty" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ ROZHOVOR V ARTCAFÉ NA RÁDIU VLTAVA
        </a>
        <span className="mx-4">✿ BIČ PLIESKA NA KONCI</span>
        <a href="https://www.youtube.com/watch?v=dzXfDRHVnE0&list=RDdzXfDRHVnE0&start_radio=1" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ KONCERT S TANTE ELZE v :POPO_FM
        </a>

        <a href="https://www.instagram.com/p/DVRIJX_DKg1/?img_index=1" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ ALBUM "MALA BY SOM NIEČO ROBIŤ" NA RADIO_HEAD AWARDS 2025
        </a>
        <span className="mx-4">✿ ČEKNI JARNÉ KONCERTY</span>
        <a href="https://soundcloud.com/terezia-frecerova/lsdolina-katarina-janeckova-walshe-trip-nam-pomohol-vo-vztahu-35" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ VYPOČUJ SI LSDOLINU S KATARÍNOU JANEČKOVOU WALSHE
        </a>
        <a href="https://www.mujrozhlas.cz/artcafe/debut-hudebnice-terez-frecerove-prinasi-autenticitu-zivota-lehouckou-ironii-i-trapove-beaty" target="_blank" rel="noreferrer" className="mx-4 hover:underline decoration-black decoration-2 underline-offset-2">
          ✿ ROZHOVOR V ARTCAFÉ NA RÁDIU VLTAVA
        </a>
        <span className="mx-4">✿ BIČ PLIESKA NA KONCI</span>
      </div>
    </div>
  </div>
);

const HeroSection = ({ heroRef }) => (
  <section ref={heroRef} id="home" className="relative flex flex-col justify-center items-center px-6 pt-24 min-h-[90svh] border-b-2 border-black overflow-hidden noise-bg">
    <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div className="w-[80vw] h-[60vh] bg-white/70 blur-[80px] rounded-full mix-blend-screen"></div>
    </div>
    <div className="absolute top-20 left-10 md:left-20 animate-bounce delay-100 z-30 pointer-events-none">
       <div className="w-12 h-12 bg-yellow-400 rounded-full border-2 border-black"></div>
    </div>
    <div className="hidden md:block absolute bottom-40 right-10 md:right-20 animate-pulse z-30 pointer-events-none">
       <div className="w-16 h-16 bg-blue-400 rotate-45 border-2 border-black"></div>
    </div>

    <div className="relative z-30 pointer-events-none text-center w-full max-w-7xl mb-10">
      <h1 className="font-syne font-extrabold text-[8vw] 2xl:text-[10rem] leading-[0.85] tracking-tighter mb-8 text-black drop-shadow-sm">
        TEREZ <br /> FRECEROVÁ
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="bg-white border-2 border-black px-6 py-2 rounded-full font-mono text-sm md:text-base font-bold neo-shadow-sm rotate-[-2deg]">Spisovateľka</span>
        <span className="bg-lime-300 border-2 border-black px-6 py-2 rounded-full font-mono text-sm md:text-base font-bold neo-shadow-sm rotate-[1deg]">Pesničkárka</span>
        <span className="bg-purple-300 border-2 border-black px-6 py-2 rounded-full font-mono text-sm md:text-base font-bold neo-shadow-sm rotate-[-1deg]">Textárka</span>
      </div>
    </div>

    <Motion.div drag={window.innerWidth >= 768} dragConstraints={window.innerWidth >= 768 ? heroRef : undefined} className="relative z-10 w-full max-w-md mx-auto md:translate-x-12 bg-black border-2 border-black neo-shadow rotate-[2deg] overflow-hidden md:cursor-grab active:cursor-grabbing pointer-events-auto">
       <img src={projectImages.hero.large} alt={artistName} className="w-full h-auto aspect-[3/2] object-cover pointer-events-none" />
    </Motion.div>

    <Motion.div drag dragConstraints={heroRef} className="hidden md:block absolute z-20 w-64 lg:w-80 bottom-24 2xl:bottom-80 left-10 lg:left-20 2xl:left-40 bg-[#bef264] border-2 border-[#bef264] shadow-[6px_6px_0px_0px_#bef264] rotate-[-4deg] overflow-hidden cursor-grab active:cursor-grabbing pointer-events-auto">
       <img src={projectImages.hero.medium} alt={artistName} className="w-full h-auto aspect-square object-cover pointer-events-none" />
    </Motion.div>

    <Motion.div drag dragConstraints={heroRef} className="hidden lg:block absolute z-40 w-48 bottom-40 2xl:bottom-165 right-35 lg:right-45 2xl:right-60 bg-[#d8b4fe] border-2 border-[#d8b4fe] shadow-[6px_6px_0px_0px_#d8b4fe] rotate-[5deg] overflow-hidden cursor-grab active:cursor-grabbing pointer-events-auto">
       <img src={projectImages.hero.small} alt={artistName} className="w-full h-auto aspect-[4/5] object-cover pointer-events-none" />
    </Motion.div>
  </section>
);

const AlbumSection = () => (
  <section id="music" className="border-b-2 border-black">
    <div className="flex flex-col md:flex-row min-h-[60vh]">
      <div className={`md:w-1/2 p-10 flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black ${album.color} relative overflow-hidden`}>
        {projectImages.malaBySom.background ? (
          <img src={projectImages.malaBySom.background} alt="Album Background" className="absolute inset-0 w-full h-full object-cover z-0" />
        ) : (
          <div className="absolute inset-0 opacity-10 pointer-events-none"><Disc size={400} className="absolute -right-20 -bottom-20 animate-spin-slow" /></div>
        )}
        <div className="relative w-full max-w-md aspect-square bg-white border-2 border-black neo-shadow-lg flex items-center justify-center group overflow-hidden z-10">
           {projectImages.malaBySom.cover ? (
             <img src={projectImages.malaBySom.cover} alt="Album Cover" className="w-full h-full object-cover" />
           ) : (
             <div className="text-center p-8"><Disc size={80} className="mx-auto mb-4" /><h3 className="font-syne font-bold text-3xl uppercase leading-none mb-2">{album.title}</h3><p className="font-mono text-xs uppercase tracking-widest">Slnko Records</p></div>
           )}
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <a href={album.link} target="_blank" rel="noreferrer" className="bg-lime-300 text-black font-mono font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
               Kúpiť <ExternalLink size={16}/>
             </a>
           </div>
        </div>
      </div>
      <div className="md:w-1/2 p-10 md:p-20 bg-white flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 font-mono font-bold text-sm mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>NAJNOVŠÍ ALBUM ({album.year})
        </div>
        <h2 className="font-syne font-extrabold text-5xl md:text-7xl mb-6 leading-none">{album.title}</h2>
        <p className="font-mono text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">{album.desc}</p>
        <div className="flex flex-wrap gap-4">
           <a href={album.spotifyLink} target="_blank" rel="noreferrer" className="bg-black text-white font-mono px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all neo-shadow-sm">Spotify</a>
           <a href={album.tidalLink} target="_blank" rel="noreferrer" className="bg-black text-white font-mono px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all neo-shadow-sm">Tidal</a>
           <a href={album.link} target="_blank" rel="noreferrer" className="bg-white text-black font-mono px-6 py-3 border-2 border-black hover:bg-orange-100 transition-all neo-shadow-sm">Kúpiť na Slnko Records</a>
        </div>
      </div>
    </div>
  </section>
);

const ConcertArchive = ({ upcoming, past }) => (
  <section id="concerts" className="py-20 bg-white border-b-2 border-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="pl-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6" />
            <span className="font-mono font-bold text-sm tracking-widest text-blue-600 uppercase">Tour</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-7xl">Najbližšie koncerty</h2>
        </div>
        <div className="font-mono text-sm text-gray-500 max-w-xs text-right hidden md:block">Lístky dostupné aj na mieste.</div>
      </div>

      <div className="mb-24">
        {upcoming.length > 0 ? (
          <>
            {upcoming.map((gig, idx) => (
              <div key={idx} className="group relative border-t-2 border-black py-8 pl-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-lime-50 transition-colors">
                <div className="md:w-1/4">
                  <span className="font-syne font-bold text-3xl md:text-4xl">{gig.displayDate}</span>
                  <span className="font-mono text-sm text-gray-500 block">{gig.displayYear}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-mono font-bold text-xl md:text-2xl uppercase mb-1">{gig.venue}</h3>
                  <div className="flex items-center gap-2 text-gray-600 font-sans"><MapPin size={16} />{gig.city}</div>
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
          <div className="py-8 text-center font-mono text-gray-500 border-t-2 border-b-2 border-black">Momentálne nie sú naplánované žiadne koncerty.</div>
        )}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Camera className="w-8 h-8" />
        <h2 className="font-syne font-bold text-3xl md:text-4xl">Archív</h2>
      </div>

      <div className="w-full overflow-x-auto no-scrollbar pb-6">
        <div className="flex gap-4 min-w-full w-max">
          {past.map((gig, idx) => (
            <a key={idx} href={gig.link} target="_blank" rel="noreferrer" className="group relative cursor-pointer min-w-[280px] md:min-w-[320px] shrink-0 block">
              <div className={`w-full aspect-square ${gig.imgColor} border-2 border-black flex items-center justify-center overflow-hidden relative transition-all group-hover:neo-shadow`}>
                 {gig.photoUrl ? (
                    <img src={gig.photoUrl} alt={gig.venue} className="absolute inset-0 w-full h-full object-cover z-10"/>
                 ) : (
                   <>
                     <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
                     <Music className="opacity-20 text-black group-hover:scale-110 transition-transform" size={40} />
                   </>
                 )}
                 <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t-2 border-black translate-y-full group-hover:translate-y-0 transition-transform z-20">
                   <p className="font-mono font-bold text-xs">{gig.displayDate} {gig.displayYear}</p>
                   <p className="font-syne font-bold text-sm truncate">{gig.venue}</p>
                 </div>
                 <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-black p-1">
                   <ArrowUpRight size={14} />
                 </div>
              </div>
            </a>
          ))}
        </div>
        <div className="hidden md:flex justify-end mt-2 font-mono text-xs text-gray-500 animate-pulse">Scroll pre viac →</div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const rapiky = getProjectById('rapiky');
  const lsdolina = getProjectById('lsdolina');
  const smiesna = getProjectById('smiesna');

  return (
  <div id="projects">
    <section className="relative min-h-[50vh] bg-[#fdf8e8] border-b-2 border-black flex flex-col md:flex-row overflow-hidden">
       <div className="md:w-1/2 p-12 flex flex-col justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-black z-10">
         <div className="relative z-10">
           <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 mb-4 block">
             Básnická zbierka • {rapiky.publisher}
           </span>
           <h2 className="font-mono font-bold text-4xl md:text-6xl mb-6 tracking-tight text-gray-900 leading-tight">
             Rapíky <br/> mladej matere
           </h2>
           <div className="w-12 h-1 bg-black mb-6"></div>
           <p className="font-serif italic text-xl leading-relaxed text-gray-700 mb-8 max-w-md">
             {rapiky.desc}
           </p>
           <a href={rapiky.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm font-bold border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
             To chcem <ArrowUpRight size={16} />
           </a>
         </div>
       </div>

       <div className="md:w-1/2 relative flex items-center justify-center p-12 overflow-hidden">
         {projectImages.rapiky.background && (
            <img src={projectImages.rapiky.background} alt="Rapiky Background" className="absolute inset-0 w-full h-full object-cover opacity-50 z-0" />
         )}

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

    <section className="relative min-h-[60vh] text-indigo-100 border-b-2 border-black overflow-hidden flex flex-col md:flex-row items-center">
      <div className="absolute inset-0 z-0">
         {projectImages.lsdolina.background ? (
           <img src={projectImages.lsdolina.background} alt="LSDolina Background" className="w-full h-full object-cover" />
         ) : (
           <div className="w-full h-full bg-indigo-900">
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-purple-600 rounded-full blur-[80px] opacity-30 mix-blend-screen animate-pulse"></div>
             </div>
           </div>
         )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
         <h2 className="font-bubbly text-[23vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-900 opacity-60 transform -rotate-3 blur-[1px] w-full text-center">
           LSDOLINA
         </h2>
      </div>

      <div className="md:w-2/5 p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-10 min-h-[400px]">
         <div className="flex items-center justify-center md:justify-start gap-4 mb-12 float-anim bg-indigo-900/40 backdrop-blur-sm p-4 rounded-full">
           <Headphones size={48} className="text-pink-300" />
           <div className="blob-shape bg-indigo-800/80 border-2 border-indigo-400 px-4 py-1">
             <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-200">
               Podcast
             </span>
           </div>
         </div>

         <div className="flex flex-col gap-3 w-auto items-center md:items-start mt-auto">
           <a href={lsdolina.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-full font-mono text-sm font-bold transition-all hover:scale-105 w-full md:w-auto shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
             Spotify <Zap size={14} className="fill-black text-black"/>
           </a>
           <a href={lsdolina.soundcloudLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-full font-mono text-sm font-bold transition-all hover:scale-105 border-2 border-transparent w-full md:w-auto shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
             Soundcloud <Cloud size={14} className="fill-orange-500 text-orange-500"/>
           </a>
         </div>
      </div>

      <div className="md:w-3/5 p-12 flex items-center relative z-10">
         <p className="font-mono text-lg md:text-2xl font-bold leading-[2.3] max-w-xl">
           <span className="bg-lime-300 text-black px-2 py-0.5 box-decoration-clone">
             {lsdolina.desc}
           </span>
         </p>
      </div>
    </section>

    <section className="relative min-h-[50vh] flex flex-col md:flex-row border-b-2 border-black overflow-hidden bg-white">
       <div className="absolute top-0 right-0 w-full h-full md:w-1/2 bg-emerald-300 md:clip-diagonal z-0 overflow-hidden">
         {projectImages.smiesna.background && (
           <img src={projectImages.smiesna.background} alt="Drama Background" className="w-full h-full object-cover" />
         )}
       </div>

       <div className="relative z-10 w-full flex flex-col md:flex-row">
         <div className="md:w-1/2 p-10 flex flex-col justify-center">
           <div className="bg-black text-white inline-block self-start px-3 py-1 font-mono font-bold text-sm mb-4 rotate-[-2deg]">
             {smiesna.category}
           </div>
           <h2 className="font-syne font-extrabold text-4xl md:text-6xl leading-[0.9] mb-6 text-black">
             SMIEŠNA <br/> OSOBNÁ <br/> <span className="text-stroke-black">DRÁMA</span>
           </h2>
           <p className="font-mono text-sm bg-white/90 p-4 border-2 border-black neo-shadow max-w-sm mb-6">
             {smiesna.desc}
           </p>
           <a href={smiesna.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold font-mono hover:underline decoration-2">
             Chcem pre kamaráta <ArrowUpRight size={18} />
           </a>
         </div>
         <div className="md:w-1/2 relative flex items-center justify-center p-10 pointer-events-none">
         </div>
       </div>
    </section>
  </div>
  );
};

const ContactFooter = () => (
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
      <p>© {new Date().getFullYear()} {artistName}.</p>
      <span className="hidden md:inline">•</span>
      <p>Praha & Špania Dolina</p>
    </footer>
  </section>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef(null);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const up = [];
    const p = [];

    rawConcerts.forEach(concert => {
      const concertDate = new Date(concert.date);
      const displayDate = concertDate.toLocaleDateString('sk-SK', { day: 'numeric', month: 'short' }).toUpperCase();
      const displayYear = concertDate.getFullYear();

      const enhancedConcert = { ...concert, displayDate, displayYear };

      if (concertDate >= now) {
        up.push(enhancedConcert);
      } else {
        p.push(enhancedConcert);
      }
    });

    up.sort((a, b) => new Date(a.date) - new Date(b.date));
    p.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcoming: up, past: p };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-gray-900 font-sans selection:bg-lime-300 selection:text-black overflow-x-hidden">
      <Marquee />
      <Navbar navItems={navItems} activeSection={activeSection} scrollTo={scrollTo} />
      <HeroSection heroRef={heroRef} />
      <AlbumSection />
      <ConcertArchive upcoming={upcoming} past={past} />
      <ProjectsSection />
      <ContactFooter />
    </div>
  );
};

export default App;
