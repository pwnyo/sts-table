$( document ).ready(function() {
    setDataFromUrl();
    initializeCheckboxes();
    redraw();
});
function initializeCheckboxes() {
    var all = $("#checkAll");
    all.change(function() {
        console.log("test");
        $(".filter").prop("checked", this.checked);
        $(".filter").trigger("change");
    });

    setCheck("char");
    setCheck("bad");
    setCheck("other");

    filter($("#red"));
    
    all.prop("checked", true);
    all.trigger("change");
}
function setCheck(boxClass) {
    $("#" + boxClass).change(function() {
        $("." + boxClass).prop("checked", this.checked);
    });
}

function filter(box) {
    var r = box.prop("value");
	console.log(r);

}
function redraw() {
    $("input:checkbox").change(function() {
        var queries = $('input:checkbox[class="char"]:checked, input:checkbox[class="other"]:checked').map(function() {
            console.log(this.value + ": " + this.checked);
            return '^' + this.value + '$';
        }).get().join('|');
        console.log(queries);

        var queries2 = $('input:checkbox[class="bad"]:checked').map(function() {
            console.log(this.value + ": " + this.checked);
            return '^' + this.value + '$';
        }).get().join('|');
    
        var table = $("#cards").DataTable();
        table.column(1).search(queries, true).column(2).search(queries2, true);
        table.draw(false);
    });
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