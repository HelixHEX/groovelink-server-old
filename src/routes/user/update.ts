import express from 'express'

const router = express.Router()

import User from '../../entities/User'

router.post('/add-friend', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { spotifyId, otheruserId } = body
    try {
        const user = await User.findOne({ where: { spotifyId }, relations: ['friends'] })
        if (user) {
            const friendUser = await User.findOne({ where: { spotifyId: otheruserId }, relations: ['friends'] })
            if (friendUser) {
                user.friends.push(friendUser)
                user.save()
                friendUser.friends.push(user)
                friendUser.save()
                console.log({ user, friendUser })
                res.json({ success: true }).status(200)
            } else {
                res.json({ success: false, error: 'Other user not found' }).status(404)
            }
        } else {
            res.json({ success: false, error: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: e }).status(400)
    }
})

router.post('/add-song-to-profile', async (req: express.Request, res: express.Response) => {
    const { body } = req;
       const {songId, accessToken, spotifyId, name, artists} = body 
    try {
        const user = await User.findOne({where: {spotifyId}})
        if (user) {
            console.log(user.highlightedsongs)
            if (user.highlightedsongs.length < 3) {
                user.highlightedsongs.push({
                    name,
                    spotifyId: songId,
                    artists
                })
                user.save()
                res.json({success: true}).status(200)
            } else {
                res.json({success: false, error: 'Maximum number of songs reached'}).status(204)
            }
        } else {
            res.json({success: false, error: 'User not found'}).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, error: 'An error has occurred' }).status(400)
    }
})

module.exports = router