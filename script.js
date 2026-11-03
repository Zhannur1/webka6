const rooms = [

    {
        name: "Balcony",
        floor: 2,

        guests: [

            {
                name: "Aigerim",
                color: "green",
                arrival: "20:45",
                aitu: true,
                things: ["cup", "crumbs"]
            },

            {
                name: "Aliya",
                color: "black",
                arrival: "21:15",
                aitu: false,
                things: ["phone", "cup"]
            },

            {
                name: "Madina",
                color: "green",
                arrival: "22:10",
                aitu: false,
                things: [
                    "phone",
                    "bag",
                    "crumbs"
                ]
            },

            {
                name: "Ivan",
                color: "black",
                arrival: "20:10",
                aitu: true,
                things: ["cup"]
            }

        ]
    },


    {
        name: "Hall",
        floor: 2,

        guests: [

            {
                name: "Arman",
                color: "yellow",
                arrival: "20:35",
                aitu: false,
                things: [
                    "bag",
                    "glasses"
                ]
            },

            {
                name: "Sophia",
                color: "purple",
                arrival: "21:20",
                aitu: true,
                things: ["phone"]
            },

            {
                name: "Dias",
                color: "green",
                arrival: "19:45",
                aitu: true,
                things: []
            },

            {
                name: "Bekzat",
                color: "purple",
                arrival: "20:55",
                aitu: false,
                things: [
                    "bag",
                    "cup",
                    "crumbs"
                ]
            },

            {
                name: "Aruzhan",
                color: "blue",
                arrival: "21:50",
                aitu: true,
                things: ["phone"]
            },

            {
                name: "Saule",
                color: "green",
                arrival: "21:25",
                aitu: false,
                things: ["glasses"]
            }

        ]
    },


    {
        name: "Kitchen",
        floor: 1,

        guests: [

            {
                name: "Nurlan",
                color: "red",
                arrival: "19:40",
                aitu: true,
                things: [
                    "phone",
                    "cup"
                ]
            },

            {
                name: "Emma",
                color: "black",
                arrival: "20:15",
                aitu: false,
                things: ["bag"]
            },

            {
                name: "Timur",
                color: "green",
                arrival: "21:05",
                aitu: true,
                things: [
                    "phone",
                    "bag",
                    "crumbs"
                ]
            },

            {
                name: "Sergey",
                color: "yellow",
                arrival: "20:50",
                aitu: false,
                things: []
            },

            {
                name: "Yerlan",
                color: "red",
                arrival: "21:40",
                aitu: true,
                things: [
                    "glasses",
                    "phone"
                ]
            },

            {
                name: "Kamila",
                color: "green",
                arrival: "20:05",
                aitu: false,
                things: ["cup"]
            }

        ]
    },


    {
        name: "Living room",
        floor: 1,

        guests: [

            {
                name: "Daniel",
                color: "blue",
                arrival: "19:55",
                aitu: true,
                things: ["glasses"]
            },

            {
                name: "Zarina",
                color: "green",
                arrival: "21:10",
                aitu: false,
                things: [
                    "bag",
                    "phone",
                    "crumbs"
                ]
            },

            {
                name: "Natasha",
                color: "yellow",
                arrival: "20:30",
                aitu: true,
                things: []
            },

            {
                name: "Askar",
                color: "black",
                arrival: "21:00",
                aitu: true,
                things: ["phone"]
            },

            {
                name: "Inkar",
                color: "purple",
                arrival: "20:20",
                aitu: false,
                things: ["bag"]
            }

        ]
    }

];


const caseDescriptions = {

    1: "Who is in the hall?",

    2: "Who is dressed in yellow or purple?",

    3: "Which AITU students are upstairs?",

    4: "Who has glasses or a bag?",

    5: "Who came with nothing at all?",

    6: "Who has a phone but no bag?",

    7: "Who arrived between 20:30 and 21:00?",

    8: "Who arrived after 21:00 and is not an AITU student?",

    9: "Who stands right next to Askar?",

    10: "Who stands last in each room?",

    11: "Who stands third in each room?",

    12: "Who stands after Timur in his room?",

    13: "Who stands right before someone in black?",

    14: "In which room is Aruzhan?",

    15: "Which rooms have fewer than 6 guests?",

    16: "Which rooms have a cup but nobody wears glasses?",

    17: "Who came first to each room?",

    18: "Miras joins Askar and Inkar.",

    19: "Natasha goes home.",

    20: "Who took the cake?"

};


const caseChains = {

    1:
        '$(".room[data-room=\\"Hall\\"] .guest-card")',

    2:
        '$(".guest-card.color-yellow, .guest-card.color-purple")',

    3:
        '$(".floor[data-floor=\\"2\\"] .guest-card.aitu")',

    4:
        '$(".guest-card.has-glasses, .guest-card.has-bag")',

    5:
        '$(".guest-card:not(.has-phone):not(.has-glasses):not(.has-bag):not(.has-cup):not(.has-crumbs)")',

    6:
        '$(".guest-card.has-phone:not(.has-bag)")',

    7:
        '$(".guest-card").filter(function () { return $(this).attr("data-arrival") >= "20:30" && $(this).attr("data-arrival") <= "21:00"; })',

    8:
        '$(".guest-card:not(.aitu)").filter(function () { return $(this).attr("data-arrival") > "21:00"; })',

    9:
        '$(".guest-card[data-name=\\"Askar\\"]").prev().add($(".guest-card[data-name=\\"Askar\\"]").next())',

    10:
        '$(".guest-list .guest-card:last-child")',

    11:
        '$(".guest-list .guest-card:nth-child(3)")',

    12:
        '$(".guest-card[data-name=\\"Timur\\"]").nextAll(".guest-card")',

    13:
        '$(".guest-card.color-black").prev(".guest-card")',

    14:
        '$(".guest-card[data-name=\\"Aruzhan\\"]").closest(".room")',

    15:
        '$(".room").filter(function () { return $(this).find(".guest-card").length < 6; })',

    16:
        '$(".room:has(.has-cup):not(:has(.has-glasses))")',

    17:
        '$(".guest-card").filter(function () { /* earliest guest in each room */ })',

    18:
        'createGuestCard(miras).hide().insertAfter($("[data-name=\\"Askar\\"]")).fadeIn()',

    19:
        '$(".guest-card[data-name=\\"Natasha\\"]").fadeOut(function () { $(this).remove(); })',

    20:
        '$(".floor[data-floor=\\"1\\"] .guest-card.has-crumbs:not(.has-cup)").filter(/* time + AITU neighbour */)'

};


const itemIcons = {

    phone: "📱",
    glasses: "👓",
    bag: "👜",
    cup: "☕",
    crumbs: "🍰"

};


/*
    Create all Case buttons
*/

function buildCaseButtons() {

    $("#caseButtons").empty();


    $.each(
        caseDescriptions,

        function (
            caseNumber,
            description
        ) {

            const $button =
                $("<button>")
                    .attr(
                        "type",
                        "button"
                    )
                    .addClass(
                        "case-button"
                    )
                    .attr(
                        "data-case",
                        caseNumber
                    )
                    .text(
                        "Case "
                        + caseNumber
                    )
                    .attr(
                        "title",
                        description
                    );


            $("#caseButtons")
                .append($button);

        }
    );

}


/*
    Create one guest card
*/

