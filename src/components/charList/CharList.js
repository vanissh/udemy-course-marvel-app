import { Component } from 'react';
import '../charInfo/char.scss';

import MarvelService from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { cropString } from '../../auxillary/cropString';


class CharList extends Component{

    state = {
        chars: [],
        loading: true
    }

    service = new MarvelService()


    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false})
    }

    getChars = () => {
        this.service
            .getAllCharacters()
            .then(this.onCharsLoaded)
    }

    componentDidMount(){
        this.getChars()
    }
    render(){

        const {chars, loading} = this.state

        const elements = chars.map(item => {
            item.name = cropString(item.name, 28)
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} style={item.styles}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <div className="char__list">
                {loading ? <Spinner/> : 
                    <ul className="char__grid">
                        {elements}
                    </ul>
                }
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList