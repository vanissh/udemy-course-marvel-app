export const cropString = (str, num) => {
    if(str.length <= num) return str

    return str.substring(0, num) + '...'
}