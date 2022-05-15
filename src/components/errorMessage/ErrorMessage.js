import img from './error.gif'

export const ErrorMessage = () => {
    return (
        //если изображение находится в папке public
        //<img src={process.env.PUBLIC_URL + '/error.gif'}/>
         <img src={img} 
            alt='Error message' 
            style={{display: 'block', objectFit: 'contain', width: 250, height: 250}}/>        
    )
}