const Contenedor = document.getElementById('Contenedor');
const Jugar = document.getElementById('IniciarJuego');
const LetrasUsadasElemento = document.getElementById('LetrasUsadas');

var Canvas = document.getElementById('Canvas');
var ctx = Canvas.getContext('2d');

let PalabraSeleccionada;
let LetraUsada;
let Errores;
let Aciertos;
let Partes = 8;

const Parte1 = () => {
  ctx.fillStyle = '#156394';
  ctx.fillRect(80,190,60,10);
  ctx.fillRect(90,180,40,10);
}
const Parte2 = () => {
  ctx.fillRect(100,40,20,140);
}

const Parte3 = () => {
  ctx.fillRect(100,20,100,20);
  ctx.beginPath();
  ctx.moveTo(180,28);
  ctx.lineTo(108,100);
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#156394';
  ctx.stroke();
}

const Parte4 = () => {
  ctx.fillRect(185,20,5,60);
}

const Parte5 = () => {
  ctx.beginPath();
  ctx.arc(187.25,80,10,0,2*Math.PI);
  ctx.fill();
}

const Parte6 = () => {
  ctx.fillRect(185,80,5,40);
}

const Parte7 = () => {
  ctx.beginPath();
  ctx.moveTo(187.25,100);
  ctx.lineTo(175,110);
  ctx.moveTo(187.25,100);
  ctx.lineTo(199.5,110);
  ctx.lineWidth = 5;
  ctx.stroke();
}

const Parte8 = () => {
  ctx.beginPath();
  ctx.moveTo(187.25,120);
  ctx.lineTo(175,130);
  ctx.moveTo(187.25,120);
  ctx.lineTo(199.5,130);
  ctx.lineWidth = 5;
  ctx.stroke();
}

const Borrar = () => {
  ctx.fillStyle = '#fee619';
  ctx.fillRect(0,0,300,200);
}

const AñadirLetra = letra => {
  const ElementoLetras = document.createElement('span');
  ElementoLetras.innerHTML = letra.toUpperCase();
  LetrasUsadasElemento.appendChild(ElementoLetras);
} 

const FindeJuegoPerdio = () => {
  document.removeEventListener('keydown',LetraIngresada);
  alert('Fin del juego')
  Jugar.style.display = 'block';
}

const LetraIncorrecta = () => {
  Errores++;
  if(Errores===Partes){
    FindeJuegoPerdio ();
  } else{
    switch (Errores){
      case 1: 
        Parte1();
        break;
      case 2: 
        Parte2();
        break;
      case 3: 
        Parte3();
        break;
      case 4: 
        Parte4();
        break;
      case 5: 
        Parte5();
        break;
      case 6: 
        Parte6();
        break;
      case 7: 
        Parte7();
        Parte8();
        break;
    }
  }
}

const FindeJuegoGano = () => {
  document.removeEventListener('keydown',LetraIngresada);
  alert('Ganaste, Felicidades!')
  Jugar.style.display = 'block';
}

const LetraCorrecta = letra => {
  const  { children } = Contenedor;
  for(let i = 0; i<children.length; i++){
    if(children[i].innerHTML === letra){
      children[i].classList.toggle('hidden');
      Aciertos++;
    }
  }
  if(Aciertos === PalabraSeleccionada.length){
    FindeJuegoGano();
  } 
}

const LetraEntrada = letra => {
  if(PalabraSeleccionada.includes(letra)){
    LetraCorrecta(letra);
  }else{
    LetraIncorrecta();
  }
  AñadirLetra(letra);
  LetraUsada.push(letra);
}

const LetraIngresada = event => {
  let NuevaLetra = event.key.toUpperCase();
  if(NuevaLetra.match(/^[a-z]$/i) && !LetraUsada.includes(NuevaLetra)){
    LetraEntrada(NuevaLetra);
  }else{
    alert('No es posible escribir números y no deben ser utilizadas letras con acentos, caracteres especiales o letras ya ingresadas.')
  }
}

const DibujarPalabra = () => {
  PalabraSeleccionada.forEach(letras =>{
    const elementoletras = document.createElement('span');
    elementoletras.innerHTML = letras.toUpperCase();
    elementoletras.classList.add('letter');
    elementoletras.classList.add('hidden');
    Contenedor.appendChild(elementoletras);
  })
}

const SeleccionarPalabraAleatoria = () => {
  let Palabra = Palabras[Math.floor(Math.random() * Palabras.length)].toUpperCase();
  PalabraSeleccionada = Palabra.split('');
}

const Iniciar = () => {
  Borrar();
  LetraUsada = [];
  Errores = 0;
  Aciertos = 0;
  Contenedor.innerHTML = '';
  LetrasUsadasElemento.innerHTML = ''; 
  Jugar.style.display = 'none'; //Ocultar botón
  SeleccionarPalabraAleatoria();
  DibujarPalabra();
  document.addEventListener('keydown',LetraIngresada);  
}

Jugar.addEventListener('click',Iniciar);
