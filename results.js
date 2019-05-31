// var results = [
//     {
//         name : "Tuscan Dairy whole milk",
//         image: "https://images-na.ssl-images-amazon.com/images/I/81uQm2SqxhL._SY606_.jpg",
//         brand : "Tuscan Dairy",
//         size : "1",
//         unit : "gal",
//         price :[2.99,3.50,3.99,3.50,3.99]
//     },
//     {
//         name : "Great Value whole milk",
//         image: "https://images-na.ssl-images-amazon.com/images/I/81uQm2SqxhL._SY606_.jpg",
//         brand : "Tuscan Dairy",
//         size : "1",
//         unit : "gal",
//         price :[2.99, null, 3.49, null, null]
//     },
//     {
//         name : "Market 32 whole milk",
//         image: "https://images-na.ssl-images-amazon.com/images/I/81uQm2SqxhL._SY606_.jpg",
//         brand : "Tuscan Dairy",
//         size : "1",
//         unit : "gal",
//         price :[null, null, null, null, 3.99]
//     }
// ];

var storeLogos = ["images/logos/d&d2.png",
                "images/logos/jewel.png",
                "images/logos/target.gif",
                "images/logos/traderjoes.jpg",
                "images/logos/wholefoods.png"
];


function buildResultsList() {
    var RLElement = document.getElementById("result_list"); // results_list html element

    let searchResults = JSON.parse(sessionStorage.getItem('searchResults'));

    if(RLElement != null && searchResults != null){

        console.log(searchResults);

        for(let i = 0; i < searchResults.length; i++) {
            var prices = [searchResults[i]["D & D's Price"],
                searchResults[i]["Jewel Osco Price"],
                searchResults[i]["Target Price"],
                searchResults[i]["Trader Joe's Price"],
                searchResults[i]["Whole Foods Price"]
            ];

            console.log(searchResults[i].Name +   prices);

            console.log("adding new item " + searchResults[i].Name);
            var result = document.createElement("div");
            result.classList.add("result");

            var lowest = "";
            var highest = "";

            for(var s = 0; s < 5; s++){
                if(prices[s] == "") continue;
                if(lowest == "" || prices[s] < lowest)
                    lowest =  prices[s];
                if(highest == "" || prices[s] > highest)
                    highest =  prices[s];
            }

            if (lowest == highest) {
                var priceString = lowest.toString();
            } else {
                console.log(lowest, highest);
                var priceString = "$" + lowest.toString() + " - " + "$" + highest.toString();
            }

            var rUpperElement = document.createElement("div");
            rUpperElement.classList.add('result_upper');
            // noinspection JSAnnotator
            rUpperElement.innerHTML = `

            <div class="result_img_wrapper">
                <img src=${searchResults[i].Image} class="result_img">
            </div>

            <h1> ${searchResults[i].Name} </h1>
            <h2> ${searchResults[i].Size} ${searchResults[i].Unit} </h2>

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
            rUpperElement.onclick = function itemDetails(){
                sessionStorage.setItem('itemDetails',JSON.stringify(searchResults[i]));
                window.location.href = 'item_details.html';
            }
            result.appendChild(rUpperElement);

            var rLowerElement = document.createElement("div");
            rLowerElement.classList.add("result_lower");
            result.appendChild(rLowerElement);

            var rslElement = document.createElement("div");
            rslElement.classList.add("result_store_list");
            rLowerElement.appendChild(rslElement);

            for(let s = 0; s < 5; s++){
                if(prices[s] !== "") {
                    var logo = document.createElement("img");
                    logo.setAttribute("src", storeLogos[s]);
                    logo.classList.add("result_store_logo")
                    rslElement.appendChild(logo);
                }

            }

            var rbElement = document.createElement("button");
            rbElement.classList.add("result_add_button");
            rbElement.id = "add_button_" + searchResults[i]["ID"];
            rbElement.innerHTML = "Add to Cart";
            rbElement.onclick = function addToCart(){
                console.log('Add to Cart Function Called');
                console.log('ID: ' + searchResults[i]["ID"]);
                console.log(searchResults[i]);

                let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
                searchResults[i]["In Cart"] = 1;
                cartItems[searchResults[i]["ID"]] = searchResults[i];
                console.log(cartItems);
                sessionStorage.setItem('cartItems',JSON.stringify(cartItems));

                document.getElementById("inCart_" + searchResults[i]["ID"]).value = 1;

                document.getElementById("add_button_" + searchResults[i]["ID"]).style.display = "none";
                document.getElementById("add_area_" + searchResults[i]["ID"]).style.display = "block";

            };
            rLowerElement.appendChild(rbElement);


            var addedElement = document.createElement("div");
            addedElement.classList.add("result_add_area");
            addedElement.id = "add_area_" + searchResults[i]["ID"];

            var add_circ = document.createElement("span");
            add_circ.classList.add("material_icons");
            add_circ.innerHTML = 'add_circle_outline';
            add_circ.onclick = function addOne(){
                console.log('Add Function Called');
                console.log('ID: ' + searchResults[i]["ID"]);

                let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
                cartItems[searchResults[i]["ID"]]["In Cart"] = parseInt(document.getElementById("inCart_" + searchResults[i]["ID"]).value) + 1;

                document.getElementById("inCart_" + searchResults[i]["ID"]).value = cartItems[searchResults[i]["ID"]]["In Cart"];

                console.log(cartItems[searchResults[i]["ID"]]);
                sessionStorage.setItem('cartItems',JSON.stringify(cartItems));

            };
            addedElement.appendChild(add_circ);

            var edit_field = document.createElement("input");
            edit_field.type = 'text';
            edit_field.classList.add('result_edit_field');
            edit_field.id = "inCart_" + searchResults[i]["ID"];
            addedElement.appendChild(edit_field);

            var rem_circ = document.createElement("span");
            rem_circ.classList.add("material_icons");
            rem_circ.innerHTML = 'remove_circle_outline';
            rem_circ.onclick = function removeOne(){
                console.log('Remove Function Called');
                console.log('ID: ' + searchResults[i]["ID"]);

                let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
                cartItems[searchResults[i]["ID"]]["In Cart"] = parseInt(document.getElementById("inCart_" + searchResults[i]["ID"]).value) - 1;

                document.getElementById("inCart_" + searchResults[i]["ID"]).value = cartItems[searchResults[i]["ID"]]["In Cart"];

                if(cartItems[searchResults[i]["ID"]]["In Cart"] == 0){
                    cartItems[searchResults[i]["ID"]] = null;

                    document.getElementById("add_button_" + searchResults[i]["ID"]).style.display = "block";
                    document.getElementById("add_area_" + searchResults[i]["ID"]).style.display = "none";
                }

                console.log(cartItems[searchResults[i]["ID"]]);
                sessionStorage.setItem('cartItems',JSON.stringify(cartItems));

            };
            let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
            if(cartItems[searchResults[i]["ID"]] != null){
                console.log('MORE THAN ONE ITEM IN CART for: ' + searchResults[i]["ID"]);
                edit_field.value = cartItems[searchResults[i]["ID"]]["In Cart"];
                rbElement.style.display = "none";
                addedElement.style.display = "block";
            }

            addedElement.appendChild(rem_circ);

            rLowerElement.appendChild(addedElement);


            RLElement.appendChild(result);
        }
        console.log(JSON.parse(sessionStorage.getItem('cartItems')));
    }

    if(searchResults.length == 0){
        var noResults = document.createElement('p');
        noResults.innerHTML = 'No Results Found';
        noResults.style.marginTop = '80px';
        noResults.style.fontSize = '16pt';
        noResults.style.color = 'gray';
        RLElement.appendChild(noResults);
    }
}

function toggleSearchScreenVisibility(i){
    var sw = document.getElementById('search_window');
    if (i == 1) {
        sw.style.display = "block";
        document.getElementById("SE_search_field").focus();
        document.getElementById("SE_search_field").select();

    } else {
        sw.style.display = "none";
    }
}


buildResultsList();


function searchProductData(){
    console.log('Search Function Called');

    var searchText = document.getElementById('SE_search_field').value;
    sessionStorage.setItem('searchText',searchText);

    console.log(searchText);

    var recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    if(recentSearches.includes(searchText)) {
        recentSearches.splice(recentSearches.indexOf(searchText), 1);
    }
    recentSearches.unshift(searchText);
    if(recentSearches.length > 5){
        recentSearches.pop();
    }
    localStorage.setItem('recentSearches',JSON.stringify(recentSearches));

    console.log(recentSearches);

    var productResults = [];

    firebase.database().ref('/products').orderByChild("Name").on('child_added', function(snapshot) {

        if(((snapshot.val().Name).toLowerCase()).includes(searchText.toLowerCase())){
            productResults.push(snapshot.val());
        }

        //NOTE - MUST CHANGE IF CHANGE ITEMS IN DATABASE B/C THIS JANKY
        if(snapshot.key == 19){

            console.log(productResults.length);
            //console.log(productResults);

            sessionStorage.setItem("searchResultsFull", JSON.stringify(productResults));
            sessionStorage.setItem("searchResults", JSON.stringify(productResults));
            //console.log(JSON.parse(sessionStorage.getItem("searchResults")));
            window.location.href = 'results.html';

        }

    });

}