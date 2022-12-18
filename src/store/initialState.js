const initialState = {
    cached_data: {
        StartPage: {
            gameList: [],
            gamePricing: [0, 0],
        },
        GamePage: {
            gameById: {},
        },
        App: {
            userAuthorized: false,
            userCart: [],
            userOrders: [],
        }
    },
    ui: {
        StartPage: {
            loadingStatus: true,
            textFieldValue: '',
            sliderValue: [0, 0]
        },
        GamePage: {
            loadingStatus: true,
        },
        CartPage: {
            loadingStatus: true,
        },
        OrdersPage: {
            loadingStatus: true,
        },
        App: {
            AppBarLinks: [
                {
                    title: 'Главная страница',
                    link: '/'
                },
                {
                    title: 'Список игр',
                    link: '/games'
                },
            ],
        }
    }
}

export default initialState