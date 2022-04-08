const { Octokit, App} = require("octokit");
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const md = require('./nftMetaConfig')
const nftData = md.mintData.nftData
const nftMetaData = md.mintData.nftMetaData

//console.log(md.mintData)

const token = process.env.PA_TOKEN
const owner = process.env.GITHUB_OWNER

router.use(bodyParser.json({limit: "50mb"}))

router.post('/mintHub', mintHub)
router.post('/nftMetaData', nftMetaDataCreate)
router.post('/imageLoader', nftImageLoader)
router.get('/hello', hello)

async function hello(req, res) {
    res.status(200).send("hello")
}

async function mintHub(req, res){
    const octokit = new Octokit({ auth: token });
    let result = {successful: true}

    try {
        let orgName = req.body.orgName
        let repoName = req.body.repoName


        const login = await octokit.rest.users.getAuthenticated();
        
        const repoInfo = await octokit.rest.repos.createInOrg({
            org: orgName,
            name: repoName,
            auto_init: true,
        })
        result.repoInfo = repoInfo
        result.loginInfo = login
        res.status(200).send(result)
    } catch (e) {
        result.successful = false
        result.errorMessage = e
        console.log(e)
        res.status(500).send(result)
    }
    
}

async function nftMetaDataCreate(req, res){
    const octokit = new Octokit({ auth: token });
    let result = {successful: true}

    try {
        let orgName = req.body.orgName
        let ownerName = req.body.ownerName
        let repoName = req.body.repoName
        let creatorAddress = req.body.creatorAddress
        let nftName = req.body.nftName
        let nftNumber = req.body.nftNumber
        let sellerFee = req.body.sellerFee

        let metaDataUri = "https://raw.githubusercontent.com/" + orgName + "/" + repoName + "/main/nft-meta-data.json"
        let nftSymbol = "stkmn"
        //let solAddress = creatorAddress
        let nftMetaDataImageUri = "https://raw.githubusercontent.com/" + orgName + "/" + repoName + "/main/" + nftName + ".png"
        let externalUri = "https://github.com/" + orgName + "/" + repoName
        let nftDataUri = "https://raw.githubusercontent.com/" + orgName + "/" + repoName + "/main/nft-data.json"

        nftData.name = nftName
        nftData.symbol = nftSymbol
        nftData.creators[0].address = creatorAddress
        nftData.seller_fee_basis_points = sellerFee
        nftData.uri = metaDataUri

        nftMetaData.name = nftName
        nftMetaData.image = nftMetaDataImageUri
        nftMetaData.attributes[2].value = "StickMan-" + nftNumber
        nftMetaData.properties.files[0].uri = nftMetaDataImageUri
        nftMetaData.properties.creators[0].address = creatorAddress
        nftMetaData.external_url = externalUri
        nftMetaData.seller_fee_basis_points = sellerFee

        let nftDataString = JSON.stringify(nftData)
        let nftMetaDataString = JSON.stringify(nftMetaData)

        let nftDataStringEncode = Buffer.from(nftDataString).toString('base64')
        let nftDataMetaStringEncode = Buffer.from(nftMetaDataString).toString('base64')


        const login = await octokit.rest.users.getAuthenticated();
        
        const nftInfo = await octokit.rest.repos.createOrUpdateFileContents({
            owner: orgName,
            //repo: orgName + "/" + repoName,
            repo: repoName,
            path: "nft-data.json",
            message: "Adding in nft creation data",
            content: nftDataStringEncode,
            committer: {
                name: "JockDaRock",
                email: "jock.da.rock@gmail.com"
            },
            author: {
                name: "JockDaRock",
                email: "jock.da.rock@gmail.com"
            },
        })
        result.nftInfo = nftInfo

        const nftMetaInfo = await octokit.rest.repos.createOrUpdateFileContents({
            owner: orgName,
            repo: repoName,
            path: "nft-meta-data.json",
            message: "Adding in nft meta data",
            content: nftDataMetaStringEncode,
            committer: {
                name: "JockDaRock",
                email: "jock.da.rock@gmail.com"
            },
            author: {
                name: "JockDaRock",
                email: "jock.da.rock@gmail.com"
            },
        })
        result.nftMetaInfo = nftMetaInfo
        result.nftDataUri = metaDataUri
        result.nftMetaDataImageUri = nftMetaDataImageUri


        result.loginInfo = login
        res.status(200).send(result)
    } catch (e) {
        result.successful = false
        result.errorMessage = e
        console.log(e)
        res.status(500).send(result)
    }
    
}

async function nftImageLoader(req, res){
    const octokit = new Octokit({ auth: token });
    let result = {successful: true}

    try {
        let orgName = req.body.orgName
        let repoName = req.body.repoName
        let nftName = req.body.nftName
        let imageEncode = req.body.imageEncode


        const login = await octokit.rest.users.getAuthenticated();
        
        const imageInfo = await octokit.rest.repos.createOrUpdateFileContents({
            owner: orgName,
            //repo: orgName + "/" + repoName,
            repo: repoName,
            path: nftName + ".png",
            message: "Adding in image data",
            content: imageEncode,
            committer: {
                name: "JockDaRock",
                email: "jock.da.rock@gmail.com"
            },
            author: {
                name: "JockDaRock",
                email: "jock.da.rock@gmail.com"
            },
        })
        result.imageInfo = imageInfo


        result.loginInfo = login
        res.status(200).send(result)
    } catch (e) {
        result.successful = false
        result.errorMessage = e
        console.log(e)
        res.status(500).send(result)
    }
    
}

module.exports = router