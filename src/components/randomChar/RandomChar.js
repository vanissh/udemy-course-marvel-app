import { useState, useEffect } from 'react'
import './randomChar.scss'

import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService'
import mjolnir from '../../resources/img/mjolnir.png'
import { cropString } from '../../auxillary/cropString'

const RandomChar = () => {

    const [state, setState] = useState({
        char: {},
        loading: true,
        error: false
    })
    
    const service = new MarvelService()

    const updateChar = () => {
        setState({...state, loading: true})

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        service
            .getCharacter(id)
            .then(onCharLoaded) //аргумент автоматически подставляется в метод
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        char.description = setCharMessage(char.description)
        setState({...state, char, loading: false, error: false})
    }

    const onError = () => {
        setState({...state, error: true, loading: false})
    }

    useEffect(() => {
        updateChar()
    }, [])

    const setCharMessage = (description) => {
        const absenceMes = 'No information about this character'

        if(!description.length) {
            return absenceMes
        }

        return cropString(description, 140)
    }

    const {loading, char, error} = state

    return (
        <div className="randomchar">
            {error ? <ErrorMessage/> : 
            loading? <Spinner/> : <View char={char}/>}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={updateChar}
                    >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, styles} = char

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={styles}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar