import React, { useEffect, useState, useRef } from 'react';
import '../charInfo/char.scss';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { cropString } from '../../auxillary/cropString';
import { ErrorMessage } from '../errorMessage/ErrorMessage';


const CharList = (props) => {

    const [state, setState] = useState({
        chars: [],
        presentOffset: 0,
        maxChar: 50,
        disableBtn: false,
        limit: 9
    })

    const prevState = useRef(state)

    useEffect(() => {
        prevState.current = state //запоминаем предыдущее состояние
    })

    const {loading, error, getAllCharacters} = useMarvelService()

    //Рефы дают возможность получить доступ к 
    //DOM-узлам или React-элементам, созданным в рендер-методе.
    // Ситуации, в которых использование рефов является оправданным:

    // Управление фокусом, выделение текста или воспроизведение медиа.
    // Императивный вызов анимаций.
    // Интеграция со сторонними DOM-библиотеками.

    const itemRefs = []

    const onCharsLoaded = (chars) => {
        //конкатенация строк при помощи spread оператора!!!!!!
        setState({...state, chars: [...state.chars, ...chars]})
    }

    const getChars = (limit = 9, offset = 0) => {
        getAllCharacters(limit, offset)
            .then(onCharsLoaded)
    }

    const increaseOffsetValue = () => {

        const {presentOffset, maxChar, limit} = state

        if((presentOffset + limit) < maxChar && (maxChar - (presentOffset + limit) >= limit)){
            setState({...state, presentOffset: state.presentOffset + state.limit})
        }

        if((presentOffset + limit) < maxChar && (maxChar - (presentOffset + limit) < limit)){
            setState({...state,
                presentOffset: state.presentOffset + state.limit, 
                limit: (state.maxChar - (state.presentOffset + state.limit)),
                disableBtn: true
            })
        }
    }

    const onStyleBtn = () => {
        return !state.disableBtn ? null : {display: 'none'}
    }

    useEffect(() => {
        getChars()
    }, [])

    useEffect(() => {
        getChars(state.limit, state.presentOffset)
    }, [state.limit, state.presentOffset])

    //получаем массив всех li элементов
    //при новом запуске render элементу присваивается ref из старого массива itemRefs 
    //с установленным классом для нужного элемента по i
    const setRef = elem => {
        itemRefs.push(elem)
    }

    //присваиваем нужный класс по i
    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs[id].classList.add('char__item_selected')
    }


    const elements = state.chars.map((item, i) => {
        item.name = cropString(item.name, 28)
        return (
            <li className='char__item'
                ref={setRef}
                tabIndex={0}
                key={item.id}
                onClick={() => {
                    props.onCharSelected(item.id)
                    focusOnItem(i)
                }}
                onKeyUp={(e) => {
                    if(e.keyCode === 13){
                        props.onCharSelected(item.id)
                        focusOnItem(i)
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
                loading && state.offset === 0 ? <Spinner/> : 
                    <ul className="char__grid">
                        {elements}
                    </ul>
            }
            <button className="button button__main button__long"
                    onClick={increaseOffsetValue}
                    style={onStyleBtn()}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

//propTypes. Это способ, позволяющий производить валидацию данных, 
// передаваемых в React компонент, чтобы избегать ошибок, 
// связанных с несоответствием типов данных. 
// propTypes присваивается как статичное свойство компонента.

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList