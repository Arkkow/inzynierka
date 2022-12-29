const getLaddersFiltered = function (places, ladders_list) {
    let ladders = {}

    if (places === 16) {
        ladders = {
            1: ladders_list.filter((e) => e.round_number === "1" || e.round_number === "1W" || e.round_number === "1WW" || e.round_number === "1WWW"),
            3: ladders_list.filter((e) => e.round_number === "1WWL"),
            5: ladders_list.filter((e) => e.round_number === "1WL" || e.round_number === "1WLW"),
            7: ladders_list.filter((e) => e.round_number === "1WLL"),
            9: ladders_list.filter((e) => e.round_number === "1L" || e.round_number === "1LW" || e.round_number === "1LWW"),
            11: ladders_list.filter((e) => e.round_number === "1LWL"),
            13: ladders_list.filter((e) => e.round_number === "1LL" || e.round_number === "1LLW"),
            15: ladders_list.filter((e) => e.round_number === "1LLL"),
        };
    } else {
        ladders = {
            1: ladders_list.filter((e) => e.round_number === "1" || e.round_number === "1W" || e.round_number === "1WW"),
            3: ladders_list.filter((e) => e.round_number === "1WL"),
            5: ladders_list.filter((e) => e.round_number === "1L" || e.round_number === "1LW"),
            7: ladders_list.filter((e) => e.round_number === "1LL"),
        };
    }

    return ladders;
};

export default getLaddersFiltered;