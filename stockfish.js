let stockfish;

function initStockfish() {
  if (typeof Worker !== 'undefined') {
    stockfish = new Worker("https://cdn.jsdelivr.net/npm/stockfish@16.1.0/stockfish.js");
    stockfish.onmessage = function (event) {
      const line = event.data;
      if (line.startsWith("info depth") && line.includes("pv")) {
        const bestMatch = line.match(/score (cp|mate) (-?\d+).*pv (.+)/);
        if (bestMatch) {
          const type = bestMatch[1];
          const value = bestMatch[2];
          const moves = bestMatch[3];
          const move = moves.split(" ")[0];
          const evalText = type === "cp"
            ? (value / 100.0).toFixed(2)
            : `Mate in ${Math.abs(value)}`;
          document.getElementById("engineEval").textContent =
            `💡 Best move: ${move} | Eval: ${evalText}`;
        }
      }
    };
  } else {
    console.error("Web Workers not supported.");
  }
}

function evalPosition(fen) {
  if (!stockfish) initStockfish();
  stockfish.postMessage("ucinewgame");
  stockfish.postMessage("position fen " + fen);
  stockfish.postMessage("go depth 15");
}
