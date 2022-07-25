export const profilPanel = `
<header class="menuPanel">
    <section class="menu__controls">
        <span class="material-symbols-outlined">monitor_heart</span>
        <h1 class="logo__title"> iHealth</h1>
        <i class="fa fa-solid fa-bars"></i>
    </section>

    <section class="menu__listFeatrues">
        <ul class="featureList">
            <li class="featureList__item"><span class="material-symbols-outlined">
dashboard
</span> Dashboard</li>
            <li class="featureList__item"><i class="fa fa-solid fa-user"></i> Profil</li>
            <li class="featureList__item"><i class="fa fa-regular fa-capsules"></i> Recepty</li>
            <li class="featureList__item"><i class="fa fa-light fa-viruses"></i> Skierowania</li>
            <li class="featureList__item"><i class="fa fa-regular fa-calendar-check"></i> Wizyty</li>
            <li class="help featureList__item"><i class="fa fa-regular fa-info"></i> Pomoc</li>
            <li class="featureList__item"><span class="logout material-symbols-outlined">
logout
</span> Wyloguj</li>
        </ul>
    </section>


    <section class="userLogged">
        <div class="userLogged__avatar">
        </div>
        <h6>Jan Kowalski</h6>
    </section>
</header>

<main class="mainPanel">
    <section class="greeting">
        <h2 class="greeting__welcome">Cześć Jan!</h2>
        <h6 class="greeting__date">10 maja 2022</h6>
    </section>

    <section class="features">
        <div id="issues" class="featureItem">
            <h2 class="featureItem__description">Twoje informacje</h2>
            <ul class="dataList">
                <li class="dataList__item"> <div class="icon_wrapper blood-icon"><span class="material-symbols-outlined">
bloodtype
</span></div> Grupa krwi <span class="moreInfo">AB Rh-</span></li>
                <li class="dataList__item">
                    <div class="icon_wrapper allergies"><i class="fa-solid fa-hand-dots"></i></div> Uczulenia <span class="moreInfo">Detergenty</span></li>
                <li class="dataList__item">
                    <div class="icon_wrapper diabetics"><i class="fa-solid fa-apple-whole"></i></div> Cukrzyca <span class="moreInfo">Typu 2</span></li>
            </ul>
        </div>
        <div id="contactList" class="featureItem">
            <h2 class="featureItem__description">Lista osób bliskich</h2>
            <ul class="dataList contacts">
                <li class="dataList__item contact">
                    <div class="avatarPhoto mum"></div>
                    <div class="contact__info">
                    <h6 class="name">Maria Kowalska</h6>
                    <p class="phonenumber">+48 530 574 123</p>
                </div> <span class="mum contactType">Mama</span></li>
                <li class="dataList__item contact">
                    <div class="avatarPhoto dad"></div>
                    <div class="contact__info">
                    <h6 class="name">Józef Kowalski</h6>
                    <p class="phonenumber">+48 530 174 323</p>
                    </div>
                    <span class="dad contactType">Tata</span></li>
                <li class="dataList__item contact ">
                    <div class="avatarPhoto couple"></div>
                    <div class="contact__info">
                        <h6 class="name">Halle Berry</h6>
                        <p class="phonenumber">+48 728 424 136</p>
                    </div>
                    <span class="couple contactType">Partner/ka</span>
                </li>
            </ul>
        </div>
        <div id="additional" class="featureItem">
            <h2 class="featureItem__description">Informacje szczególne</h2>
            <ul class="dataList">
                <li class="dataList__item">Dawca organów <span class="moreInfo denied">Brak zgody</span></li>
                <li class="dataList__item"> Honorowy dawca krwi <span class="moreInfo accept">Tak</span></li>

            </ul>
        </div>
    </section>

</main>

<aside class="profilePanel">
    <div class="avatar">
        <img class="avatar__img" src="" alt="">
    </div>
    <h2 class="profileName">Jan Kowalski</h2>
    <ul class="userInfoList">
        <li class="userInfoList__item">
            <h6 class="labelInfo">Email</h6>
            <p class="userInfo">jan.kowalski@gmail.com</p>
        </li>
        <li class="userInfoList__item">
            <h6 class="labelInfo">Telefon</h6>
            <p class="userInfo">+48 504 606 924</p>
        </li>
        <li class="userInfoList__item">
            <h6 class="labelInfo">Wiek</h6>
            <p class="userInfo">27</p>
        </li>
        <li class="userInfoList__item">
            <h6 class="labelInfo">Płeć</h6>
            <p class="userInfo">Mężczyzna</p>
        </li>
        <li class="userInfoList__item">
        <h6 class="labelInfo">Waga</h6>
        <p class="userInfo">75 kg</p></li>
        <li class="userInfoList__item">
            <h6 class="labelInfo">Wzrost</h6>
            <p class="userInfo">185 cm</p>
        </li>
    </ul>
</aside>
`