import { Component } from 'react';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

/* error boundaries - предохранители - классовые компоненты, которые оборачивают другие компоненты; 
если в их дочернем компоненте произойдет ошибка, то скрашится только компонент, а не все приложение

можно отрендерить запасной интерфейс вместо сломавшегося

------------------------------ такой код не сработает в новых версиях react
componentDidCatch(err, info){
    console.log(err, info)
    this.setState({error: true})
}

Предохранители ловят не все ошибки: 
1 - они не ловят ошибки, которые произошли внутри обработчиков событий(т к они происходят вне
    метода render)
2 - асинхронный код
3 - сам предохранитель
4 - серверный рендеринг

*/

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error){
    //     return {error: true}
    // }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo)
        this.setState({error: true})
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        return this.props.children
    }

    
}

export default ErrorBoundary