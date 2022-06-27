import './comics.scss'
import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import { useOffset } from '../../hooks/offset.hook'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'

const ComicsList = () => {

    const {increaseOffsetValue, limit, offset, disableBtn} = useOffset({
        presentOffset: 0,
        maxChar: 30,
        disableBtn: false,
        limit: 8
    })

    const [comics, setComics] = useState([])

    const {loading, error, getAllComics} = useMarvelService()

    const onComicsLoaded = (newComics) => {
        //конкатенация строк при помощи spread оператора!!!!!!
        setComics([...comics, ...newComics])
    }

    const getComics = (limit = 8, offset = 0) => {
        getAllComics(limit, offset)
            .then(onComicsLoaded)
    }

    useEffect(() => {
        getComics()
    }, [])

    useEffect(() => {
        getComics(limit, offset)
    }, [limit, offset])

    const onStyleBtn = () => {
        return !disableBtn ? null : {display: 'none'}
    }

    const elements = comics.map((comic, i) => {
        return (
            <li className="comics__item"
                key={i}>
                    <a href="../">
                        <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}$</div>
                    </a>
            </li>
        )
    })

    return(
        <div className="comics__list">
            {error ? <ErrorMessage/> :
                loading && offset === 0 ? <Spinner/> : 
                    <ul className="comics__grid">
                        {elements}
                    </ul>
            }
            <button className="button button__main button__long"
                    onClick={increaseOffsetValue}
                    style={onStyleBtn()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList