export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveller in exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A romantic gateway for two',
        icon: '❤️',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A fun-filled trip for the whole family',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'An adventure with your best people',
        icon: '😎',
        people: '4+'
    }
]

export const SelectBudgetOptions=[
    {
        id:'1',
        title:'Cheap',
        desc:'Stay concious of costs',
        icon:'🪙'
    },
    {
        id:'2',
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:'3',
        title:'Luxurious',
        desc:'No worries about the cost',
        icon:'💵'
    }
]

export const AI_PROPMT='Generate travel plan for Location: {location}, for {totalDays} days for {traveller} with {budget} budget, Give me a hotels options list of atleast 4 hotels with HotelName, Hotel address, Price, hotel image url, geo coordinates, ratings, description and suggest an itinerary with placeName, Place details, Place image Url, Geo coordinates, Ticket pricing, Rating, Time to travel each of the location for {totalDays} days with each day plan having 3 locations with best time to visit in JSON format.'