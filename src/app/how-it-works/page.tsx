import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { hsvaToRgba, rgbaToHexa } from "@/lib/colors";

const HowItWorksPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-3 desktop:p-4 shadow-lg">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl desktop:text-2xl font-medium tracking-tighter text-indigo-600">
                        Generator palet barw
                    </Link>
                    <Link href="/how-it-works" className="text-lg underline desktop:text-xl py-2 px-3 cursor-pointer">
                        Jak to działa?
                    </Link>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto p-6 sm:p-10">
                <article className="prose prose-indigo prose-sm max-w-none">

                    <p className="lead">
                        Witamy w przewodniku objaśniającym kluczowe koncepcje z zakresu teorii kolorów oraz mechanizmy działania generatora. Celem tego dokumentu jest systematyczne wyjaśnienie terminologii i zasad, na których opiera się aplikacja.
                    </p>

                    <h2>Koło Barw jako Fundament Teorii</h2>

                    <div className="not-prose my-6">
                        <Image
                            src="/images/ColorWheel.png"
                            alt="Zrzut ekranu pokazujący wybór harmonii kolorów w generatorze palet"
                            width={382}
                            height={381}
                            className="rounded-2xl w-64 shadow-md border border-gray-200"
                        />
                    </div>

                    <p>
                        <strong>Koło barw</strong> jest fundamentalnym narzędziem wizualizującym relacje między kolorami. Reprezentuje ono spektrum barw w formie okręgu, co ułatwia identyfikację i tworzenie harmonijnych zestawień.
                    </p>
                    <ul>
                        <li><strong>Barwy Podstawowe:</strong> W modelu addytywnym (dla ekranów) są to Czerwony (Red), Zielony (Green) i Niebieski (Blue) – RGB.</li>
                        <li><strong>Barwy Pochodne (Drugorzędowe):</strong> Powstają przez zmieszanie dwóch barw podstawowych (np. Czerwony + Zielony = Żółty).</li>
                        <li><strong>Barwa (Hue):</strong> Jest to czysty kolor, definiowany przez jego pozycję na kole barw, wyrażoną w stopniach (od 0° do 360°).</li>
                    </ul>

                    <p>
                        Generator wykorzystuje te zależności do obliczania schematów kolorystycznych.
                    </p>

                    <hr />

                    <h2>Harmonie Kolorystyczne</h2>

                    <div className="not-prose my-6">
                        <Image
                            src="/images/ColorsHarmonies.png"
                            alt="Zrzut ekranu pokazujący wybór harmonii kolorów w generatorze palet"
                            width={646}
                            height={287}
                            className="rounded-2xl w-96 shadow-md border border-gray-200"
                        />
                    </div>

                    <p>
                        Harmonie kolorystyczne to sprawdzone metody dobierania barw z koła w sposób, który jest estetycznie spójny i przyjemny wizualnie. Generator pozwala na tworzenie palet w oparciu o następujące schematy:
                    </p>
                    <ul>
                        <li>
                            <strong>Monochromatyczna:</strong> Paleta bazująca na jednej barwie (Hue), ale wykorzystująca jej różne odcienie, nasycenia i jasności. Gwarantuje spójność i elegancję.
                        </li>
                        <li>
                            <strong>Analogiczna:</strong> Wykorzystuje kolory sąsiadujące ze sobą na kole barw. Rezultatem jest spokojna i harmonijna kompozycja.
                        </li>
                        <li>
                            <strong>Dopełniająca (Komplementarna):</strong> Składa się z kolorów leżących dokładnie naprzeciwko siebie na kole. Generuje to maksymalny kontrast i dynamiczny efekt wizualny.
                        </li>
                        <li>
                            <strong>Rozdzielnie Dopełniająca:</strong> Schemat podobny do komplementarnego, jednak zamiast koloru dopełniającego, wykorzystuje dwa kolory przylegające do niego. Zapewnia wysoki kontrast przy mniejszym napięciu wizualnym.
                        </li>
                        <li>
                            <strong>Triadyczna:</strong> Wykorzystuje trzy kolory równomiernie rozmieszczone na kole barw (tworzące trójkąt równoboczny). Paleta jest zrównoważona i dynamiczna.
                        </li>
                    </ul>

                    <hr />

                    <h2>Zasada 60-30-10: Równoważenie Palety</h2>

                    <div className="not-prose my-6">
                        <Image
                            src="/images/60-30-10.png"
                            alt="Zrzut ekranu pokazujący wybór harmonii kolorów w generatorze palet"
                            width={748}
                            height={513}
                            className="rounded-2xl w-96 shadow-md border border-gray-200"
                        />
                    </div>

                    <p>
                        Wygenerowanie palety to pierwszy krok. Kluczowe jest proporcjonalne zastosowanie wybranych kolorów w projekcie. <strong>Zasada 60-30-10</strong> to sprawdzona reguła projektowa, która ułatwia zrównoważenie kompozycji:
                    </p>
                    <div className="grid grid-cols-3 gap-2 not-prose">
                        <div className="p-3 bg-gray-100 rounded-2xl border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 m-0">60%</h3>
                            <p className="text-gray-700 mt-1"><strong>Kolor dominujący (główny)</strong>. Stanowi tło i największe powierzchnie projektu, nadając mu ogólny charakter.</p>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-2xl border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 m-0">30%</h3>
                            <p className="text-gray-700 mt-1"><strong>Kolor drugorzędny (uzupełniający)</strong>. Używany do wyróżnienia istotnych elementów, np. nagłówków, paneli czy drugorzędnych przycisków.</p>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-2xl border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 m-0">10%</h3>
                            <p className="text-gray-700 mt-1"><strong>Kolor akcentujący</strong>. Najbardziej wyrazisty, zarezerwowany dla kluczowych interakcji (np. CTA) lub małych detali graficznych.</p>
                        </div>
                    </div>
                    <p className="mt-4">
                        Generator domyślnie porządkuje wygenerowane barwy w sposób ułatwiający implementację tej zasady, co można zaobserwować w sekcji wizualizacji.
                    </p>

                    <hr />

                    <h2>Formaty (Modele) Kolorów</h2>

                    <div className="not-prose my-6">
                        <Image
                            src="/images/ColorFormats.png"
                            alt="Zrzut ekranu pokazujący wybór harmonii kolorów w generatorze palet"
                            width={775}
                            height={235}
                            className="rounded-2xl w-[460px] shadow-md border border-gray-200"
                        />
                    </div>

                    <p>
                        W celu cyfrowej reprezentacji barw, stosuje się różne modele matematyczne. Generator umożliwia eksport wartości w kilku standardowych formatach:
                    </p>
                    <ul>
                        <li>
                            <strong>HEX (Szesnastkowy):</strong> Najpopularniejszy format w projektowaniu webowym. Jest to notacja skrótowa dla modelu RGB, np. <code>#FFFFFF</code> (biel).
                        </li>
                        <li>
                            <strong>RGB (Red, Green, Blue):</strong> Model addytywny, przeznaczony dla urządzeń emitujących światło (monitory). Definiuje kolor przez natężenie trzech składowych (0-255).
                        </li>
                        <li>
                            <strong>HSL (Hue, Saturation, Lightness):</strong> Model bardziej intuicyjny dla percepcji ludzkiej.
                            <ul>
                                <li><strong>H (Barwa):</strong> Pozycja na kole barw (0-360°).</li>
                                <li><strong>S (Nasycenie):</strong> Intensywność koloru (0-100%).</li>
                                <li><strong>L (Jasność):</strong> Definiuje jasność (0% = czarny, 50% = pełny kolor, 100% = biały).</li>
                            </ul>
                        </li>
                        <li>
                            <strong>HSV (Hue, Saturation, Value):</strong> Model zbliżony do HSL, powszechnie stosowany w narzędziach typu "color picker" (jak w tym generatorze).
                            <ul>
                                <li><strong>H i S:</strong> Analogicznie do HSL.</li>
                                <li><strong>V (Wartość):</strong> Definiuje "czystość" koloru (0% = czarny, 100% = kolor o pełnym nasyceniu i jasności).</li>
                            </ul>
                        </li>
                        <li>
                            <strong>CMYK (Cyan, Magenta, Yellow, Key):</strong> Model subtraktywny, standard w przemyśle <strong>poligraficznym (druk)</strong>. Symulacja CMYK na ekranie (RGB) jest jedynie przybliżeniem i może odbiegać od finalnego wydruku.
                        </li>
                    </ul>

                    <hr />

                    <h2>Dostępność i Kontrast (WCAG)</h2>

                    <div className="not-prose my-6">
                        <Image
                            src="/images/Contrast.png"
                            alt="Zrzut ekranu pokazujący wybór harmonii kolorów w generatorze palet"
                            width={405}
                            height={158}
                            className="rounded-2xl w-80 shadow-md border border-gray-200"
                        />
                    </div>

                    <p>
                        Estetyka projektu musi iść w parze z jego <strong>dostępnością (Accessibility)</strong>. Kluczowym czynnikiem jest tutaj <strong>kontrast</strong>, czyli różnica w luminancji (jasności) między kolorem tekstu a kolorem tła.
                    </p>
                    <p>
                        Wytyczne <strong>WCAG (Web Content Accessibility Guidelines)</strong> to międzynarodowy standard definiujący, jak tworzyć treści cyfrowe dostępne dla wszystkich, w tym osób z dysfunkcjami wzroku. Standard ten określa minimalne poziomy kontrastu:
                    </p>
                    <ul>
                        <li>
                            <strong>Poziom AAA (Wzmocniony):</strong> Wymaga stosunku kontrastu <strong>7:1</strong> dla normalnego tekstu. Jest to najwyższy, rygorystyczny standard.
                        </li>
                        <li>
                            <strong>Poziom AA (Minimalny):</strong> Wymaga stosunku kontrastu <strong>4.5:1</strong> dla normalnego tekstu. Jest to powszechnie akceptowany standard branżowy zapewniający czytelność.
                        </li>
                        <li>
                            <strong>AA Large (Dla dużego tekstu):</strong> Wymagania są obniżone do <strong>3:1</strong>, ponieważ większy rozmiar fontu (lub jego grubość) naturalnie poprawia czytelność.
                        </li>
                        <li>
                            <strong>Fail (Brak zgodności):</strong> Oznacza, że stosunek kontrastu jest zbyt niski i kombinacja kolorów jest nieczytelna dla znaczącej grupy użytkowników.
                        </li>
                    </ul>
                    <p>
                        Zaleca się, aby wszystkie kluczowe treści tekstowe spełniały co najmniej wymogi poziomu <strong>AA</strong>.
                    </p>
                    <p>
                        Więcej informacji technicznych można znaleźć w oficjalnej dokumentacji: <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">WAI (Web Accessibility Initiative) od W3C</a>.
                    </p>

                    <hr />

                    <Link href="/" className="inline-block px-6 py-2 bg-indigo-600 text-white font-bold rounded-2xl shadow-md hover:bg-indigo-700 transition-colors no-underline">
                        Wróć do Generatora
                    </Link>

                </article>
            </div>
        </div>
    );
};

export default HowItWorksPage;