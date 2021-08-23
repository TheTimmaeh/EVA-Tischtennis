exports.seed = (knex) => {
  return knex('persons').del().then(() => {
    return knex('persons').insert([
      {
        id: 1,
        name: "Anne",
        surname: "Köhler",
        gender: "f",
        birthday: "1982-10-03",
        street: "Brandenburgische Straße",
        streetnumber: "11",
        zipcode: "55430",
        city: "Oberwesel",
        state: "RP",
        country: "DE",
        phone: "06741 23 02 19",
        mail: "AnneKohler@einrot.com",
      },
      {
        id: 2,
        name: "Tobias",
        surname: "Löwe",
        gender: "m",
        birthday: "1978-12-26",
        street: "Albrechtstraße",
        streetnumber: "35",
        zipcode: "94001",
        city: "Passau",
        state: "BY",
        country: "DE",
        phone: "0851 73 53 02",
        mail: "TobiasLowe@superrito.com",
      },
      {
        id: 3,
        name: "Karin",
        surname: "Dietrich",
        gender: "f",
        birthday: "1972-03-19",
        street: "Brandenburgische Straße",
        streetnumber: "72",
        zipcode: "12307",
        city: "Berlin Lichtenrade",
        state: "BE",
        country: "DE",
        phone: "030 18 43 58",
        mail: "KarinDietrich@rhyta.com",
      },
      {
        id: 4,
        name: "Klaudia",
        surname: "Beyer",
        gender: "f",
        birthday: "2008-09-30",
        street: "Rhinstraße",
        streetnumber: "61",
        zipcode: "80916",
        city: "München",
        state: "BY",
        country: "DE",
        phone: "089 59 71 58",
        mail: "KlaudiaBeyer@dayrep.com",
      },
      {
        id: 5,
        name: "Jörg",
        surname: "Kuhn",
        gender: "m",
        birthday: "1986-06-21",
        street: "Holstenwall",
        streetnumber: "21",
        zipcode: "06869",
        city: "Buko",
        state: "ST",
        country: "DE",
        phone: "034903 67 62",
        mail: "JorgKuhn@gustr.com",
      },
      {
        id: 6,
        name: "Mandy",
        surname: "Mahler",
        gender: "f",
        birthday: "2006-06-28",
        street: "Anhalter Straße",
        streetnumber: "4",
        zipcode: "67685",
        city: "Eulenbis",
        state: "RP",
        country: "DE",
        phone: "06374 97 42 10",
        mail: "MandyMahler@gustr.com",
      },
      {
        id: 7,
        name: "Sophie",
        surname: "Dächer",
        gender: "f",
        birthday: "1970-11-23",
        street: "Hoheluftchaussee",
        streetnumber: "1",
        zipcode: "16918",
        city: "Freyenstein",
        state: "BB",
        country: "DE",
        phone: "033967 39 54",
        mail: "SophieDaecher@armyspy.com",
      },
      {
        id: 8,
        name: "Jan",
        surname: "Fürst",
        gender: "m",
        birthday: "1966-09-21",
        street: "Meininger Straße",
        streetnumber: "13",
        zipcode: "55758",
        city: "Kempfeld",
        state: "RP",
        country: "DE",
        phone: "06786 34 61 62",
        mail: "JanFuerst@superrito.com",
      },
      {
        id: 9,
        name: "Phillipp",
        surname: "Jäger",
        gender: "m",
        birthday: "1973-06-08",
        street: "Bülowstraße",
        streetnumber: "70",
        zipcode: "57648",
        city: "Bölsberg",
        state: "RP",
        country: "DE",
        phone: "02661 58 57 33",
        mail: "PhillippJager@einrot.com",
      },
      {
        id: 10,
        name: "Maximilian",
        surname: "Neustadt",
        gender: "m",
        birthday: "1991-08-31",
        street: "Lübecker Straße",
        streetnumber: "81",
        zipcode: "97432",
        city: "Haßfurt",
        state: "BY",
        country: "DE",
        phone: "09521 45 68 20",
        mail: "MaximilianNeustadt@superrito.com",
      },
      {
        id: 11,
        name: "Kathrin",
        surname: "Beich",
        gender: "f",
        birthday: "1981-10-24",
        street: "Hochstraße",
        streetnumber: "27",
        zipcode: "25948",
        city: "Nebel",
        state: "SH",
        country: "DE",
        phone: "04682 65 42 43",
        mail: "KathrinBeich@dayrep.com",
      },
      {
        id: 12,
        name: "Torsten",
        surname: "Brandt",
        gender: "m",
        birthday: "1992-03-23",
        street: "Ziegelstraße",
        streetnumber: "66",
        zipcode: "94095",
        city: "Ruhstorf",
        state: "BY",
        country: "DE",
        phone: "08534 12 02 43",
        mail: "TorstenBrandt@teleworm.us",
      },
      {
        id: 13,
        name: "Katrin",
        surname: "Kunze",
        gender: "f",
        birthday: "1968-03-24",
        street: "Prager Straße",
        streetnumber: "67",
        zipcode: "82247",
        city: "Fürstenfeldbruck",
        state: "BY",
        country: "DE",
        phone: "08141 83 17 57",
        mail: "KatrinKunze@teleworm.us",
      },
      {
        id: 14,
        name: "Sara",
        surname: "Kirsch",
        gender: "f",
        birthday: "2002-05-16",
        street: "Landhausstraße",
        streetnumber: "49",
        zipcode: "15366",
        city: "Birkenstein",
        state: "BB",
        country: "DE",
        phone: "03342 39 35 99",
        mail: "SaraKirsch@einrot.com",
      },
      {
        id: 15,
        name: "Klaudia",
        surname: "Metzger",
        gender: "f",
        birthday: "1963-01-08",
        street: "Kieler Straße",
        streetnumber: "83",
        zipcode: "82019",
        city: "Taufkirchen",
        state: "BY",
        country: "DE",
        phone: "08630 41 31 53",
        mail: "KlaudiaMetzger@teleworm.us",
      },
      {
        id: 16,
        name: "Tobias",
        surname: "Lange",
        gender: "m",
        birthday: "1970-08-19",
        street: "Rudower Straße",
        streetnumber: "89",
        zipcode: "54597",
        city: "Habscheid",
        state: "RP",
        country: "DE",
        phone: "06556 51 93 18",
        mail: "TobiasLange@superrito.com",
      },
      {
        id: 17,
        name: "Claudia",
        surname: "Münch",
        gender: "f",
        birthday: "1981-01-11",
        street: "Mellingburgredder",
        streetnumber: "69",
        zipcode: "90574",
        city: "Roßtal",
        state: "BY",
        country: "DE",
        phone: "09127 38 50 50",
        mail: "ClaudiaMuench@dayrep.com",
      },
      {
        id: 18,
        name: "Annett",
        surname: "Kästner",
        gender: "f",
        birthday: "2000-07-20",
        street: "Köpenicker Straße",
        streetnumber: "58",
        zipcode: "55777",
        city: "Berschweiler bei Baumholder",
        state: "RP",
        country: "DE",
        phone: "06783 84 00 15",
        mail: "AnnettKaestner@einrot.com",
      },
      {
        id: 19,
        name: "Steffen",
        surname: "Grünewald",
        gender: "m",
        birthday: "1962-07-08",
        street: "Michaelkirchstraße",
        streetnumber: "32",
        zipcode: "31633",
        city: "Leese",
        state: "NI",
        country: "DE",
        phone: "05761 87 28 21",
        mail: "SteffenGrunewald@teleworm.us",
      },
      {
        id: 20,
        name: "Tanja",
        surname: "Pfaff",
        gender: "f",
        birthday: "2007-01-10",
        street: "Rhinstraße",
        streetnumber: "40",
        zipcode: "81206",
        city: "München",
        state: "BY",
        country: "DE",
        phone: "089 16 25 04",
        mail: "TanjaPfaff@cuvox.de",
      },
      {
        id: 21,
        name: "Uta",
        surname: "Luft",
        gender: "f",
        birthday: "1998-08-27",
        street: "Kurfürstenstraße",
        streetnumber: "79",
        zipcode: "70839",
        city: "Gerlingen",
        state: "BW",
        country: "DE",
        phone: "07156 22 40 53",
        mail: "UtaLuft@rhyta.com",
      },
      {
        id: 22,
        name: "Heike",
        surname: "Müller",
        gender: "f",
        birthday: "1990-03-16",
        street: "Hollander Straße",
        streetnumber: "35",
        zipcode: "66981",
        city: "Münchweiler an der Rodalb",
        state: "RP",
        country: "DE",
        phone: "06395 73 29 62",
        mail: "HeikeMuller@teleworm.us",
      },
      {
        id: 23,
        name: "Kristin",
        surname: "Weiss",
        gender: "f",
        birthday: "1970-03-27",
        street: "Oldesloer Straße",
        streetnumber: "49",
        zipcode: "98599",
        city: "Brotterode",
        state: "TH",
        country: "DE",
        phone: "036840 53 12",
        mail: "KristinWeiss@teleworm.us",
      },
      {
        id: 24,
        name: "Mathias",
        surname: "Ebersbacher",
        gender: "m",
        birthday: "1990-09-21",
        street: "Waldowstraße",
        streetnumber: "49",
        zipcode: "74595",
        city: "Langenburg",
        state: "BW",
        country: "DE",
        phone: "07904 87 45 41",
        mail: "MathiasEbersbacher@rhyta.com",
      },
      {
        id: 25,
        name: "Swen",
        surname: "Gerste",
        gender: "m",
        birthday: "1963-10-01",
        street: "Bissingzeile",
        streetnumber: "48",
        zipcode: "27632",
        city: "Padingbüttel",
        state: "NI",
        country: "DE",
        phone: "04742 27 76 71",
        mail: "SwenGerste@superrito.com",
      },
      {
        id: 26,
        name: "Michael",
        surname: "Hertz",
        gender: "m",
        birthday: "1984-12-12",
        street: "Fugger Straße",
        streetnumber: "78",
        zipcode: "06822",
        city: "Dessau",
        state: "ST",
        country: "DE",
        phone: "0340 11 37 31",
        mail: "MichaelHertz@rhyta.com",
      },
      {
        id: 27,
        name: "Phillipp",
        surname: "Ackerman",
        gender: "m",
        birthday: "1999-04-01",
        street: "Potsdamer Platz",
        streetnumber: "37",
        zipcode: "91809",
        city: "Wellheim",
        state: "BY",
        country: "DE",
        phone: "08427 31 24 15",
        mail: "PhillippAckerman@gustr.com",
      },
      {
        id: 28,
        name: "Sophia",
        surname: "Ehrlichmann",
        gender: "f",
        birthday: "2005-10-16",
        street: "Grolmanstraße",
        streetnumber: "26",
        zipcode: "28219",
        city: "Bremen Hohweg",
        state: "HB",
        country: "DE",
        phone: "0421 78 49 66",
        mail: "SophiaEhrlichmann@teleworm.us",
      },
      {
        id: 29,
        name: "Frank",
        surname: "Gottlieb",
        gender: "m",
        birthday: "2000-01-05",
        street: "Inge Beisheim Platz",
        streetnumber: "57",
        zipcode: "21382",
        city: "Brietlingen",
        state: "NI",
        country: "DE",
        phone: "04133 99 60 72",
        mail: "FrankGottlieb@teleworm.us",
      },
      {
        id: 30,
        name: "Lukas",
        surname: "Baumgartner",
        gender: "m",
        birthday: "1966-03-12",
        street: "Güntzelstraße",
        streetnumber: "98",
        zipcode: "55595",
        city: "Gebroth",
        state: "RP",
        country: "DE",
        phone: "06706 14 68 23",
        mail: "LukasBaumgartner@teleworm.us",
      },
      {
        id: 31,
        name: "Leonie",
        surname: "Körtig",
        gender: "f",
        birthday: "1974-04-24",
        street: "Fontenay",
        streetnumber: "47",
        zipcode: "96302",
        city: "Kronach",
        state: "BY",
        country: "DE",
        phone: "09261 48 75 76",
        mail: "LeonieKoertig@cuvox.de",
      },
      {
        id: 32,
        name: "Marcel",
        surname: "Oster",
        gender: "m",
        birthday: "1965-12-25",
        street: "Alt-Moabit",
        streetnumber: "27",
        zipcode: "04802",
        city: "Wurzen",
        state: "SN",
        country: "DE",
        phone: "03425 87 83 86",
        mail: "MarcelOster@armyspy.com",
      },
      {
        id: 33,
        name: "Juliane",
        surname: "Drescher",
        gender: "f",
        birthday: "1974-08-29",
        street: "Sömmeringstraße",
        streetnumber: "96",
        zipcode: "75050",
        city: "Gemmingen",
        state: "BW",
        country: "DE",
        phone: "07267 14 24 50",
        mail: "JulianeDrescher@rhyta.com",
      },
      {
        id: 34,
        name: "Brigitte",
        surname: "Berg",
        gender: "f",
        birthday: "2008-11-07",
        street: "Mollstraße",
        streetnumber: "2",
        zipcode: "33189",
        city: "Schlangen",
        state: "NW",
        country: "DE",
        phone: "06124 37 27 60",
        mail: "BrigitteBerg@einrot.com",
      },
      {
        id: 35,
        name: "Laura",
        surname: "Farber",
        gender: "f",
        birthday: "1971-10-22",
        street: "Kurfürstenstraße",
        streetnumber: "71",
        zipcode: "71332",
        city: "Waiblingen Kernstadt-Nord",
        state: "BW",
        country: "DE",
        phone: "07151 99 67 34",
        mail: "LauraFarber@armyspy.com",
      },
      {
        id: 36,
        name: "Franziska",
        surname: "Walter",
        gender: "f",
        birthday: "1980-03-03",
        street: "Rosenstraße",
        streetnumber: "35",
        zipcode: "81452",
        city: "München",
        state: "BY",
        country: "DE",
        phone: "089 57 14 88",
        mail: "FranziskaWalter@fleckens.hu",
      },
      {
        id: 37,
        name: "Silke",
        surname: "Baader",
        gender: "f",
        birthday: "1991-07-03",
        street: "Potsdamer Platz",
        streetnumber: "17",
        zipcode: "85108",
        city: "Kipfenberg",
        state: "BY",
        country: "DE",
        phone: "08406 23 01 52",
        mail: "SilkeBaader@superrito.com",
      },
      {
        id: 38,
        name: "Anke",
        surname: "Küfer",
        gender: "f",
        birthday: "1962-01-22",
        street: "Rathausstraße",
        streetnumber: "70",
        zipcode: "82362",
        city: "Schörghof",
        state: "BY",
        country: "DE",
        phone: "0881 90 83 75",
        mail: "AnkeKuefer@gustr.com",
      },
      {
        id: 39,
        name: "Mandy",
        surname: "Beike",
        gender: "f",
        birthday: "1964-04-03",
        street: "Park Straße",
        streetnumber: "84",
        zipcode: "01474",
        city: "Borsberg",
        state: "SN",
        country: "DE",
        phone: "0214 72 75 62",
        mail: "MandyBeike@cuvox.de",
      },
      {
        id: 40,
        name: "Brigitte",
        surname: "Kunze",
        gender: "f",
        birthday: "1969-06-30",
        street: "Langenhorner Chaussee",
        streetnumber: "79",
        zipcode: "84100",
        city: "Niederaichbach",
        state: "BY",
        country: "DE",
        phone: "08702 35 38 73",
        mail: "BrigitteKunze@dayrep.com",
      },
      {
        id: 41,
        name: "Swen",
        surname: "Fürst",
        gender: "m",
        birthday: "2002-06-06",
        street: "Knesebeckstraße",
        streetnumber: "6",
        zipcode: "57632",
        city: "Berzhausen",
        state: "RP",
        country: "DE",
        phone: "02685 82 66 80",
        mail: "SwenFuerst@teleworm.us",
      },
      {
        id: 42,
        name: "Martina",
        surname: "Küfer",
        gender: "f",
        birthday: "2006-01-26",
        street: "Jahnstraße",
        streetnumber: "4",
        zipcode: "83090",
        city: "Bad Endorf",
        state: "BY",
        country: "DE",
        phone: "08053 33 03 68",
        mail: "MartinaKuefer@jourrapide.com",
      },
      {
        id: 43,
        name: "Jörg",
        surname: "Himmel",
        gender: "m",
        birthday: "1980-01-19",
        street: "Pohlstraße",
        streetnumber: "52",
        zipcode: "38368",
        city: "Mariental",
        state: "NI",
        country: "DE",
        phone: "05356 37 64 73",
        mail: "JorgHimmel@teleworm.us",
      },
      {
        id: 44,
        name: "Tobias",
        surname: "Müller",
        gender: "m",
        birthday: "1978-11-05",
        street: "Brandenburgische Straße",
        streetnumber: "8",
        zipcode: "75378",
        city: "Bad Liebenzell",
        state: "BW",
        country: "DE",
        phone: "07052 43 16 22",
        mail: "TobiasMuller@dayrep.com",
      },
      {
        id: 45,
        name: "Maria",
        surname: "Ehrlichmann",
        gender: "f",
        birthday: "2003-07-10",
        street: "Esplanade",
        streetnumber: "49",
        zipcode: "97849",
        city: "Roden",
        state: "BY",
        country: "DE",
        phone: "09391 28 18 57",
        mail: "MariaEhrlichmann@armyspy.com",
      },
      {
        id: 46,
        name: "Markus",
        surname: "Maur",
        gender: "m",
        birthday: "1976-05-31",
        street: "Straßeesemannstraße",
        streetnumber: "44",
        zipcode: "66718",
        city: "Saarlouis",
        state: "TH",
        country: "DE",
        phone: "06831 54 14 65",
        mail: "MarkusMaur@fleckens.hu",
      },
      {
        id: 47,
        name: "Marie",
        surname: "Herrmann",
        gender: "f",
        birthday: "1973-05-17",
        street: "Alt Reinickendorf",
        streetnumber: "29",
        zipcode: "86707",
        city: "Kühlenthal",
        state: "BY",
        country: "DE",
        phone: "08273 95 62 88",
        mail: "MarieHerrmann@jourrapide.com",
      },
      {
        id: 48,
        name: "Marko",
        surname: "Zweig",
        gender: "m",
        birthday: "1986-06-09",
        street: "Kurfürstendamm",
        streetnumber: "65",
        zipcode: "18130",
        city: "Rostock",
        state: "MV",
        country: "DE",
        phone: "0381 70 89 43",
        mail: "MarkoZweig@fleckens.hu",
      },
      {
        id: 49,
        name: "Anke",
        surname: "Kortig",
        gender: "f",
        birthday: "1983-06-07",
        street: "Hardenbergstraße",
        streetnumber: "91",
        zipcode: "24372",
        city: "Kappeln",
        state: "SH",
        country: "DE",
        phone: "06385 41 03 77",
        mail: "AnkeKortig@cuvox.de",
      },
      {
        id: 50,
        name: "Nadine",
        surname: "Roth",
        gender: "f",
        birthday: "1983-06-20",
        street: "Kantstraße",
        streetnumber: "21",
        zipcode: "09332",
        city: "Hohenstein-Ernstthal",
        state: "SN",
        country: "DE",
        phone: "03723 96 76 62",
        mail: "NadineRoth@dayrep.com",
      },
      {
        id: 51,
        name: "Stefanie",
        surname: "Drescher",
        gender: "f",
        birthday: "1960-09-10",
        street: "Kurfürstendamm",
        streetnumber: "73",
        zipcode: "89081",
        city: "Ulm Weststadt",
        state: "BW",
        country: "DE",
        phone: "073 68 17 41",
        mail: "StefanieDrescher@superrito.com",
      },
      {
        id: 52,
        name: "Dieter",
        surname: "Müller",
        gender: "m",
        birthday: "2007-10-05",
        street: "Landsberger Allee",
        streetnumber: "23",
        zipcode: "80530",
        city: "München",
        state: "BY",
        country: "DE",
        phone: "089 43 97 96",
        mail: "DieterMueller@gustr.com",
      },
      {
        id: 53,
        name: "Sophia",
        surname: "Reiniger",
        gender: "f",
        birthday: "1985-12-14",
        street: "Lietzenburger Straße",
        streetnumber: "60",
        zipcode: "51465",
        city: "Bergisch Gladbach Gladbach",
        state: "NW",
        country: "DE",
        phone: "02202 15 54 42",
        mail: "SophiaReiniger@fleckens.hu",
      },
      {
        id: 54,
        name: "Benjamin",
        surname: "Abendroth",
        gender: "m",
        birthday: "1964-05-26",
        street: "Hermannstraße",
        streetnumber: "32",
        zipcode: "55278",
        city: "Ülversheim",
        state: "RP",
        country: "DE",
        phone: "06249 69 10 66",
        mail: "BenjaminAbendroth@dayrep.com",
      },
      {
        id: 55,
        name: "Mandy",
        surname: "Fenstermacher",
        gender: "f",
        birthday: "2008-01-27",
        street: "Marseiller Straße",
        streetnumber: "62",
        zipcode: "86986",
        city: "Schwabbruck",
        state: "BY",
        country: "DE",
        phone: "08868 86 36 66",
        mail: "MandyFenstermacher@teleworm.us",
      },
      {
        id: 56,
        name: "Janina",
        surname: "Adler",
        gender: "f",
        birthday: "1974-08-23",
        street: "Schönebergerstraße",
        streetnumber: "56",
        zipcode: "08402",
        city: "Werdau",
        state: "SN",
        country: "DE",
        phone: "03761 29 69 09",
        mail: "JaninaAdler@cuvox.de",
      },
      {
        id: 57,
        name: "Christine",
        surname: "Nagel",
        gender: "f",
        birthday: "1962-12-13",
        street: "Büsingstraße",
        streetnumber: "29",
        zipcode: "85202",
        city: "Dachau",
        state: "BY",
        country: "DE",
        phone: "08131 81 00 49",
        mail: "ChristineNagel@superrito.com",
      },
      {
        id: 58,
        name: "Lena",
        surname: "Gersten",
        gender: "f",
        birthday: "2006-07-05",
        street: "Feldstraße",
        streetnumber: "46",
        zipcode: "39446",
        city: "Löderburg",
        state: "ST",
        country: "DE",
        phone: "039265 28 91",
        mail: "LenaGersten@dayrep.com",
      },
      {
        id: 59,
        name: "Alexander",
        surname: "Pfaff",
        gender: "m",
        birthday: "1972-12-13",
        street: "Hallesches Ufer",
        streetnumber: "98",
        zipcode: "66822",
        city: "Lebach",
        state: "TH",
        country: "DE",
        phone: "06881 22 85 66",
        mail: "AlexanderPfaff@superrito.com",
      },
      {
        id: 60,
        name: "Karin",
        surname: "Küster",
        gender: "f",
        birthday: "1961-12-11",
        street: "Budapester Straße",
        streetnumber: "9",
        zipcode: "27419",
        city: "Sittensen",
        state: "NI",
        country: "DE",
        phone: "04282 58 74 27",
        mail: "KarinKuster@dayrep.com",
      },
      {
        id: 61,
        name: "Franziska",
        surname: "Osterhagen",
        gender: "f",
        birthday: "1998-10-14",
        street: "Chausseestraße",
        streetnumber: "89",
        zipcode: "25476",
        city: "Ellerau",
        state: "SH",
        country: "DE",
        phone: "04106 79 09 52",
        mail: "FranziskaOsterhagen@teleworm.us",
      },
      {
        id: 62,
        name: "Jürgen",
        surname: "Keller",
        gender: "m",
        birthday: "1975-06-28",
        street: "Budapester Straße",
        streetnumber: "62",
        zipcode: "24245",
        city: "Barmissen",
        state: "SH",
        country: "DE",
        phone: "04302 85 46 99",
        mail: "JurgenKeller@teleworm.us",
      },
      {
        id: 63,
        name: "Anna",
        surname: "Biermann",
        gender: "f",
        birthday: "1981-10-18",
        street: "Albrechtstraße",
        streetnumber: "5",
        zipcode: "85023",
        city: "Ingolstadt",
        state: "BY",
        country: "DE",
        phone: "0841 34 31 91",
        mail: "AnnaBiermann@jourrapide.com",
      },
      {
        id: 64,
        name: "Sabrina",
        surname: "Goldschmidt",
        gender: "f",
        birthday: "1964-03-05",
        street: "Genslerstraße",
        streetnumber: "66",
        zipcode: "13407",
        city: "Berlin Wedding",
        state: "BE",
        country: "DE",
        phone: "030 42 68 08",
        mail: "SabrinaGoldschmidt@cuvox.de",
      },
      {
        id: 65,
        name: "Lena",
        surname: "Mauer",
        gender: "f",
        birthday: "1967-12-25",
        street: "Genterstraße",
        streetnumber: "62",
        zipcode: "24032",
        city: "Kiel",
        state: "SH",
        country: "DE",
        phone: "0431 27 45 70",
        mail: "LenaMauer@armyspy.com",
      },
      {
        id: 66,
        name: "Michelle",
        surname: "Frei",
        gender: "f",
        birthday: "2001-05-05",
        street: "Rhinstraße",
        streetnumber: "89",
        zipcode: "80933",
        city: "München",
        state: "BY",
        country: "DE",
        phone: "089 41 80 45",
        mail: "MichelleFrei@dayrep.com",
      },
      {
        id: 67,
        name: "Ursula",
        surname: "Wolf",
        gender: "f",
        birthday: "1961-09-04",
        street: "Meininger Straße",
        streetnumber: "86",
        zipcode: "55758",
        city: "Sienhachenbach",
        state: "RP",
        country: "DE",
        phone: "06788 35 24 36",
        mail: "UrsulaWolf@gustr.com",
      },
      {
        id: 68,
        name: "Ralf",
        surname: "Jäger",
        gender: "m",
        birthday: "1996-12-26",
        street: "Gotzkowskystraße",
        streetnumber: "68",
        zipcode: "56253",
        city: "Treis-Karden",
        state: "RP",
        country: "DE",
        phone: "02672 56 17 65",
        mail: "RalfJaeger@jourrapide.com",
      },
      {
        id: 69,
        name: "Uwe",
        surname: "Fiedler",
        gender: "m",
        birthday: "1977-01-29",
        street: "Güntzelstraße",
        streetnumber: "22",
        zipcode: "54518",
        city: "Minheim",
        state: "RP",
        country: "DE",
        phone: "06507 99 36 97",
        mail: "UweFiedler@fleckens.hu",
      },
      {
        id: 70,
        name: "Thomas",
        surname: "Vogel",
        gender: "m",
        birthday: "1996-05-05",
        street: "Pasewalker Straße",
        streetnumber: "59",
        zipcode: "75177",
        city: "Pforzheim Eutingen",
        state: "BW",
        country: "DE",
        phone: "07231 90 18 67",
        mail: "ThomasVogel@armyspy.com",
      },
      {
        id: 71,
        name: "Phillipp",
        surname: "Richter",
        gender: "m",
        birthday: "1997-09-27",
        street: "Wallstraße",
        streetnumber: "48",
        zipcode: "56587",
        city: "Oberraden",
        state: "RP",
        country: "DE",
        phone: "02634 21 96 43",
        mail: "PhillippRichter@fleckens.hu",
      },
      {
        id: 72,
        name: "Max",
        surname: "Mehler",
        gender: "m",
        birthday: "1974-09-28",
        street: "Hallesches Ufer",
        streetnumber: "33",
        zipcode: "66822",
        city: "Lebach",
        state: "TH",
        country: "DE",
        phone: "06881 67 62 98",
        mail: "MaxMehler@teleworm.us",
      },
      {
        id: 73,
        name: "Robert",
        surname: "Fink",
        gender: "m",
        birthday: "1994-09-07",
        street: "Budapester Straße",
        streetnumber: "46",
        zipcode: "14797",
        city: "Damsdorf",
        state: "BB",
        country: "DE",
        phone: "04323 22 68 21",
        mail: "RobertFink@cuvox.de",
      },
      {
        id: 74,
        name: "Ulrike",
        surname: "Müller",
        gender: "f",
        birthday: "1985-12-22",
        street: "Jenaer Straße",
        streetnumber: "10",
        zipcode: "42287",
        city: "Wuppertal Barmen",
        state: "NW",
        country: "DE",
        phone: "0202 27 78 06",
        mail: "UlrikeMuller@superrito.com",
      },
      {
        id: 75,
        name: "Martin",
        surname: "Schmitt",
        gender: "m",
        birthday: "1991-12-11",
        street: "Waldowstraße",
        streetnumber: "43",
        zipcode: "74676",
        city: "Niedernhall",
        state: "BW",
        country: "DE",
        phone: "07940 61 07 55",
        mail: "MartinSchmitt@superrito.com",
      },
      {
        id: 76,
        name: "Karolin",
        surname: "Walter",
        gender: "f",
        birthday: "1996-06-05",
        street: "Eschenweg",
        streetnumber: "63",
        zipcode: "99803",
        city: "Eisenach",
        state: "TH",
        country: "DE",
        phone: "03691 26 12 08",
        mail: "KarolinWalter@jourrapide.com",
      },
      {
        id: 77,
        name: "Marco",
        surname: "Ostermann",
        gender: "m",
        birthday: "1963-01-18",
        street: "Neue Roßstraße",
        streetnumber: "33",
        zipcode: "66133",
        city: "Saarbrücken Scheidt",
        state: "SL",
        country: "DE",
        phone: "0681 54 11 78",
        mail: "MarcoOstermann@einrot.com",
      },
      {
        id: 78,
        name: "Melanie",
        surname: "Eisenberg",
        gender: "f",
        birthday: "2006-03-11",
        street: "Leipziger Straße",
        streetnumber: "23",
        zipcode: "37534",
        city: "Badenhausen",
        state: "NI",
        country: "DE",
        phone: "05522 28 85 01",
        mail: "MelanieEisenberg@superrito.com",
      },
      {
        id: 79,
        name: "Ralf",
        surname: "Grünewald",
        gender: "m",
        birthday: "2001-04-06",
        street: "Rudower Chaussee",
        streetnumber: "64",
        zipcode: "96020",
        city: "Bamberg",
        state: "BY",
        country: "DE",
        phone: "0951 58 15 71",
        mail: "RalfGrunewald@superrito.com",
      },
      {
        id: 80,
        name: "Thorsten",
        surname: "Theissen",
        gender: "m",
        birthday: "1962-05-25",
        street: "Sonnenallee",
        streetnumber: "14",
        zipcode: "86035",
        city: "Augsburg",
        state: "BY",
        country: "DE",
        phone: "0821 54 16 14",
        mail: "ThorstenTheissen@rhyta.com",
      },
      {
        id: 81,
        name: "Jürgen",
        surname: "Metzger",
        gender: "m",
        birthday: "1987-10-07",
        street: "Lützowplatz",
        streetnumber: "91",
        zipcode: "54636",
        city: "Messerich",
        state: "RP",
        country: "DE",
        phone: "06569 86 50 94",
        mail: "JurgenMetzger@cuvox.de",
      },
      {
        id: 82,
        name: "Mario",
        surname: "Körtig",
        gender: "m",
        birthday: "1997-05-08",
        street: "Konstanzer Straße",
        streetnumber: "19",
        zipcode: "35519",
        city: "Rockenberg",
        state: "HE",
        country: "DE",
        phone: "06033 61 44 46",
        mail: "MarioKoertig@cuvox.de",
      },
      {
        id: 83,
        name: "Swen",
        surname: "Ebersbacher",
        gender: "m",
        birthday: "1986-04-15",
        street: "Rudower Chaussee",
        streetnumber: "80",
        zipcode: "46240",
        city: "Bottrop Boy",
        state: "NW",
        country: "DE",
        phone: "02045 50 13 25",
        mail: "SwenEbersbacher@einrot.com",
      },
      {
        id: 84,
        name: "Jörg",
        surname: "Walter",
        gender: "m",
        birthday: "2006-09-16",
        street: "An Der Urania",
        streetnumber: "83",
        zipcode: "25581",
        city: "Hennstedt",
        state: "SH",
        country: "DE",
        phone: "04836 27 29 47",
        mail: "JorgWalter@fleckens.hu",
      },
      {
        id: 85,
        name: "Jana",
        surname: "Eberhardt",
        gender: "f",
        birthday: "2009-05-10",
        street: "Schillerstraße",
        streetnumber: "86",
        zipcode: "86872",
        city: "Scherstetten",
        state: "BY",
        country: "DE",
        phone: "08204 34 26 96",
        mail: "JanaEberhardt@jourrapide.com",
      },
      {
        id: 86,
        name: "Yvonne",
        surname: "Beike",
        gender: "f",
        birthday: "1968-04-08",
        street: "Reeperbahn",
        streetnumber: "46",
        zipcode: "18573",
        city: "Altefähr",
        state: "MV",
        country: "DE",
        phone: "038306 81 26",
        mail: "YvonneBeike@fleckens.hu",
      },
      {
        id: 87,
        name: "Marie",
        surname: "Herz",
        gender: "f",
        birthday: "1961-10-09",
        street: "Jahnstraße",
        streetnumber: "58",
        zipcode: "84432",
        city: "Hohenpolding",
        state: "BY",
        country: "DE",
        phone: "08084 54 13 16",
        mail: "MarieHerz@cuvox.de",
      },
      {
        id: 88,
        name: "Annett",
        surname: "Bäcker",
        gender: "f",
        birthday: "1961-04-16",
        street: "Hallesches Ufer",
        streetnumber: "25",
        zipcode: "94475",
        city: "Grafenau",
        state: "BY",
        country: "DE",
        phone: "07033 82 46 46",
        mail: "AnnettBaecker@jourrapide.com",
      },
      {
        id: 89,
        name: "Stephan",
        surname: "Kaiser",
        gender: "m",
        birthday: "1974-01-12",
        street: "Langenhorner Chaussee",
        streetnumber: "85",
        zipcode: "84335",
        city: "Mitterskirchen",
        state: "BY",
        country: "DE",
        phone: "08670 55 37 82",
        mail: "StephanKaiser@teleworm.us",
      },
      {
        id: 90,
        name: "Maria",
        surname: "Dreher",
        gender: "f",
        birthday: "1967-09-22",
        street: "Kantstraße",
        streetnumber: "71",
        zipcode: "95412",
        city: "Bayreuth",
        state: "BY",
        country: "DE",
        phone: "0921 68 60 40",
        mail: "MariaDreher@jourrapide.com",
      },
      {
        id: 91,
        name: "Daniel",
        surname: "Bergmann",
        gender: "m",
        birthday: "1968-01-01",
        street: "Waßmannsdorfer Chaussee",
        streetnumber: "78",
        zipcode: "22605",
        city: "Hamburg Bahrenfeld",
        state: "HH",
        country: "DE",
        phone: "040 78 78 15",
        mail: "DanielBergmann@armyspy.com",
      },
      {
        id: 92,
        name: "Leah",
        surname: "Blau",
        gender: "f",
        birthday: "1984-08-24",
        street: "Pasewalker Straße",
        streetnumber: "49",
        zipcode: "76473",
        city: "Iffezheim",
        state: "BW",
        country: "DE",
        phone: "07229 75 49 84",
        mail: "LeahBlau@jourrapide.com",
      },
      {
        id: 93,
        name: "Torsten",
        surname: "Beich",
        gender: "m",
        birthday: "1979-10-20",
        street: "Budapester Straße",
        streetnumber: "41",
        zipcode: "35644",
        city: "Hohenahr",
        state: "HE",
        country: "DE",
        phone: "06444 27 28 98",
        mail: "TorstenBeich@fleckens.hu",
      },
      {
        id: 94,
        name: "Vanessa",
        surname: "Meyer",
        gender: "f",
        birthday: "2000-06-09",
        street: "Bülowstraße",
        streetnumber: "25",
        zipcode: "57647",
        city: "Enspel",
        state: "RP",
        country: "DE",
        phone: "02661 73 22 65",
        mail: "VanessaMeyer@gustr.com",
      },
      {
        id: 95,
        name: "Johanna",
        surname: "Gersten",
        gender: "f",
        birthday: "1987-10-24",
        street: "Frankfurter Allee",
        streetnumber: "56",
        zipcode: "76185",
        city: "Karlsruhe Nordweststadt",
        state: "BW",
        country: "DE",
        phone: "0721 26 00 99",
        mail: "JohannaGersten@rhyta.com",
      },
      {
        id: 96,
        name: "Jörg",
        surname: "Rothschild",
        gender: "m",
        birthday: "1972-07-16",
        street: "Neue Roßstraße",
        streetnumber: "35",
        zipcode: "73728",
        city: "Esslingen Esslingen",
        state: "BW",
        country: "DE",
        phone: "0711 69 67 39",
        mail: "JorgRothschild@teleworm.us",
      },
      {
        id: 97,
        name: "Lena",
        surname: "Traugott",
        gender: "f",
        birthday: "1972-08-01",
        street: "Waldowstraße",
        streetnumber: "2",
        zipcode: "74429",
        city: "Sulzbach-Laufen",
        state: "BW",
        country: "DE",
        phone: "07976 68 72 89",
        mail: "LenaTraugott@dayrep.com",
      },
      {
        id: 98,
        name: "Lucas",
        surname: "Gersten",
        gender: "m",
        birthday: "2008-11-06",
        street: "Park Straße",
        streetnumber: "22",
        zipcode: "42659",
        city: "Solingen Solingen-Mitte",
        state: "NW",
        country: "DE",
        phone: "0212 28 45 04",
        mail: "LucasGersten@einrot.com",
      },
      {
        id: 99,
        name: "Stephan",
        surname: "Schäfer",
        gender: "m",
        birthday: "1986-07-01",
        street: "Brandenburgische Straße",
        streetnumber: "11",
        zipcode: "72124",
        city: "Pliezhausen",
        state: "BW",
        country: "DE",
        phone: "07127 47 04 42",
        mail: "StephanSchaefer@superrito.com",
      },
      {
        id: 100,
        name: "Kevin",
        surname: "Sanger",
        gender: "m",
        birthday: "2003-12-16",
        street: "Alt-Moabit",
        streetnumber: "66",
        zipcode: "14901",
        city: "Jütebog",
        state: "BB",
        country: "DE",
        phone: "03372 11 90 17",
        mail: "KevinSanger@jourrapide.com",
      },
    ])
  })
}