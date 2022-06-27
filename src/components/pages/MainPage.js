import { useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export const MainPage = () => {

    const [selectedID, setID] = useState(null)

    const onCharSelected = (id) => setID(id)

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <CharInfo charId={selectedID}/>
            </ErrorBoundary>
            </div>
        </>
    )
}