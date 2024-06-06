import Axios from "axios";
import { useEffect, useState } from "react"

const useAxios = (param) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    Axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

    const fetchData = async (param) => {
        try {
            setLoading(true);
            const result = await Axios(param);
            setResponse(result.data);
        } catch (err) {
            console.log(err)
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(param);
    }, []);

    return {
        response, loading, error
    }
}

export default useAxios