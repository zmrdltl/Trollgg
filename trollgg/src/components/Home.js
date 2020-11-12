import React, { useState } from "react";
const Home = () => {
  const [summonerName, setSummonerName] = useState("");

  const moveToResultPage = (summonerName) => {
    document.location.href = `/Result?name=${summonerName}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      moveToResultPage(e.target.value);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "block" }}>
        <div style={{ fontWeight: "bold", fontSize: "48px" }}>Trollgg</div>
        <div style={{ marginBottom: "40px" }}>
          <img
            src={require("../assets/main.png")}
            alt={"메인페이지"}
            style={styles.topImage}
          ></img>
        </div>
      </div>

      <div style={styles.topSpan}>
        <input
          style={styles.input}
          placeholder=" 트롤러 이름"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          name="name"
        />

        <button
          style={styles.button}
          onClick={() => moveToResultPage(summonerName)}
        >
          검색
        </button>
      </div>
      <footer class="ant-layout-footer" style={{ textAlign: "center" }}>
        <a href="https://github.com/zmrdltl">
          <span
            role="img"
            aria-label="github"
            class="anticon anticon-github"
            style={{ fontSize: "30px", margin: "10px", color: "black" }}
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              class=""
              data-icon="github"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
            </svg>
          </span>
        </a>
      </footer>
    </div>
  );
};
export default Home;

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundSize: "cover",
    background: "#f2f2f2",
  },

  topImage: {
    width: "1000px",
    height: "500px",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px auto",
    borderRadius: "10px",
  },

  topSpan: {
    display: "block",
  },

  input: {
    width: "624px",
    height: " 50px",
    marginRight: "10px",
    border: " 3px solid #343a40",
  },

  button: {
    width: "70px",
    height: "50px",
    margin: "0px auto",
    border: "none",
    borderRadius: "5px",
    fontSize: "15pt",
    backgroundColor: "#343a40",
    color: "#f2f2f2",
  },
};
