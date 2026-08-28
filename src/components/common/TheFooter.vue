<template>
  <footer class="footer">

    <!-- ══ MAIN BODY ═══════════════════════════════════════════════════ -->
    <div class="container-custom footer__body">
      <div class="footer__grid">

        <!-- ── Brand column ──────────────────────────────────────────── -->
        <div class="footer__brand">
          <!-- Logo -->
          <div class="footer__logo">
            <div class="footer__logo-icon">
              <img src="@/assets/logos/logo.png" alt="GolaniSDA" class="w-10 h-10 object-contain" />
            </div>
            <div class="footer__logo-text">
              <p class="footer__logo-name">Golani SDA Church</p>
              <p class="footer__logo-sub">Kanisa la Waadventista wa Sabato</p>
            </div>
          </div>

          <p class="footer__tagline">
            <!--"Fundisheni mataifa yote ... hata mwisho wa dunia."-->
            <span class="footer__verse">— Mathayo 28:19–20</span>
          </p>

          <!-- Social icons -->
          <div class="footer__socials">
            <!-- Facebook -->
            <a :href="socials.facebook" target="_blank" aria-label="Facebook" class="footer__social-btn footer__social-btn--fb">
              <img src="/assets/icons/facebook.svg" alt="Facebook" class="footer__social-img"
                @error="(e) => e.target.replaceWith(fbSvg())" />
            </a>
            <!-- Instagram -->
            <a :href="socials.instagram" target="_blank" aria-label="Instagram" class="footer__social-btn footer__social-btn--ig">
              <img src="/assets/icons/instagram.svg" alt="Instagram" class="footer__social-img"
                @error="(e) => e.target.replaceWith(igSvg())" />
            </a>
            <!-- YouTube -->
            <a :href="socials.youtube" target="_blank" aria-label="YouTube" class="footer__social-btn footer__social-btn--yt">
              <img src="/assets/icons/youtube.svg" alt="YouTube" class="footer__social-img"
                @error="(e) => e.target.replaceWith(ytSvg())" />
            </a>
            <!-- WhatsApp -->
            <a :href="socials.whatsapp" target="_blank" aria-label="WhatsApp" class="footer__social-btn footer__social-btn--wa">
              <svg viewBox="0 0 24 24" fill="currentColor" class="footer__social-icon">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.858L0 24l6.335-1.51A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.76.896.957-3.654-.234-.375A9.818 9.818 0 1121.818 12 9.83 9.83 0 0112 21.818z"/>
              </svg>
            </a>
            <!-- TikTok -->
            <a :href="socials.tiktok" target="_blank" aria-label="TikTok" class="footer__social-btn footer__social-btn--tt">
              <svg viewBox="0 0 24 24" fill="currentColor" class="footer__social-icon">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.16 8.16 0 004.77 1.52V6.9a4.85 4.85 0 01-1-.21z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- ── Quick Links ─────────────────────────────────────────── -->
        <div>
          <h3 class="footer__heading">Quick Links</h3>
          <ul class="footer__links">
            <li v-for="link in quickLinks" :key="link.to">
              <RouterLink :to="link.to" class="footer__link">
                <span class="footer__link-arrow">›</span>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- ── Service Times ───────────────────────────────────────── -->
        <div>
          <h3 class="footer__heading">Nyakati za Ibada</h3>
          <div class="footer__services">
            <div v-for="svc in serviceTimes" :key="svc.name" class="footer__service">
              <p class="footer__service-name">{{ svc.name }}</p>
              <p class="footer__service-time">{{ svc.time }}</p>
            </div>
          </div>
          <!-- Location box -->
          <div class="footer__location-box">
            <div class="footer__location-row">
              <img src="/assets/icons/location.svg" alt="" class="footer__location-icon"
                @error="(e) => e.target.style.display='none'" />
              <div>
                <p class="footer__location-label">📍 Mahali</p>
                <p class="footer__location-name">Golani </p>
                <p class="footer__location-country">Tanzania</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Newsletter ─────────────────────────────────────────── -->
        <div>
          <h3 class="footer__heading">Endelea Kushirikiana</h3>
          <p class="footer__newsletter-desc">
            Pokea habari za wiki, matukio ya kanisa, na barua ya sala kila wiki.
          </p>
          <div class="footer__contact-list">
            <p class="footer__contact-item">📞 +255 755 794664</p>
            <p class="footer__contact-item">✉️ info@golanisda.org</p>
          </div>
          <form @submit.prevent="subscribe" class="footer__subscribe-form">
            <input
              v-model="email"
              type="email"
              placeholder="Barua pepe yako"
              required
              class="footer__subscribe-input"
            />
            <button type="submit" class="footer__subscribe-btn">
              {{ subscribed ? '✓' : '→' }}
            </button>
          </form>
          <p v-if="subscribed" class="footer__subscribed-msg">
            ✓ Asante! Utapokea habari zetu.
          </p>
        </div>
      </div>
    </div>

    <!-- ══ BOTTOM BAR — matches poster bottom strip ═════════════════════ -->
    <div class="footer__bottom">
      <div class="container-custom footer__bottom-inner">
        <!-- Social handle (matches @Golaniadventistchurch from poster) -->
        <div class="footer__handle">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" class="footer__handle-icon">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>@Golaniadventistchurch</span>
        </div>

        <p class="footer__copy">
          © {{ new Date().getFullYear() }} Golani SDA Church. All Rights reserved.
        </p>

        <p class="footer__affiliation">
          Mwanachama wa
          <a href="https://adventist.org" target="_blank" class="footer__affiliation-link">
            Seventh-day Adventist Church
          </a>
        </p>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email      = ref('')
