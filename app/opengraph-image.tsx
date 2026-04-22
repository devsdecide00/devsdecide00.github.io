import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: '#faf7f2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 80px 64px',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            background: '#1c1a17',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#faf7f2',
            fontStyle: 'italic',
            fontSize: 28,
          }}
        >
          d
        </div>
        <span style={{ fontSize: 22, fontFamily: 'Georgia, serif', color: '#1c1a17', fontWeight: 600 }}>
          Developers Decide
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            color: '#1c1a17',
            letterSpacing: -2,
            marginBottom: 24,
            fontFamily: 'Georgia, serif',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          AI automation for&nbsp;
          <span style={{ fontStyle: 'italic', color: '#8a2b2b' }}>Alabama small business.</span>
        </div>
        <div style={{ fontSize: 24, color: '#4b463d', lineHeight: 1.5, display: 'flex' }}>
          HVAC · Construction · Staffing · and more · Hoover, AL
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 32,
          borderTop: '1px solid #e3dcc9',
        }}
      >
        <span style={{ fontSize: 18, color: '#8a8174' }}>devsdecide.com</span>
        <span style={{ fontSize: 18, color: '#8a2b2b' }}>Flat-rate · Month-to-month · Cancel anytime</span>
      </div>
    </div>,
    { ...size }
  );
}
