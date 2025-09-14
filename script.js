// Basic script to verify configuration
fetch('site.json')
  .then((response) => response.json())
  .then((config) => {
    console.log('Loaded site config:', config);
  })
  .catch((err) => {
    console.error('Failed to load config', err);
  });

// Add scroll-triggered animations for elements with the `reveal` class
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});



<script src="https://www.instagram.com/embed.js" async></script>
<script>
const IG_POSTS = [
  "https://www.instagram.com/p/DNi39eBIJHB/",
  "https://www.instagram.com/p/DLDQ3F_y-Hf/",
  "https://www.instagram.com/p/DLAlNeby99y/"
];

let ix=0, timer=null, activeSlot='A';
const slotA=document.getElementById('slotA');
const slotB=document.getElementById('slotB');
const dotsEl=document.getElementById('ig-dots');
const DURATION=9000;

function buildDots(){
  dotsEl.innerHTML='';
  IG_POSTS.forEach((_,i)=>{
    const b=document.createElement('button');
    b.className='ig-dot'; b.type='button'; b.setAttribute('role','tab');
    b.setAttribute('aria-label','Objava '+(i+1));
    const inner=document.createElement('i'); b.appendChild(inner);
    b.onclick=()=>{stopAuto();render(i);startAuto();};
    dotsEl.appendChild(b);
  });
  setActiveDot(0,true);
}
function setActiveDot(i,reset=false){
  [...dotsEl.children].forEach((el,k)=>{
    el.classList.toggle('active',k===i);
    el.classList.remove('animate');
    if(k===i&&reset){void el.offsetWidth;el.classList.add('animate');}
  });
}

function buildEmbed(url){
  const bq=document.createElement('blockquote');
  bq.className="instagram-media";
  bq.setAttribute("data-instgrm-permalink",url);
  bq.setAttribute("data-instgrm-version","14");
  bq.style.cssText="margin:auto;max-width:540px;width:100%";
  const a=document.createElement('a');
  a.href=url;a.target="_blank";a.rel="noopener";a.textContent="Otvori na Instagramu";
  a.style.cssText="display:block;text-align:center;padding:10px 0;opacity:0;pointer-events:none;";
  bq.appendChild(a);
  return bq;
}
function processEmbeds(){ if(window.instgrm&&window.instgrm.Embeds) window.instgrm.Embeds.process(); }
function whenEmbedReady(slot){
  return new Promise(res=>{
    const check=()=>res();
    let ifr=slot.querySelector('iframe');
    if(ifr){ifr.addEventListener('load',check,{once:true});return;}
    const mo=new MutationObserver(()=>{
      ifr=slot.querySelector('iframe');
      if(ifr){mo.disconnect();ifr.addEventListener('load',check,{once:true});}
    });
    mo.observe(slot,{childList:true,subtree:true});
  });
}
async function render(next){
  const prev=activeSlot==='A'?slotA:slotB;
  const nxt=activeSlot==='A'?slotB:slotA;
  ix=(next+IG_POSTS.length)%IG_POSTS.length;
  nxt.className='ig-slide';nxt.innerHTML='';
  nxt.appendChild(buildEmbed(IG_POSTS[ix]));
  processEmbeds();
  await whenEmbedReady(nxt);
  prev.classList.remove('active','ready');
  nxt.classList.add('active','ready');
  const aTag=nxt.querySelector('a'); if(aTag){aTag.style.opacity='1';aTag.style.pointerEvents='auto';}
  activeSlot=activeSlot==='A'?'B':'A';
  setActiveDot(ix,true);
}
function startAuto(){stopAuto();timer=setInterval(()=>render(ix+1),DURATION);}
function stopAuto(){if(timer)clearInterval(timer);timer=null;}

const stage=document.querySelector('.ig-stage');
stage.addEventListener('mouseenter',stopAuto);
stage.addEventListener('mouseleave',startAuto);
stage.addEventListener('touchstart',stopAuto,{passive:true});
stage.addEventListener('touchend',startAuto,{passive:true});

buildDots();render(0).then(startAuto);
</script>
