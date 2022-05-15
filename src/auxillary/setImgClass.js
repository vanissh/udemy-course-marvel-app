export const setImgClass = (str) => {
    const messsage = 'image_not_available'

    return (str.indexOf(messsage) !== -1) ? {objectFit: 'fill'} : {}

}