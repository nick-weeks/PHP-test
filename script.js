$(document).ready(function(e) {
        $.ajax({
            type:"POST",
             url: 'test-get.php'
             }).then(
                function(response)
               {
                       var jsonData = JSON.parse(response);
                       buildStuff(jsonData)
                },
                function()
                {
                    alert('Error');
                 }
             )
    });
$(document).ready(function() {
    $('#searchShow').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
             url: 'test-search.php',
             data: $(this).serialize()
             }).then(
                function(response)
               {
                    var jsonData = JSON.parse(response);
                    buildSearch(jsonData)

                },
                function()
                {
                    alert('Error');
                 }
             )
        });
    });

function addFavourite(e) {
    $.ajax({
        type: "POST",
        url: "test-add.php",
        data:{action:e}
    }).then(
        function(response)
        {   console.log(response)
            if(response == "\r\nSuccess\r\n\r\n\r\n") {
                document.getElementById(e).style.color = "red"
            } else {
            alert(response)
            }
        },
        function()
        {
            alert('Error')
        }
      )
}
function buildStuff(data) {
var rowCount = 0
var root = ("root" + rowCount)
document.getElementById("showResults").innerHTML = ""
for(var i = 0; i < data.tvShows.length; i ++) {

    if (i % 8 == 0) {
    rowCount +=1
    root = ("root" + rowCount)
    const row = document.createElement('div')
    row.classList.add('row')
    row.setAttribute('id',root)
    document.getElementById("showResults").appendChild(row)

    }


    const card = document.createElement('div')
                card.classList.add('card','col','text-light', 'bg-dark')
                card.style.fontSize = "0.9rem"
                const h1 = document.createElement('div')
                h1.classList.add('text-center','h6')
                h1.textContent = data['tvShows'][i]['name']
                h1.setAttribute('id',data['tvShows'][i]['permalink'])
                  const p = document.createElement('img')
                  p.src = data['tvShows'][i]['thumbnail_path']
                  p.style.height = "4rem"
                  p.style.width = "3rem"
                  p.classList.add('rounded', 'mx-auto', 'd-block')
                  const inf = document.createElement('div')
                  inf.classList.add('text-center')
                  const date = new Date(data['tvShows'][i]['EpisodeAirData'])
                  const today = new Date()
                  if(date == today) {inf.classList.add('text-success'); h1.classList.add('text-success')}
                  inf.innerHTML =
                      "Season: " + data['tvShows'][i]['Season'] + " Episode: "
                      + data['tvShows'][i]['Episode'] + " Airdate: "
                      + data['tvShows'][i]['EpisodeAirData']
                  document.getElementById(root).appendChild(card)
                  card.appendChild(h1)
                  card.appendChild(p)
                  card.appendChild(inf)

}
}
function buildSearch(data) {
    console.log(data)
    document.getElementById("searchResults").innerHTML = ""
    for(var i = 0; i < data["tv_shows"].length; i++) {

        const list = document.createElement('li')
            list.setAttribute('class','nav-item')
            list.style.margin = "1%"
            list.style.textAlign = "end"
        const im = document.createElement('img')
            im.src = data["tv_shows"][i]["image_thumbnail_path"]
            im.style.height = "3rem"
            im.style.margin = "0% 2%"
        const h = document.createElement('i')
              h.setAttribute('class','fas fa-star')
              h.style.padding = "0% 2%"
              h.setAttribute('onClick', 'addFavourite(this.id)')
              h.setAttribute('id',data["tv_shows"][i]["permalink"])
        const nm = document.createElement('span')
            nm.innerHTML = data["tv_shows"][i]["name"]
            nm.style.overflow = "hidden"
            nm.style.display = "contents"
            nm.style.whiteSpace = "nowrap"
            nm.style.textOverflow = "ellipsis"
            nm.style.maxWidth = "13ch"
        if(document.getElementById(data["tv_shows"][i]["permalink"])) {
            h.style.color = "red";
        }
         list.appendChild(h)
         list.appendChild(nm)
         list.appendChild(im)
    document.getElementById("searchResults").appendChild(list)
       }
}