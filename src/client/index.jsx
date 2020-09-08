import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "something", isRecording: false, isCancel: false };
    var isCanceled = false;

    const socket = io.connect();

    //================= CONFIG =================
    // Stream Audio
    let bufferSize = 2048,
      AudioContext,
      context,
      processor,
      input,
      globalStream;

    //vars
    let audioElement = document.querySelector("audio"),
      finalWord = false,
      resultText = document.getElementById("ResultText"),
      removeLastSentence = true,
      streamStreaming = false;

    //audioStream constraints
    const constraints = {
      audio: true,
      video: false,
    };
  }

  // initRecording() {
  //   socket.emit("startGoogleCloudStream", ""); //init socket Google Speech Connection
  //   streamStreaming = true;
  //   AudioContext = window.AudioContext || window.webkitAudioContext;
  //   context = new AudioContext({
  //     // if Non-interactive, use 'playback' or 'balanced' // https://developer.mozilla.org/en-US/docs/Web/API/AudioContextLatencyCategory
  //     latencyHint: "interactive",
  //   });
  //   processor = context.createScriptProcessor(bufferSize, 1, 1);
  //   processor.connect(context.destination);
  //   context.resume();

  //   var handleSuccess = function (stream) {
  //     globalStream = stream;
  //     input = context.createMediaStreamSource(stream);
  //     input.connect(processor);

  //     processor.onaudioprocess = function (e) {
  //       microphoneProcess(e);
  //     };
  //   };

  //   navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);
  // }

  pressRecButton = () => {
    console.log("recbutton pressed");
    if (!this.state.isRecording) {
      console.log("start Recording");
    } else {
      console.log("stop Recording");
    }
    this.toggleRecodingStatus();
  };

  pressCancelButton = () => {
    console.log("cancelbutton pressed");
    this.setState({ isCancel: !this.state.isCancel });
    this.toggleRecodingStatus();
    this.setState({ isCancel: !this.state.isCancel });
  };

  toggleRecodingStatus = () => {
    this.setState({ isRecording: !this.state.isRecording });
  };

  branchRec = () => {
    console.log("branchRec");
    // if (toggleRecButton.className === "recording") {
    //   stopRecording();
    //   console.log("stoprec");
    // } else {
    //   startRecording();
    //   console.log("startrec");
    // }
    // toggleRecButton.classList.toggle("recording");
  };

  startRecording = () => {
    console.log("rec Start");
    // isCanceled = false;
    // $("#cancelButton").prop("disabled", false);

    // initRecording();
  };

  render() {
    //////////////////////////////////////////////////////////////////////////
    return (
      <div>
        <div className="container">
          <div id="cover" className="bubble01">
            <div className="talkAreaWrapper" id="autoScrollTarget">
              <div id="ResultText">
                <span className="greyText"></span>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <audio></audio>
            <div className="console">
              <button
                id="toggleRecButton"
                type="button"
                accessKey="a"
                onClick={this.pressRecButton}
              >
                REC
              </button>
              <button
                id="cancelButton"
                type="button"
                disabled={!this.state.isRecording}
                accessKey="s"
                onClick={this.pressCancelButton}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//================= RECORDING =================

// function microphoneProcess(e) {
//   var left = e.inputBuffer.getChannelData(0);
//   // var left16 = convertFloat32ToInt16(left); // old 32 to 16 function
//   var left16 = downsampleBuffer(left, 44100, 16000);
//   socket.emit("binaryData", left16);
// }

// var castText = document.getElementById("castText");
// var scrollTarget = document.getElementById("autoScrollTarget");

// //================= INTERFACE =================
// var toggleRecButton = document.getElementById("toggleRecButton");
// var cancelButton = document.getElementById("cancelButton");
// toggleRecButton.addEventListener("click", branchRec);
// cancelButton.addEventListener("click", cancelRecording);

// var recordingStatus = document.getElementById("recordingStatus");

// const stopRecording = () => {
//   // waited for FinalWord
//   streamStreaming = false;

//   const sendData = {
//     data: $("#ResultText :last-child>p").text(),
//     isCanceled: isCanceled,
//   };
//   socket.emit("endGoogleCloudStream", sendData);

//   let track = globalStream.getTracks()[0];
//   track.stop();

//   input.disconnect(processor);
//   processor.disconnect(context.destination);
//   context.close().then(function () {
//     input = null;
//     processor = null;
//     context = null;
//     AudioContext = null;
//   });
//   if (resultText.childElementCount > 2) {
//     console.log("remove child");
//     resultText.firstElementChild.remove();
//   }

//   $("#cancelButton").prop("disabled", true);
// };

// function cancelRecording() {
//   streamStreaming = false;
//   console.log("キャンセルボタンがおされたよ。キャンセルにするよ");
//   isCanceled = true;
//   const sendData = {
//     data: $("#ResultText :last-child>p").text(),
//     isCanceled: isCanceled,
//   };
//   socket.emit("endGoogleCloudStream", sendData);

//   let track = globalStream.getTracks()[0];
//   track.stop();

//   input.disconnect(processor);
//   processor.disconnect(context.destination);
//   context.close().then(function () {
//     input = null;
//     processor = null;
//     context = null;
//     AudioContext = null;
//   });
//   //	$("#ResultText :last-child>p").css({'text-decoration':'line-through'})
//   $("#ResultText :last-child>p").remove();
//   $("#cancelButton").prop("disabled", true);
//   toggleRecButton.classList.toggle("recording");
// }

// //================= SOCKET IO =================
// socket.on("connect", function (data) {
//   socket.emit("join", "Server Connected to Client");
// });

// socket.on("messages", function (data) {
//   console.log(data);
// });

// //翻訳処理を無限にここに書く

// socket.on("applyTranslation", function (translatedTextData) {
//   const span = document.createElement("span");
//   const target = resultText.lastElementChild.lastElementChild;
//   target.appendChild(span);
//   target.lastElementChild.appendChild(
//     document.createTextNode(`${translatedTextData}`)
//   );
//   target.lastElementChild.classList.add("translatedEnglish");
// });

// socket.on("readText", function (data) {
//   if (data) {
//     // navigator.clipboard.writeText(data);
//     // console.log(`${data} をコピーしました`)
//     const temp = new SpeechSynthesisUtterance(data);
//     speechSynthesis.speak(temp);
//   }
// });

// socket.on("speechData", function (data) {
//   // console.log(data.results[0].alternatives[0].transcript);
//   var dataFinal = undefined || data.results[0].isFinal;

//   if (dataFinal === false) {
//     // console.log(resultText.lastElementChild);
//     if (removeLastSentence) {
//       resultText.lastElementChild.remove();
//     }
//     removeLastSentence = true;

//     //add empty span
//     let empty = document.createElement("div");
//     resultText.appendChild(empty);

//     //add children to empty span
//     let edit = addTimeSettingsInterim(data);

//     for (var i = 0; i < edit.length; i++) {
//       resultText.lastElementChild.appendChild(edit[i]);
//       // resultText.lastElementChild.appendChild(document.createTextNode('。'));
//     }
//   } else if (dataFinal === true) {
//     console.log("Google Speech sent 'final' Sentence.");

//     //文字起こしした結果をここで翻訳する
//     //socket.emit('translate-deepL',$("#ResultText :last-child>p").text())
//     finalWord = true;
//     removeLastSentence = false;
//   }

//   $(function () {
//     $("#autoScrollTarget")
//       .delay(100)
//       .animate(
//         {
//           scrollTop: $(document).height(),
//         },
//         1500
//       );
//   }); //
// });

// //================= Juggling Spans for nlp Coloring =================
// function addTimeSettingsInterim(speechData) {
//   let wholeString = speechData.results[0].alternatives[0].transcript;
//   console.log(wholeString);

//   let nlpObject = nlp(wholeString).out("terms");

//   let words_without_time = [];
//   let word = nlpObject
//     .map((obj) => {
//       return obj.text;
//     })
//     .join("");
//   let newSpan = document.createElement("p");
//   newSpan.innerHTML = word;

//   words_without_time.push(newSpan);

//   finalWord = false;
//   return words_without_time;
// }

// window.onbeforeunload = function () {
//   if (streamStreaming) {
//     socket.emit("endGoogleCloudStream", "");
//   }
// };

// //================= SANTAS HELPERS =================

// // sampleRateHertz 16000 //saved sound is awefull
// function convertFloat32ToInt16(buffer) {
//   let l = buffer.length;
//   let buf = new Int16Array(l / 3);

//   while (l--) {
//     if (l % 3 == 0) {
//       buf[l / 3] = buffer[l] * 0xffff;
//     }
//   }
//   return buf.buffer;
// }

// var downsampleBuffer = function (buffer, sampleRate, outSampleRate) {
//   if (outSampleRate == sampleRate) {
//     return buffer;
//   }
//   if (outSampleRate > sampleRate) {
//     throw "downsampling rate show be smaller than original sample rate";
//   }
//   var sampleRateRatio = sampleRate / outSampleRate;
//   var newLength = Math.round(buffer.length / sampleRateRatio);
//   var result = new Int16Array(newLength);
//   var offsetResult = 0;
//   var offsetBuffer = 0;
//   while (offsetResult < result.length) {
//     var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
//     var accum = 0,
//       count = 0;
//     for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
//       accum += buffer[i];
//       count++;
//     }

//     result[offsetResult] = Math.min(1, accum / count) * 0x7fff;
//     offsetResult++;
//     offsetBuffer = nextOffsetBuffer;
//   }
//   return result.buffer;
// };

// function capitalize(s) {
//   if (s.length < 1) {
//     return s;
//   }
//   return s.charAt(0).toUpperCase() + s.slice(1);
// }

render(<App />, document.getElementById("app"));