const subscribed = ref(false)

function subscribe() {
  if (email.value) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => { subscribed.value = false }, 5000)
  }
}

// Update these hrefs to your real social media URLs
const socials = {
  facebook:  'https://facebook.com/Golaniadventistchurch',
  instagram: 'https://instagram.com/Golaniadventistchurch',
  youtube:   'https://youtube.com/@Golaniadventistchurch',
  whatsapp:  'https://wa.me/255700000000',
  tiktok:    'https://tiktok.com/@Golaniadventistchurch',
}

const quickLinks = [
  { to: '/',           label: 'Nyumbani' },
  { to: '/about',      label: 'Kuhusu Sisi' },
  { to: '/sermons',    label: 'Mahubiri' },
  { to: '/events',     label: 'Matukio' },
  { to: '/gallery',    label: 'Picha' },
  { to: '/give',       label: 'Sadaka / Zaka' },
  { to: '/contact',    label: 'Wasiliana Nasi' },
  { to: '/auth/login', label: 'Ingia Akaunti' },
]

const serviceTimes = [
  { name: 'Shule ya Sabato',  time: 'Jumamosi · 9:00 AM' },
  { name: 'Ibada ya Asubuhi', time: 'Jumamosi · 11:00 AM' },
  { name: 'Vijana (AY)',      time: 'Jumamosi · 4:30 PM' },
  { name: 'Ibada ya Maombi',  time: 'Jumatano · 6:00 PM' },
]
</script>

<style scoped>
/* ── Poster colour tokens ──────────────────────────────────────────────── */
.footer {
  --f-blue:    #0d2137;   /* darkest navy — poster bg base */
  --f-blue-2:  #1a3a5c;   /* mid-blue panel */
  --f-yellow:  #4a9eda;   /* bright blue accent on dark footer */
  --f-yellow-d:#3b82f6;   /* hero blue bright */
  --f-white:   #ffffff;
  --f-gray:    #8faabf;
  --f-border:  rgba(255,255,255,0.12);

  background: var(--f-blue);
  color: var(--f-gray);
  font-family: inherit;
}

/* ── Body grid ─────────────────────────────────────────────────────────── */
.footer__body { padding: 64px 0 48px; }

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 40px;
}

@media (max-width: 1024px) {
  .footer__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .footer__grid { grid-template-columns: 1fr; gap: 32px; }
  .footer__body { padding: 48px 0 32px; }
}

