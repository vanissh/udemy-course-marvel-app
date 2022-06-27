import './char.scss';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [state, setState] = useState({
        char: null,
        loading: false,
        error: false,
        content: false
    })

    const service = new MarvelService()

    const updateChar = (charID) => {

        if(charID){
            setState({...state, loading: true})

            service
            .getCharacter(charID)
            .then(onCharLoaded) //аргумент автоматически подставляется в метод
            .catch(onError)
        } else {
            setState({...state, content: false})
        }

    }

    const onCharLoaded = (char) => {
        setState({...state, char, loading: false, error: false, content: true})
    }

    const onError = () => {
        setState({...state, error: true, loading: false})
    }

    useEffect(() => {
        updateChar()
    }, [])

    //когда в компонент приходит новый пропс, он должен перерендериваться
    //новое свойство, обновление state, принудительное обновление(позже )
    useEffect(() => {
        //необходимо сравнить пропсы, чтобы не возник бесконечный цикл:
        //udpateChar => setState => render() => componentDidUpdate => updateChar
        //здесь также можно вызывать setstate
        
        updateChar(props.charId)
    }, [props.charId])


    const {loading, char, error, content} = state

    const spinner = loading ? <Spinner/> : null
    const skeleton = content ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const view = char ? <View char={char}/> : null

    return (
        <div className="char__info">
            {spinner}
            {loading ? null : skeleton}
            {loading ? null : errorMessage}
            {loading ? null : view}
        </div>
    )
}

const View = ({char}) => { //здесь нужна деструктуризация, т.к приходит объект props

    const {name, description, thumbnail, homepage, wiki, comics, styles} = char

    const limitComics = (list, num) => {
        return list.length > num ? list.slice(0, num) : list
    }

    let comicsList
    if(comics.length){
        comicsList = comics.map((item, i) => {

            return (
                <li className="char__comics-item"
                    key={i}
                >
                    {item.name}
                </li>
            )
        })

        comicsList = limitComics(comicsList, 10)
    } else {
        comicsList = 'No comics found'
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styles}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>
    )
}

//можно ли при помощи prop-types устанавливать props по умолчанию
//да, можно, defaultProps / static
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo