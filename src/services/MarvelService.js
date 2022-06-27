import { setImgClass } from '../auxillary/setImgClass'
import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public'
    const _apiKey = 'apikey=86d887782cbaea671824f62fdd131820'

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`)
        return _transformChar(res.data.results[0])
    }

    const getAllCharacters = async (limit, offset) => {
        const res = await request(`${_apiBase}/characters?limit=${limit}&offset=${offset}&${_apiKey}`)
        return res.data.results.map(char => _transformChar(char))
    }

    const _transformChar = ({name, id, description, thumbnail, urls, comics}) => {

        const thumbNail = thumbnail.path + '.' + thumbnail.extension,
            styles = setImgClass(thumbNail)

        return {
            name,
            id,
            description,
            thumbnail: thumbNail,
            homepage: urls[0].url,
            wiki: urls[1].url,
            comics: comics.items,
            styles,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService