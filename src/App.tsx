import { useEffect, useState } from "react";
import click from "./assets/click.wav";

function App() {
  const audioctx = new AudioContext();
  let click_bufferizado_na_memoria: AudioBuffer;
  const [tocando, setTocando] = useState(false);

  async function extrair_buffer_do_arquivo() {
    if (audioctx.state === "suspended") {
      await audioctx.resume();
    }
    let response = await fetch(click);
    let raw_buffer = await response.arrayBuffer();
    click_bufferizado_na_memoria = await audioctx.decodeAudioData(raw_buffer);
  }

  useEffect(() => {
    extrair_buffer_do_arquivo();
  }, []);

  return (
    <div className="maindiv">
      <div className="nodes">
        Fonte de áudio: arquivo wav
        <button
          onClick={() => {
            let fonte_do_click = audioctx.createBufferSource();
            fonte_do_click.buffer = click_bufferizado_na_memoria;
            fonte_do_click.connect(audioctx.destination);
            fonte_do_click.start(audioctx.currentTime);
          }}
        >
          Tocar
        </button>
        <button>Parar</button>
      </div>
      <div className="nodes">Destino final: 🔊</div>
    </div>
  );
}

export default App;
