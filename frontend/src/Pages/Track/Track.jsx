import React from "react";

const Track = () => {
  return (
    <div>
      <div
        style={{
          fontFamily: "Tilt Warp",
          padding: "20px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#0056D2" }}>RESEARCH GOAL TRACKER</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search your goals"
              style={{
                padding: "8px 12px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                width: "300px",
                marginRight: "20px",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#ccc",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              AK
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section style={{ marginTop: "30px" }}>
          <h2>Welcome, Ashok</h2>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {/* Current Research Progress */}
            <div style={{ flex: "1", marginRight: "20px" }}>
              <h3>Current Research</h3>
              <div
                style={{
                  background: "#000",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <img
                  src="https://via.placeholder.com/600x200"
                  alt="Research"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <div style={{ marginTop: "10px" }}>
                  <h4>Data Analysis for Climate Change</h4>
                  <div
                    style={{
                      height: "5px",
                      backgroundColor: "#eee",
                      borderRadius: "5px",
                      marginTop: "8px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "20%",
                        backgroundColor: "#4CAF50",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                  <p style={{ marginTop: "5px" }}>20% Completed</p>
                </div>
              </div>
            </div>

            {/* Weekly Goals */}
            <div style={{ flex: "0.5", textAlign: "center" }}>
              <h3>Weekly Goals</h3>
              <p>December 10 - December 16</p>
              <p>
                <strong>3/10 Papers Reviewed</strong>
              </p>
              <p>2 Weeks Current Streak</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ marginTop: "20px" }}>
          <h3>Your Research Progress</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Papers Published", value: 3 },
              { label: "Conferences Attended", value: 5 },
              { label: "Collaborations Initiated", value: 2 },
              { label: "Citations Received", value: 15 },
              { label: "Workshops Conducted", value: 1 },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  flex: "1",
                  backgroundColor: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "8px",
                  margin: "10px",
                  textAlign: "center",
                }}
              >
                <h4>{stat.label}</h4>
                <p style={{ fontSize: "24px", color: "#4CAF50" }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Track;
