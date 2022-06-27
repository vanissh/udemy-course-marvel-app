import { useState } from 'react';

//initial = {limit, presentOffset, maxChar}
export const useOffset = (initial) => {

    const maxChar = initial.maxChar

    const [limit, setLimit] = useState(initial.limit)
    const [offset, setOffset] = useState(initial.presentOffset)
    const [disableBtn, setDisableBtn] = useState(initial.disableBtn)

    const increaseOffsetValue = () => {
        if((offset + limit) < maxChar && (maxChar - (offset + limit) >= limit)){
            setOffset(offset + limit)
        }

        if((offset + limit) < maxChar && (maxChar - (offset + limit) < limit)){
            setOffset(offset + limit)
            setLimit(maxChar - (offset + limit))
            setDisableBtn(true)
        }
    }

    return {increaseOffsetValue, limit, offset, disableBtn}
}