function createGuestCard(guest) {

    const $card =
        $("<article>")
            .addClass(
                "guest-card"
            )
            .addClass(
                "color-"
                + guest.color
            )
            .attr({
                "data-name":
                    guest.name,

                "data-arrival":
                    guest.arrival,

                "data-aitu":
                    guest.aitu,

                "data-color":
                    guest.color,

                "data-items":
                    guest.things.join(",")
            });


    if (guest.aitu) {

        $card.addClass("aitu");

    }


    $.each(
        guest.things,

        function (
            index,
            thing
        ) {

            $card.addClass(
                "has-" + thing
            );

        }
    );


    const $ring =
        $("<div>")
            .addClass(
                "avatar-ring"
            );


    const $avatar =
        $("<img>")
            .attr(
                "src",
                "https://api.dicebear.com/9.x/open-peeps/svg?seed="
                + encodeURIComponent(
                    guest.name
                )
            )
            .attr(
                "alt",
                guest.name
            );


    $ring.append(
        $avatar
    );


    const $name =
        $("<strong>")
            .addClass(
                "guest-name"
            )
            .text(
                guest.name
            );


    const $arrival =
        $("<span>")
            .addClass(
                "arrival"
            )
            .text(
                "◷ "
                + guest.arrival
            );


    const $things =
        $("<div>")
            .addClass(
                "things"
            );


    if (
        guest.things.length === 0
    ) {

        $things.append(
            $("<span>")
                .addClass(
                    "no-items"
                )
                .text(
                    "No items"
                )
        );

    } else {

        $.each(
            guest.things,

            function (
                index,
                thing
            ) {

                $things.append(

                    $("<span>")
                        .addClass(
                            "thing-icon"
                        )
                        .attr(
                            "title",
                            thing
                        )
                        .attr(
                            "aria-label",
                            thing
                        )
                        .text(
                            itemIcons[
                                thing
                            ]
                        )

                );

            }
        );

    }


    $card
        .append($ring)
        .append($name)
        .append($arrival);


    if (guest.aitu) {

        $card.append(

            $("<span>")
                .addClass(
                    "aitu-badge"
                )
                .text("AITU")

        );

    }


    $card.append(
        $things
    );


    return $card;

}


/*
    Build the whole party from the array
*/

function buildParty() {

    $("#party").empty();


    $.each(
        [2, 1],

        function (
            index,
            floorNumber
        ) {

            const $floor =
                $("<section>")
                    .addClass(
                        "floor"
                    )
                    .attr(
                        "data-floor",
                        floorNumber
                    );


            const $floorLabel =
                $("<div>")
                    .addClass(
                        "floor-label"
                    )
                    .text(
                        "FLOOR "
                        + floorNumber
                    );


            const $floorRooms =
                $("<div>")
                    .addClass(
                        "floor-rooms"
                    );


            $.each(
                rooms,

                function (
                    roomIndex,
                    room
                ) {

                    if (
                        room.floor
                        !==
                        floorNumber
                    ) {

                        return;

                    }


                    const $room =
                        $("<section>")
                            .addClass(
                                "room"
                            )
                            .attr(
                                "data-room",
                                room.name
                            )
                            .attr(
                                "data-floor",
                                room.floor
                            );


                    const $header =
                        $("<header>")
                            .addClass(
                                "room-header"
                            );


                    const $title =
                        $("<h3>")
                            .text(
                                room.name
                            );


                    const $count =
                        $("<span>")
                            .addClass(
                                "room-count"
                            )
                            .text(
                                room.guests.length
                            );


                    const $guestList =
                        $("<div>")
                            .addClass(
                                "guest-list"
                            );


                    $.each(
                        room.guests,

                        function (
                            guestIndex,
                            guest
                        ) {

                            $guestList
                                .append(
                                    createGuestCard(
                                        guest
                                    )
                                );

                        }
                    );


                    $header
                        .append($title)
                        .append($count);


                    $room
                        .append($header)
                        .append(
                            $guestList
                        );


                    $floorRooms
                        .append($room);

                }
            );


            $floor
                .append(
                    $floorLabel
                )
                .append(
                    $floorRooms
                );


            $("#party")
                .append($floor);

        }
    );

}


/*
    Clear highlights
*/

function clearHighlights() {

    $(".guest-card")
        .removeClass(
            "found"
        )
        .stop(
            true,
            true
        )
        .css(
            "top",
            "0"
        );


    $(".room")
        .removeClass(
            "found-room"
        );

}


/*
    Guest jump animation
*/

function jumpGuests(
    $guests
) {

    $guests.each(
        function () {

            $(this)
                .stop(
                    true,
                    true
                )
                .animate(
                    {
                        top: "-12px"
                    },
                    130
                )
                .animate(
                    {
                        top: "0px"
                    },
                    130
                );

        }
    );

}


/*
    Show guest results
*/

