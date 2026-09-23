import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate (PCM)</h4>
                <h5>UPMSP</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed intermediate education in the Science stream with a score of 83%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Allenhouse Institute of Technology</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently pursuing undergraduate studies. Finalist participant in national-level hackathons and competitive coding events, including the Smart India Hackathon 2026 and HackShodh 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
