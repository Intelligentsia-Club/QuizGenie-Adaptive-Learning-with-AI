import React, { useEffect, useState } from "react";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState("PlayerOne");

  useEffect(() => {

    const mockPlayers = [
      { name: "Ava Patel", points: 1620 },
      { name: "Ethan Williams", points: 1490 },
      { name: "PlayerOne", points: 1380 },
      { name: "Liam Brown", points: 1320 },
      { name: "Sophia Chen", points: 1275 },
      { name: "Noah Davis", points: 1200 },
      { name: "Olivia Smith", points: 1155 },
      { name: "Lucas Garcia", points: 1100 },
    ];

   
    mockPlayers.sort((a, b) => b.points - a.points);

    
    const rankedPlayers = mockPlayers.map((p, i) => ({
      ...p,
      rank: i + 1,
    }));

    setPlayers(rankedPlayers);
  }, []);


  const userRank = players.find((p) => p.name === currentUser)?.rank || "-";

  const highestPoints = players.length ? players[0].points : 1;

  return (
    <div style={styles.container}>
      <h2> Leaderboard</h2>
      <p>See how you stack up against the best minds in the quiz arena!</p>

      {/* Your current rating box */}
      <div style={styles.userBox}>
        <h3>Your Rank: #{userRank}</h3>
        <p>
          Player: <strong>{currentUser}</strong>
        </p>
        <p>
          Points:{" "}
          <strong>
            {players.find((p) => p.name === currentUser)?.points || 0}
          </strong>
        </p>
      </div>

      {/* Leaderboard table */}
      <div style={styles.table}>
        <div style={{ ...styles.row, ...styles.header }}>
          <span style={{ flex: 0.5 }}>🏅</span>
          <span style={{ flex: 2 }}>Player</span>
          <span style={{ flex: 1 }}>Points</span>
          <span style={{ flex: 3 }}>Rating</span>
        </div>

        {players.map((player) => (
          <div
            key={player.rank}
            style={{
              ...styles.row,
              backgroundColor:
                player.name === currentUser ? "#e8f7e4" : "white",
              fontWeight: player.name === currentUser ? "bold" : "normal",
            }}
          >
            <span style={{ flex: 0.5 }}>#{player.rank}</span>
            <span style={{ flex: 2 }}>{player.name}</span>
            <span style={{ flex: 1 }}>{player.points}</span>
            <div style={{ flex: 3 }}>
              <div style={styles.progressBarBackground}>
                <div
                  style={{
                    ...styles.progressBarFill,
                    width: `${(player.points / highestPoints) * 100}%`,
                    backgroundColor:
                      player.rank === 1
                        ? "#FFD700"
                        : player.rank === 2
                        ? "#C0C0C0"
                        : player.rank === 3
                        ? "#CD7F32"
                        : "#4CAF50",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  userBox: {
    backgroundColor: "#f0f9ff",
    border: "1px solid #cce7ff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  table: {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 15px",
    borderBottom: "1px solid #eee",
    transition: "background 0.3s ease",
  },
  header: {
    backgroundColor: "#f8f8f8",
    fontWeight: "bold",
    borderBottom: "2px solid #ccc",
  },
  progressBarBackground: {
    width: "100%",
    height: "12px",
    backgroundColor: "#eee",
    borderRadius: "6px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: "6px",
    transition: "width 0.5s ease",
  },
};

export default Leaderboard;
