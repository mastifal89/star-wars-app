import { useEffect, useState } from "react";
import { getGifs } from '../helpers/getGifs';

export const useFetchGifs = ( category ) => {
    const [state, setstate] = useState({
        images: [],
        loading: true
    })

    useEffect(() => {
        getGifs(category)
            .then(imgs => {
                setstate({
                    images: imgs,
                    loading: false
                });
            })
    }, [category])

    return state; // { data: [], loading: true };
}
