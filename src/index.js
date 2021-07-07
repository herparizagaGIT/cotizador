import React,{useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import useFetch from "./useFetch";
import swal from 'sweetalert';

const Cotizador = () => {
  const numberInput = useRef();
  const selInput = useRef();
  const [fFinal, setFinalValue] = useState();
  const valores = useFetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
  const cotizar = () => {
    const numberValue = Number(numberInput.current.value);
    const selectValue = selInput.current.value;
    if (valores[0].casa.nombre === 'Dolar Oficial') {
      if (numberValue > 0) {
        if (selectValue === "1") {
          let valorFinal = (numberValue / Number(valores[0].casa.venta.replace(',','.'))).toFixed(2);
          setFinalValue(<p>US$ {valorFinal}</p>);
        }
        else if (selectValue === "2") {
          let valorFinal = (numberValue * Number(valores[0].casa.compra.replace(',','.'))).toFixed(2);
          setFinalValue(<p>AR$ {valorFinal}</p>);
        }
        else {
          swal({
            title: "Error inaceptable",
            text: "Debes elegir un tipo de conversión",
            button: "ENTENDIDO",
          });
        }
      }
      else {
        swal({
          title: "Error inesperado",
          text: "El valor ingresado debe ser superior a 0",
          button: "ENTENDIDO",
        });
      }
    }
  }
  return (
    <main>
      <h1>TU COTIZADOR</h1>
      <section>
        <form>
          <input type="number" min="0" ref={numberInput} placeholder="Valor a convertir"/>
          <select class="form-select form-select-sm" aria-label=".form-select-lg example" ref={selInput}>
            <option value="0">Elige un tipo de conversión...</option>
            <option value="1">Pesos a dólares</option>
            <option value="2">Dólares a pesos</option>
          </select>
          <button type="button" class="btn btn-danger" onClick={cotizar}>Cotizar</button>
        </form>
        <div>
          {fFinal}
        </div>
      </section>
    </main>
  )
}

/*
const App = () => {
  let valorVenta = 0;
  let valorCompra = 0;
  const valores = useFetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
  const Cotizador = () => {
    let monto = Number(document.getElementById('numberInput').value.replace(',','.'));
    let conversor = Number(document.getElementById('selInput').value);
    if (monto > 0) {
      if (conversor === valorVenta) {
        document.getElementById('valorFinal').innerHTML = '<p>US$ ' + (monto / valorVenta).toFixed(2) + '</p>';
      }
      else if (conversor === valorCompra) {
        document.getElementById('valorFinal').innerHTML = '<p>AR$ ' + (monto * valorCompra).toFixed(2) + '</p>';
      }
      else {
        alert('Debe seleccionar un tipo de conversión');
      }
    }
    else {
      alert('el monto ingresado debe ser mayor a 0');
    }
  }
  return (
    <div>   
      <form>
        <input type="number" min="0" max="10" id="numberInput"/>
        {valores.filter(tipo => tipo.casa.nombre === 'Dolar Oficial').map((tipo, i) => {
          valorVenta = Number(tipo.casa.venta.replace(',','.'));
          valorCompra = Number(tipo.casa.compra.replace(',','.'));
          return (
            <select id="selInput" key={i}>
              <option value="0">ELEGIR...</option>
              <option value={valorVenta}>A DÓLAR</option>
              <option value={valorCompra}>A PESO</option>
            </select>
          )
        })}
        <input type="button" value="Cotizar" onClick={Cotizador}/>
      </form>
      <p id="valorFinal"></p>
    </div>
  );
};
*/

ReactDOM.render(<Cotizador />, document.getElementById('root'));