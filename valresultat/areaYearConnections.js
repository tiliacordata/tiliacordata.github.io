const areaYearConnections = [
    {
        "id": 1,
        "name": "Brunnby",
        "years": {
            "2022": ["brunnby"],
            "2018": ["brunnby"],
            "2014": ["brunnby"],
            "2010": ["brunnby"]
        }
    },
    {
        "id": 2,
        "name": "Fysingen",
        "years": {
            "2022": ["fysingen"],
            "2018": ["fysingen"],
            "2014": ["fysingen"],
            "2010": ["fysingen"]
        }
    },
    {
        "id": 3,
        "name": "Gamla Bollstanäs",
        "years": {
            "2022": ["gamla_bollstanas"],
            "2018": ["gamla_bollstanas"],
            "2014": ["gamla_bollstanas"],
            "2010": ["gamla_bollstanas"]
        }
    },
    {
        "id": 4,
        "name": "Grimstaby",
        "years": {
            "2022": ["grimstaby"],
            "2018": ["grimstaby"],
            "2014": ["grimstaby"],
            "2010": ["grimstaby"]
        }
    },
    {
        "id": 5,
        "name": "Mälaren",
        "years": {
            "2022": ["malaren"],
            "2018": ["malaren"],
            "2014": ["malaren"],
            "2010": ["malaren"]
        }
    },
    {
        "id": 6,
        "name": "Nedra Runby",
        "years": {
            "2022": ["nedra_runby"],
            "2018": ["nedra_runby"],
            "2014": ["nedra_runby"],
            "2010": ["nedra_runby"]
        }
    },
    {
        "id": 7,
        "name": "Sjukyrkoberget",
        "years": {
            "2022": ["sjukyrkoberget"],
            "2018": ["sjukyrkoberget"],
            "2014": ["sjukyrkoberget"],
            "2010": ["sjukyrkoberget"]
        }
    },
    {
        "id": 8,
        "name": "Skälby",
        "years": {
            "2022": ["skalby"],
            "2018": ["skalby"],
            "2014": ["skalby"],
            "2010": ["skalby"]
        }
    },
    {
        "id": 9,
        "name": "Övra Runby",
        "years": {
            "2022": ["ovra_runby"],
            "2018": ["ovra_runby"],
            "2014": ["ovra_runby"],
            "2010": ["ovra_runby"]
        }
    },
    {
        "id": 10,
        "name": "Apoteksskogen",
        "years": {
            "2022": ["apoteksskogen"],
            "2018": ["apoteksskogen"]
        }
    },
    {
        "id": 11,
        "name": "Edssjön",
        "years": {
            "2022": ["edssjon"],
            "2018": ["edssjon"]
        }
    },
    {
        "id": 12,
        "name": "Ekebo",
        "years": {
            "2022": ["ekebo"],
            "2018": ["ekebo"]
        }
    },
    {
        "id": 13,
        "name": "Folkparken",
        "years": {
            "2022": ["folkparken"],
            "2018": ["folkparken"]
        }
    },
    {
        "id": 14,
        "name": "Frestaby",
        "years": {
            "2022": ["frestaby"],
            "2018": ["frestaby"]
        }
    },
    {
        "id": 15,
        "name": "Korpkulla",
        "years": {
            "2022": ["korpkulla"],
            "2018": ["korpkulla"]
        }
    },
    {
        "id": 16,
        "name": "Norra Bollstanäs",
        "years": {
            "2022": ["norra_bollstanas"],
            "2018": ["norra_bollstanas"]
        }
    },
    {
        "id": 17,
        "name": "Odenslunda Norra",
        "years": {
            "2022": ["odenslunda_norra"],
            "2018": ["odenslunda_norra"],
            "2014": ["odenslunda"],
            "2010": ["odenslunda"]
        }
    },
    {
        "id": 18,
        "name": "Odenslunda Södra",
        "years": {
            "2022": ["odenslunda_sodra"],
            "2018": ["odenslunda_sodra"],
            "2014": ["johannesdal"],
            "2010": ["johannesdal"]
        }
    },
    {
        "id": 19,
        "name": "Prästgårdsmarken",
        "years": {
            "2022": ["prastgardsmarken"],
            "2018": ["prastgardsmarken"]
        }
    },
    {
        "id": 20,
        "name": "Sigma",
        "years": {
            "2022": ["sigma"],
            "2018": ["sigma"]
        }
    },
    {
        "id": 21,
        "name": "Smedby Norra",
        "years": {
            "2022": ["smedby_norra"],
            "2018": ["smedby_norra"]
        }
    },
    {
        "id": 22,
        "name": "Smedby Södra",
        "years": {
            "2022": ["smedby_sodra"],
            "2018": ["smedby_sodra"]
        }
    },
    {
        "id": 23,
        "name": "Väsbyskogen Västra",
        "years": {
            "2022": ["vasbyskogen_vastra"],
            "2018": ["vasbyskogen_vastra"]
        }
    },
    {
        "id": 24,
        "name": "Väsbyskogen Östra",
        "years": {
            "2022": ["vasbyskogen_ostra"],
            "2018": ["vasbyskogen_ostra"]
        }
    },
    {
        "id": 25,
        "name": "Östra Frestaby-Ekeby",
        "years": {
            "2022": ["ostra_frestaby-ekeby"],
            "2018": ["ostra_frestaby-ekeby"]
        }
    },
    {
        "id": 26,
        "name": "Smedby Norra",
        "years": {
            "2014": ["smedby_norra2"],
            "2010": ["smedby_norra2"]
        }
    },
    {
        "id": 27,
        "name": "Smedby Södra",
        "years": {
            "2014": ["smedby_sodra2"],
            "2010": ["smedby_sodra2"]
        }
    },
    {
        "id": 28,
        "name": "Norrviken",
        "years": {
            "2014": ["norrviken"],
            "2010": ["norrviken"]
        }
    },
    // {
    //     "id": 29,
    //     "name": "Edssjön",
    //     "years": {
    //         "2014": ["edssjon2"],
    //         "2010": ["edssjon2"]
    //     }
    // },
    {
        "id": 30,
        "name": "Centrum",
        "years": {
            "2014": ["centrum"],
            "2010": ["centrum"]
        }
    },
    {
        "id": 31,
        "name": "Fresta",
        "years": {
            "2014": ["fresta"],
            "2010": ["fresta"]
        }
    },
    // {
    //     "id": 32,
    //     "name": "Johannesdal",
    //     "years": {
    //         "2014": ["johannesdal"],
    //         "2010": ["johannesdal"]
    //     }
    // },
    {
        "id": 33,
        "name": "Väsbyskogen",
        "years": {
            "2014": ["vasbyskogen"],
            "2010": ["vasbyskogen"]
        }
    },
    {
        "id": 34,
        "name": "Apoteksskogen",
        "years": {
            "2014": ["apoteksskogen2"],
            "2010": ["apoteksskogen2"]
        }
    },
    {
        "id": 35,
        "name": "Folkparken",
        "years": {
            "2014": ["folkparken2"],
            "2010": ["folkparken2"]
        }
    },
    {
        "id": 36,
        "name": "Edssjön/Prästgårdsmarken",
        "years": {
            "2022": ["edssjon", "prastgardsmarken"],
            "2018": ["edssjon", "prastgardsmarken"],
            "2014": ["edssjon2"],
            "2010": ["edssjon2"]
        }
    },
    {
        "id": 37,
        "name": "Smedby Norra/Smedby Södra/Ekebo",
        "years": {
            "2022": ["smedby_norra", "smedby_sodra", "ekebo"],
            "2018": ["smedby_norra", "smedby_sodra", "ekebo"],
            "2014": ["smedby_norra2", "smedby_sodra2"],
            "2010": ["smedby_norra2", "smedby_sodra2"],
            "2006": ["upplands_vasby_9", "upplands_vasby_12"]

        }
    },
    {
        "id": 38,
        "name": "Norra Bollstanäs/Frestaby/Östra Frestaby-Ekeby",
        "years": {
            "2022": ["norra_bollstanas", "frestaby", "ostra_frestaby-ekeby"],
            "2018": ["norra_bollstanas", "frestaby", "ostra_frestaby-ekeby"],
            "2014": ["norrviken", "fresta"],
            "2010": ["norrviken", "fresta"]
        }
    },
    {
        "id": 39,
        "name": "*Västra Väsby",
        "years": {
            "2022": ["malaren", "ovra_runby", "nedra_runby", "edssjon", "prastgardsmarken"],
            "2018": ["malaren", "ovra_runby", "nedra_runby", "edssjon", "prastgardsmarken"],
            "2014": ["malaren", "ovra_runby", "nedra_runby", "edssjon2"],
            "2010": ["malaren", "ovra_runby", "nedra_runby", "edssjon2"],
            "2006": ["upplands_vasby_1", "upplands_vasby_2", "upplands_vasby_20"]
        }
    },
    {
        "id": 40,
        "name": "Fyrklövern Norra/Fyrklövern Södra/Vilunda",
        "years": {
            "2022": ["fyrklovern_norra", "fyrklovern_sodra", "vilunda"],
            "2018": ["fyrklovern", "vilunda2"]
        }
    },
    {
        "id": 41,
        "name": "*Norra centrala Väsby",
        "years": {
            "2022": ["vasbyskogen_vastra", "vasbyskogen_ostra", "sigma", "apoteksskogen", "korpkulla", "folkparken", "fyrklovern_norra", "fyrklovern_sodra", "vilunda"],
            "2018": ["vasbyskogen_vastra", "vasbyskogen_ostra", "sigma", "apoteksskogen", "korpkulla", "folkparken", "fyrklovern", "vilunda2"],
            "2014": ["vasbyskogen", "apoteksskogen2", "korpkulla2", "folkparken2", "centrum", "vilunda3"],
            "2010": ["vasbyskogen", "apoteksskogen2", "korpkulla2", "folkparken2", "centrum", "vilunda3"],
            "2006": ["upplands_vasby_3", "upplands_vasby_5", "upplands_vasby_6", "upplands_vasby_8", "upplands_vasby_10", "upplands_vasby_18"]
        }
    },
    {
        "id": 42,
        "name": "*Centrala Väsby",
        "years": {
            "2022": ["vasbyskogen_vastra", "vasbyskogen_ostra", "sigma", "apoteksskogen", "korpkulla", "folkparken", "fyrklovern_norra", "fyrklovern_sodra", "vilunda", "smedby_norra", "smedby_sodra", "ekebo"],
            "2018": ["vasbyskogen_vastra", "vasbyskogen_ostra", "sigma", "apoteksskogen", "korpkulla", "folkparken", "fyrklovern", "vilunda2", "smedby_norra", "smedby_sodra", "ekebo"],
            "2014": ["vasbyskogen", "apoteksskogen2", "korpkulla2", "folkparken2", "centrum", "vilunda3", "smedby_norra2", "smedby_sodra2"],
            "2010": ["vasbyskogen", "apoteksskogen2", "korpkulla2", "folkparken2", "centrum", "vilunda3", "smedby_norra2", "smedby_sodra2"]
        }
    },
    {
        "id": 43,
        "name": "*Östra Väsby",
        "years": {
            "2022": ["fysingen", "skalby", "brunnby", "odenslunda_norra", "odenslunda_sodra", "sjukyrkoberget", "grimstaby", "gamla_bollstanas", "norra_bollstanas", "frestaby", "ostra_frestaby-ekeby"],
            "2018": ["fysingen", "skalby", "brunnby", "odenslunda_norra", "odenslunda_sodra", "sjukyrkoberget", "grimstaby", "gamla_bollstanas", "norra_bollstanas", "frestaby", "ostra_frestaby-ekeby"],
            "2014": ["fysingen", "skalby", "brunnby", "odenslunda", "johannesdal", "sjukyrkoberget", "grimstaby", "gamla_bollstanas", "norrviken", "fresta"],
            "2010": ["fysingen", "skalby", "brunnby", "odenslunda", "johannesdal", "sjukyrkoberget", "grimstaby", "gamla_bollstanas", "norrviken", "fresta"],
            "2006": ["upplands_vasby_4", "upplands_vasby_7", "upplands_vasby_11", "upplands_vasby_13", "upplands_vasby_14", "upplands_vasby_15", "upplands_vasby_16", "upplands_vasby_17"]
        }
    },
]