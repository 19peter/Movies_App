const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDhjZjQ4YTk0NThiYzY3MmU5YTQ1ZmJjNzQwYWFmYiIsInN1YiI6IjYxMWU0ZjNmYWM0MTYxMDA1Y2RkMjVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AvZ-J1TfU4gz982RMO5-ZgZs5j74LizeTpRK8wMxSIk'
    }
};

async function fetchMovies(filter) {
    const url = `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=1`;

    return await fetch(url, options)
        .then(res => res.json())
        // .then(json => console.log(json))
        // .then(json => setMovies(json.results))
        .then(json => {
            // console.log(json.results);


            
            return json.results;
        })
        .catch(err => console.error('error:' + err))

}

async function fetchPopularMovies() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

    return await fetch(url, options)
        .then(res => res.json())
        // .then(json => console.log(json))
        // .then(json => setMovies(json.results))
        .then(json => json.results)
        .catch(err => console.error('error:' + err));

}

module.exports = {fetchMovies, fetchPopularMovies}