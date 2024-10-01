


export class UrlDto{
    constructor(url){
        this.url=url
    }

    static create(url,validateURL){
        
        if(!url) return [,"url is required"]

        if(!validateURL(url)) return [,"the url must be valid on youtube"]

        return [new UrlDto(url),]
    }
}