import { useState, useEffect } from 'react';

const useJsonFetch = (url: string, options: any) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFunc = async () => {
            setLoading(true);

            const response = await fetch(url, options);
            const jsonData = await response.json();

            if (jsonData.error) setError(jsonData.status);
            setData(jsonData.data);
            setLoading(false);
        };

        if (url) fetchFunc();
    }, []);

    return { loading, data, error };
};

export default useJsonFetch;
