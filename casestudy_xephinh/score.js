let highscores = []
function updateHighscoreTable() {
  let table = document.getElementById("highscore-table");
  table.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

  // Sắp xếp mảng highscores theo điểm giảm dần
  highscores.sort((a, b) => b.score - a.score);

  // Hiển thị thông tin từ mảng highscores vào bảng
  for (let i = 0; i < highscores.length; i++) {
    let rank = i + 1;
    let name = highscores[i].name;
    let score = highscores[i].score;
    let row = "<tr><td>" + rank + "</td><td>" + name + "</td><td>" + score + "</td></tr>";
    table.innerHTML += row;
  }
}

// Hàm để thêm điểm vào highscores
function addScore(name, score) {
  highscores.push({ name: name, score: score });
  updateHighscoreTable();
}