function showGuestResults(
    $guests
) {

    clearHighlights();


    $guests.addClass(
        "found"
    );


    jumpGuests(
        $guests
    );


    const names =
        $guests
            .map(
                function () {

                    return $(this)
                        .attr(
                            "data-name"
                        );

                }
            )
            .get();


    if (
        names.length === 0
    ) {

        $("#resultText")
            .text(
                "Nobody found."
            );

        return;

    }


    $("#resultText")
        .text(
            names.length
            + " found: "
            + names.join(", ")
        );

}


/*
    Show room results
*/

function showRoomResults(
    $rooms
) {

    clearHighlights();


    $rooms.addClass(
        "found-room"
    );


    const names =
        $rooms
            .map(
                function () {

                    return $(this)
                        .attr(
                            "data-room"
                        );

                }
            )
            .get();


    $("#resultText")
        .text(
            names.length
            + " room(s): "
            + names.join(", ")
        );

}


/*
    Get results for cases
*/

function getCaseResult(
    caseNumber
) {

    switch (
        caseNumber
    ) {


        /*
            CASE 1
            Who is in the hall?
        */

        case 1:

            return $(
                '.room[data-room="Hall"] .guest-card'
            );


        /*
            CASE 2
            Yellow or purple
        */

        case 2:

            return $(
                ".guest-card.color-yellow, "
                + ".guest-card.color-purple"
            );


        /*
            CASE 3
            AITU students upstairs
        */

        case 3:

            return $(
                '.floor[data-floor="2"] '
                + ".guest-card.aitu"
            );


        /*
            CASE 4
            Glasses or bag
        */

        case 4:

            return $(
                ".guest-card.has-glasses, "
                + ".guest-card.has-bag"
            );


        /*
            CASE 5
            Nothing at all
        */

        case 5:

            return $(
                ".guest-card"
            )
                .not(
                    ".has-phone"
                )
                .not(
                    ".has-glasses"
                )
                .not(
                    ".has-bag"
                )
                .not(
                    ".has-cup"
                )
                .not(
                    ".has-crumbs"
                );


        /*
            CASE 6
            Phone but no bag
        */

        case 6:

            return $(
                ".guest-card.has-phone"
            )
                .not(
                    ".has-bag"
                );


        /*
            CASE 7
            20:30 to 21:00 inclusive
        */

        case 7:

            return $(
                ".guest-card"
            )
                .filter(
                    function () {

                        const time =
                            $(this)
                                .attr(
                                    "data-arrival"
                                );


                        return (
                            time
                            >=
                            "20:30"
                            &&
                            time
                            <=
                            "21:00"
                        );

                    }
                );


        /*
            CASE 8
            After 21:00
            and not AITU
        */

        case 8:

            return $(
                ".guest-card"
            )
                .not(
                    ".aitu"
                )
                .filter(
                    function () {

                        return (
                            $(this)
                                .attr(
                                    "data-arrival"
                                )
                            >
                            "21:00"
                        );

                    }
                );


        /*
            CASE 9
            Right next to Askar
        */

        case 9:

            return $(
                '.guest-card[data-name="Askar"]'
            )
                .prev(
                    ".guest-card"
                )
                .add(
                    $(
                        '.guest-card[data-name="Askar"]'
                    )
                        .next(
                            ".guest-card"
                        )
                );


        /*
            CASE 10
            Last guest in every room
        */

        case 10:

            return $(
                ".guest-list "
                + ".guest-card:last-child"
            );


        /*
            CASE 11
            Third guest
            in every room
        */

        case 11:

            return $(
                ".guest-list "
                + ".guest-card:nth-child(3)"
            );


        /*
            CASE 12
            Everyone after Timur
        */

        case 12:

            return $(
                '.guest-card[data-name="Timur"]'
            )
                .nextAll(
                    ".guest-card"
                );


        /*
            CASE 13
            Right before
            someone in black
        */

        case 13:

            return $(
                ".guest-card.color-black"
            )
                .prev(
                    ".guest-card"
                );


        /*
            CASE 14
            Room of Aruzhan
        */

        case 14:

            return $(
                '.guest-card[data-name="Aruzhan"]'
            )
                .closest(
                    ".room"
                );


        /*
            CASE 15
            Rooms with fewer
            than 6 guests
        */

        case 15:

            return $(
                ".room"
            )
                .filter(
                    function () {

                        return (
                            $(this)
                                .find(
                                    ".guest-card"
                                )
                                .length
                            <
                            6
                        );

                    }
                );


        /*
            CASE 16
            Has cup,
            nobody has glasses
        */

        case 16:

            return $(
                ".room:has(.has-cup)"
                + ":not(:has(.has-glasses))"
            );


        /*
            CASE 17
            First arrival
            in every room
        */

        case 17:

            return $(
                ".guest-card"
            )
                .filter(
                    function () {

                        const $card =
                            $(this);


                        const ownTime =
                            $card.attr(
                                "data-arrival"
                            );


                        const firstTime =
                            $card
                                .closest(
                                    ".room"
                                )
                                .find(
                                    ".guest-card"
                                )
                                .map(
                                    function () {

                                        return (
                                            $(this)
                                                .attr(
                                                    "data-arrival"
                                                )
                                        );

                                    }
                                )
                                .get()
                                .sort()[0];


                        return (
                            ownTime
                            ===
                            firstTime
                        );

                    }
                );


        /*
            CASE 20
            Cake thief
        */

        case 20:

            return $(
                '.floor[data-floor="1"] '
                + ".guest-card"
                + ".has-crumbs"
                + ":not(.has-cup)"
            )
                .filter(
                    function () {

                        const time =
                            $(this)
                                .attr(
                                    "data-arrival"
                                );


                        return (
                            time
                            >
                            "21:00"
                            &&
                            time
                            <
                            "21:30"
                        );

                    }
                )
                .filter(
                    function () {

                        return (
                            $(this)
                                .prev(
                                    ".guest-card.aitu"
                                )
                                .length
                            >
                            0
                            ||
                            $(this)
                                .next(
                                    ".guest-card.aitu"
                                )
                                .length
                            >
                            0
                        );

                    }
                );

    }


    return $();

}


