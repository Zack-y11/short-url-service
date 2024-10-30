import {getAllUrls, makeShortUrl, redirectUrl, getAccessCounter ,UpdateUrl, deleteUrl} from '../controllers/urlsControllers'
import {Router} from 'express'

const router = Router()

router.get('/', getAllUrls)

router.get('/:shortCode', redirectUrl);

router.get('/stats/:shortCode', getAccessCounter)

router.post('/', makeShortUrl)

router.put('/:shortCode', UpdateUrl)

router.delete('/:shortCode', deleteUrl)

export default router
