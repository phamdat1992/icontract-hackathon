import Info from './pages/info';
import ContractCreation from './pages/create-new';
import ReviewContract from './pages/review';

class App {
    get name() {
        return 'WebApp';
    }

    constructor() {
        const $infoPage = document.getElementById('info-page');
        if ($infoPage) {
            new Info();
        }

        const $createNewContract = document.getElementById('create-new-contract-page');
        if ($createNewContract) {
            new ContractCreation();
        }

        const $reviewContract = document.getElementById('review-contract');
        if ($reviewContract) {
            new ReviewContract();
        }
    }
}

export default App;