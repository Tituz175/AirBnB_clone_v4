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

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    method: "GET",
    success: (res) => {
      res.status == "OK"
        ? $("header div#api_status").addClass("available")
        : $("header div#api_status").removeClass("available");
    },
  });

  const showPlaces = (list) => {
    list.forEach((place) => {
      $("section.places").append(
        `
            <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">
                    ${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}
                    </div>
                    <div class="number_rooms">
                    ${place.number_rooms} Bedroom${
          place.number_rooms != 1 ? "s" : ""
        }
                    </div>
                    <div class="number_bathrooms">
                    ${place.number_bathrooms} Bathroom${
          place.number_bathrooms != 1 ? "s" : ""
        }
                    </div>
                </div>
                <div class="description">${place.description}</div>
            </article>
            `
      );
    });
  };

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: (res) => {
      showPlaces(res);
    },
  });
});
