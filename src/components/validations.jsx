function validarUserRegister(usuario){
    var longitud=usuario.length;
    var mensaje="";
    if(longitud==0||longitud>8){
        usuario= null
        mensaje="Campo Usuario vacio o demasiado largo. "
    }else{
        for(var i=0; i<longitud; i++){
            if(usuario.charAt(i)==" "){
                usuario=null;
                longitud=0;
                mensaje="Campo Usuario con espacio. "
            }
        }
    }
    console.log(usuario)
    return {"usuario":usuario,
            "mensaje": mensaje}
}

function validarPasswordRegister(password){
    var longitud=password.length;
    var mensaje="";
    if(longitud==0){
        password=null
        mensaje="Campo Password vacio. "
    }else{
        for(var i=0; i<longitud; i++){
            if(password.charAt(i)==" "){
                password=null;
                longitud=0;
                mensaje="Campo Password con espacio. "
            }
        }
    }
    console.log(password)
    return {"password":password,
            "mensaje": mensaje}
}

function validarUserIniSesion(usuario){
    var longitud=usuario.length;
    var mensaje="";
    if(longitud==0){
        usuario= null
        mensaje="Campo Usuario vacio. "
    }else{
        usuario=usuario.replace("#", "%23")
    }
    console.log(usuario)
    return {"usuario":usuario,
            "mensaje": mensaje}
}

function validarPasswordIniSesion(password){
    var longitud=password.length;
    var mensaje="";
    if(longitud==0){
        password= null
        mensaje="Campo Password vacio. "
    }else{
        password=password.replace("#", "%23")
    }
    console.log(password)
    return {"password":password,
            "mensaje": mensaje}
}

function validarNombres(nombre){
    var longitud=nombre.length;
    var mensaje="";
    if (longitud==0||longitud>8){
        nombre=null;
        mensaje="Campo vacio o demasiado largo."
    }
    return {"nombre":nombre,
            "mensaje": mensaje}
}

function validarCantidad(cantidad){
    var longitud=cantidad.length;
    var mensaje="";
    if(longitud==0){
        cantidad=null
        mensaje="Campo 'Capacidad Maxima' vacio"
    }
    return {"cantidad":cantidad,
            "mensaje": mensaje}
}

export {validarUserRegister, validarPasswordRegister, validarUserIniSesion, validarPasswordIniSesion, validarNombres, validarCantidad};