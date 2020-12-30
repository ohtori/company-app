import { Request, Response } from 'express';

function basketRoute(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    let body = JSON.parse(`${chunk}`);

    console.log(body);
    

    const errMessage = { message: 'Неверный логин или пароль, попробуйте снова', isError: true }
    
    // if (
    //   email.length > 120 || !email.match(/[^<>/]+@[^<>/]+\.[^<>/]+/)
    // ) {
    //   return res.status(400).json(errMessage);      
    // }

    
    res.status(200).json({});
  });
}
module.exports = basketRoute;
export {}