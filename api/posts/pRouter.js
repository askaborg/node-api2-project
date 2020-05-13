const express = require("express")
const Posts = require("../../data/db.js")
const commentsRouter = require("./comments/cRouter.js")

const router = express.Router()
router.use("/:id/comments", commentsRouter)

router.get("/", (req, res) => {
    Posts.find()
    .then( info => {
        res.status(200).json(info)
    })
    .catch( err => {
        res.status(500).json({
            errorMessage: "The posts could not be retrieved."
        })
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params

    Posts.findById(id)
    .then( post => {
       if(post.length === 0) {
            res.status(404).json({
                errorMessage: "The post with that ID does not exist."
            })
        } else {
            res.status(200).json(post[0])
        }   
    })
    .catch( err => {
        res.status(500).json({
            errorMessage: "The post could not be retrieved."
        })
    })

})


router.put("/:id", (req, res) => {
    const { id } = req.params

    if(!req.body.title || !req.body.contents) {
        res.status(404).json({
            errorMessage: "The post with the specified ID does not exist."
        })
        
    } else {

        Posts.update(id, req.body)
        .then( post => {
            if(post === 0) {
                res.status(404).json({
                    errorMessage:
                        "The post with the specifed ID does not exist."
                })
            } else {
                res.status(200).json({
                    id, title: req.body.title, contents: req.body.contents
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The post information could not be modified."
            })
        })
    }
})


router.post("/", (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(404).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        Posts.insert(req.body)
        .then( id => {
            res.status(200).json({
                ...id, title: req.body.title, contents: req.body.contents
            })
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The post information could not be created."
            })
        })
    }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params

    Posts.remove(id)
    .then( post => {
        if(post === 0) {
            res.status(404).json({
                errorMessage: "THe post could not be found."
            })
        } else {
           res.status(200).json({
               message: "post removed."
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            message: "post could not be removed."
        })
    })
})

module.exports = router