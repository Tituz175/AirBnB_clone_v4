$(document).ready(function () {
  checked_amenities = [];
  $(".amenities .popover input").on("click", function () {
    if ($(this).is(":checked")) {
      checked_amenities.push($(this).attr("data-name"));
      console.log(checked_amenities);
    } else {
      checked_amenities.splice(
        checked_amenities.indexOf($(this).attr("data-name")),
        1
      );
      console.log(checked_amenities);
    }
    updateAmenitiesDisplay();
  });

  const updateAmenitiesDisplay = () => {
    $(".amenities h4").empty();
    checked_amenities.forEach((element, index) => {
      if (index != 0) {
        let content = $(".amenities h4").text();
        $(".amenities h4").text(`${content}, ${element}`);
      } else {
        $(".amenities h4").text(`${element}`);
      }
    });
  };
});
