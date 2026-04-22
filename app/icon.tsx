import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#1c1a17',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#faf7f2',
        fontStyle: 'italic',
        fontSize: 22,
        fontFamily: 'Georgia, serif',
        paddingBottom: 2,
      }}
    >
      d
    </div>,
    { ...size }
  );
}
