import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { theme } from './Theme';

const careerData = [
  { name: 'Software Eng', students: 12 },
  { name: 'Data Science', students: 8 },
  { name: 'AI Engineer', students: 15 },
  { name: 'Web Dev', students: 10 },
  { name: 'Cybersecurity', students: 6 },
  { name: 'Doctor', students: 9 },
  { name: 'Teacher', students: 7 },
  { name: 'Accountant', students: 5 },
  { name: 'Civil Eng', students: 8 },
  { name: 'Psychologist', students: 4 },
];

const pieData = [
  { name: 'Computer Science', value: 51 },
  { name: 'Medical & Science', value: 20 },
  { name: 'Engineering', value: 15 },
  { name: 'Business', value: 18 },
  { name: 'Education & Arts', value: 14 },
];

const performanceData = [
  { month: 'Jan', assessments: 4, recommendations: 3 },
  { month: 'Feb', assessments: 6, recommendations: 5 },
  { month: 'Mar', assessments: 8, recommendations: 7 },
  { month: 'Apr', assessments: 5, recommendations: 4 },
  { month: 'May', assessments: 10, recommendations: 9 },
  { month: 'Jun', assessments: 12, recommendations: 11 },
  { month: 'Jul', stroke: theme.primary, assessments: 14, recommendations: 13 },
  { month: 'Aug', assessments: 11, recommendations: 10 },
];

const skillsData = [
  { skill: 'Programming', value: 80 },
  { skill: 'Communication', value: 65 },
  { skill: 'Analytics', value: 75 },
  { skill: 'Creativity', value: 60 },
  { skill: 'Leadership', value: 55 },
  { skill: 'Problem Solving', value: 85 },
];

// Premium sequential orange color palette for charts 
const CHART_COLORS = [
  theme.primary,       // #FF7800
  '#FF8B25', 
  theme.primaryLight,  // #FF9E43
  '#FFB162', 
  theme.secondary,     // #FFB347
  '#FFC570', 
  theme.accent,        // #FF6200
  '#CC6000'            // theme.primaryDark
];

