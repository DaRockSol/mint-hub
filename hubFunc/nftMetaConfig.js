const nftData = {
    "name": "value",
    "symbol": "stkmn",
    "uri": "https://raw.githubusercontent.com/someOrg/somRepo/main/nft-meta-data.json",
    "seller_fee_basis_points": 1000,
    "creators": [
        {
          "address": "publicKey",
          "share": 100,
          "verified": true
        }
     ]
  }

  const nftMetaData = {
    "name":"value",
    "symbol": "stkmn",
    "description":"Which StickMan variant are you!!!",
    "image":"https://raw.githubusercontent.com/someOrg/someRepo/main/imageName.png",
    "seller_fee_basis_points":1000,
    "external_url":"https://github.com/someOrg/someRepo",
    "attributes":[
       {
          "trait_type":"location",
          "value":"multiverse"
       },
       {
          "trait_type":"sanityLevel",
          "value":"madness"
       },
       {
          "trait_type":"name",
          "value":"StickMan-mvn"
       }
    ],
    "properties":{
       "files":[
          {
             "uri":"https://raw.githubusercontent.com/someOrg/someRepo/main/imageName.png",
             "type":"image/png"
          }
       ],
       "category":"image",
       "creators":[
          {
             "address":"pubKey",
             "share":100
          }
       ]
    }
 }

 const mintData = {nftData: nftData, nftMetaData: nftMetaData}

 module.exports = {'mintData': mintData}