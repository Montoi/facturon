'use client';

import { useState } from 'react';

const navItems = [
  { icon: '▦', label: 'Dashboard' },
  { icon: '▥', label: 'Analytics' },
  { icon: '▤', label: 'Reports' },
  { icon: '♣', label: 'Customers' },
  { icon: '⚙', label: 'Settings' },
  { icon: '?', label: 'Help' },
];

const metrics = [
  { icon: '▣', label: 'Monthly Recurring Revenue', value: '$128,430', change: '+12%', tone: 'green' },
  { icon: '♣', label: 'Active Users', value: '14,202', change: '+8%', tone: 'green' },
  { icon: '◉', label: 'Avg. Session Duration', value: '4m 32s', change: '-2%', tone: 'red' },
  { icon: '⌁', label: 'Churn Rate', value: '1.4%', change: '+0.2%', tone: 'red' },
];

const customers = [
  { initials: 'ER', name: 'Elena Rodriguez', company: 'Enterprise Plan', color: '#df4b55' },
  { initials: 'MT', name: 'Marcus Thorne', company: 'Growth Plan', color: '#183d2e' },
  { initials: 'TG', name: 'Tasha G.', company: 'Starter Plan', color: '#9f673f' },
];

const bars = [38, 50, 45, 57, 68, 54, 82, 62, 71, 60, 48];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [period, setPeriod] = useState('Yearly');

  return (
    <main className={dark ? 'dashboard dark' : 'dashboard'}>
      <aside className="side-panel">
        <div className="logo-lockup">
          <span className="logo-box">⌁</span>
          <span><strong>Lucid Analytics</strong><small>PREMIUM WORKSPACE</small></span>
        </div>

        <nav className="side-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.label} className={activeNav === item.label ? 'active' : ''} onClick={() => setActiveNav(item.label)}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        <section className="pro-card">
          <strong>PRO PLAN</strong>
          <p>Get advanced heatmaps and AI forecasts.</p>
          <button>Upgrade Plan</button>
        </section>
        <button className="logout"><span>↪</span>Logout</button>
      </aside>

      <section className="workspace">
        <header className="top-bar">
          <label className="search-box"><span>⌕</span><input placeholder="Search analytics, customers, or reports..." aria-label="Search" /></label>
          <button className="bell" aria-label="Notifications">♟<i /></button>
          <button className="user-menu"><span><strong>Alex Sterling</strong><small>Administrator</small></span><i>AS</i></button>
        </header>

        <div className="workspace-content">
          <div className="heading-row">
            <div><h1>Executive Overview</h1><p>Real-time performance metrics for your ecosystem.</p></div>
            <div className="heading-actions"><button className="invite"><span>♣</span>Invite User</button><button className="export"><span>⇧</span>Export Report</button></div>
          </div>

          <section className="metric-grid" aria-label="Key metrics">
            {metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <div className={`metric-icon ${metric.tone}`}>{metric.icon}</div><span className={`change ${metric.tone}`}>{metric.change}</span>
                <p>{metric.label}</p><strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="analytics-grid">
            <article className="panel revenue-panel">
              <div className="panel-heading"><div><h2>Revenue Growth</h2><p>Performance over the last 12 months</p></div><div className="period-tabs"><button className={period === 'Yearly' ? 'active' : ''} onClick={() => setPeriod('Yearly')}>Yearly</button><button className={period === 'Monthly' ? 'active' : ''} onClick={() => setPeriod('Monthly')}>Monthly</button></div></div>
              <div className="bar-chart" aria-label="Revenue growth bar chart">
                {bars.map((height, index) => <span key={index} className={index === 6 ? 'highlight' : ''} style={{ height: `${period === 'Yearly' ? height : Math.max(24, height - (index % 3) * 12)}%` }}><i>{['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV'][index]}</i></span>)}
              </div>
            </article>

            <article className="panel sources-panel">
              <div className="panel-heading"><div><h2>Acquisition Sources</h2><p>Top-performing channels</p></div></div>
              <div className="source-list">
                {[['Organic Search', 42], ['Direct Traffic', 28], ['Social Media', 18], ['Paid Referral', 12]].map(([name, value]) => (
                  <div className="source" key={name}><span><strong>{name}</strong><small>{value}%</small></span><i><b style={{ width: `${value}%` }} /></i></div>
                ))}
              </div>
              <div className="insight"><span>✦</span><p><strong>Insight:</strong> Organic search conversion up by 15% this week.</p></div>
            </article>
          </section>

          <section className="panel customers-panel">
            <div className="panel-heading"><div><h2>Recent Customers</h2><p>Your latest account activity</p></div><button>View All Customers</button></div>
            <div className="customer-table">
              {customers.map((customer) => <div className="customer-row" key={customer.name}><span className="customer-avatar" style={{ background: customer.color }}>{customer.initials}</span><span><strong>{customer.name}</strong><small>{customer.company}</small></span><span className="customer-email">{customer.name.toLowerCase().replace(' ', '.')}@example.com</span><span className="active-pill">Active</span></div>)}
            </div>
          </section>
        </div>
      </section>

      <aside className="summary-panel">
        <header><div className="mini-brand"><span>⌁</span>Lucid Analytics</div><button aria-label="Notifications">♟</button></header>
        <div className="summary-content">
          <div className="hello"><h2>Hello, Alex!</h2><p>Here’s your daily summary.</p></div>
          <div className="summary-grid">
            <article><span>REVENUE<em>+12%</em></span><strong>$128,430</strong></article><article><span>USERS<em>+8%</em></span><strong>14,202</strong></article>
            <article><span>SESSION<em className="red">-2%</em></span><strong>4m 32s</strong></article><article><span>CHURN<em className="red">+0.2%</em></span><strong>1.4%</strong></article>
          </div>
          <article className="mini-chart"><div className="panel-heading"><div><h3>Revenue Growth</h3><p>Last 6 months performance</p></div><strong>⌁</strong></div><div className="sparkline"><i /><i /><i /><i /><i /><i /></div><div className="months"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div></article>
          <section className="recent-side"><div className="side-section-title"><h3>Recent Customers</h3><button>View All</button></div>{customers.map((customer) => <article key={customer.name}><span className="customer-avatar" style={{ background: customer.color }}>{customer.initials}</span><span><strong>{customer.name}</strong><small>{customer.company}</small></span><em>Active</em></article>)}</section>
        </div>
        <nav className="mobile-tabs"><button className="active"><span>▦</span>Dashboard</button><button><span>▥</span>Analytics</button><button><span>▤</span>Reports</button><button><span>♣</span>Customers</button><button><span>♟</span>Profile</button></nav>
      </aside>

      <div className="theme-switch" aria-label="Color theme"><button className={!dark ? 'active' : ''} onClick={() => setDark(false)}>☀ Light</button><button className={dark ? 'active' : ''} onClick={() => setDark(true)}>☾ Dark</button></div>
    </main>
  );
}
