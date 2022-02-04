$(document).ready(function() {
    $('#getShow').submit(function(e) {
        e.preventDefault();
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
function buildStuff(data) {
    document.getElementById("hereForNow").innerHtml = ""
    const card = document.createElement('div')
                card.classList.add('card','col','text-light', 'bg-dark')
                card.style.fontSize = "0.9rem"
                const h1 = document.createElement('div')
                h1.classList.add('text-center','h6')
                h1.textContent = data.name

                  const p = document.createElement('img')
                  p.src = data.thumbnail_path
                  p.style.height = "4rem"
                  p.style.width = "3rem"
                  p.classList.add('rounded', 'mx-auto', 'd-block')
                  const inf = document.createElement('div')
                  inf.classList.add('text-center')

                  var date = new Date(data.EpisodeAirData)
                  var today = new Date()
                  if(date.getDate() == today.getDate()) {inf.classList.add('text-success'); h1.classList.add('text-success')}
                  inf.innerHTML =
                      "Season: " + data.Season + " Episode: "
                      + data.Episode + " Airdate: "
                      + data.EpisodeAirData

                  document.getElementById("hereForNow").appendChild(card)
                  card.appendChild(h1)
                  card.appendChild(p)
                  card.appendChild(inf)
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
            im.style.height = "3rem"
            im.style.margin = "1%"
        const nm = document.createElement('span')
            nm.style.margin = "1%"
            nm.innerHTML = data["tv_shows"][i]["name"]
            nm.style.overflow = "hidden"
            nm.style.display = "inline-block"
            nm.style.whiteSpace = "nowrap"
            nm.style.textOverflow = "ellipsis"
            nm.style.maxWidth = "13ch"


         list.appendChild(nm)
         list.appendChild(im)
    document.getElementById("searchResults").appendChild(list)
       }
}