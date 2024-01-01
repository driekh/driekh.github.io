---
date: '2023-01-08'
lang: nl
title: Soverin/freedom jekyll sites op domeinen zonder webhosting
layout: post
updatedate: '2024-01-01'
---

**UPDATE**: Soverin/Freedom is per 1 januari 2024 gestopt met het hosten van jekyll-sites op domeinen. Deze post is dus helaas niet meer relevant.

Daar is veel over te zeggen, en zowel het besluit als de manier waarop freedom dit communniceerde verdient geen schoonheidsprijs en roept vragen op over freedom. Zie 
[community.freedom.nl/t/de-websitefunctie-op-mijnfreedom-stopt-per-1-januari-2024/4186](https://community.freedom.nl/t/de-websitefunctie-op-mijnfreedom-stopt-per-1-januari-2024/4186) op het community-forum.

Ik host deze site (www.heesk.nl) nog altijd bij freedom, maar ik wil geen 15/mnd betalen voor volledige dynamische webhosting waarvan ik vrijwel niets zal gebruiken. Alternatieven zijn er bijna niet. Voor nu heb ik de jekyll-installatie verhuisd naar github. Github ondersteuning voor Jekyll is gelukkig heel standaard, een kleine aanpassing in yaml config was genoeg om het aan de praat te krijgen. Github doet iets slims met CNAME's voor het hosten van pagina's op een github.io subdomein. Er zitten wel haken en ogen aan. Zo is github eigendom van microsoft en zitten er in de voorwaarden wat zaken waar je vraagtekens bij kunt zetten. Daarover later misschien meer, en wie weet vind ik uitendelijk een betere oplossing. Voor nu werkt het, en is de site niet uit de lucht gegaan op 1 januari 2024 (vandaag :) ...



## Oorspronlijke post:

Als steunlid van het eerste uur heb ik een basisabonnement bij Freedom Internet. Daar kreeg ik een domeinnaam bij, voor provider-onafhankelijke emailadressen - hulde! Bij de domeinnaam zit geen volledige serverhosting waarmee je applicaties kan draaien (php, cgi, ruby), maar wel kan je een statische website er op zetten. Het is behoorlijk compatible met jekyll, al is het onder water iets van soverin zelf. 

Het was een leuk projectje voor de kerstvakantie om dit nu eens verder uit te zoeken. Hier mijn aantekeningen voor wie er wat aan heeft.

(update 11 januari 23: opmerkingen verwerkt van PtrO op het forum)

(update 1 januari 24: einde jekyll-dienst van freedom/soverin)


## Freedom community forum

Vragen over deze jekyll-hosting komen af en toe langs op het gebruikersforum van Freedom. Natuurlijk vooral als er iets mis gaat, dat zie je aan de topictitels - maar deze draadjes gaan vervolgens ook dieper de inhoud in. In het bijzonder gebruiker PtrO heeft hier heel veel nuttig gereverse-engineered:

- [community.freedom.nl/t/jekyll-site-down-en-uploaden-lukt-allebei-niet/2836](https://community.freedom.nl/t/jekyll-site-down-en-uploaden-lukt-allebei-niet/2836)
- [community.freedom.nl/t/mijn-website-doet-het-niet/2358/28](https://community.freedom.nl/t/mijn-website-doet-het-niet/2358/28)
- [community.freedom.nl/t/ssl-certificaat-installeren-op-statische-freedom-homepagina/3168](https://community.freedom.nl/t/ssl-certificaat-installeren-op-statische-freedom-homepagina/3168)


## basis

De Soverin documentatie is heel beknopt (je hebt er niet veel aan : ) maar het is wel het beginpunt:
- [soverin.net/help/docs/site_setup](https://www.soverin.net/help/docs/site_setup/)

De website wordt gegenereerd vanuit de bestanden in de gui. Tip: zet de variabele `site.time` in de footer.  Het lijkt erop dat dat meestal binnen seconden na een save in de editor gebeurt, maar het kan tot vijf minuten duren. Blijkbaar als het druk is. Interessant: ook als je niets saved lijkt de site sowieso elke paar minuten te worden geupdate! Misschien is dat wel on-demand (dwz getriggered door het opvragen) maar dat is net zo lastig uit te vinden als of het lampje in de koelkast brandt als de deur dicht is...


Soverin site-setup is grotendeels jekyll-compatible, vergelijkbaar met de jekyll-hosting op github. Waarschijnlijk is het een jekyll-installatie die geschikt gemaakt is voor multi-users.  

Er is ondersteuning voor:
- [markdown](https://jekyllrb.com/docs/configuration/markdown/), gebruikt de [kramdown](https://kramdown.gettalong.org/) processor
- liquid inclusief [Jekyll-specifieke liquid filters](https://jekyllrb.com/docs/liquid/filters/)
- de functies van de [jekyll-paginate plugin](https://jekyllrb.com/docs/pagination/)
- [Sass/SCSS](https://jekyllrb.com/docs/configuration/sass/)
- de speciale directories _layouts, _posts, _data doen het zoals verwacht. 

### beperkingen

Wat niet beschikbaar is:
- toegang tot een bestandssysteem; up en downloaden kan alleen als zip van de hele site via de gui;
- toegang via een shell; dat betekent dat je geen jekyll plugins kan installeren, geen gems (ook als die alleen layout-info bevatten) en bij fouten geen foutmelding krijgt. Dat maakt debuggen lastig.
- met posts in \_drafts gebeurt niets (logisch, want die worden alleen gegenereert als je jekyll op de commandline met een extra optie start). Als je met drafts wil werken moet je iets met de front matter verzinnen. 
- eigenschappen van het `site.` object - variabelen die standaard in jekyll zitten zoals `site.url`, `site.baseurl`, `site.basepath` - zijn niet beschikbaar. Ook de array `site.tags` is niet beschikbaar. Lijkt een gevolg van het multi-user maken van de jekyll installatie, voor de software zal het site. object misschien onder water wel bestaan maar voor alle gehoste websites. Variabelen gedefinieerd in de config komen gewoon niet door in het site.
- 'tags: foo bar' in de front matter van een post doet niets, 'tag: foo bar' is via `post.tag` wel zichtbaar, maar alleen per pagina. Je kan een array genereren met code die door alle pagina's loopt en post.tag verzamelt, maar arrays in liquid verdienen de schoonheidsprijs niet) 


### CSP

Wat echt vervelend is (al is het wel begrijpelijk vanuit security) is dat er een hele strenge Content Security Policy (CSP) draait. Dat betekent dat browsers errors geven op resources die je vanaf een ander domein inlaadt. Voor statische resources valt het nog wel mee, plaatjes van elders geven warnings op de console maar laden wel. Maar externe API's aanroepen in javascript geeft snel een block. Het duurde een tijd voor ik dit doorhad. 
Ik snap de redenen wel - het gevaar van cross-platform scripting aanvallen is groot - maar een dynamische flickr-galerie bijvoorbeeld draait niet out of the box (en ik heb de flickr API nog niet werkend gekregen), net als statcounter stats. Het is jammer dat de soverin CSP geen whitelist gebruikt.


## tips

- Als je je site simpel en snel wil houden, neem [simplecss](https://simplecss.org) - 4kb aan css die standaard semantische opmaak netjes opmaakt voor mobiel en desktop.
- zet een `404.md` in de root: markdown opmaak voor custom 404 foutmelding.
- als je het [bootstrap](https://getbootstrap.com) (mobile-first responsive framework) wil gebruiken, gebruik het template (zie onder)
- kramdown kan automatisch inhoudsopgaves genereren met de :toc optie; let wel op dat dit alleen werkt als je hier een list voor zet, zie [seanbuscay.com/blog/jekyll-toc-markdown](http://www.seanbuscay.com/blog/jekyll-toc-markdown/). Ook heb ik het nog niet werkend gekregen met geneste layout. Hmmm.
- [Jekyll Tutorial](https://jekyllrb.com/docs/step-by-step/)
- [Liquid docs](https://liquidjs.com/) - lijkt zo goed als volledig door soverin geimplementeerd
- [Youtube tutorial](https://www.youtube.com/watch?v=gsYqPL9EFwQ&list=PLLAZ4kZ9dFpOPV5C5Ay0pHaa0RJFhcmcB)
- [cloudcannon introduction-to-jekyll-layouts](https://cloudcannon.com/community/learn/jekyll-tutorial/introduction-to-jekyll-layouts/)
- [sociale media iconen als svg includes](https://learn.cloudcannon.com/jekyll/svg-icons/)
- Zonder plugins kan best veel, zie 
[jekyllcodex.org/without-plugins](https://jekyllcodex.org/without-plugins/) - breadcrumbs, atom feed, image gallery en meer. NB sommige includes werken niet meteen, atom en sitemap bijvoorbeeld; kijk dan of er liquid-variabelen in voorkomen die soverin niet heeft zoals site.url, er zit dan niets anders op dan die in de include zelf op te nemen.
- Jekyll themes op 
[jekyll-themes.com](https://jekyll-themes.com/categories/) - themes die geen .rb plugins bevatten zijn te gebruiken. Je moet een thema uitpakken en de bestanden in de relevante directories zetten, overerving via themes werkt niet.



## config

[mijn.freedom.nl/sites](https://mijn.freedom.nl/sites/) - Domeinen > domein > Website

Er zijn 3 standaard templates: 
- **leeg**: configureer `_config.yml`, zet iets in `index.md` en voila, de site draait.
- **bootstrap**: een default jekyll implementatie van het bootstrap framework om vervolgens aan te passen. Kan handig zijn om dit te gebruiken ipv standaard bootstrap, omdat de CSP-beperkingen van soverin (zie boven) dan niet het laden van externe resources in de weg zitten.
- **link**: om een serverside redirect te configureren, zet de volledige url in in `index.link`

Configuratie van een site gaat via een configbestand in de root. Dat kan verschillende namen hebben, op soverin werken in elk geval deze:
- `_yaml.cfg`
- `_config.yml`
- `_config.yaml`

Ik heb niet getest wat er gebeurt als meerdere configbestanden naast elkaar bestaan; ik zou zeggen, voorkom problemen en kies het bestand dat meekomt met je template.

## meerdere jekyll-sites

Je kan meerdere jekyll-sites tegelijk draaien. Dat kan in elk geval met aparte hostnames, met een subdomein voor elke site. Volgens de soverin-docs zou het ook kunnen met baseurls op dezelfde hostname, maar dat heb ik niet werkend gekregen.

Subdomein voorbeeld:

- kies voor de zekerheid, in elk geval als je begint, een subdomein dat begint met **ww** - het lijkt er op dat soms anders iets fout gaat met het automatisch aanvragen en instellen van een letsencrypt ssl cert op het nieuwe subdomein. Voorbeeld: **wwtest** op domein **example.net**.
- in principe zou het met elk subdomein moeten kunnen. Posts op het forum uit  april 22 vermoeden een bug waardoor ssl soms niet goed gaat met subdomeinen die niet met ww beginnen. Kan goed zijn dat die bug inmiddels is opgelost?
- voeg in Domeinen > domein > DNS instellingen een CNAME toe:

    Naam: wwtest
    type: CNAME
    waarde: @

- zet in _config.yml (of _yaml.cfg of _config.yaml):

    url: "wwtest.example.net"
    host: wwtest.example.net

Na plm 5 minuten zou de site up moeten zijn onder https.
