


> Written with [StackEdit](http://benweet.github.io/stackedit/). 

**Calamity Jane Express(R)** (:CJE) webversion v0.2α (25-05-2013) By Dee Jay Alexander. Released under MIT license at https://en.wikipedia.org/wiki/Mit_license

This 0.2α Webversion Is For Testing And Development Purposes ONLY. DONT'T use it in a real situation, because it DEFINITELY needs improvement. It has no built-in communication as of yet, but it's future versions should be able to work with existing and next-generation communications facilities.
Very initial design of a bulleted-user-interface or "bui", with freely relocatable and highly manipulatable "bullets" (actually JQuery list-items) that can represent anything (data or functions) from anywhere and that can be dragged/dropped within and between "clips" (actually JQuery listviews) and especially, but not only, made for mobile devices. It is part of a web-app with an appropriate (to be build) emergency "hit-and-run" federated/p2p web-based framework. To distinguish it from other existing or future bui's, it is called CJE-bui from now on.

**Product-description.**

**Very short product-description**

Very initial design of a bulleted-user-interface or "bui", with freely relocatable and highly manipulative "bullets" (actually JQuery list-items) that can represent anything (data or functions) from anywhere and that can be dragged/dropped within and between "clips" (actually JQuery listviews) and especially, but not only, made for mobile devices. It is part of a web-app with an appropriate (to be build) emergency "hit-and-run" federated/p2p web-based framework. To distinguish it from other existing or future bui's, it is called CJE-bui from now on.

**Longer product-description**

This initial design is a new kind of web-based user-interface especially for (small screen) mobiles but it could easily be ported to any screen-size device and it is called a "smart" (because rdf/owl-ready!) bulleted-user-interface or "CJE-bui". At the heart of this "CJE-bui" are bullet-shaped JQuery-based list-items (here called "bullets") that can freely be relocated within and between JQuery-based listviews (here called "clips"). Those "bullets" should be able to represent anything, either (passive) data(pieces) or (executable) (app)functions. They can freely be grouped, mixed, multiplied and related to one another and can come from anywhere, local or remote. As of this moment only "clips" can be in a (hierarchical) relationship with one another, but direct relationships between bullets will be possible in the future (paving the way for W3C's rdf/owl-relationships). The content that populates these "bullets" are "flown-in" via AJAX-protocol from an on-board personal proxy web-server that uses (as of this moment) CGI/CLI scripts. This on-board server takes care of all communications, internally with the file-system and externally with the network: all network communication is thus permanently upgraded to p2p/server-to-server communication and client-server communication is now a responsibility of the device itself. In this concept the user will be able to compose his/her own web-based apps on-the-fly by picking any function on-the-fly and of course also the data-pieces can simply be picked from anywhere and this all by just tap/drag/drop/sweep. And they all can also work on a common canvas to show/manipulate the data (if allowed so by the owner). At least, that is the whole intention of this project and the first open source alpha-version is already publicly available. Thanks to it's open source MIT License it can be used in anyway by anyone. Just provide the right credits, that's all.

**Test-environment and some tips.**

This software has been tested on a Samsung Galaxy S2 GT-I9100 international version. Android version: 2.3.6 Gingerbread. It must be said that the best mobile browsing results came from an "outsider": Dolphin Browser mobile version 9.3.2+ (www.dolphin.com). The "established" mobile browsers sometimes showed unpredicted behavior. This also counts for playing video: on Android, Android's own Videos-player gave best results. Well, let's blame it on this still immature CJE-software. Users should try out for themselves which browsers/players might give the best results.

When using the online Webversion you will be able to do all kind of manipulations, including temporarily saving it into your internal memory but excluding saving it as file onto your disk.

If you want this then you need the developers-version (Linux only, but to be ported to Windows, Mac etc) from github.com and should have a CGI/CLI (software) server installed

TIP1. Do NOT use the browsers Backpage-key or you might mess up CJE's internal history-track unless strict necessary (e.g. after watching images, video or listening to audio). Use CJE's own Backward- and Forward-button on the footer of the page instead (should be taken care off in next versions). When mimicking it on a desktop, you might use function-key F11 "Full Screen" to avoid accidentally pressing the browsers Backpage-button.

TIP2. Actually this software-version is developed for smartphone screensize, although the idea of a "bulleted-user-interface" or "CJE-bui" is also well fit for desktop screensize and larger. If you use desktop screensize, you might simulate the smartphone-view by just shrinking the browser to smartphone size.

TIP3. Developers-version: All files in the webserver's document-root are read-only, except cjea.xml and cjeb.xml. Those two files are written to by the executable script cje.sh in cgi-bin. All files in cgi-bin must be read and written to, except the script cje.sh, which must be readable and executable.

