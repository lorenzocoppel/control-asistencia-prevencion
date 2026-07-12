const API_URL =
'https://script.google.com/macros/s/AKfycbxtPBcono-sAlNGSqpJmxWGNeAaer-wAUsDx8ob0wxG9OWxSYnObOA2dh88U6dDmZ8D1A/exec';

let bloqueado = false;

function registrarQR(qr){

  fetch(API_URL,{
    method:'POST',
    body:JSON.stringify({
      qr:qr
    })
  })
  .then(r=>r.json())
  .then(data=>{

      document.getElementById('mensaje').innerHTML =
      data.mensaje;

      setTimeout(()=>{
        document.getElementById('mensaje').innerHTML='';
        bloqueado=false;
      },3000);

  })
  .catch(err=>{

      document.getElementById('mensaje').innerHTML =
      'Error de conexión';

      bloqueado=false;

  });

}

function onScanSuccess(decodedText){

  if(bloqueado) return;

  bloqueado = true;

  registrarQR(decodedText);

}

const html5QrCode =
new Html5Qrcode("reader");

Html5Qrcode.getCameras()
.then(devices => {

  if(devices.length){

      let camara = devices[0].id;

      html5QrCode.start(
        camara,
        {
          fps:10,
          qrbox:250
        },
        onScanSuccess
      );

  }

})
.catch(err => {

  document.getElementById('mensaje').innerHTML =
  'No se pudo abrir la cámara';

});
