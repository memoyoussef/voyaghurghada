const TRIPS = [
{id:1,title:"Excursion privée au Caire",location:"Hurghada",destination:"Le Caire",category:"Excursions culturelles",price:100,duration:"Journée complète",image:"images/cairo-pyramids.jpg",description:"Découvrez les pyramides de Gizeh et les trésors du Caire."},
{id:2,title:"Excursion privée à Louxor",location:"Hurghada",destination:"Louxor",category:"Excursions culturelles",price:85,duration:"Journée complète",image:"images/luxor-karnak.jpg",description:"Explorez les temples de Karnak et les merveilles de Louxor."},
{id:3,title:"Nager avec les dauphins",location:"Hurghada",destination:"Hurghada",category:"Mer & snorkeling",price:40,duration:"4 à 5 heures",image:"images/red-sea-dolphins.jpg",description:"Partez en mer à la découverte des dauphins de la mer Rouge."},
{id:4,title:"Quad Tour & balade à dos de chameau",location:"Hurghada",destination:"Hurghada",category:"Safari & désert",price:60,duration:"3 heures",image:"images/quad-desert.jpg",description:"Découvrez les paysages du désert lors d'une aventure en quad."},
{id:5,title:"Excursion au Caire en avion",location:"Hurghada",destination:"Le Caire",category:"Excursions culturelles",price:280,duration:"Journée complète",image:"images/cairo-plane.jpg",description:"Découvrez les incontournables du Caire lors d'une excursion en avion."},
{id:6,title:"Speed Boat – Orange Bay",location:"Hurghada",destination:"Hurghada",category:"Mer & snorkeling",price:31,duration:"Demi-journée",image:"images/orange-bay-speedboat.jpg",description:"Profitez des eaux turquoise et des paysages d'Orange Bay."},
{id:7,title:"Super Safari",location:"Hurghada",destination:"Hurghada",category:"Safari & désert",price:60,duration:"Après-midi et soirée",image:"images/super-safari.jpg",description:"Vivez une aventure dans le désert égyptien."},
{id:8,title:"Safari Jeep 4×4",location:"Hurghada",destination:"Hurghada",category:"Safari & désert",price:40,duration:"Environ 5 heures",image:"images/jeep-safari.jpg",description:"Explorez le désert à bord d'un véhicule tout-terrain."},
{id:9,title:"Snorkeling à Hula Hula Island",location:"Hurghada",destination:"Hurghada",category:"Mer & snorkeling",price:23,duration:"Journée en mer",image:"images/red-sea-snorkeling.jpg",description:"Une journée de baignade et de découverte des récifs coralliens."},
{id:10,title:"Le Caire en avion — départ matinal",location:"Hurghada",destination:"Le Caire",category:"Excursions culturelles",price:285,duration:"Journée complète",image:"images/cairo-plane.jpg",description:"Formule aérienne avec départ matinal."},
{id:11,title:"Le Caire en avion — départ tardif",location:"Hurghada",destination:"Le Caire",category:"Excursions culturelles",price:305,duration:"Journée complète",image:"images/cairo-pyramids.jpg",description:"Formule aérienne avec départ tardif."},
{id:12,title:"Le Caire & Louxor en avion — 2 jours",location:"Hurghada",destination:"Le Caire & Louxor",category:"Circuits privés",price:459,duration:"2 jours",image:"images/luxor-karnak.jpg",description:"Circuit combiné de deux jours."},
{id:13,title:"Île Paradise en speed boat privé & snorkeling",location:"Hurghada",destination:"Île Paradise",category:"Mer & snorkeling",price:44,duration:"Selon la formule confirmée",image:"images/orange-bay-speedboat.jpg",description:"Sortie en bateau rapide privé vers Paradise Island."},
{id:14,title:"Sortie dauphins en speed boat privé & snorkeling",location:"Hurghada",destination:"Mer Rouge",category:"Mer & snorkeling",price:36,duration:"Selon la formule confirmée",image:"images/red-sea-dolphins.jpg",description:"Sortie en speed boat privé pour rechercher les dauphins."},
{id:15,title:"Orange Bay en speed boat privé & snorkeling",location:"Hurghada",destination:"Orange Bay",category:"Mer & snorkeling",price:36,duration:"Selon la formule confirmée",image:"images/orange-bay-speedboat.jpg",description:"Sortie en speed boat privé vers Orange Bay."},
{id:16,title:"Île de Hula Hula en speed boat privé",location:"Hurghada",destination:"Hula Hula Island",category:"Mer & snorkeling",price:36,duration:"Selon la formule confirmée",image:"images/red-sea-snorkeling.jpg",description:"Sortie en speed boat privé vers Hula Hula Island."}
];
const money = n => `${n} €`;
const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function initDetail(){
 const id = Number(new URLSearchParams(location.search).get("id"));
 const trip = TRIPS.find(x=>x.id===id);
 const root=document.querySelector("#detail-root");
 document.querySelector("#detail-year").textContent=new Date().getFullYear();
 if(!trip){root.innerHTML='<section class="detail-error"><h1>Excursion introuvable</h1><p>Cette excursion n’existe pas ou le lien est incorrect.</p><a class="button button-dark" href="index.html#excursions">Voir toutes les excursions</a></section>';return;}
 let data={};
 try{const r=await fetch("trip-details.json");if(!r.ok)throw Error("data");const all=await r.json();data=all[id]||{};}catch(e){data={subtitle:trip.description,intro:trip.description,highlights:[],itinerary:[],note:"Contactez-nous pour recevoir le programme détaillé."};}
 document.title=`${trip.title} dès ${money(trip.price)} | VoyagHurghada`;
 document.querySelector('meta[name="description"]').content=`${trip.title} au départ de ${trip.location}. ${data.subtitle||trip.description} Tarif à partir de ${money(trip.price)}.`;
 const highlights=(data.highlights||[]).map(x=>`<li><span>✓</span>${esc(x)}</li>`).join("");
 const itinerary=(data.itinerary||[]).map((x,i)=>`<article class="timeline-item"><span class="timeline-number">${String(i+1).padStart(2,"0")}</span><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></article>`).join("");
 root.innerHTML=`
 <div class="detail-breadcrumb"><a href="index.html">Accueil</a><span> / </span><a href="index.html#excursions">Excursions</a><span> / </span><b>${esc(trip.title)}</b></div>
 <section class="detail-hero">
  <img src="${esc(trip.image)}" alt="${esc(trip.title)}" onerror="this.src='https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=85'">
  <div class="detail-hero-shade"></div><div class="detail-hero-copy"><p class="eyebrow"><span></span>${esc(data.eyebrow||trip.category)}</p><h1>${esc(trip.title)}</h1><p>${esc(data.subtitle||trip.description)}</p><div class="detail-pills"><span>Départ : ${esc(trip.location)}</span><span>Durée : ${esc(trip.duration)}</span><span>${esc(trip.category)}</span></div></div>
 </section>
 <div class="detail-layout">
  <div class="detail-main">
   <section class="detail-section"><p class="detail-kicker">À PROPOS DE CETTE EXCURSION</p><h2>Découvrez l’expérience</h2><p class="detail-lead">${esc(data.intro||trip.description)}</p></section>
   <section class="detail-section"><p class="detail-kicker">LES POINTS FORTS</p><h2>Ce qui vous attend</h2><ul class="highlight-list">${highlights}</ul></section>
   <section class="detail-section"><p class="detail-kicker">VOTRE JOURNÉE</p><h2>Programme indicatif</h2><div class="timeline">${itinerary}</div><p class="detail-disclaimer">Le déroulement est indicatif. L’ordre des visites et les horaires peuvent varier selon la saison, la circulation, la météo et l’organisation confirmée.</p></section>
   <section class="detail-section practical"><p class="detail-kicker">AVANT DE RÉSERVER</p><h2>Informations pratiques</h2><div class="practical-grid"><div><b>Lieu de départ</b><span>${esc(trip.location)}</span></div><div><b>Destination</b><span>${esc(trip.destination)}</span></div><div><b>Durée annoncée</b><span>${esc(trip.duration)}</span></div><div><b>Tarif affiché</b><span>À partir de ${money(trip.price)} / personne ou formule, selon confirmation</span></div></div><div class="confirm-note"><strong>Prestations & conditions à confirmer</strong><p>${esc(data.note||"Les prestations comprises, les frais supplémentaires, les horaires et les conditions applicables seront précisés dans la confirmation personnalisée.")}</p></div></section>
   <section class="detail-section faq"><p class="detail-kicker">RÉSERVATION</p><h2>Questions utiles</h2><details><summary>Le prix affiché est-il définitif ?</summary><p>Le prix indiqué est un tarif de départ. Le montant final et les prestations incluses sont confirmés avec vous avant toute réservation.</p></details><details><summary>Dois-je payer en ligne ?</summary><p>Non. Le site recueille une demande de réservation. Aucun paiement en ligne n’est demandé ; l’équipe confirme les disponibilités et les modalités directement avec vous.</p></details><details><summary>Comment confirmer la date ?</summary><p>Envoyez votre demande avec la date et le nombre de participants. Nous vous recontacterons pour confirmer la disponibilité.</p></details></section>
  </div>
  <aside class="detail-booking" id="booking-detail"><div class="booking-sticky"><p class="detail-kicker">VOTRE EXCURSION</p><h2>${esc(trip.title)}</h2><p class="detail-price-label">À partir de</p><p class="detail-price">${money(trip.price)}</p><div class="booking-facts"><span>⌖ ${esc(trip.location)}</span><span>◷ ${esc(trip.duration)}</span></div><a class="button button-gold detail-book-button" href="https://wa.me/201285248835?text=${encodeURIComponent("Bonjour VoyagHurghada ! Je souhaite demander une réservation pour : "+trip.title+". Date souhaitée : ____. Nombre de personnes : ____. Merci de confirmer la disponibilité, le prix final et les prestations incluses.")}" target="_blank" rel="noopener">Demander cette excursion ↗</a><a class="detail-email" href="mailto:info@voyaghurghada.com?subject=${encodeURIComponent("Demande – "+trip.title)}">Ou par e-mail</a><p class="booking-small">Demande sans paiement en ligne. Disponibilité, tarif final et détails confirmés avant réservation.</p></div></aside>
 </div>
 <section class="related-excursions"><div><p class="detail-kicker">CONTINUEZ À EXPLORER</p><h2>Découvrez aussi nos autres excursions</h2></div><a class="button button-dark" href="index.html#excursions">Toutes les excursions ↗</a></section>`;
}
document.addEventListener("DOMContentLoaded",initDetail);
