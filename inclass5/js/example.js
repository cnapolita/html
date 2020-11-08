// ADD NEW ITEM TO END OF LIST
var  grocery_list = document.getElementsByTagName('ul')[0];
grocery_list.innerHTML += '<li id="five">cream</li>';

// ADD NEW ITEM START OF LIST
grocery_list.innerHTML = '<li id="zero">kale</li>'.concat(grocery_list.innerHTML);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
items = grocery_list.getElementsByTagName('li');
for (var i = 0; i < items.length; i++) {
    items[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
document.getElementsByTagName('h2')[0].innerHTML += ': ' + items.length;