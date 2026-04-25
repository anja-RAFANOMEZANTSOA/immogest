import { Link } from 'react-router-dom'
import './Home.css'

const LogoIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="url(#hLogo)"/>
    <path d="M18 7L8 15V30H15V22H21V30H28V15L18 7Z" fill="white" fillOpacity="0.95"/>
    <path d="M15 22H21V30H15V22Z" fill="white" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="hLogo" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB"/>
        <stop offset="100%" stopColor="#1E40AF"/>
      </linearGradient>
    </defs>
  </svg>
)

const features = [
  { icon: '🏠', color: '#EFF6FF', title: 'Gestion des biens', desc: 'Centralisez tous vos biens immobiliers. Ajoutez, modifiez et suivez leur statut en temps réel.' },
  { icon: '👥', color: '#F0FDF4', title: 'Gestion des locataires', desc: 'Gérez vos locataires facilement. Accès sécurisé à leur espace personnel dédié.' },
  { icon: '📄', color: '#FFF7ED', title: 'Contrats de bail', desc: 'Créez et gérez vos contrats de bail en ligne. Suivi des échéances automatique.' },
  { icon: '💰', color: '#FFF1F2', title: 'Suivi des loyers', desc: 'Enregistrez les paiements, générez des quittances PDF et suivez les impayés.' },
  { icon: '🔧', color: '#F5F3FF', title: 'Maintenance', desc: 'Recevez et gérez les demandes de maintenance en temps réel depuis votre tableau de bord.' },
  { icon: '📊', color: '#ECFDF5', title: 'Tableau de bord', desc: "Visualisez vos revenus, taux d'occupation et performances financières en un coup d'œil." },
]

const testimonials = [
  { stars: '★★★★★', text: "ImmoGest a révolutionné la gestion de mes 12 appartements. Je gagne 3 heures par semaine grâce à cette plateforme !", name: 'Rakoto Jean', role: 'Propriétaire, Antananarivo', initials: 'RJ' },
  { stars: '★★★★★', text: "Enfin une solution simple et complète pour les propriétaires malgaches. Le support est réactif et l'interface est intuitive.", name: 'Nirina Andry', role: 'Investisseur immobilier', initials: 'NA' },
  { stars: '★★★★☆', text: "La gestion des loyers et des quittances est un vrai gain de temps. Je recommande ImmoGest à tous les propriétaires.", name: 'Marie Rabe', role: 'Propriétaire, Toamasina', initials: 'MR' },
]

export default function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-nav">
        <Link to="/" className="home-nav-logo">
          <LogoIcon size={36} />
          <span className="home-nav-logo-text">ImmoGest</span>
        </Link>
        <div className="home-nav-links">
          <a href="#features" className="home-nav-link">Fonctionnalités</a>
          <a href="#how" className="home-nav-link">Comment ça marche</a>
          <a href="#testimonials" className="home-nav-link">Témoignages</a>
        </div>
        <div className="home-nav-actions">
          <Link to="/login" className="btn-nav-login">Se connecter</Link>
          <Link to="/register" className="btn-nav-cta">Essai gratuit →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-grid" />
        <div className="home-hero-glow1" />
        <div className="home-hero-glow2" />
        <div className="home-hero-badge">
          <span className="home-hero-badge-dot" />
          Plateforme de gestion immobilière #1
        </div>
        <h1 className="home-hero-title">
          Gérez votre patrimoine<br/>
          <span>immobilier</span> simplement
        </h1>
        <p className="home-hero-sub">
          ImmoGest centralise vos biens, locataires, contrats et finances
          en une seule plateforme moderne, sécurisée et facile à utiliser.
        </p>
        <div className="home-hero-actions">
          <Link to="/register" className="btn-hero-primary">Commencer gratuitement →</Link>
          <Link to="/login" className="btn-hero-secondary">Se connecter</Link>
        </div>
        <div className="home-hero-stats">
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">500+</span>
            <span className="home-hero-stat-label">Biens gérés</span>
          </div>
          <div className="home-hero-divider" />
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">200+</span>
            <span className="home-hero-stat-label">Propriétaires</span>
          </div>
          <div className="home-hero-divider" />
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">98%</span>
            <span className="home-hero-stat-label">Satisfaction</span>
          </div>
          <div className="home-hero-divider" />
          <div className="home-hero-stat">
            <span className="home-hero-stat-value">24/7</span>
            <span className="home-hero-stat-label">Disponible</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features" id="features">
        <div className="home-section-badge">✦ Fonctionnalités</div>
        <h2 className="home-section-title">Tout ce dont vous avez besoin</h2>
        <p className="home-section-sub">
          Une suite complète d'outils pour gérer votre patrimoine immobilier de A à Z, sans complexité.
        </p>
        <div className="home-features-grid">
          {features.map((f, i) => (
            <div className="home-feature-card" key={i}>
              <div className="home-feature-icon" style={{ background: f.color }}>{f.icon}</div>
              <div className="home-feature-title">{f.title}</div>
              <div className="home-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-how" id="how">
        <div className="home-section-badge">✦ Comment ça marche</div>
        <h2 className="home-section-title">Démarrez en 3 étapes</h2>
        <p className="home-section-sub" style={{ margin: '0 auto 56px' }}>
          Configurez votre espace de gestion en quelques minutes seulement.
        </p>
        <div className="home-steps">
          <div className="home-step">
            <div className="home-step-number">1</div>
            <div className="home-step-title">Créez votre compte</div>
            <p className="home-step-desc">Inscrivez-vous gratuitement en moins de 2 minutes. Aucune carte bancaire requise.</p>
          </div>
          <div className="home-step">
            <div className="home-step-number">2</div>
            <div className="home-step-title">Ajoutez vos biens</div>
            <p className="home-step-desc">Renseignez vos propriétés, locataires et contrats facilement via notre interface intuitive.</p>
          </div>
          <div className="home-step">
            <div className="home-step-number">3</div>
            <div className="home-step-title">Gérez tout en un clic</div>
            <p className="home-step-desc">Suivez vos loyers, maintenances et documents depuis votre tableau de bord centralisé.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-testimonials" id="testimonials">
        <div className="home-section-badge">✦ Témoignages</div>
        <h2 className="home-section-title">Ils nous font confiance</h2>
        <p className="home-section-sub">
          Des propriétaires satisfaits qui ont transformé leur gestion immobilière avec ImmoGest.
        </p>
        <div className="home-testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="home-testimonial-card" key={i}>
              <div className="home-testimonial-stars">{t.stars}</div>
              <p className="home-testimonial-text">"{t.text}"</p>
              <div className="home-testimonial-author">
                <div className="home-testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="home-testimonial-name">{t.name}</div>
                  <div className="home-testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta-box">
          <h2 className="home-cta-title">Prêt à simplifier votre gestion immobilière ?</h2>
          <p className="home-cta-sub">
            Rejoignez des centaines de propriétaires qui font confiance à ImmoGest. Démarrez gratuitement dès aujourd'hui.
          </p>
          <div className="home-cta-actions">
            <Link to="/register" className="btn-hero-primary">Créer mon compte gratuit →</Link>
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
            <p className="home-footer-brand-desc">
              La plateforme de gestion immobilière moderne pour les propriétaires exigeants.
            </p>
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
            <span className="home-footer-badge">🔒 SSL Sécurisé</span>
            <span className="home-footer-badge">⚡ Disponible 24/7</span>
          </div>
        </div>
      </footer>

    </div>
  )
}