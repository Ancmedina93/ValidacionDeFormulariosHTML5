export function valida(input){
    const tipoDeInput = input.dataset.tipo; 
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    console.log(input.parentElement)
    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];

const mensajesDeError ={
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        valueMissing: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener minuscula, mayuscula, un unmero y no debe contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio", 
        customError: "Debes tener al menos 18 anios"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
      },
      direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "la direccion debe tener al menpos 3 cacteres y maximo 40",
      },
      ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "la ciudad debe tener al menpos 3 cacteres y maximo 40",
      },
      estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe tener al menpos 3 cacteres y maximo 40",
      },

}

const validadores = {
    nacimiento: input => validarNacimineto(input)
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }


function validarNacimineto(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener por lo menos 18 anios"
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas =  new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
     return   diferenciaFechas <= fechaActual;
}
