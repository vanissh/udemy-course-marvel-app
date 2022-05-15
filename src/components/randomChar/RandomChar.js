import { Component } from 'react'
import './randomChar.scss'

import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService'
import mjolnir from '../../resources/img/mjolnir.png'
import { cropString } from '../../auxillary/cropString'

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    
    service = new MarvelService()

    updateChar = () => {
        this.setState({loading: true})

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.service
            .getCharacter(id)
            .then(this.onCharLoaded) //аргумент автоматически подставляется в метод
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        char.description = this.setCharMessage(char.description)
        this.setState({char, loading: false, error: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    componentDidMount(){
        this.updateChar()
    }

    setCharMessage = (description) => {
        const absenceMes = 'No information about this character'

        if(!description.length) {
            return absenceMes
        }

        return cropString(description, 140)
    }

    render(){
        const {loading, char, error} = this.state

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
                        onClick={this.updateChar}
                        >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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