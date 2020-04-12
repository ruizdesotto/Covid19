const COVID_DATA_API = "https://pomber.github.io/covid19/timeseries.json"
const COUNTRY_API = "https://restcountries.eu/rest/v2/all"

const FLAG_API = "https://www.countryflags.io/"
const FLAG_TYPE = ["/shiny/", "/flat/"]
const FLAG_SIZE = [16, 24, 32, 48, 64]
const IMG_TYPE = ".png"
/* EXAMPLE
    https://www.countryflags.io/be/shiny/32.png
*/
let listCountryCodes = []

// FORMAT 
const processCountries = ([name, data], key) => ({key:''+key, name, data})
const processCodes = (country) => ({name: country.name, code: country.alpha2Code})

// GET COUNTRY COVID DATA
export const fetchCountry = async () => {
    const request = await fetch(COVID_DATA_API)
    const allData = await request.json()
    listCountryCodes = await fetchCountryCodes()
    return Object.entries(allData).map(processCountries)
}


// GET COUNTRY CODES
fetchCountryCodes = async () => {
    const request = await fetch(COUNTRY_API)
    const allData = await request.json()
    return allData.map(processCodes)
}

// GET URL FOR ICON FLAG
export const fetchFlag = (refName) => {
    const match = listCountryCodes.filter(({name}) => (name===refName))
    if (match.length > 0){
        const COUNTRY_CODE = match[0].code
        return FLAG_API+COUNTRY_CODE+FLAG_TYPE[0]+FLAG_SIZE[1]+IMG_TYPE
    }
    return null
}

/* TODO

Flags that are downloaded should be stored 

*/


/* TODO (maybe)

Each country has data in the form of on an array of objects (object = day info) 

Global object of the form of array of objects (per country) with keys
name, dates, confirmed, dead, recovered 
the last four array of integers (easier to plot)


Alternative: plot dots : object by object

*/
