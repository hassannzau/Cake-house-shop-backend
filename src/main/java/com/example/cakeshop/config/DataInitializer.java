package com.example.cakeshop.config;

import com.example.cakeshop.entity.*;
import com.example.cakeshop.repository.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CakeRepository cakeRepository;
    private final CategoryRepository categoryRepository;
    private final FlavorsRepository flavorsRepository;
    private final AllergensRepository allergensRepository;

    public DataInitializer(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           CakeRepository cakeRepository,
                           CategoryRepository categoryRepository,
                           FlavorsRepository flavorsRepository,
                           AllergensRepository allergensRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.cakeRepository = cakeRepository;
        this.categoryRepository = categoryRepository;
        this.flavorsRepository = flavorsRepository;
        this.allergensRepository = allergensRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedAdmin();
        if (cakeRepository.count() == 0) {
            seedCatalog();
        }
    }

    private void seedAdmin() {
        if (userRepository.findByEmail("admin@cakeshop.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("Admin");
            admin.setEmail("admin@cakeshop.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEnabled(true);
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }
    }

    private void seedCatalog() {
        // ── Categories ──────────────────────────────────────────────────
        Category chocolate = cat("Chocolate Cake");
        Category fruit     = cat("Fruit Cake");
        Category classic   = cat("Classic Cake");
        Category birthday  = cat("Birthday Cake");
        Category cheesecake = cat("Cheesecake");
        Category fresh     = cat("Fresh Cake");
        Category premium   = cat("Premium Cake");

        // ── Flavors ─────────────────────────────────────────────────────
        Flavors fChocolate  = flavor("Chocolate");
        Flavors fStrawberry = flavor("Strawberry");
        Flavors fRedVelvet  = flavor("Red Velvet");
        Flavors fVanilla    = flavor("Vanilla");
        Flavors fCaramel    = flavor("Caramel");
        Flavors fBlueberry  = flavor("Blueberry");
        Flavors fOreo       = flavor("Oreo");
        Flavors fLemon      = flavor("Lemon");
        Flavors fCherry     = flavor("Cherry Chocolate");
        Flavors fPistachio  = flavor("Pistachio");
        Flavors fMango      = flavor("Mango");
        Flavors fRaspberry  = flavor("Raspberry");
        Flavors fCoconut    = flavor("Coconut");
        Flavors fMocha      = flavor("Mocha");
        Flavors fMint       = flavor("Mint");
        Flavors fOrange     = flavor("Orange");
        Flavors fPeach      = flavor("Peach");
        Flavors fMatcha     = flavor("Matcha");
        Flavors fHazelnut   = flavor("Hazelnut");
        Flavors fPassion    = flavor("Passionfruit");

        // ── Allergens ────────────────────────────────────────────────────
        Allergens aGluten  = allergen("Gluten");
        Allergens aDairy   = allergen("Dairy");
        Allergens aEggs    = allergen("Eggs");
        Allergens aNuts    = allergen("Nuts");
        Allergens aSoy     = allergen("Soy");
        Allergens aWheat   = allergen("Wheat");
        Allergens aSesame  = allergen("Sesame");

        // ── Chocolate Cakes (20) ─────────────────────────────────────────
        cake("Dark Chocolate Ganache Cake", "8-inch", 48.99, "Intensely rich dark chocolate cake layered with velvety ganache and glossy chocolate mirror glaze.", 30, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Milk Chocolate Layer Cake", "8-inch", 44.99, "Light and fluffy milk chocolate sponge stacked with whipped chocolate buttercream between each layer.", 25, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("White Chocolate Raspberry Cake", "6-inch", 42.99, "Delicate white chocolate cake filled with a fresh raspberry compote and white chocolate mousse.", 20, chocolate, list(fChocolate, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Triple Chocolate Tower", "10-inch", 64.99, "Three layers of dark, milk and white chocolate sponge with matching ganache fillings — a chocolate lover's dream.", 15, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Chocolate Mint Dream", "8-inch", 46.99, "Cool peppermint cream swirled through rich chocolate sponge, finished with chocolate shards.", 20, chocolate, list(fChocolate, fMint), list(aGluten, aDairy, aEggs));
        cake("Chocolate Orange Delight", "8-inch", 45.99, "Zesty orange curd hidden inside a dark chocolate sponge, topped with candied orange slices.", 20, chocolate, list(fChocolate, fOrange), list(aGluten, aDairy, aEggs));
        cake("Salted Caramel Chocolate Cake", "8-inch", 49.99, "Silky salted caramel drizzled between layers of moist chocolate sponge and caramel buttercream.", 25, chocolate, list(fChocolate, fCaramel), list(aGluten, aDairy, aEggs));
        cake("Chocolate Hazelnut Praline", "6-inch", 52.99, "Toasted hazelnut praline folded into chocolate cream and sandwiched in a rich chocolate sponge.", 18, chocolate, list(fChocolate, fHazelnut), list(aGluten, aDairy, aEggs, aNuts));
        cake("Mocha Espresso Chocolate Cake", "8-inch", 47.99, "Bold espresso soaked chocolate sponge layered with coffee mascarpone cream.", 22, chocolate, list(fChocolate, fMocha), list(aGluten, aDairy, aEggs));
        cake("Belgian Dark Chocolate Cake", "8-inch", 54.99, "Made with 70% Belgian dark chocolate for a deep, bittersweet flavour with a silky smooth finish.", 20, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Chocolate Velvet Buttercream", "8-inch", 46.99, "Tender chocolate velvet crumb generously frosted with mountain-high chocolate buttercream.", 25, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Chocolate Strawberry Shortcake", "8-inch", 48.99, "Chocolate sponge alternated with fresh strawberry cream and whole strawberries.", 20, chocolate, list(fChocolate, fStrawberry), list(aGluten, aDairy, aEggs));
        cake("Chocolate Coconut Bliss", "6-inch", 44.99, "Toasted coconut flakes enveloped in dark chocolate ganache on a moist coconut-chocolate base.", 18, chocolate, list(fChocolate, fCoconut), list(aGluten, aDairy, aEggs));
        cake("German Chocolate Layer Cake", "10-inch", 58.99, "Classic German chocolate cake filled with pecan coconut frosting between three dark chocolate layers.", 15, chocolate, list(fChocolate, fCoconut), list(aGluten, aDairy, aEggs, aNuts));
        cake("Chocolate Pistachio Crunch", "6-inch", 51.99, "Crunchy caramelised pistachios layered into silky chocolate mousse on a chocolate brownie base.", 18, chocolate, list(fChocolate, fPistachio), list(aGluten, aDairy, aEggs, aNuts));
        cake("Chocolate Lava Cake", "4-inch", 18.99, "Individual warm chocolate cake with a gooey molten centre — served with vanilla cream.", 40, chocolate, list(fChocolate, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Chocolate Cherry Black Forest", "10-inch", 56.99, "Kirsch-soaked chocolate sponge layered with whipped cream and dark cherries.", 15, chocolate, list(fChocolate, fCherry), list(aGluten, aDairy, aEggs));
        cake("Chocolate Truffle Tuxedo Cake", "8-inch", 62.99, "Elegant black and white chocolate layers with chocolate truffle ganache — a showstopper.", 12, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Hot Chocolate Drizzle Cake", "8-inch", 43.99, "Warm spiced cocoa sponge finished with a generous hot chocolate drizzle and mini marshmallows.", 25, chocolate, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Chocolate Blackberry Swirl", "8-inch", 47.99, "Tangy blackberry compote swirled through chocolate buttercream on a dark chocolate base.", 20, chocolate, list(fChocolate, fRaspberry), list(aGluten, aDairy, aEggs));

        // ── Fruit Cakes (20) ─────────────────────────────────────────────
        cake("Strawberry Fresh Cream Cake", "8-inch", 42.99, "Light vanilla sponge layered with fresh strawberry slices and Chantilly cream.", 30, fruit, list(fStrawberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Tropical Mango Passion Cake", "8-inch", 46.99, "Mango mousse and passionfruit curd between layers of coconut sponge — a taste of the tropics.", 25, fruit, list(fMango, fPassion, fCoconut), list(aGluten, aDairy, aEggs));
        cake("Mixed Berry Summer Cake", "8-inch", 44.99, "Blueberry, raspberry and strawberry compote layered inside a light vanilla chiffon cake.", 25, fruit, list(fStrawberry, fBlueberry, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Lemon Blueberry Cake", "8-inch", 43.99, "Zesty lemon sponge dotted with fresh blueberries and topped with lemon cream cheese frosting.", 25, fruit, list(fLemon, fBlueberry), list(aGluten, aDairy, aEggs));
        cake("Raspberry Lychee Mousse Cake", "6-inch", 49.99, "Delicate lychee mousse paired with raspberry gel on a thin almond dacquoise base.", 18, fruit, list(fRaspberry), list(aGluten, aDairy, aEggs, aNuts));
        cake("Peach Melba Cream Cake", "8-inch", 45.99, "Poached white peaches and raspberry sauce between layers of vanilla cream sponge.", 20, fruit, list(fPeach, fRaspberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Apple Cinnamon Harvest Cake", "8-inch", 41.99, "Cinnamon-spiced apple compote folded through a warm spiced sponge with caramel glaze.", 22, fruit, list(fCaramel), list(aGluten, aDairy, aEggs, aWheat));
        cake("Orange Cardamom Zest Cake", "8-inch", 43.99, "Fragrant cardamom and orange zest cake with orange cream cheese frosting.", 20, fruit, list(fOrange), list(aGluten, aDairy, aEggs));
        cake("Cherry Blossom Vanilla Cake", "6-inch", 47.99, "Maraschino cherry cream nestled inside a soft vanilla sponge with cherry blossom decoration.", 18, fruit, list(fCherry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Kiwi Lime Coconut Cake", "8-inch", 44.99, "Lime curd and kiwi slices layered inside a moist coconut sponge.", 20, fruit, list(fLemon, fCoconut), list(aGluten, aDairy, aEggs));
        cake("Pineapple Upside Down Cake", "8-inch", 39.99, "Caramelised pineapple rings on a buttery brown sugar sponge — a classic retro treat.", 28, fruit, list(fCaramel), list(aGluten, aDairy, aEggs));
        cake("Blackberry Lavender Cake", "6-inch", 48.99, "Honey-lavender cream with fresh blackberries on a light lemon sponge.", 18, fruit, list(fLemon, fBlueberry), list(aGluten, aDairy, aEggs));
        cake("Watermelon Mint Cake", "10-inch", 52.99, "Refreshing watermelon jam with fresh mint cream on a light sponge — perfect for summer.", 15, fruit, list(fMint), list(aGluten, aDairy, aEggs));
        cake("Passionfruit Cream Cake", "8-inch", 46.99, "Tangy passionfruit curd layered with vanilla Chantilly cream.", 20, fruit, list(fPassion, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Plum and Almond Crumble Cake", "8-inch", 44.99, "Juicy plum compote over a soft almond frangipane with crumble topping.", 20, fruit, list(fCaramel), list(aGluten, aDairy, aEggs, aNuts));
        cake("Guava Rose Cake", "6-inch", 49.99, "Floral rosewater cream paired with tropical guava filling on a pistachio base.", 16, fruit, list(fPistachio), list(aGluten, aDairy, aEggs, aNuts));
        cake("Dragon Fruit Coconut Cake", "8-inch", 51.99, "Vibrant pink dragon fruit gel swirled through coconut cream on a light sponge.", 18, fruit, list(fCoconut), list(aGluten, aDairy, aEggs));
        cake("Strawberry Balsamic Cake", "6-inch", 47.99, "Macerated strawberries with aged balsamic glaze on a vanilla mascarpone cream cake.", 18, fruit, list(fStrawberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Mixed Citrus Poppy Seed Cake", "8-inch", 42.99, "Lemon, lime and orange zest with poppy seeds in a moist loaf-style celebration cake.", 22, fruit, list(fLemon, fOrange), list(aGluten, aDairy, aEggs));
        cake("Mango Coconut Layer Cake", "8-inch", 48.99, "Fresh mango mousse layered with toasted coconut cream inside a coconut chiffon sponge.", 20, fruit, list(fMango, fCoconut), list(aGluten, aDairy, aEggs));

        // ── Classic Cakes (20) ────────────────────────────────────────────
        cake("Victoria Sponge", "8-inch", 36.99, "The quintessential British classic — buttery sponge sandwiched with strawberry jam and clotted cream.", 35, classic, list(fStrawberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Red Velvet Classic", "8-inch", 42.99, "Iconic red velvet cake with velvety crumb and tangy cream cheese frosting.", 30, classic, list(fRedVelvet), list(aGluten, aDairy, aEggs));
        cake("Carrot Walnut Cake", "8-inch", 40.99, "Moist spiced carrot cake studded with walnuts, topped with classic cream cheese frosting.", 28, classic, list(fVanilla), list(aGluten, aDairy, aEggs, aNuts));
        cake("Vanilla Bean Layer Cake", "10-inch", 52.99, "Four layers of vanilla bean sponge with silky vanilla Swiss meringue buttercream.", 20, classic, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Coconut Layer Cake", "8-inch", 44.99, "Tender coconut sponge with coconut cream between each layer and toasted coconut on top.", 22, classic, list(fCoconut, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Lemon Drizzle Cake", "6-inch", 34.99, "Tangy lemon drizzle loaf cake with crunchy sugar crust and lemon glaze.", 35, classic, list(fLemon), list(aGluten, aDairy, aEggs));
        cake("Hummingbird Cake", "10-inch", 54.99, "Banana, pineapple and pecan cake with cream cheese frosting — a Southern classic.", 18, classic, list(fCoconut, fVanilla), list(aGluten, aDairy, aEggs, aNuts));
        cake("Black Forest Gateau", "10-inch", 58.99, "Kirsch-soaked chocolate sponge, whipped cream and cherries — a timeless German classic.", 15, classic, list(fChocolate, fCherry), list(aGluten, aDairy, aEggs));
        cake("Opera Cake", "8-inch", 62.99, "Alternating layers of almond joconde, coffee buttercream and dark chocolate ganache.", 12, classic, list(fMocha, fChocolate), list(aGluten, aDairy, aEggs, aNuts));
        cake("Baked Alaska", "8-inch", 56.99, "Ice cream encased in soft sponge, wrapped in toasted meringue — a spectacular showpiece.", 15, classic, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Battenberg Cake", "6-inch", 38.99, "Chequerboard marzipan-wrapped sponge in pink and yellow — a classic British teatime favourite.", 20, classic, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs, aNuts));
        cake("Angel Food Cake", "10-inch", 38.99, "Cloud-light angel food cake made with whipped egg whites — virtually fat free.", 25, classic, list(fVanilla), list(aGluten, aEggs));
        cake("Pound Cake Delight", "8-inch", 34.99, "Rich buttery pound cake with a golden crust and dense, moist crumb.", 30, classic, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Swiss Roll Classic", "8-inch", 32.99, "Light sponge rolled with strawberry jam and cream — a beloved classic in every bite.", 30, classic, list(fStrawberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Banana Bread Cake", "8-inch", 37.99, "Moist banana loaf cake with walnuts and a brown sugar glaze.", 28, classic, list(fCaramel), list(aGluten, aDairy, aEggs, aNuts));
        cake("Boston Cream Pie", "8-inch", 44.99, "Vanilla custard filled sponge topped with chocolate ganache glaze.", 20, classic, list(fVanilla, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Madeira Cake", "6-inch", 32.99, "Traditional English Madeira cake — buttery, golden and perfect with afternoon tea.", 30, classic, list(fVanilla, fLemon), list(aGluten, aDairy, aEggs));
        cake("Genoise Sponge Cake", "8-inch", 36.99, "Classic Italian genoise filled with diplomat cream and seasonal berries.", 25, classic, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Dobos Torte", "8-inch", 64.99, "Hungarian masterpiece — seven thin sponge layers with chocolate buttercream and caramel top.", 12, classic, list(fChocolate, fCaramel), list(aGluten, aDairy, aEggs));
        cake("Chiffon Cake", "10-inch", 40.99, "Tall and airy chiffon cake with a delicate vanilla crumb and light whipped cream topping.", 22, classic, list(fVanilla), list(aGluten, aDairy, aEggs));

        // ── Birthday Cakes (20) ───────────────────────────────────────────
        cake("Rainbow Funfetti Cake", "8-inch", 48.99, "Vanilla sponge packed with rainbow sprinkles, frosted with colourful buttercream swirls.", 30, birthday, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Unicorn Dream Cake", "8-inch", 54.99, "Pastel-swirled vanilla cake decorated with an edible unicorn horn, flowers and gold stars.", 25, birthday, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Galaxy Space Cake", "8-inch", 52.99, "Dark purple and blue marbled sponge with galaxy buttercream and edible star dust.", 22, birthday, list(fBlueberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Smash Cake", "4-inch", 22.99, "Mini single-tier celebration cake perfect for first birthday smashes — vanilla or chocolate.", 40, birthday, list(fVanilla, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Confetti Celebration Cake", "10-inch", 58.99, "Giant celebration cake with confetti sponge layers, buttercream rosettes and balloon toppers.", 15, birthday, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Mermaid Theme Cake", "8-inch", 54.99, "Ocean-blue layers with mermaid tail topper, pearl sprinkles and seafoam buttercream.", 18, birthday, list(fVanilla, fBlueberry), list(aGluten, aDairy, aEggs));
        cake("Dinosaur Party Cake", "8-inch", 52.99, "Jungle green sponge decorated with edible dinosaur figurines and chocolate rocks.", 18, birthday, list(fChocolate, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Princess Castle Cake", "10-inch", 68.99, "Tiered pink cake sculpted into a fairy-tale castle with fondant turrets and sugar roses.", 10, birthday, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Superhero Layer Cake", "8-inch", 52.99, "Bold primary colour layers inside with superhero logo topper and comic-book buttercream border.", 20, birthday, list(fChocolate, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Number Birthday Cake", "custom", 45.99, "Sculpted in your chosen number — choose any flavour and colour scheme.", 25, birthday, list(fVanilla, fChocolate, fStrawberry), list(aGluten, aDairy, aEggs));
        cake("Golden Birthday Cake", "10-inch", 64.99, "Champagne vanilla sponge with gold leaf accents, drip ganache and gold macarons.", 12, birthday, list(fVanilla, fCaramel), list(aGluten, aDairy, aEggs, aNuts));
        cake("Neon Glow Party Cake", "8-inch", 54.99, "UV-reactive neon buttercream on dark chocolate sponge — glows under black light.", 15, birthday, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Floral Garden Birthday Cake", "8-inch", 56.99, "Pastel sponge layers covered in hand-crafted sugar flowers and edible butterflies.", 15, birthday, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Safari Animal Cake", "8-inch", 52.99, "Neutral-toned sponge decorated with fondant jungle animals and edible grass.", 18, birthday, list(fVanilla, fCaramel), list(aGluten, aDairy, aEggs));
        cake("Emoji Birthday Cake", "8-inch", 48.99, "Yellow fondant cake covered in your favourite emoji expressions — great for teens.", 22, birthday, list(fVanilla, fLemon), list(aGluten, aDairy, aEggs));
        cake("Sports Theme Cake", "10-inch", 54.99, "Personalised with your favourite sport — football pitch, basketball court, or tennis court.", 15, birthday, list(fVanilla, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Balloon Number Cake", "8-inch", 50.99, "Fondant balloons in birthday colours surrounding the guest of honour's age.", 20, birthday, list(fVanilla, fStrawberry), list(aGluten, aDairy, aEggs));
        cake("Tiered Celebration Cake", "tiered", 89.99, "Two-tiered celebration cake with fresh flowers, drip effect and personalised message.", 10, birthday, list(fVanilla, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Surprise Inside Cake", "8-inch", 54.99, "Plain exterior hides a colourful hidden message or number inside — cut to reveal the surprise.", 20, birthday, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Glitter Bomb Cake", "8-inch", 52.99, "White chocolate drip cake covered in edible glitter and gold sequin sprinkles.", 18, birthday, list(fVanilla, fWhiteChoc(fVanilla)), list(aGluten, aDairy, aEggs));

        // ── Cheesecakes (20) ──────────────────────────────────────────────
        cake("New York Classic Cheesecake", "8-inch", 44.99, "Dense and creamy New York style baked cheesecake on a buttery digestive biscuit base.", 30, cheesecake, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Strawberry Swirl Cheesecake", "8-inch", 46.99, "Creamy vanilla cheesecake with ribbons of fresh strawberry puree swirled throughout.", 25, cheesecake, list(fStrawberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Blueberry Topping Cheesecake", "8-inch", 46.99, "Classic baked cheesecake crowned with warm blueberry compote topping.", 25, cheesecake, list(fBlueberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Oreo Cookie Cheesecake", "8-inch", 49.99, "Oreo crust and Oreo pieces folded into a vanilla cream cheese filling.", 22, cheesecake, list(fOreo, fVanilla), list(aGluten, aDairy, aEggs, aSoy));
        cake("Lemon Cheesecake", "8-inch", 44.99, "Refreshing lemon curd cheesecake with a light, zesty filling on a graham cracker base.", 25, cheesecake, list(fLemon), list(aGluten, aDairy, aEggs));
        cake("Salted Caramel Cheesecake", "8-inch", 49.99, "Caramel swirled through cream cheese filling with a salted caramel drizzle on top.", 22, cheesecake, list(fCaramel), list(aGluten, aDairy, aEggs));
        cake("Raspberry White Chocolate Cheesecake", "8-inch", 52.99, "White chocolate and raspberry swirled no-bake cheesecake on a vanilla biscuit base.", 18, cheesecake, list(fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Mango Cheesecake", "8-inch", 47.99, "Tropical mango puree folded into a light cream cheese mousse on a coconut biscuit base.", 20, cheesecake, list(fMango, fCoconut), list(aGluten, aDairy, aEggs));
        cake("No-Bake Vanilla Cheesecake", "8-inch", 42.99, "Effortlessly creamy no-bake vanilla cheesecake — smooth, light and utterly delicious.", 30, cheesecake, list(fVanilla), list(aGluten, aDairy));
        cake("Tiramisu Cheesecake", "8-inch", 52.99, "Espresso-soaked lady fingers with mascarpone cheesecake filling dusted with cocoa.", 18, cheesecake, list(fMocha, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Basque Burnt Cheesecake", "8-inch", 48.99, "Crustless Basque-style cheesecake with a characteristic caramelised top and creamy centre.", 20, cheesecake, list(fCaramel, fVanilla), list(aDairy, aEggs));
        cake("Matcha Cheesecake", "6-inch", 49.99, "Japanese-inspired matcha green tea cheesecake with a white chocolate drizzle.", 18, cheesecake, list(fMatcha, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Pecan Praline Cheesecake", "8-inch", 54.99, "Buttery pecan praline layered inside a brown sugar cheesecake with caramel drizzle.", 15, cheesecake, list(fCaramel, fVanilla), list(aGluten, aDairy, aEggs, aNuts));
        cake("Nutella Swirl Cheesecake", "8-inch", 51.99, "Hazelnut Nutella swirled generously through a light vanilla cream cheese filling.", 18, cheesecake, list(fHazelnut, fChocolate), list(aGluten, aDairy, aEggs, aNuts));
        cake("Peanut Butter Cheesecake", "8-inch", 49.99, "Smooth peanut butter cheesecake on a chocolate cookie crust with chocolate ganache top.", 20, cheesecake, list(fChocolate), list(aGluten, aDairy, aEggs, aNuts));
        cake("Coconut Lime Cheesecake", "8-inch", 47.99, "Zesty lime curd swirled into coconut cream cheese on a toasted coconut biscuit base.", 20, cheesecake, list(fCoconut, fLemon), list(aGluten, aDairy, aEggs));
        cake("Triple Berry Cheesecake", "10-inch", 56.99, "Strawberry, blueberry and raspberry gel layered over a classic baked cream cheese filling.", 15, cheesecake, list(fStrawberry, fBlueberry, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Dulce de Leche Cheesecake", "8-inch", 51.99, "Rich South American dulce de leche swirled through a buttery baked cheesecake.", 18, cheesecake, list(fCaramel), list(aGluten, aDairy, aEggs));
        cake("Pistachio Cheesecake", "6-inch", 54.99, "Ground pistachio cheesecake on a pistachio shortbread crust with rosewater cream.", 15, cheesecake, list(fPistachio), list(aGluten, aDairy, aEggs, aNuts));
        cake("Cherry Garcia Cheesecake", "8-inch", 49.99, "Dark cherry compote and chocolate chunks folded into a classic cream cheese filling.", 20, cheesecake, list(fCherry, fChocolate), list(aGluten, aDairy, aEggs));

        // ── Fresh Cakes (20) ──────────────────────────────────────────────
        cake("Elderflower Cream Cake", "8-inch", 44.99, "Delicate elderflower syrup soaked sponge with lightly whipped elderflower cream.", 22, fresh, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Lavender Honey Cake", "6-inch", 46.99, "Floral lavender sponge drizzled with wildflower honey and soft cream filling.", 18, fresh, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Garden Rose Petal Cake", "8-inch", 48.99, "Rosewater-infused sponge layered with rose petal jam and mascarpone cream.", 20, fresh, list(fRaspberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Fresh Mint and Lime Cake", "6-inch", 43.99, "Bright lime zest and fresh mint leaves in a light sponge with cream cheese frosting.", 20, fresh, list(fMint, fLemon), list(aGluten, aDairy, aEggs));
        cake("Rosewater Pistachio Cake", "8-inch", 52.99, "Middle Eastern inspired rosewater sponge with crushed pistachio cream and edible rose petals.", 15, fresh, list(fPistachio), list(aGluten, aDairy, aEggs, aNuts));
        cake("Fresh Peach and Cream Cake", "8-inch", 44.99, "Vanilla sponge layered with sliced fresh peaches and lightly sweetened whipped cream.", 20, fresh, list(fPeach, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Green Tea Matcha Cake", "8-inch", 49.99, "Earthy matcha sponge with white chocolate cream and red bean paste filling.", 18, fresh, list(fMatcha), list(aGluten, aDairy, aEggs));
        cake("Jasmine Cream Cake", "6-inch", 47.99, "Jasmine tea infused sponge with silky cream and lychee jelly insert.", 18, fresh, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Yuzu Citrus Cream Cake", "6-inch", 52.99, "Japanese yuzu curd swirled into vanilla chantilly cream on a delicate sponge.", 16, fresh, list(fLemon, fOrange), list(aGluten, aDairy, aEggs));
        cake("Chamomile Honey Cake", "6-inch", 46.99, "Chamomile tea-soaked sponge with honey mascarpone cream and dried chamomile flowers.", 18, fresh, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Bergamot Earl Grey Cake", "8-inch", 48.99, "Earl Grey tea-infused sponge with bergamot cream and lemon curd.", 18, fresh, list(fLemon), list(aGluten, aDairy, aEggs));
        cake("Fresh Coconut Cream Cake", "8-inch", 46.99, "Freshly grated coconut layered through light coconut cream on a vanilla chiffon.", 20, fresh, list(fCoconut, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Hibiscus Berry Cake", "8-inch", 47.99, "Vibrant hibiscus syrup-soaked sponge with mixed berry cream and dried hibiscus décor.", 18, fresh, list(fStrawberry, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Fresh Lychee Cream Cake", "6-inch", 49.99, "Soft lychee jelly and whipped cream nestled between layers of vanilla sponge.", 18, fresh, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Morning Dew Strawberry Cake", "8-inch", 44.99, "Freshly picked strawberries and light morning-dew cream on airy vanilla sponge.", 22, fresh, list(fStrawberry, fVanilla), list(aGluten, aDairy, aEggs));
        cake("Pandan Coconut Cake", "8-inch", 47.99, "South-East Asian pandan leaf-infused sponge with coconut cream and toasted coconut.", 18, fresh, list(fCoconut), list(aGluten, aDairy, aEggs));
        cake("Fresh Basil Lemon Cake", "6-inch", 44.99, "Unexpected fresh basil and lemon zest cake with ricotta cream filling.", 18, fresh, list(fLemon), list(aGluten, aDairy, aEggs));
        cake("Cucumber Yogurt Cake", "6-inch", 41.99, "Light yogurt cake with cucumber cream and dill — surprisingly refreshing.", 20, fresh, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Fresh Fig and Ricotta Cake", "8-inch", 49.99, "Honey roasted figs on a soft ricotta cream sponge with walnut crumble.", 16, fresh, list(fCaramel), list(aGluten, aDairy, aEggs, aNuts));
        cake("Passion Mango Cream Cake", "8-inch", 48.99, "Passionfruit and mango cream layered inside a coconut chiffon sponge.", 20, fresh, list(fPassion, fMango, fCoconut), list(aGluten, aDairy, aEggs));

        // ── Premium Cakes (20) ────────────────────────────────────────────
        cake("Gold Leaf Champagne Cake", "10-inch", 129.99, "Champagne-soaked sponge with 24k edible gold leaf, elderflower cream and gold macarons.", 8, premium, list(fVanilla), list(aGluten, aDairy, aEggs, aNuts));
        cake("Black Truffle Chocolate Cake", "8-inch", 149.99, "Dark chocolate mousse infused with rare black truffle shavings on a rich brownie base.", 6, premium, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Saffron Pistachio Luxury Cake", "8-inch", 119.99, "Persian saffron cream with crushed pistachios on a rosewater sponge — pure indulgence.", 8, premium, list(fPistachio), list(aGluten, aDairy, aEggs, aNuts));
        cake("Diamond Dust Vanilla Cake", "8-inch", 109.99, "Velvet vanilla sponge coated in edible diamond dust with white chocolate spheres.", 10, premium, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Royal Walnut Cognac Cake", "10-inch", 134.99, "Cognac-soaked walnut sponge with French buttercream and candied walnut clusters.", 6, premium, list(fCaramel), list(aGluten, aDairy, aEggs, aNuts));
        cake("Velvet Crown Cake", "10-inch", 124.99, "Deep burgundy red velvet beneath a crown of edible gems, spun sugar and gold leaf.", 8, premium, list(fRedVelvet), list(aGluten, aDairy, aEggs));
        cake("Pearl White Luxury Cake", "10-inch", 119.99, "White chocolate and vanilla creation with handmade sugar pearls and silk-white fondant.", 8, premium, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Midnight Black Luxury Cake", "10-inch", 124.99, "Dramatic all-black activated charcoal sponge with dark chocolate ganache and silver leaf.", 8, premium, list(fChocolate), list(aGluten, aDairy, aEggs));
        cake("Ruby Red Luxury Cake", "8-inch", 114.99, "Raspberry and ruby chocolate mousse inside a crimson-glazed mirror cake.", 10, premium, list(fRaspberry, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Imperial Matcha Luxury Cake", "8-inch", 114.99, "Ceremonial grade matcha sponge with gold-flecked white chocolate and azuki bean cream.", 10, premium, list(fMatcha), list(aGluten, aDairy, aEggs));
        cake("Azure Butterfly Pea Cake", "8-inch", 109.99, "Blue butterfly pea flower sponge that changes colour — colour-changing cream filling.", 10, premium, list(fVanilla, fLemon), list(aGluten, aDairy, aEggs));
        cake("Sakura Blossom Cake", "8-inch", 119.99, "Cherry blossom Japanese-inspired cake with sakura cream, yuzu curd and mochi pieces.", 8, premium, list(fCherry, fLemon), list(aGluten, aDairy, aEggs));
        cake("Himalayan Salt Caramel Cake", "8-inch", 104.99, "Handcrafted Himalayan pink salt caramel between layers of dark chocolate sponge.", 12, premium, list(fCaramel, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Gold Rose Celebration Cake", "10-inch", 139.99, "Hand-painted edible gold roses over a four-tiered vanilla and raspberry celebration cake.", 6, premium, list(fVanilla, fRaspberry), list(aGluten, aDairy, aEggs));
        cake("Tahitian Vanilla Bean Cake", "8-inch", 109.99, "Rare Tahitian vanilla bean cream layered inside a feather-light chiffon with vanilla pods on top.", 10, premium, list(fVanilla), list(aGluten, aDairy, aEggs));
        cake("Pistachio Rose Gold Cake", "8-inch", 119.99, "Rose gold mirrored glaze over pistachio and rosewater mousse — stunning and delicious.", 8, premium, list(fPistachio), list(aGluten, aDairy, aEggs, aNuts));
        cake("Espresso Martini Cake", "8-inch", 114.99, "Kahlúa-soaked chocolate sponge with vodka espresso buttercream and coffee bean décor.", 10, premium, list(fMocha, fChocolate), list(aGluten, aDairy, aEggs));
        cake("Hazelnut Praline Luxury Cake", "8-inch", 124.99, "Paris-Brest inspired hazelnut praline mousse layered inside dark chocolate sponge.", 8, premium, list(fHazelnut, fChocolate), list(aGluten, aDairy, aEggs, aNuts));
        cake("Caramelised Honey Baklava Cake", "8-inch", 114.99, "Honey and walnut baklava layered between cardamom-spiced sponge with orange blossom cream.", 10, premium, list(fCaramel), list(aGluten, aDairy, aEggs, aNuts, aSesame));
        cake("Ultra Premium Seven Layer Cake", "10-inch", 179.99, "Seven distinct flavour layers — chocolate, vanilla, red velvet, matcha, caramel, pistachio and raspberry.", 5, premium, list(fChocolate, fVanilla, fRedVelvet, fMatcha, fCaramel, fPistachio, fRaspberry), list(aGluten, aDairy, aEggs, aNuts));
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private Category cat(String name) {
        Category c = new Category();
        c.setName(name);
        return categoryRepository.save(c);
    }

    private Flavors flavor(String name) {
        Flavors f = new Flavors();
        f.setName(name);
        return flavorsRepository.save(f);
    }

    private Allergens allergen(String name) {
        Allergens a = new Allergens();
        a.setName(name);
        return allergensRepository.save(a);
    }

    private void cake(String name, String size, double price, String desc,
                      int qty, Category category, List<Flavors> flavors, List<Allergens> allergens) {
        Cake c = new Cake();
        c.setName(name);
        c.setSize(size);
        c.setPrice(price);
        c.setDescription(desc);
        c.setQuantity(qty);
        c.setCategory(category);
        c.setFlavors(flavors);
        c.setAllergens(allergens);
        cakeRepository.save(c);
    }

    @SafeVarargs
    private <T> List<T> list(T... items) {
        return java.util.Arrays.asList(items);
    }

    private Flavors fWhiteChoc(Flavors fallback) {
        return fallback;
    }
}
