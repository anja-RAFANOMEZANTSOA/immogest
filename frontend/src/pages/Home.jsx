import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Home.css'

const LogoIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="url(#hLogo)"/>
    <path d="M18 7L8 15V30H15V22H21V30H28V15L18 7Z" fill="white" fillOpacity="0.95"/>
    <path d="M15 22H21V30H15V22Z" fill="white" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="hLogo" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B4513"/>
        <stop offset="100%" stopColor="#C9942A"/>
      </linearGradient>
    </defs>
  </svg>
)

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconFile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IconDollar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const IconTool = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconZap = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9942A" stroke="#C9942A" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)
const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconBed = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
)
const IconSquare = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const features = [
  { icon: <IconHome />, color: '#FDF3E9', iconColor: '#8B4513', title: 'Gestion des biens', desc: 'Centralisez tous vos biens immobiliers. Ajoutez, modifiez et suivez leur statut en temps réel.' },
  { icon: <IconUsers />, color: '#F0FDF4', iconColor: '#2D7A4F', title: 'Gestion des locataires', desc: 'Gérez vos locataires facilement. Accès sécurisé à leur espace personnel dédié.' },
  { icon: <IconFile />, color: '#FFF7ED', iconColor: '#C9942A', title: 'Contrats de bail', desc: 'Créez et gérez vos contrats de bail en ligne. Suivi des échéances automatique.' },
  { icon: <IconDollar />, color: '#FEF9E7', iconColor: '#8B4513', title: 'Suivi des loyers', desc: 'Enregistrez les paiements, générez des quittances PDF et suivez les impayés.' },
  { icon: <IconTool />, color: '#F5F3FF', iconColor: '#7B5EA7', title: 'Maintenance', desc: 'Recevez et gérez les demandes de maintenance en temps réel depuis votre tableau de bord.' },
  { icon: <IconChart />, color: '#ECFDF5', iconColor: '#2D7A4F', title: 'Tableau de bord', desc: "Visualisez vos revenus, taux d'occupation et performances financières en un coup d'œil." },
]

