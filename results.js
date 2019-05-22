var results = [
    {
        name : "Tuscan Dairy whole milk",
        image: "https://images-na.ssl-images-amazon.com/images/I/81uQm2SqxhL._SY606_.jpg",
        brand : "Tuscan Dairy",
        size : "1",
        unit : "gal",
        price :[2.99,3.50,3.99,3.50,3.99]
    },
    {
        name : "Great Value whole milk",
        image: "https://images-na.ssl-images-amazon.com/images/I/81uQm2SqxhL._SY606_.jpg",
        brand : "Tuscan Dairy",
        size : "1",
        unit : "gal",
        price :[2.99, null, 3.50, null, null]
    },
    {
        name : "Market 32 whole milk",
        image: "https://images-na.ssl-images-amazon.com/images/I/81uQm2SqxhL._SY606_.jpg",
        brand : "Tuscan Dairy",
        size : "1",
        unit : "gal",
        price :[null, null, null, null, 3.99]
    }
];

var storeLogos = ["images/logos/d&d2.png",
                "images/logos/jewel.png",
                "images/logos/target.gif",
                "images/logos/traderjoes.jpg",
                "images/logos/wholefoods.png"
];


function buildResultsList() {
    var RLElement = document.getElementById("result_list"); // results_list html element

    if(RLElement != null){
        for(var i = 0; i < results.length; i++) {
            console.log("adding new item " + results[i].name);
            var result = document.createElement("div");
            result.classList.add("result");

            var lowest = null;
            var highest = null;

            for(var s = 0; s < 5; s++){
                if(results[i].price[s] == null) continue;
                if(lowest == null || results[i].price[s] < lowest)
                    lowest =  results[i].price[s];
                if(highest == null || results[i].price[s] > lowest)
                    highest =  results[i].price[s];
            }

            if (lowest == highest) {
                var priceString = lowest.toString();
            } else {
                console.log(lowest, highest);
                var priceString = "$" + lowest.toString() + " - " + "$" + highest.toString();
            }

            // noinspection JSAnnotator
            result.innerHTML = `

            <div class="result_img_wrapper">
                <img src=${results[i].image} class="result_img">
            </div>

            <h1> ${results[i].name} </h1>
            <h2> ${results[i].size} ${results[i].unit} </h2>

            <span class="result_price"> ${priceString} </span>

            <!--<div class="result_lower">-->
                <!--<div class="result_store_list">-->
                    <!--<img src="images/logos/target.gif">-->
                    <!--<img src="images/logos/d&d2.png">-->
                    <!--<img src="images/logos/jewel.png">-->
                    <!--<img src="images/logos/traderjoes.jpg">-->
                    <!--<img src="images/logos/wholefoods.png">-->
                <!--</div>-->
                <!--<button class="result_add" content="Add"> Add </button>-->
            <!--</div>-->

            `

            var rLowerElement = document.createElement("div");
            rLowerElement.classList.add("result_lower");
            result.appendChild(rLowerElement);

            var rslElement = document.createElement("div");
            rslElement.classList.add("result_store_list");
            rLowerElement.appendChild(rslElement);

            for(s = 0; s < 5; s++){
                if(results[i].price[s] !== null) {
                    var logo = document.createElement("img");
                    logo.setAttribute("src", storeLogos[s]);
                    logo.classList.add("result_store_logo")
                    rslElement.appendChild(logo);
                }

            }

            var rbElement = document.createElement("button");
            rbElement.classList.add("result_add");
            rbElement.innerHTML = "Add";
            rLowerElement.appendChild(rbElement);

            RLElement.appendChild(result);
        }
    }
}


buildResultsList();


function searchProductData(){
    var searchText = document.getElementById('search_field').value;

    console.log(searchText);

    console.log('Search Function Called');

    var productResults = [];

    firebase.database().ref('/products').orderByChild("Name").on('child_added', function(snapshot) {

        if(((snapshot.val().Name).toLowerCase()).includes(searchText.toLowerCase())){
            productResults.push(snapshot.val());
        }

        //NOTE - MUST CHANGE IF CHANGE ITEMS IN DATABASE B/C THIS JANKY
        if(snapshot.key == 12){

            console.log(productResults.length);
            //console.log(productResults);

            sessionStorage.setItem("searchResults", JSON.stringify(productResults));
            //console.log(JSON.parse(sessionStorage.getItem("searchResults")));
            window.location.href = 'results.html';

        }

    });

}

console.log(JSON.parse(sessionStorage.getItem('searchResults')));


results = JSON.parse(sessionStorage.getItem('searchResults'));
buildResultsList();

