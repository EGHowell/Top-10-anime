const anime = {};

anime.myAnimeListUrl = 'https://api.jikan.moe/v3';

// Create different promises that gives you three different pages from the top anime endpoint

anime.getAnimeDetails = () => {
    const pageOne = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/1/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageTwo = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/2/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageThree = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/3/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageFour = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/4/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageFive = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/5/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageSix = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/6/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageSeven = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/7/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageEight = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/8/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageNine = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/9/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageTen = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/10/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageEleven = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/11/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageTwelve = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/12/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageThirteen = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/13/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageEighteen = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/18/tv`,
        dataType: 'json',
        method: 'GET',
    })

    const pageNineteen = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/19/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageTwentySix = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/26/tv`,
        dataType: 'json',
        method: 'GET',
    })
    const pageTwentyEight = $.ajax({
        url:`${anime.myAnimeListUrl}/top/anime/28/tv`,
        dataType: 'json',
        method: 'GET',
    })


    // Using .when to wait for all promises to complete
    $.when(pageOne, pageTwo, pageThree, pageFour, pageFive, pageSix, pageSeven, pageEight, pageNine, pageTen, pageEleven, pageTwelve, pageThirteen, pageEighteen, pageNineteen, pageTwentySix, pageTwentyEight).done(function (result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result18, result19, result26, result28){

        // Once we have results to combine all three together
        const animePageOne = result1[0].top
        const animePageTwo = result2[0].top
        const animePageThree = result3[0].top
        const animePageFour = result4[0].top
        const animePageFive = result5[0].top
        const animePageSix = result6[0].top
        const animePageSeven = result7[0].top
        const animePageEight = result8[0].top
        const animePageNine = result9[0].top
        const animePageTen = result10[0].top
        const animePageEleven = result11[0].top
        const animePageTwelve = result12[0].top
        const animePageThirteen = result13[0].top
        const animePageEighteen = result18[0].top
        const animePageNineteen = result19[0].top
        const animePageTwentySix = result26[0].top
        const animePageTwentyEight = result28[0].top



        const allResults = animePageOne.concat(animePageTwo).concat(animePageThree).concat(animePageFour).concat(animePageFive).concat(animePageSix).concat(animePageSeven).concat(animePageEight).concat(animePageNine).concat(animePageTen).concat(animePageEleven).concat(animePageTwelve).concat(animePageThirteen).concat(animePageEighteen).concat(animePageNineteen).concat(animePageTwentySix).concat(animePageTwentyEight);
        
                // Start an aray of 150 objects and create an object that lookes like 
                // {   1990: [{anime}, {anime}],
                //     1991: [{anime}, {anime}],  }
                const transformedObject = allResults.reduce((total, currentValue)=>{
                const startDateYearString = currentValue.start_date.substring(4)
                const startDateYear = parseInt(startDateYearString)
                
                // If there is already key for this year add the current object to that year
                // else there isn't a key for this year so create a new key and create a new array
                if (total[startDateYear]) {
                    total[startDateYear].push(currentValue)
                } else {
                    total[startDateYear] = [currentValue]
                }
                return total
                },
            {},
        )

        anime.selection(transformedObject);


        // Display years and top anime on the page
        anime.getOptions = (userSelection) => {
            let seasonArray = userSelection.filter(item => {
                // if (!item.title.toLowerCase().includes("season")) 
                if (!item.title.toLowerCase().includes("kouhan-sen"))
                return item
            })
            
            if ( seasonArray.length > 10){
                seasonArray = seasonArray.filter((item, index) => {
                if (index < 10) return item
            })
        }
    
            seasonArray.forEach((key) => {
                const animeTitle =
                `<h2 class = "animate__animated animate__slideInDown">year: ${key.start_date.substring(4)}</h2>
                `
                $('.containerTitle').append(animeTitle)

                const animeHTML =
                    `
                    <div class = "animeCard animate__animated animate__slideInRight">
                        <li>
                            <span class = "itemsInside">
                                <p class = "titleName">${key.title}</p>
                                <p class = "score">Score: ${key.score}</p>
                                    <a href = "${key.url}">
                                        <img src = "${key.image_url}" class="anime-image">
                                        <p class = "image-container">Click here to read summary</p>
                                    </a>
                                <p>Episodes: ${key.episodes}</p>
                            </span>
                        </li>
                    </div>
                    `
                    $('.container').append(animeHTML)
            });
        }
    });
}


anime.selection = (objectYear) => {
// Listen for when the selection changes
$('button').on('click', function(){

// Get value of the option that has been selected
const selection = $(this).val()
console.log(selection)
const userSelection = objectYear[selection]

    $('.containerTitle').empty();
    $('.container').empty();
    anime.getOptions(userSelection);
    })
}


anime.init = () => {
    anime.getAnimeDetails()
}

$(() => {
    anime.init();
});