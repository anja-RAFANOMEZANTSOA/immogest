@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.home-page {
  font-family: 'Inter', sans-serif;
  color: #0F172A;
  overflow-x: hidden;
}

/* ── NAVBAR ── */
.home-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 5%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  transition: all 0.3s ease;
}

.home-nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.home-nav-logo-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.03em;
}

.home-nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.home-nav-link {
  font-size: 14.5px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: color 0.2s;
}

.home-nav-link:hover { color: #2563EB; }

.home-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-nav-login {
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  background: transparent;
  border: 2px solid #E2E8F0;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}

.btn-nav-login:hover {
  border-color: #2563EB;
  color: #2563EB;
}

.btn-nav-cta {
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #2563EB, #6366F1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 14px rgba(37,99,235,0.35);
}

.btn-nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37,99,235,0.45);
}

/* ── HERO ── */
.home-hero {
  min-height: 100vh;
  background: linear-gradient(160deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 5% 80px;
  position: relative;
  overflow: hidden;
}

.home-hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}

.home-hero-glow1 {
  position: absolute;
  top: -150px; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 60%);
  pointer-events: none;
}

.home-hero-glow2 {
  position: absolute;
  bottom: -100px; right: -100px;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%);
  pointer-events: none;
}

.home-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(129,140,248,0.3);
  color: #C7D2FE;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 100px;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}

.home-hero-badge-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #818CF8;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

.home-hero-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(38px, 6vw, 68px);
  font-weight: 900;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 24px;
  max-width: 800px;
  position: relative;
  z-index: 1;
}

.home-hero-title span {
  background: linear-gradient(90deg, #93C5FD, #A5B4FC, #C084FC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-hero-sub {
  font-size: 18px;
  color: rgba(255,255,255,0.62);
  line-height: 1.7;
  max-width: 560px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.home-hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-hero-primary {
  padding: 15px 32px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #2563EB, #6366F1);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 28px rgba(37,99,235,0.45);
  transition: all 0.25s;
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(37,99,235,0.55);
}

.btn-hero-secondary {
  padding: 15px 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 14px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.25s;
}

.btn-hero-secondary:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.35);
}

.home-hero-stats {
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
  justify-content: center;
}

.home-hero-stat {
  text-align: center;
}

.home-hero-stat-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: white;
  letter-spacing: -0.03em;
  display: block;
}

.home-hero-stat-label {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
}

.home-hero-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.15);
}

/* ── FEATURES ── */
.home-features {
  padding: 100px 5%;
  background: #F8FAFC;
}

.home-section-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #2563EB;
  font-size: 12.5px;
  font-weight: 700;
  padding: 7px 16px;
  border-radius: 100px;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.home-section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
  line-height: 1.2;
}

.home-section-sub {
  font-size: 16px;
  color: #64748B;
  line-height: 1.7;
  max-width: 560px;
  margin-bottom: 56px;
}

.home-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.home-feature-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.home-feature-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563EB, #6366F1);
  opacity: 0;
  transition: opacity 0.3s;
}

.home-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.08);
  border-color: transparent;
}

.home-feature-card:hover::before { opacity: 1; }

.home-feature-icon {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.home-feature-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.home-feature-desc {
  font-size: 14px;
  color: #64748B;
  line-height: 1.65;
}

/* ── HOW IT WORKS ── */
.home-how {
  padding: 100px 5%;
  background: white;
  text-align: center;
}

.home-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.home-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.home-step-number {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #6366F1);
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37,99,235,0.35);
}

.home-step-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
}

.home-step-desc {
  font-size: 13.5px;
  color: #64748B;
  line-height: 1.6;
  text-align: center;
}

/* ── TESTIMONIALS ── */
.home-testimonials {
  padding: 100px 5%;
  background: linear-gradient(160deg, #0F172A 0%, #1E3A5F 100%);
  text-align: center;
}

.home-testimonials .home-section-title { color: white; }
.home-testimonials .home-section-sub { color: rgba(255,255,255,0.55); margin: 0 auto 56px; }
.home-testimonials .home-section-badge {
  background: rgba(99,102,241,0.2);
  border-color: rgba(129,140,248,0.3);
  color: #C7D2FE;
}

.home-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.home-testimonial-card {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 28px;
  text-align: left;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.home-testimonial-card:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-3px);
}

.home-testimonial-stars {
  color: #FBBF24;
  font-size: 16px;
  margin-bottom: 14px;
  letter-spacing: 2px;
}

.home-testimonial-text {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 18px;
}

.home-testimonial-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.home-testimonial-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #6366F1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.home-testimonial-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.home-testimonial-role {
  font-size: 12px;
  color: rgba(255,255,255,0.45);
}

/* ── CTA ── */
.home-cta {
  padding: 100px 5%;
  background: #F8FAFC;
  text-align: center;
}

.home-cta-box {
  max-width: 700px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1E3A5F, #0F172A);
  border-radius: 28px;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.home-cta-box::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 280px; height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%);
  pointer-events: none;
}

.home-cta-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.home-cta-sub {
  font-size: 16px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 36px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.home-cta-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

/* ── FOOTER ── */
.home-footer {
  padding: 48px 5% 32px;
  background: #0F172A;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.home-footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.home-footer-brand-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  margin-top: 8px;
  margin-bottom: 8px;
}

.home-footer-brand-desc {
  font-size: 13.5px;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
  max-width: 260px;
}

.home-footer-links-title {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.home-footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.home-footer-link {
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.2s;
}

.home-footer-link:hover { color: white; }

.home-footer-bottom {
  padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,0.07);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.home-footer-copy {
  font-size: 13px;
  color: rgba(255,255,255,0.3);
}

.home-footer-badges {
  display: flex;
  gap: 12px;
}

.home-footer-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  font-weight: 500;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .home-nav-links { display: none; }
  .home-hero-title { font-size: 36px; }
  .home-hero-sub { font-size: 16px; }
  .home-hero-divider { display: none; }
  .home-cta-box { padding: 40px 24px; }
  .home-footer-top { flex-direction: column; }
}