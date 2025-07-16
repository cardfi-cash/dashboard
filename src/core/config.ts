const config =  {
    storage:{
        baseTag:"cardfi_",
        router:{
            auth:"auth",
            user:"user",
        }
    },
    api:{
        baseUrl:"https://api.cardfi.cash",
        router:{
            login:"/user/login",
            info:"/user/info",
            card:"/user/card",
            signIn:"/login/evm",
            apply:"/card/new",
            deposite:"/card/deposite",
            order_check:"/order/check"
        }
    },
    card:{
        0:{
            id:0,
            name:"Onchain Card",
            type:"usdt",
            color:"white",
            feeRate:"1.99%",
            applyFee:3.99,
            monthFee:0.1,
            desc:"Not Require-KYC|3.99$|1.99%|50000$ Limit Peer Month",
            img:"",
            feeLimit:"10000/TX , 10000/D , 50000/M"
        },
    },
    chains:[
        {
            name:"Polygon",
            id:"POL",
            img:"/img/chains/aptos.png",
            decimal:9,
            scan:{
                base:"https://polygonscan.com/",
                account:"account",
                tx:"tx"
            }
        },
        {
            name:"Arbitrum",
            id:"ARB",
            img:"/img/chains/usdt.png",
            scan:{
                base:"https://arbiscan.io/",
                account:"address",
                tx:"tx"
            }
        },
    ],
    tokens:[
        {
            id:"USDTARBITRUM",
            name:"USDT",
            img:"/img/chains/usdt.png",
            decimal:9,
            address:"0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
        },
        {
            id:"USDCARBITRUM",
            name:"USDC",
            img:"/img/chains/usdc.png",
            decimal:9,
            address:"0xaf88d065e77c8cc2239327c5edb3a432268e5831"
        }
    ],
    address:{
        arb:{
            contract:"0x65571cb75214915A2cD43d9F883C96eDc4D5AB1a"
        }
    },
    abi:{
        erc20:[
                {
                    "constant": false,
                    "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                    ],
                    "name": "transfer",
                    "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                    ],
                    "type": "function"
                }
            ],
        vault:[
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_usd",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "_vault",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "applyFees",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "info",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "applyCard",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "to",
          "type": "bytes"
        }
      ],
      "name": "deposite",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "applyETH",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "applyFeeETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "applyFeeUSD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "applyUSD",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cards",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "to",
          "type": "bytes"
        }
      ],
      "name": "deposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "info",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_info",
          "type": "bytes"
        }
      ],
      "name": "updateInfo",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "usd",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vault",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

    },
    region:{
            "AF": "Afghanistan",
            "AX": "Aland Islands",
            "AL": "Albania",
            "DZ": "Algeria",
            "AS": "American Samoa",
            "AD": "Andorra",
            "AO": "Angola",
            "AI": "Anguilla",
            "AQ": "Antarctica",
            "AG": "Antigua And Barbuda",
            "AR": "Argentina",
            "AM": "Armenia",
            "AW": "Aruba",
            "AU": "Australia",
            "AT": "Austria",
            "AZ": "Azerbaijan",
            "BS": "Bahamas",
            "BH": "Bahrain",
            "BD": "Bangladesh",
            "BB": "Barbados",
            "BY": "Belarus",
            "BE": "Belgium",
            "BZ": "Belize",
            "BJ": "Benin",
            "BM": "Bermuda",
            "BT": "Bhutan",
            "BO": "Bolivia",
            "BA": "Bosnia And Herzegovina",
            "BW": "Botswana",
            "BV": "Bouvet Island",
            "BR": "Brazil",
            "IO": "British Indian Ocean Territory",
            "BN": "Brunei Darussalam",
            "BG": "Bulgaria",
            "BF": "Burkina Faso",
            "BI": "Burundi",
            "KH": "Cambodia",
            "CM": "Cameroon",
            "CA": "Canada",
            "CV": "Cape Verde",
            "KY": "Cayman Islands",
            "CF": "Central African Republic",
            "TD": "Chad",
            "CL": "Chile",
            "CN": "China",
            "CX": "Christmas Island",
            "CC": "Cocos (Keeling) Islands",
            "CO": "Colombia",
            "KM": "Comoros",
            "CG": "Congo",
            "CD": "Congo, Democratic Republic",
            "CK": "Cook Islands",
            "CR": "Costa Rica",
            "CI": "Cote D\"Ivoire",
            "HR": "Croatia",
            "CU": "Cuba",
            "CY": "Cyprus",
            "CZ": "Czech Republic",
            "DK": "Denmark",
            "DJ": "Djibouti",
            "DM": "Dominica",
            "DO": "Dominican Republic",
            "EC": "Ecuador",
            "EG": "Egypt",
            "SV": "El Salvador",
            "GQ": "Equatorial Guinea",
            "ER": "Eritrea",
            "EE": "Estonia",
            "ET": "Ethiopia",
            "FK": "Falkland Islands (Malvinas)",
            "FO": "Faroe Islands",
            "FJ": "Fiji",
            "FI": "Finland",
            "FR": "France",
            "GF": "French Guiana",
            "PF": "French Polynesia",
            "TF": "French Southern Territories",
            "GA": "Gabon",
            "GM": "Gambia",
            "GE": "Georgia",
            "DE": "Germany",
            "GH": "Ghana",
            "GI": "Gibraltar",
            "GR": "Greece",
            "GL": "Greenland",
            "GD": "Grenada",
            "GP": "Guadeloupe",
            "GU": "Guam",
            "GT": "Guatemala",
            "GG": "Guernsey",
            "GN": "Guinea",
            "GW": "Guinea-Bissau",
            "GY": "Guyana",
            "HT": "Haiti",
            "HM": "Heard Island & Mcdonald Islands",
            "VA": "Holy See (Vatican City State)",
            "HN": "Honduras",
            "HK": "Hong Kong",
            "HU": "Hungary",
            "IS": "Iceland",
            "IN": "India",
            "ID": "Indonesia",
            "IR": "Iran, Islamic Republic Of",
            "IQ": "Iraq",
            "IE": "Ireland",
            "IM": "Isle Of Man",
            "IL": "Israel",
            "IT": "Italy",
            "JM": "Jamaica",
            "JP": "Japan",
            "JE": "Jersey",
            "JO": "Jordan",
            "KZ": "Kazakhstan",
            "KE": "Kenya",
            "KI": "Kiribati",
            "KR": "Korea",
            "KP": "North Korea",
            "KW": "Kuwait",
            "KG": "Kyrgyzstan",
            "LA": "Lao People\"s Democratic Republic",
            "LV": "Latvia",
            "LB": "Lebanon",
            "LS": "Lesotho",
            "LR": "Liberia",
            "LY": "Libyan Arab Jamahiriya",
            "LI": "Liechtenstein",
            "LT": "Lithuania",
            "LU": "Luxembourg",
            "MO": "Macao",
            "MK": "Macedonia",
            "MG": "Madagascar",
            "MW": "Malawi",
            "MY": "Malaysia",
            "MV": "Maldives",
            "ML": "Mali",
            "MT": "Malta",
            "MH": "Marshall Islands",
            "MQ": "Martinique",
            "MR": "Mauritania",
            "MU": "Mauritius",
            "YT": "Mayotte",
            "MX": "Mexico",
            "FM": "Micronesia, Federated States Of",
            "MD": "Moldova",
            "MC": "Monaco",
            "MN": "Mongolia",
            "ME": "Montenegro",
            "MS": "Montserrat",
            "MA": "Morocco",
            "MZ": "Mozambique",
            "MM": "Myanmar",
            "NA": "Namibia",
            "NR": "Nauru",
            "NP": "Nepal",
            "NL": "Netherlands",
            "AN": "Netherlands Antilles",
            "NC": "New Caledonia",
            "NZ": "New Zealand",
            "NI": "Nicaragua",
            "NE": "Niger",
            "NG": "Nigeria",
            "NU": "Niue",
            "NF": "Norfolk Island",
            "MP": "Northern Mariana Islands",
            "NO": "Norway",
            "OM": "Oman",
            "PK": "Pakistan",
            "PW": "Palau",
            "PS": "Palestinian Territory, Occupied",
            "PA": "Panama",
            "PG": "Papua New Guinea",
            "PY": "Paraguay",
            "PE": "Peru",
            "PH": "Philippines",
            "PN": "Pitcairn",
            "PL": "Poland",
            "PT": "Portugal",
            "PR": "Puerto Rico",
            "QA": "Qatar",
            "RE": "Reunion",
            "RO": "Romania",
            "RU": "Russian Federation",
            "RW": "Rwanda",
            "BL": "Saint Barthelemy",
            "SH": "Saint Helena",
            "KN": "Saint Kitts And Nevis",
            "LC": "Saint Lucia",
            "MF": "Saint Martin",
            "PM": "Saint Pierre And Miquelon",
            "VC": "Saint Vincent And Grenadines",
            "WS": "Samoa",
            "SM": "San Marino",
            "ST": "Sao Tome And Principe",
            "SA": "Saudi Arabia",
            "SN": "Senegal",
            "RS": "Serbia",
            "SC": "Seychelles",
            "SL": "Sierra Leone",
            "SG": "Singapore",
            "SK": "Slovakia",
            "SI": "Slovenia",
            "SB": "Solomon Islands",
            "SO": "Somalia",
            "ZA": "South Africa",
            "GS": "South Georgia And Sandwich Isl.",
            "ES": "Spain",
            "LK": "Sri Lanka",
            "SD": "Sudan",
            "SR": "Suriname",
            "SJ": "Svalbard And Jan Mayen",
            "SZ": "Swaziland",
            "SE": "Sweden",
            "CH": "Switzerland",
            "SY": "Syrian Arab Republic",
            "TW": "Taiwan",
            "TJ": "Tajikistan",
            "TZ": "Tanzania",
            "TH": "Thailand",
            "TL": "Timor-Leste",
            "TG": "Togo",
            "TK": "Tokelau",
            "TO": "Tonga",
            "TT": "Trinidad And Tobago",
            "TN": "Tunisia",
            "TR": "Turkey",
            "TM": "Turkmenistan",
            "TC": "Turks And Caicos Islands",
            "TV": "Tuvalu",
            "UG": "Uganda",
            "UA": "Ukraine",
            "AE": "United Arab Emirates",
            "GB": "United Kingdom",
            "US": "United States",
            "UM": "United States Outlying Islands",
            "UY": "Uruguay",
            "UZ": "Uzbekistan",
            "VU": "Vanuatu",
            "VE": "Venezuela",
            "VN": "Vietnam",
            "VG": "Virgin Islands, British",
            "VI": "Virgin Islands, U.S.",
            "WF": "Wallis And Futuna",
            "EH": "Western Sahara",
            "YE": "Yemen",
            "ZM": "Zambia",
            "ZW": "Zimbabwe"
            }
}

export default config


function getCardById(id:number)
{
    for(let i in config.card)
    {
        if(config.card[i].id == id)
        {
            return config.card[i];
        }
    }
    return false;
}

const getChain = (id:string) =>
{
    for(let i in config.chains)
    {
        let e = config.chains[i];
        if(e.id.toUpperCase() == id.toUpperCase())
        {
            return e
        }
    }
    return false;
}

const getToken = (id:string) =>
{
    for(let i in config.tokens)
    {
        let e = config.tokens[i];
        if(e.id.toUpperCase() == id.toUpperCase())
        {
            return e
        }
    }
    return false;
}
export {
    getCardById,
    getChain,
    getToken
}