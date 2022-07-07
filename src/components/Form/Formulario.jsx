import { useState } from "react";
import style from "../Form/Formulario.module.css"


const Formulario = () => {
    const [datos, setDatos] = useState({
        inversion: 1000,
        meses: 1,
        rendimiento: 0.8,
        aumento: 100
    });
    const [resultados, setResultados] = useState({});

    const handleOnChange = (e) => {
        setResultados({})
        setDatos({...datos, [e.target.name]: e.target.value ? parseFloat(e.target.value) : ""})
    }
    
    //formula interes compuesto: inversion inicial * (porcentaje base 100 dividido 100) ^ periodo =  
    //logica inicial; pensada para calcular inversion
    const handleOnSubmit = (e) => {
        e.preventDefault()
        setResultados({})
        
        let rendimientoMensual = [];
        let inversion = datos.inversion;

        for (let i = 0; i < datos.meses; i++) {
            let porcentaje = inversion/100*datos.rendimiento;
            
            rendimientoMensual.push(porcentaje)
            
            inversion += porcentaje + datos.aumento;
            
        }

        let inversionTotal = datos.inversion + datos.aumento * datos.meses;
        let ganancias = inversion - inversionTotal;

        setResultados({ 
            resultado: inversion - datos.aumento, 
            inversionTotal: inversionTotal - datos.aumento, 
            ganancias: ganancias, 
            rendimientoMensual : rendimientoMensual,
        })
}

    return (
    <div className={style.container}>
        <div className={style.global}>
            <form onSubmit={e => handleOnSubmit(e)}>
                <div>
                <label>Inversion inicial: <input type="number" value={datos.inversion} onChange={e => handleOnChange(e)} name="inversion" pattern="^[0-9,.$]*$" required></input></label>
                <label>Cantidad de meses: <input type="number" value={datos.meses} onChange={e => handleOnChange(e)} name="meses" pattern="^[0-9,$]*$" min="1" required></input></label>
                <label>Rendimiento mensual (%): <input type="number" value={datos.rendimiento} onChange={e => handleOnChange(e)} name="rendimiento" pattern="^[0-9,.$]*$" required></input></label>
                <label>Aumento mensual de inversion: <input type="number" value={datos.aumento} onChange={e => handleOnChange(e)} name="aumento" pattern="^[0-9,$]*$" min="0" required></input></label>
                <button type="submit">calcular</button>
                </div>
            </form>
            <p>{datos.inversion ? `Inversion inicial: ${datos.inversion} $` : null}</p>
            <p>{datos.meses ? `Lapso de tiempo (en meses): ${datos.meses}` : null}</p>
            <p>{datos.rendimiento ? `Rendimiento mensual: ${datos.rendimiento} %` : null}</p>
            <p>{datos.aumento ? `Deposito mensual en inversion: ${datos.aumento} $` : null}</p>
            <h4>{resultados.resultado ? `Total (Bruto): ${resultados.resultado.toFixed(2)} $` : null}</h4>
            <h4>{resultados.inversionTotal ? `Inversion Total: ${resultados.inversionTotal.toFixed(2)} $` : null}</h4>
            <h4>{resultados.ganancias ? `Ganancias totales (Neto): ${resultados.ganancias.toFixed(2)} $` : null}</h4>

            <div className={style.yield_container}>
                <div>
                    {resultados.rendimientoMensual?.map((e,i) => (<p key={i+1} className={i % 2 === 0? style.yield : style.yield2}>{`Ganancias del mes ${i+1}: `} <b>{e.toFixed(2)} $</b> </p>) )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Formulario;