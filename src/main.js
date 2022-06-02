import './sass/main.scss'

document.querySelector('#app').innerHTML = `
<aside class="aside">
    <section class="aside__navLogo logo">
        
        <h1 class="logo__title"><span class="material-symbols-outlined">monitor_heart</span> iHealth</h1>
        <h2 class="logo__subtitle">Elektroniczna kartoteka zawsze przy Tobie</h2>
    </section>
    
    <section class="aside__features">
        <div class="features__item feature">
            <span class="material-symbols-outlined">database</span>
            <h4 class="feature__title">Dostęp dostęp do najpotrzebniejszych informacji kiedy tylko potrzebujesz.</h4>
            <div class="feature__description">Architektura kartoteki oparta o przechowywanie danych w spersonalizowanej chmurze.</div>
        </div>
        
        <div class="features__item feature">
            <span class="material-symbols-outlined">medical_information</span>
            <h4 class="feature__title">Karta medyczna daje ci dostęp do Twoich kuracji, grupy krwi, uczuleń, a także certyfikatów i krwiodawstwie.</h4>
            <div class="feature__description">iHealth to innowacyjny sposób śledzenia Twoich procesów leczenia oraz informacji niezbędnych do udzielenia Tobie pomocy przez ratowników podczas wypadków.</div>
        </div>
        
        <div class="features__item feature">
            <span class="material-symbols-outlined">medical_services</span>
            <h4 class="feature__title">Możliwość wgrywania badań, recept i skierowań</h4>
            <div class="feature__description">Z iHealth twój lekarz zawsze bedzie miał pełny obraz twojego stanu zdrowia </div>
        </div>
    </section>
</aside>
<main class="signInPanel">

    <section class="signInPanel__login login">
        <h3 class="login__question">Masz już konto?</h3>
        <button class="login__switchLogin">Zaloguj się</button>
    </section>
    
    <section class="signInPanel__registration register">
        <div class="register__api">
                <h2 class="register__createBanner">Stwórz darmowe konto</h2>
                <button class="register__createWith">Zaloguj się przez Google</button>
                <button class="register__createWith">Zaloguj się przez Facebook <i class="fa-brands fa-facebook"></i> </button>
                <span class="register__other">lub</span>
</div>
        
        
        <form class="register__form" action="">
            <div class="inputWrapper">
                <label class="label" for="email">Email</label>
                <input class="inputData" id="email" name="email" type="email" placeholder="jan_kowalski@o2.pl" required>
            </div>
            <div class="inputWrapper">
                <label class="label" for="password">Hasło</label>
                <input class="inputData" id="password" name="password" type="password" required>
            </div>
            <input class="confirmRegistration" type="submit" value="Dołącz przez email">
        </form>
    </section>
    
</main>
`