const properties = [
  { id: 1, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', title: 'Villa avec piscine', location: 'Antananarivo, Ambohijanahary', price: '2 500 000 Ar', type: 'Villa', beds: 4, surface: '280 m²', status: 'Loué' },
  { id: 2, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', title: 'Maison moderne', location: 'Antananarivo, Ankadifotsy', price: '1 200 000 Ar', type: 'Maison', beds: 3, surface: '150 m²', status: 'Disponible' },
  { id: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', title: 'Appartement standing', location: 'Antananarivo, Analakely', price: '850 000 Ar', type: 'Appartement', beds: 2, surface: '90 m²', status: 'Loué' },
  { id: 4, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', title: 'Villa de luxe', location: 'Toamasina, Bord de mer', price: '3 800 000 Ar', type: 'Villa', beds: 5, surface: '420 m²', status: 'Disponible' },
  { id: 5, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80', title: 'Maison familiale', location: 'Fianarantsoa, Centre', price: '780 000 Ar', type: 'Maison', beds: 3, surface: '120 m²', status: 'Loué' },
  { id: 6, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', title: 'Studio moderne', location: 'Antananarivo, Ivandry', price: '450 000 Ar', type: 'Studio', beds: 1, surface: '45 m²', status: 'Disponible' },
  { id: 7, image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80', title: 'Résidence privée', location: 'Mahajanga, Amborovy', price: '1 600 000 Ar', type: 'Maison', beds: 4, surface: '200 m²', status: 'Loué' },
  { id: 8, image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&q=80', title: 'Penthouse vue mer', location: 'Nosy Be, Hell-Ville', price: '4 200 000 Ar', type: 'Appartement', beds: 3, surface: '180 m²', status: 'Disponible' },
]

const testimonials = [
  { text: "ImmoGest a révolutionné la gestion de mes 12 appartements. Je gagne 3 heures par semaine grâce à cette plateforme !", name: 'Rakoto Jean', role: 'Propriétaire, Antananarivo', initials: 'RJ' },
  { text: "Enfin une solution simple et complète pour les propriétaires malgaches. Le support est réactif et l'interface est intuitive.", name: 'Nirina Andry', role: 'Investisseur immobilier', initials: 'NA' },
  { text: "La gestion des loyers et des quittances est un vrai gain de temps. Je recommande ImmoGest à tous les propriétaires.", name: 'Marie Rabe', role: 'Propriétaire, Toamasina', initials: 'MR' },
]

function PropertyCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const visibleCount = 3
  const total = properties.length

  const goTo = (index) => setCurrent(index)
  const prev = () => setCurrent(c => c === 0 ? total - visibleCount : c - 1)
  const next = () => setCurrent(c => c >= total - visibleCount ? 0 : c + 1)

  useEffect(() => {
    timerRef.current = setInterval(next, 3500)
    return () => clearInterval(timerRef.current)
  }, [current])

  const visible = Array.from({ length: visibleCount }, (_, i) => properties[(current + i) % total])

  return (
    <div className="carousel-wrap">
      <div className="carousel-track">
        {visible.map((p, i) => (
          <div className="property-card" key={`${p.id}-${i}`}>
            <div className="property-img-wrap">
              <img src={p.image} alt={p.title} className="property-img" loading="lazy" />
              <div className={`property-status ${p.status === 'Loué' ? 'status-loue' : 'status-dispo'}`}>{p.status}</div>
              <div className="property-type-tag">{p.type}</div>
            </div>
            <div className="property-body">
              <h3 className="property-title">{p.title}</h3>
              <div className="property-location"><IconMapPin /><span>{p.location}</span></div>
              <div className="property-meta">
                <span className="property-meta-item"><IconBed />{p.beds} ch.</span>
                <span className="property-meta-sep" />
                <span className="property-meta-item"><IconSquare />{p.surface}</span>
              </div>
              <div className="property-footer">
                <span className="property-price">{p.price}<span className="property-price-sub">/mois</span></span>
                <Link to="/register" className="property-cta">Gérer <IconArrow /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev}><IconChevronLeft /></button>
        <div className="carousel-dots">
          {Array.from({ length: total - visibleCount + 1 }).map((_, i) => (
            <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button className="carousel-btn" onClick={next}><IconChevronRight /></button>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="home-page">
      <nav className="home-nav">
        <Link to="/" className="home-nav-logo">
          <LogoIcon size={36} />
          <span className="home-nav-logo-text">ImmoGest</span>
        </Link>
        <div className="home-nav-links">
          <a href="#properties" className="home-nav-link">Nos biens</a>
          <a href="#features" className="home-nav-link">Fonctionnalités</a>
          <a href="#how" className="home-nav-link">Comment ça marche</a>
          <a href="#testimonials" className="home-nav-link">Témoignages</a>
        </div>
        <div className="home-nav-actions">
          <Link to="/login" className="btn-nav-login">Se connecter</Link>
          <Link to="/register" className="btn-nav-cta">Essai gratuit</Link>
        </div>
      </nav>

      <section className="home-hero">
        <div className="home-hero-grid" />
        <div className="home-hero-glow1" />
        <div className="home-hero-glow2" />
        <div className="home-hero-badge">
          <span className="home-hero-badge-dot" />
          Plateforme de gestion immobilière #1
        </div>
        <h1 className="home-hero-title">
          Gérez votre patrimoine<br/><span>immobilier</span> simplement
        </h1>
        <p className="home-hero-sub">
          ImmoGest centralise vos biens, locataires, contrats et finances en une seule plateforme moderne, sécurisée et facile à utiliser.
        </p>
        <div className="home-hero-actions">
          <Link to="/register" className="btn-hero-primary">Commencer gratuitement</Link>
          <Link to="/login" className="btn-hero-secondary">Se connecter</Link>
        </div>
        <div className="home-hero-stats">
          <div className="home-hero-stat"><span className="home-hero-stat-value">Rapide</span><span className="home-hero-stat-label">Prise en main</span></div>
          <div className="home-hero-divider" />
          <div className="home-hero-stat"><span className="home-hero-stat-value">Simple</span><span className="home-hero-stat-label">Interface intuitive</span></div>
          <div className="home-hero-divider" />
          <div className="home-hero-stat"><span className="home-hero-stat-value">Sécurisé</span><span className="home-hero-stat-label">Données protégées</span></div>
          <div className="home-hero-divider" />
          <div className="home-hero-stat"><span className="home-hero-stat-value">24/7</span><span className="home-hero-stat-label">Disponible</span></div>
        </div>
      </section>

      {/* CARROUSEL BIENS */}
      <section className="home-properties" id="properties">
        <div className="home-section-badge">Nos biens</div>
        <h2 className="home-section-title">Biens gérés sur ImmoGest</h2>
        <p className="home-section-sub">Découvrez les propriétés gérées par nos propriétaires. Chaque bien, suivi en temps réel.</p>
        <PropertyCarousel />
      </section>

      {/* FEATURES */}
      <section className="home-features" id="features">
        <div className="home-section-badge">Fonctionnalités</div>
        <h2 className="home-section-title">Tout ce dont vous avez besoin</h2>
        <p className="home-section-sub">Une suite complète d'outils pour gérer votre patrimoine immobilier de A à Z, sans complexité.</p>
        <div className="home-features-grid">
          {features.map((f, i) => (
            <div className="home-feature-card" key={i}>
              <div className="home-feature-icon" style={{ background: f.color, color: f.iconColor }}>{f.icon}</div>
              <div className="home-feature-title">{f.title}</div>
              <div className="home-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section className="home-how" id="how">
        <div className="home-section-badge">Comment ça marche</div>
        <h2 className="home-section-title">Démarrez en 3 étapes</h2>
        <p className="home-section-sub" style={{ margin: '0 auto 56px' }}>Configurez votre espace de gestion en quelques minutes seulement.</p>
        <div className="home-steps">
          <div className="home-step"><div className="home-step-number">1</div><div className="home-step-title">Créez votre compte</div><p className="home-step-desc">Inscrivez-vous gratuitement en moins de 2 minutes. Aucune carte bancaire requise.</p></div>
          <div className="home-step"><div className="home-step-number">2</div><div className="home-step-title">Ajoutez vos biens</div><p className="home-step-desc">Renseignez vos propriétés, locataires et contrats facilement via notre interface intuitive.</p></div>
          <div className="home-step"><div className="home-step-number">3</div><div className="home-step-title">Gérez tout en un clic</div><p className="home-step-desc">Suivez vos loyers, maintenances et documents depuis votre tableau de bord centralisé.</p></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-testimonials" id="testimonials">
        <div className="home-section-badge">Témoignages</div>
        <h2 className="home-section-title">Ils nous font confiance</h2>
        <p className="home-section-sub">Des propriétaires satisfaits qui ont transformé leur gestion immobilière avec ImmoGest.</p>
        <div className="home-testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="home-testimonial-card" key={i}>
              <div className="home-testimonial-stars">{[...Array(5)].map((_, s) => <IconStar key={s} />)}</div>
              <p className="home-testimonial-text">"{t.text}"</p>
              <div className="home-testimonial-author">
                <div className="home-testimonial-avatar">{t.initials}</div>
                <div><div className="home-testimonial-name">{t.name}</div><div className="home-testimonial-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta-box">
          <h2 className="home-cta-title">Prêt à simplifier votre gestion immobilière ?</h2>
          <p className="home-cta-sub">Rejoignez des propriétaires qui font confiance à ImmoGest. Démarrez gratuitement dès aujourd'hui.</p>
          <div className="home-cta-actions">
            <Link to="/register" className="btn-hero-primary">Créer mon compte gratuit</Link>
            <Link to="/login" className="btn-hero-secondary">Se connecter</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-footer-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoIcon size={32} />
              <div className="home-footer-brand-name">ImmoGest</div>
            </div>
            <p className="home-footer-brand-desc">La plateforme de gestion immobilière moderne pour les propriétaires exigeants.</p>
          </div>
          <div>
            <div className="home-footer-links-title">Produit</div>
            <div className="home-footer-links">
              <a href="#features" className="home-footer-link">Fonctionnalités</a>
              <a href="#how" className="home-footer-link">Comment ça marche</a>
              <Link to="/register" className="home-footer-link">S'inscrire</Link>
            </div>
          </div>
          <div>
            <div className="home-footer-links-title">Accès</div>
            <div className="home-footer-links">
              <Link to="/login" className="home-footer-link">Connexion propriétaire</Link>
              <Link to="/login" className="home-footer-link">Espace locataire</Link>
            </div>
          </div>
        </div>
        <div className="home-footer-bottom">
          <span className="home-footer-copy">© 2026 ImmoGest. Tous droits réservés.</span>
          <div className="home-footer-badges">
            <span className="home-footer-badge"><IconShield /> SSL Sécurisé</span>
            <span className="home-footer-badge"><IconZap /> Disponible 24/7</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
