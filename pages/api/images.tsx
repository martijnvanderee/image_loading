import cloudinary from "cloudinary"
// //typescipt
import type { ResourceApiResponse } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from 'next'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const getImages = async (tag: string) => {
  //const { resources } = await cloudinary.v2.api.sub_folders(tag);

  const { resources }: ResourceApiResponse = await cloudinary.v2.search.expression(
    `folder:${tag}/*` // add your folder
  ).sort_by('public_id', 'desc').max_results(30).execute()

  return resources
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const images = await getImages("image_loading_folder")

  if (req.method === 'GET') {
    try {
      res.status(200).json({
        statusCode: 200,
        message: images,
      });
    } catch (err) {
      reportError({ message: getErrorMessage(err) })

      res
        .status(500)
        .json({ statusCode: 500, message: 'something went wrong' });
    }
  }
}


// export const destroyImage = (public_id: string) => cloudinary.v2.uploader.destroy(public_id,
//   (result) => { console.log(result) });

