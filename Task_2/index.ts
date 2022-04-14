import fetch from 'node-fetch'

const apiUrl: URL = new URL('https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman&page=1')

interface Data {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Array<Movie>
}

interface Movie {
    Title: string,
    Year: number,
    imdbId: number
}

const movieTitles: string[] = []
let response: unknown
let responseData: Data
let pageNumber: number = 1

// loop to fetch all pages (even if more than 2)
do {
    response = await fetch(apiUrl.href.replace(/page=\d+/,`page=${pageNumber}`))
    responseData = await(response as Response).json()

    const titleList = responseData.data.forEach((movie: Movie) => {
        movieTitles.push(movie.Title)
    });
    console.log(movieTitles.length);
    pageNumber += 1
    
} while (pageNumber <= responseData.total_pages)

movieTitles.sort()

// remove any duplicates in output
console.log([... new Set(movieTitles)]);