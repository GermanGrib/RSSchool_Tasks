!function(){var e={6175:function(){const e=document.querySelector(".burger"),t=(document.querySelector(".burger__line"),"burger"),s=document.querySelector(".navigation"),n=document.querySelectorAll(".navigation__link"),i=document.querySelector(".modal-background");function o(){const e=window.getComputedStyle(document.body).overflowY;document.body.style.overflowY="overlay"===e?"hidden":"overlay"}function r(){e.classList.remove("is-active"),s.classList.remove("block"),i.classList.remove("block"),o(),n.forEach((e=>e.removeEventListener("click",r))),i.removeEventListener("click",r)}e.addEventListener("click",(function(a){let l=a.target.classList;l.contains(t)&&e.classList.contains("is-active")||l.contains("burger__line")&&e.classList.contains("is-active")?r():(a.stopPropagation(),e.classList.add("is-active"),s.classList.add("block"),i.classList.add("block"),o(),n.forEach((e=>e.addEventListener("click",r))),i.addEventListener("click",r))}))}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,s),o.exports}!function(){"use strict";s(6175);var e=JSON.parse('[{"name":"Katrine","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsKatrine.jpg","type":"Cat","breed":"British Shorthair","description":"Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.","age":"6 months","alt":"british shorthair gray cat","inoculations":["panleukopenia"],"diseases":["none"],"parasites":["none"]},{"name":"Jennifer","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsJennifer.jpg","type":"Dog","breed":"Labrador","description":"Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.","age":"2 months","alt":"a puppy of labrador retriever","inoculations":["none"],"diseases":["none"],"parasites":["none"]},{"name":"Woody","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsWoody.jpg","type":"Dog","breed":"Golden Retriever","description":"Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.","age":"3 years 6 months","alt":"middle aged golden retriever","inoculations":["adenovirus","distemper"],"diseases":["right back leg mobility reduced"],"parasites":["none"]},{"name":"Sophia","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsSophia.jpg","type":"Dog","breed":"Shih tzu","description":"Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.","age":"1 month","alt":"a puppy of bichon Frize","inoculations":["parvovirus"],"diseases":["none"],"parasites":["none"]},{"name":"Scarlett","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsScarlett.jpg","type":"Dog","breed":"Jack Russell Terrier","description":"Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.","age":"3 months","alt":"a puppy of Jack russell terrier","inoculations":["parainfluenza"],"diseases":["none"],"parasites":["none"]},{"name":"Timmy","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsTimmy.jpg","type":"Cat","breed":"British Shorthair","description":"Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.","age":"2 years 3 months","alt":"middle aged cat of a british shorthair","inoculations":["calicivirus","viral rhinotracheitis"],"diseases":["kidney stones"],"parasites":["none"]},{"name":"Freddie","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsFreddie.jpg","type":"Cat","breed":"British Shorthair","description":"Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.","age":"2 months","alt":"european kitten","inoculations":["rabies"],"diseases":["none"],"parasites":["none"]},{"name":"Charly","src":"/germangrib-JSFE2023Q1/shelter/dist/assets/petsСharly.jpg","type":"Dog","breed":"Jack Russell Terrier","description":"This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.","age":"8 years","alt":"a grown up beagle dog","inoculations":["bordetella bronchiseptica","leptospirosis"],"diseases":["deafness","blindness"],"parasites":["lice","fleas"]}]');document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelectorAll(".swiper__pictures"),s=document.querySelector(".modal-background"),n=document.querySelector(".modal-aboutorphans"),i=document.querySelector(".modal-aboutorphans__closebtn");function o(t){const o=t.target.closest(".swiper__item");if(o){const l=o.querySelector(".swiper__title").innerHTML;if(l){!function(t){const s=document.querySelector(".animalinfo__title"),n=document.querySelector(".animalinfo__subtitle"),i=document.querySelector(".animalinfo__about"),o=document.querySelector(".animalinfo__item-age"),r=document.querySelector(".animalinfo__item-inoculations"),a=document.querySelector(".animalinfo__item-diseases"),l=document.querySelector(".animalinfo__item-parasites"),c=document.querySelector(".animalinfo__img");let d=e.filter((e=>e.name===t))[0];s.textContent=d.name,n.textContent=d.type+" - "+d.breed,i.textContent=d.description,o.textContent=d.age,r.textContent=d.inoculations.join(", "),a.textContent=d.diseases.join(", "),l.textContent=d.parasites.join(", "),c.src=d.src,c.alt=d.alt}(l),t.preventDefault(),s.classList.add("block"),n.classList.add("is-active");const o=window.innerHeight,c=window.innerWidth,d=n.offsetHeight,p=n.offsetWidth,u=window.pageYOffset||document.documentElement.scrollTop;let m=u+(o-d)/2,h=(window.pageXOffset||document.documentElement.scrollLeft)+(c-p)/2;n.style.top=m+"px",n.style.left=h+"px",s.style.top=u+"px",i.addEventListener("click",r),s.addEventListener("click",r),a()}}}function r(){s.style.top=0,s.classList.remove("block"),n.classList.remove("is-active"),i.removeEventListener("click",r),s.removeEventListener("click",r),a()}function a(){const e=window.getComputedStyle(document.body).overflowY;document.body.style.overflowY="overlay"===e?"hidden":"overlay"}t.forEach((e=>e.addEventListener("click",o)))}));const t=document.querySelector(".swiper__line"),n=document.querySelectorAll(".swiper__btn");let i=[...e],o=[],r=l();function a(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}function l(){const e=window.screen.width;let t;return t=e<=680?3:e<=890?6:8,t}function c(){const e=document.createElement("li");e.classList.add("swiper__item","swiper__item-pets");const t=document.createElement("div");t.classList.add("swiper__card");const s=document.createElement("img");s.classList.add("swiper__img");const n=document.createElement("h4");n.classList.add("swiper__title");const i=document.createElement("a");return i.href="#",i.classList.add("swiper__link","link","link-bordered"),i.innerHTML="Learn more",t.appendChild(s),t.appendChild(n),t.appendChild(i),e.appendChild(t),e}function d(){let e=parseInt(window.getComputedStyle(document.querySelector(".swiper__item-pets")).width)+parseInt(window.getComputedStyle(document.querySelector(".swiper__item-pets")).marginRight)+parseInt(window.getComputedStyle(document.querySelector(".swiper__item-pets")).marginLeft);return 3===r?e:6===r?e*(r/3)+60:e*(r/2)+56}function p(){const e=document.querySelector(".swiper__line"),t=document.querySelector(".paginbox__secondprevbtn-pets"),s=document.querySelector(".paginbox__prevbtn-pets"),n=document.querySelector(".paginbox__nextbtn-pets"),i=document.querySelector(".paginbox__secondnextbtn-pets");let o=d(),a=document.querySelector(".pagenumber-pets"),l=3===r?16:6===r?8:6;if(this.classList.contains("paginbox__secondprevbtn-pets")&&(a.innerHTML=1,e.style.left=0,window.innerWidth<=550&&(e.style.left="-5rem"),s.classList.add("disable"),t.classList.add("disable"),n.classList.remove("disable"),i.classList.remove("disable")),this.classList.contains("paginbox__prevbtn-pets")){let r=parseInt(a.innerHTML);const c=parseInt(window.getComputedStyle(e).left)+o;return e.style.left=c+"px",a.innerHTML=r-1,2===r&&(s.classList.add("disable"),t.classList.add("disable")),void(r===l&&(n.classList.remove("disable"),i.classList.remove("disable")))}if(this.classList.contains("paginbox__nextbtn-pets")){let r=parseInt(a.innerHTML);const c=parseInt(window.getComputedStyle(e).left)-o;return e.style.left=c+"px",s.classList.contains("disable")&&(s.classList.remove("disable"),t.classList.remove("disable")),a.innerHTML=r+1,void(r===l-1&&(n.classList.add("disable"),i.classList.add("disable")))}if(this.classList.contains("paginbox__secondnextbtn-pets")){a.innerHTML=l;let r=parseInt(a.innerHTML);e.style.left=-o*r+o+"px",window.innerWidth<=550&&(e.style.left=-o*r+o-50+"px"),n.classList.add("disable"),i.classList.add("disable"),s.classList.remove("disable"),t.classList.remove("disable")}}function u(){let e=t.querySelectorAll("ul");if(window.innerWidth<=768&&e.length>1)for(let s=1;s<e.length;s++){const n=e[s].querySelectorAll("li");for(let t=0;t<n.length;t++)e[0].appendChild(n[t]);t.removeChild(e[s])}}window.addEventListener("resize",(function(){const e=document.querySelector(".swiper__line"),t=document.querySelector(".paginbox__nextbtn-pets"),s=document.querySelector(".paginbox__secondnextbtn-pets"),n=document.querySelector(".pagenumber-pets");let i=document.querySelectorAll(".swiper__pictures-pets"),o=window.innerWidth,a=3===r?16:6===r?8:6;if(r=l(),o<=768&&+n.innerHTML<a&&(t.classList.remove("disable"),s.classList.remove("disable"),u()),o<=450){let t=d(),s=parseInt(n.innerHTML);e.style.left=-t*s+t-50+"px"}if(768===o){let t=d(),s=parseInt(n.innerHTML);e.style.left=-t*s+t+"px",u()}if(1280===o){let t=d(),s=parseInt(n.innerHTML);e.style.left=-t*s+t+"px"}o>=769&&1===i.length&&function(){const e=document.querySelector(".swiper__line"),t=document.querySelector(".swiper__pictures-pets"),s=document.querySelectorAll(".swiper__item-pets"),n=[];for(let s=0;s<5;s++){const s=t.cloneNode(!1);e.appendChild(s)}for(let e=0;e<s.length;e+=8)n.push(Array.from(s).slice(e,e+8));let i=document.querySelectorAll(".swiper__pictures-pets:not(:first-of-type)");n.forEach(((e,t)=>{if(t<i.length){const s=i[t];e.forEach((e=>s.appendChild(e)))}}))}(),o>=320&&+n.innerHTML>a&&(n.textContent=a)})),n.forEach((e=>e.addEventListener("click",p))),function(){for(let e=0;e<6;e++){const e=document.createElement("ul");e.classList.add("list-reset","swiper__pictures","swiper__pictures-pets"),t.appendChild(e),o.push(a([...i]))}let e=document.querySelectorAll(".swiper__pictures");for(let t=0;t<e.length;t++)for(let s=0;s<8;s++)e[t].appendChild(c());!function(){const e=document.querySelectorAll(".swiper__title");let t=document.querySelectorAll(".swiper__img");for(let s=0;s<o.length;s++){const n=o[s];for(let i=0;i<n.length;i++){const o=n[i];e[8*s+i].textContent=o.name,t[8*s+i].alt=o.alt,t[8*s+i].src=o.src}}}(),u()}(),console.log("HELO SWIPER")}()}();