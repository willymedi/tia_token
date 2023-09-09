import {  useEffect, useState, useContext } from "react"
import DataTable from 'react-data-table-component';
import { AuthContext } from "../../auth/context/AuthContext";
import { getAllTokenUsage } from "../../api/getAllTokenUsage";

const columns = [
    {
        name: 'Token',
        sortable: true,
        selector: row => row.token_value,
    },
    {
        name: 'Usuario',
        sortable: true,
        selector: row => row.user_username,
    },
    {
        name: 'Fecha de uso',
        sortable: true,
        selector: row => row.token_usage_used_at,
    }
];


export const TokenUsagePage = () => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);
    useEffect(() => {
        async function getTokenUsage() {
            try {
              const response = await getAllTokenUsage(user.name)
              setDataToShow(response)
              setData(response)
            } catch (error) {
              console.error('Error al hacer la llamada a la API:', error);
            }
          }
          getTokenUsage()
    }, [user.name])

    function handleFilter(event) {
        const newData = data.filter(row => {
            return row.token_value.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setDataToShow(newData)
    }
    
  return (
    <>
        <h4>Usos del token</h4>
        <div className="text-end">
            <label htmlFor="token">Buscar por token</label>
            <input id="token" name="token" type="text" onChange={handleFilter} />
        </div>
        <DataTable
            columns={columns}
            data={dataToShow}
        />

    </>
  )
}
