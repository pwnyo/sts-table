$( document ).ready(function() {
    setDataFromUrl();
    initializeCheckboxes();
    redraw();
    setFilters();
});
function initializeCheckboxes() {
    var all = $("#checkAll");
    all.change(function() {
        $(".filter").prop("checked", this.checked);
        $(".filter").trigger("change");
    });
    
    setCheck("char");
    setCheck("bad");
    setCheck("other");

    setCheck("cardType");
    setCheck("rarity");
    setCheck("cost");
    
    all.prop("checked", true);
    all.trigger("change");
}
function setCheck(boxClass) {
    $("#" + boxClass).change(function() {
        $("." + boxClass).prop("checked", this.checked);
    });
}

function redraw() {
    $("input:checkbox").change(function() {
        var table = $("#cards").DataTable();
        table.draw(false);
    });
}
function setFilters() {
    $.fn.dataTable.enum( [ 'Basic', 'Common', 'Uncommon', 'Rare', 'Curse' ] );
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        
        var classes = $('input:checkbox[class="char"]');
        var bads = $('input:checkbox[class="bad"]');
        var others = $('input:checkbox[class="other"]');
        
        var types = $('input:checkbox[class="cardType"]');
        var rars = $('input:checkbox[class="rarity"]');
        var costs = $('input:checkbox[class="cost"]');

        var isBad = checkClass(bads, data[2]);

        return checkCost(costs, data[4]) && (isBad || 
            (checkClass(types, data[2]) &&
            (checkClass(classes, data[1]) || checkClass(others, data[1])) &&
            checkClass(rars, data[3]))
        )
    });
}
function checkClass(boxes, check) {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked && check == boxes[i].value) { 
            return true;
        }
    }
    //console.log(check);
    return false;
}
function checkCost(boxes, check) {
    if (boxes[6].checked && (check.includes("4") || check.includes("5"))) {
        return true;
    }
    for (let i = 0; i < boxes.length - 1; i++) {
        if (boxes[i].checked && check.includes(boxes[i].value)) { 
            return true;
        }
    }
    return false;
}

function setDataFromUrl() {
    $("#cards").DataTable( {
        ajax: {
            url: "https://pwnyo.github.io/sts-table/cards.json",
            dataSrc: ""
        },
        pagination: "bootstrap",
        filter: true,
        destroy: true,
        lengthMenu: [10,25,50,75,100],
        pageLength: 50,
        columns:
            [  
                {"data": "name"},
                {"data": "class"},
                {"data": "type"},
                {"data": "rarity"},
                {"data": "cost"},
                {"data": "desc"},
                {"data": "udesc"}
            ]
    });
}