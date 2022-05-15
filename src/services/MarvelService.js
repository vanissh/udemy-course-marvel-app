import { setImgClass } from '../auxillary/setImgClass'


class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public'
    _apiKey = 'apikey=86d887782cbaea671824f62fdd131820'

    getResource = async (url) => {
        let res = await fetch(url)

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`)
        return this._transformChar(res.data.results[0])
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=180&${this._apiKey}`)
        return res.data.results.map(char => this._transformChar(char))
    }

    _transformChar = ({name, id, description, thumbnail, urls, comics}) => {

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
}

export default MarvelService