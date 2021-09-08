document.body.onload = () => {
  const contributer = localStorage.getItem("octoContributer")
    ? JSON.parse(localStorage.getItem("octoContributer"))
    : { name: "Fulano de Tal" };
  /*
   *  Drawing canvas to download certificate
   */
  const certificateImage = document.querySelector(".certificate__image");
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.setAttribute("width", "570");
  canvas.setAttribute("height", "1013");
  canvas.style.width = "570px";
  canvas.style.height = "1013px";

  // Draw image
  canvasContext.drawImage(certificateImage, 0, 0);

  // Draw text
  canvasContext.font = "1.8rem Arial";
  const nameHorizontalPosition =
    (570 - canvasContext.measureText(contributer.name).width) / 2;
  canvasContext.fillText(contributer.name, nameHorizontalPosition, 410);

  // Debugging
  //   document.body.appendChild(canvas);
  const printCertificate = () => {
    const imageData = canvas.toDataURL("image/png", 1);
    const newData = imageData.replace(
      /^data:image\/png/,
      "data:application/octet-stream"
    );

    const link = document.createElement("a");
    link.download = "Certificado_De_Contribuição.png";
    link.href = newData;
    link.click();
  };

  document.querySelector("#generateCertificate").onclick = (event) => {
    printCertificate();
  };
};
