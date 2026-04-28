.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 58px;
  background: #FFFDF9;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(61,31,14,0.06);
  z-index: 10;
}

.topbar-left {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.topbar-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.topbar-subtitle {
  font-size: 11.5px;
  color: var(--text-muted);
  font-family: 'Inter', sans-serif;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar-divider {
  width: 1px;
  height: 22px;
  background: var(--border);
  margin: 0 4px;
}

.topbar-icon-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: var(--transition-fast);
  position: relative;
  box-shadow: var(--shadow-xs);
}

.topbar-icon-btn:hover {
  background: var(--bg-subtle);
  color: var(--accent);
  border-color: var(--accent-border);
}

.topbar-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B4513, #C9942A);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: 2px solid var(--accent-light);
  box-shadow: 0 0 0 2px rgba(139,69,19,0.15);
  transition: var(--transition-fast);
}

.topbar-avatar:hover {
  box-shadow: 0 0 0 3px rgba(139,69,19,0.25);
}

/* ── Notifications ─────────────────────── */
.topbar-notif-wrapper,
.topbar-profil-wrapper {
  position: relative;
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #C0392B;
  color: white;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  pointer-events: none;
}

.notif-dropdown,
.profil-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #FFFDF9;
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(61,31,14,0.12);
  z-index: 1000;
  animation: fadeIn .15s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.notif-dropdown { width: 340px; }

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px 10px;
  font-weight: 600;
  font-size: 13px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}

.notif-count { color: var(--text-muted); font-weight: 400; }

.notif-tout-lire {
  font-size: 11px;
  color: #8B4513;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
}
.notif-tout-lire:hover { text-decoration: underline; }

.notif-list {
  max-height: 360px;
  overflow-y: auto;
}

.notif-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 16px;
  color: var(--text-muted);
  font-size: 13px;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background .15s;
  border-bottom: 1px solid var(--bg-subtle);
  position: relative;
}
.notif-item:hover { background: var(--bg-subtle); }
.notif-item.non-lue { background: var(--accent-light); }
.notif-item.non-lue:hover { background: #F5E6D0; }

.notif-icone {
  margin-top: 2px;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
}

.notif-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.notif-titre {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.notif-message {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notif-date {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
}

.notif-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #C9942A;
  flex-shrink: 0;
  margin-top: 5px;
}

/* ── Profil dropdown ───────────────────── */
.profil-dropdown { width: 240px; }

.profil-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.profil-avatar-lg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B4513, #C9942A);
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profil-nom {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.profil-email {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.profil-role {
  display: inline-block;
  margin-top: 4px;
  font-size: 10px;
  background: var(--accent-light);
  color: #8B4513;
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 600;
  text-transform: capitalize;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.profil-divider {
  height: 1px;
  background: var(--border);
  margin: 0 16px;
}

.profil-logout {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #C0392B;
  border-radius: 0 0 14px 14px;
  transition: background .15s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
}
.profil-logout:hover { background: var(--danger-bg); }

/* ── Mobile menu btn ───────────────────── */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-white);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
  margin-right: 8px;
}

.mobile-menu-btn:hover {
  background: var(--bg-subtle);
  color: var(--accent);
}

@media (max-width: 1024px) {
  .mobile-menu-btn { display: flex; }
  .topbar { padding: 0 16px; }
}
