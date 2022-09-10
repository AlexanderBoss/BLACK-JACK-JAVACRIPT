

const miModulo=(()=>{
    'use strict'

            
        let deck=[]
        const tipos = ["C","D","H","S"]
        const especiales = ["A","J","Q","k"]

        let puntosJugador =0
        let puntosComputadora =0

        //Referencias del HTML
        const btnPedirs = document.querySelector("#btnPedir")
        const botonDetener = document.querySelector("#btnDetener")
        const botonNuevo = document.querySelector("#btnNuevo")
        
        const puntosHTML = document.querySelectorAll('small')
        const divCartasJugador = document.querySelector("#jugador-cartas")
        const divCartasComputadora = document.querySelector("#computadora-cartas")
       

        //FUNCIONES

        //Esta funcion crea una baraja de cartas
        const crearDeck = () =>{

            for(let i =2; i<= 10;i++ ){
                for(let tipo of tipos){
                    deck.push(i+tipo)
                }
                // deck.push(i+'C')
            }    
            for(let tipo of tipos){
                for(let especial of especiales){
                    deck.push(especial+tipo)
                }
            }

            //carta ordenada
            // console.log(deck);

            //carta desordenada con libreria undercore
            deck = _.shuffle(deck)
            // console.log(deck);
            
            return deck
        }

        crearDeck()


        //esta funcion saca una carta de la baraja
        const pedirCarta = ( ) =>{

            const carta = deck.pop()

            if(deck.length === 0){
                throw "No hay cartas en la baraja"
            }else{
                
            }
            // console.log(deck);
            // console.log(carta);
            return carta
        }

        //pedirCarta
        const valorCarta = (carta)=>{

            const valor = carta.substring(0,carta.length-1)
            return ( isNaN( valor ) ) ? 
                    (valor ==='A')? 11 : 10
                    : valor*1
            
        }


        //turno de la computadora
        const turnoComputadora = ( puntosMinimos )=>{
            do {
            
            const carta = pedirCarta();

            puntosComputadora= puntosComputadora + valorCarta(carta);

            puntosHTML[1].innerText = puntosComputadora

            //crear la imagen de la carta
            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('carta')
            divCartasComputadora.append( imgCarta)
            if(puntosMinimos>21){
                break;
            }

            } while ( (puntosComputadora < puntosMinimos) &&( puntosMinimos <= 21) )
        
            setTimeout(() => {
                
            
                if(puntosComputadora === puntosMinimos){
                    alert("Nadie gana")
                }else if(puntosMinimos > 21){
                    alert("Computadora gana")
                }else if(puntosComputadora > 21){
                    alert("Jugador gana")
                }else if(puntosComputadora > puntosMinimos){
                    alert("Computadora gana")
                }else{
                    alert("Jugador gana")
                }

            }, 10);
        
        }



        //evento click del boton pedir
        btnPedirs.addEventListener('click',()=>{
            
            const carta = pedirCarta();

            puntosJugador = puntosJugador + valorCarta(carta);

            puntosHTML[0].innerText = puntosJugador

            //crear la imagen de la carta
            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('carta')
            divCartasJugador.append( imgCarta)



            if(puntosJugador > 21){
                alert("Perdiste")
                btnPedirs.disabled = true
                botonDetener.disabled = true
                turnoComputadora(puntosJugador)

            }else if(puntosJugador === 21){
                alert("Ganaste")
                btnPedirs.disabled = true
                botonDetener.disabled = true
            }


        } )


        botonDetener.addEventListener('click',()=>{
            btnPedirs.disabled = true
            botonDetener.disabled = true
            turnoComputadora(puntosJugador)
        })

        botonNuevo.addEventListener('click',()=>{
            console.clear()
            deck = crearDeck()
            puntosJugador = 0
            puntosComputadora = 0

            puntosHTML[0].innerText=0
            puntosHTML[1].innerText=0

            divCartasJugador.innerHTML = ''
            divCartasComputadora.innerHTML = ''
            btnPedirs.disabled = false
            botonDetener.disabled = false

        })


})();








//TODO BORRAR
// console.log(16);
// turnoComputadora( 30);