function Analytics() {
  const [activeTab, setActiveTab] = useState('career');

  return (
    <div style={{ padding: '40px 30px', fontFamily: "'Segoe UI', sans-serif", backgroundColor: theme.bgDark, minHeight: '100vh' }}>

      <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>📊 Analytics Dashboard</h2>
      <p style={{ color: theme.textSecondary, margin: '0 0 30px', fontSize: '14.5px' }}>Track career trends and overall student performance metrics</p>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {[
          { key: 'career', label: '📊 Career Trends' },
          { key: 'performance', label: '📈 Performance' },
          { key: 'skills', label: '🎯 Skills Analysis' },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button 
              key={tab.key} 
              onClick={() => setActiveTab(tab.key)}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: '700', 
                fontSize: '13.5px', 
                fontFamily: 'inherit', 
                background: isActive ? theme.gradientPrimary : theme.surface, 
                color: isActive ? 'white' : theme.textSecondary, 
                boxShadow: isActive ? theme.shadowGlow : theme.shadowSm,
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: CAREER TRENDS ── */}
      {activeTab === 'career' && (
        <div>
          {/* Stats Cards Row */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {[
              { label: 'Total Careers', value: '22+', icon: '💼', color: theme.primary },
              { label: 'Top Career', value: 'AI Engineer', icon: '🤖', color: theme.accent },
              { label: 'Most Popular Field', value: 'CS', icon: '💻', color: theme.success },
              { label: 'Career Categories', value: '5', icon: '📂', color: theme.warning },
            ].map((stat, i) => (
              <div key={i} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderTop: `4px solid ${stat.color}`, borderRadius: theme.radiusLg, padding: '22px 26px', flex: '1', minWidth: '160px', boxShadow: theme.shadowSm }}>
                <p style={{ fontSize: '24px', margin: '0 0 10px' }}>{stat.icon}</p>
                <h3 style={{ margin: '0 0 4px', color: theme.text, fontSize: '24px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bar Chart Container */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radiusXl, padding: '26px', marginBottom: '28px', boxShadow: theme.shadowMd }}>
            <h3 style={{ margin: '0 0 24px', color: theme.text, fontSize: '16px', fontWeight: '800' }}>Top Career Interests Among Students</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={careerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: theme.textSecondary, fontWeight: '600' }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: theme.textSecondary }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,120,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }} />
                <Bar dataKey="students" radius={[6, 6, 0, 0]} name="Students">
                  {careerData.map((entry, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart Container */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radiusXl, padding: '26px', boxShadow: theme.shadowMd }}>
            <h3 style={{ margin: '0 0 24px', color: theme.text, fontSize: '16px', fontWeight: '800' }}>Career Field Distribution</h3>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
              <ResponsiveContainer width="55%" height={260}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: `1px solid ${theme.border}` }} />
                </PieChart>
              </ResponsiveContainer>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
                {pieData.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: `1px solid ${theme.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}></div>
                      <span style={{ fontSize: '13.5px', color: theme.text, fontWeight: '700' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '13.5px', color: theme.textSecondary, fontWeight: '600' }}>{item.value} Students</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: PERFORMANCE METRICS ── */}
      {activeTab === 'performance' && (
        <div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {[
              { label: 'Total Assessments', value: '45', icon: '📋', color: theme.primary },
              { label: 'Recommendations Given', value: '39', icon: '🎯', color: theme.accent },
              { label: 'Avg Match Score', value: '91%', icon: '⭐', color: theme.success },
              { label: 'Active Students', value: '25', icon: '👥', color: theme.primaryLight },
            ].map((stat, i) => (
              <div key={i} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderTop: `4px solid ${stat.color}`, borderRadius: theme.radiusLg, padding: '22px 26px', flex: '1', minWidth: '160px', boxShadow: theme.shadowSm }}>
                <p style={{ fontSize: '24px', margin: '0 0 10px' }}>{stat.icon}</p>
                <h3 style={{ margin: '0 0 4px', color: theme.text, fontSize: '26px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Line Chart Container */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radiusXl, padding: '26px', boxShadow: theme.shadowMd }}>
            <h3 style={{ margin: '0 0 24px', color: theme.text, fontSize: '16px', fontWeight: '800' }}>Monthly Assessments & Recommendations</h3>
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: theme.textSecondary, fontWeight: '600' }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: theme.textSecondary }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: `1px solid ${theme.border}` }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '14px' }} />
                <Line type="monotone" dataKey="assessments" stroke={theme.primary} strokeWidth={3.5} dot={{ r: 5, stroke: '#ffffff', strokeWidth: 2, fill: theme.primary }} activeDot={{ r: 7 }} name="Assessments" />
                <Line type="monotone" dataKey="recommendations" stroke={theme.secondary} strokeWidth={3.5} dot={{ r: 5, stroke: '#ffffff', strokeWidth: 2, fill: theme.secondary }} activeDot={{ r: 7 }} name="Recommendations" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── TAB 3: SKILLS ANALYSIS ── */}
      {activeTab === 'skills' && (
        <div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {[
              { label: 'Top Skill', value: 'Problem Solving', icon: '🧩', color: theme.primary },
              { label: 'Avg Skill Score', value: '70%', icon: '📊', color: theme.accent },
              { label: 'Skills Tracked', value: '6', icon: '🎯', color: theme.success },
              { label: 'Improvements', value: '+15%', icon: '📈', color: theme.warning },
            ].map((stat, i) => (
              <div key={i} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderTop: `4px solid ${stat.color}`, borderRadius: theme.radiusLg, padding: '22px 26px', flex: '1', minWidth: '160px', boxShadow: theme.shadowSm }}>
                <p style={{ fontSize: '24px', margin: '0 0 10px' }}>{stat.icon}</p>
                <h3 style={{ margin: '0 0 4px', color: theme.text, fontSize: '22px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Radar Chart Container */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radiusXl, padding: '26px', marginBottom: '28px', boxShadow: theme.shadowMd }}>
            <h3 style={{ margin: '0 0 24px', color: theme.text, fontSize: '16px', fontWeight: '800' }}>Student Skills Radar</h3>
            <ResponsiveContainer width="100%" height={340}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke={theme.border} />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: theme.textSecondary, fontWeight: '600' }} />
                <Radar name="Skills" dataKey="value" stroke={theme.primary} fill={theme.primary} fillOpacity={0.25} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: `1px solid ${theme.border}` }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Linear Progress Skills Bars Breakdown */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radiusXl, padding: '30px', boxShadow: theme.shadowMd }}>
            <h3 style={{ margin: '0 0 24px', color: theme.text, fontSize: '16px', fontWeight: '800' }}>Detailed Skills Breakdown</h3>
            {skillsData.map((skill, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: theme.text }}>{skill.skill}</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: theme.primary }}>{skill.value}%</span>
                </div>
                <div style={{ height: '10px', backgroundColor: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.value}%`, background: theme.gradientPrimary, borderRadius: '10px', transition: 'width 0.6s ease-in-out' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;