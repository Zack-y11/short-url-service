import { Request, Response } from "express";
import Url from '../models/url'
import { randomBytes } from "crypto";

const baseUrl = process.env.VERCEL_URL ? 
  `https://https://minurl-six.vercel.app/api` : 
  'http://localhost:3000/api';

export const getAllUrls = async (req: Request, res: Response) => {
    try {
        const urls = await Url.find()
        res.status(200).json({ message: "All urls", urls })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
}

export const makeShortUrl = async (req: Request, res: Response): Promise<any> => {
    try {
        const { url } = req.body
        const shortCode = randomBytes(3).toString('hex')

        console.log(url, req.body)
        
        let urlShort = await Url.findOne({url: url})
        if(!urlShort){
            urlShort = new Url({
                url: url,
                shortCode: shortCode
            })
            await urlShort.save()
        }

        const fullUrl = `${baseUrl}/${urlShort.shortCode}`
        return res.status(200).json({fullUrl})

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const redirectUrl = async (req: Request, res: Response): Promise<any> => {
    try {
        const { shortCode } = req.params;
        
        // Find the original URL by shortCode
        const url = await Url.findOneAndUpdate(
            {shortCode},
            { $inc: { accessCount: 1 } },
            {new: true}
        );
        
        if (!url) {
            return res.status(404).json({ message: "Short code not found" });
        }

        return res.redirect(url.url);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const UpdateUrl = async (req: Request, res: Response): Promise<any> => {
    try {
        const { shortCode } = req.params;
        const { url: newUrl } = req.body;

        if (!shortCode || !newUrl) {
            return res.status(400).json({ message: "Short code and new URL are required" });
        }

        const url = await Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: "Short code not found" });
        }

        url.url = newUrl;
        await url.save();

        return res.status(200).json({ message: "URL updated successfully", url });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const deleteUrl = async (req: Request, res: Response): Promise<any> => {
    try {
        const { shortCode } = req.params
        if(!shortCode){
            return res.status(400).json({ message: "Short code is required" });
        }

        console.log("Deleting... ", shortCode )
        const url = await Url.findOneAndDelete({shortCode})
        if (!url) {
            return res.status(404).json({ message: "Url not found" })
        }

        return res.status(200).json({ message: "Url deleted successfully" })
        
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const getAccessCounter = async (req: Request, res: Response):Promise<any>=>{
    try {
        const {shortCode} = req.params
        console.log(req.params)

        const url = await Url.findOne({shortCode})
        if(!url){
            return res.status(404).json({message: "Url not found" })
        }

        return res.status(200).json({message: `Access Count from: ${shortCode}`, statics: url.accessCount, url: url.url})
        
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }

}