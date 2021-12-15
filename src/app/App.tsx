import '../css/defaultStyle.css';
import React from 'react';
import useJsonFetch from './useJsonFetch';
import { Box } from './components/primitives/Box';
import { BoxProps } from './components/primitives/rebassTypes';

type CheckComponentProps = BoxProps & { url: string };

const CheckComponent = ({ url }: CheckComponentProps) => {
    const { data, error, loading } = useJsonFetch(url, null);

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>{error}</Box>;
    return <Box>{data}</Box>;
};

export default function App() {
    return (
        <Box variant='layout'>
            <CheckComponent url='http://localhost:7070/error' />
            <CheckComponent url='http://localhost:7070/loading' />
            <CheckComponent url='http://localhost:7070/data' />
        </Box>
    );
}
