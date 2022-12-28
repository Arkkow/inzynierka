const getLaddersFiltered = function (places, ladders_list) {
    let ladders = {}

    if (places === 8) {
        ladders = {
            1: ladders_list.filter((e) => e.round_number === "1" || e.round_number === "1W" || e.round_number === "1WW" || e.round_number === "1WWW"),
            5: ladders_list.filter((e) => e.round_number === "1W" || e.round_number === "1WL" || e.round_number === "1WLW"),
            9: ladders_list.filter((e) => e.round_number === "1L" || e.round_number === "1LW" || e.round_number === "1LWW"),
        };
    } else {
        ladders = {
            1: ladders_list.filter((e) => e.round_number === "1" || e.round_number === "1W" || e.round_number === "1WW" || e.round_number === "1WWW"),
            3: ladders_list.filter((e) => e.round_number === "1W" || e.round_number === "1WL" || e.round_number === "1WLW"),
            5: ladders_list.filter((e) => e.round_number === "1L" || e.round_number === "1LW" || e.round_number === "1LWW"),
        };
    }

    return ladders;
};

export default getLaddersFiltered;