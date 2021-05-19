document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?{{city}}')"

let geo = document.getElementById('geo')

function start() {
    navigator.geolocation.getCurrentPosition(
        (location) => {
            lat = location.coords.latitude
            long = location.coords.longitude
            let data = {lat:lat, long:long}
            console.log(lat,long)

            function redirectWithPost(url, data){
                var form = document.createElement('form');
                form.method = 'POST';
                form.action = url;

                for(var key in data){
                    var input = document.createElement('input');
                    input.name = key;
                    input.value = data[key];
                    input.type = 'hidden';
                    form.appendChild(input)
                }
                document.body.appendChild(form);
                form.submit();
            }

            redirectWithPost('/geolocation',data)
            
        },
        (error) => console.error(error)
    )
}

geo.addEventListener('click',start)

