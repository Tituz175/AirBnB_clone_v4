$(document).ready(function () {
  let checked_amenities = {};
  $(".amenities .popover input").on("click", function () {
    if ($(this).is(":checked")) {
      checked_amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete checked_amenities[this.dataset.name];
    }
    updateAmenitiesDisplay();
  });

  const updateAmenitiesDisplay = () => {
    $(".amenities h4").empty();
    $(".amenities h4").text(Object.keys(checked_amenities).sort().join(", "));
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

  const placesSearch = (data) => {
    console.log(data)
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json",
      success: (res) => {
        showPlaces(res);
      },
    });
  };

  placesSearch({});

  $("button").on("click", () => {
    placesSearch({ amenities: Object.values(checked_amenities) });
  });
});
