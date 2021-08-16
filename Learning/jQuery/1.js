// Selector

// All Selector (“*”)
// var elementCount = $( "#test" ).find( "*" ).css( "border", "3px solid red" ).length;
// $( "body" ).☻epend( "<h3>" + elementCount + " elements found</h3>" );

// Attribute Contains Prefix Selector [name|=”value”]
$("a[hreflang|='en']").css("border", "3px dotted green");

// Attribute Contains Selector [name*=”value”]
$("input[name*='solo']").val('has "solo" in it!');

// Attribute Contains Word Selector [name~=”value”]
$("input[gg~='solo']").val('mr. solo is in it!')

// Attribute Ends With Selector [name$=”value”]
$("input[gg1$='solo']").val('a solo')

// Attribute Equals Selector [name=”value”]
$("input[gg2='Solo']").next().text("Solo -> OdinSolo");

// Attribute Not Equal Selector [name!=”value”]
$("input[gg3!='Solo']").next().append("<b>; not gg3 solo</b>")

// Class Selector (“.class”)
$('.testClass').css('border', "1px solid red")

//ID Selector (“#id”)
$('#Soolo').css('border', '1px solid purple')
//
$('#tId\\.solo\\[1\\]').css('border', '1px solid purple')

// Category: Attributes

// .addClass ()
$("#addSolo").addClass('addSolo')

// .attr()
$("#imgSoloAA").attr({
  src: "https://svgsilh.com/svg_v2/1801287.svg"
}).css({
  'width': '30px',
  'height': '30px'
});

// .hasClass()
$("#result3").append($("div").hasClass("OdinSolo").toString());

// .html()
$('#htmlAddOdzz').html("<b>Add html tag b </b>")

// .prop ()
$("input").change(function () {
  var $input = $(this);
  $("p").html(
    ".attr( \"checked\" ): <b>" + $input.attr("checked") + "</b><br>" +
    ".prop( \"checked\" ): <b>" + $input.prop("checked") + "</b><br>" +
    ".is( \":checked\" ): <b>" + $input.is(":checked") + "</b>");
}).change();

// .removeAttr ()
$('#removeAttrSolo').removeAttr('gg4');

// .removeClass()
$('#removeClassSolo').removeClass('addSolo');

// .removeProp ()
para = $("#removePropSolo");
para
  .prop("luggageCode", 1234)
  .append("The secret luggage code is: ", String(para.prop("luggageCode")), ". ")
  .removeProp("luggageCode")
  .append("Now the secret luggage code is: ", String(para.prop("luggageCode")), ". ");

// .toggleClass()
$("#toggleClassSolo").click(function () {
  $(this).toggleClass("backGround");
});

// .val()
$("#valISolo")
  .keyup(function () {
    var value = $(this).val();
    $("#valPSolo").text(value);
  })
  .keyup();

// Each and Ajax

// .each()
$('#eachSolo').click(function () {
  console.log(this)
  $('#eachSolo > div').each(function (i) {
    if (this.style.color !== "blue") {
      this.style.color = "blue";
    } else {
      this.style.color = "";
    }
  });
});

// ajax
// GET
$('#ajaxSolo').click(function () {

  $.ajax({
    type: 'GET',
    url: 'https://localhost:5001/api/Product',
    data: { get_param: 'value' },
    success: function (data) {
      $.each(data, function (index, element) {
        $('#getInfo').append($('<div>', {
          text: element.name
        }));
      });
    }
  });
})

// POST
$('#ajaxSoloPost').click(function () {
  var formData = {
    name: $('#post-name').val(),
    barcode: $('#post-barcode').val(),
    description: $('#post-description').val(),
    buyingPrice: Number($('#post-buyingPrice').val()),
    rate: Number($('#post-rate').val()),
  };
  console.log(formData);
  $.ajax({
    url: 'https://localhost:5001/api/Product',
    type: 'POST',
    data: JSON.stringify(formData),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      console.log(res);
    },
    error: function (res) {
      console.log(res);
      //alert("Bad thing happend! " + res.statusText);
    }
  });
});

//Click and Change

// Click
$("#clickSolohhh").click(function () {
  console.log("gg");
});

// Change
$( '#tesasda' )
.change(function () {
  var str = "";
  console.log(this)

  $( "select option:selected" ).each(function() {
    str += $( this ).text() + " ";
  });
  $( "#infoChange" ).text( str );
})
.change();

// Modal
$('#ajaxSoloPostaaaa').click(function () {
  var formData = {
    name: $('#modal-post-name').val(),
    barcode: $('#modal-post-barcode').val(),
    description: $('#modal-post-description').val(),
    buyingPrice: Number($('#modal-post-buyingPrice').val()),
    rate: Number($('#modal-post-rate').val()),
  };
  console.log(formData);
  $.ajax({
    url: 'https://localhost:5001/api/Product',
    type: 'POST',
    data: JSON.stringify(formData),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      console.log(res);
    },
    error: function (res) {
      console.log(res);
      //alert("Bad thing happend! " + res.statusText);
    }
  });
});