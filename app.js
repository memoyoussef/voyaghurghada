
/* ==========================================
   VOYAGHURGHADA
   Excursions, Search & Booking
   Enhanced Search Version
========================================== */

/* 1. EXCURSIONS DATA */

const trips = [
    {
        id: 1,
        title: "Excursion privée au Caire",
        location: "Hurghada",
        destination: "Le Caire",
        category: "Excursions culturelles",
        price: 100,
        duration: "Journée complète",
        image: "images/cairo-pyramids.jpg",
        description: "Découvrez les pyramides de Gizeh et les trésors du Caire."
    },
    {
        id: 2,
        title: "Excursion privée à Louxor",
        location: "Hurghada",
        destination: "Louxor",
        category: "Excursions culturelles",
        price: 85,
        duration: "Journée complète",
        image: "images/luxor-karnak.jpg",
        description: "Explorez les temples de Karnak et les merveilles de Louxor."
    },
    {
        id: 3,
        title: "Nager avec les dauphins",
        location: "Hurghada",
        destination: "Hurghada",
        category: "Mer & snorkeling",
        price: 40,
        duration: "4 à 5 heures",
        image: "images/red-sea-dolphins.jpg",
        description: "Partez en mer à la découverte des dauphins de la mer Rouge."
    },
    {
        id: 4,
        title: "Quad Tour & balade à dos de chameau",
        location: "Hurghada",
        destination: "Hurghada",
        category: "Safari & désert",
        price: 60,
        duration: "3 heures",
        image: "images/quad-desert.jpg",
        description: "Découvrez les paysages du désert lors d'une aventure en quad."
    },
    {
        id: 5,
        title: "Excursion au Caire en avion",
        location: "Hurghada",
        destination: "Le Caire",
        category: "Excursions culturelles",
        price: 280,
        duration: "Journée complète",
        image: "images/cairo-plane.jpg",
        description: "Découvrez les incontournables du Caire lors d'une excursion en avion."
    },
    {
        id: 6,
        title: "Speed Boat – Orange Bay",
        location: "Hurghada",
        destination: "Hurghada",
        category: "Mer & snorkeling",
        price: 31,
        duration: "Demi-journée",
        image: "images/orange-bay-speedboat.jpg",
        description: "Profitez des eaux turquoise et des paysages d'Orange Bay."
    },
    {
        id: 7,
        title: "Super Safari",
        location: "Hurghada",
        destination: "Hurghada",
        category: "Safari & désert",
        price: 60,
        duration: "Après-midi et soirée",
        image: "images/super-safari.jpg",
        description: "Vivez une aventure dans le désert égyptien."
    },
    {
        id: 8,
        title: "Safari Jeep 4×4",
        location: "Hurghada",
        destination: "Hurghada",
        category: "Safari & désert",
        price: 40,
        duration: "Environ 5 heures",
        image: "images/jeep-safari.jpg",
        description: "Explorez le désert à bord d'un véhicule tout-terrain."
    },
    {
        id: 9,
        title: "Snorkeling à Hula Hula Island",
        location: "Hurghada",
        destination: "Hurghada",
        category: "Mer & snorkeling",
        price: 23,
        duration: "Journée en mer",
        image: "images/red-sea-snorkeling.jpg",
        description: "Une journée de baignade et de découverte des récifs coralliens."
    }
];


/* 2. HTML ELEMENTS */

const tripContainer = document.getElementById("trip-container");
const destinationSelect = document.getElementById("destination");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const bookingSelect = document.getElementById("trip-select");
const bookingForm = document.getElementById("booking-form");

let resultsInfo = null;
let resetButton = null;


/* 3. SEARCH TOOLBAR */

