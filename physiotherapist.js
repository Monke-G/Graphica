document.addEventListener('DOMContentLoaded', () => {

    // Data based on Apollo 24/7 listings
    const physicians = [
        {
            name: "Dr. P. Rajasekhar",
            specialty: "Physiotherapy and Rehabilitation",
            experience: 25,
            qualifications: "MPTh/MPT (Orthopedic Physiotherapy)",
            location: "Hyderabad",
            languages: ["English", "Hindi", "Telugu"],
            imageUrl: "https://images.apollo247.in/doctors/3b759685-64d6-4444-8d9f-6def10c71a81.jpg"
        },
        {
            name: "Dr. L. Sreenivasu",
            specialty: "Physiotherapy and Rehabilitation",
            experience: 24,
            qualifications: "MPTh/MPT (Neurology), BPTh/BPT",
            location: "Hyderabad",
            languages: ["English", "Hindi", "Telugu"],
            imageUrl: "https://images.apollo247.in/doctors/326815ef-71e1-450f-a99f-76c24329a3a1.jpg"
        },
        {
            name: "Dr. Amit Kumar",
            specialty: "Physiotherapy and Rehabilitation",
            experience: 19,
            qualifications: "BPTh/BPT",
            location: "Delhi",
            languages: ["English", "Hindi"],
            imageUrl: "https://images.apollo247.in/doctors/e6b208a0-128a-4161-9da0-7c59c5d18d48.jpg"
        },
        {
            name: "Dr. B. K. Singh",
            specialty: "Physiotherapy and Rehabilitation",
            experience: 22,
            qualifications: "BPTh/BPT",
            location: "Delhi",
            languages: ["English", "Hindi"],
            imageUrl: "https://images.apollo247.in/doctors/f8299292-80b1-4007-802c-5645e77114c0.jpg"
        },
        {
            name: "Dr. K. Yamini",
            specialty: "Physiotherapy and Rehabilitation",
            experience: 16,
            qualifications: "MPTh/MPT (Cardio-Pulmonary)",
            location: "Chennai",
            languages: ["English", "Tamil"],
            imageUrl: "https://images.apollo247.in/doctors/97491d0f-4f33-4f51-b847-ae49027879e6.jpg"
        },
        {
            name: "Dr. Anjana K. R.",
            specialty: "Physiotherapy and Rehabilitation",
            experience: 14,
            qualifications: "MPTh/MPT (Orthopedics), BPTh/BPT",
            location: "Bangalore",
            languages: ["English", "Malayalam"],
            imageUrl: "https://images.apollo247.in/doctors/5d8b8577-639a-4c28-9844-31f07b1d5635.jpg"
        }
    ];

    const listContainer = document.getElementById('physician-list');
    const nameSearch = document.getElementById('name-search');
    const locationFilter = document.getElementById('location-filter');
    const noResultsMessage = document.getElementById('no-results');

    // --- Main Function to Display Physicians ---
    function displayPhysicians(physicianArray) {
        listContainer.innerHTML = ''; // Clear previous results
        if (physicianArray.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }

        physicianArray.forEach(physician => {
            const card = document.createElement('div');
            card.className = 'physician-card';
            card.innerHTML = `
                <div class="card-header">
                    <img src="${physician.imageUrl}" alt="Dr. ${physician.name}" class="physician-img">
                    <div class="header-info">
                        <h2>Dr. ${physician.name}</h2>
                        <p>${physician.specialty}</p>
                    </div>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <i class="fa-solid fa-briefcase"></i>
                        <span>${physician.experience} Years of Experience</span>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-graduation-cap"></i>
                        <span>${physician.qualifications}</span>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-map-marker-alt"></i>
                        <span>${physician.location}</span>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-language"></i>
                        <span>${physician.languages.join(', ')}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="#" class="cta-button">Book Appointment</a>
                </div>
            `;
            listContainer.appendChild(card);
        });
    }

    // --- Function to Populate Location Filter ---
    function populateLocationFilter() {
        const locations = [...new Set(physicians.map(p => p.location))];
        locations.sort().forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }

    // --- Function to Handle Filtering ---
    function handleFilter() {
        const nameQuery = nameSearch.value.toLowerCase();
        const locationQuery = locationFilter.value;

        let filteredPhysicians = physicians.filter(p => {
            const nameMatch = p.name.toLowerCase().includes(nameQuery);
            const locationMatch = (locationQuery === 'all' || p.location === locationQuery);
            return nameMatch && locationMatch;
        });

        displayPhysicians(filteredPhysicians);
    }

    // --- Initial Setup and Event Listeners ---
    populateLocationFilter();
    displayPhysicians(physicians);

    nameSearch.addEventListener('input', handleFilter);
    locationFilter.addEventListener('change', handleFilter);
});