/* ── Brand ─────────────────────────────────────────────────────────────── */
.footer__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer__logo-icon {
  width: 48px;
  height: 48px;
  background: var(--f-blue-2);
  border: 1.5px solid var(--f-yellow);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.footer__sda-flame { width: 30px; height: 30px; }

.footer__logo-name {
  font-size: 18px;
  font-weight: 800;
  color: var(--f-white);
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.footer__logo-sub {
  font-size: 10px;
  color: var(--f-yellow);
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.footer__tagline {
  font-size: 13px;
  line-height: 1.7;
  color: var(--f-gray);
  margin-bottom: 24px;
  font-style: italic;
}

.footer__verse {
  display: block;
  margin-top: 4px;
  color: var(--f-yellow);
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
}

/* ── Social icons ─────────────────────────────────────────────────────── */
.footer__socials {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.footer__social-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background 0.2s;
  background: var(--f-blue-2);
  border: 1px solid var(--f-border);
  text-decoration: none;
  overflow: hidden;
}

.footer__social-btn:hover { transform: translateY(-3px); }
.footer__social-btn--fb:hover { background: #1877f2; border-color: #1877f2; }
.footer__social-btn--ig:hover { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); border-color: transparent; }
.footer__social-btn--yt:hover { background: #ff0000; border-color: #ff0000; }
.footer__social-btn--wa:hover { background: #25d366; border-color: #25d366; color: #fff; }
.footer__social-btn--tt:hover { background: #010101; border-color: #69c9d0; }

.footer__social-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(0) invert(1);  /* make white on dark bg */
}
.footer__social-btn:hover .footer__social-img {
  filter: brightness(0) invert(1);
}

.footer__social-icon {
  width: 18px;
  height: 18px;
  color: var(--f-gray);
}
.footer__social-btn:hover .footer__social-icon { color: var(--f-white); }

/* ── Headings ─────────────────────────────────────────────────────────── */
.footer__heading {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--f-white);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--f-border);
}

/* ── Links ────────────────────────────────────────────────────────────── */
.footer__links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }

.footer__link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--f-gray);
  text-decoration: none;
  transition: color 0.2s;
}
.footer__link:hover { color: var(--f-yellow); }
.footer__link-arrow { color: var(--f-yellow); font-size: 16px; line-height: 1; }

/* ── Services ─────────────────────────────────────────────────────────── */
.footer__services { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }

.footer__service-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--f-yellow);
  margin-bottom: 2px;
}
.footer__service-time { font-size: 12px; color: var(--f-gray); }

/* ── Location box ─────────────────────────────────────────────────────── */
.footer__location-box {
  background: var(--f-blue-2);
  border: 1px solid var(--f-border);
  border-radius: 12px;
  padding: 14px 16px;
}
.footer__location-row { display: flex; gap: 10px; align-items: flex-start; }
.footer__location-icon { width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px; filter: brightness(0) saturate(100%) invert(82%) sepia(40%) saturate(600%) hue-rotate(5deg); }
.footer__location-label { font-size: 11px; color: var(--f-gray); margin-bottom: 2px; }
.footer__location-name { font-size: 13px; font-weight: 600; color: var(--f-white); }
.footer__location-country { font-size: 12px; color: var(--f-gray); }

/* ── Newsletter ───────────────────────────────────────────────────────── */
.footer__newsletter-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--f-gray);
  margin-bottom: 16px;
}

.footer__contact-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.footer__contact-item { font-size: 13px; color: var(--f-gray); }

.footer__subscribe-form {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.footer__subscribe-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--f-border);
  background: var(--f-blue-2);
  color: var(--f-white);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}
.footer__subscribe-input::placeholder { color: var(--f-gray); }
.footer__subscribe-input:focus { border-color: var(--f-yellow); }

.footer__subscribe-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #1e3f60; border: 1.5px solid rgba(255,255,255,0.25);
  color: #ffffff;
  border: none;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  flex-shrink: 0;
}
.footer__subscribe-btn:hover { background: #1a3a5c; transform: scale(1.05); }

.footer__subscribed-msg {
  font-size: 12px;
  color: #4ade80;
  font-weight: 600;
}

/* ── Bottom bar — matches poster bottom yellow/dark strip ─────────────── */
.footer__bottom {
  background: #040e1a;
  border-top: 2px solid var(--f-yellow);
}

.footer__bottom-inner {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.footer__handle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--f-yellow);
}
.footer__handle-icon { color: var(--f-yellow); }

.footer__copy {
  font-size: 12px;
  color: var(--f-gray);
  margin: 0;
}

.footer__affiliation {
  font-size: 12px;
  color: var(--f-gray);
  margin: 0;
}
.footer__affiliation-link {
  color: var(--f-yellow);
  text-decoration: none;
  font-weight: 600;
}
.footer__affiliation-link:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .footer__bottom-inner { flex-direction: column; align-items: center; text-align: center; }
}
</style>