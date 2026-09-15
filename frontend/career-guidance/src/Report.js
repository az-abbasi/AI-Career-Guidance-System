import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import API from './api';
import { theme } from './Theme';

function Report() {
  const [userData, setUserData] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [skillData, setSkillData] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, academicRes, skillRes, assessmentRes] = await Promise.all([
          API.get('/profile'),
          API.get('/academic-record'),
          API.get('/skill-assessment'),
          API.get('/assessment'),
        ]);
        setUserData(profileRes.data);
        setAcademicData(academicRes.data);
        setSkillData(skillRes.data);
        setAssessmentData(assessmentRes.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const generatePDF = () => {
    setGenerating(true);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // ── PDF HEADER PANEL ──
    doc.setFillColor(255, 120, 0); // Primary Brand Color
    doc.rect(0, 0, pageWidth, 45, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Career Guidance Report', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Career Guidance System', pageWidth / 2, 30, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 38, { align: 'center' });

    let y = 55;

    // ── SECTION HEADER UTILITY ──
    const drawSectionHeader = (titleText) => {
      doc.setFillColor(245, 245, 247);
      doc.rect(14, y, pageWidth - 28, 9, 'F');
      doc.setTextColor(28, 28, 30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(titleText, 18, y + 6.5);
      y += 15;
    };

    // ── STUDENT INFO SECTION ──
    drawSectionHeader('Student Information');
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 75);

    const name = userData?.name || 'N/A';
    const email = userData?.email || 'N/A';
    const university = userData?.university || 'N/A';
    const degree = userData?.degree || 'N/A';

    doc.text(`Name: ${name}`, 18, y); y += 7;
    doc.text(`Email: ${email}`, 18, y); y += 7;
    doc.text(`University: ${university}`, 18, y); y += 7;
    doc.text(`Degree Program: ${degree}`, 18, y); y += 14;

    // ── ACADEMIC RECORD SECTION ──
    drawSectionHeader('Academic Record');
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 75);

    const gpa = academicData?.gpa || 'N/A';
    const semester = academicData?.semester || 'N/A';
    doc.text(`GPA: ${gpa} / 4.0`, 18, y); y += 7;
    doc.text(`Current Semester: ${semester}`, 18, y); y += 10;

    // Academic Subjects Data Table
    if (academicData?.subjects && academicData.subjects.length > 0) {
      const subjects = typeof academicData.subjects === 'string'
        ? JSON.parse(academicData.subjects)
        : academicData.subjects;

      autoTable(doc, {
        startY: y,
        head: [['Subject Name', 'Grade']],
        body: subjects.map(s => [s.name || s.subject || 'N/A', s.grade || 'N/A']),
        headStyles: { fillColor: [255, 120, 0], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [252, 252, 253] },
        styles: { fontSize: 9.5, cellPadding: 4, fontFamily: 'helvetica' },
        margin: { left: 14, right: 14 },
      });
      y = doc.lastAutoTable.finalY + 14;
    } else {
      doc.text('No core subjects appended to the tracking profile.', 18, y); y += 12;
    }

    // ── SKILL ASSESSMENT SECTION ──
    drawSectionHeader('Skill Assessment Profiles');
    if (skillData?.ratings) {
      const ratings = typeof skillData.ratings === 'string'
        ? JSON.parse(skillData.ratings)
        : skillData.ratings;

      const skillRows = Object.entries(ratings).map(([skill, rating]) => [
        skill,
        `${rating} / 5`
      ]);

      autoTable(doc, {
        startY: y,
        head: [['Competency Node', 'Proficiency Value']],
        body: skillRows,
        headStyles: { fillColor: [28, 28, 30], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [252, 252, 253] },
        styles: { fontSize: 9.5, cellPadding: 4, fontFamily: 'helvetica' },
        margin: { left: 14, right: 14 },
      });
      y = doc.lastAutoTable.finalY + 14;
    } else {
      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 75);
      doc.text('No interactive skill profiles evaluations recorded.', 18, y);
      y += 12;
    }

    // ── CAREER INTERESTS SECTION ──
    if (assessmentData?.interests) {
      drawSectionHeader('Career Interests & Recommendations');
      const interests = typeof assessmentData.interests === 'string'
        ? JSON.parse(assessmentData.interests)
        : assessmentData.interests;

      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 75);
      doc.text(`Engine Recommended Career: ${assessmentData.recommended_career || 'N/A'}`, 18, y);
      y += 9;

      autoTable(doc, {
        startY: y,
        head: [['Selected Domain Vectors']],
        body: interests.map(i => [i]),
        headStyles: { fillColor: [255, 120, 0], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [252, 252, 253] },
        styles: { fontSize: 9.5, cellPadding: 4, fontFamily: 'helvetica' },
        margin: { left: 14, right: 14 },
      });
      y = doc.lastAutoTable.finalY + 14;
    }

    // ── PDF FOOTER PANEL ──
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(28, 28, 30);
    doc.rect(0, pageHeight - 16, pageWidth, 16, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Student Career Guidance System — UCP Final Year Project', pageWidth / 2, pageHeight - 6.5, { align: 'center' });

    doc.save(`Career_Report_${name.replace(/\s+/g, '_')}.pdf`);
    setGenerating(false);
  };

  // ── INITIAL LOAD PANEL ──
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600', fontSize: '15px' }}>Compiling analytical records...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", backgroundColor: theme.bgDark, minHeight: '100vh' }}>
      <div style={{ backgroundColor: theme.surface, borderRadius: theme.radiusXl || '24px', padding: '44px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg, maxWidth: '720px', margin: '0 auto' }}>

        {/* Header Panel */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>📄</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Career Report Console</h2>
          <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Export or evaluate compiled intelligence logs into an offline vector layout</p>
        </div>

        {/* Dashboard Preview Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '👤', label: 'Identity', value: userData?.name || 'Not set', color: theme.text },
            { icon: '🎓', label: 'Academic Track', value: academicData?.gpa ? `${academicData.gpa} GPA` : 'Not set', color: theme.primary },
            { icon: '💼', label: 'Engine Vector', value: assessmentData?.recommended_career || 'Not set', color: theme.success || '#059669' },
            { icon: '⭐', label: 'Skills Profile', value: skillData?.ratings ? `${Object.keys(typeof skillData.ratings === 'string' ? JSON.parse(skillData.ratings) : skillData.ratings).length} Nodes` : 'Not set', color: theme.primary },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px 12px', border: `1.5px solid ${theme.border}`, textAlign: 'center', boxShadow: theme.shadowSm }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.icon}</div>
              <p style={{ margin: '0 0 4px', fontSize: '10px', color: theme.textMuted, fontWeight: '800', textTransform: 'uppercase' }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: '13px', color: item.color, fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Summary Breakdown Manifest */}
        <div style={{ backgroundColor: 'rgba(255,120,0,0.01)', borderRadius: theme.radiusLg || '16px', padding: '24px', marginBottom: '32px', border: `1.5px solid ${theme.border}` }}>
          <h4 style={{ margin: '0 0 16px', color: theme.text, fontWeight: '800', fontSize: '14.5px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>📋 Package Manifest Validation:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Comprehensive Personal Metadata Channels',
              'Academic Transcripts Metrics & Structural GPA Tracking',
              'Tabular Subject Grade Configurations Matrix',
              'Quantified Professional Competency Evaluations',
              'Career Affinity Interest Node Vectors',
              'Real-Time Generative Strategic Engine Advice',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: theme.textSecondary, fontWeight: '600' }}>
                <span style={{ color: theme.primary }}>✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Trigger CTA */}
        <button
          onClick={generatePDF}
          disabled={generating}
          style={{ width: '100%', padding: '16px', background: generating ? 'rgba(255,120,0,0.2)' : theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: generating ? 'not-allowed' : 'pointer', boxShadow: generating ? 'none' : theme.shadowGlow, fontFamily: 'inherit', transition: 'opacity 0.2s' }}
          onMouseOver={e => { if(!generating) e.currentTarget.style.opacity = '0.95'; }}
          onMouseOut={e => { if(!generating) e.currentTarget.style.opacity = '1'; }}
        >
          {generating ? '⏳ Finalizing Document Vectors...' : '📥 Export Strategic Analysis Logs (PDF)'}
        </button>
      </div>
    </div>
  );
}

export default Report;