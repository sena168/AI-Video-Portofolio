const AboutSection = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '20px auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          marginBottom: '20px',
          textShadow:
            '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        }}
      >
        About Me
      </h2>
      <p style={{ color: '#94A3B8' }}>
        I'm a creative AI video producer specializing in captivating visual
        storytelling. My portfolio showcases a range of work from promotional
        content to music videos.
      </p>
    </div>
  );
};

export default AboutSection;
