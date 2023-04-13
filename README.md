# albala.az

e-commerce. [user,saler] qeydiyyat [user-> user/sign-up , saler ->
saler/sign-up] sign-in [user-> user/sign-in, saler -> saler/sign-in] {voen,
password}

<!-- USER SHEXSI KABINET -->

[/user/dashboard] 5 sehife: { profile+, orders+, edit-profile+, address+,
whishlist+, forgotPassword }

<!-- Mehsul -->

[/product]+

<!-- saler shexsi kabinet -->

[/saler/dashboard] { profile(edit de olmali)+, ordersIn(gelen sifarisler)[ GET+
PUT+], offers(etdiyi teklifler)+}

<!-- Schema-lari yaratmaq -->

/admin {schema}

<!--
    category -> [product-lari category-ya bolmek, subCategory]
    filter -> ad, brand, color, ram, yaddas [subCategory]

    Elektronik   -> Soyuducu[], TV, komputer, telefon, flashcard.

userAuth -basket,salerAuth - order ,adminAuth - status  - baxilmali
model-order.js de statusCode yoxsa status , [order_status.js , basket.js] - baxilmali

 -->
<!-- 1. satici silinende [isActive]  --> +
<!-- 2. user -> 1 hefte dondurulmalidir, ondan sonra silinmelidir -  -->
<!-- 3. order verende price offer-dan order-e kopyalanmalidir! ? -->+
<!-- 4. forgotPassword + -->+
<!-- 5. filter -->
<!-- 6. category -->
<!-- 7. sekiller (cloudflare) 
-->

