import fetch from 'node-fetch';
const apiUrl = new URL('https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman&page=1');
const movieTitles = [];
let response;
let responseData;
let pageNumber = 1;
// loop to fetch all pages (even if more than 2)
do {
    response = await fetch(apiUrl.href.replace(/page=\d+/, `page=${pageNumber}`));
    responseData = await response.json();
    const titleList = responseData.data.forEach((movie) => {
        movieTitles.push(movie.Title);
    });
    console.log(movieTitles.length);
    pageNumber += 1;
} while (pageNumber <= responseData.total_pages);
movieTitles.sort();
// remove any duplicates in output
console.log([...new Set(movieTitles)]);
