$(document).ready(function(e) {
        $.ajax({
            type:"POST",
             url: 'dnd-get.php',
             }).then(
                function(response)
               {
                        var json = JSON.parse(response)
                        var doc = document.getElementById("root");
                        doc.innerHTML = ""
                        var dropdown = document.createElement('select')

                       for (var prop in json) {
                            var opt = document.createElement('option')
                            opt.innerHTML = prop
                            opt.setAttribute('value',json[prop])
                            dropdown.appendChild(opt)
                       }
                       doc.appendChild(dropdown)
                       var sub = document.createElement('button')
                       sub.setAttribute('type','submit')
                       sub.setAttribute('value','Submit')
                       sub.innerHTML = "Submit"
                       doc.appendChild(sub)
                },
                function()
                {
                    alert('Error');
                 }
             )
    });

$(document).ready(function() {
    $('#root').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:"POST",
             url: 'dnd-get.php',
             data: {option: $(this).find('option:selected').attr('value'),
             Function: 'apiLoad' }
             }).then(
                function(response)
               {
                    var jsonData = JSON.parse(response);

                    var jsonResult = jsonData["results"]
                    for(var count in jsonResult) {
                        console.log(jsonResult[count]["name"])
                    }
                    if(jsonData["next"]) {
                        jsonData = nextPage(jsonData["next"])
                    }
                },
                function()
                {
                    alert('Error');
                 }
             )
        });
    });

function nextPage(link) {
$.ajax({
            type:"POST",
             url: 'dnd-get.php',
             data: {option: link, Function: 'apiLoad'}
             }).then(
                function(response){
                    var json = JSON.parse(response)
                    var jsonResult = json["results"]
                        for(var count in jsonResult) {
                            console.log(jsonResult[count]["name"])
                     }
                    if (json["next"]) {
                    nextPage(json["next"])
                    }
                }

              )
}