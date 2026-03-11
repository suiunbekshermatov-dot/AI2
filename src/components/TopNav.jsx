import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Portal' },
  { to: '/survey', label: 'Survey' },
  { to: '/teachers', label: 'Teachers' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/telegram', label: 'Telegram Bot' }
];

function TopNav() {
  return (
    <header className="top-nav">
      <div className="brand">College Digital System</div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default TopNav;
