import React, { Component } from 'react';
import '../charInfo/char.scss';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { cropString } from '../../auxillary/cropString';
import { ErrorMessage } from '../errorMessage/ErrorMessage';


class CharList extends Component{

    state = {
        chars: [],
        loading: true,
        error: false,
        presentOffset: 0,
        maxChar: 50,
        disableBtn: false,
        limit: 9
    }

    service = new MarvelService()

    itemRefs = []

    onCharsLoaded = (chars) => {
        //конкатенация строк при помощи spread оператора!!!!!!
        this.setState({chars: [...this.state.chars, ...chars], loading: false})
    }

    getChars = () => {
        this.service
            .getAllCharacters(this.state.limit, this.state.presentOffset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    increaseOffsetValue = () => {

        const {presentOffset, maxChar, limit} = this.state

        if((presentOffset + limit) < maxChar && (maxChar - (presentOffset + limit) >= limit)){
            this.setState({presentOffset: presentOffset + limit})
        }

        if((presentOffset + limit) < maxChar && (maxChar - (presentOffset + limit) < limit)){
            this.setState({
                presentOffset: presentOffset + limit, 
                limit: (maxChar - (presentOffset + limit)),
                disableBtn: true
            })
        }
    }

    onStyleBtn = () => {
        return !this.state.disableBtn ? null : {display: 'none'}
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    componentDidMount(){
        this.getChars()
    }

    componentDidUpdate(_, prevState){
        if(this.state.presentOffset !== prevState.presentOffset){
            this.getChars()
        }
    }

    //получаем массив всех li элементов
    //при новом запуске render элементу присваивается ref из старого массива itemRefs 
    //с установленным классом для нужного элемента по i
    setRef = elem => {
        this.itemRefs.push(elem)
    }

    //присваиваем нужный класс по i
    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'))
        this.itemRefs[id].classList.add('char__item_selected')
    }
    render(){

        const {chars, loading, error} = this.state

        const elements = chars.map((item, i) => {
            item.name = cropString(item.name, 28)
            return (
                <li className='char__item'
                    ref={this.setRef}
                    tabIndex={0}
                    key={item.id}
                    onClick={() => {
                       this.props.onCharSelected(item.id)
                       this.focusOnItem(i)
                    }}
                    onKeyUp={(e) => {
                        if(e.keyCode === 13){
                            this.props.onCharSelected(item.id)
                            this.focusOnItem(i)
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={item.styles}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        //показать нужный компонент при ошибке
        return (
            <div className="char__list">
                {error ? <ErrorMessage/> :
                    loading ? <Spinner/> : 
                        <ul className="char__grid">
                            {elements}
                        </ul>
                }
                <button className="button button__main button__long"
                        onClick={this.increaseOffsetValue}
                        style={this.onStyleBtn()}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList