//DOM ELEMENTS

//Buttons
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");

//Text Input
const inputField = document.getElementById("qr-text");

//QR Size selection
const size = document.getElementById("size");

//QR code containers
const qrSection = document.getElementById("qr-section");
const qrContainer = document.getElementById("qr-code-container");

//Event Listener
generateBtn.addEventListener("click", function(){generateQR()});
downloadBtn.addEventListener("click", function(){downloadQR()});

//Store input data to the variables
let inputText;
let qrSize;
let qrCodeInstance = null;

//Store the QR Code Image
let qrCodeImg = "";

function generateQR(){
  inputText = inputField.value.trim();
  qrSize = size.value;

  if(!inputText){
    alert("Please enter some text or URL");
    return;
  }

  const sizeNumber = parseInt(qrSize.split("x")[0]);
  qrContainer.innerHTML = "";

  qrCodeInstance = new QRCode(qrContainer, {
    text: inputText,
    width: sizeNumber,
    height: sizeNumber,
    colorDark: "#000000",
    colorLight : "#ffffff",
    correctionLevel: QRCode.CorrectLevel.H
  });
  setTimeout(function(){rendering()}, 100);
  
}

function rendering(){
  const canvas = qrContainer.querySelector("canvas");
  console.log(qrContainer);
  if(canvas){
    qrCodeImg = canvas.toDataURL("image/png");
  }
  qrSection.classList.add("show");
}

function downloadQR(){
  const downloadLink = document.createElement("a");
  downloadLink.href = qrCodeImg;
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}