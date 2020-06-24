# Change logs

## Menu item loaded by [renderMenu()](https://github.com/cupOfGun011011/HCMUT_FoodCourt/blame/loaded_menu_and_filter/front-end/dist/menu/js/menumain.js#L13-L99) now can be filtered out with Featured Product filter

Open [index.html](front-end/dist/menu/index.html) in ```${workingDir}/front-end/dist/menu```

This can be achieved by adding 
```javascript 
$(window).on("load", renderMenu);  
```
before 
``` javascript
    ...
$(window).on("load", function () 
    ...
    var containerEl = document.querySelector(".featured__filter");
    var mixer = mixitup(containerEl); 
    ... 
)
    ...
```

