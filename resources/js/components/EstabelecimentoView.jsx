import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default () => {
    const {id} = useParams()
    const [fila, setFila] = useState([])


    const requisitarFilaEstabelecimento = async () => {
        try {
            const response = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila`)
            const filaJson = await response.json()
            setFila(filaJson)
            console.log(filaJson)
        } catch(e) {
            console.log('e', e)
        }

    }
    useEffect(() => {
        requisitarFilaEstabelecimento()
    }, [])

    return <>
        Visualizando estabelecimento #{id}
        <pre>
            {JSON.stringify(fila)}
        </pre>
    </>
}