/*
    CASE 18
    Add Miras between
    Askar and Inkar
*/

function runCase18() {

    const miras = {

        name: "Miras",
        color: "blue",
        arrival: "21:20",
        aitu: true,
        things: ["phone"]

    };


    const $miras =
        createGuestCard(
            miras
        )
            .hide()
            .insertAfter(
                $(
                    '.guest-card[data-name="Askar"]'
                )
            )
            .fadeIn(
                500,
                function () {

                    $(this)
                        .addClass(
                            "found"
                        );


                    jumpGuests(
                        $(this)
                    );

                }
            );


    $("#resultText")
        .text(
            "Miras joined the Living room between Askar and Inkar."
        );

}


/*
    CASE 19
    Natasha leaves
*/

function runCase19() {

    const $natasha =
        $(
            '.guest-card[data-name="Natasha"]'
        );


    $natasha
        .fadeOut(
            500,
            function () {

                $(this)
                    .remove();

            }
        );


    $("#resultText")
        .text(
            "Natasha went home."
        );

}


/*
    Run a selected case
*/

function runCase(
    caseNumber
) {

    /*
        Requirement:
        rebuild before every case
    */

    buildParty();


    clearHighlights();


    $("#chainOutput")
        .text(
            caseChains[
                caseNumber
            ]
        );


    if (
        caseNumber === 18
    ) {

        runCase18();

        return;

    }


    if (
        caseNumber === 19
    ) {

        runCase19();

        return;

    }


    const $result =
        getCaseResult(
            caseNumber
        );


    if (
        caseNumber >= 14
        &&
        caseNumber <= 16
    ) {

        showRoomResults(
            $result
        );

    } else {

        showGuestResults(
            $result
        );

    }

}


/*
    Events
*/

$(function () {

    buildCaseButtons();

    buildParty();


    $("#caseButtons")
        .on(
            "click",
            ".case-button",

            function () {

                const caseNumber =
                    Number(
                        $(this)
                            .attr(
                                "data-case"
                            )
                    );


                runCase(
                    caseNumber
                );

            }
        );


    $("#resetButton")
        .on(
            "click",

            function () {

                buildParty();


                $("#resultText")
                    .text(
                        "Party reset."
                    );


                $("#chainOutput")
                    .text("—");

            }
        );

});