function createSearchToolbar() {
    if (!tripContainer || !tripContainer.parentElement) return;

    const toolbar = document.createElement("div");
    toolbar.className = "search-results-toolbar";

    resultsInfo = document.createElement("p");
    resultsInfo.className = "search-results-count";
    resultsInfo.setAttribute("aria-live", "polite");

    resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "reset-search-button";
    resetButton.textContent = "Réinitialiser les filtres";

    resetButton.addEventListener("click", resetSearch);

    toolbar.append(resultsInfo, resetButton);

    tripContainer.parentElement.insertBefore(toolbar, tripContainer);

    const style = document.createElement("style");

    style.textContent = `
        .search-results-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
            margin: 25px 0;
        }

        .search-results-count {
            margin: 0;
            color: #111111;
            font-weight: 700;
            font-size: 15px;
        }

        .reset-search-button {
            padding: 11px 20px;
            border: 1px solid #C58A16;
            border-radius: 4px;
            background: #FFFFFF;
            color: #A66B08;
            font-weight: 700;
            cursor: pointer;
            transition: all .25s ease;
        }

        .reset-search-button:hover {
            background: #D4A017;
            color: #FFFFFF;
        }

        .search-empty-message {
            grid-column: 1 / -1;
            padding: 35px 20px;
            text-align: center;
            background: #FFFFFF;
            border: 1px solid #E8ECEA;
            border-radius: 6px;
            color: #111111;
        }

        .search-empty-message h3 {
            margin-bottom: 10px;
            color: #111111;
        }

        .search-empty-message p {
            color: #555555;
        }

        .trip-location-info {
            color: #333333;
            font-size: 13px;
            line-height: 1.8;
            margin-bottom: 12px;
        }

        .trip-location-info strong {
            color: #A66B08;
        }

        @media (max-width: 600px) {
            .search-results-toolbar {
                align-items: flex-start;
            }

            .reset-search-button {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(style);
}


/* 4. NORMALIZE SEARCH TEXT */

function normalizeSearchText(value) {
    return String(value || "")
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


/* 5. UPDATE RESULTS COUNTER */

function updateResultsCount(count) {
    if (!resultsInfo) return;

    resultsInfo.textContent =
        count === 1
            ? "1 excursion trouvée"
            : `${count} excursions trouvées`;
}


/* 6. DISPLAY EXCURSIONS */

function displayTrips(list) {
    if (!tripContainer) return;

    tripContainer.replaceChildren();

    updateResultsCount(list.length);

    if (list.length === 0) {
        const message = document.createElement("div");
        message.className = "search-empty-message";

        const title = document.createElement("h3");
        title.textContent = "Aucune excursion trouvée";

        const description = document.createElement("p");
        description.textContent =
            "Essayez de modifier vos filtres ou votre recherche.";

        const reset = document.createElement("button");
        reset.type = "button";
        reset.className = "reset-search-button";
        reset.textContent = "Voir toutes les excursions";
        reset.addEventListener("click", resetSearch);

        message.append(title, description, reset);
        tripContainer.appendChild(message);

        return;
    }

    list.forEach(trip => {
        const card = document.createElement("article");
        card.className = "trip-card";

        const image = document.createElement("img");
        image.src = trip.image;
        image.alt = trip.title;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.alt = `Image indisponible : ${trip.title}`;
        });

        const content = document.createElement("div");
        content.className = "trip-card-content";

        const category = document.createElement("small");
        category.textContent = trip.category;

        const locationInfo = document.createElement("div");
        locationInfo.className = "trip-location-info";

        const departure = document.createElement("div");
        departure.textContent = `Départ de : ${trip.location}`;

        const destination = document.createElement("div");
        destination.textContent = `Destination : ${trip.destination || trip.location}`;

        locationInfo.append(departure, destination);

        const title = document.createElement("h3");
        title.textContent = trip.title;

        const description = document.createElement("p");
        description.textContent = trip.description;

        const duration = document.createElement("p");
        duration.textContent = `Durée : ${trip.duration}`;

        const price = document.createElement("p");
        price.className = "trip-price";
        price.textContent = `À partir de ${trip.price} €`;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.textContent = "Réserver cette excursion →";

        button.addEventListener("click", () => {
            if (bookingSelect) {
                bookingSelect.value = trip.title;
            }

            document.getElementById("booking")
                ?.scrollIntoView({ behavior: "smooth" });
        });

        content.append(
            category,
            locationInfo,
            title,
            description,
            duration,
            price,
            button
        );

        card.append(image, content);
        tripContainer.appendChild(card);
    });
}


/* 7. SEARCH AND FILTER */

function searchTrips() {
    const selectedDestination = normalizeSearchText(
        destinationSelect?.value || ""
    );

    const selectedCategory = normalizeSearchText(
        categorySelect?.value || ""
    );

    const keyword = normalizeSearchText(
        searchInput?.value || ""
    );

    const filteredTrips = trips.filter(trip => {
        const tripDestination = normalizeSearchText(
            trip.destination || trip.location
        );

        const tripCategory = normalizeSearchText(trip.category);

        const matchesDestination =
            !selectedDestination ||
            tripDestination === selectedDestination;

        const matchesCategory =
            !selectedCategory ||
            tripCategory === selectedCategory;

        const searchableText = normalizeSearchText([
            trip.title,
            trip.location,
            trip.destination,
            trip.category,
            trip.description,
            trip.duration
        ].join(" "));

        const matchesKeyword =
            !keyword || searchableText.includes(keyword);

        return (
            matchesDestination &&
            matchesCategory &&
            matchesKeyword
        );
    });

    displayTrips(filteredTrips);
}


/* 8. RESET SEARCH */

function resetSearch() {
    if (destinationSelect) {
        destinationSelect.value = "";
    }

    if (categorySelect) {
        categorySelect.value = "";
    }

    if (searchInput) {
        searchInput.value = "";
    }

    displayTrips(trips);
}


/* 9. POPULATE BOOKING SELECT */

function populateBookingSelect() {
    if (!bookingSelect) return;

    trips.forEach(trip => {
        const exists = Array.from(bookingSelect.options)
            .some(option => option.value === trip.title);

        if (exists) return;

        const option = document.createElement("option");
        option.value = trip.title;
        option.textContent = trip.title;

        bookingSelect.appendChild(option);
    });
}


/* 10. BOOKING FORM */

function setupBookingForm() {
    if (!bookingForm) return;

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(bookingForm);

        const customer = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            trip: formData.get("trip"),
            date: formData.get("date"),
            people: formData.get("people"),
            message: formData.get("message")
        };

        const whatsappMessage = `
Bonjour VoyagHurghada !

Je souhaite demander une réservation.

Nom : ${customer.name}
E-mail : ${customer.email}
Téléphone : ${customer.phone}

Excursion : ${customer.trip}
Date souhaitée : ${customer.date}
Nombre de personnes : ${customer.people}

Message :
${customer.message || "Aucun message supplémentaire"}

Merci de me contacter pour confirmer la disponibilité et le prix final.
        `.trim();

        const whatsappURL =
            "https://wa.me/201285248835?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
}


/* 11. INITIALIZE WEBSITE */

function initializeWebsite() {
    createSearchToolbar();

    populateBookingSelect();

    displayTrips(trips);

    setupBookingForm();

    if (destinationSelect) {
        destinationSelect.addEventListener("change", searchTrips);
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", searchTrips);
    }

    if (searchInput) {
        searchInput.addEventListener("input", searchTrips);
    }

    const searchButton = document.querySelector(".search-box button");

    if (searchButton) {
        searchButton.addEventListener("click", event => {
            event.preventDefault();
            searchTrips();

            document.getElementById("excursions")
                ?.scrollIntoView({ behavior: "smooth" });
        });
    }

    const searchForm = document.querySelector(".search-box");

    if (searchForm && searchForm.tagName === "FORM") {
        searchForm.addEventListener("submit", event => {
            event.preventDefault();
            searchTrips();

            document.getElementById("excursions")
                ?.scrollIntoView({ behavior: "smooth" });
        });
    }
}


/* 12. START */

document.addEventListener("DOMContentLoaded", initializeWebsite);
